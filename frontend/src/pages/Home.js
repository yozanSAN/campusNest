"use client"

import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/pages/Home.css";
import Footer from '../components/Footer';

const popularSearches = ["Um6p", "Al Akhawayn", "Ibn Zohr"];

const Home = ({ user }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [topDorms, setTopDorms] = useState([]);
  const [loadingTopDorms, setLoadingTopDorms] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:5000/api/dorms/top-rated")
      .then(res => res.json())
      .then(data => {
        setTopDorms(data);
        setLoadingTopDorms(false);
      })
      .catch(error => {
        console.error("Failed to fetch top-rated dorms:", error);
        setLoadingTopDorms(false);
      });
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?query=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(<span key={i} className="star filled">★</span>);
      } else if (i === fullStars && hasHalfStar) {
        stars.push(<span key={i} className="star half">★</span>);
      } else {
        stars.push(<span key={i} className="star empty">★</span>);
      }
    }
    return stars;
  };

  return (
    <div className="home-page">
      <main className="main-content">
        {/* Hero Section */}
        <section className="hero-section">
          <div className="container">
            <h1 className="hero-title">
              Find Your Perfect <br />
              <span className="text-blue">College Dorm</span>
            </h1>
            <p className="hero-subtitle">
              Read honest reviews from real students and discover the best dorms at your university.
            </p>

            {/* Search Bar */}
            <form onSubmit={handleSearch} className="search-container">
              <div className="search-box">
                <div className="search-input-wrapper">
                  <svg className="search-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <circle cx="11" cy="11" r="8"></circle>
                    <path d="m21 21-4.35-4.35"></path>
                  </svg>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search dorms by university ..."
                    className="search-input"
                    aria-label="Search universities or dorms"
                  />
                </div>
                <button type="submit" className="search-button">Search</button>
              </div>
            </form>

            <p className="popular-searches">
              Popular searches: {popularSearches.join(", ")}
            </p>
          </div>
        </section>

        {/* Featured Dorms Section */}
        <section className="featured-dorms-section">
          <div className="container">
            <h2 className="section-title">Top Rated Dorms</h2>
            <p className="section-subtitle">Discover highly-rated dorms from top universities</p>

            {loadingTopDorms ? (
              <div className="loading">Loading...</div>
            ) : (
              <div className="dorms-grid">
                {topDorms.slice(0, 4).map((dorm) => (
                  

                  <Link to={`/dorms/${dorm._id}`} key={dorm._id} className="dorm-card-link">
                    <div className="dorm-card">
                      <div className="dorm-image">
                        <img
                          src={
                            Array.isArray(dorm.photos) && dorm.photos.length > 0
                              ? `http://localhost:5000/uploads/${dorm.photos[0].replace('/uploads/', '')}`
                              : "https://placehold.co/300x200?text=Dorm+Image"
                          }
                          alt={`${dorm.university} dorm`}
                          className="dorm-img"
                          onError={(e) => {
                            e.target.src = "https://placehold.co/300x200?text=Dorm+Image";
                          }}
                        />
                        <span className="featured-badge">Featured</span>
                      </div>
                      <div className="dorm-content">
                        <h3 className="dorm-name">{dorm.location}</h3>
                        <div className="dorm-university">
                          <svg className="location-icon" width="14" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                            <circle cx="12" cy="10" r="3"></circle>
                          </svg>
                          <span>{dorm.university}</span>
                        </div>
                        <div className="dorm-rating">
                          <div className="stars">{renderStars(dorm.ratingAverage || 0)}</div>
                          <span className="rating-text">
                            {typeof dorm.ratingAverage === "number"
                              ? dorm.ratingAverage.toFixed(1)
                              : "N/A"} ({dorm.reviewCount || 0} reviews)
                          </span>
                        </div>
                        <p className="dorm-description">
                          {dorm.description ||
                            "Modern residence hall with excellent amenities and community atmosphere..."}
                        </p>
                        <div className="amenities-tags">
                          {dorm.amenities?.slice(0, 3).map((amenity, idx) => (
                            <span key={idx} className="amenity-tag">{amenity}</span>
                          )) || (
                            <>
                              <span className="amenity-tag">WiFi</span>
                              <span className="amenity-tag">Parking</span>
                              <span className="amenity-tag">Gym</span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}

              </div>
            )}

            <div className="view-all-container">
              {/* ✅ Corrected link from /dorms to /search */}
              <Link to="/search" className="view-all-btn">
                View All Dorms
              </Link>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="stats-section">
          <div className="container">
            <div className="stats-grid">
              <div className="stat-item">
                <h3 className="stat-number">10,000+</h3>
                <p className="stat-label">Dorm Reviews</p>
              </div>
              <div className="stat-item">
                <h3 className="stat-number">500+</h3>
                <p className="stat-label">Universities</p>
              </div>
              <div className="stat-item">
                <h3 className="stat-number">50,000+</h3>
                <p className="stat-label">Students Helped</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Home;
