import API from './axios';

export const fetchUsers = () => API.get('/users');
export const fetchUserById = (userId) => API.get(`/users/${userId}`);
export const createUser = (data) => API.post('/users', data);
export const updateUser = (userId, data) => API.put(`/users/${userId}`, data);
export const deleteUser = (userId) => API.delete(`/users/${userId}`);
export const searchUsers = (name) => API.get(`/users/search?name=${name}`);
export const assignUserToHouse = (userId, houseId) => API.put(`/users/${userId}/assign-house/${houseId}`);
export const removeUserFromHouse = (userId) => API.put(`/users/${userId}/remove-house`);
