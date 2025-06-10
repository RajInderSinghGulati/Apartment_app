import API from './axios';

export const fetchPets = () => API.get('/pets');
export const fetchPetById = (petId) => API.get(`/pets/${petId}`);
export const createPet = (data) => API.post('/pets', data);
export const updatePet = (petId, data) => API.put(`/pets/${petId}`, data);
export const deletePet = (petId) => API.delete(`/pets/${petId}`);
export const searchPets = (q) => API.get(`/pets/search?q=${q}`);
