import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../api/axiosInstance';
import '../styles/CustomizePackage.css';

interface Props {
  pkg: {
    packageID?: number;
    name?: string;
    startDate?: string;
    endDate?: string;
    price?: string;
    image?: string;
    includedFlights?: string;
    includedHotels?: string;
    activities?: { [key: string]: string };
  };
  onClose: () => void;
}

const CustomizePackage: React.FC<Props> = ({ pkg, onClose }) => {
  const [customText, setCustomText] = useState('');
  const [userID, setUserID] = useState<number | null>(null);
  const [loadingUser, setLoadingUser] = useState<boolean>(true);
  const navigate = useNavigate();

  const packageID = pkg?.packageID ?? 2;

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      setLoadingUser(false);
      return;
    }

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const email = payload.email || payload.sub;

      axiosInstance
        .get(`/user-api/users/email/${email}`)
        .then((res) => {
          setUserID(res.data.userId);
          setLoadingUser(false);
        })
        .catch((err) => {
          console.error('Failed to fetch user ID:', err);
          setLoadingUser(false);
        });
    } catch (err) {
      console.error('Error decoding token:', err);
      setLoadingUser(false);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!userID || !packageID) {
      alert('User or package info not available.');
      return;
    }

    try {
      const payload = {
        userID,
        packageID,
        customizationDetails: customText,
      };

      await axiosInstance.post('/api/itineraries', payload);
      alert('Your customization request has been submitted!');
      onClose();
      navigate('/Payment', { state: { pkg } }); // ✅ Pass full package data
    } catch (error) {
      console.error('Error submitting customization:', error);
      alert('Failed to submit customization. Please try again.');
    }
  };

  return (
    <div className="customize-box p-4 rounded shadow bg-white">
      <h2 className="text-center mb-4">Customize Your Travel Package</h2>
      {loadingUser ? (
        <p className="text-center">Loading user info...</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="customText" className="form-label fw-semibold">
              What would you like to change?
            </label>
            <textarea
              id="customText"
              className="form-control"
              rows={6}
              placeholder="E.g., Add more days in Package, prefer vegetarian meals, need airport pickup..."
              value={customText}
              onChange={(e) => setCustomText(e.target.value)}
              required
            />
          </div>
          <div className="d-flex justify-content-end gap-3 mt-4">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Close
            </button>
            <button type="submit" className="btn btn-success px-4">
              Submit and Book Now
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default CustomizePackage;
