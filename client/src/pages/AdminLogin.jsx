import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import API from "../services/api";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

function AdminLogin() {
  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post("/auth/admin-login", form);
      login(res.data);
      navigate("/admin-dashboard");
    } catch (err) {
      alert(err.response?.data?.message || "Admin login failed");
    }
  };

  return (
    <>
      <Navbar />

      <div className="container-fluid auth-wrapper">
        <div className="row h-100">

          <div className="col-lg-6 auth-left d-flex flex-column justify-content-center">
            <h1 className="display-4">
              Administrator Console
            </h1>

            <p>
              Manage members, applications, events, and published news.
            </p>
          </div>

          <div className="col-lg-6 auth-right d-flex align-items-center">
            <div className="w-75 mx-auto">
              <h1 className="mb-4">Administrator Sign In</h1>

              <form onSubmit={handleSubmit}>
                <input
                  className="form-control mb-3"
                  placeholder="Admin Email"
                  onChange={(e) =>
                    setForm({ ...form, email: e.target.value })
                  }
                />

                <input
                  type="password"
                  className="form-control mb-3"
                  placeholder="Password"
                  onChange={(e) =>
                    setForm({ ...form, password: e.target.value })
                  }
                />

                <button className="green-btn w-100">
                  Continue to Console
                </button>
              </form>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}

export default AdminLogin;