
// import React, { useEffect, useState } from 'react';
// import '../styles/LuxuryStays.css';
// import { getAllHotels } from '../api/hotelService';

// interface Hotel {
//   hotelId: number;
//   name: string;
//   url: string;
//   pricePerNight: number;
//   location: string;
// }

// const LuxuryStays: React.FC = () => {
//   const [luxuryHotels, setLuxuryHotels] = useState<Hotel[]>([]);

//   useEffect(() => {
//     const fetchHotels = async () => {
//       try {
//         const response = await getAllHotels();
//         const allHotels: Hotel[] = response.data;

//         const sorted = [...allHotels]
//           .filter(h => h.pricePerNight)
//           .sort((a, b) => b.pricePerNight - a.pricePerNight)
//           .slice(0, 2);

//         setLuxuryHotels(sorted);
//       } catch (error) {
//         console.error('Error fetching hotels:', error);
//       }
//     };

//     fetchHotels();
//   }, []);

//   return (
//     <div className="luxury-stays-container">
//       <h2>Luxury Stays with Us</h2>
//       <div className="luxury-cards">
//         {luxuryHotels.map((hotel) => (
//           <div
//             key={hotel.hotelId}
//             className="luxury-card"
//             style={{ backgroundImage: `url(${hotel.url || '../assets/hotel1.jpg'})` }}
//             >
//             <div className="hotel-name">{hotel.name}</div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default LuxuryStays;
