import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { PostsAPI } from '../api/api';
import { useAuth } from '../context/AuthContext';

const Container = styled.div`
  max-width: 640px;
  margin: 2rem auto;
  padding: 0 1.5rem;
`;

const Title = styled.h1`
  color: #1a1a2e;
  margin-bottom: 1.5rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Label = styled.label`
  font-weight: 600;
  color: #333;
  font-size: 0.9rem;
`;

const Input = styled.input`
  padding: 0.6rem 0.9rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 0.95rem;
`;

const Textarea = styled.textarea`
  padding: 0.6rem 0.9rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 0.95rem;
  min-height: 220px;
  font-family: inherit;
  resize: vertical;
`;

const Button = styled.button`
  background: #ff4d6d;
  color: #fff;
  border: none;
  padding: 0.75rem 1.25rem;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  align-self: flex-start;

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const ErrorMsg = styled.p`
  color: #c0392b;
`;

export default function PostForm() {
  const { id } = useParams();
  const isEditing = Boolean(id);
  const navigate = useNavigate();
  const { user } = useAuth();

  const [form, setForm] = useState({ title: '', content: '', author: '' });
  const [loading, setLoading] = useState(isEditing);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (isEditing) {
      PostsAPI.get(id)
        .then((post) =>
          setForm({ title: post.title, content: post.content, author: post.author })
        )
        .catch(() => setError('Não foi possível carregar o post para edição.'))
        .finally(() => setLoading(false));
    } else if (user?.name) {
      setForm((prev) => ({ ...prev, author: user.name }));
    }
  }, [id, isEditing, user]);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSaving(true);
    setError(null);
    try {
      if (isEditing) {
        await PostsAPI.update(id, form);
      } else {
        await PostsAPI.create(form);
      }
      navigate('/admin');
    } catch (err) {
      setError(
        err.response?.data?.message || 'Não foi possível salvar a postagem.'
      );
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <Container>
        <p>Carregando...</p>
      </Container>
    );
  }

  return (
    <Container>
      <Title>{isEditing ? 'Editar postagem' : 'Nova postagem'}</Title>
      <Form onSubmit={handleSubmit}>
        <div>
          <Label htmlFor="title">Título</Label>
          <Input
            id="title"
            name="title"
            value={form.title}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <Label htmlFor="author">Autor</Label>
          <Input
            id="author"
            name="author"
            value={form.author}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <Label htmlFor="content">Conteúdo</Label>
          <Textarea
            id="content"
            name="content"
            value={form.content}
            onChange={handleChange}
            required
          />
        </div>
        {error && <ErrorMsg role="alert">{error}</ErrorMsg>}
        <Button type="submit" disabled={saving}>
          {saving ? 'Salvando...' : 'Salvar postagem'}
        </Button>
      </Form>
    </Container>
  );
}
