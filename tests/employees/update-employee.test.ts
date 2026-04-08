import request from 'supertest';
import app from '../../src/app';
import { sequelize } from '../../src/config/database';

const seedEmployeeBody = {
  full_name: 'Anant',
  job_title: 'Backend Engineer',
  country: 'India',
  salary: 120000,
};

const validUpdatePayload = {
  full_name: 'Anant Verma',
  job_title: 'Senior Backend Engineer',
  country: 'United States',
  salary: 150000,
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

describe('PUT /employees/:id', () => {
  beforeAll(async () => {
    await sequelize.authenticate();
    await sequelize.sync({ force: true });
  });

  it('returns 200 and updated employee data when employee exists', async () => {
    const created = await request(app)
      .post('/employees')
      .send(seedEmployeeBody)
      .set('Content-Type', 'application/json');

    expect(created.status).toBe(201);
    const id = created.body.data.id as number;

    const response = await request(app)
      .put(`/employees/${id}`)
      .send(validUpdatePayload)
      .set('Content-Type', 'application/json');

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      success: true,
      message: 'Employee updated successfully',
      statusCode: 200,
      data: {
        id,
        full_name: 'Anant Verma',
        job_title: 'Senior Backend Engineer',
        country: 'United States',
        salary: 150000,
      },
    });
  });

  it('returns 404 when employee does not exist', async () => {
    const response = await request(app)
      .put('/employees/99999')
      .send(validUpdatePayload)
      .set('Content-Type', 'application/json');

    expect(response.status).toBe(404);
    expect(response.body).toEqual({
      success: false,
      message: 'Employee not found',
      statusCode: 404,
      data: {},
    });
  });

  it('returns 400 for invalid payload', async () => {
    const created = await request(app)
      .post('/employees')
      .send(seedEmployeeBody)
      .set('Content-Type', 'application/json');

    expect(created.status).toBe(201);
    const id = created.body.data.id as number;

    const response = await request(app)
      .put(`/employees/${id}`)
      .send({
        ...validUpdatePayload,
        full_name: 123,
      })
      .set('Content-Type', 'application/json');

    expectBadRequestEnvelope(response);
  });

  it('returns 400 if salary is negative', async () => {
    const created = await request(app)
      .post('/employees')
      .send(seedEmployeeBody)
      .set('Content-Type', 'application/json');

    expect(created.status).toBe(201);
    const id = created.body.data.id as number;

    const response = await request(app)
      .put(`/employees/${id}`)
      .send({ ...validUpdatePayload, salary: -1 })
      .set('Content-Type', 'application/json');

    expectBadRequestEnvelope(response);
    expect(response.body.message.toLowerCase()).toContain('salary');
  });

  it('returns 400 if required fields are missing', async () => {
    const created = await request(app)
      .post('/employees')
      .send(seedEmployeeBody)
      .set('Content-Type', 'application/json');

    expect(created.status).toBe(201);
    const id = created.body.data.id as number;

    const { job_title: _omit, ...incomplete } = validUpdatePayload;
    const response = await request(app)
      .put(`/employees/${id}`)
      .send(incomplete)
      .set('Content-Type', 'application/json');

    expectBadRequestEnvelope(response);
    expect(response.body.message.toLowerCase()).toContain('job_title');
  });
});
