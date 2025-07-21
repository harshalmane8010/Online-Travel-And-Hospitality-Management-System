// import React from 'react';
// import '../styles/AllDestinations.css';

// interface FlightOption {
//   route: string;
//   price: string;
// }

// interface DestinationCardProps {
//   image: string;
//   city: string;
//   flightOptions: FlightOption[];
//   handleRedirect: (from: string, to: string) => void;
// }

// const DestinationCard: React.FC<DestinationCardProps> = ({ image, city, flightOptions, handleRedirect }) => {
//   return (
//     <div className="destination-card">
//       <img src={image} alt={city} className="destination-image" />
//       <h3>{city}</h3>
//       <ul>
//         {flightOptions.map((option, idx) => {
//           const [from, to] = option.route.split('→').map(s => s.trim());
//           return (
//             <li key={idx} onClick={() => handleRedirect(from, to)}>
//               {option.route} – ₹{option.price}
//             </li>
//           );
//         })}
//       </ul>
//     </div>
//   );
// };

// export default DestinationCard;
