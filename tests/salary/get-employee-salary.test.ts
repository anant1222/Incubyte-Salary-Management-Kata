import request from 'supertest';
import app from '../../src/app';
import { sequelize } from '../../src/config/database';

const baseEmployee = {
  full_name: 'Test Employee',
  job_title: 'Engineer',
  salary: 100000,
};

const indiaEmployee = { ...baseEmployee, country: 'India' };
const usEmployee = { ...baseEmployee, country: 'United States' };
const germanyEmployee = { ...baseEmployee, country: 'Germany' };

async function createEmployee(body: typeof indiaEmployee): Promise<number> {
  const res = await request(app)
    .post('/employees')
    .send(body)
    .set('Content-Type', 'application/json');

  expect(res.status).toBe(201);
  return res.body.data.id as number;
}

describe('GET /employees/:id/salary', () => {
  beforeAll(async () => {
    await sequelize.authenticate();
    await sequelize.sync({ force: true });
  });

  it('returns correct salary breakdown for an employee from India', async () => {
    const id = await createEmployee(indiaEmployee);

    const response = await request(app).get(`/employees/${id}/salary`);

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      success: true,
      message: 'Employee salary fetched successfully',
      statusCode: 200,
      data: {
        employee_id: id,
        gross_salary: 100000,
        deduction: 10000,
        net_salary: 90000,
      },
    });
  });

  it('returns correct salary breakdown for an employee from United States', async () => {
    const id = await createEmployee(usEmployee);

    const response = await request(app).get(`/employees/${id}/salary`);

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      success: true,
      message: 'Employee salary fetched successfully',
      statusCode: 200,
      data: {
        employee_id: id,
        gross_salary: 100000,
        deduction: 12000,
        net_salary: 88000,
      },
    });
  });

  it('returns correct salary breakdown for an employee from another country with zero deduction', async () => {
    const id = await createEmployee(germanyEmployee);

    const response = await request(app).get(`/employees/${id}/salary`);

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      success: true,
      message: 'Employee salary fetched successfully',
      statusCode: 200,
      data: {
        employee_id: id,
        gross_salary: 100000,
        deduction: 0,
        net_salary: 100000,
      },
    });
  });

  it('returns 404 when employee does not exist', async () => {
    const response = await request(app).get('/employees/99999/salary');

    expect(response.status).toBe(404);
    expect(response.body).toEqual({
      success: false,
      message: 'Employee not found',
      statusCode: 404,
      data: {},
    });
  });
});
