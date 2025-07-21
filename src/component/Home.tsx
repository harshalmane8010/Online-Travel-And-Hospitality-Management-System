import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { Row, Col, FormControl, Button, ListGroup } from 'react-bootstrap';
import FullScreenCarousel from './FullScreenCarousel';
import '../styles/Home.css';
import TourismCarousel from './TourismCarousel';
import { useNavigate } from 'react-router-dom';
import TrendingDestinations from './TrendingDestinations';
import ExperienceBanner from './ExperienceBanner';
import axiosInstance from '../api/axiosInstance'; // ✅ Secure Axios
 
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
 
const Home: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [allPackages, setAllPackages] = useState<any[]>([]);
  const [suggestions, setSuggestions] = useState<string[]>([]);
 
  useEffect(() => {
    axiosInstance
      .get('/api/packages')
      .then(res => setAllPackages(res.data))
      .catch(err => {
        console.error('Error fetching packages:', err);
      });
  }, [navigate]);
 
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
 
    if (value.length > 0) {
      const filtered = allPackages
        .map(pkg => pkg.name)
        .filter(name => name.toLowerCase().includes(value.toLowerCase()));
      setSuggestions(filtered.slice(0, 5));
    } else {
      setSuggestions([]);
    }
  };
 
  const handleSearch = (query?: string) => {
    navigate('/explore', { state: { searchQuery: query || searchQuery } });
    setSuggestions([]);
  };
 
  return (
    <>
      <FullScreenCarousel />
      <br />
      <Row className="justify-content-center mb-5 searchbar-container">
        <Col xs={10} md={6}>
          <div className="d-flex flex-column position-relative bg-white rounded-pill shadow p-2">
            <div className="d-flex">
              <FormControl
                type="text"
                placeholder="Enter Your Dream Destination!"
                className="border-0 rounded-pill px-3"
                value={searchQuery}
                onChange={handleSearchChange}
              />
              <Button
                variant="warning"
                className="rounded-pill px-4 fw-bold"
                onClick={() => handleSearch()}
              >
                Search
              </Button>
            </div>
            {suggestions.length > 0 && (
              <ListGroup className="suggestion-dropdown">
                {suggestions.map((suggestion, index) => (
                  <ListGroup.Item
                    key={index}
                    action
                    onClick={() => handleSearch(suggestion)}
                  >
                    {suggestion}
                  </ListGroup.Item>
                ))}
              </ListGroup>
            )}
          </div>
        </Col>
      </Row>
 
      <div>
        <button className="explore-btn" onClick={() => navigate('/explore')}>
          Explore More Packages
          <span className="arrow">→</span>
        </button>
      </div>
 
      <div className="container text-center mt-4">
       
        <TrendingDestinations />
        <TourismCarousel />
        <ExperienceBanner />
 
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
 
 