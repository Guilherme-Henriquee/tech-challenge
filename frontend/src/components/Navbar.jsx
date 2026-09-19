import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useAuth } from '../context/AuthContext';

const Bar = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 2rem;
  background: #1a1a2e;
  color: #fff;
  flex-wrap: wrap;
`;

const Brand = styled(Link)`
  font-size: 1.25rem;
  font-weight: 700;
  color: #fff;
  text-decoration: none;
`;

const Links = styled.div`
  display: flex;
  gap: 1.25rem;
  align-items: center;
  flex-wrap: wrap;

  a {
    color: #e0e0e0;
    text-decoration: none;
    font-size: 0.95rem;
  }
  a:hover {
    color: #ff4d6d;
  }
`;

const Button = styled.button`
  background: #ff4d6d;
  border: none;
  color: #fff;
  padding: 0.45rem 0.9rem;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.9rem;
`;

export default function Navbar() {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate('/');
  }

  return (
    <Bar>
      <Brand to="/">📚 Blog da Escola</Brand>
      <Links>
        <Link to="/">Posts</Link>
        {isAuthenticated ? (
          <>
            <Link to="/admin">Administração</Link>
            <Link to="/admin/novo">Nova postagem</Link>
            <span>Olá, {user?.name || 'Professor(a)'}</span>
            <Button onClick={handleLogout}>Sair</Button>
          </>
        ) : (
          <Link to="/login">Área do professor</Link>
        )}
      </Links>
    </Bar>
  );
}
