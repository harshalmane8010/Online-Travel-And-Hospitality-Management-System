import React from 'react';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import logo from '../assets/logo.png';

interface NavbarComponentProps {
  onLoginClick: () => void;
  onSignupClick: () => void;
}

const NavbarComponent: React.FC<NavbarComponentProps> = ({ onLoginClick, onSignupClick }) => (
  <Navbar expand="md" className="main-header fixed-top transparent-navbar">
    <Container>
      <Navbar.Brand href="#" className="logo">
        <img
          src={logo}
          height="90"
          className="d-inline-block align-middle"
          alt="Let's Wander Logo"
        />
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="main-navbar" />
      <Navbar.Collapse id="main-navbar">
        <Nav className="me-auto nav-links">
          <Nav.Link href="#">Home 🏚️</Nav.Link>
          <Nav.Link href="#">Flights ✈️</Nav.Link>
          <Nav.Link href="#">Hotel 🏨</Nav.Link>
          <Nav.Link href="#">About 👤</Nav.Link>
          <Nav.Link href="#">Offers 💥</Nav.Link>
        </Nav>
        <div className="auth-buttons">
          <Button className="login-btn" onClick={onLoginClick}>Login</Button>
          <Button className="login-btn" onClick={onSignupClick}>SignUp</Button>
        </div>
      </Navbar.Collapse>
    </Container>
  </Navbar>
);

export default NavbarComponent;
