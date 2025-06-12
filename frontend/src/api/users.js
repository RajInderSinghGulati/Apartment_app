import API from './axios';

// Fetch all users
export const fetchUsers = async () => {
  try {
    const response = await API.get('/users');
    return response.data;
  } catch (err) {
    throw err;
  }
};

// Fetch user by ID
export const fetchUserById = async (userId) => {
  try {
    const response = await API.get(`/users/${userId}`);
    return response.data;
  } catch (err) {
    throw err;
  }
};

// Create a new user
export const createUser = async (data) => {
  try {
    const response = await API.post('/users', data);
    return response.data;
  } catch (err) {
    throw err;
  }
};

// Update user
export const updateUser = async (userId, data) => {
  try {
    const response = await API.put(`/users/${userId}`, data);
    return response.data;
  } catch (err) {
    throw err;
  }
};

// Delete user
export const deleteUser = async (userId) => {
  try {
    const response = await API.delete(`/users/${userId}`);
    return response.data;
  } catch (err) {
    throw err;
  }
};

// Search users by name
export const searchUsers = async (name) => {
  try {
    const response = await API.get(`/users/search?name=${encodeURIComponent(name)}`);
    return response.data;
  } catch (err) {
    throw err;
  }
};

// Assign user to house
export const assignUserToHouse = async (userId, houseId) => {
  try {
    const response = await API.put(`/users/${userId}/assign-house/${houseId}`);
    return response.data;
  } catch (err) {
    throw err;
  }
};

// Remove user from house
export const removeUserFromHouse = async (userId) => {
  try {
    const response = await API.put(`/users/${userId}/remove-house`);
    return response.data;
  } catch (err) {
    throw err;
  }
};

// Signup user
export const signupUser = async (data) => {
  try {
    const response = await API.post('/users/signup', data);
    return response.data;
  } catch (err) {
    throw err;
  }
};

// User login (stores JWT token as 'token' in localStorage)
export const login = async (data) => {
  try {
    const response = await API.post('/users/login', data);
    // Store token for authenticated requests
    localStorage.setItem('token', response.data.token);
    return response.data;
  } catch (err) {
    console.error('Login failed:', err.response?.data || err.message);
    throw err;
  }
};
