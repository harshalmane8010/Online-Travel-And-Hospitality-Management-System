import React from 'react';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom'; // ✅ Import router link
import logo from '../assets/logo.png';
import '../styles/Navbar.css';
interface NavbarComponentProps {
  userName: string | null;
  onLoginClick: () => void;
  onSignupClick: () => void;
  onLogout: () => void;
}

const NavbarComponent: React.FC<NavbarComponentProps> = ({
  userName,
  onLoginClick,
  onSignupClick,
  onLogout,
}) => {
  const displayName = userName?.includes('@') ? userName.split('@')[0] : userName;

  return (
    <Navbar expand="lg" className="main-header transparent-navbar" sticky="top">
      <Container fluid className="px-4">
        <Navbar.Brand href="/" className="d-flex align-items-center">
          <img
            src={logo}
            alt="Let's Wander Logo"
            height="50"
            className="d-inline-block align-middle"
          />
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="main-navbar" />
        <Navbar.Collapse id="main-navbar" className="justify-content-between">
          <Nav className="me-auto nav-links align-items-center">
          <Nav.Link as={Link} to="/">Home 🏚️</Nav.Link>
          <Nav.Link as={Link} to="/flights">Flights ✈️</Nav.Link>
          <Nav.Link as={Link} to="/hotels">Hotel 🏨</Nav.Link>
            <Nav.Link href="#">About 👤</Nav.Link>
            <Nav.Link href="#">Offers 💥</Nav.Link>
          </Nav>

          <div className="auth-buttons d-flex align-items-center">
            {userName ? (
              <>
                <Link to="/user-dashboard" className="text-dark fw-semibold me-3 text-decoration-none">
                  {displayName}
                </Link>

                <Button className="login-btn" size="sm" onClick={onLogout}>
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Button className="login-btn me-2" size="sm" onClick={onLoginClick}>
                  Login
                </Button>
                <Button className="login-btn" size="sm" onClick={onSignupClick}>
                  Sign Up
                </Button>
              </>
            )}
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarComponent;
