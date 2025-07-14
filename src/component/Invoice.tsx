import React, { useEffect, useState } from 'react';
import {
  Container,
  Card,
  ListGroup,
  Button,
  Row,
  Col,
  Alert
} from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import axiosInstance from '../api/axiosInstance';
import Footer from './Footer';
import jsPDF from 'jspdf';

interface UserProfile {
  userId: number;
  name: string;
  email: string;
  phone: string;
}

const InvoicePage: React.FC = () => {
  const { state } = useLocation();
  const invoice = state;
  const pkg = state?.pkg;
  const hotel = state?.hotel;
  const flight = state?.flight;

  const [profile, setProfile] = useState<UserProfile | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return;

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const email: string = payload.email || payload.sub;

      if (email) {
        axiosInstance
          .get(`/user-api/users/email/${email}`)
          .then((res) => {
            setProfile(res.data);
          })
          .catch((err) => {
            console.warn('Could not fetch user profile:', err);
          });
      }
    } catch (err) {
      console.error('Failed to decode JWT:', err);
    }
  }, []);

  if (!invoice) {
    return <Container className="mt-4"><p>No invoice data found.</p></Container>;
  }

  const gstAmount = invoice.baseAmount ? invoice.baseAmount * 0.12 : 0;

  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text('🧾 Booking Invoice', 20, 20);
    doc.setFontSize(12);

    const lines = [
      `Invoice ID: INV-${invoice.bookingId ?? '0001'}`,
      `Booking ID: ${invoice.bookingId ?? 'N/A'}`,
      `Name: ${profile?.name ?? 'N/A'}`,
      `Email: ${profile?.email ?? 'N/A'}`,
      `Phone: ${profile?.phone ?? 'N/A'}`,
      pkg && `Package: ${pkg.name} (${pkg.startDate} to ${pkg.endDate})`,
      hotel && `Hotel: ${hotel.name} in ${hotel.location} (${hotel.roomsBooked ?? 1} room${hotel.roomsBooked > 1 ? 's' : ''})`,
      flight && `Flight: ${flight.airline} → ${flight.departure} to ${flight.arrival} on ${flight.departure_date}`,
      `Base Amount: ₹${invoice.baseAmount?.toFixed(2) ?? 'N/A'}`,
      `Discount: ₹${invoice.discountAmount?.toFixed(2) ?? 'N/A'}`,
      `GST (12%): ₹${gstAmount.toFixed(2)}`,
      `Total Paid: ₹${invoice.totalAmount?.toFixed(2) ?? 'N/A'}`,
      `Payment Method: ${invoice.paymentMethod ?? 'N/A'}`,
      `Status: ${invoice.status ?? 'N/A'}`,
      `Timestamp: ${invoice.timestamp ?? 'N/A'}`,
      invoice.errorMessage ? `⚠️ Error: ${invoice.errorMessage}` : ''
    ].filter(Boolean);

    let y = 30;
    lines.forEach((line) => {
      doc.text(line, 20, y);
      y += 10;
    });

    doc.save(`invoice_${invoice.bookingId ?? '0001'}.pdf`);
  };

  return (
    <Container className="my-4">
      <Card className="ticket-card shadow-sm">
        <Card.Header
          as="h4"
          className="text-center fw-bold"
          style={{
            color: invoice.status === 'Failed' ? '#d9534f' : '#28a745'
          }}
        >
          {invoice.status === 'Failed'
            ? '❌ Payment Failed'
            : '🎉 Booking Confirmed'}
        </Card.Header>
        <Card.Body>
          {invoice.errorMessage && (
            <Alert variant="danger" className="text-center mb-3">
              {invoice.errorMessage}
            </Alert>
          )}
          <Row>
            <Col>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <strong>Invoice ID:</strong> INV-{invoice.bookingId ?? '0001'}
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong>User Name:</strong> {profile?.name ?? 'N/A'}
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong>Email:</strong> {profile?.email ?? 'N/A'}
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong>Phone:</strong> {profile?.phone ?? 'N/A'}
                </ListGroup.Item>

                {pkg && (
                  <>
                    <ListGroup.Item>
                      <strong>Package:</strong> {pkg.name}
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <strong>Dates:</strong> {pkg.startDate} → {pkg.endDate}
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <strong>Hotel:</strong> {pkg.includedHotels ?? 'N/A'}
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <strong>Flight:</strong> {pkg.includedFlights ?? 'N/A'}
                    </ListGroup.Item>
                  </>
                )}

                {hotel && (
                  <>
                    <ListGroup.Item>
                      <strong>Hotel:</strong> {hotel.name}
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <strong>Location:</strong> {hotel.location}
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <strong>Rooms Booked:</strong>{' '}
                      {hotel.roomsBooked ?? 1}
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <strong>Price/Night:</strong> ₹{hotel.pricePerNight ?? 'N/A'}
                    </ListGroup.Item>
                  </>
                )}

                {flight && (
                  <>
                    <ListGroup.Item>
                      <strong>Flight:</strong> {flight.airline}
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <strong>From:</strong> {flight.departure}
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <strong>To:</strong> {flight.arrival}
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <strong>Date:</strong> {flight.departure_date}
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <strong>Duration:</strong> {flight.duration}
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <strong>Price:</strong> ₹{flight.price}
                    </ListGroup.Item>
                  </>
                )}

                <ListGroup.Item>
                  <strong>Payment Method:</strong>{' '}
                  {invoice.paymentMethod ?? 'N/A'}
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong>Base Amount:</strong> ₹{invoice.baseAmount?.toFixed(2) ?? 'N/A'}
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong>Discount:</strong> ₹{invoice.discountAmount?.toFixed(2) ?? 'N/A'}
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong>GST:</strong> ₹{gstAmount.toFixed(2)}
                </ListGroup.Item>
                <ListGroup.Item className="fw-bold text-success">
                  <strong>Total Paid:</strong> ₹{invoice.totalAmount?.toFixed(2) ?? 'N/A'}
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong>Status:</strong> {invoice.status}
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong>Timestamp:</strong> {invoice.timestamp ?? 'N/A'}
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>

          <div className="d-flex justify-content-center mt-4">
            <Button variant="outline-primary" onClick={downloadPDF}>
              📄 Download Invoice PDF
            </Button>
          </div>
        </Card.Body>
      </Card>
     
       
    </Container>
  );
};

export default InvoicePage;
