import React from "react";
import { Link } from "react-router-dom";
import "../styles/pages/Privacy.css";

const illustrationUrl = "https://i.pinimg.com/736x/fe/2e/95/fe2e9592c69acbee22bc2561068fc39d.jpg"; // Replace with your own if desired

const Privacy = () => (
  <div className="privacy-bg">
    <div className="privacy-container">
      <div className="privacy-content">
        <Link to="/" className="privacy-back">&larr; Back</Link>
        <h1 className="privacy-title">Privacy Policy</h1>
        <div className="privacy-date">Last Updated: July 4, 2025</div>
        <p>
          Your privacy is important to us. It is CampusNest’s policy to respect your privacy regarding any information we may collect from you across our website.
        </p>
        <h2>Information We Collect</h2>
        <ul>
          <li><strong>Personal Information:</strong> Name, email address, university, and other details you provide when registering or using our services.</li>
          <li><strong>Usage Data:</strong> Information about how you use our website, such as pages visited and search queries.</li>
          <li><strong>Cookies:</strong> We use cookies to enhance your experience and analyze site usage.</li>
        </ul>
        <h2>How We Use Information</h2>
        <ul>
          <li>To provide, operate, and maintain our website and services.</li>
          <li>To personalize your experience and improve our offerings.</li>
          <li>To communicate with you about updates or offers.</li>
          <li>To analyze usage and improve our website.</li>
        </ul>
        <h2>Information Sharing</h2>
        <p>
          We do not sell or rent your personal information. We may share information with trusted third parties who help us operate our website, as required by law, or to protect our rights.
        </p>
        <h2>Your Choices</h2>
        <p>
          You can update your account information or request deletion by contacting us. You may also disable cookies in your browser settings.
        </p>
        <h2>Security</h2>
        <p>
          We take reasonable measures to protect your information, but no method of transmission over the Internet is 100% secure.
        </p>
        <h2>Contact Us</h2>
        <p>
          If you have any questions about this Privacy Policy, please contact us at <a href="mailto:support@campusnest.com" className="privacy-link">support@campusnest.com</a>.
        </p>
      </div>
      <div className="privacy-illustration">
        <img
          src={illustrationUrl}
          alt="Privacy illustration"
        />
      </div>
    </div>
  </div>
);

export default Privacy;