import axios from 'axios';

const BOOKING_BASE_URL = 'http://localhost:9999/bookings';

export const createBooking = (booking: any) =>
  axios.post(BOOKING_BASE_URL, booking);

export const getAllBookings = () =>
  axios.get(BOOKING_BASE_URL);

export const getBookingById = (id: number) =>
  axios.get(`${BOOKING_BASE_URL}/${id}`);
