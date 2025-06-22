import API from './axios';

export const fetchStaff = () => API.get('/staff');
export const fetchStaffById = (staffId) => API.get(`/staff/${staffId}`);
export const createStaff = (data) => API.post('/staff', data);
export const updateStaff = (staffId, data) => API.put(`/staff/${staffId}`, data);
export const deleteStaff = (staffId) => API.delete(`/staff/${staffId}`);
export const searchStaff = (q) => API.get(`/staff/search?q=${q}`);
