import axiosInstance from './axiosInstance'; // ✅ Token-aware Axios

const FLIGHT_BASE_URL = 'http://localhost:9999/flights';

export const getFlightDetails = (id: number) =>
  axiosInstance.get(`${FLIGHT_BASE_URL}/${id}`);

export const getAllFlights = () =>
  axiosInstance.get(FLIGHT_BASE_URL);

export const searchFlights = async (from: string, to: string) =>
  axiosInstance.get(`${FLIGHT_BASE_URL}/search`, {
    params: { departure: from, arrival: to },
  });

export const searchByAirline = async (airline: string) =>
  axiosInstance.get(`${FLIGHT_BASE_URL}/airline`, {
    params: { airline },
  });
