import API from './axios';

export const loginUser = (data) => API.post('/auth/login', data);
export const loginAdmin = (data) => API.post('/auth/admin/login', data);
