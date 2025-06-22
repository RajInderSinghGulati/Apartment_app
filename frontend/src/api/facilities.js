import API from './axios';

export const fetchFacilities = () => API.get('/facilities');
export const fetchFacilityById = (facilityId) => API.get(`/facilities/${facilityId}`);
export const createFacility = (data) => API.post('/facilities', data);
export const updateFacility = (facilityId, data) => API.put(`/facilities/${facilityId}`, data);
export const deleteFacility = (facilityId) => API.delete(`/facilities/${facilityId}`);
export const searchFacilities = (q) => API.get(`/facilities/search?q=${q}`);
