import React, { useState } from 'react';

const styles = {
  container: {
    textAlign: 'center',
    marginTop: '50px',
    backgroundColor: '#ff0068',
    color: '#fff',
    fontSize: '14px',
    fontFamily: 'Arial, sans-serif',
    padding: '20px',
    borderRadius: '10px',
    width: '90%',
    maxWidth: '500px',
    margin: '50px auto',
  },
  formContainer: {
    backgroundColor: '#40E0D0',
    padding: '20px',
    borderRadius: '10px',
    width: '100%',
    maxWidth: '400px',
    margin: '0 auto',
  },
  logoContainer: {
    textAlign: 'left',
  },
  logo: {
    width: '100px',
    height: 'auto',
    borderRadius: '50%',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    alignItems: 'center',
    textAlign: 'center',
    fontFamily: 'Arial, sans-serif',
    border: 'none',
    color: '#fff',
  },
  input: {
    width: '90%',
    padding: '12px',
    borderRadius: '20px',
    border: '1px solid #ccc',
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
        setTimeout(() => {
        const success = true;
        if (success) {
          resolve({ success: true });
        } else {
          reject(new Error('Failed to send reset link'));
        }
      }, 2000);
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
         <div style={styles.logoContainer}>
        <div className="logo">
          <img src="/logo-w.png" alt="My Repairs" style={styles.logo} />
        </div>
      </div>
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