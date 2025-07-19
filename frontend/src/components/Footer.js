import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3 className="footer-title">DormRate</h3>
            <p className="footer-description">
              Helping students find their perfect college dorm through honest reviews and detailed information.
            </p>
          </div>
          <div className="footer-section">
            <h3 className="footer-title">Quick Links</h3>
            <ul className="footer-links">
              <li>
                <Link to="/about">About Us</Link>
              </li>
              <li>
                <Link to="/contact">Contact</Link>
              </li>
              <li>
                <Link to="/help">Help Center</Link>
              </li>
            </ul>
          </div>
          <div className="footer-section">
            <h3 className="footer-title">Legal</h3>
            <ul className="footer-links">
              <li>
                <Link to="/privacy">Privacy Policy</Link>
              </li>
              <li>
                <Link to="/terms">Terms of Service</Link>
              </li>
              {/* <li>
                <Link to="/cookies">Cookie Policy</Link>
              </li> */}
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2024 DormRate. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;