import React from 'react';
import '../styles/ExperienceBanner.css';
import boatImg from '../assets/Maldives.jpg';
import eiffelImg from '../assets/kerala.jpg';
import beachImg from '../assets/Goa.jpg';
import { Container, Row, Col, Button } from 'react-bootstrap';
 
const ExperienceBanner: React.FC = () => {
  return (
    <div className="experience-banner py-6 px-3">
      <Container>
        <Row className="align-items-center">
          <Col md={6} className="text-area text-white">
            <h4 className="trust-text">Built On Trust</h4>
            <h2 className="experience-title">Loved For Experiences!</h2>
            <p className="experience-desc">
            The world is a book, and those who do not  <span className="highlight">travel</span> read only a page.
            </p>
            <Button className="testimonial-btn mt-2">Enjoy your Journey..!</Button>
          </Col>
 
          <Col md={6} className="image-area mt-4 mt-md-0 d-flex justify-content-md-end justify-content-center">
            <div className="image-stack-horizontal">
              <div className="img-card">
                <img src={boatImg} alt="Boat" />
                <span className="rating">⭐⭐⭐⭐⭐</span>
                <span className="heart">❤️</span>
              </div>
              <div className="img-card">
                <img src={eiffelImg} alt="Eiffel Tower" />
              </div>
              <div className="img-card">
                <img src={beachImg} alt="Beach Family" />
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};
 
export default ExperienceBanner;
 