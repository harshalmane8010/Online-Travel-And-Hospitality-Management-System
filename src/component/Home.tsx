import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Kerala from '../assets/kerala.jpg';
import kashmir from "../assets/imad-clicks-DsST40JDEoc-unsplash.jpg";
import { Row, Col, FormControl, Button } from 'react-bootstrap';
import FullScreenCarousel from './FullScreenCarousel';
import CategoryBlock from './CategoryBlock';
import '../styles/Home.css';
import TourismCarousel from './TourismCarousel';
import { useNavigate } from 'react-router-dom';
// import Honeymoon from './HoneyMoon';
import DestinationCard from './DestinationCard';

interface Benefit {
  icon: string;
  title: string;
  description: string;
}

const benefits: Benefit[] = [
  {
    icon: '✈️',
    title: 'Customised Itineraries',
    description:
      'Enjoy our bespoke tour packages that can be tailored according to your preferences for personalised experience.',
  },
  {
    icon: '💰',
    title: 'Wallet-Friendly Prices',
    description:
      'Every traveller from worldwide can embark on unforgettable journeys with our unbeatable holiday package prices.',
  },
  {
    icon: '🔥',
    title: 'Exciting Deals',
    description:
      'Our platform comprises perfect deals and discounts on all exclusive holiday packages to ensure value-for-money.',
  },
  {
    icon: '🎧',
    title: '24/7 Support',
    description:
      'Our customer support team is always available to assist you and resolve travel-related queries instantly.',
  },
];

const destinations = [
  {
    image: Kerala,
    title: 'Kerala',
    description: 'Backwaters, lush greenery, and serene houseboats.',
  },
  {
    image: kashmir,
    title: 'Kashmir',
    description: 'Snow-capped peaks, shikaras on Dal Lake, and vibrant valleys.',
  },
  {
    image: Kerala,
    title: 'Munnar',
    description: 'Tea gardens, misty hills, and cool climate.',
  },
  {
    image: kashmir,
    title: 'Gulmarg',
    description: 'Ski resorts, meadows, and scenic beauty.',
  },
];

const Home: React.FC = () => {
  const navigate = useNavigate();

  return (
    <>
      <FullScreenCarousel />

      <Row className="justify-content-center mb-5 searchbar-container">
        <Col xs={10} md={6}>
          <div className="d-flex bg-white rounded-pill shadow p-2">
            <FormControl
              type="text"
              placeholder="Enter Your Dream Destination!"
              className="border-0 rounded-pill px-3"
            />
            <Button variant="warning" className="rounded-pill px-4 fw-bold">
              Search
            </Button>
          </div>
        </Col>
      </Row>

      <CategoryBlock />

      <br />

      <div>
        <button className="explore-btn" onClick={() => navigate('/explore')}>
          Explore More Packages
          <span className="arrow">→</span>
        </button>
      </div>

      <div className="container text-center mt-4">
        <h1>
          <b>Top Trending Destinations</b>
        </h1>
        <p className="text-muted mb-4">
          <b>
            <em>Explore the hottest travel spots around the globe.</em>
          </b>
        </p>

        <div className="row justify-content-center g-4">
          {destinations.map((destination, index) => (
            <DestinationCard
              key={index}
              image={destination.image}
              title={destination.title}
              description={destination.description}
            />
          ))}

          <div className="banner p-4 mt-5 text-white">
            <h4>Experience the Soul of India in the Heartland of Madhya Pradesh!</h4>
            <button className="btn btn-warning mt-3 fw-bold px-4 rounded-pill">Know More</button>
          </div>
        </div>

        <TourismCarousel />

        <div className="container my-5">
          <div className="row align-items-center mb-4 justify-content-between">
            <div className="col-md-6 text-md-start text-center">
              <h2 className="fw-bold">Benefits of Booking With Us</h2>
            </div>

            <div className="col-md-6 text-md-end text-center mt-3 mt-md-0">
              <div className="rating-box d-inline-flex align-items-center p-2 rounded border">
                <span className="fw-semibold me-2 fs-5">Great</span>
                <div className="text-success fs-4">★★★★☆</div>
                <span className="me-1 text-dark">13,686 reviews on</span>
                <span className="text-success fw-bold">★ Trustpilot</span>
              </div>
            </div>
          </div>

          <div className="row text-center mb-5">
            {benefits.map((benefit, index) => (
              <div className="col-md-3 mb-4" key={index}>
                <div className="benefit-card p-3 h-100 shadow-sm rounded">
                  <div className="fs-1 mb-2">{benefit.icon}</div>
                  <h6 className="fw-bold">{benefit.title}</h6>
                  <p className="text-muted small">{benefit.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
