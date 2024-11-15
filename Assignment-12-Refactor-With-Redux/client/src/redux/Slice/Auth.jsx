import { createSlice } from "@reduxjs/toolkit";
import { showError, showSucess } from "../../Functions/Message";

const Auth = createSlice({
  name: "Auth",
  initialState: {
    user: null,
    nextPage: null,
  },
  reducers: {
    login: (state, action) => {
      const { email, password } = action.payload;
      fetch("http://localhost:8000/api/v1/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (!data?.success) {
            showError(data.message);
          } else {
            state.user = data?.user;
            state.nextPage = "/Dashboard";
          }
        })
        .catch((err) => {
          showError(err.message);
        });
    },

    goolgeLogin: () => {
      window.open("http://localhost:8000/api/v1/auth/google", "_self");
    },

    verifyGoolgeUser: (state, action) => {
      const { token, isExpired } = action.payload;

      if (isExpired) {
        showError("Login expired. Please try again");
        state.nextPage = "/login";
        return;
      }

      fetch("http://localhost:8000/api/v1/auth/google/verify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (!data?.success) {
            showError(data.message);
            return {
              ...state,
              nextPage: "/login",
            };
          } else {
            showSucess(data.message);
            // state.user = data?.user;
            // state.nextPage = "/Dashboard";

            return {
              ...state,
              user: data?.user,
              nextPage: "/Dashboard",
            };
          }
        })
        .catch((err) => {
          showError(err.message);
        });
    },

    logout: (state) => {
      state.user = null;
      state.nextPage = "/login";
    },
  },
});

export const { login, goolgeLogin, verifyGoolgeUser, logout } = Auth.actions;
export default Auth.reducer;
