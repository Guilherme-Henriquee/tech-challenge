require('./setup');
const request = require('supertest');
const app = require('../src/app');

describe('Auth', () => {
  const credentials = {
    name: 'Professor Teste',
    email: 'professor@escola.com',
    password: 'senha123',
  };

  it('deve registrar um novo professor', async () => {
    const res = await request(app).post('/auth/register').send(credentials);
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('token');
    expect(res.body.user.email).toBe(credentials.email);
  });

  it('nao deve registrar email duplicado', async () => {
    await request(app).post('/auth/register').send(credentials);
    const res = await request(app).post('/auth/register').send(credentials);
    expect(res.status).toBe(409);
  });

  it('deve autenticar com credenciais validas', async () => {
    await request(app).post('/auth/register').send(credentials);
    const res = await request(app)
      .post('/auth/login')
      .send({ email: credentials.email, password: credentials.password });
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('token');
  });

  it('deve rejeitar credenciais invalidas', async () => {
    const res = await request(app)
      .post('/auth/login')
      .send({ email: 'inexistente@escola.com', password: 'errada' });
    expect(res.status).toBe(401);
  });
});
