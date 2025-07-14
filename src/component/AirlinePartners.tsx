import React, { useEffect, useState } from 'react';
import '../styles/AirlinePartners.css';
import { getAllFlights, searchByAirline } from '../api/flightService';
import { useNavigate } from 'react-router-dom';

interface Flight {
  flightid: number;
  airline: string;
  departure: string;
  arrival: string;
  price: number;
  availability: boolean;
  departure_date: string;
}

const AirlinePartners: React.FC = () => {
  const [uniqueAirlines, setUniqueAirlines] = useState<string[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFlights = async () => {
      try {
        const response = await getAllFlights();
        const flights: Flight[] = response.data;
        const airlineSet = new Set<string>();
        flights.forEach((flight) => airlineSet.add(flight.airline));
        const topTwo = Array.from(airlineSet).slice(0, 2);
        setUniqueAirlines(topTwo);
      } catch (error) {
        console.error('Failed to fetch flights:', error);
      }
    };
    fetchFlights();
  }, []);

  const handleAirlineClick = async (airline: string) => {
    try {
      const response = await searchByAirline(airline);
      const flights: Flight[] = response.data;
      navigate('/results', { state: { flights } });
    } catch (error) {
      console.error('Error fetching flights by airline:', error);
    }
  };

  return (
    <div className="airline-partners-container">
      <h2>Experience Flying with our Airline Partners</h2>
      <div className="airline-cards">
        {uniqueAirlines.map((airline, index) => (
          <div
            key={index}
            className={`airline-card-${index + 1}`}
            onClick={() => handleAirlineClick(airline)}
          >
            <div className="airline-name">{airline}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AirlinePartners;
