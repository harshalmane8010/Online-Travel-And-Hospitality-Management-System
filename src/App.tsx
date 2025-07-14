import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';

import Home from './component/Home';
import NavbarComponent from './component/NavbarComponent';
import Login from './component/Login';
import Signup from './component/Signup';
import Footer from './component/Footer';
import AdminDashboard from './pages/AdminDashboard';
import FlightManager from './pages/FlightManager';
import HotelManager from './pages/HotelManager';
import PackageManager from './pages/PackageManager';


// import UserDashboard from './component/UserDashboard';

import UserDashboard from './pages/UserDashbord';
import ExplorePackage from './component/ExplorePackage';
import PackageDetails from './component/PackageDetails';
import FlightResultsPage from './pages/FlightResultsPage';
import HotelSearchPage from './pages/HotelSearchPages';
import HotelResults from './component/HotelResults';
import FlightSearchPage from './pages/FlightSearchPage';
import Payment from './component/Payment';
import Invoice from './component/Invoice';
// import CustomizePackage from './component/CustomizePackage';

<Route path="/user-dashboard" element={<UserDashboard />} />


const App: React.FC = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [userName, setUserName] = useState<string | null>(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const name = localStorage.getItem('user-name');
    if (name) {
      setUserName(name);
    } else {
      const email = localStorage.getItem('user-email');
      if (email) {
        const shortName = email.split('@')[0];
        setUserName(shortName);
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user-email');
    localStorage.removeItem('user-name');
    localStorage.removeItem('user-role');
    setUserName(null);
    navigate('/');
  };

  return (
    <>
      <NavbarComponent
        userName={userName}
        onLoginClick={() => setShowLogin(true)}
        onSignupClick={() => setShowSignup(true)}
        onLogout={handleLogout}
      />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/flight-dashboard" element={<FlightManager />} />
        <Route path="/hotel-dashboard" element={<HotelManager />} />
        <Route path="/package-dashboard" element={<PackageManager />} />
        <Route path="/user-dashboard" element={<UserDashboard />} />
        <Route path="/explore" element={<ExplorePackage />} />
        <Route path="/package/:id" element={<PackageDetails />} />
      {/* <Route path="/customize-itinerary" element={<CustomizePackage/>} */}
      <Route path="/package-details" element={<PackageDetails />} />
     
      <Route path="/results" element={<FlightResultsPage />} />
        <Route path="/hotels" element={<HotelSearchPage />} />
        <Route path="/hotels/:city" element={<HotelResults />} />
        <Route path="/hotels/:city" element={<HotelResults />} />
        <Route path='/flights' element={<FlightSearchPage />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/invoice" element={<Invoice />} />
      </Routes>

      {showLogin && (
        <div className="login-overlay">
          <div className="login-popup">
            <button className="close-btn" onClick={() => setShowLogin(false)}>×</button>
            <Login
              onClose={() => setShowLogin(false)}
              onSignupClick={() => {
                setShowLogin(false);
                setShowSignup(true);
              }}
              setUserEmail={(email: string) => {
                localStorage.setItem('user-email', email);
                const shortName = email.split('@')[0];
                setUserName(shortName);
              }}
              setUserName={(name: string) => {
                localStorage.setItem('user-name', name);
                setUserName(name);
              }}
            />
          </div>
        </div>
      )}

      {showSignup && (
        <div className="login-overlay">
          <div className="login-popup">
            <button className="close-btn" onClick={() => setShowSignup(false)}>×</button>
            <Signup />
          </div>
        </div>
      )}

      <Footer />
    </>
  );
};

export default App;
