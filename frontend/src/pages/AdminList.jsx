import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { PostsAPI } from '../api/api';

const Container = styled.div`
  max-width: 900px;
  margin: 2rem auto;
  padding: 0 1.5rem;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
  gap: 0.75rem;
`;

const Title = styled.h1`
  color: #1a1a2e;
  margin: 0;
`;

const NewButton = styled(Link)`
  background: #1a1a2e;
  color: #fff;
  text-decoration: none;
  padding: 0.6rem 1.1rem;
  border-radius: 8px;
  font-size: 0.9rem;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  background: #fff;
  border-radius: 10px;
  overflow: hidden;
`;

const Th = styled.th`
  text-align: left;
  background: #f4f4f8;
  padding: 0.75rem 1rem;
  font-size: 0.85rem;
  color: #555;
`;

const Td = styled.td`
  padding: 0.75rem 1rem;
  border-top: 1px solid #eee;
  font-size: 0.92rem;
`;

const ActionLink = styled(Link)`
  color: #1a1a2e;
  margin-right: 0.75rem;
  text-decoration: none;
  font-weight: 600;
`;

const DeleteButton = styled.button`
  color: #c0392b;
  background: none;
  border: none;
  cursor: pointer;
  font-weight: 600;
  padding: 0;
  font-size: 0.92rem;
`;

export default function AdminList() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  async function loadPosts() {
    setLoading(true);
    try {
      const data = await PostsAPI.list();
      setPosts(data);
    } catch (err) {
      setError('Não foi possível carregar as postagens.');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadPosts();
  }, []);

  async function handleDelete(id) {
    if (!window.confirm('Tem certeza que deseja excluir esta postagem?')) return;
    try {
      await PostsAPI.remove(id);
      setPosts((prev) => prev.filter((p) => p._id !== id));
    } catch (err) {
      alert('Não foi possível excluir a postagem.');
    }
  }

  return (
    <Container>
      <Header>
        <Title>Administração de postagens</Title>
        <NewButton to="/admin/novo">+ Nova postagem</NewButton>
      </Header>

      {loading && <p>Carregando...</p>}
      {error && <p role="alert">{error}</p>}

      {!loading && !error && (
        <Table>
          <thead>
            <tr>
              <Th>Título</Th>
              <Th>Autor</Th>
              <Th>Criado em</Th>
              <Th>Ações</Th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post) => (
              <tr key={post._id}>
                <Td>{post.title}</Td>
                <Td>{post.author}</Td>
                <Td>{new Date(post.createdAt).toLocaleDateString('pt-BR')}</Td>
                <Td>
                  <ActionLink to={`/admin/editar/${post._id}`}>Editar</ActionLink>
                  <DeleteButton onClick={() => handleDelete(post._id)}>
                    Excluir
                  </DeleteButton>
                </Td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  );
}
