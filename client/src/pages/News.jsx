import { useEffect, useState } from "react";
import API from "../services/api";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function News() {
  const [news, setNews] = useState([]);

  useEffect(() => {
    API.get("/news")
      .then((res) => setNews(res.data))
      .catch(console.error);
  }, []);

  return (
    <>
      <Navbar />

      <div className="container py-5">

        {/* HEADER */}
        <div className="mb-5">
          <p className="text-uppercase text-muted small">
            BULLETIN
          </p>

          <h1 className="section-title">
            Community news
          </h1>

          <p className="lead">
            Announcements, updates, achievements, and stories
            from across the Verdant network.
          </p>
        </div>

        {/* FEATURED STORY */}
        {news.length > 0 && (
          <div className="row mb-5 align-items-center">
            <div className="col-lg-6">
              <div
                className="hero-card"
                style={{ minHeight: "350px" }}
              >
                <p className="small text-uppercase">
                  Featured Story
                </p>

                <h2>{news[0].title}</h2>
              </div>
            </div>

            <div className="col-lg-6">
              <h1 style={{ fontWeight: 300 }}>
                {news[0].title}
              </h1>

              <p className="lead mt-3">
                {news[0].content}
              </p>

              <small className="text-muted">
                By {news[0].author}
              </small>
            </div>
          </div>
        )}

        {/* NEWS GRID */}
        <div className="row">
          {news.slice(1).map((item) => (
            <div className="col-md-4 mb-4" key={item._id}>
              <div className="soft-card h-100">
                <span className="badge bg-success mb-3">
                  News
                </span>

                <h4>{item.title}</h4>

                <p className="text-muted">
                  {item.content}
                </p>

                <small>
                  By {item.author}
                </small>
              </div>
            </div>
          ))}
        </div>

      </div>

      <Footer />
    </>
  );
}

export default News;