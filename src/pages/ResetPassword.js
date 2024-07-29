// ResetPassword.js
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
    height: '100vh', // Set height to 100% of viewport height
    overflow: 'auto', // Add overflow to allow scrolling if needed
    },
  popup: {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.2)',
    zIndex: '1000',
  },
  popupContent: {
    textAlign: 'center',
  },
  logo: {
    width: '170px',
    height: 'auto',
    borderRadius: '50%',
    backgroundColor: 'none',
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
};


const ResetPassword = () => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleChangeOldPassword = (e) => {
    setOldPassword(e.target.value);
  };

  const handleChangeNewPassword = (e) => {
    setNewPassword(e.target.value);
  };

  const handleChangeConfirmPassword = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleResetPassword = () => {
    if (oldPassword === '' || newPassword === '' || confirmPassword === '') {
      setPasswordError('All fields are required');
      return;
    }

     // Check if new password meets the criteria
  const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d).{8,}$/;
  if (!passwordRegex.test(newPassword)) {
    setPasswordError('Password must be at least 8 characters long and contain both letters and numbers');
    return;
  }


    if (newPassword !== confirmPassword) {
      setPasswordError('Passwords do not match');
      return;
    }
     window.alert('Password reset successfully!');
    window.location.href = '/customer-login';
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const handleCloseModal = () => {
    window.location.href = '/Settings';
  };

  return (
     <div style={styles.container}>

<div className="logo">
          <img src="/logo-w.png" alt="My Repairs" style={styles.logo} />
        </div>

      <div className={styles['reset-password-container']}>
      <h2>Reset Password</h2>
      <div className={styles['form-group']}>
        <label htmlFor="oldPassword">Old Password:</label>
        <input type="password" id="oldPassword" value={oldPassword} onChange={handleChangeOldPassword} required />
      </div>
      <div className={styles['form-group']}>
        <label htmlFor="newPassword">New Password:</label>
        <input  type={showPassword ? "text" : "password"} id="newPassword" value={newPassword} onChange={handleChangeNewPassword} required/>
      </div>
      <div className={styles['form-group']}>
        <label htmlFor="confirmPassword">Confirm New Password:</label>
        <input  type={showPassword ? "text" : "password"} id="confirmPassword" value={confirmPassword} onChange={handleChangeConfirmPassword} required/>
        {passwordError && <p className={styles['error-message']}>{passwordError}</p>}
      </div>
      <div className="form-group">
          <label>
            <input
              type="checkbox"
              checked={showPassword}
              onChange={toggleShowPassword}
            /> Show Password
          </label>
        </div>
      <button onClick={handleResetPassword}>Reset Password</button>
      <button onClick={handleCloseModal}>Back</button>
    
    </div>
    
    <style jsx>{`

.reset-password-container {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #f9f9f9;
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
    color: #fff;
  font-size: 14px;
}

input[type="password"],
input[type="text"] {
  width: 50%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}

.error-message {
  color: #d32f2f;
  margin-top: 5px;
  font-size: 12px;
}

button {
  padding: 10px 20px;
  border: none;
  background-color: #333;
  color: #fff;
  border-radius: 4px;
  cursor: pointer;
  margin-right: 15px;
  margin-top: 20px;
  font-size: 14px;
}


button:hover {
  background-color: #ccc;
  color: #000;
}
input[type="checkbox"] {
  margin-right: 10px;
}

.checkbox-label {
  display: flex;
  align-items: center;
  font-size: 14px;
  color: #333;
}
`}</style>
    
    </div>
  );
};

export default ResetPassword;
