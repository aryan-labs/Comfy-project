// userApi.js
// userApi.js
import axios from 'axios';
const api = 'http://localhost:4000/api/user'; // Your backend URL

export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${api}/sign-up`, userData);
    if (response.status === 200) {
      return response.data; // Ensure the response contains necessary data like user and token
    } else {
      throw new Error('Registration failed');
    }
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Something went wrong!');
  }
};


export const loginUser = async (credentials) => {
  const response = await axios.post(`${api}/login`, credentials);
  return response.data;  // Return response to handle in the slice
};
