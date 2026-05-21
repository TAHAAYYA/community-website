import { useEffect, useState } from "react";
import API from "../services/api";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function Members() {
  const [members, setMembers] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    API.get("/members")
      .then((res) => setMembers(res.data))
      .catch(console.error);
  }, []);

  const filtered = members.filter(
    (member) =>
      member.name.toLowerCase().includes(search.toLowerCase()) ||
      (member.designation || "")
        .toLowerCase()
        .includes(search.toLowerCase())
  );

  return (
    <>
      <Navbar />

      <div className="container py-5">
        {/* HEADER */}
        <div className="mb-5">
          <p className="text-uppercase text-muted small">
            DIRECTORY
          </p>

          <h1 className="section-title">
            Our members
          </h1>

          <p className="lead">
            Officers, committee chairs, community members,
            and alumni professionals.
          </p>
        </div>

        {/* SEARCH */}
        <div className="mb-5">
          <input
            type="text"
            className="form-control form-control-lg"
            placeholder="Search by name, designation, or role..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              borderRadius: "18px",
              padding: "16px"
            }}
          />
        </div>

        {/* MEMBERS GRID */}
        <div className="row">
          {filtered.map((member) => (
            <div className="col-lg-4 col-md-6 mb-4" key={member._id}>
              <div className="soft-card h-100">

                <div className="d-flex justify-content-between align-items-start">
                  <div
                    className="brand-logo"
                    style={{
                      width: "64px",
                      height: "64px",
                      fontSize: "1.4rem"
                    }}
                  >
                    {member.name.charAt(0)}
                  </div>

                  <span
                    className={`badge px-3 py-2 ${
                      member.role === "admin"
                        ? "bg-dark"
                        : "bg-success"
                    }`}
                  >
                    {member.role}
                  </span>
                </div>

                <div className="mt-4">
                  <h4>{member.name}</h4>

                  <p className="text-success fw-semibold mb-2">
                    {member.designation || "Community Member"}
                  </p>

                  <hr />

                  <p className="mb-2">
                    <strong>Email:</strong> {member.email}
                  </p>

                  <p className="mb-0">
                    <strong>Phone:</strong>{" "}
                    {member.phone || "Not available"}
                  </p>
                </div>

              </div>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </>
  );
}

export default Members;