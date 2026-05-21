import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import API from "../services/api";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

function MemberLogin() {
  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post("/auth/login", form);
      login(res.data);
      navigate("/");
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <>
      <Navbar />

      <div className="container-fluid auth-wrapper">
        <div className="row h-100">

          <div className="col-lg-6 auth-left d-flex flex-column justify-content-center">
            <h1 className="display-4">
              Welcome back.
            </h1>

            <p>
              Access the directory, members-only events,
              and your community resources.
            </p>
          </div>

          <div className="col-lg-6 auth-right d-flex align-items-center">
            <div className="w-75 mx-auto">
              <h1 className="mb-4">Member Sign In</h1>

              <form onSubmit={handleSubmit}>
                <input
                  className="form-control mb-3"
                  placeholder="Email"
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
                  Sign In
                </button>
              </form>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}

export default MemberLogin;