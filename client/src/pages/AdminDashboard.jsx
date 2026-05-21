import { useEffect, useState } from "react";
import API from "../services/api";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function AdminDashboard() {
  const [members, setMembers] = useState([]);
  const [events, setEvents] = useState([]);
  const [news, setNews] = useState([]);

  const [eventForm, setEventForm] = useState({
    title: "",
    host: "",
    eventHead: "",
    date: "",
    description: ""
  });

  const [newsForm, setNewsForm] = useState({
    title: "",
    content: ""
  });

  const fetchMembers = async () => {
    try {
      const res = await API.get("/members");
      setMembers(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchEvents = async () => {
    try {
      const res = await API.get("/events");
      setEvents(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchNews = async () => {
    try {
      const res = await API.get("/news");
      setNews(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchMembers();
    fetchEvents();
    fetchNews();
  }, []);

  const approveMember = async (id) => {
    await API.put(`/members/approve/${id}`);
    fetchMembers();
  };

  const rejectMember = async (id) => {
    await API.delete(`/members/reject/${id}`);
    fetchMembers();
  };

  const createEvent = async (e) => {
    e.preventDefault();

    await API.post("/events", eventForm);

    setEventForm({
      title: "",
      host: "",
      eventHead: "",
      date: "",
      description: ""
    });

    fetchEvents();
  };

  const deleteEvent = async (id) => {
    await API.delete(`/events/${id}`);
    fetchEvents();
  };

  const createNews = async (e) => {
    e.preventDefault();

    await API.post("/news", newsForm);

    setNewsForm({
      title: "",
      content: ""
    });

    fetchNews();
  };

  const deleteNews = async (id) => {
    await API.delete(`/news/${id}`);
    fetchNews();
  };

  const pendingMembers = members.filter(
    (m) => m.approvalStatus === "pending"
  );

  return (
    <>
      <Navbar />

      <div className="container py-5">

        {/* HEADER */}
        <div className="mb-5">
          <p className="text-uppercase text-muted small">
            ADMIN CONSOLE
          </p>

          <h1 className="section-title">
            Community management dashboard
          </h1>

          <p className="lead">
            Approve members, manage events, publish news,
            and oversee the community.
          </p>
        </div>

        {/* STATS */}
        <div className="row mb-5">
          <div className="col-md-4">
            <div className="soft-card text-center">
              <div className="stat-number">
                {pendingMembers.length}
              </div>
              <p>Pending Approvals</p>
            </div>
          </div>

          <div className="col-md-4">
            <div className="soft-card text-center">
              <div className="stat-number">
                {events.length}
              </div>
              <p>Active Events</p>
            </div>
          </div>

          <div className="col-md-4">
            <div className="soft-card text-center">
              <div className="stat-number">
                {news.length}
              </div>
              <p>Published News</p>
            </div>
          </div>
        </div>

        {/* APPROVALS */}
        <section className="mb-5">
          <h2 className="mb-4">Pending Member Approvals</h2>

          {pendingMembers.length === 0 ? (
            <div className="soft-card">
              No pending approvals.
            </div>
          ) : (
            pendingMembers.map((member) => (
              <div key={member._id} className="soft-card mb-3">
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <h5>{member.name}</h5>
                    <p className="mb-0">{member.email}</p>
                  </div>

                  <div>
                    <button
                      className="btn btn-success me-2"
                      onClick={() => approveMember(member._id)}
                    >
                      Approve
                    </button>

                    <button
                      className="btn btn-danger"
                      onClick={() => rejectMember(member._id)}
                    >
                      Reject
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </section>

        {/* CREATE EVENT */}
        <section className="mb-5">
          <h2 className="mb-4">Create Event</h2>

          <div className="soft-card">
            <form onSubmit={createEvent}>
              <input
                className="form-control mb-3"
                placeholder="Event title"
                value={eventForm.title}
                onChange={(e) =>
                  setEventForm({
                    ...eventForm,
                    title: e.target.value
                  })
                }
              />

              <input
                className="form-control mb-3"
                placeholder="Host organization"
                value={eventForm.host}
                onChange={(e) =>
                  setEventForm({
                    ...eventForm,
                    host: e.target.value
                  })
                }
              />

              <input
                className="form-control mb-3"
                placeholder="Event head"
                value={eventForm.eventHead}
                onChange={(e) =>
                  setEventForm({
                    ...eventForm,
                    eventHead: e.target.value
                  })
                }
              />

              <input
                type="date"
                className="form-control mb-3"
                value={eventForm.date}
                onChange={(e) =>
                  setEventForm({
                    ...eventForm,
                    date: e.target.value
                  })
                }
              />

              <textarea
                className="form-control mb-3"
                rows="4"
                placeholder="Event description"
                value={eventForm.description}
                onChange={(e) =>
                  setEventForm({
                    ...eventForm,
                    description: e.target.value
                  })
                }
              />

              <button className="green-btn">
                Create Event
              </button>
            </form>
          </div>
        </section>

        {/* EVENTS LIST */}
        <section className="mb-5">
          <h2 className="mb-4">Manage Events</h2>

          {events.map((event) => (
            <div key={event._id} className="soft-card mb-3">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h5>{event.title}</h5>
                  <p className="mb-0">{event.host}</p>
                </div>

                <button
                  className="btn btn-danger"
                  onClick={() => deleteEvent(event._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </section>

        {/* NEWS */}
        <section className="mb-5">
          <h2 className="mb-4">Publish News</h2>

          <div className="soft-card">
            <form onSubmit={createNews}>
              <input
                className="form-control mb-3"
                placeholder="News title"
                value={newsForm.title}
                onChange={(e) =>
                  setNewsForm({
                    ...newsForm,
                    title: e.target.value
                  })
                }
              />

              <textarea
                className="form-control mb-3"
                rows="4"
                placeholder="News content"
                value={newsForm.content}
                onChange={(e) =>
                  setNewsForm({
                    ...newsForm,
                    content: e.target.value
                  })
                }
              />

              <button className="green-btn">
                Publish News
              </button>
            </form>
          </div>
        </section>

        {/* NEWS LIST */}
        <section>
          <h2 className="mb-4">Published News</h2>

          {news.map((item) => (
            <div key={item._id} className="soft-card mb-3">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h5>{item.title}</h5>
                  <p className="mb-0 text-muted">
                    By {item.author}
                  </p>
                </div>

                <button
                  className="btn btn-danger"
                  onClick={() => deleteNews(item._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </section>

      </div>

      <Footer />
    </>
  );
}

export default AdminDashboard;