import API from './axios';

export const fetchAdmins = () => API.get('/admins');
export const fetchAdminById = (adminId) => API.get(`/admins/${adminId}`);
export const createAdmin = (data) => API.post('/admins', data);
export const updateAdmin = (adminId, data) => API.put(`/admins/${adminId}`, data);
export const deleteAdmin = (adminId) => API.delete(`/admins/${adminId}`);
export const loginAdmin = (data) => API.post('/admins/login', data);
