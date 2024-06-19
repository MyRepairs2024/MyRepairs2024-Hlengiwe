import React, { useState } from 'react';
import { FaUser } from 'react-icons/fa';
import { createClient } from '@supabase/supabase-js';
import TermsAndConditionsModal from './TermsAndConditionsModal'; 
import axios from 'axios';
import { GoogleLogin } from 'react-google-login';



const supabaseUrl = 'https://hpavlbqbspludmrvjroo.supabase.co'; 
const supabaseApiKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhwYXZsYnFic3BsdWRtcnZqcm9vIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTAyNzcwODIsImV4cCI6MjAwNTg1MzA4Mn0.HZXbPikgoL0V7sYj7xNPj0FUupXd8hx1JdMrixvq7Xw'; // Replace with your Supabase API key


 const supabase = createClient(supabaseUrl, supabaseApiKey);  

const styles = {
  container: {
    textAlign: 'center',
    marginTop: '50px',
    backgroundColor: '#ff0068',
    color: '#fff',
    fontSize: '14px',
    fontFamily: 'Arial',
    padding: '20px', // Added padding for the container
    borderRadius: '10px', // Added border radius for a rounded appearance
  },
  header: {
    alignItems: 'left',
    justifyContent: 'space-between', // Adjusted spacing
    marginBottom: '20px',
    width: '20px',
  },
  formContainer: {
    backgroundColor: '#40E0D0',
    padding: '10px',
    borderRadius: '10px',
    width: '300px', // Adjusted width to make it smaller
    margin: '0 auto', // Centered the form container horizontally
    marginTop: '20px'
  },
  logoContainer: {
    position: 'absolute',
    top: '10px',
    left: '10px',
    zIndex: 1,
  },
  
  logo: {
    width: '170px', // Adjusted logo width to be slightly bigger
    height: 'auto',
    borderRadius: '50%',
    backgroundColor: 'none',
  },
  
  icon: {
    fontSize: '40px', // Increased font size for the icon
    marginBottom: '-3px', // Adjusted margin for icon
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
    marginBottom: '10px', // Increased marginBottom for double lines
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



function App() {
  
  const [expandedTermsModal, setExpandedTermsModal] = useState(false);

  const [terms, setTerms] = useState(true);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    password: '',
    confirmPassword: '',
    phoneNumber: '',
  });

  const [showTermsModal, setShowTermsModal] = useState(false);

  const handleTermsClick = (event) => {
    setExpandedTermsModal(true); // Set state to open modal
    openTermsPopup();  
    event.preventDefault(); // Prevent default action
    // Your custom logic to handle the button click (e.g., display terms)
  }

  {expandedTermsModal && (
    <div className='overlay-container'>
      <div className="expanded-content">
        {terms ? (
          // Render the data for services done here
          <p>Services Done Data</p>
        ) : (
          
          // Render the "No Services Done" message
          <div className="no-data-message">
            No pen
          </div>
        )}
          <button className="closemetric" onClick={() => setExpandedTermsModal(false)}>
      Close
        </button>
      </div>
    </div>
  )}

  const termsAndConditionsData = {
    title: "Terms and Conditions",
    content:[
         "Welcome to our website. If you continue to browse and use this website, you are agreeing to comply with and be bound by the following terms and conditions of use, which together with our privacy policy govern our relationship with you in relation to this website.", 
          "By accessing or using this website in any way, you agree to and are bound by the terms and conditions set forth herein. If you do not agree to all of the terms and conditions contained in this agreement do not use this website.",
          "The content of the pages of this website is for your general information and use only. It is subject to change without NotificationsNone",
          "If you create an account on this website, you are responsible for maintaining the confidentiality of your account and password and for restricting access to your computer, and you agree to accept responsibility for all activities that occur under your account or password."
  ],
  };

  const TermsAndConditionsModal = ({ handleClose }) => {
    return (
      <div className="popup">
        <h2>{termsAndConditionsData.title}</h2>
        <p>{termsAndConditionsData.content[0]}</p>
        <p>{termsAndConditionsData.content[1]}</p>
        <p>{termsAndConditionsData.content[2]}</p>
        <p>{termsAndConditionsData.content[3]}</p>
        {/* ... loop through and render all content paragraphs */}
         </div>
    );
  };
  

  const handleCloseTermsModal = () => {
    setShowTermsModal(false);
  };
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const responseGoogleSuccess = (response) => {
    console.log('Google Login Response:', response);
    // Use the response to extract user information and update your state or perform any other actions
  };
  
  const responseGoogleFailure = (response) => {
    console.log('Google Login Failed:', response);
    // Handle failed Google Sign-In
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Handle user registration and get user data
    console.log('Form data submitted:', formData);
    window.location.href = '/user-dashboard';
    const responseGoogle = (response) => {
      console.log('Google Login Response:', response);
      // Use the response to extract user information and update your state or perform any other actions
    };
    const responseFacebook = (response) => {
      console.log('Facebook Login Response:', response);
      // Use the response to extract user information and update your state or perform any other actions
    };
    
  
    // Use a try-catch block to handle errors during Supabase interaction
    console.log('Submit button clicked');

    try {
      
      await axios.post('/api/formsubmit', formData); // Replace with your API endpoint URL
      console.log('Form data submitted successfully');
    } catch (error) {
      console.error('Error submitting form:', error);
    }   
  };
  
  const openTermsPopup = () => {
    setShowTermsModal(true);
  };
  
  const closeTermsPopup = () => {
    setShowTermsModal(false);
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}></div>
     
      <div style={styles.logoContainer}>
  <div className="logo">
    <img src="/logo-w.png" alt="My Repairs" style={styles.logo} />
  </div>
</div>
     
      <div style={styles.header}></div>
      <h1><FaUser style={styles.icon} /> Sign Up Here!</h1>
      <div style={styles.formContainer}>
        <form style={styles.form} onSubmit={handleSubmit}>
          <label>
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              value={formData.firstName}
              onChange={handleChange}
              required
              
            />
          </label>

          <label>
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={handleChange}
              required
              
            />
          </label>

          <label>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
              
            />
          </label>

          <label>
            <input
              type="text"
              name="address"
              placeholder="Address"
              value={formData.address}
              onChange={handleChange}
              required
              
            />
          </label>

          <label>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
              
            />
          </label>

          <label>
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              
            />
          </label>

          <label>
            <input
              type="tel"
              name="phoneNumber"
              placeholder="Contact Number"
              value={formData.phoneNumber}
              onChange={handleChange}
              required
            
            />
          </label>

          <>
              <label htmlFor="acceptedTerms" >
                 <input
                   type="checkbox"
                    name="acceptedTerms"
                    id="acceptedTerms"
                     checked={formData.acceptedTerms}
                      onChange={(event) => setFormData({ ...formData, acceptedTerms: event.target.checked })}
                       style={{
                        backgroundColor: 'transparent',
                           borderRadius: '2px',
                           cursor: 'pointer',
                           height:'15px' ,
                           marginRight:'5px',
                           marginTop:'5px',
                           marginLeft:'-40px'
                            }}
                           />
                           <span>I agree to the</span>
                              {/* Button or trigger to open the modal */}
                               <button
                               id="termsLink" 
                                onClick={handleTermsClick}
                                 style={{
                                  backgroundColor: 'transparent',
                                  color: 'blue',
                                  fontSize: '13px',
                                   borderRadius: '20px',
                                     cursor: 'pointer',
                                      height:'25px',
                                       width:'200px',
                                         marginRight:'40px',
                                         
                                        }}
                                        >
                                          Terms and Conditions
                                        </button>         
                                        </label>

                                        <button 
                                        type="submit"
                                        disabled={!formData.acceptedTerms} 
                                      
                                           >
                                            Sign Up
                                         </button> 
                                       
{expandedTermsModal && (
<div className='overlay-container'>
<div className="expanded-content">
{showTermsModal && <TermsAndConditionsModal handleClose={closeTermsPopup} />}
<button className="close-modal-button" onClick={() => setExpandedTermsModal(false)} aria-label="Close Terms and Conditions">
Close
</button>
</div>    
</div>
)}
</>


          <GoogleLogin
        clientId="YOUR_GOOGLE_CLIENT_ID"
        buttonText="Sign up with Google"
        onSuccess={responseGoogleSuccess}
        onFailure={responseGoogleFailure}
        cookiePolicy={'single_host_origin'}
      />
          <div style={styles.checkboxContainer}>
            
          
          </div>
        
          <div style={styles.links}>
            <p>Already have an account? <a href="/customer-login">Log in</a></p>
          </div>
          
        </form>
        
      </div>
      <style jsx>{`


body {
  font-family: Arial, sans-serif;
  background-color: #f7f7f7;
  margin: 0;
  padding: 0;
}

.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.formContainer {
  background-color: #40E0D0;
  padding: 20px; /* Increased padding for better spacing on mobile */
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  width: 90%; /* Adjusted width for better responsiveness */
  max-width: 350px; /* Added max-width to limit size on larger screens */
  margin: 0 auto; /* Center the form container horizontally */
}

label {
  display: block;
  color: #555555;
  margin-bottom: 8px;
  font-weight: bold;
}

input[type="text"],
input[type="email"],
input[type="password"],
input[type="tel"],
textarea {
  width: 80%; /* Full width on smaller screens */
  padding: 10px;
  background-color: #f7f7f7;
  border: 1px solid #cccccc;
  border-radius: 5px;
  font-size: 14px;
  color: #000;
  margin-bottom: 10px; /* Space between inputs */
}

input[type="text"]::placeholder,
input[type="email"]::placeholder,
input[type="password"]::placeholder,
input[type="tel"]::placeholder,
textarea::placeholder {
  color: #aaaaaa;
}

button {
  width: 100%;
  padding: 10px;
  color: #000;
  border: none;
  border-radius: 2px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s;
  margin-top: 10px; /* Space between button and inputs */
}

.checkbox-container {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.checkbox-container input {
  margin-right: 10px;
}

.terms-link {
  color: #007bff;
  text-decoration: none;
}

.terms-link:hover {
  text-decoration: underline;
  color: #0056b3;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .formContainer {
    width: 90%; /* Adjusted width for smaller screens */
    max-width: 100%; /* Full width on smaller screens */
  }

  .expanded-content {
    width: 100%; /* Full width for expanded content on smaller screens */
  }
}

      
      `}</style>
    </div>
  );
}

export default App;