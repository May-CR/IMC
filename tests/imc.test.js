import request from 'supertest';
import app from '../src/app.js';

describe('Cálculo de IMC', () => {
  it('calcula IMC y categoría', async () => {
    const res = await request(app)
      .post('/imc')
      .send({ peso: 70, altura: 1.75 });

    expect(res.statusCode).toBe(200);
    expect(res.body.imc).toBeCloseTo(22.86, 1);
    expect(res.body.categoria).toBe('Normal');
  });

  it('valida entrada incompleta', async () => {
    const res = await request(app).post('/imc').send({ peso: 70 });
    expect(res.statusCode).toBe(400);
  });
});
