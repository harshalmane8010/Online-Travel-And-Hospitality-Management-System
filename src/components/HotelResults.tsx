import React from 'react';
import { useParams } from 'react-router-dom';
// import '../styles/HotelResults.css'; // Optional: if you have styles for this
// import '../styles/'

const HotelResults: React.FC = () => {
  const { city } = useParams<{ city: string }>();

  const formattedCity = city
    ? city.charAt(0).toUpperCase() + city.slice(1).toLowerCase()
    : 'Unknown';

  return (
    <div className="results-container">
      <h2>Available Hotels in {formattedCity}</h2>
      <p>[Display hotel listings for {formattedCity}]</p>
    </div>
  );
};

export default HotelResults;
