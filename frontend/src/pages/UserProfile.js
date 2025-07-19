import React, { useEffect, useState } from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import { Home, Search, Bell, MessageCircle, User } from 'lucide-react';
import '../styles/pages/UserProfile.css';

const UserProfile = () => {
  const { id } = useParams();
  const location = useLocation();
  const [userData, setUserData] = useState(null);
  const [userReviews, setUserReviews] = useState([]);
  const [error, setError] = useState(null);
  const [showPhotoOptions, setShowPhotoOptions] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userRes = await fetch(`/api/users/${id}`);
        if (!userRes.ok) throw new Error(`HTTP error! status: ${userRes.status}`);
        const user = await userRes.json();
        setUserData(user);

        const reviewRes = await fetch(`/api/reviews/user/${id}`);
        if (!reviewRes.ok) throw new Error(`HTTP error! status: ${reviewRes.status}`);
        const reviews = await reviewRes.json();
        setUserReviews(reviews);
      } catch (err) {
        console.error('Fetch error:', err);
        setError(err.message);
      }
    };
    fetchData();
  }, [id]);

  // Remove editingName, newName, handleNameChange, and related UI
  // In the user-name-container, only display the user's name as static text
  // Remove handlePhotoUpload definition entirely

  const handlePhotoDelete = async () => {
    setUpdating(true);
    try {
      const res = await fetch(`/api/users/${id}/photo`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ photo: 'default-user-pfp' })
      });
      if (!res.ok) throw new Error('Failed to delete photo');
      const updatedUser = await res.json();
      setUserData(updatedUser);
      setShowPhotoOptions(false);
      setShowDeleteConfirm(false);
    } catch (err) {
      alert(err.message);
    } finally {
      setUpdating(false);
    }
  };

  // Close photo options when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showPhotoOptions && !event.target.closest('.photo-container')) {
        setShowPhotoOptions(false);
      }
      if (showDeleteConfirm && !event.target.closest('.delete-confirmation')) {
        setShowDeleteConfirm(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showPhotoOptions, showDeleteConfirm]);

  if (error) return <div className="error-container">Error: {error}</div>;
  if (!userData) return <div className="loading-container">Loading...</div>;

  return (
    <div className="profile-layout">
      {/* Left Sidebar */}
      <div className="sidebar">
        <div className="sidebar-header">
          <div className="user-info">
            <div className="user-avatar">
              <div className="photo-container">
                <img
                  src={
                    userData.userPhoto?.startsWith('http')
                      ? userData.userPhoto
                      : userData.userPhoto
                      ? `http://localhost:5000/uploads/${userData.userPhoto}`
                      : 'http://localhost:5000/uploads/default-user-pfp'
                  }
                  alt="Profile"
                  onError={(e) => { e.target.src = 'http://localhost:5000/uploads/default-user-pfp'; }}
                />
              </div>
            </div>
            <div className="user-name-container">
              <div className="user-name-display">
                <span className="user-name">
                  {userData.name || 'Unknown User'}
                </span>
              </div>
            </div>
          </div>
        </div>

        <nav className="sidebar-nav">
          <Link to="/" className={`nav-item ${location.pathname === '/' ? 'active' : ''}`}>
            <Home className="nav-icon" />
            <span>Home</span>
          </Link>
          <Link to="/search" className={`nav-item ${location.pathname === '/search' ? 'active' : ''}`}>
            <Search className="nav-icon" />
            <span>Explore</span>
          </Link>
          <Link to="/notifications" className={`nav-item ${location.pathname === '/notifications' ? 'active' : ''}`}>
            <Bell className="nav-icon" />
            <span>Notifications</span>
          </Link>
          <Link to="/messages" className={`nav-item ${location.pathname === '/messages' ? 'active' : ''}`}>
            <MessageCircle className="nav-icon" />
            <span>Messages</span>
          </Link>
          <Link to={`/profile/${id}`} className={`nav-item ${location.pathname.includes('/profile') ? 'active' : ''}`}>
            <User className="nav-icon" />
            <span>Profile</span>
          </Link>
        </nav>
      </div>

      {/* Main Content */}
      <div className="main-content">
        <div className="content-container">
          <h1 className="page-title">Profile</h1>

          {/* Profile Section */}
          <div className="profile-section">
            <div className="profile-avatar-large">
              <div className="photo-container">
                <img
                  src={
                    userData.userPhoto?.startsWith('http')
                      ? userData.userPhoto
                      : userData.userPhoto
                      ? `http://localhost:5000/uploads/${userData.userPhoto}`
                      : 'http://localhost:5000/uploads/default-user-pfp'
                  }
                  alt="Profile"
                  onError={(e) => { e.target.src = 'http://localhost:5000/uploads/default-user-pfp'; }}
                />
              </div>
            </div>
            <div className="profile-info">
              <div className="profile-name-container">
                <div className="profile-name-display">
                  <h2 className="profile-name">{userData.name || 'Unknown User'}</h2>
                </div>
              </div>
              <p className="profile-joined">
                Joined in {userData.createdAt ? new Date(userData.createdAt).getFullYear() : '2021'}
              </p>
            </div>
          </div>

          {/* My Reviews Section */}
          <div className="reviews-section">
            <h3 className="section-title">My Reviews</h3>

            <div className="reviews-list">
              {userReviews.length > 0 ? (
                userReviews.map((review) => (
                  <Link to={review.dorm?._id ? `/dorms/${review.dorm._id}` : '#'} key={review._id} className="review-item-link">
                    <div className="review-item">
                      <div className="review-image">
                        <img
                          src={
                            review.dorm && review.dorm.photos && review.dorm.photos.length > 0
                              ? `/uploads/${review.dorm.photos[0].replace('/uploads/', '')}`
                              : 'https://via.placeholder.com/60x60?text=Dorm'
                          }
                          alt={review.dorm?.university || review.dorm?.name || 'Dorm'}
                        />
                      </div>
                      <div className="review-content">
                        <h4 className="review-dorm-name">
                          {review.dorm?.university || review.dorm?.name || 'Unknown Residence Hall'}
                        </h4>
                        <p className="review-date">
                          Reviewed on {new Date(review.createdAt).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric'
                          })}
                        </p>
                      </div>
                    </div>
                  </Link>
                ))
              ) : (
                <div className="no-reviews">
                  <p>No reviews available</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="modal-overlay">
          <div className="delete-confirmation">
            <h3>Delete Profile Photo</h3>
            <p>Are you sure you want to delete your profile photo? This will reset it to the default image.</p>
            <div className="confirmation-buttons">
              <button 
                className="confirm-delete-btn"
                onClick={handlePhotoDelete}
                disabled={updating}
              >
                {updating ? 'Deleting...' : 'Delete'}
              </button>
              <button 
                className="cancel-delete-btn"
                onClick={() => setShowDeleteConfirm(false)}
                disabled={updating}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfile;