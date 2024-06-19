import React, { useState } from 'react';
import { FaUser } from 'react-icons/fa';

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
  },
  logo: {
    width: '50px', // Adjusted logo width
    height: '50px', // Adjusted logo height
    marginRight: 'auto', // Move the logo to the left
  },
  icon: {
    fontSize: '40px', // Increased font size for the icon
    marginBottom: '-3px', // Adjusted margin for icon
  },
  motto: {
    textAlign: 'left',
    fontSize: '50px',
    marginBottom: '20px',
    padding: '-10px',
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
    
  },
  successMessage: {
    color: 'green',
    fontWeight: 'bold',
    marginTop: '10px',
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
  });

  const [showSuccess, setShowSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form data submitted:', formData);
    // Simulate a successful registration
    // In a real application, you would likely send the data to a server
    // and handle the registration logic there
    setShowSuccess(true);
    // Optionally, you can reset the form data
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      address: '',
      password: '',
      confirmPassword: '',
      phoneNumber: '',
    });
  };

}

export default App;