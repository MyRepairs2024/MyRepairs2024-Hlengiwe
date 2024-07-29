import React from 'react';
import { useState, useEffect } from 'react';
import {
  FaHome,
  FaUser,
  FaEnvelope,
  FaFileInvoice,
  FaBell,
  FaCalendarAlt,
 
  FaMoneyBill,
  FaChartLine,
  FaExchangeAlt,
} from 'react-icons/fa';
import Dashheader from './components/dashheader2';
import axios from 'axios';
import { Products } from './components/services';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://hpavlbqbspludmrvjroo.supabase.co';
const supabaseApiKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhwYXZsYnFic3BsdWRtcnZqcm9vIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTAyNzcwODIsImV4cCI6MjAwNTg1MzA4Mn0.HZXbPikgoL0V7sYj7xNPj0FUupXd8hx1JdMrixvq7Xw';

const supabase = createClient(supabaseUrl, supabaseApiKey);


const UserDashboard = () => {
  const [services, setServices] = useState([]);
  const firstTenServices = services.slice(0, 10);
  const [activeTab, setActiveTab] = useState('overview');
  const[activeTab2, setActiveTab2] = useState('dashboard');
  const [userData, setUserData] = useState(null);
  const [expandedServicesDone, setExpandedServicesDone] = useState(false);
  const [expandedPendingServices, setExpandedPendingServices] = useState(false);
  const [expandedRewards, setExpandedRewards] = useState(false);
  const [servicesDoneProgress, setServicesDoneProgress] = useState(0);
  const [pendingServicesProgress, setPendingServicesProgress] = useState(0);
  const [rewardsProgress, setRewardsProgress] = useState(0);
  const [selectedTab, setSelectedTab] = useState('dashboard');

  const [formData, setFormData] = useState({
    businesstype: '',
    providertype: '',
    name: '',
    surname: '',
    contactnumber: '',
    address: '',
    licenses: '',
    communication: '',
    experience: '',
    insurance: '',
    workquality: '',
   
  });

 


    const [selectedFiles, setSelectedFiles] = useState([]);
  
    const handleFileInputChange = (event) => {
      setSelectedFiles(Array.from(event.target.files));
    };
    

  const handleFileUpload = async () => {
    if (selectedFiles.length === 0) return;

    try {
      for (const file of selectedFiles) {
        const storageResponse = await supabase.storage
          .from('ProviderUserinfo') // Replace 'folder-name' with your desired folder name
          .upload(file.name, file);

        console.log('File uploaded successfully:', storageResponse.Key);
      }
    } catch (error) {
      console.error('Error uploading file:', error.message);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formDataUpperCase = {
      ...formData,
      businesstype: formData.businesstype.toUpperCase(),
      providertype: formData.providertype.toUpperCase(),
      // Convert other form fields to uppercase if needed
    };
  
    console.log('Submit button clicked');

    try {
      
      await axios.post('/api/formsubmit', formData); // Replace with your API endpoint URL
      console.log('Form data submitted successfully');
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  

  

  useEffect(() => {


    // Remove default body margin
    document.body.style.margin = '0';
    axios.get('/api/services') // Replace '/api/services' with your API endpoint URL
      .then(response => setServices(response.data))
      .catch(error => console.error('Error fetching services:', error));

      if (localStorage.getItem('token')) {
        axios.get('/api/login/user', { // Replace '/api/login/user' with the appropriate URL for user data retrieval
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        })
        .then(response => setUserData(response.data.user))
        .catch(error => console.error('Error fetching user data:', error));
      }
 
  }, []);

  const handleTabChange2 = (tab1) => {
    setActiveTab2(tab1);
    if (selectedTab === tab1) {
      setSelectedTab('');
      
    } else {
      setSelectedTab(tab1);
    }
  };

  
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };
  return (

    <div className="dashboard-container">
        
      <div className='mainpage'>
        {activeTab2 === 'dashboard' &&(
          <div>
      <Dashheader />
      <hr/>




      <nav className='maindash'>
          <a href="#" onClick={() => handleTabChange('overview')}>Updates</a>
          <a href="#" onClick={() => handleTabChange('services')}>Reviews</a>
          <a href="#" onClick={() => handleTabChange('accounts')}>Account</a>
        </nav>
        {activeTab === 'overview' && (
          <div className='Dash-Container'>
         <div className="metrics">
  <div className={`servicesdone ${expandedServicesDone ? 'expanded' : ''}`} onClick={() => setExpandedServicesDone(!expandedServicesDone)}>
    <h3>Total Providers</h3>
    <div className="progress-circle">
      <progress className="circle-progress" value={servicesDoneProgress} max="100"></progress>
      <span>{servicesDoneProgress}%</span>
    </div>
  </div>

  <div className={`pendingservices ${expandedPendingServices ? 'expanded' : ''}`} onClick={() => setExpandedPendingServices(!expandedPendingServices)}>
    <h3>Revenue</h3>
    <div className="progress-circle">
      <progress className="circle-progress" value={pendingServicesProgress} max="100"></progress>
      <span>{pendingServicesProgress}%</span>
    </div>
  </div>

  <div className={`Rewards ${expandedRewards ? 'expanded' : ''}`} onClick={() => setExpandedRewards(!expandedRewards)}>
    <h3>Emails</h3>
    <div className="progress-circle">
      <progress className="circle-progress" value={rewardsProgress} max="100"></progress>
      <span>{rewardsProgress}%</span>
    </div>
  </div>
</div>

<table>
    <caption>Recent Providers</caption>
    <thead>
      <tr>
        <th>Date</th>
        <th>Email</th>
        <th>Total Sales</th>
        <th>Income</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
      </tr>
      <tr>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
      </tr>
      <tr>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
      </tr>
      <tr>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
      </tr>
      <tr>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
      </tr>
      <tr>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
      </tr>
      <tr>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
      </tr>
     
    </tbody>
  </table>

  
        
            
          </div>

          
        )}
       
        {activeTab === 'services' && (
         
<div style={{ height: '400px', overflow: 'auto', width: '900px', padding: '30px', marginLeft: '40px'}}>
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', // Adjust the minmax values as needed
        gap: '20px',
        '@media (min-width: 768px)': {
          gridTemplateColumns: 'repeat(3, 1fr)'
        }
      }}
    >       {firstTenServices.map((service) => (
      <Products key={service.id} service={service} />
    ))}
      </div>
      
      </div>
        )}
       
        {activeTab === 'accounts' && (
          <div>
            {/* Add content for the Accounts tab here */}
          </div>
        )}
        
        {activeTab === 'payments' && (
          <div>
            {/* Add content for the Payments tab here */}
          </div>
        )}

    </div>
        )}

{activeTab2 === 'profile' &&(<div className='mainpage'>


      <Dashheader />
      <hr />
      <div className='registration-form'>
      <form onSubmit={handleSubmit} >

        <div className='contact_details'>
            <h2>Contact Details</h2>
  <label>
   Business or Freelancer?*<br /><br />
    <select
      name="businesstype"
      onChange={handleChange}
      value={formData.businesstype}
      required
    >
      <option value="">None</option>
      <option value="BUSINESS">BUSINESS</option>
      <option value="FREELANCER">FREELANCER</option>
    </select>
  </label>
  <br />
  <br />

  <label>
  Provider Type*<br /><br />
  <select
    name="providertype"
    onChange={handleChange}
    value={formData.providertype}
    required
  >
    <option value="">Provider Type</option>
    <option value="APPLIANCE_REPAIR">APPLIANCE_REPAIR</option>
    <option value="PLUMBER">PLUMBER</option>
    <option value="ELECTRICIAN">ELECTRICIAN</option>
    <option value="HVAC_TECHNICIAN">HVAC_TECHNICIAN</option>
    <option value="CARPENTER">CARPENTER</option>
    <option value="PAINTER">PAINTER</option>
    <option value="ROOFER">ROOFER</option>
    <option value="FLOORING_SPECIALIST">FLOORING_SPECIALIST</option>
    <option value="LOCKSMITH">LOCKSMITH</option>
    <option value="PEST_CONTROL_EXPERT">PEST_CONTROL_EXPERT</option>
    <option value="GARDENING_LANDSCAPING_PROFESSIONAL">GARDENING_LANDSCAPING_PROFESSIONAL</option>
    <option value="HOME_SECURITY_INSTALLER">HOME_SECURITY_INSTALLER</option>
    <option value="WINDOW_DOOR_INSTALLER">WINDOW_DOOR_INSTALLER</option>
    <option value="HANDYMAN">HANDYMAN</option>
    <option value="CLEANING_JANITORIAL">CLEANING_JANITORIAL</option>
  </select>
</label>
<br /><br />


  <label>
  Name*<br /><br />
  <input
      type='text'
      name="name"
      onChange={handleChange}
      value={formData.name}
      required
   />
  </label>
  <br />
  <br />
  
  <label>
   Surname*<br /><br />
  <input
      type='text'
      name="surname"
      onChange={handleChange}
      value={formData.surname}
      required
   />
  </label>
  <br />
  <br />

  <label>
   Contact Number*<br /><br />
  <input
      type='text'
      name="contactnumber"
      onChange={handleChange}
      value={formData.contactnumber}
      required
   />
  </label>
  <br />
  <br />

  <label>
   Address?*<br /><br />
  <input

      type='text'
      name="address"
      onChange={handleChange}
      value={formData.address}
      required
   />
  </label>
  <br />
  <br />
  </div>

  <div className='screening_questions'>

    <h2>Screening Questions</h2>
  <label>
  Do you possess the necessary licenses and registrations required to provide repair services in your respective field?*<br /> <br />
  <textarea id="licenses"
    name="licenses"
    onChange={handleChange}
    value={formData.licenses}
    required></textarea>

  </label>
  <br />
  <br />
  <br />
  <label>
  What is your level of experience and expertise in performing repairs? Can you provide examples of similar repair projects you have successfully completed?<br/><br/>
  <textarea id="experience" name="experience"  onChange={handleChange}
    value={formData.experience} required></textarea>

  </label>
  <br />
  <br />
  <br />
  <label>
  Do you have insurance coverage, including liability insurance, to protect against potential damages or liabilities arising from your repair services (IF APPLICABLE)? <br/><br/>
      <textarea id="insurance" name="insurance"  onChange={handleChange}
    value={formData.insurance} required></textarea>

   
  </label>
  <br />
  <br />
  <br />

  
  <label>
  How do you ensure the quality of your repair work? Do you use genuine parts and materials?   <br/><br/>
  <textarea id="quality" name="workquality"  onChange={handleChange}
    value={formData.workquality} required></textarea>

  </label>
  <br />
  <br />
  <br />

  
  <label>
  How do you handle customer communication and address any post-repair issues or complaints? Can you provide examples of how you have resolved customer concerns in the past? <br/><br/>  
  <textarea id="customer_exp" name="communication"  onChange={handleChange}
    value={formData.communication} required></textarea>

  </label>
  <br />



  </div>

  <div className="uploads">
    <label>
      <h2>Important Files</h2>

      <p>ID/Driver_Licence Passport/</p>
      <input type="file" onChange={handleFileInputChange} />
      
      <p>Trading License/Registration</p>
      <input type="file" onChange={handleFileInputChange} />
      
      <p>Certifications/Qualifications</p>
      <input type="file" onChange={handleFileInputChange} />
      
      <p>Insurance</p>
      <input type="file" onChange={handleFileInputChange} />
      
      <p>Work History</p>
      <input type="file" onChange={handleFileInputChange} />
      

      <p>background Checks</p>
      <input type="file" onChange={handleFileInputChange} />
      
      <button onClick={handleFileUpload}>Upload File</button>
      
      </label>
    </div>

  
  <button type="submit" >Submit</button>
</form>

     
    </div>
  </div>
  )}
      </div>
    
      <div className="img-and-title">
        <div className='Profile'>
  <div className="profile-picture">
    <img src="mypic.png"/> 
      
    


  </div>
  <input className="profilpic" type="file"/>  
  </div>

</div>

<div className="dashboard-content">
<div className={`dashboard-section ${selectedTab === 'dashboard' ? 'active' : ''}`}
          onClick={() => handleTabChange2('dashboard')}>
          <div className="dashboard-section-header" >
            <FaHome className="dashboard-section-icon" />
            <h3 className="dashboard-section-title">Dashboard</h3>
          </div>
        </div>
        <h4>Data</h4>
        <div className={`dashboard-section ${selectedTab === 'profile' ? 'active' : ''}`}
          onClick={() => handleTabChange2('profile')}>
          <div className="dashboard-section-header"  >
            <FaUser className="dashboard-section-icon" />
            <h3 className="dashboard-section-title">Manage Providers</h3>
          </div>
          
        </div>
        <div className={`dashboard-section ${selectedTab === 'profile' ? 'active' : ''}`}
          onClick={() => handleTabChange2('profile')}>
          <div className="dashboard-section-header"  >
            <FaEnvelope className="dashboard-section-icon" />
            <h3 className="dashboard-section-title">Contact Information</h3>
          </div>
      
        </div>

        <div className={`dashboard-section ${selectedTab === 'profile' ? 'active' : ''}`}
          onClick={() => handleTabChange2('profile')}>
          <div className="dashboard-section-header"  >
            <FaFileInvoice className="dashboard-section-icon" />
            <h3 className="dashboard-section-title">Invoice Balances</h3>
          </div>
      
        </div>

        <h4>Pages </h4> 

        <div className={`dashboard-section ${selectedTab === 'profile' ? 'active' : ''}`}
          onClick={() => handleTabChange2('profile')}>
          <div className="dashboard-section-header"  >
            <FaBell className="dashboard-section-icon" />
            <h3 className="dashboard-section-title">Updates</h3>
          </div>
      
        </div>
        <div className={`dashboard-section ${selectedTab === 'profile' ? 'active' : ''}`}
          onClick={() => handleTabChange2('profile')}>
          <div className="dashboard-section-header"  >
            <FaCalendarAlt className="dashboard-section-icon" />
            <h3 className="dashboard-section-title">Calendar</h3>
          </div>
      
        </div>
        <div className={`dashboard-section ${selectedTab === 'profile' ? 'active' : ''}`}
          onClick={() => handleTabChange2('profile')}>
          <div className="dashboard-section-header"  >
            <FaUser className="dashboard-section-icon" />
            <h3 className="dashboard-section-title">Manage Team</h3>
          </div>
      
        </div>

        <h4>Analytics</h4>
        <div className={`dashboard-section ${selectedTab === 'profile' ? 'active' : ''}`}
          onClick={() => handleTabChange2('profile')}>
          <div className="dashboard-section-header"  >
            <FaMoneyBill className="dashboard-section-icon" />
            <h3 className="dashboard-section-title">Revenue Generated</h3>
          </div>
      
        </div>
        <div className={`dashboard-section ${selectedTab === 'profile' ? 'active' : ''}`}
          onClick={() => handleTabChange2('profile')}>
          <div className="dashboard-section-header"  >
            <FaChartLine className="dashboard-section-icon" />
            <h3 className="dashboard-section-title">Sales Chart</h3>
          </div>
      
        </div>
        <div className={`dashboard-section ${selectedTab === 'profile' ? 'active' : ''}`}
          onClick={() => handleTabChange2('profile')}>
          <div className="dashboard-section-header"  >
            <FaExchangeAlt className="dashboard-section-icon" />
            <h3 className="dashboard-section-title">Traffic</h3>
          </div>
      
        </div>
        
   


      </div>
 

    
      <style jsx>{`

      img{
        height: 150px;
        width: 150px;
        border-radius: 50%;
        object-fit: cover;
        background: #dfdfdf;
      }

table {
  border-collapse: collapse;
  width: 850px;
  margin-left: 30px;
  
  border-radius: 20px;
  margin-top: 20px;
  background-color: white;
  color: #ff0066;
  font-family: cursive;
}
th, td {
  border: 1px solid black;
  padding: 8px;
  text-align: left;
  height: 20px;
}
th {
  background-color: #ff0066;
  color: white;

}
tr:nth-child(even) {
  background-color: #f2f2f2;
}

caption {
  font-weight: bold;
  margin-bottom: 30px;
  position: relative;


}

.dashboard-section.active {
  font-weight: bold;
color: #ff0066;
  background-color:white;
 width: 220px;
 z-index: 99999;
  text-decoration: none;
  font-style: none;
  box-shadow: 0 0 10px white;
  

  .dashboard-section-header{
    color:#ff0066;
  }
  .dashboard-section-body{
    color:#fffdd0;
  }
  .dashboard-section-title{
    color: #ff0066;
  }

  

}

div::-webkit-scrollbar {
  width: 0.5em;
}

div::-webkit-scrollbar-track {
  background-color: transparent;
}

div::-webkit-scrollbar-thumb {
  background-color: transparent;
}

/* For Firefox */
@-moz-document url-prefix() {
  div {
    scrollbar-width: none;
  }
}

      h2{
        font-family: sans-serif;
margin: 30px auto;
text-align: center;
font-size: 20px;
max-width: 600px;
color: white;
position:relative;
      }

      h2:before{
        content: "";
display:block;
width: 140px;
height:2px;
background: white;
position: absolute;
left: 0;
top: 50%;
z-index: 1111;
      }

      h2:after{
        content: "";
display:block;
width: 140px;
height:2px;
background: white;
position: absolute;
right: 0;
top: 50%;
z-index: 1111;
      }

      h4{
        color: #ff0066;
        font-weight: bold;
        font-family: cursive;
        position:relative;
        font-size: 13px;
      }



      h4:after{
        content: "";
display:block;
width: 100px;
height:2px;
background: #ff0066;
position: absolute;
right: 10px;
top: 50%;
z-index: 1111;
      }

      

      .contact_details{
        background-color: #ff0066;
        padding: 10px;
        border-radius: 10px;
        margin-top: 10px;
        width: 830px;
        color: white;
      }
      .screening_questions{
        background-color: #ff0066;
        padding: 10px;
        border-radius: 10px;
        margin-top: 15px;
        width: 830px;
        color: white;
      }

      .uploads{
        background-color: #ff0066;
        padding: 10px;
        border-radius: 10px;
        margin-top: 15px;
        width: 830px;
        color: white;
      }
      .profile{
background-color: red;
      }
      select{
        width:250px;
        padding: 10px;
        font-weight: bold;
      }
      input{
       width: 400px;
        padding: 10px;
        border-radius: 10px;
       
      }
      textarea{
width: 400px;
padding: 10px;
border-radius: 10px;
      }
     .registration-form {
      
      display: flex;
      flex-direction: row;
      
      max-width: 850px;
      height: 460px;
      margin: 10px;
      margin-left: 80px;
      padding: 20px;
      color: #ff0066;
      font-weight: bold;
      background-color: white;
    
      border-radius: 8px;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
      overflow-y: auto; /* Add vertical scroll if content overflows */
     
    }
    
    .form-label {
      display: flex;
      flex-direction: column;
      margin-bottom: 15px;
      
      
    }
    
    .form-label select,
    .form-label textarea,
    .form-label input {
      padding: 10px;
      border: 1px solid #ccc;
      border-radius: 4px;
      font-size: 16px;
    }
    
    .submit-button {
      background-color: #007bff;
      color: white;
      border: none;
      border-radius: 4px;
      padding: 10px 20px;
      font-size: 16px;
      cursor: pointer;
    }
    
    .submit-button:hover {
      background-color: #0056b3;
    }
    
        .dashboard-container {
          position: fixed;
          padding: 20px;
          display: block;
          background-color: #454545;
          border: solid light-red 5px;
          width: 250px;
          height: 100vh;
          left: 0;
          top: 0px;
          
        }
    
        .profile{
          position: fixed;
          left: 4%;
          top: 3%;
          display: block;
          font-size: 12px;
          width: 120px;
          
         
        }

        .name{
          font-weight: bold;
          margin-left: 19px;
          font-family: cursive;
          color: #fffdd0;
       
         
          text-align: center;
        
        }

        .profile-picture {
         
          background-color: #454545;
          align-items: center;
          width: 80px; 
          height: 80px; /* Adjust the size as needed */
          border-radius: 50%; /* Makes it a circle */
          overflow: hidden; /* Clip the image to the circular boundary */
          margin: 0 auto; /* Center horizontally */
          margin-bottom: -10px;
          margin-top: 15px;
          margin-left: 25px;
          border: 2px solid #454545; /* Add a border for styling */
          box-shadow: 0 0 5px black;
        }
        
        .profile-picture img {
          align-items: center;
          position: relative;
          width: 100%;
          height: 100%;
          object-fit: cover; /* Maintain aspect ratio and cover the circle */
        }

        nav{
          height: 50px;
          width: 100%;
          display: flex;
          align-items: center;
          margin: auto;
          margin-top: 10px;
          margin-left: 50px;
      }
      a{
          position: relative;
          text-decoration: none;
          font-family: 'Poppins',sans-serif;
          color: #ff0066;
          font-weight: bold;
          font-size: 14px;
          letter-spacing: 0.5px;
          padding: 0 10px;
          margin-right: 20px;

      }
      a:after{
          content: "";
          position: absolute;
          background-color: #ff3c78;
          height: 3px;
          width: 0;
          left: 0;
          bottom: -10px;
          transition: 0.3s;
      }
      a:hover{
         
        
      }
      a:hover:after{
          width: 100%;
      }
       

     
        .img-and-title{
          display: flex;
          width: 250px;
          height: 100px;
          background-color: transparent;
          margin-bottom: 10px;
          justify-content: space-between;       
          position: inherit;
          top: 0;

        }
        .logo{
          height: 50px;
          position: fixed;
          top: 7%;
          left: 3%;
          border-radius: 50px;
          width: auto;
          background-color: none;
       
          

        }
        .img-and-title hr{
          border-top: 2px solid #fffdd0;
          border-bottom: 2px solid #fffdd0;
          margin-bottom: 20px;
          position: fixed;
          top: 21%;
          left: 0;
          width: 100%;
        }


    

        .dashboard-header {
          text-align: center;
          position: inherit;
          width: 250px;
          background-color: cream;

          
        }

        .dashboard-title {
          font-size: 14px;
          color: white;
          background-color: cream;
          height: 100px;
          margin-bottom: 20px;
          
        }

        .dashboard-content {
          display: block;
          grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
          grid-gap: 20px;
          width: 180px;
          left: 8px;
          position: inherit;
          top: 18%;
          font-weight: bold;
        
          
        }

       

        .dashboard-section {
          background-color: #ff0066;
          border-radius: 8px;
          display: block;
          height: 11px;
          margin-right: 15px;
          padding: 9px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          margin-bottom: 10px;
          color:  white;
        }

        .dashboard-section:hover{
          margin-right: 11px;
          box-shadow: 0px 0px 10px black;
          background-color: white;
         color: #ff0066;
          cursor: pointer;
          transition: background-color margin-right 1s;

          .dashboard-section-header{
            color:#ff0066;
          }
          .dashboard-section-body{
            color:#fffdd0;
          }
          .dashboard-section-title{
            color: #ff0066;
          }

        }


        .dashboard-section-header {
          display: flex;
          align-items: center;
          height: 12px;
          position: inherit;
        }

      

        .dashboard-section-title {
          font-size: 13px;
         margin-left: 10px;
          color:  white;
        }

        .dashboard-section-body {
         font-size: 12px;
         margin: 0;


position: relative;
          color:  #fffdd0;
        }
        .dashboard-section-body:hover{
          color: white;
        }

        .mainpage{
          width: 100%;
          height: 100vh;
          border-radius: 20px;
          background-color: white;
          left: 15%;
          position: fixed;
          top: 0px;
          z-index: 1111;
          box-shadow: 0 0 8px black;
          box-shadow: 0px 0px 5px white;
       overflow: hidden;
          display: block;

        }
        .mainpage hr{
          border-top: 2px solid #ff0066;
          border-bottom: 2px solid #ff0066;
          margin-bottom: 0px;
          margin-top: 120px;
          margin-left: 100px;
          width: 850px;
          border-radius: 10px;
          background: linear-gradient(to right, #21B6A8 , #ff0066);
        }

        .card{
          width: 20%;
          display: block;
          box-shadow: 2px 2px 20px black;
          border-radius: 5px; 
          margin: 2%;
          background-color: red;
         
         }
     
     .image img{
       width: 100%;
       border-top-right-radius: 5px;
       border-top-left-radius: 5px;
       
     
      
      }
     
     .title{
      
       text-align: center;
       padding: 10px;
       
      }
     
     h1{
       font-size: 20px;
      }
     
     .des{
       padding: 3px;
       text-align: center;
       padding-top: 10px;
       border-bottom-right-radius: 5px;
       border-bottom-left-radius: 5px;
     }
     button{
       margin-top: 40px;
       margin-bottom: 10px;
       background-color: #454545;
       color: pink;
       border: 1px solid black;
       border-radius: 5px;
       padding:10px;
     }
     button:hover{
       background-color: azure;
       color: #454545;
       transition: .5s;
       cursor: pointer;
     }

     .contentcard{
     
        display: grid;
        grid-template-columns: repeat(3, 1fr); /* Three columns */
        grid-gap: 20px; /* Gap between cards */
        margin-top: 20px; /* Adjust as needed */
        padding: 30px; /* Adjust as needed */
      background-color: #fffdd0;
      width: 900px;
      height: 300px;
    margin-top: 300px;
    margin-left: 60px;
    border-radius: 30px;
      transition: 0.1s linear;
      flex: 1;
      overflow: auto;
     }

     .metrics{
      width: 900px;
      background-color: none;
      border-radius: 20px;
      display: flex;
     justify-content: space-around;
     align-items: center;
    
      position: relative;
      
     }

     .progress-circle {
      position: relative;
      width: 60px;
      height: 60px;
      margin: 0 auto;
    }
    
    .circle-progress {
      width: 100%;
      height: 100%;
      border: 6px solid white; /* Adjust the border width and color */
      border-top-color: ; /* Set the color for the progress */
      border-radius: 50%;
      background: transparent;
      position: absolute;
      top: -50px;
      left: 40px;
      padding: 40px;
      transform: rotate(0deg);
      transform-origin: center;
    }
    
    .circle-progress::-webkit-progress-value {
      border-radius: 50%;
      background-color: transparent;
    }
    
    .circle-progress::-moz-progress-bar {
      border-radius: 50%;
      background-color: transparent;
    }
    
    .progress-circle span {
      position: absolute;
      font-size: 20px;
      top: -10%;
      
      left: 90px;
      transform: translate(-50%, -50%);
      font-weight: bold;
      color: white;
      
    }
    
   
     .servicesdone{
      padding:5px;
      padding-left: 8px;
    height: 100px;
    width: 230px;
    font-size: 15px;
font-weight: bold;
    color: white;
    border-radius: 20px;
    background-color:#ff0066;
box-shadow: 0px 0px 10px #454545;

     }
.pendingservices{
  padding:5px;
  padding-left: 8px;
  color: white;
  height: 100px;
  font-size: 14px;

  width: 230px;
  border-radius: 20px;
  background-color:#ff0066;
box-shadow: 0px 0px 10px #454545;
}
.Rewards{
  padding:5px;
  padding-left: 8px;
  color: white;
  font-size: 14px;
  height: 100px;
  width: 230px;
  border-radius: 20px;
  background-color:#ff0066;
  box-shadow: 0px 0px 10px #454545;
}

.Dash-Container{
  background-color: white;
  width: 900px;
  padding: 20px;
  margin-left: 40px;
  border-radius: 20px;
  height: 440px;

}
      `}</style>
    </div>
  );
};

export default UserDashboard;


//pink colours: #FF0040,#FF0066, #FF0078, #FA3980, #ffeba7, #ff3c78, #21B6A8