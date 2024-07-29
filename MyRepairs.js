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
<div className='username'><h4>{userEmail}</h4></div>

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
      {pendingRequests === null ? (
        <div className="loading-spinner">
          <BarLoader color={"#36D7B7"} loading={true} size={150} />
          <p>Loading pending requests...</p>
        </div>
      ) : pendingRequests.length > 0 ? (
        
        <div className='requestcard'>
          <h2 className='totalpendingreq'>Awaiting Approval ({pendingRequests.length})</h2>
          <div className="alert-container">
            <div className="alert-box">
              <IoWarningSharp size={iconSize} color="red" />
              <p>Please wait for the provider to accept the service.<br/> If not accepted within 24 hours, you can request for<br/> a refund.</p>
            </div>
       
          </div>
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
{/*   <ul className='pendingrequests'>
            {pendingRequests.map((pendingrequest, index) => (
              <li key={pendingrequest.id} className="pending-request">
                <strong>Provider Email:</strong> {pendingrequest.pro_email}<br/>
                <strong>Service:</strong> {pendingrequest.service}<br/>
                <strong>Price:</strong> {pendingrequest.price}
                <span className="request-index">{index + 1}</span>
              </li>
            ))}
          </ul> */}




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
</nav>

             {activeTab === 'overview' && (
          <div className='Overview'>
           <div>
      
      

     
    </div>

            <div className='metrics'>
            <div
  className={`servicesdone ${expandedServicesDone ? 'expanded' : ''}`}
  onClick={() => setExpandedServicesDone(!expandedServicesDone)}
>
  <h3>Services Done</h3>
  <progress value={servicesDoneProgress} max="100"></progress>
</div>

<div
  className={`pendingservices ${expandedPendingServices ? 'expanded' : ''}`}
  onClick={() => {
    setExpandedPendingServices(!expandedPendingServices);
    // Perform the database search here
 
  }}
>
  <h3>Pending Services</h3>
  <progress value={pendingServicesProgress} max="100"></progress>
</div>


<div
  className={`Rewards ${expandedRewards ? 'expanded' : ''}`}
  onClick={() => setExpandedRewards(!expandedRewards)}
>
  <h3>Rewards</h3>
  <progress value={rewardsProgress} max="100"></progress>
</div>

      </div>
      <div className='popularservice_heading'>
        <p className='popular_heading'>Popular Services</p>
      </div>
      <div className='availableservices'>
  <div
    className='overviewservices'
   
  >
    {firstTenServices.map((service) => (
      <div
      key={service.id}
      className="productCard"
       onClick={() => handleServiceClick(service)}

      >
      <Products key={service.id} service={service} />
      </div>
    ))}
  </div>
</div>

        
            
          </div>

          
        )}
       
        {activeTab === 'services' && (
         
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
      
        )}


       
        {activeTab === 'accounts' && (
          <div>
            {/* Add content for the Accounts tab here */}
          </div>
        )}
        
        {activeTab === 'payments' && (
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
<div className='heading_fav'><h4>Favourites</h4></div>

<div className='fav_services1'>
<div class="Add_fav">
  <img style={{objectFit: 'cover'}} src="icons8-plus-48.png" alt="Add" class="add-icon"/>
</div>
</div>



</div>

  </div>)}
      </div>

    
      <style jsx>{`
      .edit_personal1{
        margin: 0;
        padding: 0;
        padding: 8px;
        background: #ff0066;
        width: 80px;
        color: #fff;
        font-weight:bold;
        font-family: poppins;
      }
      .edit_personal2{
        margin: 0;
        padding: 0;
        padding: 8px;
        background: #21B6A8;
        width: 80px;
        color: #fff;
        font-weight:bold;
        font-family: poppins;
      }
      .editbuttons{
        display: flex;
        padding: 5px;
        width: 300px;
        justify-content: space-between;

      }
      .editinfo_header1{
        align-items: center;
        justify-content: space-between;
        width: 100%;
        display: flex;
        margin: 0;
      }
      .edit_form{
        width: 100%;
      }
      .edit-personal-info-container {
        display: none;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(255, 255, 255, 0.9); /* Semi-transparent background */
        display: block;
        align-items: center;
        justify-content: center;
        z-index: 1;
      }
      
      .edit-personal-info-container.open {
        display: flex;
      }
      
      .edit-personal-info-container input {
        width: 200px;
        padding: 5px;
        margin: 5px 0;
        border: 1px solid #ccc;
        border-radius: 5px;
      }
      
      /* Close Button */
      .close-edit {
        background-color: #ccc;
        color: #fff;
        border: none;
        padding: 5px 10px;
        border-radius: 5px;
        cursor: pointer;
        margin-top: 10px;
      }
 
      .Add_fav{
width: 200px;
height: 200px;
border-radius: 5px;
box-shadow: 0 0 5px black;
justify-content: center;
align-items: center;
display: flex;

      }
      .add-icon {
        object-fit: cover;
        width: 50px; 
        height: 50px;
        display: block;
      }
      .fav_services1{
        width: 100%;
        border-bottom: 1px solid #ff0066;
        height: 450px;
        padding: 10px;

      }
      .heading_fav{
        width: 100%;
        border-bottom: 1px solid #ff0066;

      }
        .default_msg1{
          margin: 0 auto;
          margin-top: 140px;
        }
      .default_msg{
        margin: 0 auto;
        margin-top: 30px;
      }
      .heading_footer_msg1{
        margin: 0;
        margin-bottom: -8px;
        padding: 0;
      }
      .heading_footer_msg{
        padding: 5px;
        margin: 0;
        width: 400px;
        height: 20px;
      }
      .footer_msg{
        width: 500px;
        height: 70px;
        border-radius: 5px;
        border: 1px solid #ff0066;


      }
      .condition_msg{
        width: 500px;
        margin-bottom: 10px;
        border: 1px solid #ff0066;
        height: 80px;
        border-radius: 5px;
        text-align: center;
      }
      .current_msg{
        width: 500px;
        border: 1px solid #ff0066;
        height: 280px;
        border-radius: 5px;
        margin-bottom: 10px;
        text-align: center;


      }
      .opened_msg{
        width: 550px;
        border-radius: 5px;

      }
      .header_msg{
        text-align: center;

        width: 500px;
        margin-bottom: 10px;
        border: 1px solid #ff0066;
        height: 80px;
        border-radius: 5px;
      }
      .all_msg{
        border: 1px solid #ff0066;
        width: 350px;
        border-radius: 5px;
        margin-right: 30px;
      }

      .cus_inbox{
        display: flex;
        width: 920px;
        padding: 10px;
        height: 100%;
      }

      .edit_container1{
        width: 100%;
        justify-content: center;
        display: flex;
      }
      .edit_image{
        background: #21B6A8;
        color: #fff;
        width: 60px;
        font-weight:bold;
        font-family: poppins;



      }
     
      .edit_personal{
        margin: 0;
        padding: 0;
        padding: 8px;
        background: #ff0066;
        width: 80px;
        color: #fff;
        font-weight:bold;
        font-family: poppins;
      }
      .personalinfo_heading{
        margin: 0;
        padding: 0;
        width: 100%;
      
      }
      .personalinfo_header{
        display: flex;
        align-items: center;
        margin: 0;
        margin-bottom: 50px;


      }
      .profile_information{
        border: 2px solid #ff0066;
        height: 500px;
        width: 500px;
        border-radius: 5px;
        padding: 10px;
        position: relative;
      }
      .Profiletab{
        display: flex;
        padding: 10px;
      }

      .edit_pfp{
        padding: 10px;
        margin-right: 50px;
        width: 350px;
        height: 350px;
        border: 2px solid #ff0066;
        border-radius: 5px;

        
      }
.pfp{
  border-radius: 75px;
  background: rgba(0, 0, 0, 0.3);
margin: 0 auto;
width: 150px;
height: 150px;
margin-bottom: 40px;

}

      .service_info{
        color: #454545;

      }
      .status_message{
text-align: center;
font-weight: bold;

      }
     hr .hr_pendingservices{
        height: 1px; /* Adjust the height to make it thinner */
        background-color: #000; /* You can also set a color if needed */
        border: none;
      }
      .fetched_price{
        font-size: 40px;
        color: #21B6A8;
        font-weight: bold;
        font-family: poppins;
        display: flex;
        padding: 0;
        align-items: center;
        height:50px;
      width: 100%;
   
      }
      .fetched_name{
        display: flex;
        padding: 0;
        align-items: center;
        height:30px;
      width: 100%;
      justify-content: space-between;
      margin-top: 15px;
      }
      .fetched_email{
        display: flex;
        padding: 0;
        align-items: center;
        height:30px;
      width: 100%;
      justify-content: space-between;
      }
      .fetched_contact{
        display: flex;
        padding: 0;
        align-items: center;
        height:30px;
      width: 100%;
      justify-content: space-between;
      }
      .fetched_address{
        display: flex;
        padding: 0;
        align-items: center;
        height:30px;
      width: 100%;
      justify-content: space-between;
      }

      .p_container1{
        width: 200px;
        height: auto;
        padding: 10px;
        margin-right: 25px;
        border-radius: 5px;
        border: 2px solid #ff0066;
        box-shadow: 0 0  5px #ff0066;

      }
      .p_container2{
        width: 350px;
        height: auto;
        padding: 10px;
        margin-right: 25px;
        border-radius: 5px;
        border: 2px solid #ff0066;
        box-shadow: 0 0  5px #ff0066;
      }
      .p_container3{
        width: 200px;
        height: auto;
        padding: 10px;
        margin-right: 25px;
        border-radius: 5px;
        border: 2px solid #ff0066;
        box-shadow: 0 0  5px #ff0066;

      }
      .pending_containers{
        display: flex;
        justify-content: space-around;
        width: 100%;
        padding: 10px;
      }
      th, td {
        padding: 8px;
        text-align: left;
align-items: center;
        border-bottom: 2px solid #ff0066; /* Pink border line at the bottom of each cell */
      }

.receipts table {
  width: 100%;
  border-collapse: collapse;
}

.receipts th.column,
.receipts td.column {
  width: 16.67%; 
  padding: 8px;
  text-align: left;
  border-bottom: 2px solid #ff0066;
}

.receipts th.column:last-child,
.receipts td.column:last-child {
  width: 16.67%; /* Adjust the width of the last column if needed */
}

/* Additional styling for the Download button, adjust as needed */
.download-button {
  background-color: #21B6A8; /* Pink background color */
  color: white;
  border: none;
  margin-top: 10px;
  padding: 6px 10px;
  cursor: pointer;
}
      .payments_container{
        height: 450px;
        width: 930px;
        border-bottom: 2px solid #ff0066;
        border-top: 2px solid #ff0066;
        padding: 10px;

      }
      .payments_title{
        font-family: poppins
        font-size: 18px;
        margin-bottom: 20px;
      }

      .receipts{
        border: 2px solid #ff0066;
        border-radius: 5px;
        padding: 10px;
        width: 900px;
        height: 300px;
      }


.custom-select {
  font-size: 16px; /* Increase font size to make the arrow appear larger */
  padding: 10px; /* Adjust padding as needed */
  border: 1px solid #ccc; /* Add a border style */
  color: black; /* Change the text color to pink */
  background-color: white; /* Set background color to white */
  background-image: url("expandarrow.png"); /* Replace with your custom arrow image */
  background-repeat: no-repeat;
  background-position: right 10px center;
  background-size: 20px 20px; /* Adjust the size as needed */
  appearance: none; /* Remove default dropdown arrow on some browsers */
}

  
  
      
      .services_tab1 {
        height: 450px;
        overflow: auto;
        width: 900px;
        padding: 30px;
        margin-left: 0px;
      }
      .services_services{
        display: grid;
        grid-template-columns: repeat(4, minmax(130px, 1fr));
        gap: 0px;
      }
      .overviewservices{
        display: grid;
        grid-template-columns: repeat(4, minmax(130px, 1fr));
        gap: 0px;
      

      }
      .profile_tab{
        display: flex;
      
       
      justify-content: space-between;
      }
      .active_Tab{
        font-size: 25px;
        color: #fff;
        font-family: poppins;
position: absolute;
right: -30px;      
        display: none;
      }
      .active_profile{
        font-size: 25px;
        color: #fff;
        font-family: poppins;
              
        display: none;

       
      }
   
      .submitform{
        background: #ff0066;
        font-family: poppins;
        font-weight: bold;
        color: #fff;
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
        right: 80px;
        margin-top: 100px;
       
        

      }
      filter-email{
        border: none;
        border-style: none;
        border-radius: none;
        
        
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
       background: #ff0066;
       color: #fff;
       font-weight: bold;
       padding: 10px;
        width: 930px;
        justify-content: space-between;
        margin: 0;
        border-radius: 5px;
        
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
  
      select{
        width:200px;
        padding: 10px;
        font-weight: bold;
        border-style: solid;
        border-radius: 5px;
      }
      .closemetric{
        background: black;
        color: white;
        font-weight: bold;

      }
      .closemetric:hover{
        background: red;
        color: #fff;
        transition: background 0.5s;
      }
      .alert-container {
        
        width: 100%;
        height: 100%;
        font-family: poppins;
        font-size: px;
        background-color: #fff; /* Semi-transparent background: rgba(0, 0, 0, 0.3); */
       display: flex;
        justify-content: center;
        align-items: center;
        z-index: 9999; /* Ensure it's on top of other elements */
      }
      
      .alert-box {
        background-color: orange;
        width: 800px;
        border-radius: 5px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
        text-align: center;
        margin-bottom: 15px;
       
      }
      
      .close-alert {
        background-color: #e74c3c;
        color: white;
        border: none;
        padding: 10px 20px;
        border-radius: 5px;
        cursor: pointer;
        margin-top: 10px;
      }
      
      .close-alert:hover {
        background-color: #c0392b;
      }
      
      .request-index {
        .request-index {
          /* Optional styles for the index */
          font-weight: bold;
          margin-left: 10px; 
          float: right;
          position: absolute;
          right: 0;/* Adjust the margin as needed for spacing */
        }
      }
      .totalpendingreq{
        color: black;
        text-decoration: none;
        font-style: none;
        text-align: center;
      }
      .totalpendingreq:before{

      }
      .pending-requests-container {
        max-height: 300px; /* Adjust the maximum height as needed */
        overflow-y: auto; /* Add vertical scrollbar when content overflows */
        margin: 8px;
      }
      
      .pendingrequests {
        list-style-type: none;
        padding: 0;
       
        
       
        
      }
      .pending-request{
        background: #f5f5f5;
        margin: 5px;
        padding: 8px;
        border-radius: 10px;
       
        justify-content: space-between
        align-items: center;
      }
      
      .pendingrequests li {
        margin-bottom: 10px; /* Add spacing between list items */
      }
      
      .no-pending-requests {
        font-style: italic;
        color: #777; /* Adjust the color as needed */
      }
      
      .close-button {
        position: absolute;
        top: 0;
        right: 0px;
      
        background-color: transparent;
        border: none;
        cursor: pointer;
      }

      @keyframes fallingBounce {
        0% {
          transform: translateY(-10%);
        }
        20% {
          transform: translateY(5%);
        }
        40% {
          transform: translateY(-2%);
        }
        60% {
          transform: translateY(1%);
        }
        80% {
          transform: translateY(-1%);
        }
        100% {
          transform: translateY(0);
        }
      }
      
.overlay-container {
  position: absolute;
  place-items: center;


  width: 950px;
  height: 660px;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2222; /* Set a high z-index to ensure it's on top */
  background-color: rgba(255, 255, 255, 0.3); /* Transparent white background */
  backdrop-filter: blur(10px);
  /* Semi-transparent overlay background */
  transition: backdropFilter 3s;
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

/* CSS styles for the "No Pending Requests" message */
.no-pending-requests {
  text-align: center;
  font-size: 18px;
  color: #555;
  /* Add other styling as needed */
}



      .dashcontent{
        
        width: 150px;
        padding: 0px;
        margin-left: -5px;
       
      

      }
      .btn_logout{
        width: auto;
        align-items: center;
        display: flex;
        width: 160px;
        padding: 0;
        position: absolute;
        bottom: 40px;
        
      }
.logsout{

  
  
    background-color: #fff;
    color: #FF0066;
    border: none;
    padding: 8px 18px;
    margin: 0 auto;
    font-size: 14px;
    font-weight: bold;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s;
    

}

.username{
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: -30px;
  margin-bottom: 30px;
  color: white;
  font-family: poppins;
  font-weight: bold;
  overflow: hidden;
  text-overflow: ellipsis;
width: 150px;
}
h4{


}
.Profile{
width: 100%;


}
.profile-pic {
  display: flex;
  
  justify-content: center;
  align-items: center; /* Center vertically */
text-align: center;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background-color: #fff;
  color: #ff0066;
  font-size: 36px;
  font-family: poppins;
  font-weight: bold;
  margin: 0 auto 20px;
  margin-top: 10px;
 
}
.profile-pic img {
  width: 100%;
  height: 100%;
  object-fit: cover; /* Adjust the object-fit property to control how the image fits within the container */
}

.dashboard-section.active {
  font-weight: bold;
color: #ff0066;
  background-color: #ff0066;
 z-index: 99999;
  text-decoration: none;
  font-style: none;
  justify-content: space-between;
  align-items: center;
  padding: 0;
  box-shadow: none;
  padding-top: 20px;
  padding-bottom: 20px;
width: 170px;
  .dashboard-section:hover{
background: #ff0066;
  }

  .dashboard-section-header{
    color:#fff;
    padding: 10px;
  width: 123px;
    border-radius: 5px;
    border: 2px solid #fff;
    margin: 0;
    
    
  }
  .active_Tab{
    display: block;
right: 0px;

 


  }
  .dashboard-section-body{
    color:#fff;
  }
  .dashboard-section-title{
    color: #fff;
    font-size: 14px;
  }

  transition: color 0.5s ease,  width 0.7s ease, border-radius 0.5s ease, border 0.5s ease, margin 0.5s ease;

}

.dashboard-container {
         
  padding: 15px;
 
  background-color: #ff0066;
  border: solid light-red 5px;
  width: 180px;
  height: 100%;
  left: 0;


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

      contactdetails{
        font-family: sans-serif;
margin: 30px auto;
text-align: center;
font-size: 20px;
max-width: 600px;
color: #fff;
position:relative;
      }

      contactdetails:before{
        content: "";
display:block;
width: 140px;
height:2px;
background: #fff;
position: absolute;
left: 0;
top: 50%;
z-index: 1111;
      }

      contactdetails:after{
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

      

      .contact_details{
        background-color: #f5f5f5;
        padding: 10px;
        border-radius: 10px;
        margin-top: 0px;
        width: 830px;
        color: #454545;
       

      }
      .screening_questions{
        background-color: #ff0066;
        padding: 10px;
        border-radius: 10px;
        margin-top: 15px;
        width: 830px;
        color: #fffdd0;
      }

      .uploads{
        background-color: #ff0066;
        padding: 10px;
        border-radius: 10px;
        margin-top: 15px;
        width: 830px;
        color: #fffdd0;
      }
      .profile{
background-color: red;
      }
    
      input{
     color: #ff0066;
     font-weight: bold;
     padding: 10px;
     font-family: poppins;
        border-radius: 5px;
       
      }
      textarea{
width: 400px;
padding: 10px;
border-radius: 10px;
      }
     .registration-form {
      
      display: flex;
      flex-direction: row;
      justify-content: space-around;
      max-width: 850px;
      height: 460px;
      margin: 10px;
      margin-left: 0px;
      padding: 20px;
      color: #fff;
      font-weight: bold;
      background-color: #fff;
      border: 1px solid #ccc;
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
    .UserDashboard{
      display: flex;
     justify-content: center;
      width: 100%;
      align-items: center;
    background: azure;
    padding: 10px;
    height: 100vh;
   position: fixed;
   left: 0;
   top: 0;

      
     
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
         
          background-color: #ff0066;
          align-items: center;
          width: 80px; 
          height: 80px; /* Adjust the size as needed */
          border-radius: 50%; /* Makes it a circle */
          overflow: hidden; /* Clip the image to the circular boundary */
          margin: 0 auto; /* Center horizontally */
          margin-bottom: -10px;
          margin-top: 15px;
          margin-left: 25px;
          border: 2px solid #ff0066; /* Add a border for styling */
          box-shadow: 0 0 5px #ff0066;
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
          width: 400px;
          display: flex;
          align-items: center;
          margin-top: 10px;
          margin-bottom: 10px;
      }
      a{
          position: relative;
          text-decoration: none;
          font-family: 'Poppins',sans-serif;
          color: #454545;
          font-weight: bold;
          font-size: 14px;
          letter-spacing: 0.5px;
          padding: 0 10px;
          margin-right: 10px;

      }
      a:after{
          content: "";
          position: absolute;
          background-color: #ff3c78;
          height: 2px;
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
          width: 150px;
          justify-content: space-around;
          height: 100px;
 
          margin-bottom: 10px;
               
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
        .dashcontent{
          width: 100%;
        }

        .dashboard-content {
          display: block;
          width: 170px;
          position: relative;
          font-weight: bold;
        margin: 0 auto;
      
        
          
        }

       

        .dashboard-section {
          background-color: #454545;
         cursor: pointer;
          border-radius: 3px;
          display: flex;
          justify-content: space-between;
          height: 15px;
       width: 125px;
          text-align: center;
          padding: 10px;
          padding-bottom: 17px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          margin-bottom: 35px;
          color:  #fff;
        }

       


        .dashboard-section-header {
          display: flex;
          align-items: center;
          height: 20px;
     width: 170px;
         text-align: center;
          position: inherit;
   
          
        }

      

        .dashboard-section-title {
          font-size: 15px;
         margin-left: 18px;
          color:  #fff;
         
        
        }

        .dashboard-section-body {
         font-size: 12px;
         margin: 0;


position: relative;
          color:  #fff;
        }
        .dashboard-section-body:hover{
          color: white;
        }

        .mainpage{
          width: 950px;
   height: 100%;
         padding: 15px;
       
          background-color: #fff;
margin-left: -19px;
          z-index: 5555;
          
         
       overflow: hidden;
          display: block;

        }
        .mainpage hr{
          border-top: 2px solid #ff0066;
          border-bottom: 2px solid #ff0066;
          margin-bottom: 0px;
         
         
          width:100%;
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
      
      background-color: white;
      border-radius: 10px;
      display: flex;
     justify-content: space-between;
      width: 950px;
      margin-bottom: 0px;
      
     }
   
     .servicesdone{
    
      padding-left: 8px;
    height: 100px;
    width: 200px;
   
    color: azure;
    border-radius: 10px;
    background-color:#ff0066;
    cursor: pointer;

     }
.pendingservices{
 
  padding-left: 8px;
  color: azure;
  height: 100px;
  width: 200px;
  border-radius: 10px;
  background-color:#ff0066;
  cursor: pointer;
}
.Rewards{

  padding-left: 8px;
  color: azure;
  height: 100px;
  width: 200px;
  border-radius: 10px;
  background-color:#ff0066;
  cursor: pointer;

}
.popular_heading{
  margin-left: 35px;
}
.popularservice_heading {
  position: relative;
  color: #ff0066;
  font-size: 17px;
  font-weight: bold;
  font-family: poppins;
  margin: 0;
  padding: 10px;
}

.popularservice_heading:before{
  content: '';
  border-top: 2px solid #ff0066; /* Adjust the style and color as needed */
  display: block;
  width: 4%; /* Adjust the line width as needed */
  position: absolute;
  top: 50%;
}
.popularservice_heading:after {
  content: '';
  border-top: 2px solid #ff0066; /* Adjust the style and color as needed */
  display: block;
  width: 80%; /* Adjust the line width as needed */
  position: absolute;
  top: 50%;
}

.popularservice_heading:before {
  left: 0;
  margin-left: 0%;
}

.popularservice_heading:after {
  right: 0%;
  margin-right: 0%;
}


.availableservices{
  height: 270px;
   overflow: auto;
    width: 100%;
     padding-top: 30px;
      padding-bottom: 30px;
       margin-left: 0px;
        border-left: 2px solid #ff0066;
        border-right: 2px solid #ff0066;

}
.my_services{
  height: 260px;
  overflow: auto;
  width: 950px;
  padding-top: 30px;
  padding-bottom: 30px;
  margin-top: 30px;
  border-left: 2px solid #ff0066;
  border-right: 2px solid #ff0066;
}

@media (max-width: 768px){
  .dashboard-container{
    width: 80px;
height: 100vh;
  }
  .mainpage{
height: 100vh;
  }
  .logsout{
    position: fixed;
    bottom: 20px;
    left: 10px;
    margin: 0;
    width: 75px;
    
    font-size: 12px;
    font-weight: bold;

  }
  .dashboard-section{
    width: 50px;
    height: 30px;
  }
  .username{
    background: red;
  margin: 0;
  padding: 0;
  margin-bottom: 50px;
  width: 130px;
  font-size: 12px;
  display: none;
 
  }
  .img-and-title{
    width: 60px;
    margin-bottom: 30px;
    
  }
  .profile-pic{
    background: #fff;
    color: #ff0066;
    width: 50px;
    height: 50px;
    margin-top: 25px;
    font-size: 25px;

  }
  .dashboard-section-title{
    display: none;
  }
  .dashboard-section-body{
    display: none;
  }
  .dashboard-section-header{
    height: 40px;
    justify-content: center;
    font-size: 18px;
  
  }
  .UserDashboard{
    margin: 0;
    padding: 0;
  }

  .dashboard-section.active {
    font-weight: bold;
  color: #ff0066;
    background-color:white;
   width: 170px;
   z-index: 99999;
    text-decoration: none;
    font-style: none;
    
  
    .dashboard-section-header{
      color:#ff0066;
      width: 60px;
      font-size: 30px;
    }
    .dashboard-section-body{
      color:#ff0066;
    }
    .dashboard-section-title{
      color: #ff0066;
    }
   
  
}
.maindash{

  margin: 0;
  margin-top: 10px;
  margin-bottom: 10px;
  width: 280px;
  justify-content: space-between;
  margin-right: 0;
  padding: 0;
  
}
a{
  padding: 3px;
  font-size: 12px;
  margin: 0;
}

.metrics{
  margin: 0;
  width: 100%;
}
.servicesdone{
  width: 80px;
  height: 70px;
  font-size: 12px;
  font-family: poppins;
}
.pendingservices{
  width: 80px;
  height: 70px;
  font-size: 12px;
  font-family: poppins;
}
.Rewards{
  width: 80px;
  height: 70px;
  font-size: 12px;
  font-family: poppins;
}
progress{
  display: none;
}
.overlay-container{
  width: 300px;
  margin: 0;
  padding: 0;
  margin-left: -10px;
  height: 100vh;
}
.expanded-content{
  width: 200px;

}
.totalpendingreq{
  font-size: 12px;
}
.alert-box{

  font-size: 10px;
  height: 80px;
}
p{

  margin-top: -3px;
}
IoWarningSharp{
display: none;
color: blue;
}
.pendingrequests{
  font-size: 10px;
  
  height: auto;
  overflow-y: auto;
}
.closemetric{
  padding: 5px;
  font-size: 12px;
  margin: 0;
  margin-top: 15px;
}
.availableservices{
  width: 100%;
  padding: 20;
  margin: 0;
  margin-top: 20px;
  margin-left:-10px;
}
.my_services{
  width: 100%;
  padding: 20;
  margin: 0;
  margin-top: 20px;
  margin-left:-10px;
}
.registration-form{
  width: 280px;
  margin: 0;
  margin-top: 10px;
  padding: 0;
  background-color: #f5f5f5;
  border-style: none;
  height: 100vh;
}
.contact_details{
  width: 270px;
  padding: 8px;
  height: 560px;
  margin: 0;
  font-size: 12px;
}
.submitform{
  position: absolute;
  border-radius: 20px;
  
 
}



  .overviewservices {
    grid-template-columns: repeat(3, minmax(100px, 1fr)); /* Display one card per row on smaller screens */
    gap: 0px; /* Adjust the gap for smaller screens */
  padding: 0;
  }
  .services_services{
    grid-template-columns: repeat(3, minmax(100px, 1fr)); /* Display one card per row on smaller screens */
    gap: 0px; /* Adjust the gap for smaller screens */
  padding: 0;
  }
  .services_tab {
    height: 450px;
    overflow: auto;
    width: 100%;
    padding: 10px;
    margin-left: 0px;
  }
  .filters-search{
    width: 100%;
    margin: 0;
    
  }


}

      `}</style>
    </div>
  );
};

export default UserDashboard;

//good colours: #fffd #FF0040,#FF0066, #FF0078, #FA3980, #ffeba7, #ff3c78, #21B6A8 
/**/