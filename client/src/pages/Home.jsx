import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";

function Home() {
  return (
    <>
      <Navbar />

      <div className="container py-5">

        {/* HERO */}
        <div className="row align-items-center mb-5">
          <div className="col-lg-6">
            <p className="text-uppercase text-muted small">
              EST. 2014 · PROFESSIONAL COMMUNITY NETWORK
            </p>

            <h1 className="hero-title">
              A community that <span className="hero-accent">keeps</span>
              <br />
              showing up —
              <br />
              for each other,
              <br />
              and for what's next.
            </h1>

            <p className="lead mt-4">
              Verdant is a working network of professionals who mentor,
              collaborate, host events, and build opportunities together.
            </p>

            <div className="d-flex gap-3 mt-4">
              <Link to="/signup" className="green-btn">
                Apply for membership
              </Link>

              <Link to="/events" className="outline-btn">
                See upcoming events
              </Link>
            </div>
          </div>

          <div className="col-lg-6">
            <div className="hero-card">
              <p className="text-uppercase small">The Verdant Network</p>

              <h3>
                Established to connect professionals,
                alumni, mentors, founders,
                and collaborators.
              </h3>
            </div>
          </div>
        </div>

        {/* STATS */}
        <div className="row text-center mb-5">
          <div className="col-md-4">
            <div className="stat-number">4,287</div>
            <p>Active Members</p>
          </div>

          <div className="col-md-4">
            <div className="stat-number">28</div>
            <p>Global Chapters</p>
          </div>

          <div className="col-md-4">
            <div className="stat-number">142</div>
            <p>Events Hosted</p>
          </div>
        </div>

        {/* UPCOMING */}
        <section className="mb-5">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2 className="section-title">What's on the calendar</h2>
            <Link to="/events">All events →</Link>
          </div>

          <div className="soft-card mb-3">
            <h4>Community Service Day</h4>
            <p>Marshfield Park · Event Head: Luca Romano</p>
          </div>

          <div className="soft-card mb-3">
            <h4>Mentorship Mixer — Spring Cohort</h4>
            <p>Linden Commons · Event Head: Sara Halvorsen</p>
          </div>

          <div className="soft-card">
            <h4>Policy Roundtable: Urban Climate</h4>
            <p>The Atrium · Event Head: Anaya Krishnan</p>
          </div>
        </section>

        {/* NEWS */}
        <section className="mb-5">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2 className="section-title">Community news</h2>
            <Link to="/news">All stories →</Link>
          </div>

          <div className="row">
            <div className="col-md-4">
              <div className="soft-card">
                <h5>Verdant Network surpasses 4,200 active members</h5>
                <p>
                  Strong year-over-year growth across Asia-Pacific
                  and Latin America chapters.
                </p>
              </div>
            </div>

            <div className="col-md-4">
              <div className="soft-card">
                <h5>New Fellowship Program announced</h5>
                <p>
                  Support for emerging researchers and founders.
                </p>
              </div>
            </div>

            <div className="col-md-4">
              <div className="soft-card">
                <h5>Chapter spotlight: Lagos hosts first founder pitch</h5>
                <p>
                  Members gathered for collaborative networking.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ACCESS */}
        <section>
          <h2 className="section-title mb-4">Three ways to come in</h2>

          <div className="row">
            <div className="col-md-4">
              <div className="soft-card">
                <h5>Member sign in</h5>
                <p>Access member-only resources and events.</p>

                <Link to="/member-login" className="green-btn">
                  Member Login
                </Link>
              </div>
            </div>

            <div className="col-md-4">
              <div className="soft-card">
                <h5>Guest access</h5>
                <p>Participate in public events without membership.</p>

                <Link to="/guest-login" className="green-btn">
                  Guest Login
                </Link>
              </div>
            </div>

            <div className="col-md-4">
              <div className="soft-card">
                <h5>Administrator</h5>
                <p>Manage members, approvals, events, and news.</p>

                <Link to="/admin-login" className="green-btn">
                  Admin Login
                </Link>
              </div>
            </div>
          </div>
        </section>

      </div>

      <Footer />
    </>
  );
}

export default Home;