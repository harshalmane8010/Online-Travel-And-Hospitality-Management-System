import React from 'react';
import '../styles/Home.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import image1 from '../assets/image1.png';
import image2 from '../assets/kashmir.png';
import image3 from '../assets/thiland.png';
import image4 from '../assets/europe.png';

interface Destination {
  title: string;
  image: string;
}

const Home: React.FC = () => {
  const destinations: Destination[] = [
    { title: 'Kerala', image: image1 },
    { title: 'Kashmir', image: image2 },
    { title: 'Thailand', image: image3 },
    { title: 'Europe', image: image4 },
    { title: 'Pune', image: image4 },
    { title: 'Mumbai', image: image4 },
    { title: 'Akole', image: image4 },
    { title: 'Sangamaner', image: image4 },
  ];

  return (
    <div className="home-background">
      {/* Hero Section */}
      <section className="hero">
        <p>Make Your Hassle-Free Travel Plans Now!</p>
        <h1>To The World Of An <br /> Incredible Vacation.</h1>
        <div className="search-box">
          <div className="search-item">
            <span role="img" aria-label="location">📍</span>
            <input type="text" placeholder="Type Destination" />
          </div>
          <div className="search-item">
            <span role="img" aria-label="calendar">📅</span>
            <input type="date" />
          </div>
          <div className="search-item">
            <span role="img" aria-label="duration">⏱️</span>
            <input type="text" placeholder="Duration" />
          </div>
          <div className="search-item">
            <span role="img" aria-label="guests">👥</span>
            <input type="number" placeholder="Guests" />
          </div>
          <Button className="explore-btn">Explore Now</Button>
        </div>
      </section>

      {/* Trending Destinations */}
      <section className="trending-destinations">
        <h1><b>Top Trending Destinations</b></h1>
        <p className="subtext"><b><em>Explore the hottest travel spots around the globe.</em></b></p>
        <Container>
          <Row className="justify-content-center g-4">
            {destinations.map((place, index) => (
              <Col key={index} xs={10} sm={6} md={4} lg={3}>
                <Card className="destination-card">
                  {place.image && (
                    <Card.Img variant="top" src={place.image} alt={place.title} />
                  )}
                  <Card.Body>
                    <Card.Title>{place.title}</Card.Title>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Offer Banner */}
      <section>
        <div className="offer-banner mt-5 mb-5">
          <Container>
            <Row className="align-items-center">
              <Col md={8} className="text-center text-md-start">
                <h2 className="offer-heading">🎉 Get Flat 30% Off on Early Bird Bookings!</h2>
                <p className="offer-subtext">
                  Book your dream vacation before the rush begins and unlock exclusive deals on hotels, flights, and complete packages.
                </p>
              </Col>
              <Col md={4} className="text-center text-md-end">
                <button className="offer-btn">Explore Offer</button>
              </Col>
            </Row>
          </Container>
        </div>
      </section>
    </div>
  );
};

export default Home;
