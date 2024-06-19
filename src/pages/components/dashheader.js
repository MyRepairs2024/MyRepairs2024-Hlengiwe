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
     border-bottom: 2px solid #ff0068;
     justify-content: space-between;
  
     display: flex;
     align-items: center;
     height: 80px;
     display: flex;
     padding: 18px
 
   }
   .mobilesettings{
     display: none;
   }
   .logo img {
     height: 120px;
     width: auto;
     margin-left: -17px;
     padding: 0;
     background-color: none;
 
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
     background-color:white ;
     
     color: #21B6A8;
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
     color: #ff0068;
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
   .btn-help{
     background-color: white;
     color:#21B6A8;
     border: none;
     padding: 8px 16px;
     font-size: 14px;
     font-weight: bold;
     border-radius: 30px;
     cursor: pointer;
     transition: background-color 0.3s;
     position: relative;
 
   }
   .btn-login::after{
     content: "...";
     position: absolute;
     left: 30px;
   display: block;
   text-align: center;
     color: red; /* Adjust the color as needed */
     
   }
   .btn-register::after{
     content: "...";
     position: absolute;
     left: 35px;
   display: block;
   text-align: center;
     color:#21B6A8 ; /* Adjust the color as needed */
 
   }
   .btn-help::after{
     content: "...";
     position: absolute;
     left: 25px;
   display: block;
   text-align: center;
     color:#21B6A8 ; /* Adjust the color as needed */
 
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
     box-shadow: 0px 0px 10px #21B6A8;
 
   }
 
   .btn-search {
     background-color: #FF0066;
     color: azure;
     border: none;
     padding: 8px 16px;
     font-size: 14px;
     font-weight: bold;
     border-radius: 30px;
     cursor: pointer;
     transition: background-color 0.3s;
   }
 
   @media (max-width: 768px){
     .container{
       width: 100%;
       margin-top: 25px;
       height: 50px;
      
       
     }
     .logo img{
       width: 100px;
       height: auto;
       float: right;
       
     }
     .navigation{
       display: none;
     } 
     .search-bar{
       display: none;
     }
     .mobilesettings{
       display: block;
       background: #ff0068;
       border-style: none;
       font-size: 15px;
       font-family: poppins;
       font-weight: bold;
       color: #fff;
       border-radius: 10px;
       padding: 5px;
     }
    
   }
 
 `}</style>
         </header>
 
       
     )
 }
 export default Dashheader;
 