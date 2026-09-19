import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { PostsAPI } from '../api/api';
import PostCard from '../components/PostCard';
import SearchBar from '../components/SearchBar';

const Container = styled.div`
  max-width: 760px;
  margin: 2rem auto;
  padding: 0 1.5rem;
`;

const Title = styled.h1`
  color: #1a1a2e;
  margin-bottom: 1.25rem;
`;

const Empty = styled.p`
  color: #888;
  text-align: center;
  margin-top: 3rem;
`;

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  async function loadPosts() {
    setLoading(true);
    setError(null);
    try {
      const data = await PostsAPI.list();
      setPosts(data);
    } catch (err) {
      setError('Não foi possível carregar os posts. Tente novamente mais tarde.');
    } finally {
      setLoading(false);
    }
  }

  async function handleSearch(term) {
    setLoading(true);
    setError(null);
    try {
      const data = await PostsAPI.search(term);
      setPosts(data);
    } catch (err) {
      setError('Não foi possível buscar os posts.');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadPosts();
  }, []);

  return (
    <Container>
      <Title>Últimas postagens</Title>
      <SearchBar onSearch={handleSearch} onClear={loadPosts} />

      {loading && <p>Carregando posts...</p>}
      {error && <p role="alert">{error}</p>}
      {!loading && !error && posts.length === 0 && (
        <Empty>Nenhum post encontrado.</Empty>
      )}

      {posts.map((post) => (
        <PostCard key={post._id} post={post} />
      ))}
    </Container>
  );
}
