import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from '../api/axiosInstance';

interface AddUserModalProps {
  show: boolean;
  onClose: () => void;
  onUserAdded: () => void;
}

const AddUserModal: React.FC<AddUserModalProps> = ({ show, onClose, onUserAdded }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [role, setRole] = useState('USER');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newUser = {
      email,
      password,
      phone,
      roles: [{ roleName: role }],
    };

    try {
      const res = await axios.post('/user-api/users', newUser);

      if (res.status !== 201 && res.status !== 200) {
        throw new Error('Failed to add user');
      }

      alert('User added successfully');
      onUserAdded();
      onClose();
      setEmail('');
      setPassword('');
      setPhone('');
      setRole('USER');
    } catch (err) {
      console.error('Error adding user:', err);
      alert('Error adding user');
    }
  };

  return (
    <Modal show={show} onHide={onClose} centered size="lg" backdrop="static">
      <Modal.Header closeButton>
        <Modal.Title>Add New User</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="user@example.com"
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              required
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="••••••••"
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Phone</Form.Label>
            <Form.Control
              type="tel"
              required
              value={phone}
              onChange={e => setPhone(e.target.value)}
              placeholder="1234567890"
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Role</Form.Label>
            <Form.Select value={role} onChange={e => setRole(e.target.value)}>
              <option value="USER">User</option>
              <option value="ADMIN">Admin</option>
              <option value="HOTEL_MANAGER">Hotel Manager</option>
              <option value="FLIGHT_MANAGER">Flight Manager</option>
              <option value="PACKAGE_MANAGER">Package Manager</option>
            </Form.Select>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onClose}>Cancel</Button>
          <Button type="submit" variant="primary">Add User</Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default AddUserModal;
