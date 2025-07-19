import React from 'react';
import '../styles/components/DormCard.css';

const DormCard = ({ dorm }) => {
  // Get the main image or fallback
  const getImageUrl = () => {
    if (dorm.photos && dorm.photos.length > 0 && dorm.photos[0]) {
      // If the photo is a full URL, use it directly
      if (dorm.photos[0].startsWith('http')) return dorm.photos[0];
      // Otherwise, construct the local URL
      return `http://localhost:5000/${dorm.photos[0].replace(/^\/+/, '')}`;
    }
    // Fallback image
    return 'https://placehold.co/300x200?text=Dorm+Image';
  };

  return (
    <div className="dorm-card">
      <div className="dorm-image-container">
        <img
          src={getImageUrl()}
          alt={dorm.university + ' Dorm'}
          className="dorm-image"
          onError={e => { e.target.src = 'https://placehold.co/300x200?text=Dorm+Image'; }}
        />
      </div>
      <div className="dorm-info">
        <h3 className="dorm-university">{dorm.university}</h3>
        <div className="dorm-rating">
          <span className="stars">
            {'★'.repeat(Math.floor(dorm.ratingAverage || 0))}
            {'☆'.repeat(5 - Math.floor(dorm.ratingAverage || 0))}
          </span>
          <span className="rating-text">
            {dorm.ratingAverage?.toFixed(1) || 'No rating'} ({dorm.ratingQuantity || 0} reviews)
          </span>
        </div>
        <p className="dorm-description">{dorm.description}</p>
        <div className="dorm-amenities">
          {dorm.amenities && dorm.amenities.map((a, i) => (
            <span key={i} className="dorm-amenity">{a}</span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DormCard;


