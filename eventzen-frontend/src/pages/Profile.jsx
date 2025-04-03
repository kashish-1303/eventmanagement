// src/pages/Profile.jsx
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { Button, Input } from '../components/common';
import BookingList from '../components/bookings/BookingList';
import { getUserBookings } from '../services/booking.service';
import { updateUserProfile } from '../services/auth.service';

const Profile = () => {
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('profile');
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [profileData, setProfileData] = useState({
    username: '',
    email: '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const [updateSuccess, setUpdateSuccess] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login', { 
        state: { 
          from: '/profile',
          message: 'Please log in to view your profile' 
        } 
      });
      return;
    }

    if (user) {
      setProfileData({
        ...profileData,
        username: user.username,
        email: user.email
      });
    }

    if (activeTab === 'bookings') {
      fetchUserBookings();
    }
  }, [isAuthenticated, user, activeTab, navigate]);

  const fetchUserBookings = async () => {
    try {
      setLoading(true);
      const data = await getUserBookings();
      setBookings(data);
    } catch (error) {
      console.error('Failed to fetch bookings:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData({
      ...profileData,
      [name]: value
    });
    
    // Clear error when user types
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null
      });
    }
    
    // Clear success message when user makes changes
    if (updateSuccess) {
      setUpdateSuccess(false);
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (profileData.newPassword && profileData.newPassword.length < 6) {
      newErrors.newPassword = 'Password must be at least 6 characters';
    }
    
    if (profileData.newPassword && profileData.newPassword !== profileData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    if (profileData.newPassword && !profileData.currentPassword) {
      newErrors.currentPassword = 'Current password is required to set a new password';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    try {
      setLoading(true);
      
      const updateData = {
        username: profileData.username,
        email: profileData.email
      };
      
      if (profileData.newPassword) {
        updateData.currentPassword = profileData.currentPassword;
        updateData.newPassword = profileData.newPassword;
      }
      
      await updateUserProfile(updateData);
      
      setUpdateSuccess(true);
      setProfileData({
        ...profileData,
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
    } catch (error) {
      setErrors({
        form: error.message || 'Failed to update profile'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto py-10 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <div className="flex border-b">
            <button
              className={`px-6 py-3 text-lg font-medium ${
                activeTab === 'profile'
                  ? 'border-b-2 border-blue-600 text-blue-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
              onClick={() => setActiveTab('profile')}
            >
              My Profile
            </button>
            <button
              className={`px-6 py-3 text-lg font-medium ${
                activeTab === 'bookings'
                  ? 'border-b-2 border-blue-600 text-blue-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
              onClick={() => setActiveTab('bookings')}
            >
              My Bookings
            </button>
          </div>

          <div className="p-6">
            {activeTab === 'profile' ? (
              <div>
                <h2 className="text-2xl font-bold mb-6">Account Settings</h2>
                
                {updateSuccess && (
                  <div className="mb-6 bg-green-100 text-green-700 p-4 rounded">
                    Your profile has been updated successfully!
                  </div>
                )}
                
                {errors.form && (
                  <div className="mb-6 bg-red-100 text-red-700 p-4 rounded">
                    {errors.form}
                  </div>
                )}
                
                <form onSubmit={handleSubmit}>
                  <div className="mb-6">
                    <Input
                      label="Username"
                      name="username"
                      value={profileData.username}
                      onChange={handleInputChange}
                      required
                      error={errors.username}
                    />
                  </div>
                  
                  <div className="mb-6">
                    <Input
                      label="Email Address"
                      name="email"
                      type="email"
                      value={profileData.email}
                      onChange={handleInputChange}
                      required
                      error={errors.email}
                    />
                  </div>
                  
                  <hr className="my-8" />
                  
                  <h3 className="text-xl font-semibold mb-4">Change Password</h3>
                  
                  <div className="mb-6">
                    <Input
                      label="Current Password"
                      name="currentPassword"
                      type="password"
                      value={profileData.currentPassword}
                      onChange={handleInputChange}
                      error={errors.currentPassword}
                    />
                  </div>
                  
                  <div className="mb-6">
                    <Input
                      label="New Password"
                      name="newPassword"
                      type="password"
                      value={profileData.newPassword}
                      onChange={handleInputChange}
                      error={errors.newPassword}
                    />
                  </div>
                  
                  <div className="mb-8">
                    <Input
                      label="Confirm New Password"
                      name="confirmPassword"
                      type="password"
                      value={profileData.confirmPassword}
                      onChange={handleInputChange}
                      error={errors.confirmPassword}
                    />
                  </div>
                  
                  <Button
                    type="submit"
                    variant="primary"
                    className="w-full"
                    disabled={loading}
                  >
                    {loading ? 'Saving...' : 'Save Changes'}
                  </Button>
                </form>
              </div>
            ) : (
              <div>
                <h2 className="text-2xl font-bold mb-6">My Bookings</h2>
                
                {loading ? (
                  <div className="text-center py-10">
                    <p className="text-lg">Loading your bookings...</p>
                  </div>
                ) : bookings.length === 0 ? (
                  <div className="text-center py-10">
                    <p className="text-lg mb-4">You haven't made any bookings yet.</p>
                    <Link to="/events">
                      <Button variant="primary">Browse Events</Button>
                    </Link>
                  </div>
                ) : (
                  <BookingList bookings={bookings} />
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;