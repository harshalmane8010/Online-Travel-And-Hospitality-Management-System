import React, { useState, type FormEvent, type ChangeEvent } from 'react';
import '../styles/Login.css';
import { Form, Button, Container, Card } from 'react-bootstrap';

interface LoginProps {
  onClose: () => void;
  onSignupClick: () => void;
}

const Login: React.FC<LoginProps> = ({ onClose, onSignupClick }) => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const dummyUser = {
    email: 'user@example.com',
    password: 'password123',
  };

  const handleLogin = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (email === dummyUser.email && password === dummyUser.password) {
      alert(`Welcome back, ${email.split('@')[0]}!`);
      onClose();
    } else {
      alert('Invalid credentials. Please try again or sign up.');
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
