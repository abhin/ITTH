import GlobalContext from "./GlobalContext";
import { showError, showSucess } from "../Functions/Message";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function GlobalContextProvider({ children }) {
  const navigate = useNavigate();
  const [user, setUser] = useState();

  const login = (email, password) => {
    fetch("http://localhost:8000/api/v1/users/login", {
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
          setUser(data?.user);
          navigate("/Dashboard");
        }
      })
      .catch((err) => {
        showError(err.message);
      });
  };

  const signUp = (name, email, password) => {
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
          navigate("/login");
          showSucess(data.message);
        }
      })
      .catch((err) => {
        showError(err.message);
      });
  };
  return (
    <GlobalContext.Provider value={{ login, signUp, user }}>
      {children}
    </GlobalContext.Provider>
  );
}
