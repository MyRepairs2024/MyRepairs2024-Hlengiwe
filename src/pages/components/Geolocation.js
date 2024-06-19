// src/components/Geolocation.js
import React, { useState, useEffect } from 'react';

const Geolocation = () => {
  const [location, setLocation] = useState({ latitude: '', longitude: '' });
  const [error, setError] = useState('');

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else {
      setError('Geolocation is not supported by this browser.');
    }
  }, []); // Empty dependency array ensures this runs once when the component mounts

  const showPosition = (position) => {
    setLocation({
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
    });
  };

  const showError = (error) => {
    switch (error.code) {
      case error.PERMISSION_DENIED:
        setError('User denied the request for Geolocation.');
        break;
      case error.POSITION_UNAVAILABLE:
        setError('Location information is unavailable.');
        break;
      case error.TIMEOUT:
        setError('The request to get user location timed out.');
        break;
      case error.UNKNOWN_ERROR:
        setError('An unknown error occurred.');
        break;
      default:
        setError('An unknown error occurred.');
        break;
    }
  };

  return (
    <div>
      {location.latitude && location.longitude ? (
        <div>
          <h3>Your Location:</h3>
          <p>Latitude: {location.latitude}</p>
          <p>Longitude: {location.longitude}</p>
        </div>
      ) : (
        <p>{error || 'Fetching location...'}</p>
      )}
    </div>
  );
};

export default Geolocation;
