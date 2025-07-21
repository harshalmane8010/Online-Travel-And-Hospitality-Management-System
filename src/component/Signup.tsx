import React, { useState } from 'react';
import type { ChangeEvent, FormEvent } from 'react';
import axios from 'axios';
import { Form, Button, Container, Card } from 'react-bootstrap';
import '../styles/SignUp.css';
 
interface FormData {
  name: string;
  email: string;
  password: string;
  phone: string;
}
 
interface SignupProps {
  onSuccess: () => void;
}
 
const Signup: React.FC<SignupProps> = ({ onSuccess }) => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    password: '',
    phone: '',
  });
 
  const [validated, setValidated] = useState(false);
 
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
 
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
 
    if (!form.checkValidity()) {
      e.stopPropagation();
      setValidated(true);
      return;
    }
 
    const payload = {
      ...formData,
      roles: [{ roleName: 'USER' }],
    };
 
    try {
      const response = await axios.post('http://localhost:9999/user-api/users', payload);
      alert(`Signup successful for ${response.data.name}`);
      onSuccess();
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
      <Card className="ssignup-glass p-1 shadow-lg">
        <h2 className="text-center text-white mb-4 fw-bold">Create Account</h2>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formName">
            <Form.Label className="text-white">Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              placeholder="Enter full name"
              value={formData.name}
              onChange={handleChange}
              required
              className="form-control-glass"
            />
          </Form.Group>
 
          <Form.Group className="mb-3" controlId="formEmail">
            <Form.Label className="text-white">Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              placeholder="Enter email"
              value={formData.email}
              onChange={handleChange}
              required
              className="form-control-glass"
            />
            <Form.Control.Feedback type="invalid">
              Please enter a valid email address.
            </Form.Control.Feedback>
          </Form.Group>
 
          <Form.Group className="mb-3" controlId="formPassword">
            <Form.Label className="text-white">Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              required
              className="form-control-glass"
            />
            <Form.Control.Feedback type="invalid">
              Please enter your password.
            </Form.Control.Feedback>
          </Form.Group>
 
          <Form.Group className="mb-3" controlId="formPhone">
            <Form.Label className="text-white">Phone</Form.Label>
            <Form.Control
              type="tel"
              name="phone"
              placeholder="Phone number"
              value={formData.phone}
              onChange={handleChange}
              required
              pattern="^\d{10}$" // ✅ Exactly 10 digits
              className="form-control-glass"
            />
            <Form.Control.Feedback type="invalid">
              Enter a valid 10-digit phone number.
            </Form.Control.Feedback>
          </Form.Group>
 
          <Button type="submit" className="w-100 signup-glass-btn">
            Sign Up
          </Button>
        </Form>
      </Card>
    </Container>
  );
};
 
export default Signup;
 
 