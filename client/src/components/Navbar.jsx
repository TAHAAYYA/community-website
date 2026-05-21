import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

function Navbar() {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="navbar navbar-expand-lg navbar-custom py-3">
      <div className="container">
        <Link
          to="/"
          className="navbar-brand d-flex align-items-center gap-3"
        >
          <div className="brand-logo">V</div>
          <div>
            <strong>Verdant</strong> Alumni
          </div>
        </Link>

        <div className="d-flex gap-4 align-items-center">
          <Link to="/" className="text-dark">Home</Link>
          <Link to="/events" className="text-dark">Events</Link>
          <Link to="/members" className="text-dark">Members</Link>
          <Link to="/news" className="text-dark">News</Link>

          {user ? (
            <>
              {user.role === "admin" && (
                <Link to="/admin-dashboard" className="text-success">
                  Admin
                </Link>
              )}

              <span className="text-muted">
                {user.name}
              </span>

              <button
                className="btn btn-outline-danger btn-sm"
                onClick={logout}
              >
                Logout
              </button>
            </>
          ) : (
            <Link to="/member-login" className="text-dark">
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;