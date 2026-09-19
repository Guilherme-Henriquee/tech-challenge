import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Card = styled(Link)`
  display: block;
  background: #fff;
  border: 1px solid #eee;
  border-radius: 10px;
  padding: 1.25rem 1.5rem;
  margin-bottom: 1rem;
  text-decoration: none;
  color: inherit;
  transition: box-shadow 0.15s ease, transform 0.15s ease;

  &:hover {
    box-shadow: 0 4px 14px rgba(0, 0, 0, 0.08);
    transform: translateY(-2px);
  }
`;

const Title = styled.h3`
  margin: 0 0 0.35rem 0;
  color: #1a1a2e;
`;

const Meta = styled.p`
  margin: 0 0 0.5rem 0;
  font-size: 0.85rem;
  color: #888;
`;

const Excerpt = styled.p`
  margin: 0;
  color: #444;
  line-height: 1.4;
`;

function excerpt(text, length = 160) {
  if (!text) return '';
  return text.length > length ? `${text.slice(0, length)}…` : text;
}

export default function PostCard({ post }) {
  return (
    <Card to={`/posts/${post._id}`}>
      <Title>{post.title}</Title>
      <Meta>
        Por {post.author} ·{' '}
        {new Date(post.createdAt).toLocaleDateString('pt-BR')}
      </Meta>
      <Excerpt>{excerpt(post.content)}</Excerpt>
    </Card>
  );
}
