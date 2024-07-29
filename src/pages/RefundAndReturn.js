import React, { useState } from 'react';

const RefundAndReturn = () => {
  const handleCloseModal = () => {
    
    window.location.href = '/';
    
  };
  return (
    <div style={styles.container}>
      <div className="logo">
          <img src="/logo-w.png" alt="My Repairs" style={styles.logo} />
        </div>
        <div className="refund-return-container">
      <h1>Refund and Return Policy</h1>
      <p>
        We want you to be satisfied with the repairs and services you receive from MyRepairs. If you have any issues or concerns, please contact us immediately so we can assist you.
      </p>
      <h2>Refunds</h2>
      <p>
        Our policy for refunds varies depending on the type of service and repair performed:
      </p>
      <ul>
        <li>
          <strong>Service Completion:</strong> If the repair or service has been completed and meets our quality standards, refunds may not be applicable. However, we are committed to resolving any dissatisfaction and will work with you to find a suitable solution.
        </li>
        <li>
          <strong>Cancelled Services:</strong> If you cancel a service request before the repair or service has been initiated, you may be eligible for a full refund. Please contact us as soon as possible to discuss cancellations.
        </li>
        <li>
          <strong>Unsatisfactory Repairs:</strong> If you are not satisfied with the quality of a repair or service, please notify us within [number of days] days of completion. We will review the issue and may offer a refund or additional services to rectify the problem.
        </li>
      </ul>
      <h2>Returns</h2>
      <p>
        As repairs and services are typically not returnable, our focus is on ensuring that the work meets your expectations. If you have concerns about a repair or service, please contact us immediately so we can address them.
      </p>
      <button onClick={handleCloseModal}>Close</button>
    </div>
    <style jsx>{`
    .refund-return-container {
      max-width: 450px;
        max-height:1000px;
        margin: 50px auto;
        padding: 50px;
        background-color: #40E0D0;
        color:#000;
        font-size:14.5px;
    }
    
    .refund-return-container h1 {
      font-size: 30px;
      margin-bottom: 20px;
    }
    
    .refund-return-container h2 {
      font-size: 20px;
      margin-bottom: 10px;
    }
    
    .refund-return-container p {
      margin-bottom: 10px;
      line-height: 1.5;
    }
    
    .refund-return-container button {
      margin-top: 20px;
      padding: 10px 20px;
      background-color: #007bff;
      color: #fff;
      border: none;
      border-radius: 5px;
      cursor: pointer;
      transition: background-color 0.3s ease;
    }
    
    .refund-return-container button:hover {
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

export default RefundAndReturn;
