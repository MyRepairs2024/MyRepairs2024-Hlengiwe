import React, { useState } from 'react';
import { GoogleLogin } from 'react-google-login';


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
  
  
};


function LoginPage() {
  const [formData, setFormData] = useState({
    email: '',
    verificationKey: '',
  });

  const [verificationSent, setVerificationSent] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const responseGoogleSuccess = (response) => {
    console.log('Google Login Response:', response);
    // Use the response to extract user information and update your state or perform any other actions
  };
  
  const responseGoogleFailure = (response) => {
    console.log('Google Login Failed:', response);
    // Handle failed Google Sign-In
  };

  const handleSendVerification =async () => {
      try {
        await axios.post('/send-verification', { email: formData.email });
        setVerificationSent(true);
      } catch (error) {
        console.error('Error sending verification code', error);
      }
    };

    const verifyCode = async () => {
      // Add verification logic here
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
  };

  const handleForgotPasswordClick = () => {
    history.push('/forgot-password'); // Use history.push for navigation
  };

  return (
    <div className='container'>
      <div style={styles.logoContainer}>
        <div className="logo">
          <img src="/logo-w.png" alt="My Repairs" style={styles.logo} />
        </div>
      </div>
      <h1 style={{ color: '#fff' }}>Welcome Back!</h1>
      <div className='formContainer'>
        <form style={styles.form} onSubmit={verificationSent ? handleLogin : handleSendVerification}>
            <label>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
              className='input'
            />
          </label>

        <div>
          {!verificationSent ? (
            <div>
                
                <input
                  type="text"
                  name="verificationKey"
                  placeholder="password"
                  value={formData.verificationKey}
                  onChange={handleChange}
                  required
                  className='password-input'
                />
              
              <button type="button" onClick={handleSendVerification} className='button'>
            Send Verification
          </button>
              </div>
          
          ):(
            <>
            <label>
              <input
                type="text"
                name="verificationKey"
                placeholder="Verification Code"
                value={formData.verificationKey}
                onChange={handleChange}
                required
                className='password-input'
              />
            </label>
            <button type="button" onClick={verifyCode} className='button'>
              Verify Code
            </button>
         </>
          )}
</div>

          <GoogleLogin
  clientId="YOUR_GOOGLE_CLIENT_ID"
  buttonText="Log in  with Google"
  onSuccess={responseGoogleSuccess}
  onFailure={responseGoogleFailure}
  cookiePolicy={'single_host_origin'}
/>

          <div style={styles.links}>
            <p>Don't have an account? <a href="/customer-register">Register</a></p>
            <p>
            <a href= "/ForgotPassword">Forgot Password?</a>
            </p>
          
          </div>
        </form>
      </div>
      <style jsx>{`
      .container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #ff0066;
}

.logoContainer {
  margin-bottom: 20px;
}

.logo {
  width: 150px;
}

.formContainer {
  background-color: #00cccc;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.form {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.input {
  width: 90%;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
  font-size: 16px;
}
.password-input {
  width: 90%;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
  font-size: 16px;
}


.button {
  width: 70%;
  padding: 8px;
  background-color: #ff0066;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 10px;
  margin-left:35px;
}

.links {
  text-align: center;
  margin-top: 10px;
}

.link {
  color: #fff;
  text-decoration: underline;
  cursor: pointer;
}

/* New CSS for labels and password input */

label {
  font-size: 14px;
  color: #333;
  margin-bottom: 5px;
  display: block;
  text-align: left;
  width: 100%;
}


`}</style>
    </div>
  );
}

export default LoginPage;