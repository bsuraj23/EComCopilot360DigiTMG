import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Loading from '../components/Loading';
import { getUserProfile, updateUserProfile } from '../services/api';

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [message, setMessage] = useState('');
  const { user } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    street: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
    password: '',
    confirmPassword: '',
  });

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    fetchProfile();
  }, [user, navigate]);

  const fetchProfile = async () => {
    try {
      const data = await getUserProfile();
      setProfile(data);
      setFormData({
        name: data.name || '',
        email: data.email || '',
        phone: data.phone || '',
        street: data.address?.street || '',
        city: data.address?.city || '',
        state: data.address?.state || '',
        zipCode: data.address?.zipCode || '',
        country: data.address?.country || '',
        password: '',
        confirmPassword: '',
      });
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    if (formData.password && formData.password !== formData.confirmPassword) {
      setMessage('Passwords do not match');
      return;
    }

    try {
      const updateData = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        address: {
          street: formData.street,
          city: formData.city,
          state: formData.state,
          zipCode: formData.zipCode,
          country: formData.country,
        },
      };

      if (formData.password) {
        updateData.password = formData.password;
      }

      await updateUserProfile(updateData);
      setMessage('Profile updated successfully!');
      setEditing(false);
      fetchProfile();
    } catch (err) {
      setMessage('Failed to update profile');
    }
  };

  if (loading) return <Loading />;

  return (
    <div className="container">
      <h1 style={{ margin: '2rem 0' }}>My Profile</h1>

      {message && (
        <div className={`alert ${message.includes('success') ? 'alert-success' : 'alert-error'}`}>
          {message}
        </div>
      )}

      <div className="form-container">
        {!editing ? (
          <div>
            <div style={{ marginBottom: '1rem' }}>
              <strong>Name:</strong> {profile?.name}
            </div>
            <div style={{ marginBottom: '1rem' }}>
              <strong>Email:</strong> {profile?.email}
            </div>
            <div style={{ marginBottom: '1rem' }}>
              <strong>Role:</strong> {profile?.role}
            </div>
            <div style={{ marginBottom: '1rem' }}>
              <strong>Phone:</strong> {profile?.phone || 'Not provided'}
            </div>
            {profile?.address && (
              <div style={{ marginBottom: '1rem' }}>
                <strong>Address:</strong>
                <p>{profile.address.street}</p>
                <p>{profile.address.city}, {profile.address.state} {profile.address.zipCode}</p>
                <p>{profile.address.country}</p>
              </div>
            )}
            <button className="btn btn-primary" onClick={() => setEditing(true)}>
              Edit Profile
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Phone</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>

            <h3 style={{ marginTop: '2rem', marginBottom: '1rem' }}>Address</h3>

            <div className="form-group">
              <label>Street</label>
              <input
                type="text"
                name="street"
                value={formData.street}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>City</label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>State</label>
              <input
                type="text"
                name="state"
                value={formData.state}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>ZIP Code</label>
              <input
                type="text"
                name="zipCode"
                value={formData.zipCode}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Country</label>
              <input
                type="text"
                name="country"
                value={formData.country}
                onChange={handleChange}
              />
            </div>

            <h3 style={{ marginTop: '2rem', marginBottom: '1rem' }}>Change Password (Optional)</h3>

            <div className="form-group">
              <label>New Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                minLength="6"
              />
            </div>

            <div className="form-group">
              <label>Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
            </div>

            <div style={{ display: 'flex', gap: '1rem' }}>
              <button type="submit" className="btn btn-primary">
                Save Changes
              </button>
              <button 
                type="button" 
                className="btn btn-secondary"
                onClick={() => {
                  setEditing(false);
                  setMessage('');
                }}
              >
                Cancel
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default Profile;
