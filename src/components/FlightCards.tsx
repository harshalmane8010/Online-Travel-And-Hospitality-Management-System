import React from 'react';
import '../styles/FlightCards.css';

interface FlightCardData {
  city: string;
  img: string;
  via: string[];
}

const flightData: FlightCardData[] = [
  { city: 'Bangalore', via: ['Delhi', 'Mumbai', 'Coimbatore', 'Madurai'], img: 'images/bangalore.jpg' },
  { city: 'Goa', via: ['Delhi', 'Mumbai', 'Bangalore', 'Ahmedabad'], img: 'images/goa.jpg' },
  { city: 'Mumbai', via: ['Delhi', 'Bangalore', 'Chennai', 'Ahmedabad'], img: 'images/mumbai.jpg' },
  { city: 'Hyderabad', via: ['Chennai', 'Mumbai', 'Bangalore', 'Delhi'], img: 'images/hyderabad.jpg' },
  { city: 'Delhi', via: ['Mumbai', 'Pune', 'Bangalore', 'Chennai'], img: 'images/delhi.jpg' },
  { city: 'Pune', via: ['Delhi', 'Bangalore', 'Chennai', 'Ahmedabad'], img: 'images/pune.jpg' },
  { city: 'Kolkata', via: ['Delhi', 'Mumbai', 'Bangalore', 'Pune'], img: 'images/kolkata.jpg' },
  { city: 'Jaipur', via: ['Mumbai', 'Delhi', 'Pune', 'Bangalore'], img: 'images/jaipur.jpg' },
];

const FlightCards: React.FC = () => {
  const handleRedirect = (from: string, to: string) => {
    const url = `/search?from=${encodeURIComponent(from)}&to=${encodeURIComponent(to)}`;
    window.location.href = url;
  };

  return (
    <div className="flight-card-wrapper">
      {flightData.map((flight, index) => (
        <div key={index} className="flight-card">
          <img src={flight.img} alt={flight.city} className="flight-img" />
          <div className="flight-info">
            <h3>{flight.city} Flights</h3>
            <p>
              Via:{' '}
              {flight.via.map((fromCity, i) => (
                <span
                  key={i}
                  className="via-link"
                  onClick={() => handleRedirect(fromCity, flight.city)}
                >
                  {fromCity}
                  {i < flight.via.length - 1 && ', '}
                </span>
              ))}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FlightCards;
