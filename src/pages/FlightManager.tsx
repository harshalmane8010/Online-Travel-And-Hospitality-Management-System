import React, { useState, useEffect } from 'react';
import { Container, Col, Button, Form, Table } from 'react-bootstrap';
// import '../styles/FlightManager.css';
import '../styles/FlightManager.css'

import {
  getFlights,
  addFlight,
  updateFlight,
  deleteFlight,
} from '../api/flightApi';

interface Flight {
  flightId: number | null;
  airline: string;
  departure: string;
  arrival: string;
  price: number | null;
  availability: boolean;
  departureDate: string;
}

const FlightManager: React.FC = () => {
  const [flights, setFlights] = useState<Flight[]>([]);
  const [formData, setFormData] = useState<Flight>({
    flightId: null,
    airline: '',
    departure: '',
    arrival: '',
    price: null,
    availability: true,
    departureDate: '',
  });
  const [editingId, setEditingId] = useState<number | null>(null);

  useEffect(() => {
    fetchFlights();
  }, []);

  const fetchFlights = async () => {
    try {
      const response = await getFlights();
      setFlights(response.data);
    } catch (error) {
      console.error('Error fetching flights:', error);
    }
  };

  const handleChange = (e: React.ChangeEvent<any>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: ['flightId', 'price'].includes(id)
        ? value === '' ? null : Number(value)
        : id === 'availability'
        ? value === 'true'
        : value,
    }));
  };

  const handleAddOrUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      ...formData,
      flightId: formData.flightId ?? 0,
      price: formData.price ?? 0,
    };
    try {
      if (editingId !== null) {
        await updateFlight(editingId, payload);
      } else {
        await addFlight(payload);
      }
      await fetchFlights();
      setEditingId(null);
      setFormData({
        flightId: null,
        airline: '',
        departure: '',
        arrival: '',
        price: null,
        availability: true,
        departureDate: '',
      });
    } catch (error) {
      console.error('Error saving flight:', error);
    }
  };

  const handleEdit = (flight: Flight) => {
    setFormData(flight);
    setEditingId(flight.flightId ?? null);
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteFlight(id);
      await fetchFlights();
    } catch (error) {
      console.error('Error deleting flight:', error);
    }
  };

  return (
    <Container fluid className="dashboard-content p-4">
      {/* Flight Overview */}
      <section className="card glass mb-4 p-3">
        <h2>📋 Flight Overview</h2>
        <Table bordered hover variant="light" className="text-white table-transparent">
          <thead>
            <tr>
              <th>Flight ID</th>
              <th>Airline</th>
              <th>Departure</th>
              <th>Arrival</th>
              <th>Price</th>
              <th>Availability</th>
              <th>Departure Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {flights.map((flight) => (
              <tr key={flight.flightId ?? Math.random()}>
                <td>{flight.flightId}</td>
                <td>{flight.airline}</td>
                <td>{flight.departure}</td>
                <td>{flight.arrival}</td>
                <td>{flight.price}</td>
                <td>{flight.availability ? 'Available' : 'Unavailable'}</td>
                <td>{flight.departureDate}</td>
                <td>
                  <Button
                    variant="primary"
                    size="sm"
                    className="me-2"
                    onClick={() => handleEdit(flight)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => flight.flightId !== null && handleDelete(flight.flightId)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </section>

      {/* Add / Edit Flight */}
      <section className="card glass mb-4 p-3">
        <h2>➕ {editingId ? 'Edit Flight' : 'Add New Flight'}</h2>
        <Form className="row g-3" onSubmit={handleAddOrUpdate}>
          <Col md={4}>
            <Form.Control
              placeholder="Flight ID"
              id="flightId"
              value={formData.flightId ?? ''}
              onChange={handleChange}
              type="number"
              readOnly={editingId !== null}
            />
          </Col>
          <Col md={4}>
            <Form.Control
              placeholder="Airline"
              id="airline"
              value={formData.airline}
              onChange={handleChange}
            />
          </Col>
          <Col md={4}>
            <Form.Control
              placeholder="Departure"
              id="departure"
              value={formData.departure}
              onChange={handleChange}
            />
          </Col>
          <Col md={4}>
            <Form.Control
              placeholder="Arrival"
              id="arrival"
              value={formData.arrival}
              onChange={handleChange}
            />
          </Col>
          <Col md={4}>
            <Form.Control
              placeholder="Fare (₹)"
              id="price"
              value={formData.price ?? ''}
              onChange={handleChange}
              type="number"
            />
          </Col>
          <Col md={4}>
            <Form.Select
              id="availability"
              value={formData.availability.toString()}
              onChange={handleChange}
            >
              <option value="true">Available</option>
              <option value="false">Unavailable</option>
            </Form.Select>
          </Col>
          <Col md={4}>
            <Form.Control
              type="date"
              id="departureDate"
              value={formData.departureDate}
              onChange={handleChange}
            />
          </Col>
          <Col md={4}>
            <Button variant="primary" type="submit" className="w-100">
              {editingId ? 'Save Changes' : 'Add Flight'}
            </Button>
          </Col>
        </Form>
      </section>

      {/* Notifications */}
      <section>
        <h2>🔔 Notifications</h2>
        <ul className="text-black">
          <li>Flight SG-505 delayed due to weather</li>
          <li>IndiGo flight 6E-320 booked by Akash</li>
        </ul>
      </section>
    </Container>
  );
};

export default FlightManager;
