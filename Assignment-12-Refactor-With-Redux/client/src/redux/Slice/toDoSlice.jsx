import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { showError, showSuccess } from "../../Functions/Message";

// Base API URL
const API_BASE = "http://localhost:8000/api/v1/todos";

// Helper function for API requests
const fetchAPI = async (url, options) => {
  const response = await fetch(url, options);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return response.json();
};

// Async Thunks
export const addTodo = createAsyncThunk(
  "ToDo/addTodo",
  async ({ title, description }, { rejectWithValue, getState }) => {
    const state = getState(); 
    
    // const user = state.auth.user; 

    alert('user', user)

    if (!user) {
      showError("User is not logged in!");
      return rejectWithValue("User is not logged in!");
    }

    try {
      const data = await fetchAPI(`${API_BASE}/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: user?.token,
        },
        body: JSON.stringify({ title, description }),
      });

      if (!data.success) {
        showError(data.message);
        return rejectWithValue(data.message);
      }
      showSuccess(data.message);
      return data.toDo;
    } catch (err) {
      showError(err.message);
      return rejectWithValue(err.message);
    }
  }
);

export const getAllToDo = createAsyncThunk(
  "ToDo/getAllToDo",
  async (_, { rejectWithValue, getState }) => {
    const state = getState(); // Access global state
    const user = state.auth.user; // Get user from auth state

    if (!user) {
      showError("User is not logged in!");
      return rejectWithValue("User is not logged in!");
    }

    try {
      const data = await fetchAPI(`${API_BASE}/read`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: user?.token,
        },
      });

      if (!data.success) {
        showError(data.message);
        return rejectWithValue(data.message);
      }

      return data.toDo;
    } catch (err) {
      showError(err.message);
      return rejectWithValue(err.message);
    }
  }
);

export const updateToDo = createAsyncThunk(
  "ToDo/updateToDo",
  async ({ id, completed }, { rejectWithValue, dispatch, getState }) => {
    const state = getState(); // Access global state
    const user = state.auth.user; // Get user from auth state

    if (!user) {
      showError("User is not logged in!");
      return rejectWithValue("User is not logged in!");
    }

    try {
      const data = await fetchAPI(`${API_BASE}/update`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: user?.token,
        },
        body: JSON.stringify({ id, completed }),
      });

      if (!data.success) {
        showError(data.message);
        return rejectWithValue(data.message);
      }

      dispatch(getAllToDo()); // Refresh todos
      showSuccess(data.message);
      return id; // Return updated ID
    } catch (err) {
      showError(err.message);
      return rejectWithValue(err.message);
    }
  }
);

export const deleteToDo = createAsyncThunk(
  "ToDo/deleteToDo",
  async ({ id }, { rejectWithValue, dispatch, getState }) => {
    const state = getState(); // Access global state
    const user = state.auth.user; // Get user from auth state

    if (!user) {
      showError("User is not logged in!");
      return rejectWithValue("User is not logged in!");
    }

    try {
      const data = await fetchAPI(`${API_BASE}/delete/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: user?.token,
        },
      });

      if (!data.success) {
        showError(data.message);
        return rejectWithValue(data.message);
      }

      dispatch(getAllToDo()); // Refresh todos
      showSuccess(data.message);
      return id; // Return deleted ID
    } catch (err) {
      showError(err.message);
      return rejectWithValue(err.message);
    }
  }
);

// Slice Definition
const toDoSlice = createSlice({
  name: "ToDo",
  initialState: {
    toDos: [],
    status: "idle", // For loading states
    error: null,    // For error messages
  },
  reducers: {
    setToDos: (state, action) => {
      state.toDos = [action.payload, ...state.toDos];
    }
  },
  extraReducers: (builder) => {
    builder
      // Add Todo
      .addCase(addTodo.fulfilled, (state, action) => {
        state.toDos.unshift(action.payload);
      })
      // Get All Todos
      .addCase(getAllToDo.fulfilled, (state, action) => {
        state.toDos = action.payload;
      })
      // Handle Errors
      .addMatcher(
        (action) => action.type.endsWith("/rejected"),
        (state, action) => {
          state.error = action.payload || "An error occurred.";
        }
      )
      .addMatcher(
        (action) => action.type.endsWith("/pending"),
        (state) => {
          state.status = "loading";
        }
      )
      .addMatcher(
        (action) => action.type.endsWith("/fulfilled"),
        (state) => {
          state.status = "idle";
          state.error = null;
        }
      );
  },
});

export const { setToDos } = toDoSlice.actions;
export default toDoSlice.reducer;