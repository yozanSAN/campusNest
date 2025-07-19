import React from 'react';
import '../styles/pages/About.css'
import Footer from '../components/Footer';


function AboutPage() {
  return (
    <div className="about-container">
      

      <main className="content">
        <h1 className="title">About CampusNest</h1>
        <p className="subtitle">
          RateMyDorm helps college students make informed decisions about campus housing
          by providing honest reviews and ratings from real students.
        </p>

        <section>
          <h2>Our Mission</h2>
          <p>
            We believe that choosing the right dorm can make or break your college experience.
            That’s why we created a platform where students can share their honest experiences
            about campus housing. Our mission is to provide transparent, authentic reviews
            that help future residents make the best housing decisions for their college journey.
          </p>
        </section>

        <section>
          <h2>How It Works</h2>
          <ol>
            <li>Search for your dorm or residence hall by school name or building</li>
            <li>Read honest reviews and ratings from current and former residents</li>
            <li>Leave your own review to help future students make informed decisions</li>
          </ol>
        </section>

        <section>
          <h2>For Students, By Students</h2>
          <p>
            RateMyDorm was created by students who understand the challenges of finding the right
            campus housing. We know how important it is to have reliable information about dorm
            life, from room quality and cleanliness to community atmosphere and location convenience.
          </p>
          <p>
            Every review on our platform comes from verified students who have actually lived in the
            dorms they’re reviewing. This ensures that you’re getting authentic, firsthand experiences
            rather than promotional content or biased information.
          </p>
        </section>

        <section>
          <h2>Why Choose CampusNest?</h2>
          <ul>
            <li>Authentic reviews from real students</li>
            <li>Comprehensive coverage of colleges and universities nationwide</li>
            <li>Easy-to-use search and filtering system</li>
            <li>Free access to all reviews and ratings</li>
            <li>Community-driven platform that grows with student contributions</li>
          </ul>
        </section>

        <div className="cta-box">
          <h3>Ready to Find Your Perfect Dorm?</h3>
          <p>Join thousands of students who have made better housing decisions with CampusNest.</p>
          <div className="cta-buttons">
            <button>Search Dorms</button>
            <button className="outline">Leave a Review</button>
          </div>
        </div>
      </main>

     <Footer />
    </div>
  );
}

export default AboutPage;
