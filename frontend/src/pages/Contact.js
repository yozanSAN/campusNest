import React from 'react';
import '../styles/pages/Contact.css'
import Footer from '../components/Footer';


function ContactPage() {
  return (
    <div className="contact-container" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <main className="content" style={{ flex: 1 }}>
        <h1 className="title">Contact Us</h1>
        <p className="subtitle">
          Have questions, feedback, or partnership inquiries? We’d love to hear from you.
        </p>
        <div className="contact-box">
          <form className="contact-form">
            <div className="form-group">
              <label htmlFor="name">Your Name</label>
              <input type="text" id="name" placeholder="Enter your name" required />
            </div>
            <div className="form-group">
              <label htmlFor="email">Your Email</label>
              <input type="email" id="email" placeholder="Enter your email" required />
            </div>
            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea id="message" rows="5" placeholder="Type your message..." required></textarea>
            </div>
            <button type="submit" className="submit-btn">Send Message</button>
          </form>
        </div>
      </main>
      <Footer/>
    </div>
  );
}

export default ContactPage;
