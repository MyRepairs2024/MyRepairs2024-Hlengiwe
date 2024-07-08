import React from 'react';
import { useState, useEffect, useRef} from 'react'; 
import { FaUsers, FaUserCircle, FaEnvelope, FaStar, BiDashboard, FaHome,  FaChartBar, FaTools,FaShoppingCart, FaRegPaperPlane, FaCalendarAlt } from 'react-icons/fa';
import Dashheader from './components/dashheader';
import axios from 'axios';
import { Products } from './components/services';
import { createClient } from '@supabase/supabase-js';
import { BarLoader } from "react-spinners";
import { useRouter } from 'next/router';
import { IoWarningSharp } from 'react-icons/io5';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRedo } from '@fortawesome/free-solid-svg-icons';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const supabaseUrl = 'https://hpavlbqbspludmrvjroo.supabase.co';
const supabaseApiKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhwYXZsYnFic3BsdWRtcnZqcm9vIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTAyNzcwODIsImV4cCI6MjAwNTg1MzA4Mn0.HZXbPikgoL0V7sYj7xNPj0FUupXd8hx1JdMrixvq7Xw';

const supabase = createClient(supabaseUrl, supabaseApiKey);
//FaTools

const UserDashboard = (order) => {
  const router = useRouter();
  const { userEmail } = router.query;
  const firstLetter = userEmail ? userEmail.charAt(0).toUpperCase() : '';
const [currentorders, setcurrentorders] = useState([]);
const [pendingorders, setpendingorders] = useState([]);
const [Customers, setCustomers] = useState([]);
const [currentPage, setCurrentPage] = useState(1);
const customersPerPage = 3;
const indexOfLastCustomer = currentPage * customersPerPage;
const indexOfFirstCustomer = indexOfLastCustomer - customersPerPage;
const currentCustomers = Customers.slice(indexOfFirstCustomer, indexOfLastCustomer);


  const [providerEmail, setProviderEmail] = useState('');

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
  const [pendingRequests, setPendingRequests] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const numberOfDisplayedcurrentOrders = currentorders.length;
  const numberOfDisplayedpendingOrders = pendingorders.length;

  const [selectedDate, setSelectedDate] = useState(null);
  const [textDate, setTextDate] = useState('');
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

  const [selectedAvatarFile, setSelectedAvatarFile] = useState(null);
  const [selectedIDFile, setSelectedIDFile] = useState(null);
  const [selectedTradingLicenseFile, setSelectedTradingLicensesFile] = useState(null);
  const [selectedQualificationsFile, setSelectedQualificationsFile] = useState(null);
  const [selectedBusinessRegistrationFile, setSelectedBusinessRegistrationFile] = useState(null);
  const [fetchedUserInfo, setFetchedUserInfo] = useState(null);
  const [prouploadedFiles, setprouploadedFiles] = useState([]);
  const [showWarning, setShowWarning] = useState(true); // Initially show the warning

  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [editedUserInfo, setEditedUserInfo] = useState({});
  const fileInputRefs = {
    avatar: useRef(null),
    ID: useRef(null),
    tradingLicense: useRef(null),
    qualifications: useRef(null),
    businessRegistration: useRef(null),
  };
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadedFiles, setUploadedFiles] = useState([]); // State to store uploaded file names
  const [uploading, setUploading] = useState(false);

  const supabaseUrl = 'https://hpavlbqbspludmrvjroo.supabase.co';
  const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhwYXZsYnFic3BsdWRtcnZqcm9vIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTAyNzcwODIsImV4cCI6MjAwNTg1MzA4Mn0.HZXbPikgoL0V7sYj7xNPj0FUupXd8hx1JdMrixvq7Xw';
   const supabase = createClient(supabaseUrl, supabaseKey);
   const [activeTabOrders, setActiveTabOrders] = useState('current');
   const [activeTabCustomers, setActiveTabCustomers] = useState('current1');
   const [profileImage, setProfileImage] = useState(null);
   const [imageSrc, setImageSrc] = useState('');
const [displayedimage, setDisplayedImage] = useState('');
   const handleDownloadInvoice = (customerEmail) => {
    // Logic to download invoice for the given customer
    console.log(`Downloading invoice for ${customerEmail}`);
  };




  const handleDateChange = (date) => {
    setSelectedDate(date);
    const formattedDate = date ? date.toLocaleDateString('en-US') : '';
    setTextDate(formattedDate);
    // You can handle further actions or update state as needed
  };
  


   const handleTabChangeOrders = (tabName) => {
    setActiveTabOrders(tabName);
    // Fetch the respective orders based on the selected tab if needed
  };

   const acceptServiceRequest = async (requestId) => {
    try {
      const response = await fetch('/api/acceptservice', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ requestId }),
      });
  
      if (response.ok) {
        const result = await response.json();
        console.log('Service accepted:', result);
        // Perform any necessary actions after accepting the service, e.g., updating UI, fetching updated data, etc.
      } else {
        const error = await response.json();
        console.error('Error accepting service:', error);
        // Handle error scenarios in UI or other logic
      }
    } catch (error) {
      console.error('Error accepting service:', error);
      // Handle other errors, if any
    }
  };
  
  
  const handleAcceptOrder = (requestId) => {
    // Call the function to accept the service request
    acceptServiceRequest(requestId);
    // You can also perform other actions here, if needed
  };
  

   const handleRedoFileSelection = (fileType) => {
    switch (fileType) {
      case 'ID':
        setSelectedIDFile(null);
        break;
      case 'avatar':
        setSelectedAvatarFile(null);
        break;
      case 'tradingLicense':
        setSelectedTradingLicensesFile(null);
        break;
      case 'qualifications':
        setSelectedQualificationsFile(null);
        break;
      case 'businessRegistration':
        setSelectedBusinessRegistrationFile(null);
        break;
      default:
        break;
    }
  };

  const handleFileUpload = (fileType, e) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
  
      switch (fileType) {
        case 'ID':
          setSelectedIDFile(file);
          break;
        case 'avatar':
          setSelectedAvatarFile(file);
          break;
        case 'tradingLicense':
          setSelectedTradingLicensesFile(file);
          break;
        case 'qualifications':
          setSelectedQualificationsFile(file);
          break;
        case 'businessRegistration':
          setSelectedBusinessRegistrationFile(file);
          break;
        default:
          break;
      }
    }
  };
  

  const generateUniqueFileName = (originalFileName) => {
    const timestamp = Date.now();
    const randomId = Math.random().toString(36).substring(2, 8);
    const extension = originalFileName.split('.').pop();
    return `${timestamp}_${randomId}.${extension}`;
  };

  const uploadFiles = async () => {
    try {
      const selectedFiles = [
        { type: 'ID', file: selectedIDFile },
        { type: 'avatar', file: selectedAvatarFile },
        { type: 'tradingLicense', file: selectedTradingLicenseFile },
        { type: 'qualifications', file: selectedQualificationsFile },
        { type: 'businessRegistration', file: selectedBusinessRegistrationFile },
      ];
  
      const filesToUpload = selectedFiles.filter((fileObj) => fileObj.file !== null);
  
      if (filesToUpload.length === 0) {
        console.error('No files selected.');
        return;
      }
  
      setUploading(true);
  
      const uploadedFileNames = [];
  
      const storageFolder = {
        avatar: 'avatars/',
        ID: 'IDs/',
        tradingLicense: 'trading_licenses/',
        qualifications: 'qualifications/',
        businessRegistration: 'business_registrations/',
      };
  
      for (const fileObj of filesToUpload) {
        const uniqueFileName = generateUniqueFileName(fileObj.file.name);
  
        const { error: uploadError } = await supabase.storage
          .from('files')
          .upload(storageFolder[fileObj.type] + uniqueFileName, fileObj.file);
  
        if (uploadError) {
          console.error('Error during file upload to storage:', uploadError);
          continue;
        }
  
        uploadedFileNames.push({ [fileObj.type]: uniqueFileName });
      }
  
      setUploading(false);
  
      const providerEmail = localStorage.getItem('userEmail');
      await updateFilesIfEmailMatches(providerEmail, uploadedFileNames);
    } catch (error) {
      console.error('An error occurred during file upload:', error);
      setUploading(false);
    }
  };
  
  const updateFilesIfEmailMatches = async (email, uploadedFileNames) => {
    try {
      const response = await fetch('/api/update-files', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, uploadedFileNames }),
      });
  
      if (response.ok) {
        console.log('Files updated successfully');
      } else {
        console.error('Error updating files:', response.statusText);
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };
  
  
  
  
  
   /* const handleFileInputChange = (event) => {
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
  };*/

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


  const fetchProviderData = async () => {
    try {
      const response = await axios.get('/api/login/user', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (response.status === 200) {
        const { serviceProvider } = response.data;
        setProviderEmail(serviceProvider.email);
      }
    } catch (error) {
      console.error('Error fetching provider email:', error);
    }
  };

  useEffect(() => {
    if (Customers.profilePictureName) {
      fetchAndDisplayImage();
    }
  }, [Customers.profilePictureName]);
  const fetchAndDisplayImage = async () => {
    try {
      const { data, error } = await supabase.storage
        .from('files')
        .download(`avatars/${Customers.profilePictureName}`);
  
      if (error) {
        console.error('Error fetching image:', error);
        // Handle error scenarios if needed
      } else {
        const url = URL.createObjectURL(data);
        setDisplayedImage(url);
      }
    } catch (error) {
      console.error('Error fetching image:', error);
      // Handle error scenarios if needed
    }
  };
  useEffect(() => {
  
    const userEmail = localStorage.getItem('userEmail'); // Fetch userEmail from localStorage or wherever it's stored
  
    const fetchCustomers = async (userEmail) => {
      try {
        const response = await axios.get(`/api/fetchcurrentcus?userEmail=${userEmail}`);
        setCustomers(response.data);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };
    const fetchcurrentOrders = async (userEmail) => {
      try {
        const response = await axios.get(`/api/currentorderslist?userEmail=${userEmail}`);
        setcurrentorders(response.data);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };
    const fetchpendingOrders = async (userEmail) => {
      try {
        const response = await axios.get(`/api/pendingorderslist?userEmail=${userEmail}`);
        setpendingorders(response.data);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };
    const fetchUserInformation = async (email) => {
      try {
        const response = await axios.get(`/api/user-info?userEmail=${email}`);
        setFetchedUserInfo(response.data || {});
        setEditedUserInfo(response.data || {});
        setLoading(false);
      } catch (error) {
        console.error('Error fetching user information:', error);
        setLoading(false);
      }
    };
    const fetchUploadedFiles = async () => {
      try {
        const response = await axios.get(`/api/uploadedfiles?userEmail=${email}`);
        prosetuploadedFiles(response.data); // Assuming response.data is an array of file names
      } catch (error) {
        console.error('Error fetching uploaded files:', error);
      }
    };

    fetchUploadedFiles();
    document.body.style.margin = '0';
    

    if (localStorage.getItem('token')) {
      axios.get('/api/login/user', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .then(response => {
        setUserData(response.data.user);
        
        if (response.data.user.role === 'service_provider') {
          fetchProviderData(); // Fetch provider data if the user is a provider
        }
      })
      .catch(error => console.error('Error fetching user data:', error));
    }
    if (userEmail) {
      fetchUserInformation(userEmail);
      fetchcurrentOrders(userEmail); // Fetch orders for the logged-in user
      fetchpendingOrders(userEmail); // Fetch orders for the logged-in user
      fetchCustomers(userEmail);
    }





  }, [userEmail]);
  const handleEditClick = () => {
    setEditing(true);
  };

  const handleSaveClick = async () => {
    try {
      const dataToSend = {
        ...editedUserInfo,
        dateOfBirth: selectedDate ? selectedDate.toLocaleDateString('en-US') : '', // Convert date to string
      };
  
      await axios.put(`/api/updateinfo?userEmail=${fetchedUserInfo.email}`, dataToSend);
      setFetchedUserInfo(dataToSend);
      setEditing(false);
    } catch (error) {
      console.error('Error updating user information:', error);
    }
  };
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
  
    // For dateOfBirth, update the state differently
    if (name === 'dateOfBirth') {
      setSelectedDate(new Date(value)); // Update selectedDate state
      setTextDate(value); // Update textDate state (if needed)
    } else {
      setEditedUserInfo((prevUserInfo) => ({ ...prevUserInfo, [name]: value }));
    }
  };
  
  


  const handleAcceptRequest = async (userEmail) => {
    try {
      const response = await fetch('/api/acceptrequest', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userEmail: pendingRequests.pro_email }), // Use pendingRequests instead of pendingRequest
      });

      if (response.ok) {
        // Request accepted successfully, update the UI or fetch pending requests again
        await deletePendingRequest(pendingRequests.pro_email);
      await populatePaidRequests(pendingRequests);
 
      } else {
        console.error('Error accepting request:', response.statusText);
      }
    } catch (error) {
      console.error('Error accepting request:', error);
    }
  };
  const handleTabChange2 = (tab1) => {
    setActiveTab2(tab1);
    if (selectedTab === tab1) {
      setSelectedTab('');
      
    } else {
      setSelectedTab(tab1);
    }
  };

  const deletePendingRequest = async (pro_email) => {
    try {
      await fetch('/api/deletependingrequest', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ pro_email }), // Send the provider email to identify the entry to delete
      });
    } catch (error) {
      console.error('Error deleting pending request:', error);
    }
  };
  
  // Define a function to populate the paidrequests table with the same data
  const populatePaidRequests = async (pendingRequest) => {
    try {
      const { pro_email, service, price } = pendingRequest;
  
      await fetch('/api/populatepaidrequests', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ pro_email, service, price }), // Send the data to populate paidrequests
      });
    } catch (error) {
      console.error('Error populating paid requests:', error);
    }
  };

  
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };
  return (

    <div className="dashboard-container">
        
      <div className='mainpage'>
      {expandedPendingServices && (
  <div className='overlay-container'>
    <div className="expanded-content">
      {pendingRequests === null ? ( // Check if pendingRequests is null (while loading)
        <div className="loading-spinner">
          <BarLoader color={"#36D7B7"} loading={true} size={150} />
          <p>Loading pending requests...</p>
        </div>
      ) : pendingRequests.length > 0 ? (
        <div className='requestcard'>
          <h2 className='totalpendingreq'>Awaiting Approval ({pendingRequests.length})</h2>
          {pendingRequests && pendingRequests.length > 0 && (
        <div className="alert-container">
         
            
         
          
        </div>
      )}
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
          <button className='acceptrequest' onClick={() => handleAcceptRequest(pendingRequests.pro_email)}>Accept</button>
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
         <div
  className={`servicesdone ${expandedPendingServices ? 'expanded' : ''}`}
  onClick={() => {
    setExpandedPendingServices(!expandedPendingServices);
    // Perform the database search here
 
  }}
>
 <br/> <h3>Pending Requests</h3>
</div>

  <div className={`pendingservices ${expandedPendingServices ? 'expanded' : ''}`} onClick={() => setExpandedPendingServices(!expandedPendingServices)}>
    <h3>Expenses</h3>
    <div className="progress-circle">
      <progress className="circle-progress" value={pendingServicesProgress} max="100"></progress>
      <span>{pendingServicesProgress}%</span>
    </div>
  </div>

  <div className={`Rewards ${expandedRewards ? 'expanded' : ''}`} onClick={() => setExpandedRewards(!expandedRewards)}>
    <h3>Points</h3>
    <div className="progress-circle">
      <progress className="circle-progress" value={rewardsProgress} max="100"></progress>
      <span>{rewardsProgress}%</span>
    </div>
  </div>
</div>

  
        
            
          </div>

          
        )}
       
        {activeTab === 'services' && (
         
<div style={{ height: '400px', overflow: 'auto', width: '900px', padding: '30px', marginLeft: '40px'}}>
   
      
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

{activeTab2 === 'profile' &&(
<div className='mainpage'>


<Dashheader />
      <div></div>
      <div className='info_container'>
    <div className='pfp_and_files'> 
    <div className='edit_pfp'>
    <h4>Profile Picture</h4>
    <div className='pfp'></div>
   <div className='edit_container1'> <button className='edit_image'>Edit</button></div>
    </div>

      <div className="upload-form">
     <div className='uploadfiles'><p className='fileheading'>Upload Documents</p><button className="upload-button" onClick={uploadFiles} disabled={uploading}>
        {uploading ? 'Uploading...' : 'Upload'}
      </button></div> 
     
      <label htmlFor="avatar-upload" className="custom-file-upload">
    {selectedAvatarFile ? (
      <>
        <span>
          <FontAwesomeIcon icon={faRedo} onClick={() => handleRedoFileSelection('avatar')} />
          &nbsp;&nbsp;&nbsp;&nbsp;
          {selectedAvatarFile.name}
        </span>
      </>
    ) : (
      <span>ID/Passport</span>
    )}
  </label>
  <input
    id="avatar-upload"
    type="file"
    className="visually-hidden"
    onChange={(e) => handleFileUpload('avatar', e)}
    ref={fileInputRefs.avatar}
  />

  <label htmlFor="id-upload" className="custom-file-upload">
    {selectedIDFile ? (
      <>
        <span>
          <FontAwesomeIcon icon={faRedo} onClick={() => handleRedoFileSelection('ID')} />
          &nbsp;&nbsp;&nbsp;&nbsp;
          {selectedIDFile.name}
        </span>
      </>
    ) : (
      <span>Business License</span>
    )}
  </label>
  <input
    id="id-upload"
    type="file"
    className="visually-hidden"
    onChange={(e) => handleFileUpload('ID', e)}
    ref={fileInputRefs.ID}
  />

<label htmlFor="trading-license-upload" className="custom-file-upload">
  {selectedTradingLicenseFile ? (
    <>
      <span>
        <FontAwesomeIcon icon={faRedo} onClick={() => handleRedoFileSelection('tradingLicense')} />
        &nbsp;&nbsp;&nbsp;&nbsp;
        {selectedTradingLicenseFile.name}
      </span>
    </>
  ) : (
    <span>Trading License</span>
  )}
</label>
<input
  id="trading-license-upload"
  type="file"
  className="visually-hidden"
  onChange={(e) => handleFileUpload('tradingLicense', e)}
  ref={fileInputRefs.tradingLicense}
/>

<label htmlFor="qualifications-upload" className="custom-file-upload">
  {selectedQualificationsFile ? (
    <>
      <span>
        <FontAwesomeIcon icon={faRedo} onClick={() => handleRedoFileSelection('qualifications')} />
        &nbsp;&nbsp;&nbsp;&nbsp;
        {selectedQualificationsFile.name}
      </span>
    </>
  ) : (
    <span>Qualifications</span>
  )}
</label>
<input
  id="qualifications-upload"
  type="file"
  className="visually-hidden"
  onChange={(e) => handleFileUpload('qualifications', e)}
  ref={fileInputRefs.qualifications}
/>

<label htmlFor="business-registration-upload" className="custom-file-upload">
  {selectedBusinessRegistrationFile ? (
    <>
      <span>
        <FontAwesomeIcon icon={faRedo} onClick={() => handleRedoFileSelection('businessRegistration')} />
        &nbsp;&nbsp;&nbsp;&nbsp;
        {selectedBusinessRegistrationFile.name}
      </span>
    </>
  ) : (
    <span>Business Registration</span>
  )}
</label>
<input
  id="business-registration-upload"
  type="file"
  className="visually-hidden"
  onChange={(e) => handleFileUpload('businessRegistration', e)}
  ref={fileInputRefs.businessRegistration}
/>

     
    
    </div>
    </div>

    <div className='profile_information'>

 
    <div className="user-info-container">
  {loading ? (
    /*<p>Loading...</p>*/
  ) : (
    <div className="user-info">
      <div className="personalinfo_header">
        <h4 className='personalinfo_heading'>Personal Information</h4>
        {editing && (
          <button className='back_arrow' onClick={() => setEditing(false)}>Back</button>
        )}
        {editing ? (
          <button className='edit_personal' onClick={handleSaveClick}>Save</button>
        ) : (
          <button className='edit_personal' onClick={handleEditClick}>Edit</button>
        )}
      </div>
      
      {/* Display editable fields */}
      {!editing ? (
        <>
       
          <div className="info-item">
                <div className="label">Name:</div>
                <div className="data">{fetchedUserInfo.name || 'N/A'}</div>
              </div>
              <div className="info-item">
                <div className="label">Surname:</div>
                <div className="data">{fetchedUserInfo.surname || 'N/A'}</div>
              </div>
              <div className="info-item">
                <div className="label">Email:</div>
                <div className="data">{fetchedUserInfo.email || 'N/A'}</div>
              </div>
              <div className="info-item">
                <div className="label">Date of Birth:</div>
                <div className="data">{fetchedUserInfo.dateOfBirth || 'N/A'}</div>
              </div>
              <div className="info-item">
                <div className="label">Identification Type:</div>
                <div className="data">{fetchedUserInfo.identificationType || 'N/A'}</div>
              </div>

              <div className="info-item">
                <div className="label">Phone:</div>
                <div className="data">{fetchedUserInfo.phone || 'N/A'}</div>
              </div>
              <div className="info-item">
            <div className="label">Country:</div>
            <div className="data">{fetchedUserInfo.country || 'N/A'}</div>
          </div>
          <div className="info-item">
            <div className="label">City:</div>
            <div className="data">{fetchedUserInfo.city || 'N/A'}</div>
          </div>
          <div className="info-item">
            <div className="label">ZIP:</div>
            <div className="data">{fetchedUserInfo.zip || 'N/A'}</div>
          </div>
          <div className="info-item">
            <div className="label">Street:</div>
            <div className="data">{fetchedUserInfo.street || 'N/A'}</div>
          </div>
          <div className="info-item">
            <div className="label">Building No:</div>
            <div className="data">{fetchedUserInfo.buildingNo || 'N/A'}</div>
          </div>
          <div className="info-item">
            <div className="label">Company Name:</div>
            <div className="data">{fetchedUserInfo.companyName || 'N/A'}</div>
          </div>
          <div className="info-item">
            <div className="label">Company Registration:</div>
            <div className="data">{fetchedUserInfo.companyRegistration || 'N/A'}</div>
          </div>
        </>
      ) : (
        <div className='editablecont'>
        {/* Display editable fields */}
     
        <div className="info-item">
                <div className="label">Name:</div>
                <input
                  type="text"
                  name="name"
                  value={editedUserInfo.name || ''}
                  onChange={handleInputChange}
                />
              </div>
              <div className="info-item">
                <div className="label">Surname:</div>
                <input
                  type="text"
                  name="surname"
                  value={editedUserInfo.surname || ''}
                  onChange={handleInputChange}
                />
              </div>
              <div className="info-item">
                <div className="label">Email:</div>
                <div className="label-text" style={{ color: 'red', fontSize: '13px', marginTop: '2px' }}>Not allowed.</div>

                <input
                  type="text"
                  name="email"
                  value={editedUserInfo.email || ''}
                  onChange={handleInputChange}
                  readOnly
                />
              </div>
              <div className="info-item">
      <div className="label">Date of Birth:</div>
      <div className="date-picker-container">
        <input
          type="text"
          name="dateOfBirth"
          value={textDate}
          onChange={handleInputChange}
          placeholder="Select date"
        />
        <div className="icon" onClick={() => document.getElementById('datePicker').click()}>
          <FaCalendarAlt />
        </div>
        <DatePicker
          id="datePicker"
          selected={selectedDate}
          onChange={handleDateChange}
          dateFormat="MM/dd/yyyy" // Customize the date format if needed
          showYearDropdown
          minDate={new Date(new Date().setFullYear(new Date().getFullYear() - 70))}
          maxDate={new Date(new Date().setFullYear(new Date().getFullYear() - 18))}
          scrollableYearDropdown
          className="d-none"
        />
      </div>
    </div>
    <div className="info-item">
        <div className="label">Nationality:</div>
        <select
        type="text"
          name="nationality"
          value={editedUserInfo.nationality || ''}
          onChange={handleInputChange}
        >
                    <option value="Select">Select</option>

          <option value="South-Africa">South Africa</option>
        </select>
      </div>
      <div className="info-item">
        <div className="label">Identification Type:</div>
        <select
        type="text"
          name="identificationType"
          value={editedUserInfo.identificationType || ''}
          onChange={handleInputChange}
        >
          <option value="">Select</option>
          <option value="ID">ID</option>
          <option value="Passport">Passport</option>
        </select>
      </div>
      <div className="info-item">
            <div className="label">ID/Passport No:</div>
            <input
              type="text"
              name="IDPassport_No"
              value={editedUserInfo.IDPassport_No || ''}
              onChange={handleInputChange}
            />
          </div>
      <div className="info-item">
        <div className="label">Gender:</div>
        <select
          type="text"
          name="gender"
          value={editedUserInfo.gender || ''}
          onChange={handleInputChange}
        >
                    <option value="Select">Select</option>

          <option value="Male">Male</option>
          <option value="Female">Female</option>

        </select>
      </div>

      <div className="info-item">
        <div className="label">Country:</div>
        <select
          type="text"
          name="country"
          value={editedUserInfo.country|| ''}
          onChange={handleInputChange}
        >
        <option value="Select">Select</option>
         <option value="South Africa">South Africa</option>

        </select>
      </div>

      <div className="info-item">
        <div className="label">Province:</div>
        <select
        type="text"
          name="province"
          value={editedUserInfo.province || ''}
          onChange={handleInputChange}
        >
         <option value="Select">Select</option>
          <option value="Gauteng">Gauteng</option>
        </select>
      </div>

          <div className="info-item">
            <div className="label">City:</div>
            <input
              type="text"
              name="city"
              value={editedUserInfo.city || ''}
              onChange={handleInputChange}
            />
          </div>
          <div className="info-item">
            <div className="label">ZIP:</div>
            <input
              type="text"
              name="zip"
              value={editedUserInfo.zip || ''}
              onChange={handleInputChange}
            />
          </div>
          <div className="info-item">
            <div className="label">Street:</div>
            <input
              type="text"
              name="street"
              value={editedUserInfo.street || ''}
              onChange={handleInputChange}
            />
          </div>
          <div className="info-item">
            <div className="label">Building No:</div>
            <input
              type="text"
              name="buildingNo"
              value={editedUserInfo.buildingNo || ''}
              onChange={handleInputChange}
              
            />
          </div>
          <div className="info-item">
            <div className="label">Phone:</div>
            <input
              type="text"
              name="phone"
              value={editedUserInfo.phone || ''}
              onChange={handleInputChange}
            />
          </div>
          <div className="info-item">
            <div className="label">Company Name:</div>
            <input
              type="text"
              name="companyName"
              value={editedUserInfo.companyName || ''}
              onChange={handleInputChange}
            />
          </div>
          <div className="info-item">
            <div className="label">Company Reg:</div>
            <input
              type="text"
              name="companyRegistration"
              value={editedUserInfo.companyRegistration || ''}
              onChange={handleInputChange}
            />
          </div>
      </div>
    )}
  </div>
)}
</div>
        <div className='Submittedfiles'>

        {showWarning && (
        <div className='warning-container'>
          <p>Please refrain from uploading new files as this may replace your already approved files.</p>
        </div>
      )}
      <div className='Submittedfiles'>
        <h3>Uploaded File Names</h3>
        {prouploadedFiles.length > 0 ? (
          <ul>
            {prouploadedFiles.map((fileName, index) => (
              <li key={index}>{fileName}</li>
            ))}
          </ul>
        ) : (
          <p>No files uploaded yet.</p>
        )}
      </div>
        
        </div>
    
  </div>
  </div>
  </div>
  )}
 
 {activeTab2 === 'orders' &&(
  <div className='mainpage'>
    <Dashheader/>
    <div></div>
<div className='orders_container'>
<a href="#" onClick={() => handleTabChangeOrders('current')}>Current Orders</a>
          <a href="#" onClick={() => handleTabChangeOrders('pending')}>Pending Orders</a>
          <a href="#" onClick={() => handleTabChangeOrders('total')}>Total Orders</a>
  {activeTabOrders === 'current' && (
    <>
      <div className='countedorders'><div className='ordersummary_title'><h1>Current Orders</h1></div><div className='ordersummary_number'>{numberOfDisplayedcurrentOrders}</div></div>

        <div className='orderslist'>
        <div className="grid-container">
        <div className="item1">Customer Name</div>
        <div className="item2">Service Description</div>
        <div className="item3">Service Information</div>
        </div>
            {currentorders.map((order, index) => (
              <div className='orders_container1' key={index}>
                {order.cus_email && (
                  <div className='customerName'>{order.cus_email}</div>
                )}
                {order.sevice_description&& (
                  <div className='serviceDescription'>{order.sevice_description}</div>
                )}
                {order.date && (
                  <div className='orderDate'>
      <div className='orderdate_price'>R{order.price}</div>
                    <div className='orderdate_date'>{order.date}</div>
                   <div className='orderdate_button'> <button onClick={() => handleAcceptOrder(order.id)}>Accept Order</button></div>
                  </div>
                )}
              </div>
            ))}
          </div>
          </>
      )}

      {activeTabOrders === 'pending' && (
        <>
         <div className='countedorders'><div className='ordersummary_title'><h1>Pending Orders</h1></div><div className='ordersummary_number'>{numberOfDisplayedpendingOrders}</div></div>

         <div className='orderslist'>
         <div className="grid-container">
         <div className="item1">Customer Name</div>
         <div className="item2">Service Description</div>
         <div className="item3">Service Information</div>
         </div>
             {pendingorders.map((order, index) => (
               <div className='orders_container1' key={index}>
                 {order.cus_email && (
                   <div className='customerName'>{order.cus_email}</div>
                 )}
                 {order.sevice_description&& (
                   <div className='serviceDescription'>{order.sevice_description}</div>
                 )}
                 {order.date && (
                   <div className='orderDate'>
       <div className='orderdate_price'>R{order.price}</div>
                     <div className='orderdate_date'>{order.date}</div>
                    <div className='orderdate_button'> <button onClick={() => handleAcceptOrder(order.id)}>Accept Order</button></div>
                   </div>
                 )}
               </div>
             ))}
           </div>
        </>
      )}

      {activeTabOrders === 'total' && (
        <>
      
          </>
      )}
  
</div>
  </div>
 )}
  
  {activeTab2 === 'Customers' &&(
  <div className='mainpage'>
    <Dashheader/>
    <a href="#" onClick={() => handleTabChangeCustomers('current1')}>Current Customers</a>
          <a href="#" onClick={() => handleTabChangeCustomers('pending1')}>Pending Customers</a>
{activeTabCustomers === 'current1' &&(
<>
<div className='customers1'>
        {Customers.map((order, index) => (
          <div className='customer_card' key={index}>
            <div className='firstsection'>
            <div className='profileimagename'><h3>Current Customer</h3></div>

            <div className='profileimage'>

            {displayedimage && <img src={displayedimage} alt="Profile" />}
            </div>
            <div className='cusnameheading'><h3>Customer Email</h3></div>
            <div className='cus_email'>{order.cus_email}</div>
<div  className='contactcubutton'><button>Contact Customer</button></div>
            </div>
            <div className='invoice_container'>
              <div className='invoice'>
               <div className='custotalinvoices'><p>Total Invoices</p><h4>****</h4></div>
               <div className='cuservices'><p>Progress</p></div>
               <div className='cusallinvoices'><p>All Invoices</p><button onClick={() => handleDownloadInvoice(order.cus_email)}>View Invoices</button></div>

              
              </div>
            </div>
          </div>
        ))}
      </div>
      {Customers.length > customersPerPage && (
        <div className='pagination'>
          {/* Render pagination buttons for navigating to the next page */}
          <button onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>
            Previous
          </button>
          <button onClick={() => setCurrentPage(currentPage + 1)} disabled={indexOfLastCustomer >= Customers.length}>
            Next
          </button>
        </div>
      )}


</>
)}
  </div>
 )}
  
  {activeTab2 === 'My Services' &&(
  <div className='mainpage'>
    <Dashheader/>
<div className='myserviceheader'><h3>My Services</h3><button>Add New Service</button></div>
<div className='AddingConatiner'>
<div className='service1'><div className='imgsev1'></div><div className='descrip1'>
<div className='input_servicename'><label htmlFor="serviceName">Service Name:</label> <input type="text" id="serviceName" name="serviceName" /></div>

<div className='input_servicedescrip'> <label htmlFor="description">Description:</label>
  <textarea id="description" name="description"></textarea></div>

  <div className='input_serviceavail'> <label htmlFor="availability">Availability:</label>
  <select id="availability" name="availability">
    <option value="available">Available</option>
    <option value="notAvailable">Not Available</option>
    {/* Add other availability options as needed */}
  </select>
  <label htmlFor="hourlyRate">Hourly Rate:</label>
  <input type="text" id="hourlyRate" name="hourlyRate" />
  </div>
</div></div>
<div className='service2'><div className='imgsev1'></div><div className='descrip2'>
<div className='input_servicename'><label htmlFor="serviceName">Service Name:</label> <input type="text" id="serviceName" name="serviceName" /></div>

<div className='input_servicedescrip'> <label htmlFor="description">Description:</label>
  <textarea id="description" name="description"></textarea></div>

  <div className='input_serviceavail'> <label htmlFor="availability">Availability:</label>
  <select id="availability" name="availability">
    <option value="available">Available</option>
    <option value="notAvailable">Not Available</option>
    {/* Add other availability options as needed */}
  </select>
  <label htmlFor="hourlyRate">Hourly Rate:</label>
  <input type="text" id="hourlyRate" name="hourlyRate" />
  </div>


  
  
  </div></div>

</div>
  </div>
  

 )}
  
  {activeTab2 === 'Analytics' &&(
  <div className='mainpage'>
    <Dashheader/>

  </div>
 )}
      </div>
    
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
<div className='username'>{userEmail}</div>


<div className="dashboard-content">
<div className={`dashboard-section ${selectedTab === 'dashboard' ? 'active' : ''}`}
          onClick={() => handleTabChange2('dashboard')}>
          <div className="dashboard-section-header" >
            <FaHome className="dashboard-section-icon" />
            <h3 className="dashboard-section-title">Dashboard</h3>
          </div>
          
        </div>
        <div className={`dashboard-section ${selectedTab === 'profile' ? 'active' : ''}`}
          onClick={() => handleTabChange2('profile')}>
          <div className="dashboard-section-header"  >
            <FaUserCircle className="dashboard-section-icon" />
            <h3 className="dashboard-section-title">Profile</h3>
          </div>
          
        </div>
        <div className={`dashboard-section ${selectedTab === 'orders' ? 'active' : ''}`}
          onClick={() => handleTabChange2('orders')}>
          <div className="dashboard-section-header"  >
            <FaRegPaperPlane className="dashboard-section-icon" />
            <h3 className="dashboard-section-title">Orders</h3>
          </div>
          
        </div>
        
        <div className={`dashboard-section ${selectedTab === 'Customers' ? 'active' : ''}`}
          onClick={() => handleTabChange2('Customers')}>          <div className="dashboard-section-header">
            <FaUsers className="dashboard-section-icon" />
            <h3 className="dashboard-section-title">Customers</h3>
          </div>
         
         
        </div>
        <div className={`dashboard-section ${selectedTab === 'My Services' ? 'active' : ''}`}
          onClick={() => handleTabChange2('My Services')}>          <div className="dashboard-section-header">
            <FaTools className="dashboard-section-icon" />
            <h3 className="dashboard-section-title">My Services</h3>
          </div>
          
          </div>

          <div className={`dashboard-section ${selectedTab === 'Analytics' ? 'active' : ''}`}
          onClick={() => handleTabChange2('Analytics')}>          <div className="dashboard-section-header">
            <FaChartBar className="dashboard-section-icon" />
            <h3 className="dashboard-section-title">Analytics</h3>
          </div>
          
          </div>

         


      </div>
 

    
      <style jsx>{`.edit_personal1{
        margin: 0;
        padding: 0;
        padding: 8px;
        background: #ff0068;
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
        border-bottom: 1px solid #ff0068;
        height: 450px;
        padding: 10px;

      }
      .heading_fav{
        width: 100%;
        border-bottom: 1px solid #ff0068;

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
        border: 1px solid #ff0068;


      }
      .condition_msg{
        width: 500px;
        margin-bottom: 10px;
        border: 1px solid #ff0068;
        height: 80px;
        border-radius: 5px;
        text-align: center;
      }
      .current_msg{
        width: 500px;
        border: 1px solid #ff0068;
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
        border: 1px solid #ff0068;
        height: 80px;
        border-radius: 5px;
      }
      .all_msg{
        border: 1px solid #ff0068;
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
        background: #ff0068;
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
        border: 2px solid #ff0068;
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
        border: 2px solid #ff0068;
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
        border: 2px solid #ff0068;
        box-shadow: 0 0  5px #ff0068;

      }
      .p_container2{
        width: 350px;
        height: auto;
        padding: 10px;
        margin-right: 25px;
        border-radius: 5px;
        border: 2px solid #ff0068;
        box-shadow: 0 0  5px #ff0068;
      }
      .p_container3{
        width: 200px;
        height: auto;
        padding: 10px;
        margin-right: 25px;
        border-radius: 5px;
        border: 2px solid #ff0068;
        box-shadow: 0 0  5px #ff0068;

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
        border-bottom: 2px solid #ff0068; /* Pink border line at the bottom of each cell */
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
  border-bottom: 2px solid #ff0068;
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
        border-bottom: 2px solid #ff0068;
        border-top: 2px solid #ff0068;
        padding: 10px;

      }
      .payments_title{
        font-family: poppins
        font-size: 18px;
        margin-bottom: 20px;
      }

      .receipts{
        border: 2px solid #ff0068;
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
        background: #ff0068;
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
       background: #ff0068;
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
      
. {
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
  color: #ff0068;
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
color: #ff0068;
  background-color: #ff0068;
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
background: #ff0068;
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
 
  background-color: #ff0068;
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
     color: #ff0068;
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
          border-top: 2px solid #FF0068;
          border-bottom: 2px solid #FF0068;
          margin-bottom: 0px;
         
         
          width:100%;
          border-radius: 10px;
          background: linear-gradient(to right, #21B6A8 , #FF0068);
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
.Rewards{

  padding-left: 8px;
  color: azure;
  height: 100px;
  width: 200px;
  border-radius: 10px;
  background-color:#ff0068;
  cursor: pointer;

}
.popular_heading{
  margin-left: 35px;
}
.popularservice_heading {
  position: relative;
  color: #ff0068;
  font-size: 17px;
  font-weight: bold;
  font-family: poppins;
  margin: 0;
  padding: 10px;
}

.popularservice_heading:before{
  content: '';
  border-top: 2px solid #ff0068; /* Adjust the style and color as needed */
  display: block;
  width: 4%; /* Adjust the line width as needed */
  position: absolute;
  top: 50%;
}
.popularservice_heading:after {
  content: '';
  border-top: 2px solid #ff0068; /* Adjust the style and color as needed */
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
        border-left: 2px solid #ff0068;
        border-right: 2px solid #ff0068;

}
.my_services{
  height: 260px;
  overflow: auto;
  width: 950px;
  padding-top: 30px;
  padding-bottom: 30px;
  margin-top: 30px;
  border-left: 2px solid #ff0068;
  border-right: 2px solid #ff0068;
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
    color: #ff0068;
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
  color: #ff0068;
    background-color:white;
   width: 170px;
   z-index: 99999;
    text-decoration: none;
    font-style: none;
    
  
    .dashboard-section-header{
      color:#ff0068;
      width: 60px;
      font-size: 30px;
    }
    .dashboard-section-body{
      color:#ff0068;
    }
    .dashboard-section-title{
      color: #ff0068;
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


//pink colours: #FF0040,#FF0066, #FF0078, #FA3980, #ffeba7, #ff3c78, #21B6A8,#007bff, #0056b3
/* <form onSubmit={handleSubmit} >

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
</form>*/