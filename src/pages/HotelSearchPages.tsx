import React from 'react';
import HotelBooking from '../components/HotelBooking';

const HotelSearchPage: React.FC = () => {
  const handleSearch = (criteria: {
    location: string;
    checkInDate: string;
    checkOutDate: string;
    guests: string;
  }) => {
    const encodedLocation = encodeURIComponent(criteria.location.trim());
    window.location.href = `/hotels/${encodedLocation}`;
  };

  const resetResults = () => {
    // You can reset any local state here if needed in the future
  };

  return (
    <HotelBooking
      onSearch={handleSearch}
      resetResults={resetResults}
    />
  );
};

export default HotelSearchPage;
