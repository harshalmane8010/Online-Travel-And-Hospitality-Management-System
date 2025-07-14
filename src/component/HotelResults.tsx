import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { searchHotelsByLocation } from '../api/hotelService';
import '../styles/HotelResults.css';
import hotelImage from '../assets/hotel1.jpg';

import { Rating } from '@smastrom/react-rating';
import '@smastrom/react-rating/style.css';

interface Hotel {
  hotelId: number;
  name: string;
  location: string;
  pricePerNight: number;
  rating: number;
  roomsAvailable: number;
  url?: string;
}

const HotelResults: React.FC = () => {
  const { city } = useParams<{ city: string }>();
  const navigate = useNavigate();

  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedRooms, setSelectedRooms] = useState<{ [key: number]: number }>({});

  useEffect(() => {
    if (city) {
      searchHotelsByLocation(city)
        .then((res) => {
          setHotels(res.data);
          setLoading(false);
        })
        .catch((err) => {
          console.error('Error fetching hotels:', err);
          setLoading(false);
        });
    }
  }, [city]);

  const handleRoomChange = (hotelId: number, value: number) => {
    setSelectedRooms((prev) => ({ ...prev, [hotelId]: value }));
  };

  const handleBooking = (hotel: Hotel) => {
    const roomsToBook = selectedRooms[hotel.hotelId] || 1;

    if (roomsToBook > hotel.roomsAvailable) {
      alert('Not enough rooms available');
      return;
    }

    const selectedHotelWithRooms = {
      ...hotel,
      roomsBooked: roomsToBook
    };

    navigate('/payment', { state: { hotel: selectedHotelWithRooms } }); // ✅ Direct to payment
  };

  return (
    <div className="results-container">
      <h2>Available Hotels in {city}</h2>
      {loading ? (
        <p>Loading...</p>
      ) : hotels.length === 0 ? (
        <p>No hotels found.</p>
      ) : (
        hotels.map((hotel) => (
          <div key={hotel.hotelId} className="hotel-card">
            <div className="hotel-details">
              <h3>{hotel.name}</h3>
              <p>Location: {hotel.location}</p>
              <p>Price per Night: ₹{hotel.pricePerNight ?? 'N/A'}</p>
              <p>Rating: {hotel.rating}</p>
              <p>Rooms Available: {hotel.roomsAvailable ?? 'N/A'}</p>

              <Rating
                style={{ maxWidth: 150 }}
                value={hotel.rating}
                readOnly
              />

              <label>
                Rooms to Book:
                <input
                  type="number"
                  min="1"
                  max={hotel.roomsAvailable}
                  value={selectedRooms[hotel.hotelId] || 1}
                  onChange={(e) =>
                    handleRoomChange(hotel.hotelId, parseInt(e.target.value))
                  }
                />
              </label>
              <button onClick={() => handleBooking(hotel)}>
                Book Now
              </button>
            </div>

            <img
              src={hotel.url ? hotel.url : hotelImage}
              alt={hotel.name}
              className="hotel-image-right"
            />
          </div>
        ))
      )}
    </div>
  );
};

export default HotelResults;
