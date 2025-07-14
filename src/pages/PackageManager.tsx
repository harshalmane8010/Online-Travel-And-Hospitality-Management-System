import React, { useState, useEffect } from 'react';
import '../styles/PackageManager.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, Row, Col, Button } from 'react-bootstrap';
import axios from 'axios';
import axiosInstance from '../api/axiosInstance'; // ✅ use this instead of 'axios'


interface Package {
  packageID: number;
  name: string;
  includedHotels: string;
  includedFlights: string;
  activities: Record<string, string>;
  price: number;
  startDate: string;
  endDate: string;
  itineraryIDs: number[];
}

interface Itinerary {
  itineraryID: number;
  userID: number;  // ✅ match backend field
  customizationDetails: string;
  packageID: number;
}

const PackageManager: React.FC = () => {
  const [packages, setPackages] = useState<Package[]>([]);
  const [itineraries, setItineraries] = useState<Itinerary[]>([]);
  const [formData, setFormData] = useState<Package>({
    packageID: Date.now(),
    name: '',
    includedHotels: '',
    includedFlights: '',
    activities: {},
    price: 0,
    startDate: '',
    endDate: '',
    itineraryIDs: [],
  });
  const [editingId, setEditingId] = useState<number | null>(null);
  const [activityDay, setActivityDay] = useState('');
  const [activityDesc, setActivityDesc] = useState('');

  const BASE_URL = 'http://localhost:9999/api/packages';
  const ITINERARY_URL = 'http://localhost:9999/api/itineraries';

  useEffect(() => {
    fetchPackages();
    fetchItineraries();
  }, []);

  const fetchPackages = async () => {
    try {
      const response = await axiosInstance.get('/api/packages');

      setPackages(response.data);
    } catch (error) {
      console.error('Error fetching packages:', error);
    }
  };

  const fetchItineraries = async () => {
    try {
      const response = await axiosInstance.get('/api/itineraries');

      console.log('Fetched itineraries:', response.data); // 🧪 debug
      setItineraries(response.data);
    } catch (error) {
      console.error('Error fetching itineraries:', error);
    }
  };

  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const addActivity = () => {
    if (activityDay && activityDesc) {
      setFormData(prev => ({
        ...prev,
        activities: { ...prev.activities, [activityDay]: activityDesc },
      }));
      setActivityDay('');
      setActivityDesc('');
    }
  };

  const handleAddOrUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      name: formData.name,
      includedHotels: formData.includedHotels,
      includedFlights: formData.includedFlights,
      activities: formData.activities,
      price: formData.price,
      startDate: formData.startDate,
      endDate: formData.endDate,
      itineraryIDs: [],
    };
    try {
      if (editingId !== null) {
        await axiosInstance.put(`/api/packages/${editingId}`, payload);
      } else {
        await axiosInstance.post('/api/packages', payload);
      }
      fetchPackages();
      setEditingId(null);
      setFormData({
        packageID: Date.now(),
        name: '',
        includedHotels: '',
        includedFlights: '',
        activities: {},
        price: 0,
        startDate: '',
        endDate: '',
        itineraryIDs: [],
      });
      setActivityDay('');
      setActivityDesc('');
    } catch (error) {
      console.error('Error saving package:', error);
    }
  };

  const handleEdit = (pkg: Package) => {
    setFormData(pkg);
    setEditingId(pkg.packageID);
  };

  const handleDelete = async (id: number) => {
    try {
      await axiosInstance.delete(`/api/packages/${id}`);
      fetchPackages();
    } catch (error) {
      console.error('Error deleting package:', error);
    }
  };
  return (
    <div className="dashboard-content p-4">
      <section className="card glass mb-4 p-3">
        <h2>Package Overview</h2>
        <div className="scrollable-table-container">
          <table className="table table-bordered text-white">
            <thead>
              <tr>
                <th>Package ID</th>
                <th>Package Name</th>
                <th>Hotels</th>
                <th>Flights</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Price (₹)</th>
                <th>Itinerary</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {packages.map(pkg => (
                <tr key={pkg.packageID}>
                  <td>{pkg.packageID}</td>
                  <td>{pkg.name}</td>
                  <td>{pkg.includedHotels}</td>
                  <td>{pkg.includedFlights}</td>
                  <td>{pkg.startDate}</td>
                  <td>{pkg.endDate}</td>
                  <td>{pkg.price}</td>
                  <td>
                    <ul>
                      {pkg.activities && typeof pkg.activities === 'object'
                        ? Object.entries(pkg.activities).map(([day, desc], index) => (
                            <li key={index}>
                              <strong>{day}:</strong> {desc}
                            </li>
                          ))
                        : <li>No itinerary available</li>}
                    </ul>
                  </td>
                  <td>
                    <button className="btn btn-sm btn-primary me-2" onClick={() => handleEdit(pkg)}>Edit</button>
                    <button className="btn btn-sm btn-danger" onClick={() => handleDelete(pkg.packageID)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="card glass mb-4 p-3">
        <h2>{editingId ? 'Edit Package' : 'Create New Package'}</h2>
        <Form onSubmit={handleAddOrUpdate} className="row g-3">
          <Form.Group as={Col} md={6}>
            <Form.Label>Package Name</Form.Label>
            <Form.Control type="text" id="name" value={formData.name} onChange={handleChange} />
          </Form.Group>
          <Form.Group as={Col} md={6}>
            <Form.Label>Included Hotels</Form.Label>
            <Form.Control type="text" id="includedHotels" value={formData.includedHotels} onChange={handleChange} />
          </Form.Group>
          <Form.Group as={Col} md={6}>
            <Form.Label>Included Flights</Form.Label>
            <Form.Control type="text" id="includedFlights" value={formData.includedFlights} onChange={handleChange} />
          </Form.Group>
          <Form.Group as={Col} md={3}>
            <Form.Label>Start Date</Form.Label>
            <Form.Control type="date" id="startDate" value={formData.startDate} onChange={handleChange} />
          </Form.Group>
          <Form.Group as={Col} md={3}>
            <Form.Label>End Date</Form.Label>
            <Form.Control type="date" id="endDate" value={formData.endDate} onChange={handleChange} />
          </Form.Group>
          <Form.Group as={Col} md={4}>
            <Form.Label>Price (₹)</Form.Label>
            <Form.Control type="number" id="price" value={formData.price} onChange={handleChange} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="Activities">
            <Form.Label>Day-wise Itinerary</Form.Label>
            <Row>
              <Col md={4}>
                <Form.Control type="text" placeholder="Day 1" value={activityDay} onChange={e => setActivityDay(e.target.value)} />
              </Col>
              <Col md={6}>
                <Form.Control type="text" placeholder="Activity details" value={activityDesc} onChange={e => setActivityDesc(e.target.value)} />
              </Col>
              <Col md={2}>
                <Button variant="outline-secondary" onClick={addActivity}>Add</Button>
              </Col>
            </Row>
            <ul className="mt-3">
              {Object.entries(formData.activities).map(([day, desc], index) => (
                <li key={index}><strong>{day}:</strong> {desc}</li>
              ))}
            </ul>
          </Form.Group>
          <Form.Group as={Col} md={12}>
            <Button type="submit" className="btn btn-primary">
              {editingId ? 'Save Changes' : 'Add Package'}
            </Button>
          </Form.Group>
        </Form>
      </section>

      <section className="card glass mb-4 p-3">
  <h2>Customize Details</h2>
  <div className="scrollable-table-container">
    <table className="table table-bordered text-white">
      <thead>
        <tr>
          <th>Package ID</th>
          <th>Itinerary ID</th>
          <th>User ID</th>
          <th>Customization Details</th>
        </tr>
      </thead>
      <tbody>
        {itineraries.length > 0 ? (
          itineraries.map((itinerary) => (
            <tr key={itinerary.itineraryID}>
              <td>{itinerary.packageID}</td>
              <td>{itinerary.itineraryID}</td>
              <td>{itinerary.userID}</td> {/* ✅ updated field name */}
              <td>{itinerary.customizationDetails}</td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan={4} className="text-center">No customization details found.</td>
          </tr>
        )}
      </tbody>
    </table>
  </div>
</section>
    </div>
  );
};

export default PackageManager;
