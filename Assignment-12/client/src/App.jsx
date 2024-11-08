import "react-toastify/dist/ReactToastify.css";
import Header from "./Components/Header";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./Components/Dashboard";
import Login from "./Components/login";
import Signup from "./Components/Signup";
import { ToastContainer } from "react-toastify";
import VerifyLoginSession from "./auth/VerifyLoginSession";

function App() {
  return (
    <>
      <div className="container mt-5">
        <Header />
        <ToastContainer />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route
            path="/Dashboard"
            element={
              <VerifyLoginSession>
                <Dashboard />
              </VerifyLoginSession>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
