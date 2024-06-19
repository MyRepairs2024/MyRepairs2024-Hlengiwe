import React, { useState } from 'react';

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

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const sendPasswordResetLink = (email) => {
    return new Promise((resolve, reject) => {
        // Simulate sending a reset link setTimeout
        setTimeout(() => {
        const success = true;
        if (success) {
          resolve({ success: true });
        } else {
          reject(new Error('Failed to send reset link'));
        }
      }, 2000);// Simulate a delay of 2 seconds
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Simulate sending a password reset link
      const response = await sendPasswordResetLink(email); // Assuming you have a function for sending reset links
  
      // Check if the reset link is successfully sent
      if (response.success) {
        alert('If this email is registered, you will receive a password reset link.');
       
    } else {
        alert('Something went wrong. Please try again later.');
      
    }
    } catch (error) {
      console.error('Error sending reset link:', error);
      alert('Error sending reset link. Please try again later.');
    
    }
  };
  return (
    <div style={styles.container}>
      <h2>Forgot Password</h2>
      <div style={styles.formContainer}>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email">
              Email Address
              <input
                type="email"
                id="email"
                value={email}
                onChange={handleEmailChange}
                required
                style={styles.input}
              />
            </label>
          </div>
          <button type="submit" style={styles.button}>
            Send Reset Link
          </button>
        </form>
        
        <div style={styles.links}>
          <p>
            <a href="/customer-login" style={styles.backLink}>
              Back to Login
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;