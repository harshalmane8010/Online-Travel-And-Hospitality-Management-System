import React, { useEffect, useState } from 'react';
import { Table, Button, Form } from 'react-bootstrap';
import axios from '../api/axiosInstance';
import AddUserModal from '../component/AddUserModal';
import '../styles/Admin.css';

interface User {
  userId: number;
  email: string;
  roles: { roleName: string }[];
}

interface Booking {
  bookingId: number;
  userId: number;
  type: string;
  status: string;
  paymentId: number;
  bookingDate: string;
}

const AdminDashboard: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [userRes, bookingRes] = await Promise.all([
          axios.get('/user-api/users'),
          axios.get('/bookings'),
        ]);
        setUsers(userRes.data);
        setBookings(bookingRes.data);
      } catch (err) {
        console.error('Data fetch failed:', err);
        alert('Failed to load dashboard data.');
      }
    };

    fetchData();
  }, []);

  const filteredUsers = users.filter(user =>
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = async (userId: number) => {
    if (!window.confirm('Are you sure you want to delete this user?')) return;

    try {
      const res = await axios.delete(`/user-api/users/${userId}`);
      setUsers(prev => prev.filter(user => user.userId !== userId));
      alert('User deleted successfully');
    } catch (err: any) {
      console.error('Delete failed:', err.response?.data || err.message);
      alert(err.response?.data?.message || 'Failed to delete user');
    }
  };

  const handleEdit = async (user: User) => {
    const newEmail = prompt('Enter new email:', user.email);
    if (!newEmail || newEmail === user.email) return;

    try {
      const updatedUser = { ...user, email: newEmail };
      const res = await axios.put(`/user-api/users/${user.email}`, updatedUser);
      setUsers(prev => prev.map(u => (u.userId === user.userId ? res.data : u)));
      alert('User updated successfully');
    } catch (err) {
      console.error('Update failed:', err);
      alert('Failed to update user');
    }
  };

  return (
    <div className="admin-fullpage">
      <div className="admin-content">
        <section className="glass">
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-4 gap-3">
            <h2 className="mb-0">User Management</h2>
            <div className="d-flex flex-wrap align-items-center gap-2">
              <Form.Control
                type="text"
                size="sm"
                placeholder="Search user by email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ minWidth: '200px' }}
              />
              <Button
                className="add-user-btn"
                size="lg"
                onClick={() => setShowAddModal(true)}
              >
                + Add User
              </Button>
            </div>
          </div>

          <div className="table-responsive">
            <Table bordered hover className="user-table wide-table">
              <thead className="table-dark">
                <tr>
                  <th>User ID</th>
                  <th>Email</th>
                  <th>Roles</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.length > 0 ? (
                  filteredUsers.map((user) => (
                    <tr key={user.userId}>
                      <td>{user.userId}</td>
                      <td>{user.email}</td>
                      <td>{user.roles.map(role => role.roleName).join(', ')}</td>
                      <td>
                        <Button
                          size="sm"
                          variant="outline-primary"
                          className="me-2"
                          onClick={() => handleEdit(user)}
                        >
                          Edit
                        </Button>
                        <Button
                          size="sm"
                          variant="outline-danger"
                          onClick={() => handleDelete(user.userId)}
                        >
                          Delete
                        </Button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4} className="text-center">No users found.</td>
                  </tr>
                )}
              </tbody>
            </Table>
          </div>
        </section>

        <section className="glass">
          <h2>Booking Overview</h2>
          {bookings.length > 0 ? (
            <Table bordered hover responsive className="mt-3">
              <thead className="table-dark">
                <tr>
                  <th>Booking ID</th>
                  <th>User ID</th>
                  <th>Type</th>
                  <th>Status</th>
                  <th>Payment ID</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((booking) => (
                  <tr key={booking.bookingId}>
                    <td>{booking.bookingId}</td>
                    <td>{booking.userId}</td>
                    <td>{booking.type}</td>
                    <td>{booking.status}</td>
                    <td>{booking.paymentId}</td>
                    <td>{booking.bookingDate}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : (
            <p>No bookings found.</p>
          )}
        </section>

        <section className="glass">
          <h2>Customer Queries</h2>
          <div className="query-item">
            <p><strong>From:</strong> user@example.com</p>
            <p><strong>Message:</strong> Can I change my travel date?</p>
            <textarea className="form-control mb-2" placeholder="Reply..." />
            <Button variant="primary">Send Reply</Button>
          </div>
        </section>

        <section className="glass">
          <h2>Reports</h2>
          <Button className="btn btn-outline-primary me-2">Download Analytics</Button>
          <Button className="btn btn-outline-secondary">Download Logs</Button>
        </section>
      </div>

      <AddUserModal
        show={showAddModal}
        onClose={() => setShowAddModal(false)}
        onUserAdded={() => {
          axios.get('/user-api/users')
            .then(res => setUsers(res.data))
            .catch(err => console.error('Failed to refresh users:', err));
        }}
      />
    </div>
  );
};

export default AdminDashboard;
