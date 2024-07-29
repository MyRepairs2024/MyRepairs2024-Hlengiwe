import React, { useState } from 'react';

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


function TermsAndConditionsModal() {
  const [formData, setFormData] = useState({
    agreeTerms: false,
  });

  const [showTerms, setShowTerms] = useState(false);

  const toggleTerms = () => {
    setShowTerms(!showTerms);
    console.log('Terms and Conditions clicked');
  };

  const handleCloseModal = () => {
    setShowTerms(false);
    window.location.href = '/';
    
  };

  return (
    <div style={styles.container}>
       <div style={styles.logoContainer}>
        <div className="logo">
          <img src="/logo-w.png" alt="My Repairs" style={styles.logo} />
        </div>
            </div>
            <div  style={{ cursor: 'pointer', textDecoration: 'underline', height: '100vh' }}>
      {/* Your entire page content */}
      <div className='terms-container'>
        <h1>Tearms And Conditions</h1>
             <p>
              Welcome to our website. If you continue to browse and use this website, you are agreeing to comply with and be bound by the following terms and conditions of use, which together with our privacy policy govern our relationship with you in relation to this website.
            </p>
            <p>
              By accessing or using this website in any way, you agree to and are bound by the terms and conditions set forth herein. If you do not agree to all of the terms and conditions contained in this agreement, do not use this website.
            </p>
            <p>
              The content of the pages of this website is for your general information and use only. It is subject to change without notice.
            </p>
            <p>
              If you create an account on this website, you are responsible for maintaining the confidentiality of your account and password and for restricting access to your computer, and you agree to accept responsibility for all activities that occur under your account or password.
            </p>
          <button onClick={handleCloseModal}>Close</button>
        </div>
      </div>
      <style jsx>{`
      
      .terms-container {
        max-width: 450px;
        max-height:700px;
        margin: 70px auto;
        padding: 50px;
        background-color: #40E0D0;
        border: 1px solid #000;
        color:#000;
        font-size:20px;
      }
      
      .terms-container h1 {
        font-size: 30px;
        margin-bottom: 20px;
      }
      
      .terms-container p {
        margin-bottom: 10px;
      }
      
      .terms-container button {
        margin-top: 20px;
        padding: 10px 20px;
        background-color: #fff;
        color: #000;
        border: none;
        cursor: pointer;
      }
      
      `}</style>
      </div>
    
  );
}


export default TermsAndConditionsModal;