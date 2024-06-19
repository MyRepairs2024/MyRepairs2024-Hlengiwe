import { useState } from 'react';
import { useRouter } from 'next/router';
import {SessionProvider} from 'next-auth/react';
import Head from 'next/head';
import { useEffect, useRef } from 'react';
import {signIn} from 'next-auth/react';
import { FaUser, FaLock, FaKey } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Header = () => {
  const [showModal, setShowModal] = useState(false);
  
  const [showModal1, setShowModal1] = useState(false);
  const [userError, setUserError] = useState('');
  const [providerError, setProviderError] = useState('');
  const [showLogin, setShowLogin] = useState(false);
  const [showRegistration, setShowRegistration] = useState(false);
  const [username, setUsername] = useState('');
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [providerEmail, setProviderEmail] = useState('');
  const [ProviderPassword, setProviderPassword] = useState('');
  const [error, setError] = useState('');
  const [userLogin, setUserLogin] = useState(true); 
  const [userRegister, setUserRegister] = useState(true)// Adding the userLogin state variable here
  const [key, setKey] = useState('');
  const [role, setRole] = useState('user');
  const [showInvalidLogin, setShowInvalidLogin] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();
  const loginPopupRef = useRef(null);
  const registrationPopupRef = useRef(null);
  const [serviceProviderRegister, setServiceProviderRegister] = useState(false);
  const [loading, setLoading] = useState(false);


  const toggleLoginPopup = () => {
    setShowLogin(!showLogin);
    setUsername('');
    setPassword('');
    setProviderEmail('');
    setProviderPassword('');
    setKey('');
    setShowInvalidLogin(false);
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  };

const toggleModal1 = () => {
    setShowModal1(!showModal1);
  };
  const toggleRegistrationPopup = () => {
    setShowRegistration(!showRegistration);
    setUsername('');
    setPassword('');
    setName('');
    setSurname('');
    setError('');
    setKey('');
    setEmail('');
  };

  const handleRegistration = async (e) => {
    e.preventDefault();
    setLoading(true);
  
    if (userRegister && (!name || !surname || !username || !email || !password)) {
      setError('All fields are required for user registration.');
      setLoading(false);
      return;
    }
  
    if (!userRegister && (!providerEmail || !key || !ProviderPassword)) {
      setError('Missing Fields.');
      setLoading(false);
      return;
    }
  
    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: userRegister ? name : undefined,
          surname: userRegister ? surname : undefined,
          username: userRegister ? username : undefined,
          email: userRegister ? email : providerEmail,
          key: userRegister ? undefined : key,
          password: userRegister ? password : ProviderPassword,
          role: userRegister ? 'user' : 'service_provider',
        }),
      });
  
      if (response.ok) {
        toast.success("Registration Success! Login and complete profile.", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        toggleRegistrationPopup();
      } else {
        const { error } = await response.json();
        if (userRegister) {
          setUserError(error || 'An error occurred during user registration.');
          setProviderError('');
        } else {
          setProviderError(error || 'An error occurred during service provider registration.');
          setUserError('');
        }
      }
    }catch (error) {
      console.error('Registration error:', error);
      if (error.response && error.response.status === 409) {
        if (userRegister) {
          setUserError('Email already exists. Please use a different email.');
          setProviderError('');
        } else {
          setProviderError('Email already exists. Please use a different email.');
          setUserError('');
        }
      } else {
        if (userRegister) {
          setUserError('An error occurred during user registration.');
          setProviderError('');
        } else {
          setProviderError('An error occurred during service provider registration.');
          setUserError('');
        }
      }
    } finally {
      setLoading(false);
    }
  };
  
  
  
  const handleUserLogin = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
          role: 'user',
        }),
      });
  
      if (response.ok) {
        const { token, user } = await response.json();
        // Store the token in local storage or session storage
        localStorage.setItem('token', token);
  
        // Redirect to the user dashboard
        window.history.replaceState(null, null, '/');
        router.push({
          pathname: '/user-dashboard',
          query: { userEmail: user.email },
        });
      } else {
        const { error } = await response.json();
        setErrorMessage(error || 'An error occurred during user login.');
        setShowInvalidLogin(true); // Display the error message
      }
    } catch (error) {
      console.error('User login error:', error);
      setErrorMessage('An error occurred during user login.');
      setShowInvalidLogin(true); // Display the error message
    }
  };
  
  const handleProviderLogin = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: providerEmail,
          key,
          password: ProviderPassword,
          role: 'service_provider',
        }),
      });
  
      if (response.ok) {
        const { token, serviceProvider } = await response.json();
        // Store the token in local storage or session storage
        localStorage.setItem('token', token);
  
        // Redirect to the service provider page and store the email
        window.history.replaceState(null, null, '/');
        const serviceProviderEmail = serviceProvider.email || '';
        localStorage.setItem('userEmail', serviceProviderEmail);
        router.push(`/providerDashboard?userEmail=${serviceProviderEmail}`);
      } else {
        const { error } = await response.json();
        setErrorMessage(error || 'An error occurred during service provider login.');
        setShowInvalidLogin(true); // Display the error message
      }
    } catch (error) {
      console.error('Service provider login error:', error);
      setErrorMessage('An error occurred during service provider login.');
      setShowInvalidLogin(true); // Display the error message
    }
  };
  
  
  useEffect(() => {
    const handleClickOutside = (event) => {
      const loginButton = document.querySelector('.btn-login');
      const registrationButton = document.querySelector('.btn-register');

      if (
        loginPopupRef.current &&
        !loginPopupRef.current.contains(event.target) &&
        showLogin &&
        !loginButton.contains(event.target)
      ) {
        toggleLoginPopup();
      }

      if (
        registrationPopupRef.current &&
        !registrationPopupRef.current.contains(event.target) &&
        showRegistration &&
        !registrationButton.contains(event.target)
      ) {
        toggleRegistrationPopup();
      }
    };

    window.addEventListener('click', handleClickOutside);

    return () => {
      window.removeEventListener('click', handleClickOutside);
    };
  }, [showLogin, showRegistration]);

  return (
    
    <header className="header">
      <div className='container'>
      <Head>
        <link rel="stylesheet" href="https://unicons.iconscout.com/release/v2.1.9/css/unicons.css" />
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.5.0/css/bootstrap.min.css"/>
      </Head>
        <div className="logo">
          <img src="/logo-w.png" alt="My Repairs" />
        </div>
        <div className='help-links'>
    <ul className="nav-links">
        <li><a href="/Login-Page">How it works</a></li>
         <li><a href="/admin-registration">Admin</a></li>
    </ul>
</div>

<div className="navigation">
         <button className="btn-login" onClick={toggleModal1}>
           Login
         </button>
         </div>
      
      
      {showModal1 && (
        <div className="modal-overlay" onClick={toggleModal1}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>Choose Your Role</h2>
            <div className="role-options">
              <a href="/customer-login" className="btn-role">Customer</a>
              <a href="/MyLogin" className="btn-role">Service Provider</a>
               </div>
            <button className="btn-close" onClick={toggleModal1}>Close</button>
          </div>
        </div>
      )}

    
        <div className="navigation">
         <button className="btn-login" onClick={toggleModal}>
           Sign Up
         </button>
         </div>
      </div>
      
      {showModal && (
        <div className="modal-overlay" onClick={toggleModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>Choose Your Role</h2>
            <div className="role-options">
              <a href="/customer-register" className="btn-role">Customer</a>
              <a href="/provider_homepage" className="btn-role">Service Provider</a>
               </div>
            <button className="btn-close" onClick={toggleModal}>Close</button>
          </div>
        </div>
      )}


      {showLogin && (
        <div className='blurredpage1'>
    <div className="popup login-popup " ref={loginPopupRef}>
      <div className="popup-content">
        <div className="logo2">
          <img src="/logo.png" alt="My Repairs" />
        </div>
        <div className="Login-Type">
        
        <h6 className="mb-0 pb-3"><span className='suser'>Provider </span><span className='sservice'>User</span></h6>
			          	
                  <input
  className="checkbox"
  type="checkbox"
  id="reg-log"
  name="reg-log"
  checked={userLogin}
  onChange={() => {setUserLogin(!userLogin); setShowInvalidLogin(false);}}
/>
<label htmlFor="reg-log"></label>

          </div>
          {userLogin ? ( // Render the user login form
              <form>
                <div className="form-group">
                <FaUser style={{ fontSize: '16px', position: 'fixed', color: '#c4c3ca', margin: "15px" }} />

                <input
              className="form-style"
              type="email" // Use email input for user login
              placeholder="Email" // Change the placeholder text
              value={email} // Use email state variable
              onChange={(e) => setEmail(e.target.value)} // Update email state
            />
                </div>
                <p class="mb-0 mt-4 text-center" style={{padding: "0", fontFamily: "poppins", fontSize: "14"}}><a href="https://www.web-leb.com/code" className="link">Forgot your password?</a></p>

                <div className="form-group">
                <FaLock style={{ fontSize: '16px', position: 'fixed', color: '#c4c3ca', margin: "15px" }} />

                  <input
className='form-style'
                    type="password"
                    placeholder="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                {/* ... Other user-specific login fields ... */}
                <div className="buttons mx-auto ">
                  <button className="btn-submit" onClick={handleUserLogin}>
                    LOGIN
                  </button>
                  
				      					
            
                </div>
                <div className='signupmsg'>{showInvalidLogin && (<>
  <p className="invalid-login-message">{errorMessage}</p> </>
)} <p className='sign-msg'><a href="#" className='link2'>SIGN UP</a></p></div> 
         
              </form>
            ) : ( // Render the service provider login form
              <form>
                <div className="form-group">
                <FaUser style={{ fontSize: '16px', position: 'fixed', color: '#c4c3ca', margin: "15px" }} />

                  <input 
className='form-style'
                    type="email"
                    placeholder="Email"
                    value={providerEmail}
                    onChange={(e) => setProviderEmail(e.target.value)}
                  />
                </div>
                <div className="form-group">
                <FaKey style={{ fontSize: '16px', position: 'fixed', color: '#c4c3ca', margin: "15px" }} />

                  <input
className='form-style'
                    type="text"
                    placeholder="KEY"
                    value={key}
                    onChange={(e) => setKey(e.target.value)}
                  />
                </div>
                <p class="mb-0 mt-4 text-center"><a href="https://www.web-leb.com/code" className="link">Forgot your password?</a></p>

                <div className="form-group">
                <FaLock style={{ fontSize: '16px', position: 'fixed', color: '#c4c3ca', margin: "15px" }} />

                  <input
                  className='form-style'
                    type="password"
                    placeholder="PASSWORD"
                    value={ProviderPassword}
                    onChange={(e) => setProviderPassword(e.target.value)}
                  />
                </div>
                {/* ... Other service provider-specific login fields ... */}
                <div className="buttons mx-auto">
                  <button className="btn-submit" onClick={handleProviderLogin}>
                    LOGIN
                  </button>
                
                </div>
               <div className='signupmsg2'>{showInvalidLogin && (<>
  <p className="invalid-login-message">{errorMessage}</p> </>
)} <p className='sign-msg'><a href="/" className='link2' onClick={toggleRegistrationPopup}>SIGN UP</a></p></div> 
              </form>
            )}
      </div>
    </div>
    </div>
  )}

{showRegistration && (
  <div className='blurredpage1'>
        <div className="popup login-popup" ref={registrationPopupRef}>
          <div className="popup-content">
            <div className="logo2">
              <img src="/logo.png" alt="My Repairs" />
            </div>
            <div className="Login-Type1">
            <h6 class="mb-0 pb-3"><span className='suser'>Provider </span><span className='sservice'>User</span></h6>
          

            <input
  className="checkbox1"
  type="checkbox"
  id="reg-log"
  name="reg-log"
  checked={userRegister}
  onChange={() => {setUserRegister(!userRegister);
}}
/>
<label htmlFor="reg-log"></label>
             
            </div>
            <form>
              {userRegister ? (
                <>
                  {/* User registration form */}
                  <div className="form-group1">
                    
                    <input
className="form-style1"
                      type="text"
                      placeholder="NAME"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-group1">
                    <input
className="form-style1"
                      type="text"
                      placeholder="SURNAME"
                      value={surname}
                      onChange={(e) => setSurname(e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-group1">
                    <input
className="form-style1"
                      type="text"
                      placeholder="USERNAME"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-group1">
                    <input
className="form-style1"
                      type="email"
                      placeholder="EMAIL"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  
                  <div className="form-group1">
                    <input
className="form-style1"
                      type="password"
                      placeholder="PASSWORD"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
            
                </>
              ) : (

             
                <>

                  {/* Service provider registration form */}
                  <div className="form-group">
                  <FaUser style={{ fontSize: '16px', position: 'fixed', color: '#c4c3ca', margin: "15px" }} />

                    <input
className="form-style"
                      type="email"
                      placeholder="Email"
                      value={providerEmail}
                      onChange={(e) => setProviderEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-group">
                  <FaKey style={{ fontSize: '16px', position: 'fixed', color: '#c4c3ca', margin: "15px" }} />

                    <input
className="form-style"
                      type="text"
                      placeholder="KEY"
                      value={key}
                      onChange={(e) => setKey(e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-group">
                  <FaLock style={{ fontSize: '16px', position: 'fixed', color: '#c4c3ca', margin: "15px" }} />

                    <input
                    className="form-style"
                      type="password"
                      placeholder="PASSWORD"
                      value={ProviderPassword}
                      onChange={(e) => setProviderPassword(e.target.value)}
                      required
                    />
                  </div>
                </>
              )}

{error && <p className="error-message">{error}</p>}
              <div className="buttons1 mx-auto">
                <button className="btn-submit" onClick={handleRegistration} disabled={loading}>
                  {loading ? 'Registering...' : 'Register'}
                </button>
              </div>
            </form>
          </div>
        </div>
        </div>
      )}
      <ToastContainer
position="top-center"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="light"
/>
  <style jsx>{`

/*----------HEADER STYLING----------------------------------------------------------------------*/

/* Styles for the Sign Up button */
/* Modal Overlay */
.modal-overlay {
  position: fixed; /* Ensures the overlay covers the entire viewport */
  top: 0;
  left: 0;
  width: 100%;
  height: 100%; /* Fills the entire screen */
  background-color: rgba(0, 0, 0, 0.5); /* Semi-transparent black background */
  display: flex; /* Centers the modal content horizontally */
  justify-content: center;
  align-items: center;
  z-index: 100; /* Ensures the overlay sits above other content */
}

/* Modal Content */
.modal-content {
  background-color: #fff; /* White background for the modal */
  padding: 20px; /* Adds some padding for content */
  border-radius: 5px; /* Rounded corners for a softer look */
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1); /* Subtle shadow for depth */
  display: flex;
  flex-direction: column; /* Stacks content vertically */
  align-items: center; /* Centers content within the modal */
  max-width: 400px; /* Sets a maximum width for the modal content */
  text-align: center; /* Centers text within the modal */
}

/* Modal Title */
.modal-content h2 {
  font-size: 20px; /* Adjust title size as needed */
  margin-bottom: 15px; /* Adds some space below the title */
}

/* Role Options */
.role-options {
  display: flex;
  justify-content: space-around; 
   margin-bottom: 20px; 
   align-items: center;
}

/* Role Buttons */
.btn-role {
  background-color: #ff4081;
  color: #fff; 
  padding: 10px 20px; 
  border: none;
  border-radius: 5px; 
  cursor: pointer; 
  text-decoration: none;
  margin-left: 30px;
}

/* Close Button */
.btn-close {
  background-color: #dc3545;
  color: #fff; 
  padding: 5px 10px; 
  border: none;
  border-radius: 5px;
  cursor: pointer;
}



.logo img {
  height: 120px;
  width: auto;
 margin-left: 20px;
  background-color: none;
}
header{
  background: #ff0068;
}
.container {

   align-items: center;
   background-color:  #ff0068;
   height: 90px;
   display: flex;
   
   width: 970px;
      
      align-items: center;
       
        color: white;
        margin: 0 auto;
       
        justify-content: space-between;

 }

 .container.blur {
   filter: blur(8px);
   pointer-events: none; /* Prevent interactions with blurred content */
 }

 .btn-register {
  background-color:  #21B6A8;
  color: azure;
  border: none;
  padding: 8px 16px;
  font-size: 14px;
  border-radius: 30px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.btn-login {
  background-color: white;
  color: #FF0066;
  border: none;
  padding: 8px 16px;
  font-size: 14px;
  font-weight: bold;
  border-radius: 30px;
  cursor: pointer;
  transition: background-color 0.3s;
  margin-left:-300px;
}

.btn-login:hover {
  
  color: black;
  z-index: 1111;
  box-shadow: 0 0 8px black;
  border-radius: 30px;
  transition: box-shadow 0.5s;
}

.btn-register:hover {
  background-color: pink;
  color: black;
  z-index: 1111;
  box-shadow: 0 0 8px black;
  border-radius: 30px;
  transition: box-shadow 0.5s;
}

.navigation{
width: 200px;
  
  display: flex;
  align-items: center;
  justify-content: space-around;
 
  
}

.logsin {
  margin-right: 20px;
}

.logsin a {
  color: #fff;
  text-decoration: none;
}

.registers {
  margin-left: 0px;
}

.registers a {
  color: #fff;
  text-decoration: none;
}



/*-----------HEADER LINKS----------------------------------------*/


.help-links{
  display: flex;
  text-decoration: none;
  list-style: none;
  justify-content: space-between;
  width:400px;



}
.nav-links{
  text-decoration: none;
  list-style: none;
  display: flex;
  margin: 10px;
  align-items: center; 
  font-size: 14px;

 

 
}
.nav-links ul{
   
}

.nav-links a{
  color: #fff;
  font-weight: bold;
  margin-right: 30px;
  text-decoration: none;
  font-family: poppins;
  position: relative;

  
}
.nav-links a:after{
content: "";
position: absolute;
background-color: #fff;
height: 3px;
width: 0;
left: 0;
bottom: -10px;
transition: 0.3s;
}

.nav-links a:hover:after{
  width: 100%;
}


      
    









/*==============================================================================================*/





body {
  font-family: Arial, sans-serif;
  margin: 0;
  padding: 0;
  background-color: #f5f5f5;
}









/*==============================================================================================*/

/*-----------------LOGIN POPUP---------------------------------------------*/

.logo2 img {
  height: 100px;
  width: auto;
  margin: 0;
  padding: 0;
  background-color: #454545;
  border-radius: 40px;
  position: absolute;
  margin-top: -85px;
left: 35%;
 
 
 
}



[type="checkbox"]:checked,
[type="checkbox"]:not(:checked){
display: none;
}
    
    .checkbox:checked + label,
    .checkbox:not(:checked) + label{
      position: relative;
      display: block;
      text-align: center;
      width: 60px;
      height: 16px;
      border-radius: 8px;
      padding: 0;
      margin: 10px auto;
     margin-bottom: -10px;
     margin-top: -5px;
      cursor: pointer;
      background-color: #21B6A8;
    }
    .checkbox:checked + label:before,
    .checkbox:not(:checked) + label:before{
      position: absolute;
      display: block;
      width: 36px;
      height: 36px;
      border-radius: 50%;
      color: #21B6A8;
      background-color: #020305;
      font-family: 'unicons';
      content: '\eb4f';
      z-index: 20;
      top: -10px;
      left: -10px;
      line-height: 36px;
      text-align: center;
      font-size: 24px;
      transition: all 0.5s ease;
   
    }
    .checkbox:checked + label:before {
      transform: translateX(44px) rotate(-270deg);
    }

    .checkbox:checked ~ .card-3d-wrap .card-3d-wrapper {
      transform: rotateY(180deg);
    }

.blurredpage1{
  background-color: rgba(255, 255, 255, 0.5); /* Set the background color with transparency */
  backdrop-filter: blur(10px); /* Apply a blur effect to the content behind */
  position: fixed;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;

}
.login-popup {
  position: fixed;
  z-index: 1111;
  left: 50%;
  display: inline-block;
  background: transparent;
  width: 370px;
  height: 430px;
  border-radius: 15px;
  text-align: center;
  align-items: center;
  box-shadow: 0 0 50px #fff;
  top: 50%;
  transform: translate(-50%, -50%);
}

.popup-content {
  align-items: center;
  position: relative;
  width: 370px;
  height: 430px;
  background-color: #454545;
  color: pink;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 0 20px #21B6A8;

}

.popup-content::before,
.popup-content::after {
  content: "";
  position: absolute;
  inset: -0.5rem;
  z-index: -1;

  border: 10px solid transparent;
  border-image-source: conic-gradient(
    from 0deg,
    #21B6A8,
    #ff0068,
    #21B6A8,
   #ff0068,
    #21B6A8
  );
  border-image-slice: 1;
  animation: rotateColors 5s linear infinite;
}

@keyframes rotateColors {
  0% {
    border-image-source: conic-gradient(
      from 0deg,
      #21B6A8,
     #ff0068,
      #21B6A8,
     #ff0068,
      #21B6A8
    );
  }
  25% {
    border-image-source: conic-gradient(
      from 90deg,
      #21B6A8,
     #ff0068,
      #21B6A8,
     #ff0068,
      #21B6A8
    );
  }
  50% {
    border-image-source: conic-gradient(
      from 180deg,
      #21B6A8,
     #ff0068,
      #21B6A8,
      #ff0068,
      #21B6A8
    );
  }
  75% {
    border-image-source: conic-gradient(
      from 270deg,
      #21B6A8,
      #ff0068,
      #21B6A8,
      #ff0068,
      #21B6A8
    );
  }
  100% {
    border-image-source: conic-gradient(
      from 360deg,
      #21B6A8,
     #ff0068,
      #21B6A8,
     #ff0068,
      #21B6A8
    );
  }
}

.popup-content h2 {
  margin-top: 0px;
  letter-spacing: 1px;
  color: pink;
  font-size: 22px;
}


.Login-Type{
  justify-content: space-between;
  margin-bottom: 30px;
}
.Login-Type1{
  margin-bottom: 25px;
}

.Login-Type label{
  margin-right: 25px;
  font-size: 14px;
  font-family: sans-serif;
  box-sizing: border-box;
  border: solid white 2px;
  padding: 5px;
  padding-top: 0;
  padding-bottom: 0;
  
  

}


.login-type-btn1{
  margin-right: 5px;
  border-radius: 10px;
  border-style: none;
  cursor: pointer;
  font-size: 12px;

}
.login-type-btn2{
  border-radius: 10px;
  border-style: none;
  cursor: pointer;
  font-size: 12px;
}

input[type='email']:focus {
  box-shadow: 0 0 5px #21B6A8;
  position: center;
 
}

input[type='password']:focus {
  box-shadow: 0 0 5px #21B6A8;
  position: center;
}


.buttons {
  width: 250px;
  display: flex;
  flex-direction: column;
  margin-top: 20px;
  margin-left: 60px;

  justify-content: center;
  align-items: center;
}

.buttons1{
  
}

.btn-close {
  width: 250px;
  
  padding: 10px 30px;
  margin-bottom: 10px;
  background: pink;
  border-radius: 10px;
  box-shadow: 0 0 5px white;
  cursor: pointer;
  color: black;
  text-decoration-style: solid;
  display: inline-block;
  border-style: hidden;
  transition: 0.5s;
  transition-property: width;
}

.btn-submit {
  width: 230px;
  
  padding: 10px 30px;
  margin-bottom: 15px;
  background:  #21B6A8;
  border-radius: 10px;
  font-weight: bold;
  box-shadow: 0 0 5px #21B6A8;
  cursor: pointer;
  color: black;
  display: inline-block;
  border-style: hidden;
  transition: 0.5s;
  transition-property: width;
}

.btn-submit:hover {
  box-shadow: 0 0 10px black;
  background-color:#ff0078;
  color: white;
  outline: none;
  border-color: #01df01;
  
  text-decoration-style: solid 2px;

  transition: box-shadow, background-color, color 2s;
}

/*------------------REGISTRATION POPUP--------------------------------------------*/

[type="checkbox"]:checked,
[type="checkbox"]:not(:checked){
display: none;
}
    
    .checkbox1:checked + label,
    .checkbox1:not(:checked) + label{
      position: relative;
      display: block;
      text-align: center;
      width: 60px;
      height: 16px;
      border-radius: 8px;
      padding: 0;
      margin: 10px auto;
     margin-bottom: -10px;
      cursor: pointer;
      background-color: #21B6A8;
    }
    .checkbox1:checked + label:before,
    .checkbox1:not(:checked) + label:before{
      position: absolute;
      display: block;
      width: 36px;
      height: 36px;
      border-radius: 50%;
      color: #21B6A8;
      background-color: #020305;
      font-family: 'unicons';
      content: '\eb4f';
      z-index: 20;
      top: -10px;
      left: -10px;
      line-height: 36px;
      text-align: center;
      font-size: 24px;
      transition: all 0.5s ease;
   
    }
    .checkbox1:checked + label:before {
      transform: translateX(44px) rotate(-270deg);
    }

    .checkbox1:checked ~ .card-3d-wrap .card-3d-wrapper {
      transform: rotateY(180deg);
    }
.popup-registration-popup {
  position: fixed;
 
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.7);
  width: 100%;
  height: 100%;
  z-index: 9999;
}

.popup-registration-popup h2{
  margin-left: 125px;
  margin-top: -10px;
  letter-spacing: 1px;
  color: pink;
  font-size: 22px;

}


@media (max-width: 768px){
  .login-popup{


  }
 .popup-content{
  
 }
}







h6{
  margin-top: 20px;
 

}
h6 span{
padding: 0 20px;
  font-weight: 700;
  font-size: 14px;
  color: #21B6A8;
  font-family: poppins;
  

  
}




    .link {
      color: #21B6A8;
    }
    .link2{
      color: azure;

    }
    .link:hover {
      color: #c4c3ca;
      color: azure;
    }
    .link2:hover {
      color: #c4c3ca;

    }
    .header {

      width: 100%;
      z-index: 999;
      
    }

   
   
  

    

   

   

   

    .btn-close:hover {
      box-shadow: 0 0 30px red;
      outline: none;
      border-color: #01df01;
   
      text-decoration-style: solid;
      transition: box-shadow, background-color 2s;
    }

   

  





 

    .form-style {
      padding: 13px 15px;
      padding-left: 55px;
      height: 48px;
      width: 100%;
      font-weight: 500;
      border-radius: 4px;
      font-size: 14px;
      line-height: 22px;
      letter-spacing: 0.5px;
      outline: none;
      color: #c4c3ca;
      background-color: #1f2029;
      border: none;
      -webkit-transition: all 200ms linear;
      transition: all 200ms linear;
      box-shadow: 0 4px 8px 0 rgba(21,21,21,.2);
      
    }

    .form-style1 {
      padding: 13px 15px;
      padding-left: 55px;
      height: 48px;
      width: 100%;
      font-weight: 500;
      border-radius: 4px;
    display: grid;
      font-size: 14px;
      line-height: 22px;
      letter-spacing: 0.5px;
      outline: none;
      color: #c4c3ca;
      background-color: #1f2029;
      border: none;
      -webkit-transition: all 200ms linear;
      transition: all 200ms linear;
      box-shadow: 0 4px 8px 0 rgba(21,21,21,.2);
      
    }

    .form-style:focus,
.form-style:active {
  border: none;
  outline: none;
  box-shadow: 0 4px 8px 0 rgba(21,21,21,.2);
}

    .form-group label {
      margin-right: 30px;
    }

   .form-group2 input{

    background-color: cream;
    align-items: center;
    font-size: 14px;
    position: inherit;
    display: block;
    margin: 20px;
    margin-left: 70px;
    margin-top: -10px;
   }
   .buttons2{
    margin: 20px;
    margin-top: -40px;
    margin-left: 70px;
   }

   

    .email{
     align-items: center;
      padding: 5px;
    width: 235px;
      float: center;
      text-align: center;
      border-radius: 20px;
     
    }

    .logo3 img {
      height: 100px;
      width: auto 50px;
      margin: 0;
      margin-left: 135px;
      padding: 0;
      background-color: none;
    }

    .logo3 h2{
      height: 90px;
      width: auto;
      margin: 0;
      margin-left: 10px;
      padding: 0;
      background-color: none;
    }

    .registration-form{
      background-color: black;
      height: 285px;
      border-radius: 20px;
      overflow: auto;
      -ms-overflow-style: none;
      padding-top: 15px;
      
    }
    .registration-role{
      position: absolute;
      margin-top: -20px;
      margin-left: 211px;
      
      
    }

   
    .usernamelogin{
      margin-bottom: 25px;
    }
    .invalid-login-message{
      color: #ffeba7;
      color: red;
      font-weight: bold;
      font-size: 12px;
      
      
    }
    .signupmsg2{
      display: flex;
      width: 100%;
      justify-content: space-evenly;

      margin-top: -8px;
     
    }
    .signupmsg{
      display: flex;
      width: 100%;
      justify-content: space-evenly;

      margin-top: 0px;
     
    }
    .sign-msg{
      color: azure;
      font-size: 14px;
      font-weight: bold;
    }
    .form-group1{
      margin-bottom: 8px;
    }


  `}</style>


</header>
);
};

export default Header;



/*<select
              id="loginType"
              value={loginType}
              onChange={(e) => setLoginType(e.target.value)}
            >
              <option value="">Select an option</option>
              <option value="user">User</option>
              <option value="serviceProvider">Service Provider</option>
            </select>*/

