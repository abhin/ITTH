import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { showError, showSuccess } from "../../Functions/Message";

// Async Thunks
export const login = createAsyncThunk(
  "auth/login",
  async ({ email, password, navigate }, { rejectWithValue, dispatch }) => {
    try {
      const response = await fetch("http://localhost:8000/api/v1/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!data.success) {
        showError(data.message);
        return rejectWithValue(data.message);
      }

      showSuccess("Login successful!");
      navigate("/dashboard"); // Navigate to Dashboard after login
      return data.user;
    } catch (err) {
      showError(err.message);
      return rejectWithValue(err.message);
    }
  }
);

export const verifyGoogleUser = createAsyncThunk(
  "auth/verifyGoogleUser",
  async ({ token, isExpired, navigate }, { rejectWithValue }) => {
    if (isExpired) {
      showError("Login expired. Please try again");
      return rejectWithValue("Login expired");
    }

    try {
      const response = await fetch("http://localhost:8000/api/v1/auth/google/verify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      });

      const data = await response.json();

      if (!data.success) {
        showError(data.message);
        return rejectWithValue(data.message);
      }

      showSuccess(data.message);
      navigate("/Dashboard"); // Navigate to Dashboard after Google verification
      return data.user;
    } catch (err) {
      showError(err.message);
      return rejectWithValue(err.message);
    }
  }
);

// Slice
const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    nextPage: null,
    loading: false,
    error: null,
  },
  reducers: {
    googleLogin: () => {
      window.open("http://localhost:8000/api/v1/auth/google", "_self");
    },
    logout: (state) => {
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(verifyGoogleUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(verifyGoogleUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(verifyGoogleUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { googleLogin, logout } = authSlice.actions;
export default authSlice.reducer;