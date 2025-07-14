import React, { useEffect, useState } from 'react';
import axios from '../api/axiosInstance';
import { Container, Row, Col, Card } from 'react-bootstrap';
import '../styles/UserDashboard.css';

interface UserProfile {
  userId: number;       // ✅ Updated to match backend response
  name: string;
  email: string;
  phone: string;
}

const UserDashboard: React.FC = () => {
  const [profile, setProfile] = useState<UserProfile | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return;

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const email: string = payload.email || payload.sub;

      axios.get(`/user-api/users/email/${email}`)
        .then((res) => {
          console.log('User profile response:', res.data); // 🧪 Debug
          setProfile(res.data);
        })
        .catch((err) => console.error('User fetch error:', err));
    } catch (err) {
      console.error('JWT decode error:', err);
    }
  }, []);

  return (
    <Container className="mt-5 user-dashboard-container">
      <div className="dashboard-header mb-4">
        <h2 className="text-white fw-bold">👋 Welcome, {profile?.name}</h2>
        <p className="text-light">Here’s your account overview</p>
      </div>

      <Card className="glass-card p-4 mb-5 shadow-lg">
        <Row>
          <Col md={3}>
            <div className="profile-item">
              <strong>User ID:</strong> <span>{profile?.userId ?? '—'}</span>
            </div>
          </Col>
          <Col md={3}>
            <div className="profile-item">
              <strong>Name:</strong> <span>{profile?.name ?? '—'}</span>
            </div>
          </Col>
          <Col md={3}>
            <div className="profile-item">
              <strong>Email:</strong> <span>{profile?.email ?? '—'}</span>
            </div>
          </Col>
          <Col md={3}>
            <div className="profile-item">
              <strong>Phone:</strong> <span>{profile?.phone ?? '—'}</span>
            </div>
          </Col>
        </Row>
      </Card>
    </Container>
  );
};

export default UserDashboard;
