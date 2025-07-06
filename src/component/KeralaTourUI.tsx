import React from 'react';
import { Container, Row, Col, FormControl, Button } from 'react-bootstrap';
import background from './assets/background.jpg';
import './KeralaTourUI.css';

const categories: string[] = [
  'Group Departure',
  'Honeymoon',
  'Pilgrimage',
  'Ayurveda',
  'Luxury',
  'Adventure',
];

const KeralaTourUI: React.FC = () => {
  return (
    <Container
      fluid
      className="kerala-tour-container"
      style={{
        backgroundImage: `url(${background})`,
      }}
    >
      {/* Title and Tagline */}
      <Row className="justify-content-center text-center mb-4">
        <Col xs={12}>
          <h1 className="kerala-tour-title">Tour Packages</h1>
          <p className="kerala-tour-tagline">Where Every Experience Counts!</p>
        </Col>
      </Row>

      {/* Search Bar */}
      <Row className="justify-content-center mb-5">
        <Col xs={10} md={6}>
          <div className="kerala-tour-searchbar d-flex rounded-pill shadow p-2">
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

      {/* Tour Categories */}
      <Row className="justify-content-center text-center">
        {categories.map((category, index) => (
          <Col key={index} xs={6} md={2} className="mb-4">
            <div className="kerala-tour-category">
              <span>{category}</span>
            </div>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default KeralaTourUI;
