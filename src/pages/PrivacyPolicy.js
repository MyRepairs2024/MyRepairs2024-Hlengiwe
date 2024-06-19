import React, { useState } from 'react';


const PrivacyPolicy = () => {
  const handleCloseModal = () => {
    window.location.href = '/';
    
  };
  return (
    <div style={styles.container}>
      <div className="logo">
          <img src="/logo-w.png" alt="My Repairs" style={styles.logo} />
        </div>
        <div className="privacy-policy-container">
      <h1>Privacy Policy</h1>
      <p>
        Your privacy is important to us. It is MyRepairs' policy to respect your privacy regarding any information we may collect from you across our website.
      </p>
      <h2>Information We Collect</h2>
      <p>
        We may collect personal information such as your name, email address, phone number, and location data when you use our services or interact with our website.
      </p>
      <h2>How We Use Your Information</h2>
      <p>
        We use the information we collect for various purposes, including providing and improving our services, communicating with you, and customizing your experience.
      </p>
      <h2>Information Sharing</h2>
      <p>
        We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except as required by law or as necessary to fulfill the purposes outlined in this Privacy Policy.
      </p>
      <h2>Security</h2>
      <p>
        We take appropriate security measures to protect your personal information from unauthorized access, alteration, disclosure, or destruction.
      </p>
      <button onClick={handleCloseModal}>Close</button>
    </div>


<style jsx>{`
.privacy-policy-container {
  max-width: 450px;
  max-height:1000px;
  margin: 50px auto;
  padding: 50px;
  background-color: #40E0D0;
  color:#000;
  font-size:14.5px;
}


.privacy-policy-container h1 {
  font-size: 24px;
  margin-bottom: 20px;
}

.privacy-policy-container h2 {
  font-size: 20px;
  margin-bottom: 10px;
}

.privacy-policy-container p {
  margin-bottom: 10px;
  line-height: 1.5;
}

.privacy-policy-container button {
  margin-top: 20px;
  padding: 10px 20px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.privacy-policy-container button:hover {
  background-color: #0056b3;
}

`}</style>
    
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
export default PrivacyPolicy;
