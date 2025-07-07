import React, { useRef } from 'react';
import '../styles/ScrollableCards.css';

interface Destination {
  name: string;
  image: string;
}

// ✅ Use public folder paths or import images for reliability
const destinations: Destination[] = [
  { name: 'Goa', image: '/images/goa.jpg' },
  { name: 'Manali', image: '/images/manali.jpg' },
  { name: 'Paris', image: '/images/paris.jpg' },
  { name: 'Bali', image: '/images/bali.jpg' },
  { name: 'Dubai', image: '/images/dubai1.jpg' },
  { name: 'Tokyo', image: '/images/tokyo2.jpg' },
];

const PopularHotels: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    scrollRef.current?.scrollBy({ left: -240, behavior: 'smooth' });
  };

  const scrollRight = () => {
    scrollRef.current?.scrollBy({ left: 240, behavior: 'smooth' });
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
            <div className="hotel-card-horizontal" key={index}>
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
