import { useState } from 'react';
import { useRouter } from 'next/router';
import {SessionProvider} from 'next-auth/react';
import Head from 'next/head';
import { useEffect, useRef } from 'react';
import {signIn} from 'next-auth/react';
import PDFLink from '../PDFLink';


const Header = () => {


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
const fileName = 'Service Provider.pdf';

  const toggleLoginPopup = () => {
    setShowLogin(!showLogin);
    setUsername('');
    setPassword('');
    setProviderEmail('');
    setProviderPassword('');
    setKey('');
    setShowInvalidLogin(false);
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

    if (userRegister && (!name || !surname || !email || !username || !password)) {
      setError('All fields are required for user registration.');
      return;
    }
  

    if (!userRegister && (!providerEmail || !key || !ProviderPassword)) {
      setError('Email, Key, and Password are required for service provider registration.');
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
        // Registration successful, handle success (e.g., show success message)
        toggleRegistrationPopup(); // Close the registration popup after successful registration
      } else {
        const { error } = await response.json();
        setError(error || 'An error occurred during registration.');
      }
    } catch (error) {
      console.error('Registration error:', error);
      setError('An error occurred during registration.');
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
          <img src="/logo.png" alt="My Repairs" />
        </div>
        <div className="navigation">
          <ul className="menu">
            <li className="logsin">
              <button className="btn-login" onClick={toggleLoginPopup}>
                Login
              </button>
            </li>
            <li className="registers">
              <button className="btn-register" onClick={toggleRegistrationPopup}>
                Request Service
              </button>
            </li>
          </ul>
        </div>
      </div>

      {showLogin && (
  <div className="popup login-popup" ref={loginPopupRef}>
    <div className="popup-content">
      <div className="logo2">
        <img src="/logo.png" alt="My Repairs" />
      </div>
      <div className="Login-Type">
        <h6 class="mb-0 pb-3">
          <span className="suser">Provider </span>
          <span className="sservice">User</span>
        </h6>
        <input
          className="checkbox"
          type="checkbox"
          id="reg-log"
          name="reg-log"
          checked={userLogin}
          onChange={() => {
            setUserLogin(!userLogin);
            setShowInvalidLogin(false);
          }}
        />
        <label htmlFor="reg-log"></label>
      </div>
      {userLogin ? ( // Render the user login form
        <form>
          <div className="form-group">
            <input
              className="form-style"
              type="email" // Use email input for user login
              placeholder="Email" // Change the placeholder text
              value={email} // Use email state variable
              onChange={(e) => setEmail(e.target.value)} // Update email state
            />
          </div>
          <p class="mb-0 mt-4 text-center">
            <a href="https://www.web-leb.com/code" className="link">
              Forgot your password?
            </a>
          </p>
          <div className="form-group">
            <input
              className="form-style"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {/* ... Other user-specific login fields ... */}
          <div className="buttons mx-auto">
            <button className="btn-submit" onClick={handleUserLogin}>
              LOGIN.....
            </button>
          </div>
          <div className="signupmsg">
            {showInvalidLogin && (
              <>
                <p className="invalid-login-message">{errorMessage}</p>{' '}
              </>
            )}
            <p className="sign-msg">
              <a href="#" className="link2" onClick={toggleRegistrationPopup}>
                SIGN UP
              </a>
            </p>
          </div>
        </form>
      ) : ( // Render the service provider login form
        <form>
          <div className="form-group">
            <input
              className="form-style"
              type="email" // Use email input for service provider login
              placeholder="Email" // Change the placeholder text
              value={providerEmail} // Use providerEmail state variable
              onChange={(e) => setProviderEmail(e.target.value)} // Update providerEmail state
            />
          </div>
          <div className="form-group">
            <input
              className="form-style"
              type="text"
              placeholder="KEY"
              value={key}
              onChange={(e) => setKey(e.target.value)}
            />
          </div>
          <p class="mb-0 mt-4 text-center">
            <a href="https://www.web-leb.com/code" className="link">
              Forgot your password?
            </a>
          </p>
          <div className="form-group">
            <input
              className="form-style"
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
          <div className="signupmsg2">
            {showInvalidLogin && (
              <>
                <p className="invalid-login-message">{errorMessage}</p>{' '}
              </>
            )}
            <p className="sign-msg">
              <a href="/" className="link2" onClick={toggleRegistrationPopup}>
                SIGN UP
              </a>
            </p>
          </div>
        </form>
      )}
    </div>
  </div>
)}


{showRegistration && (

        <div className="popup login-popup mx-auto" ref={registrationPopupRef}>
          <div className="popup-content">
            <div className="logo2">
              <img src="/logo.png" alt="My Repairs" />
            </div>
            <div className="Login-Type1">
            <h6 class="mb-0 pb-3"><span className='suser'>Provider </span><span className='sservice'>User</span></h6>

            <input
  className="checkbox"
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
                <button className="btn-submit" onClick={handleRegistration}>
                  Register
                </button>
                
              </div>
            </form>
          </div>
        </div>
      )}
  <style jsx>{`
h6{
  margin-top: 20px;

}
h6 span{
padding: 0 20px;
  font-weight: 700;
  font-size: 14px;
  color: #ffeba7;
  font-family: cursive;
  

  
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
      cursor: pointer;
      background-color: #ffeba7;
    }
    .checkbox:checked + label:before,
    .checkbox:not(:checked) + label:before{
      position: absolute;
      display: block;
      width: 36px;
      height: 36px;
      border-radius: 50%;
      color:  #ffeba7;
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

    .link {
      color: #ffeba7;
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
  top: 0;
  left: 0;
  width: 50%;
  z-index: 999;
  padding-top: 20px;
}

/* Media query for mobile devices */
@media screen and (max-width: 768px) {
  .header {
    position: fixed; /* Fixed position for mobile header */
    padding-top: 10px; /* Decrease padding for smaller screens */
    background-color: #fff; /* Optional: Change background color for mobile header */
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* Optional: Add shadow for mobile header */
  }
}


    .container {
      width: 1100px;
      position: absolute;
      left: 5%;
      border-radius: 20px;
      margin: 0 auto;
      display: flex;
      align-items: center;
      background-color: white;
      height: 90px;
      display: flex;
      justify-content: space-between;

    }
    .container.blur {
      filter: blur(8px);
      pointer-events: none; /* Prevent interactions with blurred content */
    }
    .logo img {
      height: 120px;
      width: auto;
      margin-left: 50px;
      padding: 0;
      background-color: none;
    }

    .navigation .menu {
      list-style: none;
      margin: 0;
      margin-right: 50px;
      display: flex;
      align-item s: center;
      right: 0;
      left: 0;
      position: sticky;
      float: right;
    }

    .logsin {
      margin-left: 0px;
    }

    .logsin a {
      color: #fff;
      text-decoration: none;
    }

    .pdf{
      margin-left: 200px;
      background-color:#ff0066;
    }

    

    .registers {
      margin-left: 20px;
    }

    .registers a {
      color: #fff;
      text-decoration: none;
    }

    .btn-register {
      background-color: #FF0066;
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
      background:  #ffeba7;
      border-radius: 10px;
      font-weight: bold;
      box-shadow: 0 0 5px white;
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

    .btn-close:hover {
      box-shadow: 0 0 30px red;
      outline: none;
      border-color: #01df01;
   
      text-decoration-style: solid;
      transition: box-shadow, background-color 2s;
    }

    .logo2 img {
      height: 110px;
      width: auto;
      margin: 0;
      padding: 0;
      background-color: #454545;
      border-radius: 40px;
      position: absolute;
      margin-top: -85px;
    left: 35%;
     
     
     
    }

    .login-popup {
      position: fixed;
      z-index: 1111;
      left: 50%;
      display: inline-block;
      background: transparent;
      width: 370px;
      height: 420px;
      border-radius: 15px;
      text-align: center;
      align-items: center;
      box-shadow: 0 0 500px black;
      top: 50%;
      transform: translate(-50%, -50%);
    }

    .popup-content {
      align-items: center;
      
      width: 370px;
      height: 420px;
      background-color: #454545;
      color: pink;
      padding: 20px;
      border-radius: 5px;
      box-shadow: 0 0 100px black;
    }

    .popup-content h2 {
      margin-top: 0px;
      letter-spacing: 1px;
      color: pink;
      font-size: 22px;
    }





    input[type='text']:focus {
      box-shadow: 0 0 5px pink;
     
      
      position: center;
    }

    input[type='password']:focus {
      box-shadow: 0 0 5px pink;
     
      position: center;
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
      height: 40px;
      width: 100%;
      font-weight: 500;
      border-radius: 4px;
      font-size: 14px;
      line-height: 22px;
      letter-spacing: 0.5px;
      outline: none;
      display: grid;
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

