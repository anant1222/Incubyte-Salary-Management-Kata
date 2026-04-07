import request from 'supertest';
import app from '../../src/app';
import { sequelize } from '../../src/config/database';

const validEmployeeBody = {
  full_name: 'Anant',
  job_title: 'Backend Engineer',
  country: 'India',
  salary: 120000,
};

describe('POST /employees', () => {
  beforeAll(async () => {
    await sequelize.authenticate();
    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  it('returns 201 and the created employee in the standard envelope', async () => {
    const response = await request(app)
      .post('/employees')
      .send(validEmployeeBody)
      .set('Content-Type', 'application/json');

    expect(response.status).toBe(201);
    expect(response.body).toEqual({
      success: true,
      message: 'Employee created successfully',
      statusCode: 201,
      data: {
        id: expect.any(Number),
        full_name: 'Anant',
        job_title: 'Backend Engineer',
        country: 'India',
        salary: 120000,
      },
    });
  });
});
