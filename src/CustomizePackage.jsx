import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CustomizePackage.css';

const CustomizePackage = () => {
  const [customText, setCustomText] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('User customization:', customText);
    // You can send this data to a backend or store it locally
    alert('Your customization request has been submitted!');
    navigate('/explore'); // Redirect after submission
  };

  return (
    <div className="customize-container container my-5">
      <div className="customize-box p-4 rounded shadow">
        <h2 className="text-center mb-4">Customize Your Travel Package</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="customText" className="form-label fw-semibold">
              What would you like to change?
            </label>
            <textarea
              id="customText"
              className="form-control"
              rows="6"
              placeholder="E.g., Add more days in Paris, prefer vegetarian meals, need airport pickup..."
              value={customText}
              onChange={(e) => setCustomText(e.target.value)}
              required
            ></textarea>
          </div>
          <div className="text-center">
            <button type="submit" className="btn btn-primary px-4">
              Submit Request
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CustomizePackage;
