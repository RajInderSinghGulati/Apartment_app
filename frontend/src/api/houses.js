import API from './axios';

export const fetchHouses = () => API.get('/houses');
export const fetchHouseById = (houseId) => API.get(`/houses/${houseId}`);
export const createHouse = (data) => API.post('/houses', data);
export const updateHouse = (houseId, data) => API.put(`/houses/${houseId}`, data);
export const deleteHouse = (houseId) => API.delete(`/houses/${houseId}`);
export const fetchHousesBySociety = (societyId) => API.get(`/houses/society/${societyId}`);
export const searchHouses = (q) => API.get(`/houses/search?q=${q}`);
