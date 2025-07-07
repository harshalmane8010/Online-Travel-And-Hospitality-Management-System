import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import FlightSearchPage from './pages/FlightSearchPage';
import HotelResults from './components/HotelResults';
import HotelSearchPage from './pages/HotelSearchPages';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        
        <Route path="/" element={<FlightSearchPage />} />
        <Route path="/hotels" element={<HotelSearchPage />} />
        <Route path="/hotels/:city" element={<HotelResults />} />
      </Routes>
    </Router>
  );
};

export default App;