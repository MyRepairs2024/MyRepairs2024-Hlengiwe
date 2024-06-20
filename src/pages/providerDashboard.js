import React from 'react';
import { useState, useEffect, useRef} from 'react'; 
import { FaUsers, FaUserCircle, FaEnvelope, FaStar, BiDashboard, FaHome,  FaChartBar, FaTools,FaShoppingCart, FaRegPaperPlane, FaCalendarAlt } from 'react-icons/fa';
import Dashheader from './components/dashheader';
import axios from 'axios';
import { Products } from './components/services';
import { createClient } from '@supabase/supabase-js';
import { BarLoader } from "react-spinners";
import { useRouter } from 'next/router';
import { IoWarningSharp } from 'react-icons/io5';;
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import BarChart from './BarChart';
import { generateServiceDeliveryData } from './dataGenerator';

const supabaseUrl = 'https://hpavlbqbspludmrvjroo.supabase.co';
const supabaseApiKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhwYXZsYnFic3BsdWRtcnZqcm9vIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTAyNzcwODIsImV4cCI6MjAwNTg1MzA4Mn0.HZXbPikgoL0V7sYj7xNPj0FUupXd8hx1JdMrixvq7Xw';

const supabase = createClient(supabaseUrl, supabaseApiKey);
//FaTools
const styles = {
  container: {
    textAlign: 'center',
    marginTop: '50px',
    backgroundColor: '#ff0068',
    color: '#fff',
    fontSize: '14px',
    fontFamily: 'Arial',
    padding: '20px', // Added padding for the container
    borderRadius: '10px', // Added border radius for a rounded appearance
  },
  
  header: {
    alignItems: 'left',
    justifyContent: 'space-between', // Adjusted spacing
    marginBottom: '20px',
    width: '20px',
  },
  formContainer: {
    backgroundColor: '#40E0D0',
    padding: '10px',
    borderRadius: '10px',
    width: '300px', // Adjusted width to make it smaller
    margin: '0 auto', // Centered the form container horizontally
    marginTop: '20px'
  },
  logoContainer: {
    position: 'absolute',
    top: '10px',
    left: '10px',
    zIndex: 1,
  },
  
  logo: {
    width: '170px', // Adjusted logo width to be slightly bigger
    height: 'auto',
    borderRadius: '50%',
    backgroundColor: 'none',
  },
  
  icon: {
    fontSize: '40px', // Increased font size for the icon
    marginBottom: '-3px', // Adjusted margin for icon
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
    width: '180px',
    padding: '12px',
    marginBottom: '10px', // Increased marginBottom for double lines
   marginLeft:'-620px',
    display: 'grid',
    alignItems: 'left',
    margin: '10px auto',
    borderRadius: '0px',
  },
  
  button: {
    padding: '10px 20px',
    backgroundColor: '#fff',
    color: '#000',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontFamily: 'Arial',
    textAlign: 'center',
    width: '100px',
    margin: '20px auto',
    borderRadius: '20px',
  },
};

const UserDashboard = (order) => {
const [servicePerformanceData] = useState(generateServiceDeliveryData());
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
const [selectedDate, setSelectedDate] = useState(new Date());
const [textDate, setTextDate] = useState('');
const [orders, setOrders] = useState([]);



//for backend
const [serviceRequests, setServiceRequests] = useState([]);

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
  const [error, setError] = useState(null);
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
  const [editMode, setEditMode] = useState(false);


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

  //to fetch services from user dashboard/index page
  useEffect(() => {
    const fetchServiceRequests = async () => {
      try {
        // Fetch service requests from the server
        const response = await axios.get('/api/electrician-requests');
        setServiceRequests(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching service requests:', error);
        setError('Error fetching service requests. Please try again later.');
        setLoading(false);
      }
    };

    fetchServiceRequests();
  }, []);



  useEffect(() => {
    const fetchOrders = async () => {
      try {
        // Fetch orders based on the active tab
        let response;
        if (activeTabOrders === 'current') {
          response = await axios.get('http://your-backend-api-url/current-orders');
        } else if (activeTabOrders === 'pending') {
          response = await axios.get('http://your-backend-api-url/pending-orders');
        } else if (activeTabOrders === 'total') {
          response = await axios.get('http://your-backend-api-url/all-orders');
        }
        setOrders(response.data);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrders();
  }, [activeTabOrders]);


 

  const [newService, setNewService] = useState({
    serviceName: '',
    description: '',
    availability: 'available',
    hourlyRate: '',
    servicePhoto: null,
  });

  const handlePhotoChange = (e) => {
   const photoFile = e.target.files[0];
   setNewService({ ...newService, servicePhoto: photoFile });
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
  
  const [showAddingContainer, setShowAddingContainer] = useState(false);

  const handleAddNewService = () => {
    console.log('Adding service...');
    setShowAddingContainer(true); // Set the state to true when clicking "Add New Service" button
  };
  

  const handleSave = () => {
    // Logic for saving new service
    setShowAddingContainer(false); // Close the adding container after saving
  };
  const handleEdit = () => {
    setShowAddingContainer(!showAddingContainer);
  };
  const [showPopup, setShowPopup] = useState(false);

  const handleContactCustomer = () => {
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

 // Filter service requests based on active tab
 const filteredRequests = serviceRequests.filter((request) => {
  if (activeTabOrders === 'current') return request.status === 'current';
  if (activeTabOrders === 'pending') return request.status === 'pending';
  return true; // For 'total' or any other case, show all requests
});

const handleSubmit = async (e) => {
  e.preventDefault();
 // Handle user registration and get user data
 console.log('Form data submitted:', formData);
 window.location.href = '/user-dashboard';
 const responseGoogle = (response) => {
   console.log('Google Login Response:', response);
   // Use the response to extract user information and update your state or perform any other actions
 };
 const responseFacebook = (response) => {
   console.log('Facebook Login Response:', response);
   // Use the response to extract user information and update your state or perform any other actions
 };
 

 // Use a try-catch block to handle errors during Supabase interaction
 console.log('Submit button clicked');

 try {
   
   await axios.post('/api/formsubmit', formData); // Replace with your API endpoint URL
   console.log('Form data submitted successfully');
 } catch (error) {
   console.error('Error submitting form:', error);
 }   
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
  const toggleEdit = () => {
    setEditMode(!editMode);
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
//new code for months review
  const [selectedMonth, setSelectedMonth] = useState('January'); // Default to January
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  const handleMonthChange = (event) => {
    setSelectedMonth(event.target.value);
  };

  // Dummy service reviews data for each month (you can replace this with your actual data)
  const serviceReviewsByMonth = {
    January: 'Great service in January!',
    February: 'Excellent service in February!',
    March: 'Amazing service in March!',
    // Add reviews for other months here
  };


  const [selectedPicture, setSelectedPicture] = useState(null);

    function handleSelectPicture() {
        document.getElementById('pictureInput').click();
    }

    function handlePictureInputChange(event) {
        const file = event.target.files[0]; // Get the selected file
        setSelectedPicture(file); // Store the selected file in state
        const pfp = document.querySelector('.pfp'); // Get the pfp div
        pfp.innerHTML = ''; // Clear any existing content
        const img = document.createElement('img'); // Create an img element
        img.src = URL.createObjectURL(file); // Set src attribute to the selected image
        img.alt = 'Profile Picture'; // Set alt attribute
        img.style.maxWidth = '100%'; // Set maximum width to fit inside the pfp div
        img.style.height = '100%'; 
        img.style.width = '100%'; 
        img.style.maxHeight = '150px'; // Set maximum height (adjust as needed)
        img.style.borderRadius = '50%';
        pfp.appendChild(img); // Append the img element to the pfp div
    }
  
  
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

  const handleServicePerformance = (serviceId) => {
    // Logic to track service performance for service provider
  };

  useEffect(() => {
    if (expandedPendingServices) {
      // Perform the database search when expandedPendingServices changes
      axios.get('your-api-endpoint')
        .then(response => {
          // Assuming the response data is an array of search results
          setSearchResults(response.data);
        })
        .catch(error => {
          console.error('Error fetching data:', error);
        });
    }
 }, [expandedPendingServices]);
  
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

    // Assuming you have the user data stored in variables
const userData = {
  date: "2024-04-20",
  email: "johndoe@example.com",
  totalSales: 1000,
  income: 500,
};
// Function to populate the info elements with user data
// Function to retrieve provider data (replace with your implementation)
async function getProviderData() {
  try{
  const url = "https://localhost:3000/user-dashboard"; // Replace with your API endpoint
  const response = await fetch(url);
  const data = await response.json();
 // Process successful response data
} catch (error) {
  console.error("Failed to fetch provider data:", error);
  // Handle the error (e.g., display an error message to the user)
}
  
}

function updateUserData() {
  const currentProvider = getProviderData();
  const previousProvider = sessionStorage.getItem("previousProvider");

  // Store previous provider (if it exists)
  if (previousProvider) {
    userData.previousProviders = userData.previousProviders || []; // Initialize if not already present
    userData.previousProviders.push(JSON.parse(previousProvider)); // Store as object
  }

  // Update current provider and store in session storage
  userData.currentProvider = currentProvider;
  sessionStorage.setItem("previousProvider", JSON.stringify(currentProvider));
}

// Call updateUserData to initially set providers
updateUserData();

// Example usage throughout your application:
console.log("Current provider:", userData.currentProvider);
console.log("Previous provider:", userData.previousProviders ? userData.previousProviders[userData.previousProviders.length - 1] : null);




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




  
  const handleDownloadpdf = () => {
    // Create a new Blob object with the text content
    const blob = new Blob(['.analytics-container'], { type: 'application/pdf' });

    // Create a link element
    const link = document.createElement('a');

    // Set the href attribute of the link to the Blob object
    link.href = URL.createObjectURL(blob);

    // Set the download attribute to specify the filename
    link.download = 'filename.pdf';

    // Append the link to the document body
    document.body.appendChild(link);

    // Click the link to trigger the download
    link.click();

    // Remove the link from the document body
    document.body.removeChild(link);
  };
  function initAutocomplete() {
    var input = document.getElementById('street');
    var autocomplete = new google.maps.places.Autocomplete(input);
}



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

<div className="dashcontent">
<div className="dashboard-content">


<div className={`dashboard-section ${selectedTab === 'dashboard' ? 'active' : ''}`}
          onClick={() => handleTabChange2('dashboard')}>
          <div className="dashboard-section-header" >
            <FaHome className="dashboard-section-icon" />
            <h3 className="dashboard-section-title">Dashboard</h3>
          </div>
          <div className='active_Tab'>&gt;
</div>


        </div>
        
        
        <div className={`dashboard-section ${selectedTab === 'profile' ? 'active' : ''}`}
          onClick={() => handleTabChange2('profile')}>
          <div className="dashboard-section-header"  >
            <FaUserCircle className="dashboard-section-icon" />
            <h3 className="dashboard-section-title">Profile</h3>
          </div>

          <div className='active_Tab'>
          &gt;
</div>

        </div>
        <div className={`dashboard-section ${selectedTab === 'orders' ? 'active' : ''}`}
          onClick={() => handleTabChange2('orders')}>
          <div className="dashboard-section-header"  >
            <FaRegPaperPlane className="dashboard-section-icon" />
            <h3 className="dashboard-section-title">Orders</h3>
          </div>
          <div className='active_Tab'>
&gt;
</div>
        </div>
        
        <div className={`dashboard-section ${selectedTab === 'Customers' ? 'active' : ''}`}
          onClick={() => handleTabChange2('Customers')}>          <div className="dashboard-section-header">
            <FaUsers className="dashboard-section-icon" />
            <h3 className="dashboard-section-title">Customers</h3>
          </div>
          <div className='active_Tab'>
&gt;
</div>
         
        </div>
        <div className={`dashboard-section ${selectedTab === 'My Services' ? 'active' : ''}`}
          onClick={() => handleTabChange2('My Services')}>          <div className="dashboard-section-header">
            <FaTools className="dashboard-section-icon" />
            <h3 className="dashboard-section-title">My Services</h3>
          </div>
          <div className='active_Tab'>
&gt;
</div>
          </div>

          <div className={`dashboard-section ${selectedTab === 'Analytics' ? 'active' : ''}`}
          onClick={() => handleTabChange2('Analytics')}>          <div className="dashboard-section-header">
            <FaChartBar className="dashboard-section-icon" />
            <h3 className="dashboard-section-title">Analytics</h3>
          </div>
          <div className='active_Tab'>
&gt;
</div>
          </div>
</div>
<div className='btn_logout'>
      <button className='logsout'>Log Out</button>
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
          <div><Dashheader />
      <hr/>
      <nav className='maindash'>
          <a href="#" onClick={() => handleTabChange('overview')}>Updates</a>
          <a href="#" onClick={() => handleTabChange('services')}>Reviews</a>
          <a href="#" onClick={() => handleTabChange('accounts')}>Account</a>
          


          <div className="account-link">
          <div className="search-container">
          <input type="text" placeholder="Search..." className="search-input" />
          <a href="#" onClick={() => handleTabChange('accounts')}>
          <span className="search-symbol" role="img" aria-label="Search">&#128269;</span>
          </a>
</div>
</div>

 
        

        </nav>
        
        {activeTab === 'services' && (
          <div>
 <div className='popularservice_heading'>
     Service Performance
       </div>
    
    <div className="services-wrapper">
        <BarChart servicePerformanceData={servicePerformanceData} months={months} />

   </div>
   
   <h2>Days</h2>
   
        </div>  
        )}


{activeTab === 'overview' && (
          <div className='ScrollableContainer'> {/* Add a class or style for a fixed height */}
          
          <div className='Dash-Container'>
         <div className="metrics">
         <div className={`servicesdone ${expandedPendingServices ? 'expanded' : ''}`}
         onClick={() => {
          setExpandedPendingServices(!expandedPendingServices);
          }}
>
    <h3>Pending Requests</h3>
    <div className="progress-circle">
      <progress className="circle-progress" value={pendingServicesProgress} max="100"></progress>
      <span>{pendingServicesProgress}%</span>
    </div> 
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



<div className="container">
      {/* First Set of Containers */}
      <div className="set">
        <div className='updates-Container'>Service Description
        <h2>Service Description</h2>
        <p style={{ fontWeight: 'normal' }}>Repairing a Samsung fridge</p>
        
        </div>
        <div className='updates-Container'>Service Description
        <h2>Service Description</h2>
        <p style={{ fontWeight: 'normal' }}>Repairing a Microwave</p>
        
        </div>
        
        
      </div>

      {/* Second Set of Containers */}
      <div className="set">
        <div className='updates-Container'>Client
        <p style={{ fontWeight: 'normal', color: 'black' }}>Name: <span style={{ color: '#40E0D0' }}>Jane Smith</span></p>
    <p style={{ fontWeight: 'normal',color: 'black'  }}>Address: <span style={{ color: '#40E0D0' }}>456 Oak Avenue</span></p>
    <p style={{ fontWeight: 'normal' ,color: 'black' }}>Service Date: <span style={{ color: '#40E0D0' }}>20|05|2024</span></p>
        </div>
        <div className='updates-Container'>Client
        <p style={{ fontWeight: 'normal', color: 'black' }}>Name: <span style={{ color: '#40E0D0' }}>Jane Smith</span></p>
    <p style={{ fontWeight: 'normal',color: 'black'  }}>Address: <span style={{ color: '#40E0D0' }}>456 Oak Avenue</span></p>
    <p style={{ fontWeight: 'normal' ,color: 'black' }}>Service Date: <span style={{ color: '#40E0D0' }}>20|05|2024</span></p>
        </div>
        
      </div>


      <div className="set">
      <div className='updates-Container'>Services Rating
      <div class="stars">
        <span class="star">&#9733;</span>
        <span class="star">&#9733;</span>
        <span class="star">&#9733;</span>
        <span class="star">&#9733;</span>
        <span class="star">&#9733;</span>
        <p style={{ fontWeight: 'bold' ,color: 'black' }}>Service Price:<br></br><span style={{ color: '#ff0068' }}>R350</span></p>
      </div>
      </div>
      <div className='updates-Container'>Services Rating
      <div class="stars">
        <span class="star">&#9733;</span>
        <span class="star">&#9733;</span>
        <span class="star">&#9733;</span>
        <span class="star">&#9733;</span>
        <span class="star">&#9733;</span>
        <p style={{ fontWeight: 'bold' ,color: 'black' }}>Service Price:<br></br><span style={{ color: '#ff0068' }}>R350</span></p>
      </div>
      </div>
      </div>
      </div>
      </div>   
        </div>         
        )}
 

   

        {activeTab === 'accounts' && (
           <div className='ScrollableContainer'> {/* Add a class or style for a fixed height */}
          <div>
              <div className='countedorders'>
            <div className='ordersummary_title'><h1>Total Earnings</h1></div>
            <div className='ordersummary_number'>{numberOfDisplayedcurrentOrders}</div>
            <button className="button">View Invoices</button>
          </div>


          <div className='orderslist'>
            <div className="grid-container1">
              <div className="item3">Client</div>
          <div className="item3">Service</div>
          <div className="item3">Transaction Type</div>
          <div className="item3">Balance change</div>
          <div className="item3">Order</div>
          <div className="item3">Date</div>
         
          </div>
          </div>
          
          </div>
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
<div>


      <Dashheader />
      <div></div>
      <div className='Profiletab'>
   <div className='edit_pfp'>
   <h4>Profile Picture</h4>
            <div className='pfp'></div>
            <p className='Name_Surname'></p>
            <div className='edit_container1'> 
                {/* Visible button or label to trigger file input click */}
                <button className='edit_image' onClick={handleSelectPicture}>Edit</button>
                
                {/* Hidden file input element */}
                <input 
                    type="file" 
                    id="pictureInput" 
                    style={{ display: 'none' }} 
                    accept="image/*" 
           npm         onChange={handlePictureInputChange} 
                />
            </div>
   <div>
 
    <div className="upload-section">
        <label htmlFor="upload_id">Upload ID:</label>
        <input type="file" id="upload_id" name="upload_id" />
    </div>
    {/* Upload Certificates */}
    <div className="upload-section">
        <label htmlFor="upload_certificates">Company Registration Certificates:</label>
        <input type="file" id="upload_certificates" name="upload_certificates" />
    </div>
</div>
    </div>
   
    <div className='profile_information'>
      <div className='personalinfo_header'><h4 className='personalinfo_heading'>Personal Information</h4> 
      <button className='edit_personal' onClick={toggleEdit}>Edit</button>
      </div>
      <div className='User_info'>
    <div className='fetched_salut'>
        <strong>
            <label htmlFor="salutation" style={{color: '#454545', fontFamily: 'poppins', fontWeight: 'bold'}}>Salutation:</label>
        </strong>
        <input type="text" id="salutation" name="salutation" />
    </div>
    <div className='fetched_name'>
        <strong>
            <label htmlFor="profile_name" style={{color: '#454545', fontFamily: 'poppins', fontWeight: 'bold'}}>Name:</label>
        </strong>
        <input type="text" id="profile_name" name="profile_name" />
    </div>
    <div className='fetched_surname'>
        <strong>
            <label htmlFor="profile_surname" style={{color: '#454545', fontFamily: 'poppins', fontWeight: 'bold'}}>Surname:</label>
        </strong>
        <input type="text" id="profile_surname" name="profile_surname" />
    </div>
    <div className='fetched_dob'>
        <strong>
            <label htmlFor="dob" style={{color: '#454545', fontFamily: 'poppins', fontWeight: 'bold'}}>Date of Birth:</label>
        </strong>
        <input type="date" id="dob" name="dob" />
    </div>
    <div className='fetched_phone'>
        <strong>
            <label htmlFor="phone" style={{color: '#454545', fontFamily: 'poppins', fontWeight: 'bold'}}>Phone:</label>
        </strong>
        <input type="text" id="phone" name="phone" />
    </div>
    <div className='fetched_email'>
        <strong>
            <label htmlFor="email" style={{color: '#454545', fontFamily: 'poppins', fontWeight: 'bold'}}>Email:</label>
        </strong>
        <input type="email" id="email" name="email" />
    </div>
    <div className='fetched_country'>
        <strong>
            <label htmlFor="country" style={{color: '#454545', fontFamily: 'poppins', fontWeight: 'bold'}}>Country:</label>
        </strong>
        <select id="country" name="country">
            <option value="South Africa">South Africa</option>
            <option value="Canada">Canada</option>
            <option value="UK">UK</option>
            {/* Add more countries as needed */}
        </select>
    </div>
    <div className='fetched_city'>
        <strong>
            <label htmlFor="city" style={{color: '#454545', fontFamily: 'poppins', fontWeight: 'bold'}}>City:</label>
        </strong>
        <input type="text" id="city" name="city" />
    </div>
    <div className='fetched_zip'>
        <strong>
            <label htmlFor="zip" style={{color: '#454545', fontFamily: 'poppins', fontWeight: 'bold'}}>ZIP:</label>
        </strong>
        <input type="text" id="zip" name="zip" />
    </div>
    <div className='fetched_street'>
        <strong>
            <label htmlFor="street" style={{color: '#454545', fontFamily: 'poppins', fontWeight: 'bold'}}>Street:</label>
        </strong>
        <input type="text" id="street" name="street" />
    </div>
    <div className='fetched_building'>
        <strong>
            <label htmlFor="building" style={{color: '#454545', fontFamily: 'poppins', fontWeight: 'bold'}}>Building:</label>
        </strong>
        <input type="text" id="building" name="building" />
    </div>
</div>
{editMode && (
  <>
        <div className='edit-personal-info-container'>
        <div className='editinfo_header1'><h4 className='personalinfo_heading'></h4> 
        <div className='editbuttons'>
      <button className='edit_personal1' onClick={toggleEdit}>Save</button>
      <button className='edit_personal2' onClick={toggleEdit}>Cancel</button>
      </div>
      </div>
          
        </div>
          </>
      )}
      </div>
      
    </div>

   
  </div>
  )}

 
 {activeTab2 === 'orders' && (
   <div className='mainpage' style={{ height: '100vh', overflowY: 'auto' }}>
  
  <div className='mainpage'>
   
    <Dashheader/>
    
    <div className='orders_container'>
      <a href="#" onClick={() => handleTabChangeOrders('current')}>Current Orders</a>
      <a href="#" onClick={() => handleTabChangeOrders('pending')}>Pending Orders</a>
      <a href="#" onClick={() => handleTabChangeOrders('total')}>Total Orders</a>


      {activeTabOrders === 'current' && (
        <>
          <div className='countedorders'>
            <div className='ordersummary_title'><h1>Current Orders</h1></div>
            <div className='ordersummary_number'>{serviceRequests.length}</div>
          </div>

          <div className='orderslist'>
            <div className="grid-container">
              <div className="item1">Customer Name</div>
          <div className="item2">Service Description</div>
          <div className="item3">Service Information</div>
          {serviceRequests.map((request,index) => (
            <React.Fragment key={index}>
          <div className="item1">{request.name}</div>
          <div className="item2">{request.description}</div>
          <div className="item3">
          {`R${request.price}`}
           <br/> 
           {`${request.startDate} to ${request.endDate}`}
           <br />
          <button className="contact-customer" onClick={handleContactCustomer}>
        Contact Customer
      </button>

      {showPopup && (
        <div className="popup-container">
          <div className="popup-content">
            {/* Content of your popup */}
            
            <p>Text</p>
            <p>Call</p>

            <button className="close-button" onClick={handleClosePopup}>Close</button>
          </div>
        </div>
      )}
         </div>
         </React.Fragment>
          ))}        
              </div>
              

            {currentorders.map((order, index) => (
              <div className='orders_container1' key={index}>
                <div className='customerName'>{order.cus_email}</div>
                <div className='serviceDescription'>{order.sevice_description}</div>
                <div className='serviceInfo'>
                  <div>R{order.price}</div>
                  <div>{order.date}</div>
                  <div>
                    <button onClick={() => handleAcceptOrder(order.id)}>Accept Order</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {activeTabOrders === 'pending' && (
        <>
          <div className='countedorders'>
            <div className='ordersummary_title'><h1>Pending Orders</h1></div>
            <div className='ordersummary_number'>{numberOfDisplayedpendingOrders}</div>
          </div>

          <div className='orderslist'>
            <div className="grid-container">
              <div className="item1">Customer Name</div>
          <div className="item2">Service Description</div>
          <div className="item3">Service Information</div>
          <div className="item1">Joe</div>
          <div className="item2">Fixing an Ottimo Microwave</div>
          <div className="item3">R350<br></br>01|10|2023 to 31|12|2024<br></br> 
          <button className="contact-customer" onClick={handleContactCustomer}>
        Contact Customer
      </button>
      {showPopup && (
        <div className="popup-container">
          <div className="popup-content">
            {/* Content of your popup */}
            
            <p>Text</p>
            <p>Call</p>

            <button className="close-button" onClick={handleClosePopup}>Close</button>
          </div>
        </div>
      )}
          </div>
          
            </div>

            {pendingorders.map((order, index) => (
              <div className='orders_container1' key={index}>
                <div className='customerName'>{order.cus_email}</div>
                <div className='serviceDescription'>{order.sevice_description}</div>
                <div className='serviceInfo'>
                  <div>R{order.price}</div>
                  <div>{order.date}</div>
                  <div>
                    <button onClick={() => handleAcceptOrder(order.id)}>Accept Order</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {activeTabOrders === 'total' && (
        <>  <div className='countedorders'>
        <div className='ordersummary_title'><h1>Total Orders</h1></div>
        <div className='ordersummary_number'>{numberOfDisplayedpendingOrders}</div>
      </div>

      <div className='orderslist'>
        <div className="grid-container">
          <div className="item1">Customer Name</div>
          <div className="item2">Service Description</div>
          <div className="item3">Service Information</div>
          <div className="item1">Matthew</div>
          <div className="item2">Repairing a Washing Machine</div>
          <div className="item3">R350<br></br>01|10|2023 to 31|12|2024<br></br> 
          <button className="contact-customer" onClick={handleContactCustomer}>
        Contact Customer
      </button>
      {showPopup && (
        <div className="popup-container">
          <div className="popup-content">
            {/* Content of your popup */}
            
            <p>Text</p>
            <p>Call</p>

            <button className="close-button" onClick={handleClosePopup}>Close</button>
          </div>
        </div>
      )}
          </div>
          
        </div>

        {pendingorders.map((order, index) => (
          <div className='orders_container1' key={index}>
            <div className='customerName'>{order.cus_email}</div>
            <div className='serviceDescription'>{order.sevice_description}</div>
            <div className='serviceInfo'>
              <div>R{order.price}</div>
              <div>{order.date}</div>
              <div>
                <button onClick={() => handleAcceptOrder(order.id)}>Accept Order</button>
              </div>
            </div>
          </div>
        ))}
      </div>
          
        </>
      )}
    </div>
  </div>
  </div>

 
  
)}
{activeTab2 === 'Customers' && (
  <div className='mainpage'>
    <div className='mainpage' style={{ height: '100vh', overflowY: 'auto' }}>
    <Dashheader />
    <div>
      <a href="#" onClick={(event) => { event.preventDefault(); handleTabChangeCustomers('current1'); }}>
        Current Customers
      </a>
      <a href="#" onClick={(event) => { event.preventDefault(); handleTabChangeCustomers('pending1'); }}>
        Pending Customers
      </a>
    </div>
    
    

    {activeTabCustomers === 'current1' && (
       
      <div className='customers-container current-container pink-border'>
       <div className='info'>
        
          {/* Container for customer name */}
          <div className='info-item pink'>

            <p>Current Customer</p>
            
            <img src="person_Icon1.png" alt="Picture Icon" className="icon1" />
            <p className="customer-name">Customer Name</p>

        <button className='small-button' onClick={handleContactCustomer}>
          Contact Customer
        </button>
        {showPopup && (
        <div className="popup-container">
          <div className="popup-content">
            {/* Content of your popup */}
            
            <p>Text</p>
            <p>Call</p>

            <button className="close-button" onClick={handleClosePopup}>Close</button>
          </div>
        </div>
      )}
       
              </div>
           
          
          
          
          {/* Container for service description */}
          <div className='info-item pink'>
            <p>Current Customer</p>
           <img src="person_Icon1.png" alt="Picture Icon" className="icon1" />
           <p className="customer-name">Customer Name</p>
           <button className='small-button' onClick={handleContactCustomer}>
          Contact Customer
        </button>
      

             </div>
         
          {/* Container for information description */}
          <div className='info-item pink'>
            <p>Current Customer</p>
            <img src="person_Icon1.png" alt="Picture Icon" className="icon1" />
            <p className="customer-name">Customer Name</p>
             <button className='small-button' onClick={handleContactCustomer}>
          Contact Customer
          </button>
          
           
            
           
            
          </div>  
        </div>
        <div className='small-containers-container'>
    <div className='small-container'>
      <div class='content'>
        <div class='title'>Total Services 01</div>
        <div class='line'></div>
        <button className='container-button'>View Invoices</button>
      </div>
    </div>

    <div className='small-container'>
      <div class='content'>
        <div class='title'>Total Services 02</div>
        <div class='line'></div>
        <button className='container-button'>View Invoices</button>
      </div>
    </div>

    <div className='small-container'>
      <div class='content'>
        <div class='title'>Total Services 03</div>
        <div class='line'></div>
        <button className='container-button'>View Invoices</button>
      </div>
    </div>
  </div>
         <div className='customers1'>
          {Customers.map((customer, index) => (
            <div className='customer-card' key={index}>
              
            </div>
          ))}
        </div>
        {Customers.length > customersPerPage && (
          <div className='pagination'>
            <button onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>
              Previous
            </button>
            <button onClick={() => setCurrentPage(currentPage + 1)} disabled={indexOfLastCustomer >= Customers.length}>
              Next
            </button>
          </div>
        )}
      </div>
    )}

    {activeTabCustomers === 'pending1' && (
      <div className='customers-container pending-container pink-border'>
        <h2>Pending Customers</h2>
        <div className='pending-customers'>
          {/* Your pending customers rendering logic */}
          {/* ... */}
        </div>
        {PendingCustomers.length > customersPerPage && (
          <div className='pagination'>
            <button onClick={() => setPendingCurrentPage(pendingCurrentPage - 1)} disabled={pendingCurrentPage === 1}>
              Previous
            </button>
            <button
              onClick={() => setPendingCurrentPage(pendingCurrentPage + 1)}
              disabled={indexOfLastPendingCustomer >= PendingCustomers.length}
            >
              Next
            </button>
          </div>
        )}
      </div>  
    )}
  </div>
  </div>
  
)}
{activeTab2 === 'My Services' && (
  <div className='mainpage' style={{ height: '1000vh', overflowY: 'auto' }}>
    <div className='mainpage'>
      <Dashheader/>
      <div className='myserviceheader'>
        <h3>My Services</h3>
        <button onClick={handleAddNewService}>Add New Service</button>
      </div>
      {showAddingContainer && (
      <div className='AddingContainer'>
        <div className='service1'>
          <div className='imgsev1'>
            {newService.servicePhoto && (
              <img src={URL.createObjectURL(newService.servicePhoto)} alt="Service" />
            )}
            <div className='input_servicephoto'>
              <button type="button" id="servicePhotoButton" onClick={() => document.getElementById('servicePhoto').click()}>
                <i className="fas fa-camera"></i> {/* FontAwesome camera icon */}
                Upload Service Photo
              </button>
              <input type="file" id="servicePhoto" name="servicePhoto" accept="image/*" onChange={handlePhotoChange} style={{ display: 'none' }} />
            </div>
          </div>
          <div className='descrip1'>
            <div className='input_servicename'>
              <label htmlFor="serviceName">Service Name:</label>
              <select id="serviceName" name="serviceName">
                <option value="Electrician">Electrician</option>
                <option value="Plumbing">Plumbing</option>
                <option value="Fridge Repairs">Fridge Repairs </option>
                {/* Add more options as needed */}
              </select>
              <button onClick={handleSave}>Save</button>
            </div>
            <div className='input_servicedescrip'>
              <label htmlFor="description">Description:</label>
              <textarea id="description" name="description"></textarea>
            </div>
            <div className='input_serviceavail'>
              <label htmlFor="availability">Availability:</label>
              <select id="availability" name="availability">
                <option value="available">Monday-Friday</option>
                <option value="available">Monday-Sunday</option>
                <option value="notAvailable">Unavailable</option>
                {/* Add other availability options as needed */}
              </select>
              <label htmlFor="hourlyRate">Hourly Rate:</label>
              <input type="text" id="hourlyRate" name="hourlyRate" />
            </div>
          </div>
        </div>
        <div className='service2'>
          <div className='imgsev1'>
            {newService.servicePhoto && (
              <img src={URL.createObjectURL(newService.servicePhoto)} alt="Service" />
            )}
            <div className='input_servicephoto'>
              <button type="button" id="servicePhotoButton" onClick={() => document.getElementById('servicePhoto').click()}>
                Upload Service Photo
              </button>
              <input type="file" id="servicePhoto" name="servicePhoto" accept="image/*" onChange={handlePhotoChange} style={{ display: 'none' }} />
            </div>
          </div>
          <div className='descrip2'>
            <div className='input_servicename'>
              <label htmlFor="serviceName">Service Name:</label>
              <select id="serviceName" name="serviceName">
                <option value="Electicity Installation">Electicity Installation</option>
                <option value="Electrical Repair">Electrical Repair</option>
                <option value="Apliance Services">Apliance Services</option>
                {/* Add more options as needed */}
              </select>
              <button onClick={handleSave}>Save</button>
            </div>
            <div className='input_servicedescrip'>
              <label htmlFor="description">Description:</label>
              <textarea id="description" name="description"></textarea>
            </div>
            <div className='input_serviceavail'>
              <label htmlFor="availability">Availability:</label>
              <select id="availability" name="availability">
                <option value="available">Monday-Friday</option>
                <option value="available">Monday-Sunday</option>
                <option value="notAvailable">Not Available</option>
                {/* Add other availability options as needed */}
              </select>
              <label htmlFor="hourlyRate">Hourly Rate:</label>
              <input type="text" id="hourlyRate" name="hourlyRate" />
            </div>
          </div>
        </div>
      </div>
      )}
      <div className="top-containers" style={{ marginTop: '20px' }}>
  <div className="pink-container">
  <span className="service-name">Cleaning</span>
  <br></br>
  <span className="line"></span>
  <p className="email-address">refiloemokhothotso@gmail.com</p>
  <span className="line"></span>
  <span className="price">Price :<br></br>R500<br></br>Monday-Friday</span>
  <button className="edit-button" onClick={handleEdit}>Edit</button>
  </div>
  <div className="pink-container">
  <span className="service-name">Electrician</span>
  <br></br>
  <span className="line"></span>
  <p className="email-address">refiloemokhothotso@gmail.com</p>
  <span className="line"></span>
  <span className="price">Price :<br></br>R500<br></br>Monday-Friday</span>
  <button className="edit-button" onClick={handleEdit}>Edit</button>
  </div>
  <div className="pink-container">
  <span className="service-name">Painting</span>
  <br></br>
  <span className="line"></span>
  <p className="email-address">refiloemokhothotso@gmail.com</p>
  <span className="line"></span>
  <span className="price">Price :<br></br>R500<br></br>Monday-Friday</span>
  <button className="edit-button" onClick={handleEdit}>Edit</button>
  </div>
</div>
<div className="top-containers" style={{ marginTop: '20px' }}>
  <div className="pink-container">
  <span className="service-name">Plumbing</span>
  <br></br>
  <span className="line"></span>
  <p className="email-address">refiloemokhothotso@gmail.com</p>
  <span className="line"></span>
  <span className="price">Price :<br></br>R500<br></br>Monday-Friday</span>
  <button className="edit-button" onClick={handleEdit}>Edit</button>
  </div>
  <div className="pink-container">
  <span className="service-name">Electrician</span>
  <br></br>
  <span className="line"></span>
  <p className="email-address">refiloemokhothotso@gmail.com</p>
  <span className="line"></span>
  <span className="price">Price :<br></br>R500<br></br>Monday-Friday</span>
  <button className="edit-button" onClick={handleEdit}>Edit</button>
  </div>
  <div className="pink-container">
  <span className="service-name">TV Repairing</span>
  <br></br>
  <span className="line"></span>
  <p className="email-address">refiloemokhothotso@gmail.com</p>
  <span className="line"></span>
  <span className="price">Price :<br></br>R500<br></br>Monday-Friday</span>
  <button className="edit-button" onClick={handleEdit}>Edit</button>
  </div>

      </div>
      
    </div>
  </div>
)}
 
 
  
 {activeTab2 === 'Analytics' && (
  <div className='mainpage' style={{ height: '100vh', overflowY: 'auto' }}>
    <Dashheader/>
    <a href="#" onClick={() => handleTabChange('totalRequests')} className="tab-link">Total Requests</a>
<a href="#" onClick={() => handleTabChange('successfulOrders')} className="tab-link">Successful Orders</a>
<a href="#" onClick={() => handleTabChange('totalRevenue')} className="tab-link">Total Revenue</a>
<a href="#" onClick={() => handleTabChange('totalExpenses')} className="tab-link">Total Expenses</a>


{activeTab === 'totalRequests' && (
             <div className='analytics-container'>
             <select>
               <option value="2022">2020</option>
               <option value="2023">2021</option>
               <option value="2024">2022</option>
               <option value="2022">2023</option>
               <option value="2023">2024</option>
               <option value="2024">2025</option>
               {/* Add more options as needed */}
             </select>
           
               <div className="set-of-containers">
                 <div className="smallanalytics-container">January | R1000</div>
                 <div className="smallanalytics-container">February | R2500</div>
                 <div className="smallanalytics-container">March | R 2000</div>
               </div>
               <div className="set-of-containers">
                 <div className="smallanalytics-container">April | R 1500</div>
                 <div className="smallanalytics-container">May | R 3000</div>
                 <div className="smallanalytics-container">June | R2000</div>
               </div>
               <div className="set-of-containers">
                 <div className="smallanalytics-container">July | R3000</div>
                 <div className="smallanalytics-container">August | R1000</div>
                 <div className="smallanalytics-container">September | R1000</div>
               </div>
               <div className="set-of-containers">
                 <div className="smallanalytics-container">October | R1000</div>
                 <div className="smallanalytics-container">November | R1000</div>
                 <div className="smallanalytics-container">December | R1000</div>
               </div>
               <button onClick={handleDownloadpdf} style={{marginTop: '20px'}}>Download PDF</button>
             </div>
          )}

          {activeTab === 'successfulOrders' && (
             <div className="analytics-container">
    
             <div className="item10">CUSTOMER NAME</div>
         <div className="item11">SERVICE DESCRIPTION</div>
         <div className="item12">ORDER NO</div>
         <div className="item13">SERVICE INFORMATION</div>
       
          
         
         <button onClick={handleDownloadpdf} style={{marginTop: '20px'}}>Download PDF</button>
         
         
        
         
           </div>
          )}

          {activeTab === 'totalRevenue' && (
             <div className="analytics-container">
             <select>
               <option value="2022">2020</option>
               <option value="2023">2021</option>
               <option value="2024">2022</option>
               <option value="2022">2023</option>
               <option value="2023">2024</option>
               <option value="2024">2025</option>
               {/* Add more options as needed */}
             </select>
             <p>Year</p>
             <div className="tiny-container">
               January|R 2000
            
         
         
         </div>
             <div className="totalrevenue-container">
               <p>Total Revenues: 52</p>
               <p>Total Order: 25</p>
               <p>Successful Order: 15</p>
               <p>Total Expenses: R1000</p>
               <p>Total Revenue: R100000</p>
               <p>Total Points: 05</p>
            
           </div>
           <button onClick={handleDownloadpdf} style={{marginTop: '20px'}}>Download PDF</button>
         
             </div>
          )}

          {activeTab === 'totalExpenses' && (
            <div className="analytics-container">
    
    <div className="item10">CUSTOMER NAME</div>
         <div className="item11">EXPENSE DESCRIPTION</div>
         <div className="item12">ORDER NO</div>
         <div className="item13">EXPENSE INFORMATION</div>
         
        <button onClick={handleDownloadpdf} style={{marginTop: '20px'}}>Download PDF</button>
          </div>
          )}    
          
  </div>
)}

  
      </div>
  
    
      <style jsx>{`

body {
font-family: Arial, sans-serif;
  margin: 0;
  padding: 0;
  background-color: #f7f7f7;
}
  hr {
  border: none;
  border-top: 1px solid #ddd;
  margin: 20px 0;
}

.logsout{
  background-color: #fff;
  color: #FF0066;
  border: none;
  padding: 8px 18px;
   cursor: pointer;
  width: 80%;
  border-radius: 5px;
  cursor: pointer;
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

.dashcontent{    
  width: 150px;
  padding: 0px;
  margin-left: 0px;
}

@media (min-width: 768px) {
  .UserDashboard {
    flex-direction: row;
  }

  .img-and-title {
    flex-direction: column;
    align-items: center;
    width: 250px;
  }
    .dashboard-container {
    flex-direction: row;
    width: 250px;
  }

  .dashboard-content {
    height: 100vh;
  }
    .mainpage {
    flex: 1;
    overflow-y: auto;
  }

  .active_Tab {
    display: block;
    margin-left: auto;
  }
      }

@media (max-width: 767px) {
  .img-and-title {
    justify-content: space-between;
    padding: 10px;
  }

  .dashboard-content {
    flex-direction: row;
    overflow-x: auto;
    white-space: nowrap;
  }

  .dashboard-section {
    display: inline-block;
    padding: 10px 20px;
  }

  .mainpage {
    padding: 10px;
  }
}



.profile_information{
  overflow: auto;
 
}
  .date-picker-container input{
    visibility: hidden;
    display: none;
  }
.info-item select{
width: 173px;
padding: 5px;

}
.info-item{
margin-bottom: 5px;

}
 
  .AddingConatiner{
    width: 940px;
  }
  .service1{
    display: flex;
    width: 100%
    padding: 10px;
    justify-content: space-between;
margin-bottom: 30px;
  }
  .imgsev1{
padding: 5px;
border: 2px solid #ff0068;
width: 200px;
height: 200px;
border-radius: 5px;

  }
  .descrip1{
    border-radius: 5px;

    width: 650px;
    height: 200px;
    padding: 5p;
    border: 2px solid #ff0068;

  }
  .service2{
    display: flex;
    width: 100%
    padding: 10px;
    justify-content: space-between;

  }
  .imgsev2{
padding: 5px;
border: 2px solid #;
width: 200px;
height: 110px;
border-radius: 5px;
  }

  .info-container {
    display: flex; /* Arrange elements horizontally */
    border-radius: 5px;  /* Add some rounded corners */
    padding: 0px;  /* Add some padding for spacing */
    margin-left:-615px;
    width:810px;
    height:40px;
    margin-top:20px;
  }
  
  .info-item {
    flex: 1; /* Distribute equally within container */
    padding: 10px; /* Add some padding */
    border: 1px solid #ddd; /* Add a border */
    text-align: center; /* Center text content */
    width: 1000px;
    margin-right: 5px;
    background-color:#F0F0F0;
  color:#000;
  }
  .button-container {
    display: flex;
    border-radius: 5px;  /* Add some rounded corners */
  padding: 0px;  /* Add some padding for spacing */
  margin-left:-615px;
  
}
  .button-container button {
    width: 1000px;
    background-color:#40B5AD;  /* Set button background color */
    margin-right: 100px; /* Add some margin between buttons */
    border: 2px solid #fff;  /* Add a border */
    border-radius: 3px;  /* Add rounded corners to buttons */
    cursor: pointer;  /* Change cursor to indicate clickability */
    font-weight: bold; /* Make button text bold */
    margin-right: 5px;
    border-radius: 12px;
    color:#fff;
  }
  
  .button-container button:last-child {
    margin-right: 0; /* Remove margin from the last button */
  }
  .descrip2{
    border-radius: 5px;
    width: 650px;
    height: 200px;
    padding: 5p;
    border: 2px solid #ff0068;
   
    
  }
  .myserviceheader{
    display: flex;
    justify-content: space-between;
    padding: 5px;
    align-items: center;
width: 940px;
  }
  .myserviceheader button{
    color: #fff;
    font-weight: bold;

    
    background:  #21B6A8;
  }
  .profileimage img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .profileimagename{
    width: 100%;
    padding: 3px;
    
  }
  .cusnameheading{
    width: 100%;
    justify-content: center;
    display: flex;
    margin: 0 auto;


  }
  .contactcubutton button{
    margin: 0;
    padding: 10px;
    background:  #21B6A8;
    color: #fff;
    font-weight: bold;
    border-style: none;


  }
  .contactcubutton{
    display: flex;
    justify-content: center;
    width: 100%;
    margin: 0 auto;
  
  }
  .firstsection{
    border: 2px solid #ff0068;
    border-radius: 10px;
    margin-bottom: 10px;
    width: 250px;
    height: 350px;
    padding: 5px;
    padding-top: 0;
    box-shadow: 0 1px 4px #ff0068;
    transition: box-shadow 0.3s ease;


  }
  .firstsection:hover{
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);

  }
  .customers1 {
    display: grid;
    grid-template-columns: repeat(3, 0fr);
    gap: 10px;

    margin-top: 20px;
  }
  
  /* Style for each customer card */
  .customer_card {
  

    padding: 10px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
  }
  

  
  /* Style for profile images */
  .profileimage {
    width: 150px;
    height: 150px;
    border-radius: 50%;
    overflow: hidden;
    margin: 0 auto;
    margin-top: 10px;

    
  }
  
  .profileimage img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
  
  /* Style for the customer email */
  .cus_email {
    font-weight: bold;
    text-align: center;
    margin: 0 auto;
    margin-bottom: 10px;
  }
  
  /* Style for the invoice section */
  .invoice_container {
    border: 2px solid #ff0068;
    width: 100%;
    text-align: center;
    border-radius: 8px;
    box-shadow: 0 1px 4px #ff0068;
    transition: box-shadow 0.3s ease;

  }
  .invoice_container:hover{
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);

  }
  
  .invoice {
    height: 115px;
    padding: 5px;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }
  


  .custotalinvoices{
    display: flex;
    width: 100%;
    justify-content: space-between;
    margin: 0;
    margin-bottom: 5px;
    margin-top: 8px;
    font-weight: bold;
    border-bottom: 1px solid #ff0068;
    padding-bottom: 8px;


  }
  .cuservices{
display: flex;
width: 100%;
justify-content: space-between
margin: 0;
font-size: 14px;
margin-bottom: 5px;
font-weight: bold;
border-bottom: 1px solid #ff0068;
padding-bottom: 8px;
padding-top: 8px;


  }
  .cuservices p{
    margin: 0;
    padding: 0;
  }
  .cusallinvoices{
    display: flex;
    width: 100%;
    margin: 0;
    margin-bottom: 5px;
    align-items: center;
    justify-content: space-between;
    font-weight: bold;
    padding-bottom: 8px;

  }
  .custotalinvoices p{
    font-size: 14px;
    padding: 0;
    margin: 0;
  }
  .custotalinvoices h4{
    font-size: 14px;
    padding: 0;
    margin: 0;
  }
  .cusallinvoices p{
    font-size: 14px;
    padding: 0;
    margin: 0;
  }
  .cusallinvoices button{
    font-size: 14px;
    padding: 10px;
    margin: 0;
    background:  #21B6A8;
    color: #fff;
    font-weight: bold;
    border-style: none;

  }

  /* Style for pagination buttons */
  .pagination {
    display: flex;
    justify-content: center;
    margin-top: 20px;
  }
  
  .pagination button {
    padding: 8px 16px;
    margin: 0 5px;
    border: none;
    background-color: #007bff;
    color:  #ff0068;
    cursor: pointer;
    border-radius: 5px;
  }
  
  .pagination button:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
  .orders_container2{
    border: 2px solid #ff0068;
    display: block;
    

  }


  .cus_email{
  }

  /* Grid container for order details */
  .grid-container {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 10px;
    margin-top: 20px;
  }
  /* Grid item styles */
  .grid-container .item1,
  .grid-container .item2,
  .grid-container .item3 {
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 5px;
    background-color: #f9f9f9;
  }
  .grid-container .item1 {
    font-weight: bold;
  }

  /* Contact customer button */
.contact-customer {
  margin-top: 10px;
  padding: 5px 10px;
  color: white;
  background-color: #E71E5B;
  border: none;
  border-radius: 3px;
  cursor: pointer;
}
.contact-customer:hover {
  background-color: #d3154a;
}
  .orders_container1 {
    padding: 10px;
    display: grid;
    grid-template-columns: repeat(3, 1fr); /* Three columns */
    grid-gap: 80px;
    overflow: hidden;

  }

  .customerName {
    padding: 5px;
    width: 250px;
    display:flex;
    overflow: hidden;
    border-bottom: 2px solid #ff0068;

  }

  .serviceDescription {
    padding: 5px;

    width: 280px;
    display:flex;
    overflow: hidden;
    border-bottom: 2px solid #ff0068;


  }
  .input_servicephoto {
    display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 110px;
  color: #fff;
  
 
}
.input_servicephoto img {
  max-width: 100%; /* Ensure the image does not exceed its container's width */
  max-height: 200px; /* Set the maximum height as needed */
  margin-top: 10px; /* Add margin for spacing */
}
    
    
  }
  .input_servicephoto button {
    
    width: 50px;
    height: 50px; 
    padding: 10px;
    background-color: #008080;
    color: #fff;
    border: none;
    cursor: pointer;
    margin-top: 150px;
    display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 50%; /* Set border-radius to 50% for a circular shape */
 
 
  }
  
  .input_servicephoto input[type="PNG"] {
    /* Your styles for the file input */
    display: none; /* Hide the file input */
  }
  
  .input_servicephoto .uploaded-photo {
    margin-top: 10px;
  }
  
  .input_servicephoto .uploaded-image {
    width: 2px; /* Set your desired width */
    height: 1px; /* Set your desired height */
   
  }
  
  .current-container,
  .pending-container {
    /* Add specific styles for the current and pending containers if needed */
  }
  .customers1 {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    flex-direction: row;

  }
  
  .customer-card {
    width: 30%;
    border: 1px solid #ccc;
    padding: 10px;
    margin: 10px;
  }
  
  }
  .container {
    display: flex; /* Use flexbox */
    justify-content: space-between; /* Distribute space between the containers */
  }
  
  .pink {
    display: flex;
    background-color: #fff;
    border: 3px solid #ff0068; /* Set the border color to dark pink */
    width: 300px;
    height: 330px;
    flex-direction: row;
    margin-top: 30px;
    display: flex; /* Use flexbox */
    border-radius: 10px;

  }
  .pink-border {
    display: column; /* Use flexbox */
    display: grid;
    

  }
  .info {
    display: flex;
    justify-content: space-between; /* Optional: Adjust this based on your layout preferences */
    
    
    
  }
  .info-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    
    
  }
  
  
  
  .info-item p {
    color: black;
    font-size: 20px;
    font-weight: bold;
    text-align: right;
    font-family: 'Arial', sans-serif;
  }
  
  .info-item img {
      width: 80px; /* Set the desired width for the image */
      height: 80px; /* Set the desired height for the image */
      object-fit: cover; /* Adjust the object-fit property as needed (e.g., 'contain', 'fill') */
      margin-right: 10px; /* Add some margin to separate the image from other content */
      display: block; /* Ensure the image is a block element for centering */
      margin-left: auto; /* Auto margin to center the image within its container */
      margin-right: auto; /* Auto margin to center the image within its container */
      margin-top: -30 px;
    }
    
    .small-container {
      background-color: #fff;
      color: #000000;
      font-weight: bold;
      margin-top: 20px;
      border: 3px solid #ff0068;
      height: 100px;
      width: 300px;
      position: relative;
      border-radius: 10px;
      display: inline-block;
      
      
    
    }
.small-container::before {
  content: '';
  position: absolute;
  left: 0;
  top: 50%;
  width: 100%;
  border-top: 3px solid #ff0068;
  transform: translateY(-50%);
}
.info {
  display: flex;
  flex-direction: row;
}

.small-containers-container {
  display: flex;
  flex-direction: row;
}

.small-container {
  flex: 1s;
  margin-right: 10px; /* Adjust as needed */
}



.small-button {
  font-size: 14px;
  
  align-items: left; /* Center items vertically */
  display: flex;
  background-color: #027777; /* Set the background color to light green */
 
  color: #fff;

  
  
}
.customer-name {
  text-align: center;
  margin-top: -10px;
  font-family: 'Arial', sans-serif;
  box-sizing: border-box; /* Include padding and border in the element's total width and height */

}


.container {
  display: flex;
  justify-content: flex-start;
  align-items: left;
  
}
.set {

  display: flex;
  flex-direction: column;
  align-items: left;
  background-color: #fff;
  margin-right: auto; /* Push updates container to the left */
}

.updates-Container {
  border: 3px solid #ff0068;
  padding: 10px;
  margin: 5px;
  width: 280px; /* Adjust width */
  height: 150px; /* Adjust height */
  margin-top: 30px;
  border-radius: 10px; /* Adjust the value to change the roundness */ 
  font-family: Arial, sans-serif; /* Set font family to Arial */
  font-weight: bold; /* Set font weight to bold */
  color: black; /* Set text color to black */
  font-size: 20px; /* Set font size to 20 pixels */
  position: relative;
}

.updates-Container::before
 {
  content: "";
  position: absolute;
  left: 0;
  right: 0;
  border-top: 3px solid #ff0068;
}


.updates-Container::before {
  bottom: 78%;
}

.set:nth-child(2) .updates-Container {
  width: 400px; /* Width of the containers in the middle */
}

.set:nth-child(1) .updates-Container,
.set:nth-child(3) .updates-Container {
  width: 200px; /* Width of the containers on the left and right */
}



.bar-graph-container {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  height: 50px; /* Adjust height as needed */
  width: 80%;
}

.bar-graph {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  width: 80%; /* Adjust width as needed */
}
.bar {
  width: 30px; /* Adjust bar width as needed */
  background-color: #3498db; /* Example bar color */
  transition: height 0.3s ease;
}

.x-axis {
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
  width: 80%; /* Same width as bar graph */
}

.y-axis {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  margin-right: 10px;
}

.label {
  font-size: 12px;
  color: #333;
}

.services-container {
  background-color: #ff0068;
  padding: 20px;
  border-radius: 10px;
  height: 35px;
  border: 5px solid #ff0068;
  height: 320px;
  color: #ff0068;
  overflow: auto;
  width: 850px;
  padding: 30px;
  margin-left: 10px;
  margin-top: 10px;
}
  /* Add a new rule targeting the class */


.analytics-container {
  background-color: #fff;
  padding: 20px; /* Adjust padding as needed */
  height:430px;
  border: 3px solid #ff0068;
  border-radius: 10px;
  margin-top: 30px;


}

.smallanalytics-container {
  width: calc(50% - 10px); /* Adjust width as needed */
  height: 80px; /* Adjust height as needed */
  width: 300px;
  margin: 5px; /* Adjust margin as needed */
  background-color: #fff;/* Adjust background color as needed */
  border: 3px solid #40E0D0;
  color: #ff0068;
  font-weight: bold;
  font-family: Arial, sans-serif;
  
}

.totalrevenue-container {
  background-color: #fff;
  padding: 20px;
  height: 200px;
  width: 500px;
  border: 3px solid #ff0068;
  border-radius: 10px;
  margin-left: 350px;
  margin-top: -90px;
}

.tiny-container {
  width: calc(35% - 5px); /* Adjust width as needed */
  height: 80px; /* Adjust height as needed */
  margin: 5px; /* Adjust margin as needed */
  background-color: #fff;
  border: 3px solid #40E0D0;
  color: #ff0068;
  font-weight: bold;
  font-family: Arial, sans-serif;
  border-radius: 10px;
  
}

.set-of-containers {
  display: flex;
  flex-direction: row; /* Arrange items horizontally */
}
.year-dropdown {
  width: 100%; /* Adjust width as needed */
  padding: 5px; /* Adjust padding as needed */
  font-size: 16px; /* Adjust font size as needed */
  border: 1px solid #ccc; /* Add border as needed */
  border-radius: 5px; /* Add border radius as needed */
  background-color: pink; /* Add background color as needed */
}
.totals {
  display: flex;
  justify-content: space-between;
  font-size: 20px;
  font-family: Arial, sans-serif; /* Use Arial font */
  font-weight: bold; /
}
.item {
  flex: 1; /* Distributes available space equally among items */
  margin: 5px; /* Adjust as needed for spacing between items */
  front-weight: bold;
}
.item10,
.item11,
.item12,
.item13,
.item14,
.item15,
.item16 {
  display: inline-block; /* Display items in a line */
  margin: 20px; /* Adjust as needed for spacing between items */
  font-weight: bold;
  position: relative; 
  
}
.item10::after,
.item11::after,
.item12::after,
.item13::after,
.item14::after,
.item15::after,
.item16::after {
  content: ''; /* Empty content for pseudo-element */
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 2px; /* Adjust the height of the line */
  background-color: #ff0068; /* Set the color of the line */
}




.grid-container1 {
  display: flex;
}
.button {
  background-color: #40E0D0; /* Blue color, change as needed */
  color: white; /* Text color */
  border: none; /* Remove border */
  padding: 5px 10px; /* Adjust padding */
  font-size: 16px; /* Adjust font size */
  cursor: pointer; /* Add cursor pointer on hover */
  border-radius: 5px; /* Add border radius */
  margin-top: 25px; /* Adjust margin top */
  height: 40px;
}
.ScrollableContainer {
  height: 10000px; /* Adjust the height as needed */
  overflow-y: auto;

 
}
.Dash-Container {
   padding: 20px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.top-containers {
  display: flex; /* Use flexbox for horizontal alignment */
  

}

.pink-container {
  background-color: #fff; /* Pink background color */
  color: #00000 /* White text color for contrast */
  padding: 20px; /* Adjust padding as needed */
  border-radius: 10px; /* Optional: Add border radius for rounded corners */
  margin-right: 100px; /* Optional: Add margin for spacing between containers */
  border: 3px solid #ff0068;
  width: 250px;
  height: 300px
}

.pink-container:last-child {
  margin-right: 0; /* Remove right margin for the last container */
}
.edit-button{
  font-size: 18px;
  align-items: left; /* Center items vertically */
  display: flex;
  background-color: #027777; /* Set the background color to light green */
  width: 100px;
  height: 40px;
  color: #fff;
  margin-top: 80px;
  margin-left: 70px;
}
.service-name{
  font-size: 25px;
  margin-left: 40px;
  font-weight: bold;
}
.email-address{
  font-size: 18px;
}
.price{
  color: #ff0068;
  font-weight: bold;
  margin-left: 70px;
}
.line {
  display: block;
  width: 100%;
  height: 1px;
  background-color: #ff0068; /* You can change this to the desired color */
  margin-bottom: 5px; /* Adjust the margin as needed */
}

.button:hover {
  background-color: #ff0068; /* Darker blue color on hover */
}


.contact-customer:hover {
  background-color: #40E0D0; /* Darker pink color on hover */
}
/* Close button for popup */
.close-button {
  margin-top: 10px;
  padding: 5px 10px;
  color: white;
  background-color: #007bff;
  border: none;
  border-radius: 3px;
  cursor: pointer;
}

.close-button:hover {
  background-color: #0056b3;
}
.title {
  margin-bottom: 5px; /* Adjust the margin between title and line */
}

.line {
  width: 100%;
  border-top: 1px solid #ff0068;
  margin: 10px 0; /* Adjust the margin above and below the line */
}

.container-button {
  margin-top: 40px;
  padding: 8px 16px;
  background-color: #027777;
  color: #fff;
  border: none;
  cursor: pointer;
  margin-left: 85px;
 
  
  
}
./* Popup container */
.popup-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}
.popup-content {
  background-color: white;
  padding: 20px;
  border-radius: 5px;
  text-align: center;
}
.popup-content p {
  margin: 10px 0;
}

.container-button:hover {
  background-color: #cc004d;
}
.documents-container{
  background-color: #fff;
  border: 2px solid #ff0068;
  height: 200px;
  width: 350px;

}

 .orderDate {
  border-bottom: 2px solid #ff0068;
  padding: 5px;

    width: 200px;
    justify-content: center;
    overflow: hidden;

  }
  .orderdate_price{
    width: 100%;
    font-size: 16px;
    color: #ff0068;
    font-family: poppins;
    font-size: 18px;
    font-weight: bold;
    margin: 0 auto;
    padding-bottom: 3px;
  }
  .orderdate_date{
    font-size: 13px;
    width: 100%;
    margin: 0 auto;
    padding-bottom: 3px;
  }
  .orderdate_button{
    width: 100%;
    margin: 0 auto;
    padding: 2px;
  }

  .orderdate_button button {
    margin: 0;
    padding: 5px 10px;
    background-color: #21B6A8;
    font-size: 15px;
    color: white;
    border: none;
    cursor: pointer;
  }
  /* Container for the orders */
  .orders_container{
    display: block;
    padding: 20px;
    width: 950px;
    position: relative;
    overflow: hidden;
    
  }

  /* Links for tabs */
.orders_container a {
  margin-right: 15px;
  cursor: pointer;
  text-decoration: none;
  color: #ff0068;
}

.orders_container a:hover {
  text-decoration: underline;
}

/* Summary section for counted orders */
.countedorders {
  margin-top: 20px;
}
.ordersummary_number {
  font-size: 28px;
  color: #E71E5B;
  font-weight: bold;
}
.ordersummary_title h1 {
  font-size: 24px;
  color: #333;
}
  .orderslist{
 height: 350px;
  border: 1.5px solid #ff0068;
  box-shadow: 0 0 3px #ff0068;
  padding: 5px;
  margin: 0 auto;
  border-radius: 5px;

a
  }
   .ordersummary_number{
    text-align: center;
    display: flex;
    align-items: center;
    flex-direction: column;
    margin: auto;
    font-size: 35px;
    color: #ff0068;
    font-weight: bold;
    font-family: poppins;
   }
    .ordersummary_title h1{ 
padding: 0;
margin: 0;
    }
  .ordersummary_title{
    width: 30%;
    text-align: center;
    padding-right: 8px;
    border-right: 2px solid #333;
    display: flex;
    align-items: center;
    flex-direction: column;
    margin: auto;
    margin-right: 0;

  }
  .maindash{
    margin: 0;
    margin-top: -120px;
    margin-bottom: 10px;
    width: 280px;
    justify-content: space-between;
    margin-right: 0;
    padding: 6;
    top :10px
  }

  .maindash a {
  color: #ff0068;
  text-decoration: none;
  padding: 10px;
  transition: background-color 0.3s ease;
}

.maindash a:hover {
  background-color: #ff4d94;
  border-radius: 5px;
}
  .maindash a.active 
  {
  background-color:#ff0068;
  color:#fff;
  border-radius:5px;
  }
  .search-container {
  display: flex;
  align-items: center;

}


  .search-link {
    margin-left: 10px; /* Adjust spacing between "Account" and the search symbol */
  }
    .account-link {
  margin-left: 10px;
}
  .account-link a {
    text-decoration: none;
    color: #333; /* Set the color to your desired text color */
  }
  
 .search-symbol {
  font-size: 20px;
  color: #ff0068;
  cursor: pointer;
 
}
.search-input {
  padding: 5px;
  border-radius: 4px;
  border: 1px solid #ccc;
  outline: none;
  margin-right: 5px;
}


  
  .countedorders{
    display: flex;
    margin-top: 2%;
    margin-bottom: 50px;
    border-radius: 5px;
    width: 250px;
    box-shadow: 0 0 2px #ff0068;
    height: 100px;
    border: 1.5px solid #ff0068;

  }
  .back_arrow {
    background-color: #f0f0f0;
    color: #333;
    border: 1px solid #ccc;
    padding: 8px 16px;
    border-radius: 4px;
    margin: 0;
    margin-right: 10px; /* Adjust margin as needed */
  }
  
  .back_arrow:hover {
    background-color: #ddd;
    cursor: pointer;
  }
  .user-info {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  
  .info-item {
    display: flex;
    justify-content: space-between;
  }
  
  .label {
    color: grey; /* Styling for label */
  }
  
  .data {
    color: #21B6A8; /* Styling for fetched data */
    font-weight: bold;
  }
/* Style for custom file input */
.custom-file-upload {
  display: inline-block;
  border-bottom: 1px solid #ff0068;
  border-radius: 0px;
  padding: 10px;
  width: 330px;

  cursor: pointer;
  color: #ff0068;
  font-weight: bold;
  font-size: 16px;
}

.custom-file-upload:hover {
  background-color: #fffd;
}

/* Hide the original file input */
.visually-hidden {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  border: 0;
}

.services-wrapper {
  background-color: #fff;
  padding: 20px;
  border-radius: 10px;
  border: 2px solid #ff0068;
  height: 450px;
  overflow: auto;
  width: 1500px;
  margin-left: -5px;
  margin-top: 100px;
}

.services-container {
  height: 320px; /* Moved height here */
  padding: 30px;

}



.popularservice2_heading {
  position: relative;
  color: #ff0068;
  font-size: 17px;
  font-weight: bold;
  font-family: poppins;
  margin: 30px;
  padding: -25px;
  text-align: 50px;

}
.popularservice_heading {
  position: relative;
  color: #ff0068;
  font-size: 17px;
  font-weight: bold;
  font-family: poppins;
  margin: 30px;
  padding: -25px;
  text-align: 50px;
  width:4500px;
  margin-left: -5px;
  margin-bottom: -40px;
}
.popularservice_heading:after {
  content: '';
  border-top: 2px solid #ff0068; /* Adjust the style and color as needed */
  display: block;
  width: 470%; /* Adjust the line width as needed */
  position: absolute;
  top: 50%;
  text-align: 50px;
}


.popularservice_heading:before {
  
  width: 100%; /* Adjust the line width as needed */
  
  
  
}
.popularservice_heading:after {
  content: '';
  border-top: 2px solid #ff0068; /* Adjust the style and color as needed */
  display: block;
  width: 470%; /* Adjust the line width as needed */
  position: absolute;
  top: 50%;
  padding: 0px;
}


.popularservice_heading:after {
  right: 0%;
  margin-right: 0%;
  top: 100%;
  padding-top: 20px;
}

  .fileheading{
    font-family: poppins;
    font-weight: bold;
    font-size: 18px;
  }
  .uploadfiles{
    display: flex;
    align-items: center;
    width: 100%;
    justify-content: space-between;
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
        .pfp{
          border-radius: 75px;
          background: rgba(0, 0, 0, 0.3);
        margin: 0 auto;
        width: 150px;
        height: 150px;
        margin-bottom: 0px;
        
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
          margin-bottom: 25px;
  
  
        }
        .profile_information{
          border: 2px solid #ff0068;
          height: 500px;
          width: 500px;
          border-radius: 5px;
          padding: 10px;
          position: relative;
          flex: 1;
          
        }
        .Profiletab{
          display: flex;
         padding: 30px;
         
        }
  
        .edit_pfp{
          padding: 10px;
          margin-right: 50px;
          width: 350px;
          height: 500px;
          border: 2px solid #ff0068;
          border-radius: 5px;
          margin-bottom: 10px;
          
        }
  .pfp{
    border-radius: 75px;
    background: rgba(0, 0, 0, 0.3);
  margin: 0 auto;
  width: 150px;
  height: 150px;
  margin-bottom: 0px;
  
  }
  .pfp_and_files{
   
  }
  
  .info_container{
    padding: 10px;
    display: flex;
    max-width: 980px;
  }

.upload-form {
display: flex;
flex-direction: column;
align-items: center;
border: 2px solid #ff0068;
border-radius: 5px;
width: 350px;
padding: 10px;
align-items:center;
}

.file-name {

}

.upload-button {
background-color: #007BFF;
color: #fff;
padding: 10px 20px;
margin: 0;
border: none;
border-radius: 5px;
cursor: pointer;
font-weight: bold;
transition: background-color 0.2s;
}

.upload-button:disabled {
background-color: #ccc;
cursor: not-allowed;
}


.upload-button:hover {
background-color: #0056b3;
}


   .file-label {
    display: inline-block;
    padding: 10px;
    color: #fff;
    border-radius: 5px;
    cursor: pointer;
  }
  .User_info input[type="text"],
.User_info input[type="email"],
.User_info select,
.User_info input[type="date"] {
    width: 100%;
    padding: 10px;
    margin: 5px 0;
    border: 1px solid #ff0068;
    border-radius: 4px;
    box-sizing: border-box;
}
.upload-section {
  margin-bottom: 10px;
}

/* Style for labels */
.upload-section label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

/* Style for file input */
.upload-section input[type="file"] {
  display: block;
  padding: 10px;
  margin-top: 5px;
  border: 1px solid #ff0068;
  border-radius: 4px;
  box-sizing: border-box;


/* Style for paragraph */
.upload-section p {
  font-weight: bold;
 
}




  #selectedFileName {
    display: inline-block;
    margin-left: 10px;
    font-weight: bold;
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
  .username{
    color: white;
  }

  
  h4{
  
  
  }
  .Profile{
  width: 100%;
  
  
  }
  .profile-pic {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: #fff;
  color: #ff0068;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 24px;
  margin-right: 10px;
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
          background-color: rgba(0, 0, 0, 0.3); /* Semi-transparent background */
         display: flex;
          justify-content: center;
          align-items: center;
          z-index: 9999; /* Ensure it's on top of other elements */
        }
        
        .alert-box {
          background-color: orange;
          padding: 20px;
          border-radius: 5px;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
          text-align: center;
         
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
        .myserviceheader button {
          font-size: 18px;
          padding: 10px 20px;
        }
        .save-button {
          /* Add any specific styles for the Save button */
          font-size: 20px; /* You can adjust the font size as needed */
          padding: 12px 24px; /* You can adjust the padding as needed */
          width: 20px;
          margin-top: 1000 px; /* Adjust the margin-top value to create space below the border */
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
    width: 1100px;
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
   .expanded-content {
    background-color: #fff; /* Background color for the content */
    padding: 20px;
    border-radius: 5px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.3);
    /* Add other styling as needed */
    animation: fallingBounce 0.5s cubic-bezier(0.68, -0.55, 0.27, 1.55) forwards;
  
  }

  
.loading-spinner {
  text-align: center;
}

  
  /* CSS styles for the "No " message */
  .no-pending-requests {
    text-align: center;
    font-size: 18px;
    color: #555;
    /* Add other styling as needed */
  }
  

.provider-email {
color: black;
}

.requestcard {
  text-align: left;
}

.pendingrequests {
  list-style: none;
  padding: 0;
}

.pending-request {
  border-bottom: 1px solid #ddd;
  padding: 10px 0;
}


.closemetric, .acceptrequest {
  background-color: #ff0068;
  color: #fff;
  border: none;
  padding: 10px;
  margin-top: 10px;
  border-radius: 5px;
  cursor: pointer;
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
color: #fffdd0;
position:relative;
  }

  h2:before{
    content: "";
display:block;
width: 140px;
height:2px;
background: #fffdd0;
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
background: #fffdd0;
position: absolute;
right: 0;
top: 50%;
z-index: 1111;
  }

  

  .contact_details{
    background-color: #ff0066;
    padding: 10px;
    border-radius: 10px;
    margin-top: 10px;
    width: 830px;
    color: #fffdd0;
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
  select{
    width:250px;
    padding: 10px;
    font-weight: bold;
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
  color: #fffdd0;
  font-weight: bold;
  background-color: #fffdd0;
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

.dashboard-container {
  padding: 15px;
  background-color: #ff0068;
  width: 180px;
  height: 100%;
   display: flex;
   flex-direction: column;
}

@media (max-width: 768px){
  .dashboard-container{
    width: 80px;
height: 100vh;
  }
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
      color: #ff0068;
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
   

 
    .logo{
      height: 50px;
      position: fixed;
      top: 7%;
      left: 3%;
      border-radius: 50px;
      width: auto;
      background-color: none;
   
      

    }

    .img-and-title {
  display: flex;
  align-items: center;
  padding: 20px;
  background-color: #ff0068;
  color: #fff;
}

    .img-and-title hr{
      border-top: 2px solid #ff0068;
      border-bottom: 2px solid #ff0068;
      margin-bottom: 20px;
      position: fixed;
      top: 21%;
      left: 0;
      width: 100%;
    }




    .dashboard-header {
      text-align: center;
      position: inherit;
      width: 250x;
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

    .mainpage{
      flex:1;
      width: 500px;
      height: 100%;
      padding: 15px;   
      background-color: #fff;
      margin-left: -19px;
      z-index: 5555;
      overflow: hidden;
      display: block;
    }

    .mainpage hr{
      border-top: 2px solid #ff0068;
      border-bottom: 2px solid #ff0068;
      margin-bottom: 0px;
      margin-top: 120px;
      margin-left: 50px;
      width: 0px;
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
 
      border-radius: 10px;
      display: flex;
     justify-content: space-between;
      width: 850px;
      margin-bottom: 0px;
      margin-left: 90px;
      padding: 0;
    border: none;
  
  
 }
 .metrics hr{
  display: none;
 }

 

 .progress-circle {
  position: relative;
  width: 60px;
  height: 60px;
  margin: 0 auto;
  
}

.circle-progress {
  width: 5%; /* Adjust the width to make the circle smaller */
  height: 50%; /* Adjust the height accordingly */
  border: 6px solid #fff; /* Adjust the border width and color */
  border-top-color: ; /* Set the color for the progress */
  border-radius: 50%;
  background: transparent;
  position: absolute;
  top: -50px; /* Adjust the top position */
  left: 50px; /* Adjust the left position */
  padding: 30px; /* Adjust padding accordingly */
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
  top: -20%;
  left: 90px;
  transform: translate(-50%, -50%);
  font-weight: bold;
  color: #fff;
  
}.servicesdone{
    
  padding-left: 8px;
height: 100px;
width: 200px;
font-size: 12px;
color: azure;
border-radius: 10px;
background-color:#ff0068;
cursor: pointer;
margin-left: -100px
 }

 .servicesdone:hover {
  background-color: #e1e1e1;
}


 .pendingservices:hover {
  background-color: #e1e1e1;
}

 .Rewards:hover {
  background-color: #e1e1e1;
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
  margin-left: -740px;
  padding-top: -50px;
  margin-top: -20px;
  clear: both;
  
}


.dashboard-section {
  padding: 10px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}
.dashboard-section.active {
  font-weight: bold;
color: #ff0068;
  background-color: #ff0068;
 z-index: 99999;
  justify-content: space-between;
  align-items: center;
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
right: 3px;

 


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

.btn_logout {
  margin-top: auto;
}

.active_Tab{
  font-size: 22px;
  color: #fff;
  font-family: poppins;
position: absolute;
right: -30px;      
  display: none;
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