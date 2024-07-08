import React, { useState } from 'react';

const Disclaimer = () => {
  const handleCloseModal = () => {
    
    window.location.href = '/';
    
  };
  return (
    <div style={styles.container}>
      <div className="logo">
          <img src="/logo-w.png" alt="My Repairs" style={styles.logo} />
        </div>
    
      <div className="disclaimer-container">
      <h1>Disclaimer</h1>
      <p>
        Welcome to MyRepairs. If you continue to browse and use this website, you are agreeing to comply with and be bound by the following terms and conditions of use, which together with our privacy policy govern our relationship with you in relation to this website.
      </p>
      <p>
        The term 'MyRepairs' or 'us' or 'we' refers to the owner of the website. The term 'you' refers to the user or viewer of our website.
      </p>
      <p>
        The use of this website is subject to the following terms of use:
      </p>
      <ol>
        <li>The content of the pages of this website is for your general information and use only. It is subject to change without notice.</li>
        <li>This website uses cookies to monitor browsing preferences. If you do allow cookies to be used, the following personal information may be stored by us for use by third parties.</li>
        <li>Neither we nor any third parties provide any warranty or guarantee as to the accuracy, timeliness, performance, completeness, or suitability of the information and materials found or offered on this website for any particular purpose. You acknowledge that such information and materials may contain inaccuracies or errors, and we expressly exclude liability for any such inaccuracies or errors to the fullest extent permitted by law.</li>
        <li>Your use of any information or materials on this website is entirely at your own risk, for which we shall not be liable. It shall be your own responsibility to ensure that any products, services, or information available through this website meet your specific requirements.</li>
        <li>This website contains material which is owned by or licensed to the service provider. This material includes, but is not limited to, the design, layout, look, appearance, and graphics. Reproduction is prohibited other than in accordance with the copyright notice, which forms part of these terms and conditions.</li>
        <li>All trademarks reproduced in this website, which are not the property of, or licensed to the operator, are acknowledged on the website.</li>
        <li>Unauthorised use of this website may give rise to a claim for damages and/or be a criminal offence.</li>
        <li>From time to time, this website may also include links to other websites. These links are provided for your convenience to provide further information. They do not signify that we endorse the website(s). We have no responsibility for the content of the linked website(s).</li>
        </ol>
      <button onClick={handleCloseModal}>Close</button>
    </div>

      <style jsx>{`
        body {
          background-color: #f0f0f0; /* Light grey background */
          margin: 0;
          padding: 0;
          font-family: Arial, sans-serif;
        }
      .disclaimer-container {
        max-width: 450px;
        max-height:1000px;
        margin: 50px auto;
        padding: 50px;
        background-color: #40E0D0;
        color:#000;
        font-size:14.5px;
      }

  
    
    
      
      .disclaimer-container h1 {
        font-size: 30px;
        margin-bottom: 20px;
      }
      
      .disclaimer-container p {
        margin-bottom: 10px;
        line-height: 1.5;
      }
      
      .disclaimer-container button {
        margin-top: 20px;
        padding: 10px 20px;
        background-color: #007bff;
        color: #fff;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        transition: background-color 0.3s ease;
      }
      
      .disclaimer-container button:hover {
        background-color: #0056b3;
      }
      
      `}</style>
    </div>
  );
};

const styles = {
  container: {
    textAlign: 'center',
    marginTop: '50px',
    backgroundColor: '#ff0068',
    color: '#fff',
    fontSize: '14px',
    fontFamily: 'Arial',
    padding: '20px',
    borderRadius: '10px',
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
  input: {
    width: '200px',
    padding: '12px',
    marginBottom: '10px',
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
    cursor: 'pointer',
    textAlign: 'center',
    width: '150px',
    margin: '20px auto',
    borderRadius: '20px',
  },
  message: {
    marginTop: '20px',
    color: 'white',
  },
  links: {
    color: '#fff',
    marginTop: '10px',
  },
  backLink: {
    cursor: 'pointer',
    textDecoration: 'underline',
  },
};

export default Disclaimer;
