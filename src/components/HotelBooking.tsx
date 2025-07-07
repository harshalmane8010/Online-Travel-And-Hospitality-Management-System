import React from 'react';
import '../styles/HotelBooking.css';
import Autocomp from './AutocompleteInput';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlaneDeparture, faHotel, faUmbrellaBeach } from '@fortawesome/free-solid-svg-icons';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import PopularHotels from './PopularHotels';
import { useNavigate } from 'react-router-dom';

interface HotelBookingProps {
  onSearch: (criteria: {
    location: string;
    checkInDate: string;
    checkOutDate: string;
    guests: string;
  }) => void;
  resetResults: () => void;
}

const HotelBooking: React.FC<HotelBookingProps> = ({ onSearch, resetResults }) => {
  const navigate = useNavigate();

  const [formData, setFormData] = React.useState({ location: '' });

  const [checkInDate, setCheckInDate] = React.useState<string>(
    new Date().toISOString().split('T')[0]
  );

  const [checkOutDate, setCheckOutDate] = React.useState<string>(
    new Date(Date.now() + 86400000).toISOString().split('T')[0]
  );

  const [guests, setGuests] = React.useState({
    adults: 2,
    children: 0,
    rooms: 1,
  });

  const [dropdownOpen, setDropdownOpen] = React.useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement> | { target: { name: string; value: string } }
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleGuestChange = (type: string, delta: number) => {
    setGuests((prev) => ({
      ...prev,
      [type]: Math.max(0, prev[type as keyof typeof prev] + delta),
    }));
  };

  const handleSubmit = () => {
    if (!formData.location || !checkInDate || !checkOutDate) {
      alert('Please fill all fields');
      return;
    }

    onSearch({
      location: formData.location,
      checkInDate,
      checkOutDate,
      guests: `${guests.adults} Adults, ${guests.children} Children, ${guests.rooms} Room(s)`,
    });
  };

  return (
    <>
      <div className="hero-section">
        <div className="main-box">
          <div className="menu-tab">
            <div
              className="tab"
              onClick={() => {
                resetResults();
                navigate('/');
              }}
            >
              <FontAwesomeIcon icon={faPlaneDeparture} /> Flights
            </div>
            <div className="tab active" onClick={() => navigate('/hotels')}>
              <FontAwesomeIcon icon={faHotel} /> Hotels
            </div>
            <div className="tab">
              <FontAwesomeIcon icon={faUmbrellaBeach} /> Holiday Packages
            </div>
          </div>

          <div className="section">
            <Autocomp
              label="Location"
              name="location"
              value={formData.location}
              onChange={handleInputChange}
            />

            <div>
              <label>Check-In Date:</label>
              <DatePicker
                selected={new Date(checkInDate)}
                onChange={(date: Date | null) => {
                  if (date) {
                    setCheckInDate(date.toISOString().split('T')[0]);
                  }
                }}
                dateFormat="yyyy-MM-dd"
                className="custom-datepicker"
              />
            </div>

            <div>
              <label>Check-Out Date:</label>
              <DatePicker
                selected={new Date(checkOutDate)}
                onChange={(date: Date | null) => {
                  if (date) {
                    setCheckOutDate(date.toISOString().split('T')[0]);
                  }
                }}
                dateFormat="yyyy-MM-dd"
                className="custom-datepicker"
              />
            </div>

            <div>
              <label>Guests:</label>
              <div className="dropdown-box" onClick={() => setDropdownOpen(!dropdownOpen)}>
                {guests.adults} Adults, {guests.children} Children, {guests.rooms} Room(s)
              </div>

              {dropdownOpen && (
                <div className="dropdown-panel">
                  <div className="traveller-controls">
                    <span>Adults:</span>
                    <button onClick={() => handleGuestChange('adults', -1)}>-</button>
                    <span>{guests.adults}</span>
                    <button onClick={() => handleGuestChange('adults', 1)}>+</button>
                  </div>
                  <div className="traveller-controls">
                    <span>Children:</span>
                    <button onClick={() => handleGuestChange('children', -1)}>-</button>
                    <span>{guests.children}</span>
                    <button onClick={() => handleGuestChange('children', 1)}>+</button>
                  </div>
                  <div className="traveller-controls">
                    <span>Rooms:</span>
                    <button onClick={() => handleGuestChange('rooms', -1)}>-</button>
                    <span>{guests.rooms}</span>
                    <button onClick={() => handleGuestChange('rooms', 1)}>+</button>
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

      <PopularHotels />
    </>
  );
};

export default HotelBooking;
