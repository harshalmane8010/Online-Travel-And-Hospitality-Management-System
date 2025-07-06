import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';

import Home from './component/Home';
import NavbarComponent from './component/NavbarComponent';
import Login from './component/Login';
import Signup from './component/Signup';
import Footer from './component/Footer';

const App: React.FC = () => {
  const [showLogin, setShowLogin] = useState<boolean>(false);
  const [showSignup, setShowSignup] = useState<boolean>(false);

  return (
    <>
      <NavbarComponent
        onLoginClick={() => setShowLogin(true)}
        onSignupClick={() => setShowSignup(true)}
      />

      <Routes>
        <Route path="/" element={<Home />} />
        {/* Add more routes here */}
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
