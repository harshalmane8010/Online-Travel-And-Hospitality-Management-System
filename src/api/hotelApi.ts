import axiosInstance from './axiosInstance'; // ✅ Token-enabled Axios

const API_BASE_URL = 'http://localhost:9999/hotels';

export const getHotels = () => axiosInstance.get(API_BASE_URL);
export const addHotel = (data: any) => axiosInstance.post(API_BASE_URL, data);
export const updateHotel = (id: number, data: any) => axiosInstance.put(`${API_BASE_URL}/${id}`, data);
export const deleteHotel = (id: number) => axiosInstance.delete(`${API_BASE_URL}/${id}`);

// ✅ Fix: Explicitly set multipart headers for image upload
export const uploadHotelImage = (formData: FormData) =>
  axiosInstance.post(`${API_BASE_URL}/upload`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
