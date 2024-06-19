import React ,{ useState, useEffect,useRef } from 'react';
import Dashheader from './components/dashheader';

const Settings = () => {
  const [feedbackGiven, setFeedbackGiven] = useState(false); // Track feedback state
   const [activeSection, setActiveSection] = useState('Help and Support'); // Track active FAQ section
  const helpRef = useRef(null); 
  const [activeFAQ, setActiveFAQ] = useState(''); 

  const handleCloseModal = () => {
    window.location.href = '/customer-login';
    
  };

  const handleTabChange = (tab) => {
    setActiveSection(tab);
  };

  const handleFeedback = (feedback) => {
    setFeedbackGiven(true);
    console.log(`Feedback given: ${feedback}`);
  };
  
  const handleFAQClick = (section) => {
    setActiveFAQ(section === activeFAQ  ? '' : section); 
  };

 
  useEffect(() => {
    helpRef.current.style.display = 'block';
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
            <li className={activeSection === 'Help and Support' ? 'active' : ''} onClick={() => handleTabChange('Help and Support')}>Help and Support</li>
            </ul>
          </nav>
        <button  className="logout-button" onClick={handleCloseModal}>Log Out</button>
      </aside>



      <main className="main-content">
           <div>
         <Dashheader />
          

{activeSection === 'Help and Support' && (
     <div className='ScrollableContainer'> 
     <div className='Dash-Container'>
   
      <div className="HelpTab">
        <div ref={helpRef} className="help-content">
        <h2>Help and Support</h2>
                    <p>
                      Welcome to our appliances repair help center! Here you can find answers to common questions and troubleshooting tips for your appliances.
                    </p>
                    <h3>Frequently Asked Questions</h3>
                    <ul>
                      <li className={activeFAQ === 'scheduling' ? 'active' : ''} onClick={() => handleFAQClick('scheduling')}>How do I schedule a repair service?</li>
                      <li className={activeFAQ === 'payment' ? 'active' : ''} onClick={() => handleFAQClick('payment')}>What payment methods do you accept?</li>
                      <li className={activeFAQ === 'warranty' ? 'active' : ''} onClick={() => handleFAQClick('warranty')}>Do you offer warranty on repairs?</li>
                      <li className={activeFAQ === 'applianceRepairs' ? 'active' : ''} onClick={() => handleFAQClick('applianceRepairs')}>What types of appliances do you repair?</li>
                      <li className={activeFAQ === 'plumbing' ? 'active' : ''} onClick={() => handleFAQClick('plumbing')}>What plumbing services do you offer?</li>
                      <li className={activeFAQ === 'electrician' ? 'active' : ''} onClick={() => handleFAQClick('electrician')}>Do you provide electrician services for commercial properties?</li>
                      <li className={activeFAQ === 'painting' ? 'active' : ''} onClick={() => handleFAQClick('painting')}>Can you help with both interior and exterior painting?</li>
                      <li className={activeFAQ === 'carpentry' ? 'active' : ''} onClick={() => handleFAQClick('carpentry')}>What types of carpentry work do you handle?</li>
                      <li className={activeFAQ === 'hvac' ? 'active' : ''} onClick={() => handleFAQClick('hvac')}>Do you provide HVAC maintenance services?</li>
                      <li className={activeFAQ === 'gardening' ? 'active' : ''} onClick={() => handleFAQClick('gardening')}>What gardening and landscaping services do you offer?</li>
                      <li className={activeFAQ === 'security' ? 'active' : ''} onClick={() => handleFAQClick('security')}>Can you install home security systems?</li>
                    </ul>
                    {activeFAQ && (
                      <div className="faq-answer">
                        {activeFAQ === 'scheduling' && (
                          <p>
                            To schedule a repair service, you can visit our website or call us at 1-800-123-4567. We offer a variety of appointment slots to fit your schedule.
                          </p>
                        )}
                        {activeFAQ === 'payment' && (
                          <p>We accept all major credit cards, debit cards, and PayPal for your convenience.</p>
                        )}
                        {activeFAQ === 'warranty' && (
                          <p>
                            Yes, we offer a limited warranty on all repairs. Please refer to our warranty policy for more details. (Link to warranty policy)
                          </p>
                        )}
                        {activeFAQ === 'applianceRepairs' && (
                          <p>We repair a wide range of appliances including refrigerators, washing machines, ovens, and more.</p>
                        )}
                        {activeFAQ === 'plumbing' && (
                          <p>Our plumbing services include fixing leaks, unclogging drains, installing fixtures, and more.</p>
                        )}
                        {activeFAQ === 'electrician' && (
                          <p>Yes, we provide electrician services for both residential and commercial properties.</p>
                        )}
                        {activeFAQ === 'painting' && (
                          <p>We offer both interior and exterior painting services to meet your needs.</p>
                        )}
                        {activeFAQ === 'carpentry' && (
                          <p>Our carpentry work includes custom furniture, cabinetry, shelving, and more.</p>
                        )}
                        {activeFAQ === 'hvac' && (
                          <p>Yes, we provide comprehensive HVAC maintenance services to keep your system running smoothly.</p>
                        )}
                        {activeFAQ === 'gardening' && (
                          <p>We offer a range of gardening and landscaping services including lawn care, planting, and garden design.</p>
                        )}
                        {activeFAQ === 'security' && (
                          <p>Yes, we can install and maintain home security systems to keep your property safe.</p>
                        )}
                      </div>
                    )}
                  <div className="feedback">
                      <h3>Were these helpful?</h3>
                      {!feedbackGiven ? (
                        <>
                          <button onClick={() => handleFeedback('Yes')}>Yes</button>
                          <button onClick={() => handleFeedback('No')}>No</button>
                        </>
                      ) : (
                        <p className="feedback-message">Thank you for your feedback!</p>
                      )}
                    </div>


                    <h3>Contact Us</h3>
          <p>Grand Central Office Park<br />
                Opposite Grand Central International Airport<br />
                49 New Road, Midrand<br /> +27 064 897 3566 | info@myrepairs.com</p>
            
        </div>
      </div>
     
      </div>
      </div>
      
    )}

</div> 
      </main>



      <style jsx>{`
.feedback {
  margin-top: 30px;
  padding: 15px;
  background-color: #ffffff;
  border: 1px solid #e0e0e0;
  border-radius: 5px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.feedback h3 {
  color: #333333;
  margin-bottom: 20px;
  font-size: 20px;
}

.feedback button {
  background-color: #ff4081;
  color: white;
  border: none;
  padding: 10px 20px;
  margin: 0 10px;
  cursor: pointer;
  border-radius: 5px;
  transition: background-color 0.3s ease;
}

.feedback button:hover {
  background-color: #e6366e;
}

.feedback-message {
  margin-top: 20px;
  color: #333333;
}


      .faq-answer p {
        margin: 0;
        background-color:  #ff0068;
      }
      

.help-content li.active {
  background-color: #f1f1f1;
  border-left: 4px solid #ff4081;
}

.faq-answer {
  margin-top: 20px;
  padding: 15px;
  
  border:  1px solid #e0e0e0;
    border-radius: 5px;
    line-height: 1.6;
    background-color:  #ff0068;
  }

      .help-content li {
        padding: 10px 15px;
        margin-bottom: 10px;
        background-color: #f9f9f9;
        border: 1px solid #e0e0e0;
        border-radius: 5px;
        cursor: pointer;
        transition: background-color 0.3s ease;
      }
      
      .help-content li:hover {
        background-color: #f1f1f1;
      }

.help-content ul {
  list-style-type: none;
  padding: 0;
}

.help-content p {
  margin-bottom: 20px;
  color: #333333;
  line-height: 1.6;
}

.help-content h3 {
  color: #333333;
  margin-bottom: 15px;
  font-size: 20px;
}

.help-content {
  padding: 20px;
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.help-content h2 {
  color: #ff4081;
  margin-bottom: 20px;
  font-size: 24px;
}



      
.dashboard-container {
  display: flex;
  height: 100vh;
  font-family: 'Arial', sans-serif;
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
      

      .ScrollableContainer {
        max-height: 80vh;
        overflow-y: auto;
      }
      
      .Dash-Container {
        padding: 20px;
        background: #fff;
        border-radius: 10px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
      }
      
      .Dash-Container section {
        margin-bottom: 20px;
      }
      
      .Dash-Container button {
        background-color: #ff0068;
        color: #fff;
        border: none;
        padding: 10px 20px;
        border-radius: 5px;
        cursor: pointer;
        margin-right: 10px;
      }
      
      .Dash-Container button:hover {
        background-color: #ff4d94;
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




