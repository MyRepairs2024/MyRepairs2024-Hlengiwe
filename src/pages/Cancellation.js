import React, { useState } from 'react';

const Cancellation = () => {
 
    const handleCloseModal = () => {
      
      window.location.href = '/';
      
    };
  return (
    <div style={styles.container}>
      <div className="logo">
          <img src="/logo-w.png" alt="My Repairs" style={styles.logo} />
        </div>
        <div className="cancellation-container">
      <h1>Cancellation Policy</h1>
      <p>
        At MyRepairs, we understand that circumstances may require you to cancel a service request. Please review our cancellation policy below.
      </p>
      <h2>Cancellation Terms</h2>
      <ul>
        <li>
          <strong>Before Service Initiation:</strong> You can cancel a service request before the repair or service has been initiated without any penalty. Please contact us as soon as possible to cancel.
        </li>
        <li>
          <strong>During Service:</strong> If you cancel a service request after the repair or service has started, cancellation fees may apply based on the progress of the work and any materials or resources already used.
        </li>
        <li>
          <strong>No Show:</strong> If you do not show up for a scheduled appointment without prior notice, you may be charged a no-show fee.
        </li>
      </ul>
      <p>
        We strive to accommodate cancellations and reschedule requests whenever possible. Please contact us directly to discuss any cancellation issues or concerns.
      </p>
      <button onClick={handleCloseModal}>Close</button>
    </div>
    <style jsx>{`
    .cancellation-container {
      max-width: 450px;
      max-height:1000px;
      margin: 50px auto;
      padding: 50px;
      background-color: #40E0D0;
      color:#000;
      font-size:14.5px;
    }
    
    .cancellation-container h1 {
      font-size: 30px;
      margin-bottom: 20px;
    }
    
    .cancellation-container h2 {
      font-size: 20px;
      margin-bottom: 10px;
    }
    
    .cancellation-container p {
      margin-bottom: 10px;
      line-height: 1.5;
    }
    
    .cancellation-container ul {
      margin-bottom: 10px;
      padding-left: 20px;
    }
    
    .cancellation-container li {
      margin-bottom: 5px;
    }
    
    .cancellation-container button {
      margin-top: 20px;
      padding: 10px 20px;
      background-color: #007bff;
      color: #fff;
      border: none;
      border-radius: 5px;
      cursor: pointer;
      transition: background-color 0.3s ease;
    }
    
    .cancellation-container button:hover {
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
    backgroundColor: '#ff0066',
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

export default Cancellation;
