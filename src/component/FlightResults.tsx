import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Flightresults.css';

import airIndiaLogo from '../assets/air india.png';
import indigoLogo from '../assets/indigo 2.jpg';
import spicejetLogo from '../assets/spice jet.png';

const getAirlineLogo = (airline: string): string => {
  const name = airline.toLowerCase();
  if (name.includes('indigo')) return indigoLogo;
  if (name.includes('air india')) return airIndiaLogo;
  if (name.includes('spice jet')) return spicejetLogo;
  return ''; // fallback
};

export interface FlightData {
  flightId: number;
  airline: string;
  logo: string;
  departure: string;
  arrival: string;
  duration: string;
  price: number;
  availability: boolean;
  departure_date: string;
}

interface Props {
  flights: FlightData[];
}

const FlightResults: React.FC<Props> = ({ flights }) => {
  const navigate = useNavigate();

  const handleBooking = (flight: FlightData) => {
    navigate('/payment', { state: { flight } }); // ✅ skip booking API
  };

  return (
    <div className="results-container">
      <h2>Available Flights</h2>
      {flights.length === 0 ? (
        <p>No flights found.</p>
      ) : (
        flights.map((flight, index) => (
          <div key={index} className="flight-card">
            <div className="airline-info">
              <img src={getAirlineLogo(flight.airline)} alt={`${flight.airline} logo`} />
              <span>{flight.airline}</span>
            </div>

            <div className="flight-details">
              <div><strong>From:</strong> {flight.departure}</div>
              <div><strong>To:</strong> {flight.arrival}</div>
              <div><strong>Departure Date:</strong> {flight.departure_date}</div>
              <div><strong>Duration:</strong> {flight.duration}</div>
              <div><strong>Availability:</strong> {flight.availability ? 'Available' : 'Sold Out'}</div>
            </div>

            <div className="price-section">
              <div className="price">₹{flight.price}</div>
              <button onClick={() => handleBooking(flight)} disabled={!flight.availability}>
                Book Now
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default FlightResults;
