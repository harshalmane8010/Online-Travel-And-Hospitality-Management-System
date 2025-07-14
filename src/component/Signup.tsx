import React, { useState } from 'react';
import type { ChangeEvent, FormEvent } from 'react';

import axios from 'axios';
import '../styles/SignUp.css';
import { Form, Button, Container, Card } from 'react-bootstrap';

interface FormData {
  name: string;
  email: string;
  password: string;
  phone: string;
}

const SignUp: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    password: '',
    phone: '',
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const payload = {
      ...formData,
      roles: [
        {
          roleName: 'USER',
        },
      ],
    };

    try {
      const response = await axios.post('http://localhost:9999/user-api/users', payload);
      alert(`Signup successful for ${response.data.name}`);
      console.log('Created user:', response.data);
    } catch (error: any) {
      console.error('Signup error:', error);
      if (error.response) {
        alert(`Signup failed: ${error.response.data.message || 'Server error'}`);
      } else {
        alert('Signup failed: Network error');
      }
    }
  };

  return (
    <Container>
      <Card className="signup-glass p-1 shadow-lg">
        <h2 className="text-center text-white mb-4 fw-bold">Create Account</h2>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formName">
            <Form.Label className="text-white">Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter full name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="form-control-glass"
              required
            />
          </Form.Group>

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
