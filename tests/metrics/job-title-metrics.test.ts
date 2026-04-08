import request from 'supertest';
import app from '../../src/app';
import { sequelize } from '../../src/config/database';

const baseFields = {
  country: 'India',
};

async function createEmployee(
  job_title: string,
  salary: number,
  full_name: string,
): Promise<void> {
  const res = await request(app)
    .post('/employees')
    .send({ ...baseFields, full_name, job_title, salary })
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

describe('GET /metrics/job', () => {
  beforeAll(async () => {
    await sequelize.authenticate();
    await sequelize.sync({ force: true });
  });

  it('returns average salary for employees with the given job title', async () => {
    await createEmployee('Backend Engineer', 100000, 'BE One');
    await createEmployee('Backend Engineer', 120000, 'BE Two');
    await createEmployee('Backend Engineer', 140000, 'BE Three');
    await createEmployee('Product Manager', 150000, 'PM One');

    const response = await request(app)
      .get('/metrics/job')
      .query({ title: 'Backend Engineer' });

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      success: true,
      message: 'Job title salary metrics fetched successfully',
      statusCode: 200,
      data: {
        job_title: 'Backend Engineer',
        avg_salary: 120000,
      },
    });
  });

  it('returns 404 when no employees exist for the requested job title', async () => {
    await sequelize.sync({ force: true });
    await createEmployee('Product Manager', 150000, 'PM Only');

    const response = await request(app)
      .get('/metrics/job')
      .query({ title: 'Backend Engineer' });

    expect(response.status).toBe(404);
    expect(response.body).toEqual({
      success: false,
      message: 'No employees found for the given job title',
      statusCode: 404,
      data: {},
    });
  });

  it('returns 400 when title query param is missing', async () => {
    await sequelize.sync({ force: true });
    await createEmployee('Backend Engineer', 100000, 'BE One');

    const response = await request(app).get('/metrics/job');

    expectValidationErrorResponse(response);
    expect(response.body.message.toLowerCase()).toContain('title');
  });
});
