import React from 'react';
// import HotelBooking from '../components/HotelBooking';
import HotelBooking from '../component/HotelBooking';
import { useNavigate } from 'react-router-dom';

const HotelSearchPage: React.FC = () => {
  const navigate = useNavigate();

  const handleSearch = (criteria: {
    location: string;
    checkInDate: string;
    checkOutDate: string;
    guests: string;
  }) => {
    const encodedLocation = encodeURIComponent(criteria.location.trim());
    navigate(`/hotels/${encodedLocation}`);
  };

  const resetResults = () => {
    // Optional: reset state if needed
  };

  return (
    <HotelBooking
      onSearch={handleSearch}
      resetResults={resetResults}
    />
  );
};

export default HotelSearchPage;
