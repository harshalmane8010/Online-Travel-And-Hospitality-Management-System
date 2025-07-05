import React from 'react';
import { Container, Row, Col, FormControl, Button } from 'react-bootstrap';
// import 'bootstrap/dist/css/bootstrap.min.css';
import background from './assets/background.jpg';
const KeralaTourUI = () => {
  const categories = [
    'Group Departure',
    'Honeymoon',
    'Pilgrimage',
    'Ayurveda',
    'Luxury',
    'Adventure',
  ];

  return (
    <Container
      fluid
      style={{
        backgroundImage:`url(${background})`,
        // backgroundSize: 'cover',
        // backgroundPosition: 'center',
       minHeight: '100vh',
        // paddingTop: '50px',
        // height:'100px',
        width:'200vh'
        // color: 'white',
      }}
    >
      {/* Title and Tagline */}
      <Row className="justify-content-center text-center mb-4">
        <Col xs={12}>
          <h1 className="fw-bold display-4"> Tour Packages</h1>
          <p className="fs-4 fst-italic">Where Every Experience Counts!</p>
        </Col>
      </Row>

      {/* Search Bar */}
      <Row className="justify-content-center mb-5">
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

      {/* Tour Categories */}
      <Row className="justify-content-center text-center">
        {categories.map((category, index) => (
          <Col key={index} xs={6} md={2} className="mb-4">
            <div
              className="bg-white text-dark rounded-circle d-flex align-items-center justify-content-center mx-auto"
              style={{ width: '150px', height: '100px', boxShadow: '0 0 10px rgba(0,0,0,0.2)' }}
            >
              <span className="fw-semibold text-center">{category}</span>
            </div>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default KeralaTourUI;
