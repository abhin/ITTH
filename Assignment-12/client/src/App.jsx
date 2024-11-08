import { useContext, useEffect } from "react";
import GlobalContext from "./GlobalContext/GlobalContext";
import Header from "./Components/Header";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./Components/Dashboard";
import Login from "./Components/login";
import Signup from "./Components/Signup";

function App() {
  return (
    <>
      <div className="container mt-5">
        <Header />
        <Routes>
         <Route path="/Dashboard" element={<Dashboard/>} />
         <Route path="/" element={<Login/>} />
         <Route path="/login" element={<Login/>} />
         <Route path="/signup" element={<Signup />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
