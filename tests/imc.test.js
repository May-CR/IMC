import test from 'node:test';
import assert from 'node:assert/strict';
import request from 'supertest';
import app from '../src/app.js';

test('calcula IMC y categoría', async () => {
  const res = await request(app).post('/imc').send({ peso: 70, altura: 1.75 });

  assert.strictEqual(res.statusCode, 200);
  assert.ok(Math.abs(res.body.imc - 22.86) < 0.1);
  assert.strictEqual(res.body.categoria, 'Normal');
});

test('valida entrada incompleta', async () => {
  const res = await request(app).post('/imc').send({ peso: 70 });
  assert.strictEqual(res.statusCode, 400);
});
