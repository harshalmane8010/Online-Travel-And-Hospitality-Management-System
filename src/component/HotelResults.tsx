import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { searchHotelsByLocation } from '../api/hotelService';
import '../styles/HotelResults.css';
 
// Delhi
import delhi1 from '../assets/delhi1.jpg';
import delhi2 from '../assets/delhi2.jpg';
import delhi3 from '../assets/delhi3.jpg';
import random1 from '../assets/random1.jpg';
import random2 from '../assets/random2.jpg';
import random3 from '../assets/random3 - Copy.jpg';
import random4 from '../assets/random4 - Copy.jpg';
import random5 from '../assets/random5 - Copy.jpg';
// Mumbai
import mumbai1 from '../assets/mumbai1.jpg';
import mumbai2 from '../assets/mumbai2.jpg';
import mumbai3 from '../assets/mumbai3.jpg';
 
// Chennai
import chennai1 from '../assets/chennai1.jpg';
import chennai2 from '../assets/chennai2.jpg';
import chennai3 from '../assets/chennai3.jpg';
 
 
// Pune
import pune1 from '../assets/pune1.jpg';
import pune2 from '../assets/pune2.jpg';
 
import jaipur1 from '../assets/jaipur.jpg';
import fallback from '../assets/hotel1.jpg'; // default fallback
 
 
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
 
  const getCityImage = (location: string): string => {
    const city = location.toLowerCase();
 
    const images: { [key: string]: string[] } = {
      delhi: [delhi1, delhi2, delhi3,random1, random4],
      mumbai: [mumbai1, mumbai2, mumbai3, random2, random5],
      chennai: [chennai1, chennai2,chennai3, random3],
      pune: [pune1, pune2,random2, random3],
      jaipur: [jaipur1, random1],
    };
 
    const pool = images[city];
    return pool ? pool[Math.floor(Math.random() * pool.length)] : fallback;
  };
 
 
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
         
              <label>
                Rooms to Book:
                <input
                  type="number"
                  min="1"
                  placeholder='rooms'
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
  src={hotel.url || getCityImage(hotel.location)}
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
 
 