import React, { useState, useEffect } from 'react';
import Dashheader from './components/dashheader';


const Settings = () => {
  const [activeTab, setActiveTab] = useState('Profile Management');
  
  //password
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [passwordChangeMessage, setPasswordChangeMessage] = useState('');
  const [validationMessage, setValidationMessage] = useState('');
  const [isTwoFactorAuthEnabled, setTwoFactorAuthEnabled] = useState(false); // State for 2FA status
 
 //notificationd
  const [emailNotifications, setEmailNotifications] = useState(false);
  const [inAppAlerts, setInAppAlerts] = useState(false);

  const [loginActivity, setLoginActivity] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

//profile
const [username, setUsername] = useState('');
const [userId, setUserId] = useState('');
const [selectedImage, setSelectedImage] = useState(null);
const [message, setMessage] = useState('');
const [selectedFile, setSelectedFile] = useState(null);
const [theme, setTheme] = useState('light'); 

useEffect(() => {
 
  const savedEmailNotifications = JSON.parse(localStorage.getItem('emailNotifications'));
    const savedInAppAlerts = JSON.parse(localStorage.getItem('inAppAlerts'));
    if (savedEmailNotifications !== null) {
      setEmailNotifications(savedEmailNotifications);
    }
    if (savedInAppAlerts !== null) {
      setInAppAlerts(savedInAppAlerts);
    }
  }, []);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, []);


  // Function to handle theme change
  const handleThemeChange = (selectedTheme) => {
    setTheme(selectedTheme);
    localStorage.setItem('theme', selectedTheme); // Save theme preference to local storage
  };
   const applyThemeClass = (theme) => {
    document.body.classList.remove('light', 'dark');
    document.body.classList.add(theme); 
    };
  
const handleCloseModal = () => {
  window.location.href = '/customer-login';
  
};
  // Functions for handling different settings actions
    const handleLogout = () => console.log('Logout functionality goes here');

   const openSupportForm = () => {
    // Logic to open a support form
    // For example, you might use a modal or navigate to a support page
    console.log('Opening support form...');
  };

  const sendEmailToSupport = () => {
    // Logic to send an email to customer support
    // You can use libraries like nodemailer for sending emails
    console.log('Sending email to customer support...');
  };

  const initiateChat = () => {
    // Logic to initiate a chat with customer support
    // You might use a chat API or platform for this
    console.log('Initiating chat with customer support...');
  };
  

  const handleContactSupport = () => {
    // Your logic to handle contacting customer support goes here
    // For example, you can open a modal, navigate to a support page, or trigger an API request to contact support.
    console.log('Contacting customer support...');
  };


  useEffect(() => {
    // Simulate initial data fetch
    handleViewHistory();
  }, []);

  const handleViewHistory = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch('https://main--myrepairsv1.netlify.app');
      if (!response.ok) {
        throw new Error('Failed to fetch login activity');
      }
      const data = await response.json();
      setLoginActivity(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleTwoFactorAuth = () => {
    setTwoFactorAuthEnabled((prevStatus) => !prevStatus);
  };

  
  
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleSubmitProfilePicture = async (event) => {
    event.preventDefault();
    if (!selectedFile) {
      setMessage('Please select a file.');
      return;
    }
    // Handle file upload logic here
    try {
      // Example file upload logic
      // const { data, error } = await supabase.storage.from('profile-pictures').upload(`public/${selectedFile.name}`, selectedFile); 
      // if (error) throw error;
      setMessage('Profile picture updated successfully.');
    } catch (error) {
      setMessage('Error uploading file: ' + error.message);
    }
  };

  const handleChangePassword = () => {
    if (newPassword !== confirmNewPassword) {
      setValidationMessage('New password and confirm password do not match.');
      return;
    }
    if (!validatePassword(newPassword)) {
      setValidationMessage('Password must be at least 8 characters long and include letters, numbers, and special characters.');
      return;
    }
    // Logic to change password goes here
    setValidationMessage('Password changed successfully.');
  };

  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  };

   // Load preferences from local storage when the component mounts
   useEffect(() => {
    const savedEmailNotifications = JSON.parse(localStorage.getItem('emailNotifications'));
    const savedInAppAlerts = JSON.parse(localStorage.getItem('inAppAlerts'));
    if (savedEmailNotifications !== null) {
      setEmailNotifications(savedEmailNotifications);
    }
    if (savedInAppAlerts !== null) {
      setInAppAlerts(savedInAppAlerts);
    }
  }, []);



  const handleNotificationPreferences = async (event) => {
    event.preventDefault();
  
    try {
      const preferences = {
        emailNotifications,
        inAppAlerts, 
      };
     const response = await fetch('/api/update-preferences', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(preferences),
      });
        if (!response.ok) {
        throw new Error(`Error saving notification preferences: ${response.statusText}`);
      }
        const data = await response.json(); // Parse the JSON response
      console.log('Notification preferences saved successfully:', data);
    } catch (error) {
      console.error('Error saving notification preferences:', error);
    }
  };


  const handleChangeProfilePicture = (e) => {
    const file = e.target.files[0];
    setSelectedImage(file);
  };
  
  const handleEditProfile = () => {
    // Handle profile editing logic (e.g., update user information)
    console.log('Editing profile...');
  };

  const paymentInfo = {
    creditCard: {
      cardNumber: '1234 5678 9012 3456',
      expiryDate: '12/25',
      CVV: '123',
    },
    paypal: {
      email: 'example@example.com',
      // Other PayPal details
    },
    applePay: true,
    googlePay: true,
  };
  
 
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('creditCard'); // Initial state
    const [formData, setFormData] = useState({ ...paymentInfo[selectedPaymentMethod] }); // Initial form data
  
    const handleChange = (event) => {
      setFormData({ ...formData, [event.target.name]: event.target.value });
    };
  
    const handlePaymentMethodChange = (event) => {
      setSelectedPaymentMethod(event.target.value);
      setFormData({ ...paymentInfo[event.target.value] }); // Update form data based on selected method
    };
  
    const handleSubmit = (event) => {
      event.preventDefault();
      onSubmit(formData); 
    };

    const onSubmit = (formData) => {
      // Implement your logic to handle the submitted form data here
      console.log("Form submitted:", formData);
  };

    const handlePrivacySettings = async () => {
      try {
        const response = await fetch('/api/get-privacy-settings');
    
        if (!response.ok) {
          throw new Error('Error fetching privacy settings');
        }
        const fetchedPrivacySettings = await response.json();
        setPrivacySettings(fetchedPrivacySettings);

      } catch (error) {
        console.error('Error fetching privacy settings:', error);
      }
    };

    const [privacySettings, setPrivacySettings] = useState({
      setting1: true,
      setting2: false,
     
    });
    
    const handleToggleSetting = (setting) => {
      setPrivacySettings((prevSettings) => ({
        ...prevSettings,
        [setting]: !prevSettings[setting],
      }));
    };

    useEffect(() => {
      // Fetch initial privacy settings when the component mounts
      handlePrivacySettings();
    }, []);
  
    
  return (
    <div className="dashboard-container">
      <aside className="sidebar">
        <div className="profile">
          <img src="/profile.png" alt="Profile" className="profile-image" />
          <h3>Shane Tambala</h3>
          <p>User ID: 12345678</p>
        </div>
       
        <nav className="nav">
          <ul>
            <li className={activeTab === 'Profile Management' ? 'active' : ''} onClick={() => handleTabChange('Profile Management')}>Profile Management</li>
            <li className={activeTab === 'Notification Settings' ? 'active' : ''} onClick={() => handleTabChange('Notification Settings')}>Notification Settings</li>
            <li className={activeTab === 'Password And Security' ? 'active' : ''} onClick={() => handleTabChange('Password And Security')}>Password and Security</li>
             <li className={activeTab === 'Privacy Settings' ? 'active' : ''} onClick={() => handleTabChange('Privacy Settings')}>Privacy Settings</li>
             <li className={activeTab === 'Theme Settings' ? 'active' : ''} onClick={() => handleTabChange('Theme Settings')}>Theme Settings</li>
          </ul>
        </nav>
        <button className="logout-button" onClick={handleCloseModal}>Log Out</button>
      </aside>
      <main className="main-content">
        <Dashheader />
       

        {activeTab === 'Profile Management' && (
          <div className="ScrollableContainer">
            <div className="Dash-Container">
              <section>
                <h2> Edit Profile Information</h2>
                 {/* Edit Username */}
        <div className="profile-info-row">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={username} 
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        {/* Edit User ID (might be read-only depending on functionality) */}
        <div className="profile-info-row">
          <label htmlFor="user-id">User ID:</label>
          <input
            type="text"
            id="user-id"
            name="userId"
            value={userId} 
            disabled={true}
          />
        </div>            
           <button onClick={handleEditProfile}>Save Changes </button>
           
           </section>

                <section>
                  <h2>Edit Profile Picture</h2>
                  <div className="profile-picture-preview">
                   {selectedImage && (
                   <img src={URL.createObjectURL(selectedImage)} alt="Selected Profile Picture Preview" />
                    )}
                 </div>

                <form onSubmit={handleSubmitProfilePicture}>
                    <input type="file" onChange={handleChangeProfilePicture} />
                    <button onClick={handleEditProfile}>Change Profile Picture</button>
                  
                  </form>
                  </section>
                  {message && <p>{message}</p>} 
               
               
                <section>


                  <h2>Update Payment Information</h2>
                  <form onSubmit={handleSubmit}>
                     {/* Payment information input fields (replace with actual fields) */}
    <div className="profile-info-row">
      <label htmlFor="card-number">Card Number:</label>
      <label htmlFor="payment-method">Payment Method:</label>
        <select id="payment-method" value={selectedPaymentMethod} onChange={handlePaymentMethodChange}>
          <option value="creditCard">Credit Card</option>
          <option value="paypal">PayPal</option>
          {paymentInfo.applePay && <option value="applePay">Apple Pay</option>}
          {paymentInfo.googlePay && <option value="googlePay">Google Pay</option>}
        </select>
       </div>
   
   {/* Conditional rendering of payment information fields based on selected method */}
   {selectedPaymentMethod === 'creditCard' && (
        <>
          <div className="profile-info-row">
            <label htmlFor="card-number">Card Number:</label>
            <input
              type="text"
              id="card-number"
              name="cardNumber"
              value={formData.cardNumber}
              onChange={handleChange}
              placeholder="**** **** **** ****"
              maxLength="16"
              pattern="[0-9]+"
              required
            />
          </div>
          <div className="profile-info-row">
            <label htmlFor="expiry-date">Expiry Date:</label>
            <input
              type="text"
              id="expiry-date"
              name="expiryDate"
              value={formData.expiryDate}
              onChange={handleChange}
              placeholder="MM/YY"
              maxLength="5"
              pattern="[0-9]{2}/[0-9]{2}"
              required
            />
            </div>
            <div className="profile-info-row">
            <label htmlFor="cvv">CVV:</label>
            <input
              type="text"
              id="cvv"
              name="CVV"
              value={formData.CVV}
              onChange={handleChange}
              maxLength="3"
              pattern="[0-9]+"
              required
            />
          </div>
        </>
      )}
      {selectedPaymentMethod === 'paypal' && (
        <div className="profile-info-row">
          <label htmlFor="paypal-email">PayPal Email:</label>
          <input
            type="email"
            id="paypal-email"
            name="paypalEmail" 
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
      )}
       {/* Disable form fields for Apple Pay and Google Pay (if not editable) */}
       {selectedPaymentMethod === 'applePay' && (
        <div className="profile-info-row">
          <label>Apple Pay:</label>
          <p>Enabled (not editable)</p>
        </div>
      )}
      {selectedPaymentMethod === 'googlePay' && (
        <div className="profile-info-row">
          <label>Google Pay:</label>
          <p>Enabled (not editable)</p>
        </div>
      )}
       <button type="submit">Update Payment Information</button>
     </form>
         </section>
              </div>
          </div>
        )}



{activeTab === 'Notification Settings' && (
  <div className="ScrollableContainer">
    <div className="Dash-Container">
      <section>
        <h2>Notification Settings</h2>
        <form onSubmit={handleNotificationPreferences}>
          <div className="notification-setting">
            <label htmlFor="email-notifications">Email Notifications</label>
            <input
              type="checkbox"
              id="email-notifications"
              name="emailNotifications"
              checked={emailNotifications} 
              onChange={(e) => setEmailNotifications(e.target.checked)}
            />
          </div>
          <div className="notification-setting">
            <label htmlFor="in-app-alerts">In-App Alerts</label>
            <input
              type="checkbox"
              id="in-app-alerts"
              name="inAppAlerts"
              checked={inAppAlerts} // Assuming a state variable for in-app preference
              onChange={(e) => setInAppAlerts(e.target.checked)}
            />
          </div>
          {/* Add more notification settings here following the same pattern */}
          <button type="submit">Save Preferences</button>
        </form>
      </section>
    </div>
  </div>
)}



{activeTab === 'Password And Security' && (
          <div className="ScrollableContainer">
            <div className="Dash-Container">
                <section>
                <h2>Password and Security</h2>
                <form onSubmit={(e) => { e.preventDefault(); handleChangePassword(); }}>
                  <div>
                     <label>Old Password:</label>
                    <input
                      type="password"
                      id="old-password"
                      value={oldPassword}
                      onChange={(e) => setOldPassword(e.target.value)} required />
                    
                  </div>
                  <div>
                    <label>New Password:</label>
                    <input
                      type="password"
                      id="new-password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)} required
                    />
                  </div>
                  <div>
                    <label>Confirm New Password:</label>
                    <input
                      type="password"
                      id="confirm-new-password"
                      value={confirmNewPassword}
                      onChange={(e) => setConfirmNewPassword(e.target.value)} required
                    />
                  </div>
                  
                <button onClick={handleChangePassword}>Change Password</button>
                </form>
                {validationMessage && <p>{validationMessage}</p>}


              </section>
              <section>
            <h2>Two-Factor Authentication</h2>
            {isTwoFactorAuthEnabled ? (
              <div>
                <p>Two-Factor Authentication is enabled.</p>
                <button onClick={handleTwoFactorAuth}>Disable Two-Factor Authentication</button>
              </div>
            ) : (
              
              <button onClick={handleTwoFactorAuth}>Enable Two-Factor Authentication</button>
            )}
          </section>

              <section>
            <h2>Login Activity</h2>
            <button onClick={handleViewHistory} disabled={isLoading}>
              {isLoading ? 'Loading...' : 'View Login Activity'}
            </button>
            {error && <p>Error: {error}</p>}
            {loginActivity.length > 0 && (
              <ul>
                {loginActivity.map((activity, index) => (
                  <li key={index}>{activity.username} logged in at {activity.timestamp}</li>
                ))}
              </ul>
            )}
          </section>
              </div>
          </div>
        )}





{activeTab === 'Privacy Settings' && (
  <div className="ScrollableContainer">
    <div className="Dash-Container">
      <section>
        <h2>Privacy Settings</h2>
        <div className="privacy-setting">
        <label htmlFor="receive-emails">Receive Emails:</label>
        <input
          type="checkbox"
          id="receive-emails"
          checked={privacySettings.receiveEmails}
          onChange={() => handleToggleSetting('receiveEmails')}
        />
        </div>

        <div className="privacy-setting">
        <label htmlFor="receive-notifications">Receive Notifications:</label>
        <input
          type="checkbox"
          id="receive-notifications"
          checked={privacySettings.receiveNotifications}
          onChange={() => handleToggleSetting('receiveNotifications')}
        />
      </div>

      <div className="privacy-setting">
        <label htmlFor="allow-location-access">Allow Location Access:</label>
        <input
          type="checkbox"
          id="allow-location-access"
          checked={privacySettings.allowLocationAccess}
          onChange={() => handleToggleSetting('allowLocationAccess')}
        />
      </div>

      <div className="privacy-setting">
        <label htmlFor="share-data">Share Data with Third Parties:</label>
        <input
          type="checkbox"
          id="share-data"
          checked={privacySettings.shareDataWithThirdParties}
          onChange={() => handleToggleSetting('shareDataWithThirdParties')}
        />
      </div>

        {/* Similar elements for other settings */}
      </section>
    </div>
  </div>
)}

{activeTab === 'Theme Settings' && (
          <div className="ScrollableContainer">
            <div className="Dash-Container">
            <div className={`app-container ${theme}`}>
              <section>
                <h2>Theme Settings</h2>
                <div className="profile-info-row">
                  <label htmlFor="theme-light">Light Theme</label>
                  <input
                    type="radio"
                    id="theme-light"
                    name="theme"
                    value="light"
                    checked={theme === 'light'}
                    onChange={(e) => handleThemeChange(e.target.value)}
                  />
                    </div>
                <div className="profile-info-row">
                  <label htmlFor="theme-dark">Dark Theme</label>
                  <input
                    type="radio"
                    id="theme-dark"
                    name="theme"
                    value="dark"
                    checked={theme === 'dark'}
                    onChange={(e) => handleThemeChange(e.target.value)}
                  />
                </div>
              </section>
              </div>
            </div>
          </div>
        )}



     </main>
   


      <style jsx>{`

/* Scrollable Container */
.ScrollableContainer {
  width: 1040px;
  max-height: 80vh; /* Allow scrolling within a defined height */
  overflow-y: auto; /* Enable vertical scrolling */
  padding: 20px; /* Add padding around the container */
  background-color: #f9f9f9; /* Light background color */
  border-radius: 8px; /* Rounded corners */
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1); /* Subtle shadow for depth */
}
/* Theme Settings */
.theme-settings {
  margin-top: 20px;
}

.theme-settings label {
  display: block;
  margin-bottom: 10px;
}

.theme-settings input[type="radio"] {
  margin-right: 10px;
}

.theme-settings input[type="radio"]:checked + label {
  font-weight: bold;
}

.theme-settings label.light {
  color: #333;
}

.theme-settings label.dark {
  color: #fff;
}


body.light {
  background-color: white;
  color: black;
}

body.dark {
  background-color: black;
  color: white;
}

/* Dash Container */
.Dash-Container {
  display: flex;
  flex-direction: column;
  gap: 20px; /* Space between sections */
}
/* Section */
.Dash-Container section {
  background: #fff; /* White background for sections */
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

/* Section Heading */
.Dash-Container section h2 {
  font-size: 1.5rem;
  margin-bottom: 15px;
  color: #333;
}

/* Form */
form {
  display: flex;
  flex-direction: column;
  gap: 15px; /* Space between form elements */
}

form div {
  display: flex;
  flex-direction: column;
}

form label {
  margin-bottom: 5px;
  font-weight: bold;
  color: #555;

}

form button {
  width: 250px;
  margin-top: 10px;
}

form input {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
  width: 250px;
}

form button {
  background-color: #007bff; /* Blue background for buttons */
  color: #fff; /* White text color */
  padding: 10px 20px; /* Adds padding to the buttons */
  border: none;
  border-radius: 5px; /* Rounded corners for buttons */
  cursor: pointer; /* Indicates clickable behavior */
  transition: background-color 0.3s ease;
}
form button:hover {
  background-color: #0056b3; /* Darker blue on hover */
}

/* Two-Factor Authentication Section */
section button {
  background-color: #ff007b; /* Green background for buttons */
  color: #fff;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

section button:hover {
  background-color: #218838; /* Darker green on hover */
}
section button:disabled {
  background-color: #6c757d; /* Grey background for disabled state */
  cursor: not-allowed; /* Not-allowed cursor for disabled button */
}
section p {
  margin: 10px 0;
  color: #333;
}

/* Login Activity Section */
section ul {
  list-style-type: none; /* Remove default list styling */
  padding: 0;
}

section ul li {
  padding: 10px;
  border-bottom: 1px solid #eee;
}

section ul li:last-child {
  border-bottom: none; /* Remove border from last item */
}

.profile-info-row {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.profile-info-row label {
  flex: 1;
  font-weight: normal;
  margin-right: 10px;
}

.profile-info-row input[type="text"] {
  width: 50%;
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-right:500px;
}

button[type="submit"],
button[type="button"] {
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button[type="submit"] {
  background-color: #007bff;
  border-radius: 4px;
  color: #fff;
}

button[type="button"] {
  background-color: #ddd;
  color: #333;
}

.message {
  margin-top: 10px;
  font-weight: bold;
}

.profile-picture-preview {
  margin-bottom: 10px;
  text-align: center;
}

.profile-picture-preview img {
  width: 150px; /* Adjust preview image size */
  height: 150px; /* Adjust preview image size */
  border-radius: 50%; /* Circular preview image */
  object-fit: cover; /* Scales image to fit the container */
}



.notification-setting {
  margin-bottom: 10px;
  display: flex;
  align-items: center;
}

.notification-setting label {
  flex: 1;
  font-weight: normal;
  margin-right: 10px;
}

.notification-setting input[type="checkbox"] {
  width: 18px;
  height: 18px;
}



/* Dashboard Container */
.dashboard-container {
  display: flex;
  height: 100vh;
  font-family: Arial, sans-serif;
}

/* Sidebar */
.sidebar {
  width: 250px;
  background-color: #ff007b;
  color: white;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

/* Profile Section in Sidebar */
.sidebar .profile {
  text-align: center;
}

.sidebar .profile img.profile-image {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  margin-bottom: 10px;
}

/* Navigation Menu */
.sidebar .nav ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.sidebar .nav ul li {
  padding: 10px 0;
  cursor: pointer;
  border-bottom: 1px solid #ff66a3;
}

.sidebar .nav ul li.active,
.sidebar .nav ul li:hover {
  background-color: #ff66a3;
}

/* Logout Button */
.logout-button {
  background-color: white;
  color: #ff007b;
  border: none;
  padding: 10px;
  cursor: pointer;
  border-radius: 5px;
  margin-top: 20px;
}

/* Main Content */
.main-content {
  flex-grow: 1;
  padding: 20px;
  background-color: #f4f4f4;
  overflow-y: auto;
}




/* Section Title */
h2 {
  color: #ff007b;
  border-bottom: 2px solid #ff007b;
  padding-bottom: 10px;
  margin-bottom: 20px;
}

button {
  background-color: #ff007b;
  color: white;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  border-radius: 5px;
  margin-right: 10px;
  margin-top: 10px;
}

button:hover {
  background-color: #ff66a3;
}

p {
  color: #ff007b;
  margin-top: 10px;
}


      .dashboard-container {
        display: flex;
        height: 100vh;
      }
      
      .sidebar {
        width: 250px;
        background-color: #ff0068;
        color: #fff;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 20px;
      }
      
      .profile {
        text-align: center;
        margin-bottom: 20px;
      }
      
      .profile-image {
        width: 100px;
        height: 100px;
        border-radius: 50%;
        background-color: #fff;
        padding: 10px;
      }
      
      .nav ul {
        list-style: none;
        padding: 0;
        width: 100%;
      }
      
      .nav li {
        padding: 10px;
        cursor: pointer;
      }
      
      .nav li.active,
      .nav li:hover {
        background-color: #ff4d94;
      }
      
      .logout-button {
        background-color: #fff;
        color: #ff0068;
        border: none;
        padding: 10px 20px;
        border-radius: 20px;
        cursor: pointer;
        margin-top: auto;
      }
      
      .main-content {
        flex: 1;
        padding: 20px;
        background-color: #f7f7f7;
      }
      
      .header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding-bottom: 20px;
        border-bottom: 1px solid #ddd;
      }
      
      .logo img {
        width: 100px;
      }
      
      .nav-links a {
        margin: 0 10px;
        color: #ff0068;
        text-decoration: none;
      }
      
      .nav-links a:hover {
        text-decoration: underline;
      }
      
      .maindash a {
        margin-right: 15px;
        color: #ff0068;
        text-decoration: none;
      }
      
      .maindash a:hover {
        text-decoration: underline;
      }
      
      
      
      `}</style>
    </div>
  );};

export default Settings;

