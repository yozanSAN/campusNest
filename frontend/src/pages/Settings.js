import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import '../styles/pages/Settings.css';

const Settings = () => {
  const { currentUser } = useAuth();
  // Remove userData state
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [photo, setPhoto] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [photoUploading, setPhotoUploading] = useState(false);
  const [error, setError] = useState('');
  
  useEffect(() => {
    if (!currentUser) return;
    const fetchUser = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/users/${currentUser._id}`);
        if (!res.ok) throw new Error('Failed to fetch user info');
        const data = await res.json();
        setName(data.name || '');
        setEmail(data.email || '');
        setPhoto(data.userPhoto || '');
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [currentUser]);

  const handleSave = async () => {
    setSaving(true);
    setError('');
    try {
      const res = await fetch(`/api/users/${currentUser._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email })
      });
      if (!res.ok) throw new Error('Failed to update user info');
      // No need to set userData
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const handlePhotoChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setPhotoUploading(true);
    setError('');
    try {
      const formData = new FormData();
      formData.append('photo', file);
      const res = await fetch(`/api/users/${currentUser._id}/photo`, {
        method: 'PUT',
        body: formData
      });
      if (!res.ok) throw new Error('Failed to upload photo');
      const updated = await res.json();
      setPhoto(updated.userPhoto);
    } catch (err) {
      setError(err.message);
    } finally {
      setPhotoUploading(false);
    }
  };

  if (loading) return <div className="settings-page"><p>Loading...</p></div>;
  if (error) return <div className="settings-page"><p style={{ color: 'red' }}>{error}</p></div>;

  return (
    <div className="settings-page">
      <h2>Settings</h2>
      <section>
        <h3>Account</h3>
        <div style={{ display: 'flex', alignItems: 'center', gap: 24, marginBottom: 16 }}>
          <img
            src={photo ? `/uploads/${photo}` : '/uploads/default-user-pfp'}
            alt="Profile"
            style={{ width: 64, height: 64, borderRadius: '50%', objectFit: 'cover', border: '2px solid #e5e7eb' }}
          />
          <label style={{ cursor: 'pointer', color: '#2563eb' }}>
            <input type="file" accept="image/*" style={{ display: 'none' }} onChange={handlePhotoChange} disabled={photoUploading} />
            {photoUploading ? 'Uploading...' : 'Change Photo'}
          </label>
        </div>
        <label>Name:</label>
        <input
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
          style={{ display: 'block', marginBottom: 12, width: '100%', padding: 8 }}
        />
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          style={{ display: 'block', marginBottom: 12, width: '100%', padding: 8 }}
        />
        <button onClick={handleSave} disabled={saving} style={{ marginTop: 8 }}>
          {saving ? 'Saving...' : 'Save Changes'}
        </button>
      </section>
      {/* Other sections will be added in next steps */}
      <p className="coming-soon">More settings coming soon!</p>
    </div>
  );
};

export default Settings; 