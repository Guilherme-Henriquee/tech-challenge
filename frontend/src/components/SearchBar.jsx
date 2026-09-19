import { useState } from 'react';
import styled from 'styled-components';

const Wrapper = styled.form`
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
`;

const Input = styled.input`
  flex: 1;
  padding: 0.6rem 0.9rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 0.95rem;

  &:focus {
    outline: none;
    border-color: #ff4d6d;
  }
`;

const Button = styled.button`
  background: #1a1a2e;
  color: #fff;
  border: none;
  padding: 0.6rem 1.2rem;
  border-radius: 8px;
  cursor: pointer;
`;

export default function SearchBar({ onSearch, onClear }) {
  const [term, setTerm] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    if (term.trim()) {
      onSearch(term.trim());
    } else {
      onClear();
    }
  }

  function handleChange(e) {
    const value = e.target.value;
    setTerm(value);
    if (!value.trim()) onClear();
  }

  return (
    <Wrapper onSubmit={handleSubmit}>
      <Input
        type="text"
        placeholder="Buscar posts por palavra-chave..."
        value={term}
        onChange={handleChange}
      />
      <Button type="submit">Buscar</Button>
    </Wrapper>
  );
}
