import { createSlice } from "@reduxjs/toolkit";
import { showError, showSucess } from "../../Functions/Message"; 

const User = createSlice({
  name: "User",
  initialState: {
    name: "",
    email: "",
    password: "",
    nextPage: '',
  },
  reducers: {
    signUp: (state) => {
      const { name, email, password } = state;
      fetch("http://localhost:8000/api/v1/users/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (!data?.success) {
            showError(data.message);
            return;
          } else {
            state.nextPage = "/login";
            showSucess(data.message);
          }
        })
        .catch((err) => {
          showError(err.message);
        });
    },
  },
});

export const {signUp} = User.actions;

export default User.reducer;
