import React, { useState, useEffect } from 'react';
import {
  Container,
  Col,
  Button,
  Form,
  Table,
} from 'react-bootstrap';
import '../styles/HotelManager.css';
import {
  getHotels,
  addHotel,
  updateHotel,
  deleteHotel,
  uploadHotelImage,
} from '../api/hotelApi';

interface HotelRoom {
  hotelId: number | null;
  name: string;
  location: string;
  roomsAvailable: number | null;
  pricePerNight: number | null;
  url?: string;
}

const HotelManager: React.FC = () => {
  const [rooms, setRooms] = useState<HotelRoom[]>([]);
  const [formData, setFormData] = useState<HotelRoom>({
    hotelId: null,
    name: '',
    location: '',
    roomsAvailable: null,
    pricePerNight: null,
    url: '',
  });
  const [file, setFile] = useState<File | null>(null);
  const [editingId, setEditingId] = useState<number | null>(null);

  useEffect(() => {
    fetchRooms();
  }, []);

  const fetchRooms = async () => {
    try {
      const response = await getHotels();
      setRooms(response.data);
    } catch (error) {
      console.error('Error fetching hotel rooms:', error);
    }
  };

  const handleChange = (e: React.ChangeEvent<any>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: ['hotelId', 'roomsAvailable', 'pricePerNight'].includes(id)
        ? value === '' ? null : Number(value)
        : value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const handleAddOrUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    let imageUrl = formData.url || '';

    if (file) {
      const formDataImage = new FormData();
      formDataImage.append('image', file);
      try {
        const uploadRes = await uploadHotelImage(formDataImage);
        imageUrl = uploadRes.data.url;
      } catch (error) {
        console.error('Image upload failed:', error);
      }
    }

    const payload = {
      ...formData,
      hotelId: formData.hotelId ?? 0,
      roomsAvailable: formData.roomsAvailable ?? 0,
      pricePerNight: formData.pricePerNight ?? 0,
      url: imageUrl,
    };

    try {
      if (editingId !== null) {
        await updateHotel(editingId, payload);
      } else {
        await addHotel(payload);
      }
      await fetchRooms();
      setEditingId(null);
      setFormData({
        hotelId: null,
        name: '',
        location: '',
        roomsAvailable: null,
        pricePerNight: null,
        url: '',
      });
      setFile(null);
    } catch (error) {
      console.error('Error saving hotel room:', error);
    }
  };

  const handleEdit = (room: HotelRoom) => {
    setFormData(room);
    setEditingId(room.hotelId ?? null);
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteHotel(id);
      await fetchRooms();
    } catch (error) {
      console.error('Error deleting hotel room:', error);
    }
  };

  return (
    <Container fluid className="dashboard-content p-4">
      {/* Hotel Overview Table */}
      <section className="card glass mb-4 p-3">
        <h2>🏨 Room Overview</h2>
        <Table bordered hover variant="light" className="text-white table-transparent">
          <thead>
            <tr>
              <th>Hotel ID</th>
              <th>Hotel Name</th>
              <th>Location</th>
              <th>Rooms Available</th>
              <th>Price per Night</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {rooms.map((room) => (
              <tr key={room.hotelId ?? Math.random()}>
                <td>{room.hotelId}</td>
                <td>{room.name}</td>
                <td>{room.location}</td>
                <td>{room.roomsAvailable}</td>
                <td>{room.pricePerNight}</td>
                <td>
                  <Button
                    variant="primary"
                    size="sm"
                    className="me-2"
                    onClick={() => handleEdit(room)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => room.hotelId !== null && handleDelete(room.hotelId)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </section>

      {/* Add/Edit Hotel Form */}
      <section className="card glass mb-4 p-3">
        <h2>➕ {editingId ? 'Edit Room' : 'Add New Room'}</h2>
        <Form className="row g-3" onSubmit={handleAddOrUpdate}>
          <Col md={4}>
            <Form.Control
              placeholder="Hotel ID"
              id="hotelId"
              value={formData.hotelId ?? ''}
              onChange={handleChange}
              type="number"
              readOnly={editingId !== null}
            />
          </Col>
          <Col md={4}>
            <Form.Control
              placeholder="Hotel Name"
              id="name"
              value={formData.name}
              onChange={handleChange}
            />
          </Col>
          <Col md={4}>
            <Form.Control
              placeholder="Location"
              id="location"
              value={formData.location}
              onChange={handleChange}
            />
          </Col>
          <Col md={4}>
            <Form.Control
              placeholder="Rooms Available"
              id="roomsAvailable"
              value={formData.roomsAvailable ?? ''}
              onChange={handleChange}
              type="number"
            />
          </Col>
          <Col md={4}>
            <Form.Control
              placeholder="Price per Night (₹)"
              id="pricePerNight"
              value={formData.pricePerNight ?? ''}
              onChange={handleChange}
              type="number"
            />
          </Col>
          <Col md={12}>
            <Form.Control type="file" onChange={handleFileChange} />
          </Col>
          <Col md={12}>
            <Button variant="primary" type="submit">
              {editingId ? 'Save Changes' : 'Add Room'}
            </Button>
          </Col>
        </Form>
      </section>

      {/* Notifications */}
      <section>
        <h2>🔔 Notifications</h2>
        <ul className="text-black">
          <li>Booking for Room 203 by Riya</li>
          <li>AC maintenance in Room 305</li>
        </ul>
      </section>
    </Container>
  );
};

export default HotelManager;
