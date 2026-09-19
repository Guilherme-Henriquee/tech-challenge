import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import styled from 'styled-components';
import { PostsAPI } from '../api/api';

const Container = styled.div`
  max-width: 760px;
  margin: 2rem auto;
  padding: 0 1.5rem;
`;

const Back = styled(Link)`
  color: #ff4d6d;
  text-decoration: none;
  display: inline-block;
  margin-bottom: 1rem;
`;

const Title = styled.h1`
  color: #1a1a2e;
  margin-bottom: 0.25rem;
`;

const Meta = styled.p`
  color: #888;
  margin-bottom: 1.5rem;
`;

const Content = styled.div`
  color: #333;
  line-height: 1.7;
  white-space: pre-wrap;
`;

export default function PostView() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    PostsAPI.get(id)
      .then(setPost)
      .catch(() => setError('Post não encontrado.'));
  }, [id]);

  if (error) {
    return (
      <Container>
        <Back to="/">← Voltar para os posts</Back>
        <p role="alert">{error}</p>
      </Container>
    );
  }

  if (!post) {
    return (
      <Container>
        <p>Carregando...</p>
      </Container>
    );
  }

  return (
    <Container>
      <Back to="/">← Voltar para os posts</Back>
      <Title>{post.title}</Title>
      <Meta>
        Por {post.author} · {new Date(post.createdAt).toLocaleDateString('pt-BR')}
      </Meta>
      <Content>{post.content}</Content>
    </Container>
  );
}
