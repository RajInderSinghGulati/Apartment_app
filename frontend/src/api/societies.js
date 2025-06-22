import API from './axios';

export const fetchSocieties = () => API.get('/societies');
export const fetchSocietyById = (societyId) => API.get(`/societies/${societyId}`);
export const createSociety = (data) => API.post('/societies', data);
export const updateSociety = (societyId, data) => API.put(`/societies/${societyId}`, data);
export const deleteSociety = (societyId) => API.delete(`/societies/${societyId}`);
export const searchSocietiesByName = (name) => API.get(`/societies/search/name?name=${name}`);
