import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { registerUser, loginUser } from "./userApi"; // Import API functions

export const registerUserAsync = createAsyncThunk(
  "auth/registerUser",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await registerUser(userData); // API call to register user
      console.log("Register Response: ", response); // Log the response to inspect data
      return response; // Return the response if successful
    } catch (error) {
      console.error("Register Error: ", error); // Log any errors
      return rejectWithValue(error.message); // Return error if any
    }
  }
);

// Login user action
export const loginUserAsync = createAsyncThunk(
  "auth/loginUser",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await loginUser(credentials); // API call to login user
      // Save the token in localStorage after successful login
      if (response.success) {
        localStorage.setItem("authToken", response.token); // Save token to localStorage
      }
      return response; // Return the response if successful
    } catch (error) {
      return rejectWithValue(error.message); // Return error if any
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: JSON.parse(localStorage.getItem("user")) || null, // Retrieve user data from localStorage
    token: localStorage.getItem("authToken") || null, // Retrieve token from localStorage
    loading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem("authToken"); // Clear token from storage
      localStorage.removeItem("user"); // Clear user data from storage
    },
  },
  extraReducers: (builder) => {
    builder
      // Handle Register
      .addCase(registerUserAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUserAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user; // Save user data
        state.token = action.payload.token; // Save token
        localStorage.setItem("authToken", action.payload.token); // Save token to localStorage
        localStorage.setItem("user", JSON.stringify(action.payload.user)); // Save user data to localStorage
      })
      .addCase(registerUserAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Handle Login
      .addCase(loginUserAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUserAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user; // Save user data
        state.token = action.payload.token; // Save token
        localStorage.setItem("authToken", action.payload.token); // Save token to localStorage
        localStorage.setItem("user", JSON.stringify(action.payload.user)); // Save user data to localStorage
      })
      .addCase(loginUserAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
