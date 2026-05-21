import { useState } from "react";
import API from "../services/api";
import Navbar from "../components/Navbar";

function Signup() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    phone: ""
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post("/auth/signup", form);
      alert(res.data.message);
    } catch (err) {
      alert(err.response?.data?.message || "Signup failed");
    }
  };

  return (
    <>
      <Navbar />

      <div className="container-fluid auth-wrapper">
        <div className="row h-100">

          <div className="col-lg-6 auth-left d-flex flex-column justify-content-center">
            <h1 className="display-4 mb-4">
              “A network is the slow accumulation of showing up.”
            </h1>

            <p>
              Join the Verdant alumni and professional network.
              Applications are reviewed by administrators.
            </p>
          </div>

          <div className="col-lg-6 auth-right d-flex align-items-center">
            <div className="w-75 mx-auto">
              <h1 className="mb-4">Apply to Join</h1>

              <form onSubmit={handleSubmit}>
                <input
                  className="form-control mb-3"
                  placeholder="Full name"
                  onChange={(e) =>
                    setForm({ ...form, name: e.target.value })
                  }
                />

                <input
                  className="form-control mb-3"
                  placeholder="Email"
                  onChange={(e) =>
                    setForm({ ...form, email: e.target.value })
                  }
                />

                <input
                  className="form-control mb-3"
                  placeholder="Phone"
                  onChange={(e) =>
                    setForm({ ...form, phone: e.target.value })
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
                  Submit Application
                </button>
              </form>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}

export default Signup;