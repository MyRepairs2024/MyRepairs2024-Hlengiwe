import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Ensure useNavigate is imported
import Help from '../Help'; // Make sure to create this component
import Settings from '../Settings'; // Make sure to create this component

const Dashheader= () =>{
    const [searchQuery, setSearchQuery] = useState('');
    const [showHelpPopup, setShowHelpPopup] = useState(false);
    const [showSettingsPopup, setShowSettingsPopup] = useState(false);
  


  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleNavigation = (path) => {
    window.location.href = path;
  };

  const toggleHelpPopup = () => {
    setShowHelpPopup(!showHelpPopup);
  };

  const toggleSettingsPopup = () => {
    setShowSettingsPopup(!showSettingsPopup);
  };

    return(
        <header className="header">
        <div className="container">
        <div className="logo">
            <img src="/logo.png" alt="My Repairs" />
          </div>
          <div className="navigation">
            <ul className="menu">
              <li className="logsin">
              <button className="btn-login" onClick={() => handleNavigation('/')}>
                Home
              </button>
              </li>
              <li className="registers">
              <button className="btn-register"  onClick={() => handleNavigation('/Settings')}>
              Settings
            </button>
              </li>
              <li className='Help'>
              <button className="btn-help" onClick={() => handleNavigation('/Help')}>
                Help
              </button>

              </li>
            </ul>
          
          </div>    
          
          <button className='mobilesettings'>Settings</button>
        </div>


        {showHelpPopup && <Help onClose={toggleHelpPopup} />}
      {showSettingsPopup && <Settings onClose={toggleSettingsPopup} />}


        <style jsx>{`
 .header {
  z-index: 1111;
}

.container {
  width: 950px;
  border-bottom: 2px solid #ff0066;
  justify-content: space-between;
  display: flex;
  align-items: center;
  height: 80px;
  padding: 18px;
}

.mobilesettings {
  display: none;
}

.logo img {
  height: 120px;
  width: auto;
  margin-left: -17px;
  padding: 0;
}

.navigation .menu {
  list-style: none;
  margin: 0;
  justify-content: space-between;
  display: flex;
  align-items: center;
  right: 0;
  left: 0;
  position: sticky;
  float: right;
}

.btn-register {
  background-color: white;
  color: #21b6a8;
  border: none;
  padding: 8px 16px;
  font-size: 14px;
  font-weight: bold;
  position: relative;
  border-radius: 30px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.btn-login {
  color: #ff0066;
  background: white;
  border: none;
  padding: 8px 16px;
  font-size: 14px;
  font-weight: bold;
  border-radius: 30px;
  cursor: pointer;
  transition: background-color 0.3s;
  text-align: center;
  position: relative;
}

.btn-help {
  background-color: white;
  color: #21b6a8;
  border: none;
  padding: 8px 16px;
  font-size: 14px;
  font-weight: bold;
  border-radius: 30px;
  cursor: pointer;
  transition: background-color 0.3s;
  position: relative;
}

.btn-login::after {
  content: "...";
  position: absolute;
  left: 30px;
  display: block;
  text-align: center;
  color: red;
}

.btn-register::after {
  content: "...";
  position: absolute;
  left: 35px;
  display: block;
  text-align: center;
  color: #21b6a8;
}

.btn-help::after {
  content: "...";
  position: absolute;
  left: 25px;
  display: block;
  text-align: center;
  color: #21b6a8;
}

.search-bar {
  display: flex;
  align-items: center;
  margin-right: 20px;
}

.search-bar input {
  padding: 8px;
  border: none;
  border-radius: 20px;
  margin-right: 10px;
  box-shadow: 0px 0px 10px #21b6a8;
}

.btn-search {
  background-color: #ff0066;
  color: azure;
  border: none;
  padding: 8px 16px;
  font-size: 14px;
  font-weight: bold;
  border-radius: 30px;
  cursor: pointer;
  transition: background-color 0.3s;
}

@media (max-width: 768px) {
  .container {
    width: 100%;
    margin-top: 25px;
    height: 50px;
  }

  .logo img {
    width: 100px;
    height: auto;
    float: right;
  }

  .navigation {
    display: none;
  }

  .search-bar {
    display: none;
  }

  .mobilesettings {
    display: block;
    background: #ff0066;
    border-style: none;
    font-size: 15px;
    font-family: poppins;
    font-weight: bold;
    color: #fff;
    border-radius: 10px;
    padding: 5px;
  }
}

@media (max-width: 480px) {
  .container {
    width: 100%;
    flex-direction: column;
    align-items: flex-start;
    padding: 10px;
    height: auto;
  }

  .logo img {
    width: 80px;
    height: auto;
    margin-left: 0;
    margin-bottom: 10px;
  }

  .btn-register,
  .btn-login,
  .btn-help {
    padding: 6px 12px;
    font-size: 12px;
    border-radius: 20px;
  }

  .btn-login::after,
  .btn-register::after,
  .btn-help::after {
    left: 15px;
  }

  .mobilesettings {
    padding: 4px;
    font-size: 12px;
  }

  .search-bar input {
    padding: 6px;
    margin-right: 5px;
  }

  .btn-search {
    padding: 6px 12px;
    font-size: 12px;
  }
}

 
 `}</style>
         </header>
 
       
     )
 }
 export default Dashheader;
 