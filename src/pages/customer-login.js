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
      borderRadius: '4px',
      cursor: 'pointer',
      fontFamily: 'Arial',
      textAlign: 'center',
      width: '100px',
      margin: '20px auto',
      borderRadius: '20px',
    },
    forgotPassword: {
      color: '#fff',
      textDecoration: 'underline',
      cursor: 'pointer',
    },
  
  
};


function LoginPage() {
  const [formData, setFormData] = useState({
    email: '',
    verificationKey: '',
  });

  const [verificationSent, setVerificationSent] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
 
 

  const handleSendVerification = async (e) => {
    e.preventDefault();

    // Add your logic for sending verification code via email
    // For now, let's simulate the code sending
    console.log('Verification code sent to:', formData.email);
    setVerificationSent(true);
  };

  const handleResendVerification = () => {
    // Add your logic for resending verification code via email
    // For now, let's simulate the code sending
    console.log('Resending verification code to:', formData.email);
    setVerificationSent(true); // Assume the code has been resent
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    // Add your logic for handling login and verification here
    // For now, let's log the form data
    console.log('Form data submitted:', formData);

    // Check if verification code is correct
    if (verificationSent && formData.verificationKey === '123456') {
      console.log('Verification successful! Redirecting to the Customer dashboard');
      window.location.href = '/user-dashboard';
    } else {
      console.log('Incorrect verification code.');
    }
    try {
      const { user, session, error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
      });

      if (error) {
        console.error('Registration error:', error.message);
        return;
      }

      console.log('User registered:', user);
      console.log('Session:', session);
      // Redirect to dashboard or update UI accordingly
    } catch (error) {
      console.error('Registration error:', error.message);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.logoContainer}>
        <div className="logo">
          <img src="/logo-w.png" alt="My Repairs" style={styles.logo} />
        </div>
      </div>
      <h1>Welcome Back!</h1>
      <div style={styles.formContainer}>
        <form style={styles.form} onSubmit={verificationSent ? handleLogin : handleSendVerification}>
          <label>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
              style={styles.input}
            />
          </label>

          {!verificationSent && (
            <>
              <button type="submit" style={styles.button}>
                Password
              </button>
              
            </>
          )}

          {verificationSent && (
            <>
              <label>
                <input
                  type="text"
                  name="verificationKey"
                  placeholder="password"
                  value={formData.verificationKey}
                  onChange={handleChange}
                  required
                  style={styles.input}
                />
              </label>
              <button type="submit" style={styles.button}>
                Login
              </button>
            </>
          )}
    

          <div style={styles.links}>
            <p>Don't have an account? <a href="/customer-register">Register</a></p>
            <p>
              <span
                style={styles.forgotPassword}
                onClick={() => window.location.href = '/ForgotPassword'}
              >
                Forgot Password?
              </span>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;