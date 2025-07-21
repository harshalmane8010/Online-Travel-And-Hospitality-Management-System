import React, { useEffect, useState } from 'react';
import {Container,Card,ListGroup,Button,Row,Col,Alert} from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import axiosInstance from '../api/axiosInstance';
import jsPDF from 'jspdf';

// Define interfaces for better type safety and readability
interface UserProfile {
  userId: number;
  name: string;
  email: string;
  phone: string;
}

interface BookingDetails {
  bookingId?: string;
  userId: number;
  type: string; // e.g., 'Package', 'Flight', 'Hotel'
  status: string; // e.g., 'Confirmed', 'Failed'
  paymentId: number;
  bookingDate: string;
  flightId: string | null;
  hotelId: string | null;
  roomsBooked: number | null;
  packageId: string | null;
}

interface PackageDetails {
  packageID: string;
  name: string;
  startDate: string;
  endDate: string;
  price: string;
  includedHotels?: string;
  includedFlights?: string;
}

interface HotelDetails {
  hotelId: string;
  name: string;
  location: string;
  pricePerNight: number;
  roomsBooked?: number;
}

interface FlightDetails {
  flightId: string;
  airline: string;
  departure: string;
  arrival: string;
  departure_date: string;
  duration: string;
  price: number;
}

interface InvoiceState {
  bookingId?: string;
  baseAmount?: number;
  gstAmount?: number;
  discountAmount?: number;
  couponApplied?: string;
  paymentMethod?: string;
  totalAmount?: number; // Added totalAmount to state for clarity
  status?: string;
  timestamp?: string;
  errorMessage?: string;
  pkg?: PackageDetails;
  flight?: FlightDetails;
  hotel?: HotelDetails;
  booking?: BookingDetails; // The actual booking object from the backend
}

const InvoicePage: React.FC = () => {
  const { state } = useLocation();
  const invoice = state as InvoiceState; // Cast state to our InvoiceState interface
  const pkg = invoice?.pkg;
  const hotel = invoice?.hotel;
  const flight = invoice?.flight;

  const [profile, setProfile] = useState<UserProfile | null>(null);

  // Fetch user profile on component mount
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.warn('No token found in localStorage.');
      return;
    }

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

  // Display a message if no invoice data is found
  if (!invoice || Object.keys(invoice).length === 0) {
    return (
      <Container className="mt-5 text-center">
        <Alert variant="info">
          <h4 className="alert-heading">No Invoice Data Found!</h4>
          <p>It looks like there's no invoice information to display. Please ensure you've completed a booking process.</p>
        </Alert>
      </Container>
    );
  }

  // Calculate GST amount if baseAmount is available, otherwise default to 0
  const gstAmount = invoice.baseAmount ? invoice.baseAmount * 0.12 : 0;
  // Calculate total amount if not directly provided, or use the provided one
  const calculatedTotalAmount = invoice.totalAmount ?? (invoice.baseAmount || 0) + gstAmount - (invoice.discountAmount || 0);

  // Function to download the invoice as a PDF
  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text('🧾 Booking Invoice', 20, 20);
    doc.setFontSize(12);

    let y = 35; // Starting Y position for text

    // Helper to add text and increment Y position
    const addText = (label: string, value: string | number | null | undefined, bold: boolean = false) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      // The 'bold' parameter is used indirectly by jsPDF's setFont method.
      if (value !== undefined && value !== null) {
        doc.setFont(bold ? 'bold' : 'normal');
        doc.text(`${label}: ${value}`, 20, y);
        y += 7; // Increment Y for the next line
      }
    };

    doc.setFontSize(14);
    addText('Invoice Details', '', true);
    doc.setFontSize(12);
    addText('Invoice ID', `INV-${invoice.booking?.bookingId ?? invoice.bookingId ?? '0001'}`);
    addText('Booking ID', invoice.booking?.bookingId ?? invoice.bookingId ?? 'N/A');
    addText('Status', invoice.status ?? 'N/A');
    addText('Timestamp', invoice.timestamp ?? new Date().toLocaleString());
    y += 5; // Add some space

    doc.setFontSize(14);
    addText('User Information', '', true);
    doc.setFontSize(12);
    addText('Name', profile?.name ?? 'N/A');
    addText('Email', profile?.email ?? 'N/A');
    addText('Phone', profile?.phone ?? 'N/A');
    y += 5;

    // Dynamically add booking type details
    if (pkg) {
      doc.setFontSize(14);
      addText('Package Details', '', true);
      doc.setFontSize(12);
      addText('Name', pkg.name);
      addText('Dates', `${pkg.startDate} to ${pkg.endDate}`);
      addText('Hotel', pkg.includedHotels ?? 'N/A');
      addText('Flight', pkg.includedFlights ?? 'N/A');
      y += 5;
    } else if (hotel) {
      doc.setFontSize(14);
      addText('Hotel Details', '', true);
      doc.setFontSize(12);
      addText('Name', hotel.name);
      addText('Location', hotel.location);
      addText('Rooms Booked', hotel.roomsBooked ?? 1);
      addText('Price/Night', `₹${hotel.pricePerNight?.toFixed(2) ?? 'N/A'}`);
      y += 5;
    } else if (flight) {
      doc.setFontSize(14);
      addText('Flight Details', '', true);
      doc.setFontSize(12);
      addText('Airline', flight.airline);
      addText('From', flight.departure);
      addText('To', flight.arrival);
      addText('Date', flight.departure_date);
      addText('Duration', flight.duration);
      addText('Price', `₹${flight.price?.toFixed(2) ?? 'N/A'}`);
      y += 5;
    }

    doc.setFontSize(14);
    addText('Payment Summary', '', true);
    doc.setFontSize(12);
    addText('Base Amount', `₹${invoice.baseAmount?.toFixed(2) ?? 'N/A'}`);
    addText('Discount', `₹${invoice.discountAmount?.toFixed(2) ?? 'N/A'}`);
    addText('GST (12%)', `₹${gstAmount.toFixed(2)}`);
    addText('Payment Method', invoice.paymentMethod ?? 'N/A');
    addText('Total Paid', `₹${calculatedTotalAmount.toFixed(2)}`, true);
    y += 5;

    if (invoice.errorMessage) {
      doc.setFontSize(12);
      doc.setTextColor(255, 0, 0); // Red color for error
      addText('Error', `⚠️ ${invoice.errorMessage}`);
      doc.setTextColor(0, 0, 0); // Reset color
    }

    // Ensure the filename is always a string by explicitly casting
    const filename = String(`invoice_${invoice.booking?.bookingId ?? invoice.bookingId ?? '0001'}.pdf`);
    doc.save(filename);
  };

  return (
    <Container className="my-5">
      <Card className="shadow-lg rounded-3">
        <Card.Header
          as="h4"
          className={`text-center fw-bold py-3 rounded-top-3 ${
            invoice.status === 'Failed' ? 'bg-danger text-white' : 'bg-success text-white'
          }`}
        >
          {invoice.status === 'Failed'
            ? '❌ Payment Failed'
            : '🎉 Booking Confirmed'}
        </Card.Header>
        <Card.Body className="p-4">
          {invoice.errorMessage && (
            <Alert variant="danger" className="text-center mb-4 rounded-3">
              <h5 className="mb-0">⚠️ {invoice.errorMessage}</h5>
            </Alert>
          )}

          <Row className="mb-4">
            <Col md={6} className="mb-3 mb-md-0">
              <Card className="h-100 border-0 shadow-sm">
                <Card.Body>
                  <h5 className="fw-bold mb-3 text-primary">👤 User Information</h5>
                  <ListGroup variant="flush">
                    <ListGroup.Item className="d-flex justify-content-between align-items-center">
                      <strong>Name:</strong> <span>{profile?.name ?? 'N/A'}</span>
                    </ListGroup.Item>
                    <ListGroup.Item className="d-flex justify-content-between align-items-center">
                      <strong>Email:</strong> <span>{profile?.email ?? 'N/A'}</span>
                    </ListGroup.Item>
                    <ListGroup.Item className="d-flex justify-content-between align-items-center">
                      <strong>Phone:</strong> <span>{profile?.phone ?? 'N/A'}</span>
                    </ListGroup.Item>
                  </ListGroup>
                </Card.Body>
              </Card>
            </Col>
            <Col md={6}>
              <Card className="h-100 border-0 shadow-sm">
                <Card.Body>
                  <h5 className="fw-bold mb-3 text-primary">📄 Booking Details</h5>
                  <ListGroup variant="flush">
                    <ListGroup.Item className="d-flex justify-content-between align-items-center">
                      <strong>Invoice ID:</strong> <span>INV-{invoice.booking?.bookingId ?? invoice.bookingId ?? '0001'}</span>
                    </ListGroup.Item>
                    <ListGroup.Item className="d-flex justify-content-between align-items-center">
                      <strong>Booking ID:</strong> <span>{invoice.booking?.bookingId ?? 'N/A'}</span>
                    </ListGroup.Item>
                    <ListGroup.Item className="d-flex justify-content-between align-items-center">
                      <strong>Status:</strong> <span className={`fw-bold ${invoice.status === 'Failed' ? 'text-danger' : 'text-success'}`}>{invoice.status}</span>
                    </ListGroup.Item>
                    <ListGroup.Item className="d-flex justify-content-between align-items-center">
                      <strong>Timestamp:</strong> <span>{invoice.timestamp ?? new Date().toLocaleString()}</span>
                    </ListGroup.Item>
                  </ListGroup>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          {/* Dynamic Booking Type Details */}
          {(pkg || hotel || flight) && (
            <Row className="mb-4">
              <Col>
                <Card className="border-0 shadow-sm">
                  <Card.Body>
                    {pkg && (
                      <>
                        <h5 className="fw-bold mb-3 text-primary">⛱️Package Details</h5>
                        <ListGroup variant="flush">
                          <ListGroup.Item className="d-flex justify-content-between align-items-center">
                            <strong>Name:</strong> <span>{pkg.name}</span>
                          </ListGroup.Item>
                          <ListGroup.Item className="d-flex justify-content-between align-items-center">
                            <strong>Dates:</strong> <span>{pkg.startDate} → {pkg.endDate}</span>
                          </ListGroup.Item>
                          <ListGroup.Item className="d-flex justify-content-between align-items-center">
                            <strong>Hotel:</strong> <span>{pkg.includedHotels ?? 'N/A'}</span>
                          </ListGroup.Item>
                          <ListGroup.Item className="d-flex justify-content-between align-items-center">
                            <strong>Flight:</strong> <span>{pkg.includedFlights ?? 'N/A'}</span>
                          </ListGroup.Item>
                        </ListGroup>
                      </>
                    )}

                    {hotel && (
                      <>
                        <h5 className="fw-bold mb-3 mt-4 text-primary">🏨 Hotel Details</h5>
                        <ListGroup variant="flush">
                          <ListGroup.Item className="d-flex justify-content-between align-items-center">
                            <strong>Name:</strong> <span>{hotel.name}</span>
                          </ListGroup.Item>
                          <ListGroup.Item className="d-flex justify-content-between align-items-center">
                            <strong>Location:</strong> <span>{hotel.location}</span>
                          </ListGroup.Item>
                          <ListGroup.Item className="d-flex justify-content-between align-items-center">
                            <strong>Rooms Booked:</strong> <span>{hotel.roomsBooked ?? 1}</span>
                          </ListGroup.Item>
                          <ListGroup.Item className="d-flex justify-content-between align-items-center">
                            <strong>Price/Night:</strong> <span>₹{hotel.pricePerNight?.toFixed(2) ?? 'N/A'}</span>
                          </ListGroup.Item>
                        </ListGroup>
                      </>
                    )}

                    {flight && (
                      <>
                        <h5 className="fw-bold mb-3 mt-4 text-primary">✈️ Flight Details</h5>
                        <ListGroup variant="flush">
                          <ListGroup.Item className="d-flex justify-content-between align-items-center">
                            <strong>Airline:</strong> <span>{flight.airline}</span>
                          </ListGroup.Item>
                          <ListGroup.Item className="d-flex justify-content-between align-items-center">
                            <strong>From:</strong> <span>{flight.departure}</span>
                          </ListGroup.Item>
                          <ListGroup.Item className="d-flex justify-content-between align-items-center">
                            <strong>To:</strong> <span>{flight.arrival}</span>
                          </ListGroup.Item>
                          <ListGroup.Item className="d-flex justify-content-between align-items-center">
                            <strong>Date:</strong> <span>{flight.departure_date}</span>
                          </ListGroup.Item>
                          <ListGroup.Item className="d-flex justify-content-between align-items-center">
                            <strong>Duration:</strong> <span>{flight.duration}</span>
                          </ListGroup.Item>
                          <ListGroup.Item className="d-flex justify-content-between align-items-center">
                            <strong>Price:</strong> <span>₹{flight.price?.toFixed(2)}</span>
                          </ListGroup.Item>
                        </ListGroup>
                      </>
                    )}
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          )}

          <Row className="mb-4">
            <Col>
              <Card className="border-0 shadow-sm">
                <Card.Body>
                  <h5 className="fw-bold mb-3 text-primary">💳 Payment Summary</h5>
                  <ListGroup variant="flush">
                    <ListGroup.Item className="d-flex justify-content-between align-items-center">
                      <strong>Base Amount:</strong> <span>₹{invoice.baseAmount?.toFixed(2)}</span>
                    </ListGroup.Item>
                    <ListGroup.Item className="d-flex justify-content-between align-items-center">
                      <strong>Discount:</strong> <span>₹{invoice.discountAmount?.toFixed(2)}</span>
                    </ListGroup.Item>
                    <ListGroup.Item className="d-flex justify-content-between align-items-center">
                      <strong>GST (12%):</strong> <span>₹{gstAmount.toFixed(2)}</span>
                    </ListGroup.Item>
                    <ListGroup.Item className="d-flex justify-content-between align-items-center">
                      <strong>Payment Method:</strong> <span>{invoice.paymentMethod ?? 'N/A'}</span>
                    </ListGroup.Item>
                    <ListGroup.Item className="d-flex justify-content-between align-items-center fw-bold text-success fs-5">
                      <strong>Total Paid:</strong> <span>₹{calculatedTotalAmount.toFixed(2)}</span>
                    </ListGroup.Item>
                  </ListGroup>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          <div className="d-flex justify-content-center mt-4">
            <Button
              variant="primary"
              onClick={downloadPDF}
              className="d-flex align-items-center px-4 py-2 rounded-pill shadow-sm"
              style={{ fontSize: '1.1rem' }}
            >
              <i className="bi bi-file-earmark-arrow-down-fill me-2"></i> 📄 Download Invoice PDF
            </Button>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default InvoicePage;
