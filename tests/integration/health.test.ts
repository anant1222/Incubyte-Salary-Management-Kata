import request from 'supertest';
import app from '../../src/app';

describe('GET /health', () => {
  it('returns 200 and a standard success payload', async () => {
    const response = await request(app).get('/health');

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      success: true,
      message: 'Health check successful',
      statusCode: 200,
      data: { status: 'ok' },
    });
  });
});
