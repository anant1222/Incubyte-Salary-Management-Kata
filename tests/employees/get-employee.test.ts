import request from 'supertest';
import app from '../../src/app';
import { sequelize } from '../../src/config/database';

const validEmployeeBody = {
  full_name: 'Anant',
  job_title: 'Backend Engineer',
  country: 'India',
  salary: 120000,
};

function expectBadRequestEnvelope(response: {
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

describe('GET /employees/:id', () => {
  beforeAll(async () => {
    await sequelize.authenticate();
    await sequelize.sync({ force: true });
  });

  it('returns 200 and employee data when employee exists', async () => {
    const created = await request(app)
      .post('/employees')
      .send(validEmployeeBody)
      .set('Content-Type', 'application/json');

    expect(created.status).toBe(201);
    const id = created.body.data.id as number;

    const response = await request(app).get(`/employees/${id}`);

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      success: true,
      message: 'Employee fetched successfully',
      statusCode: 200,
      data: {
        id,
        full_name: 'Anant',
        job_title: 'Backend Engineer',
        country: 'India',
        salary: 120000,
      },
    });
  });

  it('returns 404 when employee does not exist', async () => {
    const response = await request(app).get('/employees/99999');

    expect(response.status).toBe(404);
    expect(response.body).toEqual({
      success: false,
      message: 'Employee not found',
      statusCode: 404,
      data: {},
    });
  });

  it('returns 400 when id is not a valid integer', async () => {
    const response = await request(app).get('/employees/not-a-number');

    expectBadRequestEnvelope(response);
    expect(response.body.message.toLowerCase()).toContain('id');
  });
});
