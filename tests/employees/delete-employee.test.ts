import request from 'supertest';
import app from '../../src/app';
import { sequelize } from '../../src/config/database';

const validEmployeeBody = {
  full_name: 'Anant',
  job_title: 'Backend Engineer',
  country: 'India',
  salary: 120000,
};

describe('DELETE /employees/:id', () => {
  beforeAll(async () => {
    await sequelize.authenticate();
    await sequelize.sync({ force: true });
  });

  it('returns 200 and success message when employee is deleted', async () => {
    const created = await request(app)
      .post('/employees')
      .send(validEmployeeBody)
      .set('Content-Type', 'application/json');

    expect(created.status).toBe(201);
    const id = created.body.data.id as number;

    const response = await request(app).delete(`/employees/${id}`);

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      success: true,
      message: 'Employee deleted successfully',
      statusCode: 200,
      data: {},
    });
  });

  it('returns 404 when employee does not exist', async () => {
    const response = await request(app).delete('/employees/99999');

    expect(response.status).toBe(404);
    expect(response.body).toEqual({
      success: false,
      message: 'Employee not found',
      statusCode: 404,
      data: {},
    });
  });

  it('after deletion, GET /employees/:id returns 404', async () => {
    const created = await request(app)
      .post('/employees')
      .send(validEmployeeBody)
      .set('Content-Type', 'application/json');

    expect(created.status).toBe(201);
    const id = created.body.data.id as number;

    const deleted = await request(app).delete(`/employees/${id}`);
    expect(deleted.status).toBe(200);

    const fetched = await request(app).get(`/employees/${id}`);

    expect(fetched.status).toBe(404);
    expect(fetched.body).toEqual({
      success: false,
      message: 'Employee not found',
      statusCode: 404,
      data: {},
    });
  });
});
