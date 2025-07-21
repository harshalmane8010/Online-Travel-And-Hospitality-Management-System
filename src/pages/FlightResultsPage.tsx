import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
// import FlightResults from '../components/FlightResults';
// import { type FlightData } from '../components/FlightResults';
// import FlightResults from '../component/Flightresults'
// import FlightResults from '../component/Flightresults';
import FlightResults, { type FlightData } from '../component/FlightResults';
// import {type FlightData} from '../component/Flightresults'

const FlightResultsPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);

  const from = searchParams.get('from') || '';
  const to = searchParams.get('to') || '';
  const departureDate = searchParams.get('departureDate') || '';

  const flights: FlightData[] = location.state?.flights || [];

  // ✅ Inject departureDate into each flight object
  const enrichedFlights: FlightData[] = flights.map(flight => ({
    ...flight,
    departureDate,
  }));

  return (
    <div style={{ padding: '2rem' }}>
      <button onClick={() => navigate('/flights')}>← Back to Search</button>
      <h2>Flights from {from} to {to} on {departureDate}</h2>
      <FlightResults flights={enrichedFlights} />
    </div>
  );
};

export default FlightResultsPage;
