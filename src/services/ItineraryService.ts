
import axios from 'axios';

const ITINERARY_BASE_URL = 'http://localhost:9999/api/itineraries';

export const fetchAllItineraries = async () => {
  const response = await axios.get(ITINERARY_BASE_URL);
  return response.data;
};
