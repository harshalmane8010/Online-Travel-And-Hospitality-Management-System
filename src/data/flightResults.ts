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

export const dummyFlights: FlightData[] = [
  {
    airline: 'IndiGo',
    logo: '/images/indigo.png',
    from: 'Delhi',
    to: 'Goa',
    departure: '08:00',
    arrival: '10:30',
    duration: '2h 30m',
    price: '₹3890',
  },
  {
    airline: 'Air India',
    logo: '/images/airindia.png',
    from: 'Mumbai',
    to: 'Goa',
    departure: '09:00',
    arrival: '11:00',
    duration: '2h',
    price: '₹2400',
  },
  {
    airline: 'SpiceJet',
    logo: '/images/spicejet.png',
    from: 'Delhi',
    to: 'Port Blair',
    departure: '06:45',
    arrival: '10:15',
    duration: '3h 30m',
    price: '₹4652',
  },
  {
    airline: 'Vistara',
    logo: '/images/vistara.png',
    from: 'Chennai',
    to: 'Port Blair',
    departure: '07:30',
    arrival: '09:45',
    duration: '2h 15m',
    price: '₹2473',
  },
];
