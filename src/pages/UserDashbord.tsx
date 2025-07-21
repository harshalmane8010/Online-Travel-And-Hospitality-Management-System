import React, { useEffect, useState } from 'react';
import axios from '../api/axiosInstance';
import { Container, Row, Col, Card } from 'react-bootstrap';
import '../styles/UserDashboard.css';
 
interface UserProfile {
  userId: number;
  name: string;
  email: string;
  phone: string;
}
 
interface Booking {
  bookingId: number;
  userId: number;
  type: string;
  status: string;
  paymentId: number;
  bookingDate: string;
  hotelId?: number | null;
  roomsBooked?: number | null;
  flightId?: number | null;
  packageId?: number | null;
}
 
const UserDashboard: React.FC = () => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [bookings, setBookings] = useState<Booking[]>([]);
 
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return;
 
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const email: string = payload.email || payload.sub;
 
      axios.get(`http://localhost:9999/user-api/users/email/${email}`)
        .then((res) => {
          const user = res.data;
          setProfile(user);
 
          axios.get(`http://localhost:9999/user-api/users/${user.userId}/bookings`)
            .then((bookingRes) => {
              setBookings(bookingRes.data);
            })
            .catch((err) => console.error('Booking fetch error:', err));
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
          <Col md={3}><strong style={{ color: '#000' }}>User ID:</strong> <span style={{ color: '#000' }}>{profile?.userId ?? '—'}</span></Col>
          <Col md={3}><strong style={{ color: '#000' }}>Name:</strong> <span style={{ color: '#000' }}>{profile?.name ?? '—'}</span></Col>
          <Col md={3}><strong style={{ color: '#000' }}>Email:</strong> <span style={{ color: '#000' }}>{profile?.email ?? '—'}</span></Col>
          <Col md={3}><strong style={{ color: '#000' }}>Phone:</strong> <span style={{ color: '#000' }}>{profile?.phone ?? '—'}</span></Col>
        </Row>
      </Card>
 
      <h4 className="fw-bold mb-3" style={{ color: '#000' }}>📦 Your Bookings</h4>
      {bookings.length > 0 ? (
        <Row className="gy-4">
          {bookings.map((booking) => (
            <Col key={booking.bookingId} xs={12} md={6} lg={4}>
              <Card className="ticket-card shadow-sm border border-primary">
                <Card.Header className="ticket-header bg-primary text-white">
                  <strong>📄 Booking #{booking.bookingId}</strong>
                </Card.Header>
                <Card.Body className="ticket-body">
                  <p><strong>Type:</strong> {booking.type}</p>
                  <p><strong>Status:</strong> {booking.status}</p>
                  <p><strong>Booking Date:</strong> {new Date(booking.bookingDate).toLocaleDateString()}</p>
                  <hr />
                  <p><strong>Payment ID:</strong> {booking.paymentId}</p>
                  {booking.hotelId && <p><strong>Hotel ID:</strong> {booking.hotelId}</p>}
                  {booking.roomsBooked && <p><strong>Rooms:</strong> {booking.roomsBooked}</p>}
                  {booking.flightId && <p><strong>Flight ID:</strong> {booking.flightId}</p>}
                  {booking.packageId && <p><strong>Package ID:</strong> {booking.packageId}</p>}
                </Card.Body>
                <Card.Footer className="text-end text-muted small">
                  ✈️ Booking Summary
                </Card.Footer>
              </Card>
            </Col>
          ))}
        </Row>
      ) : (
        <p className="text-muted">No bookings found.</p>
      )}
    </Container>
  );
};
 
export default UserDashboard;
 
 