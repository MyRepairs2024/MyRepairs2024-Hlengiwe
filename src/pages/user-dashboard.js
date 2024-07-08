import React from 'react';
import { useState, useEffect } from 'react';
import { FaUser, FaEnvelope, FaStar, FaHome } from 'react-icons/fa';
import Dashheader from './components/dashheader';
import axios from 'axios';
import { Products } from './components/services';
import { createClient } from '@supabase/supabase-js';
import { useRouter } from 'next/router';
import ServiceDetail from './components/serviceorder';
import { useHistory } from 'react-router-dom';
import { IoWarningSharp } from 'react-icons/io5';
import { css } from "@emotion/react";
import { BarLoader } from "react-spinners";
import jsPDF from 'jspdf';
import { FaSearch } from 'react-icons/fa';
import { FaHeart } from 'react-icons/fa';
import { FaPaperPlane } from 'react-icons/fa';
import { FaSquare } from 'react-icons/fa';
import { CenterFocusStrong, Topic } from '@mui/icons-material';



{/*Const variable&methods*/}
const supabaseUrl = 'https://hpavlbqbspludmrvjroo.supabase.co';
const supabaseApiKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhwYXZsYnFic3BsdWRtcnZqcm9vIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTAyNzcwODIsImV4cCI6MjAwNTg1MzA4Mn0.HZXbPikgoL0V7sYj7xNPj0FUupXd8hx1JdMrixvq7Xw';
const supabase = createClient(supabaseUrl, supabaseApiKey);


const UserDashboard = () => {
   const router = useRouter();
  const { userEmail } = router.query;
  const firstLetter = userEmail ? userEmail.charAt(0).toUpperCase() : '';
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
  const [selectedService, setSelectedService] = useState(null);
  const [serviceTypeFilter, setServiceTypeFilter] = useState(''); // Filter by service type
  const [providerEmailFilter, setProviderEmailFilter] = useState(''); // Filter by provider email
  const [priceRangeFilter, setPriceRangeFilter] = useState(''); // Filter by price range
  const [locationFilter, setLocationFilter] = useState(''); // Filter by location
  const [filteredServices, setFilteredServices] = useState(services); // Store filtered services
const [availabilityFilter, setAvailabilityFilter] = useState('');
  const [pendingRequests, setPendingRequests] = useState(null);
const [isServicesDoneVisible, setIsServicesDoneVisible] = useState(false);
const [isPendingServicesVisible, setIsPendingServicesVisible] = useState(false);
const [isRewardsVisible, setIsRewardsVisible] = useState(false);
const [rewardsData, setRewardsData] = useState(null);
const [servicesDoneData, setServicesDoneData] = useState(null);
const [alertVisible, setAlertVisible] = useState(false);
const [receiptdata, setreceiptData] = useState([]);
const [editMode, setEditMode] = useState(false);
const [showPopupCleaning ,setShowPopupCleaning]=useState(false);
const [showPopupElectrician ,setShowPopupElectrician]=useState(false);
const [showPopupPainting ,setShowPopupPainting]=useState(false);
const [buttonText, setButtonText] = useState('Submit');
const [formSubmitted, setFormSubmitted] = useState(false);
const [isServiceDone]=useState(false);//initial state:service not done
const [requests, setRequests] = useState([]);

 
  const [isSubmitting, setIsSubmitting] = useState(false);
 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

function ServiceDone(){
  //logic toupdate the state(data recieved and arecieved data)
  const handleServiceDone =async ()=>{
    setIsServiceDone(true);
  };
return(
    <div> 
      {isServiceDone ? (
        <h3>Service done!</h3>
      ) : (
        <button onClick = {handleServiceDone}>Mark Service Done</button>
      )}
      </div>
  );
}

const handleButtonClick = (service) => {
  switch (service) {
    case 'cleaning':
      setShowPopupCleaning(true);
      break;
    case 'painting':
      setShowPopupPainting(true);
      break;
    case 'electrician':
      setShowPopupElectrician(true);
      break;
    default:
      break;
  }
};

// Function to toggle the visibility of the popups
const togglePopup = (popupName) => {
  switch (popupName) {
    case 'Cleaning':
      setShowPopupCleaning(!showPopupCleaning);
      break;
    case 'Painting':
      setShowPopupPainting(!showPopupPainting);
      break;
    case 'Electrician':
      setShowPopupElectrician(!showPopupElectrician);
      break;
    default:
      break;
  }
};


  const toggleEdit = () => {
    setEditMode(!editMode);
  };

const handleShowAlert = () => {
  setAlertVisible(true);
};

const handleCloseAlert = () => {
  setAlertVisible(false);
};

  const handleServiceClick = (service) => {
    setSelectedService(service);
  };

    const closeServiceDetail = () => {
    setSelectedService(null);
  };

  
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

  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
    const [selectedFile, setSelectedFile] = useState([]);
    const [imageUrl, setImageUrl] = useState(null);

    const searchServicesDone = async () => {
      // Perform the database query for services done here
      const { data, error } = await supabase
        .from('services_done') // Replace with your table name
        .select()
        .eq('user_email', userData.email); // Replace with the appropriate column name for the user's email
    
      if (error) {
        console.error('Error searching for services done:', error.message);
        return;
      }
    
      // Update the servicesDoneData state with the query result
      setServicesDoneData(data);
    };
    const UserDashboardDashboard = () => {
      return (
        <ResponsiveLayout>
          {/* Your customer dashboard content goes here */}
          <h1>Customer Dashboard</h1>
        </ResponsiveLayout>
      );
    }; 
    
    function searchFunction() {
      const searchTerm = document.getElementById("search-input").value;
      // Your search logic using the searchTerm variable
      console.log("Search term:", searchTerm);
    }

  
    
    const handleSuccessfulLogin = (email) => {
      setEmail(email); // Set the username in the state
    };
    const handleFileInputChange = (event) => {
      const file = event.target.files[0];
      setSelectedFile(file);
      if (file) {
        const imageUrl = URL.createObjectURL(file);
        setImageUrl(imageUrl);
      }
    };

    const uploadImage = async () => {
      if (!selectedFile) {
        console.error('No file selected.');
        return;
      }
  
      try {
        const file = selectedFile;
        const { data, error } = await supabase.storage.from('UserPictures').upload(file.name, file);
  
        if (data) {
          console.log('Image uploaded successfully:', data.Key);
  
          // Insert the image URL into your Supabase table
          const imageUrl = `${supabaseUrl}/storage/v1/uploads/${data.Key}`;
          await insertImageUrl(imageUrl);
  
          // Set the uploaded image URL in the state
          setImageUrl(imageUrl);
        } else {
          console.error('Error uploading image:', error);
        }
      } catch (error) {
        console.error('Error uploading image:', error.message);
      }
    };
    const insertImageUrl = async (imageUrl) => {
      try {
        const { data, error } = await supabase
          .from('UserProfile') // Replace with your table name
          .insert([
            {
              bio: imageUrl, // Replace with your column name for the image URL
            },
          ]);
  
        if (data) {
          console.log('Image URL inserted successfully.');
        } else {
          console.error('Error inserting image URL:', error);
        }
      } catch (error) {
        console.error('Error inserting image URL:', error.message);
      }
    };

  const handleFileUpload = async () => {
    if (selectedFile.length === 0) return;

    try {
      for (const file of selectedFile) {
        const storageResponse = await supabase.storage
          .from('ProviderUserinfo') // Replace 'folder-name' with your desired folder name
          .upload(file.name, file);

        console.log('File uploaded successfully:', storageResponse.Key);
      }
    } catch (error) {
      console.error('Error uploading file:', error.message);
    }
  };

  const handleLogout = () => {
    // Clear any authentication tokens or user data as needed
    localStorage.removeItem('token'); // Clear token or other data
  
    // Redirect the user to the landing page
    window.location.href = '/'; // Replace with the path of your landing page (index.js)
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await axios.post('http://localhost:3000/api/electrician-requests', formData);
      setFormSubmitted(true);
      alert('Request submitted successfully');

      // Reset form data after successful submission
      setFormData({
        name: '',
        email: '',
        serviceDate: '',
        description: ''
      });

      setButtonText('Close');
    } catch (error) {
      console.error('Error submitting request:', error);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const handleClose = () => {
    setShowPopupElectrician(false); // Assuming this is a state that controls the popup visibility
  };



  const handleFilter = () => {
    const filtered = services.filter((service) => {
      let isMatch = true;
  
      if (serviceTypeFilter && serviceTypeFilter !== service.serviceType) {
        isMatch = false;
      }
  
      if (providerEmailFilter && providerEmailFilter !== service.serviceProviderEmail) {
        isMatch = false;
      }
  
      if (priceRangeFilter) {
        const [minPrice, maxPrice] = priceRangeFilter.split('-').map(Number);
        const servicePrice = parseFloat(service.pricePerHour);
  
        if (isNaN(servicePrice) || servicePrice < minPrice || servicePrice > maxPrice) {
          isMatch = false;
        }
      }
  
      if (locationFilter && locationFilter !== service.location) {
        isMatch = false;
      }
  
      if (availabilityFilter && availabilityFilter !== service.availability) {
        isMatch = false;
      }
  
      return isMatch;
    });
  
    setFilteredServices(filtered);
  };

  const handleDownload = (rowId) => {
    // Find the selected receipt based on the rowId
    const selectedReceipt = receiptdata.find((row) => row.id === rowId);

    if (selectedReceipt) {
      const doc = new jsPDF();
      
      // Get the current date and format it
      const currentDate = new Date();
      const formattedDate = currentDate.toLocaleDateString();

      // Define the content for the PDF
      const content = `
        Receipt Details
        -----------------
             Description: ${selectedReceipt.service}
        Service Provider: ${selectedReceipt.pro_email}
              Total Paid: R${selectedReceipt.price}
              Invoice No: ${selectedReceipt.id}
                    Date: ${formattedDate}

        Thank you for your payment!

        -- MY REPAIRS --
        `;

      // Add the content to the PDF
      doc.text(content, 10, 10);

      // Save the PDF as a downloadable file
      doc.save(`Receipt_${selectedReceipt.id}.pdf`);
    }
  };
  
  
  React.useEffect(() => {
    if (formSubmitted) {
      alert('Request submitted successfully');
      setFormSubmitted(false);
    }
  }, [formSubmitted]);
  useEffect(() => {
    const fetchPendingRequests = async (userEmail) => {
      try {
        const response = await axios.get(`/api/pendingrequests?userEmail=${userEmail}`);
        setPendingRequests(response.data);
      } catch (error) {
        console.error('Error fetching pending requests:', error);
      }
    };

    const fetchReceipts = async (userEmail) => {
      try {
        const response = await axios.get(`/api/receipts?userEmail=${userEmail}`);
        setreceiptData(response.data);
      } catch (error) {
        console.error('Error fetching receipts:', error);
      }
    };

    document.body.style.margin = '0';
    axios.get('/api/services') // Replace '/api/services' with your API endpoint URL
      .then(response => setServices(response.data))
      .catch(error => console.error('Error fetching services:', error));

      if (localStorage.getItem('token')) {
        axios.get('/api/login/user', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        })
        .then(response => {
          console.log('User Data:', response.data);
          setUserData(response.data.user);
          handleSuccessfulLogin(response.data.user.email);
           
           
        })
        .catch(error => console.error('Error fetching user data:', error));
      }
      if (userEmail) {
        fetchPendingRequests(userEmail);
        fetchReceipts(userEmail); 
      }

      if (typeof window !== 'undefined') {
        setIconSize(window.innerWidth <= 768 ? 32 : 64);
      }

   
    }, [userEmail]);

    const handleTabChange2 = (tab1) => {
      if (selectedTab !== tab1) {
        setActiveTab2(tab1);
  
        // Only update the selected tab if it's different from the currently selected tab
        if (selectedTab === tab1) {
          setSelectedTab('');
        } else {
          setSelectedTab(tab1);
        }
      }
    };

 
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };
  const [iconSize, setIconSize] = useState(64);


  return (
<div className='UserDashboard'>
    <div className="dashboard-container">   
      <div className="img-and-title">
        <div className='Profile'>
          {imageUrl ? (
      // Display the uploaded image when it exists
      <img src={imageUrl} alt="Profile" className="profile-pic" />
    ) : (
      // Display the initial letter when no image is uploaded
      <div className="profile-pic">{firstLetter}</div>
    )}
        
  </div>
</div>


<div className='username'> 
<h4>{userEmail}</h4></div>

<div className='dashcontent'>
<div className="dashboard-content">
        
<div className={`dashboard-section ${selectedTab === 'dashboard' ? 'active' : ''}`}
          onClick={() => handleTabChange2('dashboard')}>
          <div className="dashboard-section-header" >
            <FaHome className="dashboard-section-icon" />
            <h3 className="dashboard-section-title">Dashboard</h3>
          </div>
          <div className='active_Tab'>
&gt;
</div>
        </div>
       
        <div className={`dashboard-section ${selectedTab === 'profile' ? 'active' : ''}`}
          onClick={() => handleTabChange2('profile')}>
          <div className="dashboard-section-header"  >
            <FaUser className="dashboard-section-icon" />
            <h3 className="dashboard-section-title">Profile</h3>
          </div>

          <div className='active_Tab'>
&gt;
</div>
        </div>
      

        <div className={`dashboard-section ${selectedTab === 'messaging' ? 'active' : ''}`} onClick={() => handleTabChange2('messaging')}>
          <div className="dashboard-section-header">
            <FaEnvelope className="dashboard-section-icon" />
            <h3 className="dashboard-section-title">Messages</h3>
          </div>
          <div className='active_Tab'>
&gt;
</div>
        </div>
        <div className={`dashboard-section ${selectedTab === 'favourites' ? 'active' : ''}`} onClick={() => handleTabChange2('favourites')}>
          <div className="dashboard-section-header">
            <FaStar className="dashboard-section-icon" />
            <h3 className="dashboard-section-title">Favorites</h3>
          </div>
          <div className='active_Tab'>
         &gt;
        </div>
        </div>
      </div>
      <div className='btn_logout'>
      <button className='logsout' onClick={handleLogout}>Log Out</button>
      </div>
      </div>
      </div>





      <div className='mainpage'>
      
        {expandedPendingServices && (
  <div className='overlay-container'>
    <div className="expanded-content">
      {pendingRequests === null ? ( // Check if pendingRequests is null (while loading)
        <div className="loading-spinner">
          <BarLoader color={"#36D7B7"} loading={true} size={150} />
          <p>Loading ...</p>
        </div>
      ) : pendingRequests.length > 0 ? (
        
        <div className='requestcard'>
          <h2 className='totalpendingreq'>Awaiting Approval ({pendingRequests.length})</h2>
          {pendingRequest && pendingRequests.length > 0 &&(
            <div className="alert-box">
            
       
          </div>
          )}


          <div className='pending_containers'>
            <div className='p_container1'>
              <h3>Services Description</h3>
              <hr className='hr_pendingservices'/>
              <p className='service_info'>No Service Info...</p>
              <hr className='hr_pendingservices'/>
              </div>
              <div className='p_container2'>
              <h3>Services Provider</h3>
              <hr className='hr_pendingservices'/>
              <div className='fetched_name'><strong><p className='Name'>Name:</p></strong><p style={{color: '#21B6A8', fontFamily: 'poppins', fontWeight: 'bold'}}>{pendingRequests.map(pendingrequest => pendingrequest.service)}</p></div>
              <div className='fetched_email'><strong><p className='Email'>Email:</p></strong><p style={{color: '#21B6A8', fontFamily: 'poppins', fontWeight: 'bold'}}>{pendingRequests.map(pendingrequest => pendingrequest.pro_email)}</p></div>
              <div className='fetched_contact'><strong><p className='Contact'>Contact</p></strong><p style={{color: '#21B6A8', fontFamily: 'poppins', fontWeight: 'bold'}}>{pendingRequests.map(pendingrequest => pendingrequest.pro_contact)}</p></div>
              <div className='fetched_address'><strong><p className='Address'>Address:</p></strong><p style={{color: '#21B6A8', fontFamily: 'poppins', fontWeight: 'bold'}}>{pendingRequests.map(pendingrequest => pendingrequest.pro_address)}</p></div>

              </div>
              <div className='p_container3'>
                <h3>Service Status</h3>
              <hr className='hr_pendingservices'/>
                <p className='status_message'>--- Awaiting Approval ---</p>
              <hr className='hr_pendingservices'/>
                <h3>Service Price</h3>
              <hr className='hr_pendingservices'/>
                <div  className='fetched_price'><p>R{pendingRequests.map(pendingrequest => pendingrequest.price)}</p></div>
              </div>
       
          </div>
        </div>
      ) : (
        <div className="no-pending-requests">
          No Pending Requests
        </div>
      )}
        <button className="closemetric" onClick={() => setExpandedPendingServices(false)}>
    Close
      </button>
    </div>
  </div>
)}






{/*pendingRequests ?()
   <ul className='pendingrequests'>
            {pendingRequests.map((pendingrequest, index) => (
              <li key={pendingrequest.id} className="pending-request">
                <strong>Provider Email:</strong> {pendingrequest.pro_email}<br/>
                <strong>Service:</strong> {pendingrequest.service}<br/>
                <strong>Price:</strong> {pendingrequest.price}
                <span className="request-index">{index + 1}</span>
              </li>
            ))}
          </ul> 
  ):(<p>Loading pending Requests</p>)}*/}




{expandedPendingServices && (
  <div className='overlay-container'>
    <div className="expanded-content">
      {pendingRequests ? (
        // Render the data for services done here
        <p>Services Done Data</p>
      ) : (
        
        // Render the "No Services Done" message
        <div className="no-data-message">
         
          No pending Services
        </div>
      )}
        <button className="closemetric" onClick={() => setExpandedPendingServices(false)}>
    Close
      </button>
    </div>
  </div>
)}


{expandedServicesDone && (
  <div className='overlay-container'>
    <div className="expanded-content">
      {servicesDoneData ? (
        // Render the data for services done here
        <p>Services Done Data</p>
      ) : (
        
        // Render the "No Services Done" message
        <div className="no-data-message">
         
          No Services Done
        </div>
      )}
        <button className="closemetric" onClick={() => setExpandedServicesDone(false)}>
    Close
      </button>
    </div>
  </div>
)}

{expandedRewards && (
  <div className='overlay-container'>
    <div className="expanded-content">
    
      {rewardsData ? (
        // Render the data for rewards here
        <p>Rewards Data</p>
      ) : (
        // Render the "No Rewards" message
        <div className="no-data-message">
          No Rewards
        </div>
      )}
      <button className="closemetric" onClick={() => setExpandedRewards(false)}>
        Close
      </button>
    </div>
  </div>
)}

      {selectedService && (
        <ServiceDetail
          service={selectedService}
          onClose={closeServiceDetail}
        />
      )}
      {activeTab2 === 'dashboard' &&(
       <div>
         <Dashheader />
  
      <nav className='maindash'>
         <a href="#" onClick={() => handleTabChange('overview')}>Overview</a>
         <a href="#" onClick={() => handleTabChange('services')}>Services</a>
         <a href="#" onClick={() => handleTabChange('accounts')}>Accounts</a>
         <a href="#" onClick={() => handleTabChange('payments')}>Payments</a>

   <div className="account-link">
          <div className="search-container">
          <input type="text" placeholder="Search..." className="search-input" />
          <a href="#" onClick={() => handleTabChange('accounts')}>
          <span className="search-symbol" role="img" aria-label="Search">&#128269;</span>
          </a>
     </div>
      </div>
</nav>

{/*Tab content*/}
{activeTab === 'overview' && (
          <div className='ScrollableContainer'> 
          <div className='Dash-Container'>
          <div className="metrics">
            
          <div className={`servicesdone ${expandedServicesDone ? 'expanded' : ''}`}
            onClick={() => setExpandedServicesDone(!expandedServicesDone)}>
   <div className='naming'>
    <h3>Service done</h3>
    </div>
      <div className="progress-circle">
      <progress className="circle-progress" value={pendingServicesProgress} max="100"></progress>
      <span>{pendingServicesProgress}%</span>
    </div>
    </div>
  
    <div className={`servicesdone ${expandedServicesDone ? 'expanded' : ''}`}
            onClick={() => setExpandedServicesDone(!expandedServicesDone)}>
   <div className='naming'>
    <h3>Pending Services</h3>
    </div>
      <div className="progress-circle">
      <progress className="circle-progress" value={pendingServicesProgress} max="100"></progress>
      <span>{pendingServicesProgress}%</span>
    </div>
    </div>

  {/*Point Container*/}
  <div className={`Rewards ${expandedRewards ? 'expanded' : ''}`}
   onClick={() => setExpandedRewards(!expandedRewards)}>
   <div className='naming'>
    <h3>Rewards</h3>
    </div>
    <div className="progress-circle">
      <progress className="circle-progress" value={rewardsProgress} max="100"></progress>
      <span>{rewardsProgress}%</span>
    </div>
  </div>
  </div>
</div>
  <div className='Dash-Container'>

    <div className="container">
        <div className="set">
        <div className='updates-Container'>
        <div className={{ display: 'flex' }}> 
           {/* Your SVG icon */}
           <div style={{ position: 'relative', width: 10, height: 10 }}>
              <div
                style={{
                  position: 'absolute',
                  top: -35,
                  left: 70,
                  width: 70,
                  height: 70,
                  backgroundColor: '#E71E5B',
                  borderRadius: '10%'
                }}
              />
  
  {/* Overlapping SVG image icon */}
  <div
                style={{
                  position: 'absolute',
                  top: -20,
                  left: 90,
                  zIndex: 1,
                }}
              >
    {/* Your SVG image icon code goes here */}
    <svg
                  width="30"
                  height="30"
                  xmlns=""
                  viewBox="0 0 24 24"
                  fill="#ffffff"
                >
      <path d="M0 0h24v24H0z" fill="none" />
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm3 14h-6v-2h6v2zm0-4h-6V7h6v5z" />
      </svg>
  </div>
</div>

         <FaPaperPlane className={{ color: '#007bff', fontSize: '1.3rem' }} />
         <FaStar style={{ color: 'E71E5B', fontSize: '1rem', marginLeft: '80px', marginBottom: '-30px' }} />
         <FaHeart style={{ color: 'E71E5B', fontSize: '1rem', marginInlineStart: '175px', marginBottom: '-2px' }} />
      </div>
         {/* Service Title */}
         <div className='serv'>
        <h2>Electrician</h2>
        </div>
         {/* Service Details */}
         <div style={{ borderTop: '1px solid #E71E5B', margin: '10px 0' }}>
            {/* Provider Email */}
            <p style={{ fontSize: '14px', color: '#E71E5B' }}>provider@gmail.com</p>
            <div style={{ borderTop: '1px solid #E71E5B', margin: '10px 0' }}>
              {/* Price */}
              <p style={{ fontSize: '14px', textAlign: 'center', color: '#E71E5B' }}>Price</p>
              <p style={{ fontSize: '20px', textAlign: 'center', fontFamily: 'Arial', color: '#E71E5B' }}><b>R500</b></p>
              {/* Schedule */}
              <p style={{ fontSize: '14px', textAlign: 'center', color: '#E71E5B' }}>Monday-Friday</p>
              {/* Request Service Button */}
              <div style={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
              <button
                  style={{
                    pointerEvents: 'auto',
                    color: 'white',
                    backgroundColor: '#E71E5B',
                    border: 'white'
                  }}
                  onClick={() => setShowPopupElectrician(true)}
                >
         Request Service
        </button>
      

 {/* Popup content electrician */}
 {showPopupElectrician && (
        <div className="popup-container">
          <div className="popup-content">
            <h2>Request Electrician Service</h2>
            <form onSubmit={buttonText === 'Submit' ? handleSubmit : handleClose}>
      <label>
                Name:
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </label>
              <label>
                Email:
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
              </label>
              <label>
                Service Date:
                <input
                  type="date"
                  name="serviceDate"
                  value={formData.serviceDate}
                  onChange={(e) => setFormData({ ...formData, serviceDate: e.target.value })}
                  required
                />
              </label>
              <label>
                Description:
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  required
                ></textarea>
              </label>
              <button type="submit" disabled={isSubmitting}>
              {buttonText}
              </button>
            </form>
            <button onClick={() => setShowPopupElectrician(false)}>Close</button>
          </div>
        </div>
      )}
</div>
         </div>
    </div>
</div>
</div>







      {/*Cleaning Container*/}
      <div className="set">
              <div className='updates-Container'>
              <div className={{ display: 'flex' }}> {/* Container element */}
              <div style={{ position: 'relative', width: 10, height: 10 }}>
  <div style={{
    position: 'absolute',
    top: -35,
    left: 70,
    width: 70,
    height: 70,
    backgroundColor: '#E71E5B',
    borderRadius: '10%'
  }} />
  
  {/* Overlapping SVG image icon */}
  <div style={{
    position: 'absolute',
    top: -20, // Adjust the top position as needed
    left: 90, // Adjust the left position as needed
    zIndex: 1, // Ensure the SVG is above the square shape
  }}>
    {/* Your SVG image icon code goes here */}
    <svg
      width="30"
      height="30"
      xmlns=""
      viewBox="0 0 24 24"
      fill="#ffffff"
    >
      <path d="M0 0h24v24H0z" fill="none" />
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm3 14h-6v-2h6v2zm0-4h-6V7h6v5z" />
    </svg>
  </div>
</div>
                <FaPaperPlane className={{ color: '#007bff', fontSize: '1.3rem' }} />
                <FaStar style={{ col0or: 'E71E5B', fontSize: '1rem',marginLeft: '80px',marginBottom:'-30px' }} />
                <FaHeart style={{ color: 'E71E5B', fontSize: '1rem',marginInlineStart:'175px',marginBottom:'-2px'}} />        
                </div>
                <div className='serv'>
           <h2> 
           Cleaning  </h2>
           </div>
           <div style={{borderTop: '1px solid #E71E5B', margin: '10px 0'}}>
        <p style={{ fontSize: '14px',color: '#E71E5B' }}>provider@gmail.com</p>
        <div style={{borderTop: '1px solid #E71E5B', margin: '10px 0'}}>
        <p style={{ fontSize: '14px', textAlign: 'center', color: '#E71E5B'}}>Price</p>
        <p style={{fontSize: '20px', textAlign: 'center',fontFamily: ' Arial',color: '#E71E5B' }}><b>R160</b></p>
       <p style={{ fontSize: '14px', textAlign: 'center',color: '#E71E5B' }}>Monday-Friday</p>
       <div style={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
      {/* Clickable Button */}
      <button style={{
         pointerEvents: 'auto', 
         color: 'white',
         backgroundColor:'#E71E5B',
         border:'none'
         }} 
         onClick={()=>setShowPopupCleaning(true)}
         >
             Request Service
        </button>
    </div>
        </div>
</div>
        
 {/* Popup content cleaning */}
 {showPopupCleaning && (
        <div className="popup-container">
          <div className="popup-content">
            <h2>Request Cleaning Service</h2>
            <form onSubmit={handleSubmit}>
              <label>
                Name:
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </label>
              <label>
                Email:
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </label>
              <label>
                Service Date:
                <input
                  type="date"
                  name="serviceDate"
                  value={formData.serviceDate}
                  onChange={handleChange}
                  required
                />
              </label>
              <label>
                Description:
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                ></textarea>
              </label>
              <button type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Submitting...' : 'Submit Request'}
              </button>
              </form>
            <button onClick={() => setShowPopupCleaning(false)}>Close Popup</button>
          </div>
        </div>
      )}
   </div>
   </div>



    {/*Painting container*/}
      <div className="set">  
            <div className='updates-Container'>    
            <div className={{ display: 'flex' }}> {/* Container element */}
            <div style={{ position: 'relative', width: 10, height: 10 }}>
  <div style={{
    position: 'absolute',
    top: -40,
    left: 70,
    width: 70,
    height: 70,
    backgroundColor: '#E71E5B',
    borderRadius: '10%'
  }} />
  
  {/* Overlapping SVG image icon */}
  <div style={{
    position: 'absolute',
    top: -20, // Adjust the top position as needed
    left: 90, // Adjust the left position as needed
    zIndex: 1, // Ensure the SVG is above the square shape
  }}>
    {/* Your SVG image icon code goes here */}
    <svg
      width="30"
      height="30"
      xmlns=""
      viewBox="0 0 24 24"
      fill="#ffffff"
    >
      <path d="M0 0h24v24H0z" fill="none" />
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm3 14h-6v-2h6v2zm0-4h-6V7h6v5z" />
    </svg>
  </div>
</div>
              <FaPaperPlane className={{ color: '#007bff', fontSize: '1.3rem' }} />
              <FaStar style={{ col0or: 'E71E5B', fontSize: '1rem',marginLeft: '80px',marginBottom:'-30px' }} />
              <FaHeart style={{ color: 'E71E5B', fontSize: '1rem',marginInlineStart:'175px',marginBottom:'-2px'}} />        
              </div> 
              <div className='serv'>
              <h2>  
              Painting</h2>
              </div>
              <div style={{borderTop: '1px solid #E71E5B', margin: '10px 0'}}>
       <p style={{ fontSize: '14px',color: '#E71E5B' }}>provider@gmail.com</p>
       <div style={{borderTop: '1px solid #E71E5B', margin: '10px 0'}}>
        <p style={{ fontSize: '14px', textAlign: 'center', color: '#E71E5B'}}>Price</p>
        <p style={{fontSize: '20px', textAlign: 'center',fontFamily: ' Arial',color: '#E71E5B' }}><b>R200</b></p>
        <p style={{ fontSize: '14px', textAlign: 'center',color: '#E71E5B' }}>Monday-Friday</p>
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
      {/* Clickable Button */}
      <button
       style={{ 
        pointerEvents: 'auto', 
        color: 'white',
        backgroundColor:'#E71E5B',
        border:'none' 
      }}
      onClick={()=> handleButtonClick('painting')}>
         Request Service
         </button>
    </div>
           </div>
         </div>

         
 {/* Popup content painting */}
 {showPopupPainting && (
         <div className="popup-container">
         <div className="popup-content">
           <h2>Request Electrician Service</h2>
           <form onSubmit={handleSubmit}>
             <label>
               Name:
               <input
                 type="text"
                 name="name"
                 value={formData.name}
                 onChange={handleChange}
                 required
               />
             </label>
             <label>
               Email:
               <input
                 type="email"
                 name="email"
                 value={formData.email}
                 onChange={handleChange}
                 required
               />
             </label>
             <label>
               Service Date:
               <input
                 type="date"
                 name="serviceDate"
                 value={formData.serviceDate}
                 onChange={handleChange}
                 required
               />
             </label>
             <label>
               Description:
               <textarea
                 name="description"
                 value={formData.description}
                 onChange={handleChange}
                 required
               ></textarea>
             </label>
             <button type="submit" disabled={isSubmitting}>
               {isSubmitting ? 'Submitting...' : 'Submit Request'}
               
 
             </button>
           </form>
           <button onClick={() => setShowPopupPainting(false)}>Close</button>
         </div>
       </div>
     )}
     </div>
   </div>
   </div>
   </div>
</div> 
        )}

        

{activeTab === 'services' && ( 
  <div className='ScrollableContainer2'>
<div className='services_tab'>
<div className='filters-search'>
  <div className='searchfilters'>
  <div className='emailfilters'>
  <div className='filter1'>
  <label>Service Types</label>
    <input
      className='filteremail'
      type="text"
      value={serviceTypeFilter}
      placeholder='Type'
      onChange={(e) => setServiceTypeFilter(e.target.value)}
    />
  </div>

  <div className='filter2'>
  <label>Provider Email</label>
    <input
      className='filteremail'
      type="text"
      value={providerEmailFilter}
      placeholder='Email'
      onChange={(e) => setProviderEmailFilter(e.target.value)}
    />
  </div>
  </div>
<div className='radiofilters'>
  <div className='filter3'>
    <label>Price Range</label>
    <select
      value={priceRangeFilter}
      onChange={(e) => setPriceRangeFilter(e.target.value)}
      className='custom-select'

    >
      <option value="">All</option>
      <option value="10-50">R10/hr to R50/hr</option>
      <option value="50-100">R50/hr to R100/hr</option>
      <option value="100-200">R100/hr to R200/hr</option>
    </select>
  </div>

  <div className='filter4'>
    <label>Location</label>
    <select
      value={locationFilter}
      onChange={(e) => setLocationFilter(e.target.value)}
      className='custom-select'
    >
      <option value="">All</option>
      <option value="Pretoria Central">Pretoria Central</option>
      <option value="Midrand">Midrand</option>
      <option value="Pretoria West">Pretoria West</option>
      <option value="Pretoria East">Pretoria East</option>
      <option value="Pretoria North">Pretoria North</option>
      <option value="Centurion">Centurion</option>
      <option value="Lynnwood">Lynnwood</option>
      <option value="Menlyn">Menlyn</option>
    </select>
  </div>


  </div>
  <div className='radiofilters2'>
  <div className='filter5'>
    <label>Availability</label>
<select
  value={availabilityFilter}
  onChange={(e) => setAvailabilityFilter(e.target.value)}
  className='custom-select'

>
  <option value="">All</option>
  <option value="Sunday - Saturday">Sunday - Saturday</option>
  <option value="Friday - Sunday">Friday - Sunday</option>
  <option value="Saturday - Sunday">Saturday - Sunday</option>
</select>

  </div>
  </div>
  </div>
  <button className='filterservices1' onClick={handleFilter}>Filter Services</button>

</div>
  <div className='my_services'>
    <div className='services_services'
   
    >  {filteredServices.map((service) => (
      <div
        key={service.id}
        className="productCard"
        onClick={() => handleServiceClick(service)}
      >
        <Products service={service} />
      </div>
    ))}
    </div>
    </div>
    </div>  


    <div className='Dash-Container2'>
       <div className="metrics2">                 
        
           <br/>
            
              <div className="container2">
        {/* First Set of Containers */}
        <div className="set2">
                <div className='updates-Container2'>
                <div className={{ display: 'flex' }}> {/* Container element */}
              <div style={{ position: 'relative', width: 10, height: 10 }}>
    <div style={{
      position: 'absolute',
      top: -40,
      left: 70,
      width: 70,
      height: 70,
      backgroundColor: '#E71E5B',
      borderRadius: '10%'
    }} />
    
    {/* Overlapping SVG image icon */}
    <div style={{
      position: 'absolute',
      top: -20, // Adjust the top position as needed
      left: 90, // Adjust the left position as needed
      zIndex: 1, // Ensure the SVG is above the square shape
    }}>
      {/* Your SVG image icon code goes here */}
      <svg
        width="30"
        height="30"
        xmlns=""
        viewBox="0 0 24 24"
        fill="#ffffff"
      >
        <path d="M0 0h24v24H0z" fill="none" />
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm3 14h-6v-2h6v2zm0-4h-6V7h6v5z" />
      </svg>
    </div>
  </div>
                <FaPaperPlane className={{ color: '#007bff', fontSize: '1.3rem' }} />
                <FaStar style={{ col0or: 'E71E5B', fontSize: '1rem',marginLeft: '80px',marginBottom:'-30px' }} />
                <FaHeart style={{ color: 'E71E5B', fontSize: '1rem',marginInlineStart:'175px',marginBottom:'-2px'}} />        
                </div> 
             <h2>
             Cleaning
             </h2>
             <div style={{borderTop: '1px solid #E71E5B', margin: '10px 0'}}>
          <p style={{ fontSize: '14px',color: '#E71E5B' }}>provider@gmail.com</p>
          <div style={{borderTop: '1px solid #E71E5B', margin: '10px 0'}}>
          <p style={{ fontSize: '14px', textAlign: 'center', color: '#E71E5B'}}>Price</p>
          <p style={{fontSize: '20px', textAlign: 'center',fontFamily: ' Arial',color: '#E71E5B' }}><b>R160</b></p>
          <p style={{ fontSize: '14px', textAlign: 'center',color: '#E71E5B' }}>Monday-Friday</p>
          </div>
        </div>
     </div>
     
     </div>
  
  
        {/* Second Set of Containers */}
        <div className="set2">
          <div className='updates-Container2'>
          <div className={{ display: 'flex' }}> {/* Container element */}
              <div style={{ position: 'relative', width: 10, height: 10 }}>
    <div style={{
      position: 'absolute',
      top: -40,
      left: 70,
      width: 70,
      height: 70,
      backgroundColor: '#E71E5B',
      borderRadius: '10%'
    }} />
    
    {/* Overlapping SVG image icon */}
    <div style={{
      position: 'absolute',
      top: -20, // Adjust the top position as needed
      left: 90, // Adjust the left position as needed
      zIndex: 1, // Ensure the SVG is above the square shape
    }}>
      {/* Your SVG image icon code goes here */}
      <svg
        width="30"
        height="30"
        xmlns=""
        viewBox="0 0 24 24"
        fill="#ffffff"
      >
        <path d="M0 0h24v24H0z" fill="none" />
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm3 14h-6v-2h6v2zm0-4h-6V7h6v5z" />
      </svg>
    </div>
  </div>
                <FaPaperPlane className={{ color: '#007bff', fontSize: '1.3rem' }} />
                <FaStar style={{ col0or: 'E71E5B', fontSize: '1rem',marginLeft: '80px',marginBottom:'-30px' }} />
                <FaHeart style={{ color: 'E71E5B', fontSize: '1rem',marginInlineStart:'175px',marginBottom:'-2px'}} />        
                </div> 
          <h2> Electrician</h2>
          <div style={{borderTop: '1px solid #E71E5B', margin: '10px 0'}}>
          <p style={{ fontSize: '14px',color: '#E71E5B' }}>provider@gmail.com</p>
          <div style={{borderTop: '1px solid #E71E5B', margin: '10px 0'}}>
          <p style={{ fontSize: '14px', textAlign: 'center', color: '#E71E5B'}}>Price</p>
          <p style={{fontSize: '20px', textAlign: 'center',fontFamily: ' Arial',color: '#E71E5B' }}><b>R500</b></p>
          <p style={{ fontSize: '14px', textAlign: 'center',color: '#E71E5B' }}>Monday-Friday</p>
           </div>
      </div>
  </div>
  </div>
  
  
  <div className="set2">  
              <div className='updates-Container2'>    
              <div className={{ display: 'flex' }}> {/* Container element */}
              <div style={{ position: 'relative', width: 10, height: 10 }}>
    <div style={{
      position: 'absolute',
      top: -40,
      left: 70,
      width: 70,
      height: 70,
      backgroundColor: '#E71E5B',
      borderRadius: '10%'
    }} />
    
    {/* Overlapping SVG image icon */}
    <div style={{
      position: 'absolute',
      top: -20, // Adjust the top position as needed
      left: 90, // Adjust the left position as needed
      zIndex: 1, // Ensure the SVG is above the square shape
    }}>
      {/* Your SVG image icon code goes here */}
      <svg
        width="30"
        height="30"
        xmlns=""
        viewBox="0 0 24 24"
        fill="#ffffff"
      >
        <path d="M0 0h24v24H0z" fill="none" />
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm3 14h-6v-2h6v2zm0-4h-6V7h6v5z" />
      </svg>
    </div>
  </div>
                <FaPaperPlane className={{ color: '#007bff', fontSize: '1.3rem' }} />
                <FaStar style={{ col0or: 'E71E5B', fontSize: '1rem',marginLeft: '80px',marginBottom:'-30px' }} />
                <FaHeart style={{ color: 'E71E5B', fontSize: '1rem',marginInlineStart:'175px',marginBottom:'-2px'}} />        
                </div> 
                            <h2>
                Painting
                </h2>
                <div style={{borderTop: '1px solid #E71E5B', margin: '10px 0'}}>
         <p style={{ fontSize: '14px',color: '#E71E5B' }}>provider@gmail.com</p>
         <div style={{borderTop: '1px solid #E71E5B', margin: '10px 0'}}>
          <p style={{ fontSize: '14px', textAlign: 'center', color: '#E71E5B'}}>Price</p>
          <p style={{fontSize: '20px', textAlign: 'center',fontFamily: ' Arial',color: '#E71E5B' }}><b>R200</b></p>
         <p style={{ fontSize: '14px', textAlign: 'center',color: '#E71E5B' }}>Monday-Friday</p>
             </div>
           </div>
         </div>
       </div>
     </div>
        </div>
        </div>
        
    </div>
    )}






   
           




        {activeTab === 'accounts' && (
        <div className='ScrollableContainer'>            
          </div>
        )}
        
        {activeTab === 'payments' && (
          <div className='ScrollableContainer'>
          <div className='payment_history'>
            <div className='payments_container'>
              <h5 className='payments_title'>Invoices</h5>
              <div className='receipts'>
              <table>
            <thead>
              <tr>
                <th>Description</th>
                <th>Service Provider</th>
                <th>Total Paid</th>
                <th>Invoice No</th>
                <th>Date</th>
                <th>Download</th>
              </tr>
            </thead>
            <tbody>
              {receiptdata.map((row) => (
                <tr key={row.id}>
                  <td>{row.service}</td>
                  <td>{row.pro_email}</td>
                  <td>R{row.price}</td>
                  <td>{/* Add the date format you want here */}</td>
                  <td>{new Date(row.created_at).toLocaleDateString()}</td>
                  <td>
                    <button
                      onClick={() => handleDownload(row.id)}
                      className="download-button"
                    >
                      Download
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
              </div>
         </div>
          </div>
          </div>
        )}
    </div>
        )}

{activeTab2 === 'profile' &&(
<div>
      <Dashheader />
      <div></div>
      <div className='Profiletab'>
   <div className='edit_pfp'>
    <h4>Profile Picture</h4>
    <div className='pfp'></div>
    <p className='Name_Surname'></p>
   <div className='edit_container1'> <button className='edit_image'>Edit</button></div>
    </div>
    <div className='profile_information'>
      <div className='personalinfo_header'><h4 className='personalinfo_heading'>Personal Information</h4> 
      <button className='edit_personal' onClick={toggleEdit}>Edit</button>
      </div>
<div className='User_info'>
<div className='fetched_salut'><strong><p style={{color: '#454545', fontFamily: 'poppins', fontWeight: 'bold'}} className='Name'>Salutation:</p></strong></div>
              <div className='fetched_name'><strong><p style={{color: '#454545', fontFamily: 'poppins', fontWeight: 'bold'}} className='profile_name'>Name:</p></strong></div>
              <div className='fetched_dob'><strong><p style={{color: '#454545', fontFamily: 'poppins', fontWeight: 'bold'}} className='dob'>Date of Birth</p></strong></div>
              <div className='fetched_phone'><strong><p style={{color: '#454545', fontFamily: 'poppins', fontWeight: 'bold'}} className='phone'>Phone:</p></strong></div>

              <div className='fetched_email'><strong><p style={{color: '#454545', fontFamily: 'poppins', fontWeight: 'bold'}} className='profile_email'>Email:</p></strong></div>
              <div className='fetched_country'><strong><p style={{color: '#454545', fontFamily: 'poppins', fontWeight: 'bold'}} className='country'>Country</p></strong></div>
              <div className='fetched_city'><strong><p style={{color: '#454545', fontFamily: 'poppins', fontWeight: 'bold'}} className='city'>City:</p></strong></div>
              <div className='fetched_zip'><strong><p style={{color: '#454545', fontFamily: 'poppins', fontWeight: 'bold'}} className='zip'>ZIP:</p></strong></div>
              <div className='fetched_street'><strong><p style={{color: '#454545', fontFamily: 'poppins', fontWeight: 'bold'}} className='street'>Street Name</p></strong></div>
              <div className='fetched_building'><strong><p style={{color: '#454545', fontFamily: 'poppins', fontWeight: 'bold'}} className='building'>Building:</p></strong></div>


</div>
{editMode && (
  <>
        <div className='edit-personal-info-container'>
        <div className='editinfo_header1'><h4 className='personalinfo_heading'>Personal Information</h4> 
        <div className='editbuttons'>
      <button className='edit_personal1' onClick={toggleEdit}>Save</button>
      <button className='edit_personal2' onClick={toggleEdit}>Cancel</button>
      </div>
      </div>
          <form className='edit_form'>
            <div className='fetched_salut' style={{display: 'flex', width: '100%', justifyContent: 'space-between'}}>
              <strong><p style={{ color: '#454545', fontFamily: 'poppins', fontWeight: 'bold' }} className='Name'>Salutation:</p></strong>
              <input type="text" name="salutation" id="edit-salutation" />
            </div>
            <div className='fetched_name' style={{display: 'flex', width: '100%', justifyContent: 'space-between'}}>
              <strong><p style={{ color: '#454545', fontFamily: 'poppins', fontWeight: 'bold' }} className='profile_name'>Name:</p></strong>
              <input type="text" name="name" id="edit-name" />
            </div>
            <div className='fetched_dob' style={{display: 'flex', width: '100%', justifyContent: 'space-between'}}>
              <strong><p style={{ color: '#454545', fontFamily: 'poppins', fontWeight: 'bold' }} className='dob'>Date of Birth:</p></strong>
              <input type="text" name="dob" id="edit-dob" />
            </div>
            <div className='fetched_phone' style={{display: 'flex', width: '100%', justifyContent: 'space-between'}}>
              <strong><p style={{ color: '#454545', fontFamily: 'poppins', fontWeight: 'bold' }} className='phone'>Phone:</p></strong>
              <input type="text" name="phone" id="edit-phone" />
            </div>
            <div className='fetched_email' style={{display: 'flex', width: '100%', justifyContent: 'space-between'}}>
              <strong><p style={{ color: '#454545', fontFamily: 'poppins', fontWeight: 'bold' }} className='profile_email'>Email:</p></strong>
              <input type="text" name="email" id="edit-email" />
            </div>
            <div className='fetched_country' style={{display: 'flex', width: '100%', justifyContent: 'space-between'}}>
              <strong><p style={{ color: '#454545', fontFamily: 'poppins', fontWeight: 'bold' }} className='country'>Country:</p></strong>
              <input type="text" name="country" id="edit-country" />
            </div>
            <div className='fetched_city' style={{display: 'flex', width: '100%', justifyContent: 'space-between'}}>
              <strong><p style={{ color: '#454545', fontFamily: 'poppins', fontWeight: 'bold' }} className='city'>City:</p></strong>
              <input type="text" name="city" id="edit-city" />
            </div>
            <div className='fetched_zip' style={{display: 'flex', width: '100%', justifyContent: 'space-between'}}>
              <strong><p style={{ color: '#454545', fontFamily: 'poppins', fontWeight: 'bold' }} className='zip'>ZIP:</p></strong>
              <input type="text" name="zip" id="edit-zip" />
            </div>
            <div className='fetched_street' style={{display: 'flex', width: '100%', justifyContent: 'space-between'}}>
              <strong><p style={{ color: '#454545', fontFamily: 'poppins', fontWeight: 'bold' }} className='street'>Street Name:</p></strong>
              <input type="text" name="street" id="edit-street" />
            </div>
            <div className='fetched_building' style={{display: 'flex', width: '100%', justifyContent: 'space-between'}}>
              <strong><p style={{ color: '#454545', fontFamily: 'poppins', fontWeight: 'bold' }} className='building'>Building:</p></strong>
              <input type="text" name="building" id="edit-building" />
            </div>
          </form>
        </div>
          </>
      )}
      </div>
      
    </div>
   
  </div>
  )}



  {activeTab2 === 'messaging' &&(<div>
  <Dashheader />
  <br/>
<div className='cus_inbox'>
<div className='all_msg'></div>
<div className='opened_msg'>

<div className='header_msg'>
<div  className='default_msg'><p>No Messages...</p></div>
</div>
<div className='current_msg'>
<div  className='default_msg1'><p>No Messages...</p></div>

</div>
<div className='condition_msg'>
<div  className='default_msg'><p>No Messages...</p></div>
inde
</div>
<div className='footer_msg'>
<div className='heading_footer_msg'><h4 className='heading_footer_msg1'>Contact Us</h4><p>support@myrepairs.co.za</p></div>
</div>
</div>
</div>
  </div>)}



  {activeTab2 === 'favourites' &&(<div>
  <Dashheader />
<div className='fav_services'>
<div className='heading_fav'>
  <h4>Favourites</h4></div>
<div className='fav_services1'>

<div class="Add_fav">
  <img style={{objectFit: 'cover'}} src="icons8-plus-48.png" alt="Add" class="add-icon"/>



</div>
</div>
</div>

  </div>)}
      </div>  
      <style jsx>{`

    
       body {
        font-family: 'Poppins', sans-serif;
        margin: 0;
        padding: 0;
        background-color: #f4f4f4; /* Background color for the body on mobile devices */
        box-sizing: border-box;
      }

.ScrollableContainer {
   overflow: auto;
  margin-left:200px;
  margin:0;
  height:750px;
}
  .ScrollableContainer2 {
  overflow: auto;
  margin:20px;
  height:750px;
}

 
.dashboard-container {
  padding: 15px;
  background-color: #ff0068;
  width: 150px;
  height: 100%;
  position: fixed
  margin:0; 
  z-index: 1000; 
  }
.UserDashboard{
  display: flex;
 height: 110vh;
  font-family: Arial, sans-serif;
  margin-left: 200px;
  overflow-x: hidden; 
}


@media (max-width: 768px) {
  .dashboard-container {
    width: 100%;
    max-width: 100px; 
    height: auto;
    position: relative;
    margin-bottom: 15px;
  }
  
  .UserDashboard {
    margin-left: 0;
    overflow-x: auto;
  }
}

.Profile .profile-pic {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #e9ecef;
  font-size: 36px;
  color: #6c757d;
  margin-bottom: 10px;
}

/* Username styles */
.username h4 {
  width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: -30px;
    color: white;
    font-family: poppins;
    font-weight: bold;
    overflow: hidden;
    text-overflow: ellipsis;
  width: 150px;
}

/* Dashboard content styles */
.dashcontent {
  width: 150px;
  padding: 0px;
  margin-left: 0px;
   width: 100%;
}


.dashboard-content {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

@media (max-width: 768px) { /* Adjust breakpoint as needed */
  .dashboard-content {
    display: block;
    width: 100%; /* Adjust width as per your design */
    max-width: 300px; /* Decrease the maximum width for smaller screens */
    margin: 0 auto; /* Center horizontally */
    padding: 5px; /* Add padding for spacing */
  }
}

/* Dashboard section styles */
.dashboard-section {
   width: 70%;
  max-width: 250px;
  background-color: #454545;
  margin: 10px;
  padding: 20px;
  border-radius: 3px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: all 0.3s ease;
  text-align: center;
  color: #fff;
  justify-content: space-between;
  display: flex;
  height:30px;
}

.dashboard-section.active {
  background-color: #ff4081;
  color: #fff;
}

.dashboard-section-header {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  position: inherit;
   text-align: margin;
}
.dashboard-section-icon {
  font-size: 24px;
  margin-right: 10px;
}

.dashboard-section-title {
 color: #fff;
  font-size: 14px;
  margin: 0;
}

/* Active tab indicator */
.active_Tab {
display: block;
  color: #ff4081;
  font-size: 24px;
  margin-left: auto;
}

/* Responsive styles */
@media (max-width: 768px) {
   .Profile .profile-pic {
    width: 60px;
    height: 60px;
    font-size: 24px;
  }

  .username h4 {
    font-size: 14px;
  }

  .dashboard-section {
    max-width: 100%;
    padding: 10px; 
    margin: 5px;  
    font-size: 10px; 
    margin-top:15px;
    margin-left:-10px;
  }
  }

  .dashboard-section-header {
    flex-direction: column;
    align-items: flex-start;
     max-width: 80%;
    padding: 10px; 
    margin-left: -30px;  
    font-size:14px;
    margin-top:-5px;
  }

  .dashboard-section-icon {
    margin-bottom: 5px;
       font-size:10px;
  }

  .dashboard-section-title {
    font-size: 16px;
    margin-left: 18px;
    color:  #fff;
      }

  .active_Tab {
    font-size: 20px;
  }
}

.logsout {
  background-color: #fff;
  color: #FF0066;
  border: none;
  padding: 8px 18px;
  margin: 0 auto;
  font-size: 14px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s;
  
}
.btn_logout {
  text-align: center; /* Center align the button */
  margin-top: 10px; /* Add margin to top */
 margin-left: -13px;
 
  }
/* Media query for mobile devices */
@media screen and (max-width: 768px) {
  .logsout {
    padding: 6px 14px;
    font-size: 12px;
    height: 25px;
    width: 90px; 
  }

  .btn_logout {
    margin-top: 5px; 
  }
}
.maindash {
  display: flex;
  flex-direction: row; 
  justify-content: space-between;
  align-items: center; 
  margin: 0px; 
  margin-top:10px;
  margin-right:100px;
  }

.maindash a {
  padding: 0px 0px;
  font-size: 12px; 
  color: #ff0068;
  text-decoration: none;
  transition: color 0.3s, transform 0.3s;
}

/* Hover effect */
.maindash a:hover {
  color: #000;
  text-decoration: underline;
  transform: scale(1.05); 
}
   @media screen and (max-width: 480px) {
  .mainpage {
    padding: 10px;
  }
      }
.Dash-Container {
  display: flex;
  justify-content: space-between;
  margin-top: 50px;
  margin-left: 15px;
  margin:20px;
}
.Dash-Container2 {
  display: flex;
  justify-content: space-between;
  margin-top: 50px;
  margin-left: 15px;
  margin:20px;
}

/* Media query for screens with a maximum width of 480px */
@media screen and (max-width: 480px) {
  .Dash-Container {
    flex-direction: column; 
    margin: 10px; 
  }

  .Dash-Container > * {
    margin-bottom: 10px; 
  }
}
/* Media query for screens with a maximum width of 480px */
@media screen and (max-width: 480px) {
  .Dash-Container2 {
    flex-direction: column; 
    margin: 10px; 
  }

  .Dash-Container2 > * {
    margin-bottom: 10px; 
  }
}
/* Media query for screens with a maximum width of 480px */
@media screen and (max-width: 768px) {
  .Dash-Container {
    flex-direction: column; 
    margin: 10px; 
  }

  .Dash-Container > * {
    margin-bottom: 10px; 
  }
}
/* Media query for screens with a maximum width of 480px */
@media screen and (max-width: 768px) {
  .Dash-Container2 {
    flex-direction: column; 
    margin: 10px; 
  }

  .Dash-Container2 > * {
    margin-bottom: 10px; 
  }
}



@media screen and (max-width: 768px) {
  .maindash {
    flex-direction: row; 
    margin: 0;
  }
   .maindash a {
    margin-bottom: 10px; 
    padding: 0px 0px; 
    font-size: 10px; 
  }

  .account-link {
    margin-top: 20px;
  } 
}

.account-link {
  display: flex;
  align-items: center;
}

.search-container {
  position: relative;
}

.search-input {
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-right: 5px;
}

.search-symbol {
  cursor: pointer;
}


/* Styles for cellphones (screens up to 480px wide) */
@media screen and (max-width: 480px) {
  .search-container {
    width: 100%; 
    margin-bottom: -50px;
    margin-:15px;
  }

  .search-input {
    width: calc(100% - 40px); 
    padding: 8px; 
    font-size: 16px;
    margin-right: 0; 
  }

  .search-symbol {
    position: absolute;
    right: 10px; 
    top: 50%;
    transform: translateY(-50%);
    font-size: 20px; 
  }
}


.services-wrapper {
  margin-top: 20px;
}

.popularservice_heading {
  margin-bottom: 20px;
  font-size: 24px;
  color: #454545;
}

.metrics {
  background-color: white;
  display: flex;
  justify-content: space-between;
  width: 650px;
  margin-bottom: 0px;
}



@media (max-width: 480px) {
  .metrics {
    width: 180px; 
    padding: 8px; 
  }
}

.metrics2 {
  background-color: white;
  display: flex;
  justify-content: space-between;
  width: 650px;
  margin-bottom: 100px;
}



@media (max-width: 480px) {
  .metrics2 {
    width: 180px; 
    padding: 8px; 
  }
}

.servicesdone,
.Rewards {
 padding-left: 8px;
      height: 100px;
      width: 200px;
       color: azure;
       border-radius: 10px;
      background-color:#ff0068;
     cursor: pointer;
}
.pendingservices{
 
  padding-left: 8px;
  color: azure;
  height: 100px;
  width: 200px;
  border-radius: 10px;
  background-color:#ff0068;
  cursor: pointer;
}
.servicesdone:hover,
.Rewards:hover {
  transform: scale(1.10);
  background-color:#FFB6C1;
}
.naming h3 {
  margin: 15px;
  padding: 0;
  font-size: 18px; 
}

/* Media query for screens with a maximum width of 480px (typical smartphones) */
@media (max-width: 480px) {
  .servicesdone,
  .Rewards {
    height: 40px; /* Decrease height for smaller screens */
    width: 160px; /* Decrease width for smaller screens */
    padding: 6px; /* Adjust padding for smaller screens */
    font-size: 12px; /* Decrease font size for smaller screens */
  }
}
  @media (max-width: 768px) {
   .naming h3 {
    font-size: 16px; 
    margin-top:-5px;
    margin-left:30px;
     font-size: 13.7px;
  }
}
   .serv {
  margin-bottom: 20px;
  text-align: center;
  padding: 20px;
  border-radius: 10px;
  color: #FF0066;
}
.serv h2 {
  margin: 0;
  font-size: 24px;
}
@media (max-width: 768px) {
  /* Styles for tablets */
  .serv {
    padding: 15px;
  }
    .serv h2 {
    font-size: 20px; 
  }
}
  @media (max-width: 480px) {
  /* Styles for cellphones */
  .serv {
    padding: 10px;
  }

  .serv h2 {
    font-size: 18px; /* Adjust font size for cellphones */
  }
}
.expanded-content{
  width: 200px;

}
.expanded-content.show {
  opacity: 1;
  /* Keep the final position as you like */
  transform: translateY(0);
}
/* CSS styles for the expanded-content (the actual content inside the container) */
.expanded-content {
  background-color: #fff; /* Background color for the content */
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.3);
  /* Add other styling as needed */
  animation: fallingBounce 0.5s cubic-bezier(0.68, -0.55, 0.27, 1.55) forwards;

}
.expanded {
  transform: scale(1.05);
}

.progress-circle {
  position: relative;
  width: 100px;
  height: 100px;
  margin: 0 auto;
}

/* Media query for screens with a maximum width of 480px (typical smartphones) */
@media (max-width: 480px) {
  .progress-circle {
    width: 20px; 
   margin-top:-25px;
    height: 20px; 
  }
}
.circle-progress {
  appearance: none;
  width: 100px;
  height: 10px;
  border-radius: 50%;
  background: transparent;
  stroke-width: 10px;
  stroke: #fff; 
}

.circle-progress::-webkit-progress-value {
  border-radius: 50%;
  background-color: #ff0068; 
}
/* Media query for screens with a maximum width of 480px (typical smartphones) */
@media (max-width: 480px) {
  .circle-progress {
    width: 70px; 
    height: 8px; 
    stroke-width: 8px; 
    margin-left:-35px;
    margin-top:20px;
    }
}
.container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-top: 50px;
}
@media (max-width: 600px) {
  .container {
    flex-direction: column;
    margin-top: 50px; 
  }
}  
  


.mainpage {
  height: 100vh;
  overflow-y: auto;
  padding: 20px;
  background-color: #fff; 
  width: 100%;
      }
 


  a {
  margin-right: 10px;
  color: #007bff; 
  text-decoration: none;
}
a:hover {
  text-decoration: underline;
}

.set {
 display: flex;
  flex-direction: column;
  align-items: left;
  background-color: #fff;
  margin-right: auto;
}
.set2 {
 display: flex;
  flex-direction: column;
  align-items: left;
  background-color: #fff;
  margin-right: auto;
 
}



.updates-Container {
  margin-bottom: 20px;
  border: 3px solid #ff0068; 
  margin: 1px;
  box-shadow: 0 0 15px rgba(255, 0, 104, 0.5);
  width: 300px; /* Adjust width */
  height: 150px; /* Adjust height */
  margin-top: -30px;
  margin-left: -15px;
  font-family: Arial, sans-serif; /* Set font family to Arial */
  font-weight: bold; /* Set font weight to bold */
  color:#ff0068; /* Set text color to black */
  font-size: 20px; /* Set font size to 20 pixels */
  position: relative;
  }



  .updates-Container::before
 {
  content: "";
  position: absolute;
  left: 0;
  right: 0;
 
}
.updates-Container2 {
  margin-bottom: 20px;
  border: 3px solid #ff0068; 
  margin: 1px;
  box-shadow: 0 0 15px rgba(255, 0, 104, 0.5);
  width: 300px;
  height: 150px; 
  margin-top: -30px;
  margin-left: -15px;
  font-family: Arial, sans-serif; 
  font-weight: bold;
  color:#ff0068; 
  font-size: 20px;
  position: relative;
  }
 
  @media (max-width: 768px) 
  .updates-Container{
    margin-bottom: 10px;
  }
 @media (max-width: 768px) 
  .updates-Container2{
    margin-bottom: 10px;
  }
 .services_tab {
    height: 450px;
    overflow: auto;
    width: 50%;
    padding: 10px;
    margin-left: 0px;
  }
      }

@media screen and (max-width: 480px) {
  
  .account-link {
    margin-top: 10px;
  }

  .set {
    width: 30%;
    margin-bottom: 20px;
   flex-direction: column;
  }
 
}
  @media screen and (max-width: 480px) {
  
   .set2 {
    width: 30%;
    margin-bottom: 20px;
   flex-direction: column;
      }}
.services_tab {
   height: 450px;
    overflow: auto;
    width: 100%;
    padding: 10px;
    margin-left: 0px;
  }

.custom-select {
  /* Add default styles for select elements */
}


.my_services {
  /* Add default styles for the my_services container */
}

.productCard {
  /* Add default styles for product cards */
}



body {
  font-family: Arial, sans-serif;
}
.services_tab {
  padding: 20px;
}
.custom-select {
  width: 100%;
  padding: 5px;
  border-radius: 5px;
  border: 1px solid #ccc;
}
.my_services {
  display: flex;
  flex-wrap: wrap;
}

.productCard {
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 10px;
  margin: 10px;
  flex: 1 0 21%; /* responsive: 4 items per row */
  cursor: pointer;
}

.productCard:hover {
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}


.set {
  flex: 1;
  margin: 10px;
}
.set:nth-child(2) .updates-Container {
  width: 200px; 
  height:400px;
}

.set:nth-child(1) .updates-Container,
.set:nth-child(3) .updates-Container {
  width: 200px; 
  height:400px;
}


.set2 {
  flex: 1;
  margin: 10px;
}


.set2:nth-child(2) .updates-Container2 {
  width: 200px; 
  height:400px;
}

.set2:nth-child(1) .updates-Container2,
.set2:nth-child(3) .updates-Container2 {
  width: 200px; 
  height:400px;
}

@media (max-width: 768px) {
  .filters-search, .my_services, .metrics {
    flex-direction: column;
  }

  .searchfilters, .radiofilters, .radiofilters2 {
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
  }

  .searchfilters .filter1, .searchfilters .filter2,
  .radiofilters .filter3, .radiofilters .filter4,
  .radiofilters2 .filter5 {
    flex: 1 0 48%;
  }

  .productCard {
    flex: 1 0 48%; 
  }

  
}
/* Default Styles */
.container2 {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-top:-250px;
}
@media (max-width: 600px) {
  .container2 {
    flex-direction: column;
    margin-top: -50px; 
  }
}  
   

/* General Styles */
body {
  font-family: Arial, sans-serif;
}

.payment_history {
  padding: 20px;
}

 .payments_container{
        height: 400px;
        width: 700px;
       border: 1px solid #ff0068;
        padding: 10px;
border-radius:5px;
      }
      .payments_title{
        font-family: poppins
        font-size: 18px;
        margin-bottom: 20px;
      }


      /* Media Queries for Responsiveness */
      @media (max-width: 1200px) {
        .payments_container {
          width: 600px; /* Adjust width for smaller screens */
        }
      
        .payments_title {
          font-size: 16px; /* Adjust font size for smaller screens */
        }
      }
      
      @media (max-width: 768px) {
        .payments_container {
          width: 100%; /* Full width for tablet screens */
          height: 350px; /* Adjust height for tablet screens */
        }
      
        .payments_title {
          font-size: 14px; /* Adjust font size for tablet screens */
        }
      }
      
      @media (max-width: 480px) {
        .payments_container {
          width: 100%; /* Full width for mobile screens */
          height: auto; /* Adjust height for mobile screens */
          padding: 10px; /* Adjust padding for mobile screens */
        }
      
        .payments_title {
          font-size: 12px; /* Adjust font size for mobile screens */
          margin-bottom: 10px; /* Adjust margin for mobile screens */
        }
      }


      .receipts{
        border: 2px solid #ff0068;
        border-radius: 5px;
        padding: 10px;
        width: 650px;
        height: 300px;
      }
        .receipts table {
        margin-right:-10px;
  width: 100%;
  border-collapse: collapse;
}

.receipts th.column,
.receipts td.column {
  width: 16.67%; 
  padding: 8px;
  text-align: left;
  border-bottom: 2px solid #ff0068;
}

.receipts th.column:last-child,
.receipts td.column:last-child {
  width: 16.67%; /* Adjust the width of the last column if needed */
}



/* Media Queries for Responsiveness */
@media (max-width: 1200px) {
  .receipts {
    width: 100%; /* Full width for smaller screens */
    height: 250px; /* Adjust height for smaller screens */
  }

  .receipts th.column,
  .receipts td.column {
    padding: 6px; /* Adjust padding for smaller screens */
  }
}

@media (max-width: 768px) {
  .receipts {
    width: 100%; /* Full width for tablet screens */
    height: auto; /* Adjust height for tablet screens */
  }

  .receipts th.column,
  .receipts td.column {
    font-size: 14px; /* Adjust font size for tablet screens */
    padding: 5px; /* Adjust padding for tablet screens */
  }
}

@media (max-width: 480px) {
  .receipts {
    width: 100%; /* Full width for mobile screens */
    height: auto; /* Adjust height for mobile screens */
    padding: 5px; /* Adjust padding for mobile screens */
  }

  .receipts th.column,
  .receipts td.column {
    font-size: 12px; /* Adjust font size for mobile screens */
    padding: 4px; /* Adjust padding for mobile screens */
  }

  .receipts th.column,
  .receipts td.column {
    display: block; /* Stack table cells for mobile view */
    width: 100%; /* Full width for each cell */
    border-bottom: 1px solid #ff0068;
  }

  .receipts th.column:last-child,
  .receipts td.column:last-child {
    border-bottom: none; /* Remove bottom border for the last column */
  }
}

.download-button {
  background-color: #007bff;
  color: white;
  padding: 5px 10px;
  border: none;
  border-radius: 3px;
  cursor: pointer;
}

.download-button:hover {
  background-color: #0056b3;
}

/* Responsive Styles */
@media (max-width: 768px) {
  .payments_container {
    padding: 10px;
  }
  .download-button {
    padding: 3px 6px;
  }
}
/* General Styles */
body {
  font-family: 'Poppins', sans-serif;
  color: #454545;
}

h4 {
  font-weight: bold;
}

button {
  cursor: pointer;
  font-family: 'Poppins', sans-serif;
}

/* Profile Tab Styles */
.Profiletab {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
}

.edit_pfp, .profile_information {
  width: 100%;
  max-width: 600px;
  margin-bottom: 20px;
  background-color: #f8f8f8;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.pfp {
  width: 100px;
  height: 100px;
  background-color: #ddd;
  border-radius: 50%;
  margin: 0 auto;
}

.Name_Surname, .Name, .dob, .phone, .profile_email, .country, .city, .zip, .street, .building {
  margin: 10px 0;
}

.edit_container1, .editbuttons {
  text-align: center;
}

.edit_personal, .edit_image, .edit_personal1, .edit_personal2 {
  background-color: #007bff;
  color: #fff;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  margin: 5px;
}

.edit_personal1 {
  background-color: #28a745;
}

.edit_personal2 {
  background-color: #dc3545;
}

.User_info, .edit_form {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.User_info div, .edit_form div {
  display: flex;
  justify-content: space-between;
}

.edit_form input {
  width: 50%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.personalinfo_header, .editinfo_header1 {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

/* Responsive Styles */
@media (max-width: 768px) {
  .Profiletab {
    padding: 10px;
  }

  .edit_pfp, .profile_information {
    padding: 15px;
  }

  .pfp {
    width: 80px;
    height: 80px;
  }

  .edit_form input {
    width: 60%;
  }

  .edit_personal, .edit_image, .edit_personal1, .edit_personal2 {
    padding: 8px 15px;
    font-size: 14px;
  }
}
/* General Styles */
body {
  font-family: 'Poppins', sans-serif;
  color: #454545;
}

h4 {
  font-weight: bold;
}

button {
  cursor: pointer;
  font-family: 'Poppins', sans-serif;
}

/* Messaging Tab Styles */
.cus_inbox {
  display: flex;
  flex-direction: column;
  padding: 20px;
}

.all_msg, .opened_msg {
  background-color: #f8f8f8;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
}

.header_msg, .current_msg, .condition_msg, .footer_msg {
  margin: 10px 0;
}

.default_msg, .default_msg1 {
  text-align: center;
  color: #888;
}

.footer_msg {
  text-align: center;
}

.heading_footer_msg1 {
  margin-bottom: 5px;
}

.heading_footer_msg p {
  margin: 0;
}

/* Favourites Tab Styles */
.fav_services {
  padding: 20px;
}

.heading_fav {
  text-align: center;
  margin-bottom: 20px;
}

.fav_services1 {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}

.Add_fav {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f8f8f8;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.add-icon {
  width: 48px;
  height: 48px;
}

/* Responsive Styles */
@media (max-width: 768px) {
  .cus_inbox, .fav_services {
    padding: 10px;
  }

  .all_msg, .opened_msg, .Add_fav {
    padding: 15px;
  }

  .add-icon {
    width: 36px;
    height: 36px;
  }
}

.filterservices1{
        background: #21B6A8;
        color: #fff;
        font-weight: bold;
        font-size: 12px;
        padding: 0px;
        margin: 0;
        position: absolute;
        width: 100px;
        height: 40px;
        right: 110px;
        margin-top: 70px; 
         border-radius: 5px;
      }
    .filteremail {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 14px;
  width: 100%;
  box-sizing: border-box;
  transition: border-color 0.3s ease;
  height: 25px;
  color: #000;
      
      }

  .filteremail:focus {
  border-color: #ff0068; /* Focus color */
  outline: none;
}
      .radiofilters{
        width: 200px;
      }
      .radiofilters2{
        width: 200px;
      }
      .searchfilters{
        display: flex;
        width: 850px;
        justify-content: space-between;
      }
      .emailfilters{
        width: 200px;
        margin-bottom: 10px;
      }
      .filters-search{
        display: flex;
        position: relative;
       background: #ff0068;
       color: #fff;
       font-weight: bold;
       padding: 10px;
        width: 650px;
        justify-content: space-between;
        margin: 0;
        border-radius: 5px;
        
      }

/* General Styles */
body {
  font-family: 'Poppins', sans-serif;
}


/* Input Styles */


.filteremail:focus {
  border-color: #ff0068; /* Focus color */
  outline: none;
}

/* Media Queries for Responsiveness */
@media (max-width: 768px) {
  .filterservices1 {
    width: 80px;
    height: 35px;
    right: 90px;
    margin-top: 60px;
    font-size: 10px;
  }

  .searchfilters {
    width: 100%;
    flex-direction: column;
    align-items: flex-start;
  }

  .filters-search {
    width: 60%;
    flex-direction: column;
    align-items: flex-start;
        height:340px;
  }

  .filteremail {
    padding: 6px;
    font-size: 12px;
     width:110px;
 
  }

  .radiofilters, .radiofilters2, .emailfilters, .filter1, .filter2, .filter3, .filter4, .filter5 {
    width: 100%;
    margin-bottom: 10px;
  }
}

@media (max-width: 480px) {
  .filter-container label {
    font-size: 12px;

  }

  .filteremail {
    padding: 6px;
    font-size: 10px;
    width:120px;
  }

  .filterservices1 {
    width: 70px;
    height: 30px;
    right: 80px;
    margin-top: 310px;
    margin-right:-20px;
    font-size: 8px;
  }
}


      .filter1{
        width:150px;
        margin-bottom: 15px;
        
      }
      .filter2{
        width:150px;
      }
      .filter3{
        width:100px;
        margin-bottom: 15px;
      }
      .filter4{
        width:100px;
      }
      .filter5{
        width:100px;
      }
  


           `}</style>
    </div>
  );
};
export default UserDashboard;


//good colours: #fffd #FF0040,#FF0066, #FF0078, #FA3980, #ffeba7, #ff3c78, #21B6A8 
/**/