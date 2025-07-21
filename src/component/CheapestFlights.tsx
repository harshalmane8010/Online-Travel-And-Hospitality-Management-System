// CheapestFlights.tsx

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/CheapestFlights.css';
import { getAllFlights } from '../api/flightService';
import indigo from '../assets/indigo 2.jpg'
import airIndiaLogo from '../assets/air india.png';
import spicejetLogo from '../assets/spice jet.png';

interface Flight {
    flightId: number;
    airline: string;
    departure: string;
    arrival: string;
    duration: string;
    price: number;
    availability: boolean;
}

const getAirlineLogo = (airline: string): string => {
    const name = airline.toLowerCase();
    if (name.includes('indigo')) return indigo;
    if (name.includes('air india')) return airIndiaLogo;
    if (name.includes('spice jet')) return spicejetLogo;
    return '';

};

const CheapestFlights: React.FC = () => {
    const [flights, setFlights] = useState<Flight[]>([]);
    const navigate = useNavigate();
    useEffect(() => {
        const fetchFlights = async () => {
            try {
                const response = await getAllFlights();
                const sorted = response.data
                    .filter((f: Flight) => f.availability)
                    .sort((a: Flight, b: Flight) => a.price - b.price)
                    .slice(0, 6);
                setFlights(sorted);
            } catch (error) {
                console.error('Error fetching cheapest flights:', error);
            }
        };
        fetchFlights();
    }, []);

    const handleCardClick = (flight: Flight) => {
        navigate('/results', {
            state: {
                flights: [
                    {
                        ...flight,
                        departure_date: new Date().toISOString().split('T')[0],
                    },
                ],
            },
        });
    };

    return (
        <div className="cheapest-flights-container">
            <h2>Cheapest Flights</h2>
            <div className="cheapest-flights-carousel">
                {flights.map((flight, index) => (
                    <div
                        key={index}
                        className="cheap-flight-card"
                        onClick={() => handleCardClick(flight)}
                   >
                        <img
                            src={getAirlineLogo(flight.airline)}
                            alt={`${flight.airline} logo`}
                            className="airline-logo"
                        />
                        <div className="route">
                            {flight.departure} → {flight.arrival}
                       </div>
                        <div className="airline">{flight.airline}</div>
                        <div className="price">From ₹{flight.price}</div>
                    </div>

                ))}
            </div>
        </div>

    );

};

export default CheapestFlights;
