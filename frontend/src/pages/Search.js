import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import "../styles/pages/Search.css";

const Search = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [dorms, setDorms] = useState([]);
  const [filteredDorms, setFilteredDorms] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [filters, setFilters] = useState({
    university: '',
    minRating: 0,
    amenities: []
  });

  const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

  // ✅ Fetch all dorms
  const fetchAllDorms = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/dorms`);
      if (!response.ok) throw new Error('Failed to fetch dorms');
      const data = await response.json();
      setDorms(data);
      setFilteredDorms(data);
    } catch (err) {
      setError('Error fetching dorms: ' + err.message);
    } finally {
      setLoading(false);
    }
  }, [API_BASE_URL]);

  // ✅ Fetch on mount
  useEffect(() => {
    fetchAllDorms();
  }, [fetchAllDorms]);

  // ✅ Filter whenever filters or search term changes
  useEffect(() => {
    let filtered = dorms;

    if (searchTerm) {
      filtered = filtered.filter(dorm =>
        dorm.university.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filters.minRating > 0) {
      filtered = filtered.filter(dorm => dorm.ratingAverage >= filters.minRating);
    }

    if (filters.amenities.length > 0) {
      filtered = filtered.filter(dorm =>
        filters.amenities.every(amenity =>
          dorm.amenities?.some(dormAmenity =>
            dormAmenity.toLowerCase().includes(amenity.toLowerCase())
          )
        )
      );
    }

    setFilteredDorms(filtered);
  }, [searchTerm, filters.minRating, filters.amenities, dorms]);

  // ✅ Search action (calls endpoint)
  const handleSearch = (e) => {
    e.preventDefault();
    // Optional: you can also re-call fetch here or just rely on the filter effect
  };

  const handleAmenityFilter = (amenity) => {
    setFilters(prev => ({
      ...prev,
      amenities: prev.amenities.includes(amenity)
        ? prev.amenities.filter(a => a !== amenity)
        : [...prev.amenities, amenity]
    }));
  };

  const resetFilters = () => {
    setSearchTerm('');
    setFilters({
      university: '',
      minRating: 0,
      amenities: []
    });
    setFilteredDorms(dorms);
  };

  const getImageUrl = (photo) => {
    if (!photo) return '/default-dorm.jpg';
    if (photo.startsWith('http')) return photo;
    return `${process.env.REACT_APP_API_URL || 'http://localhost:5000'}${photo}`;
  };

  const commonAmenities = ['WiFi', 'Laundry', 'Gym', 'Kitchen', 'Parking', 'Study Room'];

  return (
    <div className="search-container">
      <div className="search-header">
        <h1>Find Your Perfect Dorm</h1>
        <p>Search through thousands of student accommodations</p>
      </div>

      {/* Search Form */}
      <form onSubmit={handleSearch} className="search-form">
        <div className="search-input-group">
          <input
            type="text"
            placeholder="Search by university name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          <button type="submit" className="search-button">
            Search
          </button>
        </div>
      </form>

      {/* Filters */}
      <div className="filters-section">
        <h3>Filters</h3>

        {/* Rating Filter */}
        <div className="filter-group">
          <label>Minimum Rating:</label>
          <select
            value={filters.minRating}
            onChange={(e) => setFilters(prev => ({ ...prev, minRating: Number(e.target.value) }))}
          >
            <option value={0}>Any Rating</option>
            <option value={1}>1+ Stars</option>
            <option value={2}>2+ Stars</option>
            <option value={3}>3+ Stars</option>
            <option value={4}>4+ Stars</option>
            <option value={5}>5 Stars</option>
          </select>
        </div>

        {/* Amenities Filter */}
        <div className="filter-group">
          <label>Amenities:</label>
          <div className="amenities-filter">
            {commonAmenities.map(amenity => (
              <label key={amenity} className="amenity-checkbox">
                <input
                  type="checkbox"
                  checked={filters.amenities.includes(amenity)}
                  onChange={() => handleAmenityFilter(amenity)}
                />
                {amenity}
              </label>
            ))}
          </div>
        </div>

        <button onClick={resetFilters} className="reset-filters-btn">
          Reset Filters
        </button>
      </div>

      {/* Results */}
      <div className="results-section">
        <div className="results-header">
          <h2>Search Results ({filteredDorms.length})</h2>
        </div>

        {loading && <div className="loading">Loading...</div>}
        {error && <div className="error">{error}</div>}

        {!loading && filteredDorms.length === 0 && (
          <div className="no-results">
            <p>No dorms found matching your criteria.</p>
            <button onClick={resetFilters} className="reset-filters-btn">
              Clear Filters
            </button>
          </div>
        )}

        <div className="dorms-grid">
          {filteredDorms.map(dorm => (
            <div key={dorm._id} className="dorm-card">
              <div className="dorm-image">
                <img
                  src={getImageUrl(dorm.photos?.[0])}
                  alt={dorm.university}
                  onError={(e) => {
                    e.target.src = '/default-dorm.jpg';
                  }}
                />
              </div>

              <div className="dorm-info">
                <h3>{dorm.university}</h3>
                <p className="dorm-description">{dorm.description}</p>

                <div className="dorm-rating">
                  <span className="stars">
                    {'★'.repeat(Math.floor(dorm.ratingAverage || 0))}
                    {'☆'.repeat(5 - Math.floor(dorm.ratingAverage || 0))}
                  </span>
                  <span className="rating-text">
                    {dorm.ratingAverage?.toFixed(1) || 'No rating'} ({dorm.ratingQuantity || 0} reviews)
                  </span>
                </div>

                <div className="dorm-amenities">
                  {dorm.amenities?.slice(0, 3).map((amenity, index) => (
                    <span key={index} className="amenity-tag">{amenity}</span>
                  ))}
                  {dorm.amenities?.length > 3 && (
                    <span className="amenity-tag">+{dorm.amenities.length - 3} more</span>
                  )}
                </div>

                <Link to={`/dorms/${dorm._id}`} className="view-details-btn">
                  View Details
                </Link>
                
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Search;
