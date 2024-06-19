import React, { useState } from 'react';
import { FaUser } from 'react-icons/fa';
import { createClient } from '@supabase/supabase-js';
import TermsAndConditionsModal from './TermsAndConditionsModal'; 
import axios from 'axios';

import { NotificationsNone } from '@mui/icons-material';

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
    acceptedTerms:false,
  });

  const [showTermsModal, setShowTermsModal] = useState(false);
 
  function handleTermsClick(event) {
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
  
  
  
 
  const [passwordError, setPasswordError] = useState('');

//for close
const handleSubmitClose = async (e) => {
 // Handle user registration and get user data
 console.log('Form data submitted:', formData);
}

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setPasswordError('Passwords do not match');
      return;
    } else {
      setPasswordError('');
    }
    const { password, confirmPassword } = formData;

    const passwordValidation = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    
    if (!passwordValidation.test(password)) {
      setPasswordError('Password must be at least 8 characters long and include an uppercase letter, a lowercase letter, a number, and a special character.');
      return;
    }

    if (password !== confirmPassword) {
      setPasswordError('Passwords do not match');
      return;
    }

    setPasswordError('');
    
    
    
 
    // Handle user registration and get user data
    console.log('Form data submitted:', formData);
    window.location.href = '/user-dashboard';
  
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
              <input
              type="text"
              name="username"
              placeholder=" first name"
              value={formData.username}
              onChange={handleChange}
              required
              style={styles.input}
            />
          
         
          <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={handleChange}
              required
              style={styles.input}
            />
          

        <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
              style={styles.input}
            />
          

        <input
              type="text"
              name="address"
              placeholder="Address"
              value={formData.address}
              onChange={handleChange}
              required
              style={styles.input}
            />
          

        <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
              style={styles.input}
            />
          

        <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              style={styles.input}
            />
          

         <input
              type="tel"
              name="phoneNumber"
              placeholder="Contact Number"
              value={formData.phoneNumber}
              onChange={handleChange}
              required
              style={styles.input}
            />
            {passwordError && <p style={{ color: 'black' }}>{passwordError}</p>}


            <>
          <label For="acceptedTerms" >
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
               height:'30px' ,
            width:'210px',
            marginRight:'30px',
            marginTop: '20px',
            marginLeft: '30px',
            
         }}
        >
         Terms and Conditions
        </button>
     </label>


       <button 
        type="submit"
         disabled={!formData.acceptedTerms} 
         style={{ 
          position:'relative',
          bottom:'10px',
          marginLeft:'90px',
          marginTop:'15px',
          padding: '10px 20px',
           fontSize: '16px',
            borderRadius: '50px',
            height:'40px' ,
            width:'120px'
            }}
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

         
          <div style={styles.links}>
            <p>Already have an account? 
              <a href="/customer-login">
                Log in
                </a>
                </p>
          </div>
        </form>   
      </div>

      <style jsx>{`
/*.alert-box {
  background-color: orange;
  width: 800px;
  border-radius: 5px;
 /* box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);*/
  text-align: center;
  margin-bottom: 15px;
 
}*/

/*.close-alert {
  background-color: #e74c3c;
  color: black;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 10px;
}*/

/*.close-alert:hover {
  background-color: #c0392b;
}*/


.closemetric{
  background: black;
  color: green;
  font-weight: bold;

}
.closemetric:hover{
  background: red;
  color: #fff;
  transition: background 0.5s;
}
.alert-container {

  width: 100%;
  height: 100%;
  font-family: poppins;
  font-size: 100px;
   display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999; /* Ensure it's on top of other elements */
}

.overlay-container {
  position: absolute;
  place-items: center;
  width: 1100px;
  height: 6000px;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2222; /* Set a high z-index to ensure it's on top */
  background-color: rgba(255, 255, 255, 0.3); /* Transparent white background */
  backdrop-filter: blur(10px);
  /* Semi-transparent overlay background */
  transition: backdropFilter 3s;
}



.Terms{
  padding-left: 8px;
    height: 100px;
    width: 200px;
   
    color: azure;
    border-radius: 10px;
    background-color:#ff0068;
    cursor: pointer;
}

.Terms{
  width: 80px;
  height: 70px;
  font-size: 12px;
  font-family: poppins;
}

.Terms{
  width: 100%;
    margin-bottom: 10px;
    width: 800px;
    height: 70px;
    font-size: 12px;
    font-family: poppins;
}


.expanded-content.show {
  opacity: 1;
  /* Keep the final position as you like */
  transform: translateY(0);
}
/* CSS styles for the expanded-content (the actual content inside the container) */
.expanded-content {
  background-color: #ff0068; /* Background color for the content */
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.3);
  /* Add other styling as needed */
  animation: fallingBounce 0.5s cubic-bezier(0.68, -0.55, 0.27, 1.55) forwards;

}

.expanded-content{
  width:350px;
  height:550px;

}

/* CSS styles for the "No Pending Requests" message */
.no-pending-requests {
  text-align: center;
  font-size: 18px;
  color: #555;
  /* Add other styling as needed */
}

.container-wrapper {
  /* Add your desired styles here */
  
  margin: 20px auto;  /* Example: Add margin for spacing */
  padding: 10px;     /* Example: Add padding for content */
  border: 1px solid #ddd;  /* Example: Add a border */
  width: 200px;      /* Example: Set a specific width */
  background-color:#f0f0;
}
      .closeButton {
        /* Button dimensions */
        width: 80px; /* Adjust width as desired */
        height: 30px; /* Adjust height as desired */
      
        /* Button background color */
        background-color: #cccccc; /* Change to your preferred color */
      
        /* Text color */
        color: #333333; /* Change to your preferred color */
      
        /* Border */
        border: 1px solid #cccccc; /* Adjust border style and color */
      
        /* Rounded corners */
        border-radius: 5px; /* Adjust corner radius as desired */
      
        /* Padding */
        padding: 5px 10px; /* Adjust padding as desired */
      
        /* Font */
        font-family: Arial, sans-serif; /* Change to your preferred font */
        font-size: 14px; /* Adjust font size as desired */
      
        /* Hover effect (optional) */
        cursor: pointer; /* Indicate clickable behavior */
        transition: background-color 0.2s ease-in-out; /* Smooth transition */
      
        &:hover {
          background-color: #dddddd; /* Change hover background color */
        }
      }
      
      `}</style>

    </div>
  );
}

export default App;