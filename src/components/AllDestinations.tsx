import React from 'react';
import DestinationCard from './DestinationCard';
import '../styles/AllDestinations.css';

import goaImg from '../assets/goa.jpg';
import portbImg from '../assets/port blair.jpg';

interface FlightOption {
  route: string;
  price: string;
}

interface Destination {
  image: string;
  city: string;
  flightOptions: FlightOption[];
}

const destinations: Destination[] = [
  {
    image: portbImg,
    city: 'Port Blair',
    flightOptions: [
      { route: 'Delhi → Port Blair', price: '4652' },
      { route: 'Chennai → Port Blair', price: '2473' },
      { route: 'Bangalore → Port Blair', price: '4087' },
      { route: 'Mumbai → Port Blair', price: '4813' },
    ],
  },
  {
    image: goaImg,
    city: 'Goa',
    flightOptions: [
      { route: 'Delhi → Goa', price: '3890' },
      { route: 'Mumbai → Goa', price: '2400' },
    ],
  },
  // Add more destinations as needed...
];

interface AllDestinationsProps {
  handleRedirect: (from: string, to: string) => void;
}

const AllDestinations: React.FC<AllDestinationsProps> = ({ handleRedirect }) => {
  return (
    <div className="destination-grid">
      {destinations.map((dest, idx) => (
        <DestinationCard
          key={idx}
          image={dest.image}
          city={dest.city}
          flightOptions={dest.flightOptions}
          handleRedirect={handleRedirect}
        />
      ))}
    </div>
  );
};

export default AllDestinations;
