// // src/AppRoutes.tsx

// import React, { useState } from 'react';

// import { Routes, Route, useNavigate } from 'react-router-dom';

// import Flightbooking from './components/Flightbooking';

// import HotelBooking from './components/HotelBooking';

// import Flightresults from './components/Flightresults';

// import HotelResults from '../src/components/Flightresults';

// import { dummyFlights, type FlightData } from './data/flightResults';

// const AppRoutes: React.FC = () => {

//   const [filteredFlights, setFilteredFlights] = useState<FlightData[]>([]);

//   const [showResults, setShowResults] = useState(false);

//   const navigate = useNavigate();

//   const handleSearch = (criteria: { from: string; to: string; departureDate: string }) => {

//     const results = dummyFlights.filter(

//       (flight) =>

//         flight.from.toLowerCase().includes(criteria.from.toLowerCase()) &&

//         flight.to.toLowerCase().includes(criteria.to.toLowerCase())

//     );

//     setFilteredFlights(results);

//     setShowResults(true);

//     navigate('/flights');

//   };

//   const handleRedirectFromCard = (from: string, to: string) => {

//     handleSearch({

//       from,

//       to,

//       departureDate: new Date().toISOString().split('T')[0],

//     });

//   };

//   return (
// <Routes>

//       {/* ✅ Flight Search Form or Results */}
// <Route

//         path="/"

//         element={

//           !showResults ? (
// <Flightbooking onSearch={handleSearch} handleRedirect={handleRedirectFromCard} resetResults={() => setShowResults(false)} />

//           ) : (
// <>
// <Flightresults flights={filteredFlights} />
// <button

//                 onClick={() => {

//                   setShowResults(false);

//                   navigate('/');

//                 }}
// >

//                 Modify Search
// </button>
// </>

//           )

//         }

//       />

//       {/* ✅ Hotels Booking Form */}
// <Route path="/hotels" element={<HotelBooking onSearch={handleSearch} resetResults={() => setShowResults(false)} />} />

//       {/* ✅ Flight Results (Direct Route) */}
// <Route

//         path="/flights"

//         element={
// <>
// <Flightresults flights={filteredFlights} />
// <button

//               onClick={() => {

//                 setShowResults(false);

//                 navigate('/');

//               }}
// >

//               Modify Search
// </button>
// </>

//         }

//       />

//       {/* ✅ Hotel Results by City */}
// <Route path="/hotelresults/:city" element={<HotelResults />} />
// </Routes>

//   );

// };

// export default AppRoutes;
 