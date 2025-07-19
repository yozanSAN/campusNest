import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/pages/Terms.css";

const Terms = () => {
  const [accepted, setAccepted] = useState(null);
  const navigate = useNavigate();

  const handleAccept = () => {
    setAccepted(true);
    setTimeout(() => {
      navigate("/");
    }, 800); // Optional: brief feedback before redirect
  };

  return (
    <div className="terms-bg">
      <div className="terms-card">
        <div className="terms-icon">
          <svg width="32" height="32" fill="none" viewBox="0 0 32 32">
            <rect width="32" height="32" rx="8" fill="#2563eb" opacity="0.08"/>
            <path d="M10 8h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H10a2 2 0 0 1-2-2V10a2 2 0 0 1 2-2zm0 0v2m12-2v2M10 24v-2m12 2v-2M8 10h16M8 22h16" stroke="#2563eb" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </div>
        <h1 className="terms-title">Terms of Service</h1>
        <p className="terms-desc">
          As a company, we’re devoted only to your best interests. Please review the Terms of Service below as they summarize key legal points and responsibilities and your obligations that apply to your use of the CampusNest platform for the sharing and rating of student dorms.
        </p>
        <h2 className="terms-section-title">Your Posting of User Content</h2>
        <p className="terms-section-desc">
          “User Content” means content (other than basic user account info) you post or transmit on the Platform for others’ review, such as dorm experiences, including public ratings and commentary.
        </p>
        <p className="terms-section-desc">
          You represent and warrant that you own or have the right to share User Content you post to the Platform or share. You also agree that CampusNest can share, display, and use your User Content for the benefit of the community. You are responsible for ensuring your content does not violate any laws or the rights of others.
        </p>
        <p className="terms-section-desc">
          CampusNest reserves the right to remove any User Content or suspend or terminate your account for violations of these Terms or applicable law.
        </p>
        <div className="terms-actions">
          <button
            className="terms-btn accept"
            onClick={handleAccept}
            disabled={accepted === true}
          >
            ACCEPT
          </button>
          <button
            className="terms-btn decline"
            onClick={() => setAccepted(false)}
            disabled={accepted === false}
          >
            DECLINE
          </button>
        </div>
        {accepted === true && (
          <div className="terms-feedback accept-msg">Thank you for accepting the Terms of Service.</div>
        )}
        {accepted === false && (
          <div className="terms-feedback decline-msg">You have declined the Terms of Service.</div>
        )}
      </div>
    </div>
  );
};

export default Terms;