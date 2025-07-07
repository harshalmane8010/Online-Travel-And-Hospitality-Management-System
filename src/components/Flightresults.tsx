import React from 'react';
import '../styles/Flightresults.css';

export interface FlightData {
  airline: string;
  logo: string;
  from: string;
  to: string;
  departure: string;
  arrival: string;
  duration: string;
  price: string;
}

interface FlightResultsProps {
  flights: FlightData[];
}

const FlightResults: React.FC<FlightResultsProps> = ({ flights }) => {
  return (
    <div className="results-container">
      <h2>Available Flights</h2>

      {flights.length === 0 ? (
        <p>No flights found.</p>
      ) : (
        flights.map((flight, index) => (
          <div key={index} className="flight-card">
            <div className="airline-info">
              <img src={flight.logo} alt={`${flight.airline} logo`} />
              <span>{flight.airline}</span>
            </div>

            <div className="flight-details">
              <div><strong>From:</strong> {flight.from}</div>
              <div><strong>To:</strong> {flight.to}</div>
              <div><strong>Departure:</strong> {flight.departure}</div>
              <div><strong>Arrival:</strong> {flight.arrival}</div>
              <div><strong>Duration:</strong> {flight.duration}</div>
            </div>

            <div className="price-section">
              <div className="price">{flight.price}</div>
              <button>Book Now</button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default FlightResults;
