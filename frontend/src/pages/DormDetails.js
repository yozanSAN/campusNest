import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import "../styles/pages/DormDetails.css";

const DormDetails = () => {
  const { dormId } = useParams(); // ✅ Correct param name
  const [dorm, setDorm] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [reviewLoading, setReviewLoading] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [newReview, setNewReview] = useState({ rating: 5, comment: '' });
  const [user, setUser] = useState(null);

  const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

  useEffect(() => {
    const fetchDormDetails = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/dorms/${dormId}`); // ✅ direct fetch
        if (!response.ok) throw new Error('Failed to fetch dorm details');
        const data = await response.json();
        setDorm(data);
      } catch (err) {
        setError('Error fetching dorm details: ' + err.message);
      } finally {
        setLoading(false);
      }
    };

    const fetchReviews = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/reviews/dorm/${dormId}`);
        if (!response.ok) throw new Error('Failed to fetch reviews');
        const data = await response.json();
        setReviews(data);
      } catch (err) {
        console.error('Error fetching reviews:', err);
      }
    };

    const checkAuthStatus = () => {
      const token = localStorage.getItem('token');
      const userData = localStorage.getItem('user');
      if (token && userData) {
        setUser(JSON.parse(userData));
      }
    };

    fetchDormDetails();
    fetchReviews();
    checkAuthStatus();
  }, [dormId, API_BASE_URL]);

const handleReviewSubmit = async (e) => {
  e.preventDefault();
  if (!user) return alert('Please log in to submit a review');
  if (!newReview.review || !newReview.review.trim()) return alert('Please write a review comment');

  setReviewLoading(true);
  try {
    const token = localStorage.getItem('token');
    console.log('Submitting review with token:', token); // Debug token
    if (!token) throw new Error('No authentication token found');

    console.log('Review data:', { ...newReview, dormId }); // Debug data
    const response = await fetch(`${API_BASE_URL}/reviews`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({
        rating: newReview.rating,
        review: newReview.review,
        createdAt: new Date().toISOString(),
        dormId: dormId
      })
    });

    if (!response.ok) {
      const errorData = await response.text(); // Use text() for raw response
      console.log('Server response:', errorData); // Debug response
      throw new Error(errorData || 'Failed to submit review');
    }

    setNewReview({ rating: 5, review: '' });

    const [reviewData, dormData] = await Promise.all([
      fetch(`${API_BASE_URL}/reviews/dorm/${dormId}`).then(res => res.json()),
      fetch(`${API_BASE_URL}/dorms/${dormId}`).then(res => res.json())
    ]);

    setReviews(reviewData);
    setDorm(dormData);

    alert('Review submitted successfully!');
    }  catch (err) {
  console.error('Review submission error:', err);

  // Detect session expiration from known patterns
  if (
    err.message.toLowerCase().includes('jwt expired') ||
    err.message.toLowerCase().includes('authentication failed') ||
    err.message.toLowerCase().includes('token') ||
    err.message.toLowerCase().includes('unauthorized')
  ) {
    alert('Your session has expired. Please log in again.');
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/login';
  } else {
    alert('Error submitting review: ' + err.message);
  }
}

};

  const handleDeleteReview = async (reviewId) => {
    if (!window.confirm('Are you sure you want to delete this review?')) return;

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_BASE_URL}/reviews/${reviewId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) throw new Error('Failed to delete review');

      const [reviewData, dormData] = await Promise.all([
        fetch(`${API_BASE_URL}/reviews/dorm/${dormId}`).then(res => res.json()),
        fetch(`${API_BASE_URL}/dorms/${dormId}`).then(res => res.json())
      ]);

      setReviews(reviewData);
      setDorm(dormData);

      alert('Review deleted successfully!');
    } catch (err) {
      alert('Error deleting review: ' + err.message);
    }
  };

  const getImageUrl = (photo) => {
    if (!photo) return '/default-dorm.jpg';
    if (photo.startsWith('http')) return photo;
    return `${API_BASE_URL.replace('/api', '')}${photo}`;
  };

  const nextImage = () => {
    if (dorm?.photos?.length > 1) {
      setCurrentImageIndex((prev) => (prev + 1) % dorm.photos.length);
    }
  };

  const prevImage = () => {
    if (dorm?.photos?.length > 1) {
      setCurrentImageIndex((prev) => (prev - 1 + dorm.photos.length) % dorm.photos.length);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Check if user has already reviewed
  // const userHasReviewed = user && reviews.some(r => r.user && r.user._id === user._id);

  if (loading) return <div className="loading">Loading dorm details...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!dorm) return <div className="error">Dorm not found</div>;

  return (
    <div className="dorm-details-container">
      <div className="dorm-header">
        <Link to="/search" className="back-button">← Back to Search</Link>
        <h1>{dorm.university}</h1>
        <div className="dorm-rating">
          <span className="stars">
            {'★'.repeat(Math.floor(dorm.ratingAverage || 0))}
            {'☆'.repeat(5 - Math.floor(dorm.ratingAverage || 0))}
          </span>
          <span className="rating-text">
            {dorm.ratingAverage?.toFixed(1) || 'No rating'} ({dorm.ratingQuantity || 0} reviews)
          </span>
        </div>
      </div>

      {/* Image Gallery */}
      <div className="image-gallery">
        {dorm.photos?.length > 0 ? (
          <div className="image-container">
            <img
              src={getImageUrl(dorm.photos[currentImageIndex])}
              alt={`${dorm.university} dormitory`}
              className="main-image"
              onError={(e) => { e.target.src = 'https://placehold.co/300x200?text=Dorm+Image'; }}
            />
            {dorm.photos.length > 1 && (
              <>
                <button className="image-nav prev" onClick={prevImage}>‹</button>
                <button className="image-nav next" onClick={nextImage}>›</button>
                <div className="image-dots">
                  {dorm.photos.map((_, index) => (
                    <span
                      key={index}
                      className={`dot ${index === currentImageIndex ? 'active' : ''}`}
                      onClick={() => setCurrentImageIndex(index)}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
        ) : (
          <div className="no-image">
            <img src="https://placehold.co/300x200?text=Dorm+Image" alt="Placeholder for dormitory" />
          </div>
        )}
      </div>

      {/* Dorm Info */}
      <div className="dorm-info-section">
        <div className="dorm-main-info">
          <h2>About This Dorm</h2>
          <p className="dorm-description">{dorm.description}</p>
          {dorm.location?.address && (
            <div className="location-info">
              <h3>Location</h3>
              <p>{dorm.location.address}</p>
            </div>
          )}
          <div className="amenities-section">
            <h3>Amenities</h3>
            <div className="amenities-grid">
              {dorm.amenities?.map((amenity, index) => (
                <span key={index} className="amenity-item">{amenity}</span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Reviews */}
      <div className="reviews-section">
        <h2>Reviews ({reviews.length})</h2>
        {user ? (
          <form onSubmit={handleReviewSubmit} className="review-form">
            <h3>Write a Review</h3>
            <div className="rating-input">
              <label>Rating:</label>
              <select
                value={newReview.rating}
                onChange={(e) => setNewReview({ ...newReview, rating: Number(e.target.value) })}
              >
                {[5, 4, 3, 2, 1].map(val => (
                  <option key={val} value={val}>{val} Star{val > 1 && 's'}</option>
                ))}
              </select>
            </div>
            <div className="comment-input">
              <label>Comment:</label>
              <textarea
                    value={newReview.review}
                    onChange={(e) => setNewReview({ ...newReview, review: e.target.value })}
                    placeholder="Share your experience..."
                    rows="4"
                    required
              />

            </div>
            <button type="submit" disabled={reviewLoading}>
              {reviewLoading ? 'Submitting...' : 'Submit Review'}
            </button>
          </form>
        ) : (
          <div className="login-prompt">
            <p>Please <Link to="/login">log in</Link> to write a review.</p>
          </div>
        )}

        <div className="reviews-list">
          {reviews.length === 0 ? (
            <p className="no-reviews">No reviews yet. Be the first to review this dorm!</p>
          ) : (

            reviews.map((review) => (
              <div key={review._id} className="review-item">
                <div className="review-header">
                  <div className="reviewer-info">
                    <strong>{review.user?.name || 'Anonymous'}</strong>
                    <span className="review-date">{formatDate(review.createdAt)}</span>
                  </div>
                  <div className="review-rating">
                    {'★'.repeat(review.rating)}
                    {'☆'.repeat(5 - review.rating)}
                  </div>
                </div>
                <p className="review-comment">{review.review}</p>
                {user && user._id === review.user?._id && (
                  <button
                    onClick={() => handleDeleteReview(review._id)}
                    className="delete-review-btn"
                  >
                    Delete Review
                  </button>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default DormDetails;
