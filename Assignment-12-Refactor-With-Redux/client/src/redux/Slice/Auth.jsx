import { createSlice } from "@reduxjs/toolkit";
import { showError, showSucess } from "../../Functions/Message";

const Auth = createSlice({
  name: "Auth",
  initialState: {
    user: {},
    nextPage: "/",
    email: "",
    password: "",
    token: "",
    isGoogleUserTokenExpired: true,
  },
  reducers: {
    login: (state) => {
      const { email, password } = state;
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
            return;
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

    verifyGoolgeUser: (state) => {
      const { token, isGoogleUserTokenExpired } = state;
      if (isGoogleUserTokenExpired) {
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
            return;
          } else {
            showSucess(data.message);
            state.user = data?.user;
            state.nextPage = "/Dashboard";
          }
        })
        .catch((err) => {
          showError(err.message);
        });
    },

    logout: (state) => {
      state.user = null;
    },
  },
});

export default Auth.reducer;
