import React from 'react';
import { Carousel, Button } from 'react-bootstrap';
import './TravelDestination.css';
import Honeymoon from './HoneyMoon';

// Import all images from assets
import Maldives from './assets/Maldives.jpg';
import Jaipur from './assets/Jaipur.jpg';
import Bali from './assets/Bali.jpg';
import Italy from './assets/Italy.jpg';
import Ladakh from './assets/Ladakh.jpg';
import Kerala from './assets/Kerala.jpg';
import Goa from './assets/Goa.jpg';
import Kashmir from "./assets/imad-clicks-DsST40JDEoc-unsplash.jpg";



// Tourism packages with imported images
const tourismPackages = [
  { name: "Maldives", price: "₹ 17,999", image: Maldives },
  { name: "Kashmir", price: "₹ 8,000", image: Kashmir },
  { name: "Italy", price: "₹ 11,999", image: Italy },
  { name: "Bali", price: "₹ 14,999", image: Bali },
  { name: "Jaipur", price: "₹ 10,499", image: Jaipur},
  { name: "Goa", price: "₹ 18,500", image: Goa },
  { name: "Ladakh", price: "₹ 22,000", image: Ladakh },
  { name: "Kerala", price: "₹ 5,999", image: Kerala }
];

// Utility to chunk array into groups of 4
const chunkArray = (arr, size) => {
  return Array.from({ length: Math.ceil(arr.length / size) }, (_, i) =>
    arr.slice(i * size, i * size + size)
  );
};

const TourismCarousel = () => {
  const slides = chunkArray(tourismPackages, 4); // 4 cards per slide

  return (
    <>

    <div className="container py-4">

<div className="col-md-6 text-md-start text-center">
    <br /><br />
    <h2 className="fw-bold">Deals You Can't Miss</h2>
    <p className="text-muted mb-4">
                <b>
                    <em>Travel beyond boundaries with incredible savings</em>
                </b>
            </p>
  </div>
    
      

      <Carousel controls={true} indicators={false} interval={3000}>
        {slides.map((group, slideIndex) => (
          <Carousel.Item key={slideIndex}>
            <div className="d-flex justify-content-center gap-4 flex-wrap">
              {group.map((pkg, idx) => (
                <div key={idx} className="package-card shadow-sm">
                  <img
                    src={pkg.image}
                    alt={pkg.name}
                    className="package-img"
                  />
                  <div className="package-info">
                    <h5>{pkg.name}</h5>
                    <p className="price">From <strong>{pkg.price}</strong></p>
                    <a href="#" className="explore-link">Explore <span>&rarr;</span></a>
                  </div>
                </div>
              ))}
            </div>
          </Carousel.Item>
        ))}
      </Carousel>
    </div>

        <br />
        <Honeymoon></Honeymoon>
        <br />
    </>
  );
};

export default TourismCarousel;
