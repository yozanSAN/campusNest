import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import About from './pages/About';
import Contact from './pages/Contact';
import Terms from './pages/Terms';
import Privacy from './pages/Privacy';
import UserProfile from './pages/UserProfile';
import Search from './pages/Search';
import DormDetails from './pages/DormDetails';
import AddReview from './pages/AddReview';
import NotFound from './pages/NotFound';
import Navbar from './components/Navbar';
import Messages from './pages/Messages';
import Notifications from './pages/Notifications';
import Settings from './pages/Settings';

import './App.css';

function AppContent({ user, handleLogout, setUser }) {
  const location = useLocation();
  // Hide Navbar on profile page
  const hideNavbar = location.pathname.startsWith('/profile/');
  return (
    <>
      {!hideNavbar && <Navbar user={user} onLogout={handleLogout} />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/register" element={<Register setUser={setUser} />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/profile/:id" element={<UserProfile />} />
        <Route path="/search" element={<Search />} />
        <Route path="/messages" element={<Messages />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/settings" element={<Settings />} />
        {/* <Route path="/dorm/:id" element={<DormDetails />} /> */}
        <Route path="/" element={<Home user={user} />} />
        <Route path="/dorms/:dormId" element={<DormDetails />} />
        <Route
          path="/add-review/:dormId"
          element={user ? <AddReview user={user} /> : <Navigate to="/login" />}
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("user");
      if (stored && stored !== "undefined") {
        setUser(JSON.parse(stored));
      }
    } catch (err) {
      console.error("Failed to parse user from localStorage:", err);
      setUser(null);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
    window.location.href = "/";
  };

  return (
    <Router>
      <AppContent user={user} handleLogout={handleLogout} setUser={setUser} />
    </Router>
  );
}

export default App;
