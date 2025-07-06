import React from 'react';
import '../styles/Honeymoon.css'
import Maldives from '../assets/Maldives.jpg';
import Jaipur from '../assets/Jaipur.jpg';
import Bali from '../assets/Bali.jpg';
import Italy from '../assets/Italy.jpg';
import Kashmir from "../assets/imad-clicks-DsST40JDEoc-unsplash.jpg";

interface Destination {
  id: string;
  name: string;
  price: string;
  image: string;
}

const destinations: Destination[] = [
  { id: 'andaman', name: 'Andaman', price: '₹ 14,999', image: Jaipur },
  { id: 'maldives', name: 'Maldives', price: '₹ 14,999', image: Maldives },
  { id: 'mauritius', name: 'Mauritius', price: '₹ 9,999', image: Bali },
  { id: 'himachal', name: 'Himachal', price: '₹ 26,999', image: Kashmir },
  { id: 'malaysia', name: 'Malaysia', price: '₹ 18,781', image: Italy },
];

const Honeymoon: React.FC = () => {
  return (
    <div className="seasonal-wrapper">
      <h2> Honeymoon Holidays Packages</h2>
      <p className="subheading">Explore the World's Most Romantic Retreats!</p>
      <div className="custom-grid">
        {destinations.map((item) => (
          <div key={item.id} className={`destination-card ${item.id}`}>
            <img src={item.image} alt={item.name} />
            <div className="destination-card-text">
              <h3>{item.name}</h3>
              <p>Start From <strong>{item.price}</strong></p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Honeymoon;
