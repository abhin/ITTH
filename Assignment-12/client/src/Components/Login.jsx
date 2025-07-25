import { useContext, useEffect, useState } from "react";
import GlobalContext from "../GlobalContext/GlobalContext";
import { useParams } from "react-router-dom";
import { useJwt } from "react-jwt";

export default function Login() {
  const {
    login,
    goolgeLogin,
    setGoogleUserToken,
    setIsGoogleUserTokenExpired,
  } = useContext(GlobalContext);
  const [email, setEmail] = useState("");
  const [password, setpassword] = useState("");
  const { token } = useParams();
  const { isExpired } = useJwt(token);

  useEffect(() => {
    setIsGoogleUserTokenExpired(isExpired);
    setGoogleUserToken(token);
  }, []);

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div
        className="card p-4 shadow"
        style={{ width: "300px", backgroundColor: "#007bff" }}
      >
        <h2 className="text-center text-white mb-4">Login</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            login(email, password);
          }}
        >
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Email"
              required
              onChange={(e) => {
                setEmail(e.currentTarget.value);
              }}
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              className="form-control"
              placeholder="password"
              required
              onChange={(e) => {
                setpassword(e.currentTarget.value);
              }}
            />
          </div>
          <button type="submit" className="btn btn-dark w-100 mb-2">
            Login
          </button>
          <button
            type="button"
            className="btn btn-info w-100"
            onClick={goolgeLogin}
          >
            Google Login
          </button>
        </form>
      </div>
    </div>
  );
}
