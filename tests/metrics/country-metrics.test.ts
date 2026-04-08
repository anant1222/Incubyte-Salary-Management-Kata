import request from 'supertest';
import app from '../../src/app';
import { sequelize } from '../../src/config/database';

const baseFields = {
  job_title: 'Engineer',
};

async function createEmployee(
  country: string,
  salary: number,
  full_name: string,
): Promise<void> {
  const res = await request(app)
    .post('/employees')
    .send({ ...baseFields, full_name, country, salary })
    .set('Content-Type', 'application/json');

  expect(res.status).toBe(201);
}

function expectValidationErrorResponse(response: {
  status: number;
  body: {
    success: boolean;
    message: string;
    statusCode: number;
    data: object;
  };
}): void {
  expect(response.status).toBe(400);
  expect(response.body).toEqual({
    success: false,
    statusCode: 400,
    data: {},
    message: expect.any(String),
  });
  expect(response.body.message.trim().length).toBeGreaterThan(0);
}

describe('GET /metrics/country', () => {
  beforeAll(async () => {
    await sequelize.authenticate();
    await sequelize.sync({ force: true });
  });

  it('returns min, max, and average salary for employees from India', async () => {
    await createEmployee('India', 100000, 'India One');
    await createEmployee('India', 120000, 'India Two');
    await createEmployee('India', 80000, 'India Three');
    await createEmployee('United States', 150000, 'US One');

    const response = await request(app).get('/metrics/country').query({ name: 'India' });

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      success: true,
      message: 'Country salary metrics fetched successfully',
      statusCode: 200,
      data: {
        country: 'India',
        min_salary: 80000,
        max_salary: 120000,
        avg_salary: 100000,
      },
    });
  });

  it('returns 404 when no employees exist for the requested country', async () => {
    await sequelize.sync({ force: true });
    await createEmployee('United States', 150000, 'US Only');

    const response = await request(app).get('/metrics/country').query({ name: 'India' });

    expect(response.status).toBe(404);
    expect(response.body).toEqual({
      success: false,
      message: 'No employees found for the given country',
      statusCode: 404,
      data: {},
    });
  });

  it('returns 400 when country query param is missing', async () => {
    await sequelize.sync({ force: true });
    await createEmployee('India', 100000, 'India One');

    const response = await request(app).get('/metrics/country');

    expectValidationErrorResponse(response);
    expect(response.body.message.toLowerCase()).toContain('name');
  });
});
