import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/ScrollableCards.css';
import Goa from '../assets/goa copy.jpg';
import Mumbai from '../assets/manali2.jpg';
import Paris from '../assets/paris.jpg';
import Bali from '../assets/bali.jpg';
import Dubai from '../assets/dubai1.jpg';
import Tokyo from '../assets/tokyo2.jpg';

interface Destination {
  name: string;
  image: string;
}
const destinations: Destination[] = [
  { name: 'Goa', image: Goa },
  { name: 'Mumbai', image: Mumbai },
  { name: 'Paris', image: Paris },
  { name: 'Bali', image: Bali },
  { name: 'Dubai', image: Dubai },
  { name: 'Tokyo', image: Tokyo },
];


const PopularHotels: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const scrollLeft = () => {
    scrollRef.current?.scrollBy({ left: -240, behavior: 'smooth' });
  };

  const scrollRight = () => {
    scrollRef.current?.scrollBy({ left: 240, behavior: 'smooth' });
  };

  const handleCardClick = (location: string) => {
    navigate(`/hotels/${location}`);
  };

  return (
    <div className="hotel-scroll-section">
      <h2 className="section-title">Popular Hotels</h2>
      <div className="scroll-wrapper">
        <button className="arrow-btn left" onClick={scrollLeft} aria-label="Scroll left">
          &lt;
        </button>
        <div className="horizontal-scroll-container" ref={scrollRef}>
          {destinations.map((place, index) => (
            <div
              className="hotel-card-horizontal"
              key={index}
              onClick={() => handleCardClick(place.name)}
              style={{ cursor: 'pointer' }}
            >
              <img src={place.image} alt={place.name} />
              <h3>{place.name}</h3>
            </div>
          ))}
        </div>
        <button className="arrow-btn right" onClick={scrollRight} aria-label="Scroll right">
          &gt;
        </button>
      </div>
    </div>
  );
};

export default PopularHotels;
