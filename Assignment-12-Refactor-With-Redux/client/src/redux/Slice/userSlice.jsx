import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { showError, showSuccess } from "../../Functions/Message";

// Async Thunk for signUp
export const signUp = createAsyncThunk(
  "user/signUp",
  async ({ name, email, password, navigate }, { rejectWithValue }) => {
    try {
      const response = await fetch("http://localhost:8000/api/v1/users/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();

      if (!data.success) {
        showError(data.message);
        return rejectWithValue(data.message);
      }

      showSuccess(data.message);
      navigate("/login");
      return data;  // Optionally return success data if needed
    } catch (err) {
      showError(err.message);
      return rejectWithValue(err.message);
    }
  }
);


const userSlice = createSlice({
  name: "user",
  initialState: {
    name: "",
    email: "",
    password: "",
    nextPage: "",
    loading: false,
    error: null,
  },
  reducers: {
    // You can add other reducers here if needed
  },
  extraReducers: (builder) => {
    builder
      .addCase(signUp.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signUp.fulfilled, (state) => {
        state.loading = false;
        state.nextPage = "/login"; // Set nextPage after successful signup
      })
      .addCase(signUp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default userSlice.reducer;