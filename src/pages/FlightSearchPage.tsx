import React, { useState } from 'react';
import FlightBooking from '../components/Flightbooking';
import FlightResults from '../components/Flightresults';
import { dummyFlights, type FlightData } from '../data/flightResults';

const FlightSearchPage: React.FC = () => {
  const [filteredFlights, setFilteredFlights] = useState<FlightData[]>([]);
  const [showResults, setShowResults] = useState(false);

  const extractCity = (input: string): string =>
    input.includes('(') ? input.split('(')[0].trim().toLowerCase() : input.toLowerCase();

  const handleSearch = (criteria: { from: string; to: string; departureDate: string }) => {
    const fromCity = extractCity(criteria.from);
    const toCity = extractCity(criteria.to);

    const results = dummyFlights.filter(
      flight =>
        flight.from.toLowerCase() === fromCity &&
        flight.to.toLowerCase() === toCity
    );

    setFilteredFlights(results);
    setShowResults(true);
  };

  const handleRedirect = (from: string, to: string) => {
    handleSearch({ from, to, departureDate: new Date().toISOString().split('T')[0] });
  };

  const resetResults = () => {
    setShowResults(false);
    setFilteredFlights([]);
  };

  return (
    <>
      <FlightBooking
        onSearch={handleSearch}
        handleRedirect={handleRedirect}
        resetResults={resetResults}
      />
      {showResults && <FlightResults flights={filteredFlights} />}
    </>
  );
};

export default FlightSearchPage;
