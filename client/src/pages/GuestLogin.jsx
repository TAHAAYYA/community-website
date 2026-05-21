import { useState } from "react";
import Navbar from "../components/Navbar";

function GuestLogin() {
  const [guest, setGuest] = useState({
    name: "",
    email: "",
    city: ""
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    localStorage.setItem("guest", JSON.stringify(guest));

    alert("Guest access granted");

    window.location.href = "/events";
  };

  return (
    <>
      <Navbar />

      <div className="container-fluid auth-wrapper">
        <div className="row h-100">

          <div className="col-lg-6 auth-left d-flex flex-column justify-content-center">
            <h1 className="display-4">
              Not a member?
            </h1>

            <p>
              Local guests can participate in public community events.
            </p>
          </div>

          <div className="col-lg-6 auth-right d-flex align-items-center">
            <div className="w-75 mx-auto">
              <h1 className="mb-4">Guest Access</h1>

              <form onSubmit={handleSubmit}>
                <input
                  className="form-control mb-3"
                  placeholder="Full Name"
                  onChange={(e) =>
                    setGuest({ ...guest, name: e.target.value })
                  }
                />

                <input
                  className="form-control mb-3"
                  placeholder="Email"
                  onChange={(e) =>
                    setGuest({ ...guest, email: e.target.value })
                  }
                />

                <input
                  className="form-control mb-3"
                  placeholder="City"
                  onChange={(e) =>
                    setGuest({ ...guest, city: e.target.value })
                  }
                />

                <button className="green-btn w-100">
                  Continue to Events
                </button>
              </form>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}

export default GuestLogin;