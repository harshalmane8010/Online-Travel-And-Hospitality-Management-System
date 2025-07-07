import React, { useState } from 'react';
import '../styles/DestinationCard.css';

interface FlightOption {
  route: string;
  price: string;
}

interface DestinationCardProps {
  image: string;
  city: string;
  flightOptions: FlightOption[];
  handleRedirect: (from: string, to: string) => void;
}

const DestinationCard: React.FC<DestinationCardProps> = ({
  image,
  city,
  flightOptions,
  handleRedirect,
}) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="destination-card"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <img src={image} alt={`${city} Flights`} />
      <div className="city-title">{city} Flights</div>

      {hovered && (
        <div className="flight-info">
          {flightOptions.map((flight, index) => {
            const [from, to] = flight.route.split('→').map((s) => s.trim());

            return (
              <button
                key={index}
                className="flight-link"
                onClick={() => handleRedirect(from, to)}
              >
                {flight.route} → ₹{flight.price}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default DestinationCard;
