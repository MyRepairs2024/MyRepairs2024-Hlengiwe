import React, { useState } from 'react';

const Apps = () => {
  return (
    <div style={styles.container}>
      <div className="logo">
          <img src="/logo-w.png" alt="My Repairs" style={styles.logo} />
        </div>
      <div style={styles.formContainer}>
        <h2>Apps</h2>
        <p>This is the Apps page.</p>
      </div>
    </div>
  );
};

const styles = {
  container: {
    textAlign: 'center',
    marginTop: '50px',
    backgroundColor: '#ff0068',
    color: '#fff',
    fontSize: '14px',
    fontFamily: 'Arial',
    padding: '20px',
    borderRadius: '10px',
  },
  formContainer: {
    backgroundColor: '#40E0D0',
    padding: '10px',
    borderRadius: '10px',
    width: '300px',
    margin: '0 auto',
  },
  logoContainer: {
    position: 'absolute',
    top: '10px',
    left: '10px',
    zIndex: 1,
  },
  
  logo: {
    width: '170px', // Adjusted logo width
    height: 'auto', // Adjusted logo height to maintain aspect ratio
    borderRadius: '50%',
    backgroundColor: 'none',
  },
  form: {
    display: 'grid',
    gap: '10px',
    alignItems: 'center',
    textAlign: 'center',
    fontFamily: 'Arial',
    border: 'none',
    color: '#fff',
  },
  input: {
    width: '200px',
    padding: '12px',
    marginBottom: '10px',
    display: 'grid',
    alignItems: 'left',
    margin: '10px auto',
    borderRadius: '20px',
  },
  button: {
    padding: '10px 20px',
    backgroundColor: '#fff',
    color: '#000',
    border: 'none',
    cursor: 'pointer',
    textAlign: 'center',
    width: '150px',
    margin: '20px auto',
    borderRadius: '20px',
  },
  message: {
    marginTop: '20px',
    color: 'white',
  },
  links: {
    color: '#fff',
    marginTop: '10px',
  },
  backLink: {
    cursor: 'pointer',
    textDecoration: 'underline',
  },
};

export default Apps;
