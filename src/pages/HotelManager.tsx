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
 
  const handleAddOrUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
 
    const payload: HotelRoom = {
      ...formData,
      hotelId: formData.hotelId ?? 0,
      roomsAvailable: formData.roomsAvailable ?? 0,
      pricePerNight: formData.pricePerNight ?? 0,
    };
 
    try {
      if (editingId !== null) {
        await updateHotel(editingId, payload);
      } else {
        await addHotel(payload);
      }
 
      await fetchRooms();
      resetForm();
    } catch (error) {
      console.error('Error saving hotel room:', error);
    }
  };
 
  const resetForm = () => {
    setFormData({
      hotelId: null,
      name: '',
      location: '',
      roomsAvailable: null,
      pricePerNight: null,
      url: '',
    });
    setEditingId(null);
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
                  <Button variant="primary" size="sm" className="me-2" onClick={() => handleEdit(room)}>
                    Edit
                  </Button>
                  <Button variant="danger" size="sm" onClick={() => room.hotelId !== null && handleDelete(room.hotelId)}>
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </section>
 
      <section className="card glass mb-4 p-3">
<h2>➕ {editingId ? 'Edit Room' : 'Add New Room'}</h2>
<Form className="row g-3" onSubmit={handleAddOrUpdate}>
<Col md={4}>
<div className="form-group-custom">
<label htmlFor="hotelId">Hotel ID</label>
<Form.Control
 
          id="hotelId"
 
          type="number"
 
          placeholder="Hotel ID"
 
          value={formData.hotelId ?? ''}
 
          onChange={handleChange}
 
          readOnly={editingId !== null}
 
        />
</div>
</Col>
<Col md={4}>
<div className="form-group-custom">
<label htmlFor="name">Hotel Name</label>
<Form.Control
 
          id="name"
 
          type="text"
 
          placeholder="Hotel Name"
 
          value={formData.name}
 
          onChange={handleChange}
 
        />
</div>
</Col>
<Col md={4}>
<div className="form-group-custom">
<label htmlFor="location">Location</label>
<Form.Control
 
          id="location"
 
          type="text"
 
          placeholder="Location"
 
          value={formData.location}
 
          onChange={handleChange}
 
        />
</div>
</Col>
<Col md={4}>
<div className="form-group-custom">
<label htmlFor="roomsAvailable">Rooms Available</label>
<Form.Control
 
          id="roomsAvailable"
 
          type="number"
 
          placeholder="Rooms Available"
 
          value={formData.roomsAvailable ?? ''}
 
          onChange={handleChange}
 
        />
</div>
</Col>
<Col md={4}>
<div className="form-group-custom">
<label htmlFor="pricePerNight">Price per Night (₹)</label>
<Form.Control
 
          id="pricePerNight"
 
          type="number"
 
          placeholder="Price per Night"
 
          value={formData.pricePerNight ?? ''}
 
          onChange={handleChange}
 
        />
</div>
</Col>
<Col md={12}>
<Button variant="primary" type="submit">
 
        {editingId ? 'Save Changes' : 'Add Room'}
</Button>
</Col>
 
</Form>
</section>
 
 
 
   
    </Container>
  );
};
 
export default HotelManager;
 
 