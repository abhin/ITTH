import { useContext } from "react";
import GlobalContext from "../GlobalContext/GlobalContext";

function Header() {
  const { user } = useContext(GlobalContext);
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary mb-2">
      <div className="container">
        <a className="navbar-brand" href="/">
          ToDo
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            {user && (
              <>
                <li className="nav-item">
                  <a className="nav-link" href="/dashboard">
                    Dashboard
                  </a>
                </li>
              </>
            )}
            {!user && (
              <>
                <li className="nav-item">
                  <a className="nav-link" href="/login">
                    Login
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/signup">
                    Signup
                  </a>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Header;
