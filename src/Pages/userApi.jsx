import axios from 'axios';

const api = 'https://comfy-project-backend.onrender.com/api/user'; // Your backend URL

// Register user function using axios for consistency
export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${api}/sign-up`, userData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data; // Return the response data for the slice to handle
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to register user");
  }
};

// Login user function
export const loginUser = async (credentials) => {
  try {
    const response = await axios.post(`${api}/login`, credentials);
    return response.data;  // Return response to handle in the slice
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to login user");
  }
};
