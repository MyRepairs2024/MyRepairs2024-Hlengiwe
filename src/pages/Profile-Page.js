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
  fileInput: {
    marginBottom: '10px',
  },
  textInput: {
    width: '100%',
    padding: '12px',
    marginBottom: '10px',
    boxSizing: 'border-box',
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
    width: '150px',
    margin: '20px auto',
    borderRadius: '20px',
  },
};

function ProfilePage() {
  const [files, setFiles] = useState({
    id: null,
    certificates: null,
    licenses: null,
    taxCertificate: null,
  });

  const [profileInfo, setProfileInfo] = useState({
    experiences: '',
    profileDescription: '',
  });

  const handleFileChange = (e, fileType) => {
    const file = e.target.files[0];
    setFiles((prevFiles) => ({
      ...prevFiles,
      [fileType]: file,
    }));
  };

  const handleTextInputChange = (e, field) => {
    const value = e.target.value;
    setProfileInfo((prevInfo) => ({
      ...prevInfo,
      [field]: value,
    }));
  };
  const [showTerms, setShowTerms] = useState(false); // State to manage terms popup visibility





  const handleSubmit = (e) => {
    e.preventDefault();
  
    // Check if any of the required files are missing
    if (!files.id || !files.certificates || !files.licenses || !files.taxCertificate) {
      alert('Please upload all required documents before saving your profile.');
      return; // Exit the function if files are missing
    }

    // You can handle file uploads and profile info here
    console.log('Form data submitted:', { files, profileInfo });
    // Show alert for successful registration
    alert('Registration successful,We are verifying your information.We shall send you the login key in your email in 24 hours!');
  
    // Optionally, you can redirect the user to another page
     console.log('Form submitted!');
     setShowTerms(true); // Show terms popup after registration
   //  window.location.href = '/MyLogin';
   window.location.href = '/providerDashboard';
      
  };
 
  return (
    <div style={styles.container}>
      <h1>Service Provider Profile</h1>
      <div style={styles.header}></div>
      <div style={styles.logoContainer}>
  <div className="logo">
    <img src="/logo-w.png" alt="My Repairs" style={styles.logo} />
  </div>
  </div>

      <div style={styles.formContainer}>
        <form style={styles.form} onSubmit={handleSubmit}>
          <label>
            Upload ID:
            <input
              type="file"
              accept=".pdf, .jpg, .png"
              onChange={(e) => handleFileChange(e, 'id')}
            
            />
          </label>
          <label>
            Upload Certificates:
            <input
              type="file"
              accept=".pdf, .jpg, .png"
              onChange={(e) => handleFileChange(e, 'certificates')}
              
            />
          </label>

          <label>
            Upload Licenses:
            <input
              type="file"
              accept=".pdf, .jpg, .png"
              onChange={(e) => handleFileChange(e, 'licenses')}
              
            />
          </label>

          <label>
            Upload Tax Certificate:
            <input
              type="file"
              accept=".pdf, .jpg, .png"
              onChange={(e) => handleFileChange(e, 'taxCertificate')}
              
            />
          </label>

          <label>
            Experiences:
            <textarea
              rows="4"
              onChange={(e) => handleTextInputChange(e, 'experiences')}
              value={profileInfo.experiences}
              
            />
          </label>

          <label>
            Profile Description:
            <textarea
              rows="4"
              onChange={(e) => handleTextInputChange(e, 'profileDescription')}
              value={profileInfo.profileDescription}
              
            />
          </label>
            <button type="submit">
            Save Profile
          </button>
        </form>
        </div>
        {/*{showTerms && (
        <div>
          <h2>Terms and Conditions</h2>
           Add your terms and conditions content here 
          <p>
            ... Your terms and conditions text ...
          </p>
          <button onClick={() => setShowTerms(false)}>Close</button>
          <button type="submit" form="myForm" style={styles.button}>
            Accept and Save Profile
          </button>
        
        </div>
        )}*/}

  
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
  background-color: #ffffff;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  width: 400px;
}

h1 {
  text-align: center;
  color: #333333;
  margin-bottom: 20px;
}

label {
  display: block;
  color: #555555;
  margin-bottom: 8px;
  font-weight: bold;
}

input[type="file"] {
  width: 80%;
  padding: 10px;
  margin-bottom: 20px;
  border: 1px solid #cccccc;
  border-radius: 5px;
  font-size: 14px;
  background-color: #f7f7f7;
  color: #333333;

}

textarea {
  width: 80%;
  padding: 10px;
  margin-bottom: 20px;
  border: 1px solid #cccccc;
  border-radius: 5px;
  font-size: 14px;
  resize: vertical;
  background-color: #f7f7f7; /* Makes the input background transparent */
  margin-bottom: 20px;
  color: #333333;
}

button {
  width: 100%;
  padding: 10px;
  background-color: #3330;
  color: #000;
  border: 1px solid #333333;
  border-radius: 3px;
  font-size: 16px;
  cursor: pointer;
}

button:hover {
  background-color: #fff;
}




       `}</style>
       </div>
    
  );
}

export default ProfilePage;