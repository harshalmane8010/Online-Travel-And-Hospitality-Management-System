import React, {
  useState,
  type ChangeEvent,
  type FormEvent,
} from 'react';
import { Container, Card, Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axios from '../api/axiosInstance';
import '../styles/Login.css';

interface LoginProps {
  onClose: () => void;
  onSignupClick: () => void;
  setUserEmail: (email: string) => void;
  setUserName: (name: string) => void; // ✅ new prop
}

const Login: React.FC<LoginProps> = ({
  onClose,
  onSignupClick,
  setUserEmail,
  setUserName,
}) => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await axios.post('/user-api/users/login', {
        username: email,
        password,
      });

      const { token, message } = response.data;
      const payload = JSON.parse(atob(token.split('.')[1]));
      const roles: string[] = payload.roles?.map((r: any) => r.roleName) || [];
      const name: string = payload.name || email; // fallback to email if name isn't in token

      if (!roles.length) {
        alert('Access denied: No roles assigned.');
        return;
      }

      login(token);
      localStorage.setItem('token', token);
      localStorage.setItem('user-email', email);
      localStorage.setItem('user-name', name); // ✅ store name
      setUserEmail(email);
      setUserName(name); // ✅ pass name to App state
      alert(message);
      onClose();

      // ✅ Redirect based on role
      if (roles.includes('ADMIN')) {
        navigate('/admin-dashboard');
      } else if (roles.includes('PACKAGE_MANAGER')) {
        navigate('/package-dashboard');
      } else if (roles.includes('HOTEL_MANAGER')) {
        navigate('/hotel-dashboard');
      } else if (roles.includes('FLIGHT_MANAGER')) {
        navigate('/flight-dashboard');
      } else if (roles.includes('USER')) {
        navigate('/');
      } else {
        console.warn('Unrecognized role:', roles);
        navigate('/');
      }

    } catch (error: any) {
      console.error('Login error:', error);
      if (error.response) {
        alert(error.response.data.message || 'Invalid credentials');
      } else {
        alert('Login failed: Network error');
      }
    }
  };

  return (
    <Container>
      <Card className="login-glass p-4 shadow-lg">
        <h2 className="text-center text-white mb-4 fw-bold">Welcome Back</h2>
        <Form onSubmit={handleLogin}>
          <Form.Group controlId="formBasicEmail" className="mb-3">
            <Form.Label className="text-white">Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
              className="form-control-glass"
              required
            />
          </Form.Group>

          <Form.Group controlId="formBasicPassword" className="mb-4">
            <Form.Label className="text-white">Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
              className="form-control-glass"
              required
            />
          </Form.Group>

          <Button type="submit" className="w-100 login-glass-btn mb-3">
            Login
          </Button>
        </Form>

        <div className="text-center">
          <p className="text-white">Not registered?</p>
          <Button variant="outline-light" size="sm" onClick={onSignupClick}>
            Sign Up
          </Button>
        </div>
      </Card>
    </Container>
  );
};

export default Login;
