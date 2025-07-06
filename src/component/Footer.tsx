import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import '../styles/Footer.css';

const Footer: React.FC = () => {
  return (
    <footer className="custom-footer mt-5">
      <Container>
        <Row>
          <Col md={4} className="mb-4 mb-md-0">
            <h5 className="footer-title">🌍 Let'sWander</h5>
            <p className="footer-text">
              Discover unforgettable travel experiences across the globe. We bring the world closer to you.
            </p>
          </Col>
          <Col md={4} className="mb-4 mb-md-0">
            <h6 className="footer-heading">Quick Links</h6>
            <ul className="footer-links">
              <li><a href="#">Destinations</a></li>
              <li><a href="#">Hotels</a></li>
              <li><a href="#">Packages</a></li>
              <li><a href="#">Offers</a></li>
            </ul>
          </Col>
          <Col md={4}>
            <h6 className="footer-heading">Stay Connected</h6>
            <p className="footer-text">🌟 Your voice shapes our journey — leave a review or suggestion!</p>
            <input type="text" placeholder="Review" className="footer-input" />
            <button className="footer-btn mt-2 me-2">Submit</button>
          </Col>
        </Row>
        <hr className="footer-divider" />
        <p className="footer-bottom text-center mb-0">
          © {new Date().getFullYear()} Let'sWander. All rights reserved.
        </p>
      </Container>
    </footer>
  );
};

export default Footer;
