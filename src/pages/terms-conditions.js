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


function App() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    password: '',
    confirmPassword: '',
    phoneNumber: '',
    agreeTerms: false,
  });

  const [showTerms, setShowTerms] = useState(false);

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;
    const newValue = type === 'checkbox' ? checked : value;

    setFormData((prevData) => ({
      ...prevData,
      [name]: newValue,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form data submitted:', formData);
    window.location.href = '/Profile-Page';
  };

  const toggleTerms = () => {
    setShowTerms(!showTerms);
  };

  return (
    <div style={styles.container}>
      <h1>Sign Up Here!</h1>
      {/* ... other components */}
      <div style={styles.formContainer}>
        <form onSubmit={handleSubmit}>
          {/* ... other form fields */}
          <div>
            <input
              type="checkbox"
              name="agreeTerms"
              checked={formData.agreeTerms}
              onChange={handleChange}
            />
            <label>
              I agree to the{' '}
              <span onClick={toggleTerms}>
                Terms and Conditions
              </span>
            </label>
          </div>
          <button type="submit">
            Sign up
          </button>
        </form>
      </div>
      {showTerms && (
        <div style={styles.formContainer}>
          <h2>Terms and Conditions</h2>
          <TermsAndConditionsModal handleClose={handleCloseModal} />

          <p>This is where you describe your terms and conditions.</p>
          <button onClick={toggleTerms}>Close</button>
        </div>
      )}
    </div>
  );
}


export default App;