require('./setup');
const request = require('supertest');
const app = require('../src/app');

async function getToken() {
  await request(app).post('/auth/register').send({
    name: 'Professor Teste',
    email: 'professor@escola.com',
    password: 'senha123',
  });
  const res = await request(app)
    .post('/auth/login')
    .send({ email: 'professor@escola.com', password: 'senha123' });
  return res.body.token;
}

describe('Posts', () => {
  it('GET /posts deve retornar lista vazia inicialmente', async () => {
    const res = await request(app).get('/posts');
    expect(res.status).toBe(200);
    expect(res.body).toEqual([]);
  });

  it('POST /posts sem token deve retornar 401', async () => {
    const res = await request(app).post('/posts').send({
      title: 'Aula de Matematica',
      content: 'Conteudo da aula',
      author: 'Professor',
    });
    expect(res.status).toBe(401);
  });

  it('deve criar, listar, ler, editar e excluir um post (fluxo completo)', async () => {
    const token = await getToken();

    const createRes = await request(app)
      .post('/posts')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Introducao a Fisica',
        content: 'Leis de Newton explicadas de forma simples.',
        author: 'Prof. Ana',
      });
    expect(createRes.status).toBe(201);
    const postId = createRes.body._id;

    const listRes = await request(app).get('/posts');
    expect(listRes.status).toBe(200);
    expect(listRes.body.length).toBe(1);

    const readRes = await request(app).get(`/posts/${postId}`);
    expect(readRes.status).toBe(200);
    expect(readRes.body.title).toBe('Introducao a Fisica');

    const updateRes = await request(app)
      .put(`/posts/${postId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Introducao a Fisica (Revisado)',
        content: 'Leis de Newton explicadas de forma simples e revisada.',
        author: 'Prof. Ana',
      });
    expect(updateRes.status).toBe(200);
    expect(updateRes.body.title).toContain('Revisado');

    const searchRes = await request(app).get('/posts/search').query({ q: 'Newton' });
    expect(searchRes.status).toBe(200);
    expect(searchRes.body.length).toBe(1);

    const deleteRes = await request(app)
      .delete(`/posts/${postId}`)
      .set('Authorization', `Bearer ${token}`);
    expect(deleteRes.status).toBe(204);

    const finalList = await request(app).get('/posts');
    expect(finalList.body.length).toBe(0);
  });

  it('GET /posts/:id com id invalido deve retornar 400', async () => {
    const res = await request(app).get('/posts/id-invalido');
    expect(res.status).toBe(400);
  });

  it('GET /posts/:id inexistente deve retornar 404', async () => {
    const res = await request(app).get('/posts/64b7f9f1f1a2b3c4d5e6f7a8');
    expect(res.status).toBe(404);
  });
});
