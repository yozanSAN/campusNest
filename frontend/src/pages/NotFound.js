import React from 'react';
import { Link } from 'react-router-dom';
import "../styles/pages/NotFound.css";

const NotFound = () => {
  return (
    <div className="not-found-container">
      <div className="not-found-content">
        {/* 404 Animation */}
        <div className="error-animation">
          <div className="error-number">
            <span className="four">4</span>
            <span className="zero">0</span>
            <span className="four">4</span>
          </div>
          <div className="error-icon">🏠</div>
        </div>

        {/* Error Message */}
        <div className="error-message">
          <h1>Oops! Page Not Found</h1>
          <p>The dorm you're looking for seems to have moved out!</p>
          <p>Don't worry, there are plenty of other great places to explore.</p>
        </div>

        {/* Action Buttons */}
        <div className="error-actions">
          <Link to="/" className="btn btn-primary">
            🏠 Go Home
          </Link>
          <Link to="/search" className="btn btn-secondary">
            🔍 Search Dorms
          </Link>
        </div>

        {/* Popular Links */}
        <div className="popular-links">
          <h3>Popular Pages</h3>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/search">Search Dorms</Link></li>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </div>

        {/* Fun Facts */}
        <div className="fun-fact">
          <p>💡 <strong>Did you know?</strong> The first student dormitory was built at Yale University in 1750!</p>
        </div>
      </div>
    </div>
  );
};

export default NotFound;