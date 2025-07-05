import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; // Optional, if you need Bootstrap JS components
import Kerala from './assets/kerala.jpg';
import kashmir from "./assets/imad-clicks-DsST40JDEoc-unsplash.jpg"
import { Container, Row, Col, FormControl, Button } from 'react-bootstrap';
// import TourCategories from './CategoryBlock';
import FullScreenCarousel from './FullScreenCarousel';
import CategoryBlock from './CategoryBlock';
import './TravelDestination.css';
import TourismCarousel from './TourismCarousel';
import { useNavigate } from 'react-router-dom';
 import Honeymoon from './HoneyMoon';


const benefits = [
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
  
  const reviews = [
    { name: 'Sunil Wanjari', date: '2 days ago', text: 'Great experience with support all air hostess thanks' },
    { name: 'Michelle Willia...', date: '2 days ago', text: 'Emon was great he very professional.' },
    { name: 'Paul', date: '2 days ago', text: 'Smooth with great discount' },
    { name: 'Sagar', date: 'June 24', text: 'It was a pleasant ride. Airhostess were pleasing. It’s a short journey, few...' },
    { name: 'Krishna', date: 'June 23', text: 'Great support team. All issues resolved. Great support.' },
  ];
  

const TrendingDestinations = () => {
  
  const navigate = useNavigate();
  
    return (
        <>
        <FullScreenCarousel></FullScreenCarousel>

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


        {/* categories tour */}

      <CategoryBlock> </CategoryBlock>

      <br />

      {/* explore button option */}
      

      <div>
  <button className="explore-btn" onClick={() => navigate('/explore')}>
        Explore More Packages
     <span className="arrow">→</span>
  </button>
</div>

        
        {/* Explorer Cards */}
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
                <div className="col-md-3 col-sm-6">
                    <div className="card">
                        <img src={Kerala} className="card-img-top" alt="kerala" />
                        <div className="card-body">
                            <h5 className="card-title">Kerala</h5>
                            <p className="card-text">Backwaters, lush greenery, and serene houseboats.</p>
                            <button className="btn btn-outline-primary btn-sm">Explore</button>
                        </div>
                    </div>
                </div>
                <div className="col-md-3 col-sm-6">
                    <div className="card">
                        <img src={Kerala} className="card-img-top" alt="Kerala" />
                        <div className="card-body">
                            <h5 className="card-title">Kerala</h5>
                            <p className="card-text">Backwaters, lush greenery, and serene houseboats.</p>
                            <button className="btn btn-outline-primary btn-sm">Explore</button>
                        </div>
                    </div>
                </div>
                <div className="col-md-3 col-sm-6">
                    <div className="card">
                        <img src={Kerala} className="card-img-top" alt="Kerala" />
                        <div className="card-body">
                            <h5 className="card-title">Kerala</h5>
                            <p className="card-text">Backwaters, lush greenery, and serene houseboats.</p>
                            <button className="btn btn-outline-primary btn-sm">Explore</button>
                        </div>
                    </div>
                </div>
                <div className="col-md-3 col-sm-6">
                    <div className="card">
                        <img src={kashmir} className="card-img-top" alt="Kashmir" />
                        <div className="card-body">
                            <h5 className="card-title">Kashmir</h5>
                            <p className="card-text">Snow-capped peaks, shikaras on Dal Lake, and vibrant valleys.</p>
                            <button className="btn btn-outline-primary btn-sm">Explore</button>
                        </div>
                    </div>
                </div>

                <br />

                {/* Banner */}
                <div className="banner p-4 mt-5 text-white">
                    <h4>Experience the Soul of India in the Heartland of Madhya Pradesh!</h4>
                    <button className="btn btn-warning mt-3 fw-bold px-4 rounded-pill">Know More</button>
                    
                </div>
            </div>


            <TourismCarousel></TourismCarousel>


{/* benefits and the trustpilot */}

            <div className="container my-5">
      {/* Heading and Trustpilot Rating */}
      <div className="row align-items-center mb-4 justify-content-between">
  {/* Left Side Heading */}
  <div className="col-md-6 text-md-start text-center">
    <h2 className="fw-bold">Benefits of Booking With Us</h2>
  </div>

  {/* Right Side Rating Box */}
  <div className="col-md-6 text-md-end text-center mt-3 mt-md-0">
    <div className="rating-box d-inline-flex align-items-center p-2 rounded border">
      <span className="fw-semibold me-2 fs-5">Great</span>
      <div className="text-success fs-4">★★★★☆</div>
      <span className="me-1 text-dark">13,686 reviews on</span>
      <span className="text-success fw-bold">★ Trustpilot</span>
    </div>
  </div>
</div>






      {/* Benefits Section */}
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

      {/* Reviews Section */}
      <div className="row">
        {reviews.map((review, index) => (
          <div className="col-md-6 mb-3" key={index}>
            <div className="review-card p-3 border rounded shadow-sm">
              <h6 className="mb-1">{review.name} <small className="text-muted">({review.date})</small></h6>
              <p className="mb-0 text-muted">{review.text}</p>
            </div>
          </div>
        ))}
      </div>

     
    </div>





        </div>
        </>
    );
};

export default TrendingDestinations;