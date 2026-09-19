import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import PrivateRoute from './components/PrivateRoute';
import Home from './pages/Home';
import PostView from './pages/PostView';
import PostForm from './pages/PostForm';
import AdminList from './pages/AdminList';
import Login from './pages/Login';
import GlobalStyle from './styles/GlobalStyle';

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <GlobalStyle />
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/posts/:id" element={<PostView />} />
          <Route path="/login" element={<Login />} />

          <Route
            path="/admin"
            element={
              <PrivateRoute>
                <AdminList />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin/novo"
            element={
              <PrivateRoute>
                <PostForm />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin/editar/:id"
            element={
              <PrivateRoute>
                <PostForm />
              </PrivateRoute>
            }
          />

          <Route path="*" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
