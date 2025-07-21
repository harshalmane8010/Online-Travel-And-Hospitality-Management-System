import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlaneDeparture, faHotel } from '@fortawesome/free-solid-svg-icons';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import LocationDropdown from './LocationDropdown';
import { searchFlights } from '../api/flightService';
import CheapestFlights from './CheapestFlights';
import AirlinePartners from './AirlinePartners';
import ExperienceBanner from './ExperienceBanner';

const locations = ['Chennai', 'Mumbai', 'Delhi', 'Bangalore','Pune'];

const FlightBooking: React.FC = () => {
  const [departureDate, setDepartureDate] = React.useState<string>(
    new Date().toISOString().split('T')[0]
  );
  const [formData, setFormData] = React.useState({
    from: '',
    to: '',
    zeroCancel: false,
  });
  const [travellerCount, setTravellerCount] = React.useState<number>(1);
   const [flightClass, setFlightClass] = React.useState<string>('');
  const [dropdownOpen, setDropdownOpen] = React.useState<boolean>(false);
  const [errors, setErrors] = React.useState<Record<string, string>>({});
  const navigate = useNavigate();
  const location = useLocation();

  const handleInputChange = (
    e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.from) newErrors.from = 'Please select departure location.';
    if (!formData.to) newErrors.to = 'Please select destination location.';
    if (!departureDate) newErrors.departureDate = 'Please select departure date.';
    return newErrors;
  };

  const handleSubmit = async () => {
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});
    try {
      const response = await searchFlights(formData.from, formData.to);
      const flights = Array.isArray(response.data) ? response.data : response.data.flights;
      if (!Array.isArray(flights)) {
        throw new Error('Invalid flight data format');
      }
      const flightsWithDate = flights.map((flight: any) => ({
        ...flight,
        departure_date: departureDate,
      }));
      navigate('/results', { state: { flights: flightsWithDate } });
    } catch (error) {
      console.error('Error during flight search:', error);
    }
  };

  return (
    <>
      <div className="hero-section">
        <div className="main-box">
          <div className="menu-tab">
            <div className={`tab ${location.pathname === '/' ? 'active' : ''}`}>
              <FontAwesomeIcon icon={faPlaneDeparture} /> Flights
            </div>
            <div className="tab" onClick={() => navigate('/hotels')}>
              <FontAwesomeIcon icon={faHotel} /> Hotels
            </div>
          </div>
          <div className="section">
            <LocationDropdown
              label="From"
              name="from"
              value={formData.from}
              onChange={handleInputChange}
              locations={locations}
              error={errors.from}
            />
            <LocationDropdown
              label="To"
              name="to"
              value={formData.to}
              onChange={handleInputChange}
              locations={locations}
              error={errors.to}
            />
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
                {travellerCount} Traveller{travellerCount > 1 ? 's' : ''} 
              </div>
              {dropdownOpen && (
                <div className="dropdown-panel">
                  <div className="traveller-controls">
                    <button onClick={() => setTravellerCount(Math.max(1, travellerCount - 1))}>
                      -
                    </button>
                    <span>{travellerCount}</span>
                    <button onClick={() => setTravellerCount(travellerCount + 1)}>+</button>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="search-btn">
            <button onClick={handleSubmit}>SEARCH</button>
          </div>
        </div>
      </div>
      <AirlinePartners />

      <CheapestFlights />
      <ExperienceBanner />

    </>
  );
};

export default FlightBooking;
