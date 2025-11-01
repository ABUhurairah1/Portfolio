import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  login as loginAPI,
  logout as logoutAPI,
  getCurrentUser,
} from "../../apis/auth";

// Initial state
const initialState = {
  user: null,
  token: null,
  refreshToken: null,
  isAuthenticated: false,
  isAdmin: false,
  loading: false,
  error: null,
};

// Async thunks
export const loginUser = createAsyncThunk(
  "auth/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await loginAPI(email, password);
      if (response.success && response.data) {
        // Store in localStorage
        localStorage.setItem("access_token", response.data.tokens.access);
        localStorage.setItem("refresh_token", response.data.tokens.refresh);
        localStorage.setItem("user", JSON.stringify(response.data.user));

        return {
          user: response.data.user,
          token: response.data.tokens.access,
          refreshToken: response.data.tokens.refresh,
        };
      } else {
        return rejectWithValue(response.message || "Login failed");
      }
    } catch (error) {
      return rejectWithValue(error.message || "An error occurred during login");
    }
  }
);

export const logoutUser = createAsyncThunk("auth/logout", async () => {
  logoutAPI();
  return null;
});

export const checkAuth = createAsyncThunk("auth/checkAuth", async () => {
  const token = localStorage.getItem("access_token");
  const user = getCurrentUser();

  if (token && user) {
    return {
      user,
      token,
      refreshToken: localStorage.getItem("refresh_token"),
    };
  }

  return null;
});

// Auth slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    updateUser: (state, action) => {
      state.user = action.payload;
      if (action.payload) {
        state.isAdmin = action.payload.is_admin === true;
      }
    },
  },
  extraReducers: (builder) => {
    // Login
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.refreshToken = action.payload.refreshToken;
        state.isAuthenticated = true;
        state.isAdmin = action.payload.user?.is_admin === true;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.isAuthenticated = false;
        state.user = null;
        state.token = null;
        state.refreshToken = null;
        state.isAdmin = false;
      });

    // Logout
    builder
      .addCase(logoutUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.loading = false;
        state.user = null;
        state.token = null;
        state.refreshToken = null;
        state.isAuthenticated = false;
        state.isAdmin = false;
        state.error = null;
      });

    // Check Auth
    builder
      .addCase(checkAuth.pending, (state) => {
        state.loading = true;
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload) {
          state.user = action.payload.user;
          state.token = action.payload.token;
          state.refreshToken = action.payload.refreshToken;
          state.isAuthenticated = true;
          state.isAdmin = action.payload.user?.is_admin === true;
        } else {
          state.user = null;
          state.token = null;
          state.refreshToken = null;
          state.isAuthenticated = false;
          state.isAdmin = false;
        }
        state.error = null;
      })
      .addCase(checkAuth.rejected, (state) => {
        state.loading = false;
        state.user = null;
        state.token = null;
        state.refreshToken = null;
        state.isAuthenticated = false;
        state.isAdmin = false;
      });
  },
});

export const { clearError, updateUser } = authSlice.actions;
export default authSlice.reducer;
