import React from 'react';
import { Container, Row, Col, Nav } from 'react-bootstrap';
import '../styles/Footer.css';
import { Link } from 'react-router-dom';
 
const Footer: React.FC = () => {
  return (
    <footer className="custom-footer mt-5">
      <Container>
        <Row>
          <Col md={4} className="mb-4 mb-md-0">
         
            <p className="footer-text">
              Discover unforgettable travel experiences across the globe. We bring the world closer to you.
            </p>
          </Col>
          <Col md={4} className="mb-4 mb-md-0">
            <h6 className="footer-heading">Quick Links</h6>
            <ul className="footer-links">
             
 
 <li> <Nav.Link as={Link} to="/flights">Flight 🌍</Nav.Link></li>
 <li> <Nav.Link as={Link} to="/hotels">Hotels 🏨</Nav.Link></li>
 <li><Nav.Link as={Link} to="/">Packages 📦</Nav.Link></li>
 
 
             
            </ul>
          </Col>
          <Col md={4}>
            <h6 className="footer-heading">Stay Connected</h6>
            <p className="footer-text">🌟 Your voice shapes our journey — leave a review or suggestion!</p>
           
          </Col>
        </Row>
        <hr className="footer-divider" />
       
      </Container>
    </footer>
  );
};
 
export default Footer;
 
 