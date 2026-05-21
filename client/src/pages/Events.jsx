import { useEffect, useState } from "react";
import API from "../services/api";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function Events() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    API.get("/events")
      .then((res) => setEvents(res.data))
      .catch(console.error);
  }, []);

  const joinEvent = async (id) => {
    try {
      await API.post(`/events/join/${id}`);
      alert("Joined event successfully");
    } catch {
      alert("Please login first");
    }
  };

  return (
    <>
      <Navbar />

      <div className="container py-5">

        {/* HEADER */}
        <div className="mb-5">
          <p className="text-uppercase text-muted small">
            CALENDAR
          </p>

          <h1 className="section-title">
            Upcoming events
          </h1>

          <p className="lead">
            Members can RSVP to all events.
            Guests may participate in public sessions.
          </p>
        </div>

        {/* EVENTS */}
        {events.map((event) => {
          const eventDate = new Date(event.date);

          const day = eventDate.getDate();
          const month = eventDate.toLocaleString("default", {
            month: "short"
          });

          return (
            <div
              key={event._id}
              className="soft-card mb-4"
            >
              <div className="row align-items-center">

                {/* DATE BOX */}
                <div className="col-md-2 text-center">
                  <div
                    style={{
                      border: "1px solid #dbe5d6",
                      borderRadius: "20px",
                      padding: "24px"
                    }}
                  >
                    <small className="text-uppercase text-muted">
                      {month}
                    </small>

                    <h1
                      style={{
                        fontSize: "3rem",
                        color: "#14532d"
                      }}
                    >
                      {day}
                    </h1>
                  </div>
                </div>

                {/* EVENT INFO */}
                <div className="col-md-8">
                  <div className="mb-2">
                    <span className="badge bg-light text-dark px-3 py-2">
                      Community Event
                    </span>
                  </div>

                  <h3>{event.title}</h3>

                  <p className="mb-2">
                    {event.description}
                  </p>

                  <p className="mb-1">
                    <strong>Host:</strong> {event.host}
                  </p>

                  <p className="mb-0">
                    <strong>Event Head:</strong> {event.eventHead}
                  </p>
                </div>

                {/* JOIN BUTTON */}
                <div className="col-md-2 text-end">
                  <button
                    className="green-btn"
                    onClick={() => joinEvent(event._id)}
                  >
                    RSVP
                  </button>
                </div>

              </div>
            </div>
          );
        })}
      </div>

      <Footer />
    </>
  );
}

export default Events;