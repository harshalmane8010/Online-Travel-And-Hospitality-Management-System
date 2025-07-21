import axiosInstance from './axiosInstance'; // ✅ Secure Axios instance

const FLIGHT_BASE_URL = 'http://localhost:9999/flights';

interface Flight {
  flightId: number | null;
  airline: string;
  departure: string;
  arrival: string;
  price: number | null;
  availability: boolean;
  departureDate: string;
}

export const getFlights = () => axiosInstance.get(FLIGHT_BASE_URL);
export const addFlight = (flight: Flight) => axiosInstance.post(FLIGHT_BASE_URL, flight);
export const updateFlight = (id: number, flight: Flight) => axiosInstance.put(`${FLIGHT_BASE_URL}/${id}`, flight);
export const deleteFlight = (id: number) => axiosInstance.delete(`${FLIGHT_BASE_URL}/${id}`);
export const searchFlights = (departure: string, arrival: string) =>
  axiosInstance.get(`${FLIGHT_BASE_URL}/search`, { params: { departure, arrival } });
