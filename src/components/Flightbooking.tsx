import React from 'react';
import '../styles/Flightbooking.css'
// import '../styles/FlightBooking.css';

import Autocomp from './AutocompleteInput';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlaneDeparture, faHotel, faUmbrellaBeach } from '@fortawesome/free-solid-svg-icons';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import PopularDestinations from './PopularDestinations';
import AllDestinations from './AllDestinations';
import { useNavigate } from 'react-router-dom';

interface FlightBookingProps {
  onSearch: (criteria: { from: string; to: string; departureDate: string }) => void;
  handleRedirect: (from: string, to: string) => void;
  resetResults: () => void;
}

const FlightBooking: React.FC<FlightBookingProps> = ({ onSearch, handleRedirect, resetResults }) => {
  const [tripType, setTripType] = React.useState<'oneway' | 'round'>('oneway');
  const [departureDate, setDepartureDate] = React.useState<string>(new Date().toISOString().split('T')[0]);
  const [returnDate, setReturnDate] = React.useState<string>(new Date(Date.now() + 86400000).toISOString().split('T')[0]);
  const [formData, setFormData] = React.useState({
    from: '',
    to: '',
    fareType: 'regular',
    zeroCancel: false,
  });
  const [travellerCount, setTravellerCount] = React.useState<number>(1);
  const [flightClass, setFlightClass] = React.useState<string>('Economy');
  const [dropdownOpen, setDropdownOpen] = React.useState<boolean>(false);
  const [errors, setErrors] = React.useState<Record<string, string>>({});

  const navigate = useNavigate();

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement> | { target: { name: string; value: string } }
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.from) newErrors.from = 'Please enter the departure location.';
    if (!formData.to) newErrors.to = 'Please enter the destination location.';
    if (!departureDate) newErrors.departureDate = 'Please select a departure date.';
    return newErrors;
  };

  const handleSubmit = () => {
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});
    onSearch({
      from: formData.from,
      to: formData.to,
      departureDate,
    });
  };

  return (
    <>
      <div className="hero-section">
        <div className="main-box">
          <div className="menu-tab">
            <div className="tab active" onClick={() => {
              resetResults();
              navigate('/');
            }}>
              <FontAwesomeIcon icon={faPlaneDeparture} /> Flights
            </div>
            <div className="tab" onClick={() => navigate('/hotels')}>
              <FontAwesomeIcon icon={faHotel} /> Hotels
            </div>
            <div className="tab">
              <FontAwesomeIcon icon={faUmbrellaBeach} /> Holiday Packages
            </div>
          </div>

          <div className="section">
            <Autocomp label="From" name="from" value={formData.from} onChange={handleInputChange} />
            {errors.from && <div className="error">{errors.from}</div>}

            <Autocomp label="To" name="to" value={formData.to} onChange={handleInputChange} />
            {errors.to && <div className="error">{errors.to}</div>}

            <div>
              <label htmlFor="departure">Departure Date:</label>
              <DatePicker
                selected={new Date(departureDate)}
                onChange={(date: Date | null) => {
                  if (date) {
                    setDepartureDate(date.toISOString().split('T')[0]);
                  }
                }}
                dateFormat="yyyy-MM-dd"
                className="custom-datepicker"
              />
              {errors.departureDate && <div className="error">{errors.departureDate}</div>}
            </div>

            <div>
              <label>Travellers:</label>
              <div className="dropdown-box" onClick={() => setDropdownOpen(!dropdownOpen)}>
                {travellerCount} Traveller{travellerCount > 1 ? 's' : ''} - {flightClass}
              </div>
              {dropdownOpen && (
                <div className="dropdown-panel">
                  <div className="traveller-controls">
                    <button onClick={() => setTravellerCount(Math.max(1, travellerCount - 1))}>-</button>
                    <span>{travellerCount}</span>
                    <button onClick={() => setTravellerCount(travellerCount + 1)}>+</button>
                  </div>
                  <select value={flightClass} onChange={(e) => setFlightClass(e.target.value)}>
                    <option>Economy</option>
                    <option>Premium Economy</option>
                    <option>Business</option>
                    <option>First Class</option>
                  </select>
                </div>
              )}
            </div>
          </div>
{/* 
          <div className="fare-options">
            {['regular', 'student', 'senior', 'armed', 'doctor'].map((type) => (
              <React.Fragment key={type}>
                <input
                  type="radio"
                  id={type}
                  name="fareType"
                  value={type}
                  checked={formData.fareType === type}
                  onChange={handleInputChange}
                />
                <label htmlFor={type}>{type.charAt(0).toUpperCase() + type.slice(1)}</label>
              </React.Fragment>
            ))}
          </div> */}

          <div className="zero-cancel">
            <label>
              <input
                type="checkbox"
                name="zeroCancel"
                checked={formData.zeroCancel}
                onChange={handleInputChange}
              />
              Add Zero Cancellation – Get 100% refund on cancellation
            </label>
          </div>

          <div className="search-btn">
            <button onClick={handleSubmit}>SEARCH</button>
          </div>
        </div>
      </div>

      <PopularDestinations />
      <AllDestinations handleRedirect={handleRedirect} />
    </>
  );
};

export default FlightBooking;
