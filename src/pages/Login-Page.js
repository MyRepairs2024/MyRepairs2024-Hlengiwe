// HowItWorksContent.js
import React from 'react';

const HowItWorksContent = () => {
  return (

    
    <div className='how-it-works-details'>
        <div className="logo">
          <img src="/logo-w.png" alt="My Repairs" style={styles.logo} />
        </div>
    
      <h2 className="heading-with-lines">How It Works</h2>
      <div className='phase'>
        <div className='step'>
          <div className='icon-area'>
            <h3 className='step-heading'>Step 1</h3>
            <img src='/tv-pink.png' alt='Step 1' />
          </div>
          <div className='step-description'>
            <p className='description'>Select Your Appliance</p>
          </div>
          <div className='step-instructions'>
            <p>Choose the appliance that needs to be repaired or serviced</p>
          </div>
        </div>

        <div className='step'>
          <div className='icon-area'>
            <h3 className='step-heading'>Step 2</h3>
            <img src='/logotv.png' alt='Step 2' />
          </div>
          <div className='step-description'>
            <p className='description'>Select An Appliance Brand or Manufacturer</p>
          </div>
          <div className='step-instructions'>
            <p>Select the brand or manufacturer of your appliance.</p>
          </div>
        </div>

        <div className='step'>
          <div className='icon-area'>
            <h3 className='step-heading'>Step 3</h3>
            <img src='/tv-pink.png' alt='Step 3' />
          </div>
          <div className='step-description'>
            <p className='description'>Select Your Appliance</p>
          </div>
          <div className='step-instructions'>
            <p>Select the problem from the dropdown.</p>
          </div>
        </div>
      </div>

      <div className='phase'>
        <div className='step'>
          <div className='icon-area'>
            <h3 className='step-heading'>Step 4</h3>
            <img src='/calendar.png' alt='Step 4' />
          </div>
          <div className='step-description'>
            <p className='description'>Select the preferred date and time for the repair</p>
          </div>
          <div className='step-instructions'>
            <p>Select the date and time slot to get the repair or servicing done at your convenience.</p>
          </div>
        </div>

        <div className='step'>
          <div className='icon-area'>
            <h3 className='step-heading'>Step 5</h3>
            <img src='/quote.png' alt='Step 5' />
          </div>
          <div className='step-description'>
            <p className='description'>Servicing/Repair Request for a quotation sent</p>
          </div>
          <div className='step-instructions'>
            <p>Select the brand or manufacturer of your appliance.</p>
          </div>
        </div>

        <div className='step'>
          <div className='icon-area'>
            <h3 className='step-heading'>Step 6</h3>
            <img src='/rocket.png' alt='Step 6' />
          </div>
          <div className='step-description'>
            <p className='description'>Get a quotation from trusted service providers</p>
          </div>
          <div className='step-instructions'>
            <p>Get a quote, schedule an appointment, and securely pay a call-out fee.</p>
          </div>
        </div>
      </div>
      <footer className='final-section'>
        <div className='home-footer'>
          <div className='footer-logo'>
            <img src='/logo-w.png' alt='Logo' style={{ width: '100px', height: 'auto' }} />
          </div>
          <div className='footer-info'>
            <div className='footer-address'>
              <p>Grand Central Office Park<br />
                Opposite Grand Central International Airport<br />
                49 New Road, Midrand<br /> +27 064 897 3566 | info@myrepairs.com</p>
            </div>
            <div className='footer-links'>
              <label>Links</label>
              <ul className='footer-list'>
                <li><a href='/'>Home</a></li>
                <li><a href='/provider_homepage'>Become A Partner</a></li>
                <li><a href='/Apps'>Apps</a></li>
                <li><a href='/ContactUs'>Contact us</a></li>
              </ul>
            </div>
            <div className='footer-links'>
              <label>Information</label>
              <ul className='footer-list'>
               <li> <a href='/PrivacyPolicy'>Privacy Policy</a></li>
                <li><a href='/TermsAndConditionsModal'>TermsAndConditionsModal</a></li>
               <li> <a href='/Disclaimer'>Disclaimer</a></li>
               <li> <a href='/Cancellation'>Cancellation</a></li>
                <li><a href='/RefundAndReturn'>Return And Refund</a></li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
      <style jsx>{`
       .how-it-works {
          text-align: center;
          margin-top: 20px;
        }

        .heading-with-lines {
          display: inline-block;
          position: relative;
          font-size: 24px;
          color: #333;
        }

        .heading-with-lines:before,
        .heading-with-lines:after {
          content: '';
          position: absolute;
          top: 50%;
          width: 50px;
          height: 2px;
          background-color: #ddd;
        }

        .heading-with-lines:before {
          left: -60px;
        }

        .heading-with-lines:after {
          right: -60px;
        }

        .how-it-works-details {
          margin: 20px auto;
          padding: 20px;
          max-width: 1200px;
          background-color: #fff;
          border-radius: 8px;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        }

        .phase {
          display: flex;
          justify-content: space-around;
          margin-top: 20px;
          flex-wrap: wrap;
        }

        .step {
          flex: 1 1 calc(33% - 20px);
          margin: 10px;
          padding: 20px;
          border: 1px solid #ddd;
          border-radius: 8px;
          background-color: #f9f9f9;
          text-align: center;
        }

        .step h3 {
          font-size: 20px;
          color: #ff0066;
          margin-bottom: 10px;
        }

        .step img {
          width: 80px;
          height: 80px;
        }

        .description {
          font-size: 16px;
          font-weight: bold;
          margin-top: 10px;
          color: #555;
        }

        .step-instructions {
          margin-top: 10px;
        }

        .step-instructions p {
          font-size: 14px;
          color: #777;
        }

        .final-section {
          background-color: #333;
          color: #fff;
          padding: 40px 0;
          text-align: center;
        }

        .home-footer {
          display: flex;
          justify-content: space-around;
          flex-wrap: wrap;
          max-width: 1200px;
          margin: 0 auto;
        }

        .footer-logo {
          flex: 1;
        }

        .footer-info {
          flex: 2;
          display: flex;
          justify-content: space-around;
          flex-wrap: wrap;
        }

        .footer-address {
          flex: 1;
          margin: 10px;
          font-size: 14px;
        }

        .footer-links {
          flex: 1;
          margin: 10px;
        }

        .footer-links label {
          font-size: 16px;
          font-weight: bold;
          margin-bottom: 10px;
          display: block;
        }

        .footer-list {
          list-style: none;
          padding: 0;
        }

        .footer-list li {
          margin: 5px 0;
        }

        .footer-list a {
          color: #fff;
          text-decoration: none;
        }

        .footer-list a:hover {
          text-decoration: underline;
        }
      `}</style>
    </div>
  );
};

export default HowItWorksContent;
const styles = {
  logoContainer: {
    position: 'absolute',
    top: '10px',
    left: '10px',
    zIndex: 1,
  },
  
  logo: {
    width: '170px', // £djusted logo width
    height: 'auto', // Adjusted logo height to maintain aspect ratio
    borderRadius: '50%',
    backgroundColor: '#ff0066'
  },
  }



