import request from 'supertest';
import app from '../../src/app';
import { sequelize } from '../../src/config/database';

const validEmployeeBody = {
  full_name: 'Anant',
  job_title: 'Backend Engineer',
  country: 'India',
  salary: 120000,
};

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

describe('POST /employees — validation failures', () => {
  beforeAll(async () => {
    await sequelize.authenticate();
    await sequelize.sync({ force: true });
  });

  it('rejects when full_name is missing', async () => {
    const { full_name: _omit, ...body } = validEmployeeBody;
    const response = await request(app)
      .post('/employees')
      .send(body)
      .set('Content-Type', 'application/json');

    expectValidationErrorResponse(response);
    expect(response.body.message.toLowerCase()).toContain('full_name');
  });

  it('rejects when job_title is missing', async () => {
    const { job_title: _omit, ...body } = validEmployeeBody;
    const response = await request(app)
      .post('/employees')
      .send(body)
      .set('Content-Type', 'application/json');

    expectValidationErrorResponse(response);
    expect(response.body.message.toLowerCase()).toContain('job_title');
  });

  it('rejects when country is missing', async () => {
    const { country: _omit, ...body } = validEmployeeBody;
    const response = await request(app)
      .post('/employees')
      .send(body)
      .set('Content-Type', 'application/json');

    expectValidationErrorResponse(response);
    expect(response.body.message.toLowerCase()).toContain('country');
  });

  it('rejects when salary is missing', async () => {
    const { salary: _omit, ...body } = validEmployeeBody;
    const response = await request(app)
      .post('/employees')
      .send(body)
      .set('Content-Type', 'application/json');

    expectValidationErrorResponse(response);
    expect(response.body.message.toLowerCase()).toContain('salary');
  });

  it('rejects when salary is negative', async () => {
    const response = await request(app)
      .post('/employees')
      .send({ ...validEmployeeBody, salary: -1 })
      .set('Content-Type', 'application/json');

    expectValidationErrorResponse(response);
    expect(response.body.message.toLowerCase()).toContain('salary');
  });

  it('rejects when salary is not a number', async () => {
    const response = await request(app)
      .post('/employees')
      .send({ ...validEmployeeBody, salary: 'not-a-number' })
      .set('Content-Type', 'application/json');

    expectValidationErrorResponse(response);
    expect(response.body.message.toLowerCase()).toContain('salary');
    expect(response.body.message.toLowerCase()).toContain('number');
  });

  it('rejects when full_name is an empty string', async () => {
    const response = await request(app)
      .post('/employees')
      .send({ ...validEmployeeBody, full_name: '' })
      .set('Content-Type', 'application/json');

    expectValidationErrorResponse(response);
    expect(response.body.message.toLowerCase()).toContain('full_name');
  });
});
