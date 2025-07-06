import React, { useState, type ChangeEvent, type FormEvent } from 'react';
import '../styles/SignUp.css';
import { Form, Button, Container, Card } from 'react-bootstrap';

interface FormData {
  email: string;
  password: string;
  phone: string;
  role: string;
}

const SignUp: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
    phone: '',
    role: '',
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    alert(`Signed up as ${formData.email}`);
  };

  return (
    <Container>
      <Card className="signup-glass p-1 shadow-lg">
        <h2 className="text-center text-white mb-4 fw-bold">Create Account</h2>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formEmail">
            <Form.Label className="text-white">Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="form-control-glass"
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formPassword">
            <Form.Label className="text-white">Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="••••••••"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="form-control-glass"
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formPhone">
            <Form.Label className="text-white">Phone</Form.Label>
            <Form.Control
              type="tel"
              placeholder="+91 9876543210"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="form-control-glass"
              required
            />
          </Form.Group>

          <Button type="submit" className="w-100 signup-glass-btn">
            Sign Up
          </Button>
        </Form>
      </Card>
    </Container>
  );
};

export default SignUp;
