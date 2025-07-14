import axiosInstance from './axiosInstance'; // 🔐 Token-secured Axios

const HOTEL_BASE_URL = 'http://localhost:9999/hotels';

export const getHotelDetails = (id: number) =>
  axiosInstance.get(`${HOTEL_BASE_URL}/${id}`);

export const searchHotelsByLocation = (location: string) =>
  axiosInstance.get(`${HOTEL_BASE_URL}/search`, {
    params: { location }
  });

export const getAllHotels = () =>
  axiosInstance.get(HOTEL_BASE_URL);

export const uploadHotelImage = (formData: FormData) =>
  axiosInstance.post(`${HOTEL_BASE_URL}/upload`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });

// export const searchByAirline = async (airline: string) =>
//   axiosInstance.get(`http://localhost:9999/flights/airline`, {
//     params: { airline },
//   });
