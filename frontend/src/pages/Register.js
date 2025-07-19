import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/pages/Register.css'

const Register = ({ setUser }) => { // Accept setUser prop
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    university: ''
  });

  const universities = [
    'Select University',
    'Université Mohammed V de Rabat',
    'Université Cadi Ayyad (Marrakech)',
    'Université Hassan II de Casablanca',
    'Université Abdelmalek Essaâdi (Tétouan)',
    'Université Ibn Tofail (Kénitra)',
    'Université Sidi Mohamed Ben Abdellah (Fès)',
    'Université Chouaib Doukkali (El Jadida)',
    'Université Ibn Zohr (Agadir)',
    'Université Moulay Ismail (Meknès)',
    'Université Sultan Moulay Slimane (Beni Mellal)',
  ];

  const [passwordError, setPasswordError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    if (e.target.name === "password" || e.target.name === "confirmPassword") {
      setPasswordError('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setPasswordError("Passwords do not match");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          university: formData.university
        })
      });

      const data = await response.json();

      if (response.ok) {
        // Save user info and token
        localStorage.setItem("user", JSON.stringify(data.user));
        localStorage.setItem("token", data.token);
        
        // Update global user state
        setUser(data.user);
        
        navigate('/');
      } else {
        alert(data.message || "Registration failed");
      }
    } catch (err) {
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div className="register-container">
      <form onSubmit={handleSubmit} className="register-form">
        <h2>Create Account</h2>
        
        <div className="form-group">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
          {passwordError && (
            <div style={{ color: "red", fontSize: "0.95em", marginTop: "4px" }}>
              {passwordError}
            </div>
          )}
        </div>

        <div className="form-group">
          <select
            name="university"
            value={formData.university}
            onChange={handleChange}
            required
          >
            {universities.map((uni, index) => (
              <option key={index} value={uni}>
                {uni}
              </option>
            ))}
          </select>
        </div>

        <button type="submit" className="submit-btn">
          Create Account
        </button>

        <p className="terms">
          By registering, you agree to our{' '}
          <Link to="/terms">Terms</Link> and{' '}
          <Link to="/privacy">Privacy Policy</Link>
        </p>

        <p className="login-link">
          Already have an account? <Link to="/login">Sign in</Link>
        </p>
      </form>
    </div>
  );
};

export default Register;