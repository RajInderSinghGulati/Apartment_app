import API from './axios';

export const fetchBookings = () => API.get('/bookings');
export const fetchBookingById = (bookingId) => API.get(`/bookings/${bookingId}`);
export const createBooking = (data) => API.post('/bookings', data);
export const updateBooking = (bookingId, data) => API.put(`/bookings/${bookingId}`, data);
export const deleteBooking = (bookingId) => API.delete(`/bookings/${bookingId}`);
export const searchBookings = (q) => API.get(`/bookings/search?q=${q}`);
