import React, { useEffect, useState } from 'react';
import jwt from 'jsonwebtoken';

const Profile = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      try {
        const decodedToken = jwt.verify(token, 'your-secret-key');
        if (decodedToken && decodedToken.userId) {
          fetchUserProfile(decodedToken.userId);
        }
      } catch (error) {
        console.error('Error decoding token:', error);
      }
    }
  }, []);

  const fetchUserProfile = async (userId) => {
    try {
      const response = await fetch(`/api/login/user?id=${userId}`);
      if (response.ok) {
        const { user } = await response.json();
        setUser(user);
      } else {
        console.error('Error fetching user profile:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching user profile:', error);
    }
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Welcome, {user.name}</h1>
      <p>Email: {user.email}</p>
      {/* Display other user profile information */}
    </div>
  );
};

export default Profile;