import React, { useEffect, useState } from 'react';
import '../styles/Honeymoon.css';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../api/axiosInstance'; // ✅ Secure Axios import
import { AxiosError } from 'axios'; // ✅ Import AxiosError for type checking

// Imported images
import Jaipur from '../assets/Jaipur.jpg';
import Bali from '../assets/Bali.jpg';
import Mauritius from '../assets/Mauritius.jpg';
import Maldives from '../assets/Maldives.jpg';
import Singapore from '../assets/Italy.jpg';
import Kashmir from "../assets/imad-clicks-DsST40JDEoc-unsplash.jpg";

interface Package {
  packageID: number;
  name: string;
  price: number;
  image?: string;
}

const Honeymoon: React.FC = () => {
  const [packages, setPackages] = useState<Package[]>([]);
  const navigate = useNavigate();

  const imageMap: { [key: string]: string } = {
    'Kashmir Serenity': Kashmir,
    'Bali Bliss': Bali,
    'Maldives Escape': Maldives,
    'Singapore Romantic Escape':Singapore ,
    'Mauritius Romance': Mauritius,
  };

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const response = await axiosInstance.get<Package[]>('/api/packages');
        const filtered = response.data
          .filter(pkg =>
            [
              'Kashmir Serenity',
              'Bali Bliss',
              'Maldives Escape',
              'Singapore Romantic Escape',
              'Mauritius Romance',
            ].includes(pkg.name)
          )
          .map(pkg => ({
            ...pkg,
            image: imageMap[pkg.name] || Jaipur,
          }));
        setPackages(filtered);
      } catch (error: unknown) {
        console.error('Error fetching honeymoon packages:', error);
        if (typeof error === 'object' && error !== null && 'response' in error) {
          const axiosErr = error as AxiosError;
          if (axiosErr.response?.status === 401) {
            alert('Session expired. Please log in again.');
            navigate('/login');
          }
        }
      }
    };

    fetchPackages();
  }, [navigate]);

  return (
    <div className="seasonal-wrapper">
      <h2 className="headingb">Honeymoon Holidays Packages</h2>
      <p className="subheading">Explore the World's Most Romantic Retreats!</p>
      <div className="custom-grid">
        {packages.map((item) => (
          <div
            key={item.packageID}
            className={`destination-card ${item.name.toLowerCase().replace(/\s+/g, '')}`}
            onClick={() => navigate('/package-details', { state: { pkg: item } })}
            style={{ cursor: 'pointer' }}
          >
            <img src={item.image} alt={item.name} />
            <div className="destination-card-text">
              <h3>{item.name}</h3>
              <p>
                Price <strong>₹ {item.price}</strong>
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Honeymoon;
