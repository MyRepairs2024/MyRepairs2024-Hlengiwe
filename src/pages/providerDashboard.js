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

const handleLogout = () => {
  // Clear any authentication tokens or user data as needed
  localStorage.removeItem('token'); // Clear token or other data

  // Redirect the user to the landing page
  window.location.href = '/'; // Replace with the path of your landing page (index.js)
};

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
      <button className='logsout' onClick={handleLogout}>Log Out</button>
      </div>
      </div>
      </div>


      <div className='mainpage'>
      <Dashheader/>
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
        <div className='metrics'>
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
<div className={`servicesdone ${expandedPendingServices ? 'expanded' : ''}`}
         onClick={() => {
          setExpandedPendingServices(!expandedPendingServices);
          }}
>
    <h3>Expenses.......</h3>
    <div className="progress-circle">
      <progress className="circle-progress" value={pendingServicesProgress} max="100"></progress>
      <span>{pendingServicesProgress}%</span>
    </div> 
</div>


  <div className={`Rewards ${expandedRewards ? 'expanded' : ''}`} onClick={() => setExpandedRewards(!expandedRewards)}
    >
   
           <h3>Points</h3>
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
    
      <br></br>
      <span className="line"></span>
      <div className='updates-Container'>
      <h2>Service Description</h2>
        <p style={{ fontWeight: 'normal' }}><h3>Repairing a Samsung fridge</h3></p>
        <h4>Client</h4>
        <p style={{ fontWeight: 'normal', color: 'black' }}>Name: <span style={{ color: '#40E0D0' }}>Jane Smith</span></p>
        <p style={{ fontWeight: 'normal',color: 'black'  }}>Address: <span style={{ color: '#40E0D0' }}>456 Oak Avenue</span></p>
        <p style={{ fontWeight: 'normal' ,color: 'black' }}>Service Date: <span style={{ color: '#40E0D0' }}>20|05|2024</span></p>
       
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



       
        <div className="set">
        <br></br>
        <span className="line"></span>
        <div className='updates-Container'>
        <h2>Service Description</h2>
        <p style={{ fontWeight: 'normal' }}><h3>Repairing a Microwave</h3></p>
       <h4>Client</h4>
        <p style={{ fontWeight: 'normal', color: 'black' }}>Name: <span style={{ color: '#40E0D0' }}>Jane Smith</span></p>
    <p style={{ fontWeight: 'normal',color: 'black'  }}>Address: <span style={{ color: '#40E0D0' }}>456 Oak Avenue</span></p>
    <p style={{ fontWeight: 'normal' ,color: 'black' }}>Service Date: <span style={{ color: '#40E0D0' }}>20|05|2024</span></p>
        
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
        font-family: 'Poppins', sans-serif;
        margin: 0;
        padding: 0;
        background-color: #f4f4f4; 
        box-sizing: border-box;
      }


.updates-Container2 {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px;
  border: 1px solid #ff0068; 

}
 
.dashboard-container {
  padding: 15px;
  background-color: #ff0068;
  width: 130px;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000; 
}
.UserDashboard{
  display: flex;
 height: 105vh;
  font-family: Arial, sans-serif;
  margin-left: 200px; 
  overflow-x: hidden; 
 justify-content: center;
 background: azure;
 
  }
  @media (max-width: 768px){
  .dashboard-container {
    width: 30%;
    max-width: 300px;
    height: auto;
    position: relative;
    margin-bottom: 15px;
  }
    .UserDashboard {
    margin: 0;
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
    width: 100%; 
    max-width: 300px;
    margin: 0 auto;
    padding: 5px; 
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
  .dashboard-container {
      .dashboard-container {
    width: 100%;
    max-width: 100px; 
    height: auto;
    position: relative;
    margin-bottom: 15px;
  }

  .Profile .profile-pic {
    width: 80px;
    height: 80px;
    font-size: 28px;
  }

  .username h4 {
    font-size: 16px;
  }

  .dashboard-section {
    max-width: 80%;
    padding: 10px; 
    margin: 5px;  
    font-size: 10px; 
    margin-top:15px;
  }
  }

  .dashboard-section-header {
    flex-direction: column;
    align-items: flex-start;
     max-width: 80%;
    padding: 10px; 
    margin-left: -20px;  
    font-size:14px;
    margin-top:-10px;
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
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
  margin-left: 10px;
  height: 30px; 
  width: 110px;
}

.maindash {
  margin: 15px;
  margin-top: 10px;
  margin-bottom: 10px;
  width: 100px;
  display: flex;
  flex-direction: row; 
  justify-content: space-between;
  padding: 10px;
  color: #fff;

 }
.maindash {
  display: flex;
  flex-direction: row; 
  justify-content: space-around; 
  align-items: center; 
  margin: -10px; 
}

.maindash a:hover {
  color: #000; 
    text-decoration: underline; 
     transform: scale(1.10);
}
.maindash a {
  padding: 8px 16px; 
  font-size: 16px;
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
  margin-right: -55px;
}

.search-symbol {
  cursor: pointer;
}

.services-wrapper {
  margin-top: 20px;
}

.popularservice_heading {
  margin-bottom: 20px;
  font-size: 24px;
  color: #454545;
}


 .metrics{
      background-color: white;
      display: flex;
     justify-content: space-between;
      width: 950px;
      margin-bottom: 0px;
     }


  @media (max-width: 768px) {
.metrics {
    flex-direction: column; 
    padding: 5px; 
     width: 200px;
  }
}

.servicesdone
{margin-bottom: 20px;
  cursor: pointer;
  transition: transform 0.3s;
  border: 2px solid #FF0066; 
  padding: 10px; 
  height:100px;
  border-radius: 5px;
  background-color:#FF0066;
}
.Rewards {
  margin-bottom: 20px;
  cursor: pointer;
  transition: transform 0.3s;
   border-radius: 5px;
   background-color:#FF0066;
  border: 2px solid #FF0066; 
  padding: 10px; 
  height:100px;
}

.servicesdone:hover,
.Rewards:hover {
  transform: scale(1.10);
     background-color:#fff
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

.circle-progress {
  appearance: none;
  width: 100px;
  height: 10px;
  border-radius: 50%;
  background: transparent;
  stroke-width: 10px;
  stroke: #ff0068; 
}.line {
  display: block;
  width: 100%;
  height: 1px;
  background-color: #ff0068;
  margin: 10px 0;
}

.circle-progress::-webkit-progress-value {
  border-radius: 50%;
  background-color: #ff0068; 
}
/* Default styles for the container */
.container {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}
.Dash-Container {
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  margin-top: 20px;
}
/* Adjust the child elements to decrease spacing */
.container > * {
  margin: 0px 200px; 
}

/* Styles for tablets and smaller screens (up to 768px wide) */
@media (max-width: 768px) {
  .container {
    flex-direction: column; 
  }

  .container > * {
    margin: 5px 0; 
  }
}

/* Styles for cellphones (up to 480px wide) */
@media (max-width: 480px) {
  .container > * {
    margin: 3px 0; 
  }
}

.updates-Container {
  border: 3px solid #ff0068;
  padding: 10px;
  margin: 5px;
  width: 280px; 
  height: auto; 
  margin-top: 30px;
  border-radius: 10px; 
  font-family: Arial, sans-serif;
  font-weight: bold;
  color: black;
  font-size: 20px;
  position: relative;
}

@media (max-width: 768px) {
  .updates-Container {
 flex-direction: colomn; 
    width: calc(100% - 20px); 
    margin-top: 20px; 
    margin-bottom: 20px; 
    padding: 8px; 
    font-size: 16px; 
    height: auto; 
    border-radius: 8px;
  }
}



.stars {
  display: flex;
  align-items: center;
  color: #ff0068; 
}

.star {
  margin-right: 5px;
}
/* Default styles for web view */
.ScrollableContainer {
  height: 750px; 
  overflow: auto;
  margin: 0;
}

/* Styles for cellphones (screens up to 480px wide) */
@media screen and (max-width: 480px) {
  .ScrollableContainer {
    height: 700px; 
    margin: 10px 0;
    padding: 10px; 
    box-sizing: border-box; 
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
    font-size: 14px; 
  }

  .account-link {
    margin-top: 20px;
  } 
}

.Profiletab {
  display: flex;
  justify-content: space-between;
}

.edit_pfp {
  width: 45%;
}

.edit_image {
  background-color: #ff3c78; /* Medium pink */
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
}

.upload-section {
  margin-top: 20px;
}

.upload-section label {
  display: block;
  margin-bottom: 5px;
  color: #454545;
  font-family: 'Poppins', sans-serif;
  font-weight: bold;
}

.upload-section input[type="file"] {
  margin-bottom: 10px;
}

.profile_information {
  width: 45%;
}

.personalinfo_header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.edit_personal {
  background-color: #21b6a8; /* Teal */
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.edit_personal:hover {
  background-color: #007bff; /* Dark blue */
}

.User_info {
  margin-top: 20px;
}

.User_info .fetched_salut,
.User_info .fetched_name,
.User_info .fetched_surname,
.User_info .fetched_dob,
.User_info .fetched_phone,
.User_info .fetched_email,
.User_info .fetched_country,
.User_info .fetched_city,
.User_info .fetched_zip,
.User_info .fetched_street,
.User_info .fetched_building {
  margin-bottom: 15px;
}

.User_info label {
  color: #454545;
  font-family: 'Poppins', sans-serif;
  font-weight: bold;
}

.User_info input,
.User_info select {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-top: 5px;
  box-sizing: border-box;
}

@media screen and (max-width: 768px) {
  .Profiletab {
    flex-direction: column;
  }

  .edit_pfp,
  .profile_information {
    width: 100%;
  }
}
.servicesdone
{
margin-bottom: 20px;
  cursor: pointer;
  transition: transform 0.3s;
  border: 2px solid #FF0066;
  background-color:#FF0066;
    padding-left: 8px;
    height: 100px;
    width: 200px;
    color: azure;
    border-radius: 10px;
}
.Rewards {
  margin-bottom: 20px;
  cursor: pointer;
  transition: transform 0.3s;
   background-color:#FF0066;
  border: 2px solid #FF0066; 
    padding-left: 8px;
    height: 100px;
    width: 200px;
    color: azure;
    border-radius: 10px;
}

.servicesdone:hover,
.Rewards:hover {
  transform: scale(1.10);
  background-color:#FFB6C1;
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
  color: #007bff; /* Blue */
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}

.orders_container {
  margin-top: 20px;
}

.countedorders {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #FF3C78; /* Medium pink */
  padding: 20px;
  border-radius: 10px;
  color: white;
}

.ordersummary_title h1 {
  margin: 0;
}

.ordersummary_number {
  font-size: 2em;
}

.orderslist {
  margin-top: 20px;
}

.grid-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}

.grid-container .item1,
.grid-container .item2,
.grid-container .item3 {
  background-color: #FA3980; /* Another shade of pink */
  padding: 20px;
  border-radius: 10px;
  color: white;
}

.contact-customer {
  background-color: #21B6A8; /* Teal */
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
  margin-top: 10px;
}

.contact-customer:hover {
  background-color: #007bff; /* Dark blue */
}

.popup-container {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.popup-content {
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  text-align: center;
}

.close-button {
  background-color: #ff0040; /* Dark pink */
  color: white;
  border: none;
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
  margin-top: 10px;
}

.close-button:hover {
  background-color: #ff0066; /* Medium pink */
}

.orders_container1 {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #FF3C78; /* Medium pink */
  padding: 20px;
  border-radius: 10px;
  color: white;
  margin-top: 20px;
}

.serviceDescription,
.serviceInfo {
  flex: 1;
  padding: 0 10px;
}

@media screen and (max-width: 768px) {
  .grid-container {
    grid-template-columns: 1fr;
  }

  .orders_container1 {
    flex-direction: column;
  }

  .serviceDescription,
  .serviceInfo {
    padding: 10px 0;
  }
}
.set {
  display: flex;
  flex-direction: column;
  align-items: left;
  background-color: #fff;
  margin-right: auto; /* Push updates container to the left */

  /* Additional styles for mobile view */
  padding: 5px; 
}
/* Styles for cellphones (up to 480px wide) */
@media (max-width: 480px) {
  .updates-Container {
    padding: 5px; /* Further adjust padding for smaller screens */
    margin: 3px 0; /* Further adjust margin for better spacing */
    font-size: 16px; /* Further decrease font size for better fit */
  }

  .set {
    align-items: flex-start; /* Align items to the left */
    margin: 0; /* Remove margin for better spacing */
    padding: 5px; /* Further decrease padding for smaller screens */
  }
}


  
.updates-Container
/* General Styles */
body {
  font-family: Arial, sans-serif;
}
@media (max-width: 768px) {
.set {
    align-items: flex-start; 
    margin: 0; 
    padding: 2px; 
}


@media screen and (max-width: 768px) {
  .mainpage {
    padding: 10px;
    margin:0;
  }

  .countedorders,
  .grid-container .item1,
  .grid-container .item2,
  .grid-container .item3,
  .orders_container1 {
    padding: 10px;
  }

  .contact-customer,
  .close-button {
    padding: 5px 10px;
  }
}

.customers-container {
  margin-top: 20px;
}

.customers-container.pink-border {
  border: 1px solid #FF0078; /* Dark pink border */
  border-radius: 10px;
  padding: 20px;
  background-color: white;
}

.info {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

.info-item {
  flex: 1 1 calc(33.333% - 20px);
  padding: 20px;
  background-color: #FF3C78; /* Medium pink */
  border-radius: 10px;
  color: white;
  text-align: center;
}

.icon1 {
  width: 50px;
  height: 50px;
  margin-bottom: 10px;
}

.customer-name {
  font-weight: bold;
  margin-bottom: 10px;
}

.small-button {
  background-color: #21B6A8; /* Teal */
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.small-button:hover {
  background-color: #007bff; /* Dark blue */
}

.popup-container {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.popup-content {
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  text-align: center;
}

.close-button {
  background-color: #ff0040; /* Dark pink */
  color: white;
  border: none;
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.close-button:hover {
  background-color: #ff0066; /* Medium pink */
}

.small-containers-container {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  margin-top: 20px;
}

.small-container {
  flex: 1 1 calc(33.333% - 20px);
  background-color: #FA3980; /* Another shade of pink */
  padding: 20px;
  border-radius: 10px;
  color: white;
  text-align: center;
}

.small-container .title {
  font-weight: bold;
  margin-bottom: 10px;
}

.small-container .line {
  display: block;
  height: 1px;
  background-color: white;
  margin: 10px 0;
}

.container-button {
  background-color: #21B6A8; /* Teal */
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.container-button:hover {
  background-color: #007bff; /* Dark blue */
}

.pagination {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

.pagination button {
  background-color: #21B6A8; /* Teal */
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
  margin: 0 5px;
}

.pagination button:hover {
  background-color: #007bff; /* Dark blue */
}

.pagination button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

@media screen and (max-width: 768px) {
  .info,
  .small-containers-container {
    flex-direction: column;
  }

  .info-item,
  .small-container {
    flex: 1 1 100%;
  }
}

@media screen and (max-width: 480px) {
 

  .info-item,
  .small-container {
    padding: 10px;
  }

  .small-button,
  .close-button,
  .container-button,
  .pagination button {
    padding: 5px 10px;
  }
}


.myserviceheader {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.myserviceheader h3 {
  color: #FF0040; /* Dark pink */
}

.myserviceheader button {
  background-color: #21B6A8; /* Teal */
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.myserviceheader button:hover {
  background-color: #007bff; /* Dark blue */
}

.AddingContainer {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  margin-bottom: 20px;
}

.service1, .service2 {
  flex: 1 1 calc(50% - 20px);
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.imgsev1 {
  margin-bottom: 20px;
  text-align: center;
}

.imgsev1 img {
  max-width: 100%;
  border-radius: 10px;
}

.input_servicephoto button {
  background-color: #FA3980; /* Another shade of pink */
  color: white;
  border: none;
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.input_servicephoto button:hover {
  background-color: #FF0066; /* Medium pink */
}

.input_servicename,
.input_servicedescrip,
.input_serviceavail {
  margin-bottom: 15px;
}

.input_servicename label,
.input_servicedescrip label,
.input_serviceavail label {
  display: block;
  margin-bottom: 5px;
  color: #0056b3; /* Dark blue */
}

.input_servicename select,
.input_servicedescrip textarea,
.input_serviceavail select,
.input_serviceavail input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.top-containers {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  margin-top: 20px;
}

.pink-container {
  flex: 1 1 calc(33.333% - 20px);
  background-color: #FF3C78; /* Medium pink */
  padding: 20px;
  border-radius: 10px;
  color: white;
  text-align: center;
}

.pink-container .line {
  display: block;
  height: 1px;
  background-color: white;
  margin: 10px 0;
}

.pink-container .edit-button {
  background-color: #007bff; /* Dark blue */
  color: white;
  border: none;
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.pink-container .edit-button:hover {
  background-color: #0056b3; /* Darker blue */
}

@media screen and (max-width: 768px) {
  .AddingContainer {
    flex-direction: column;
  }

  .service1, .service2 {
    flex: 1 1 100%;
  }

  .top-containers {
    flex-direction: column;
  }

  .pink-container {
    flex: 1 1 100%;
  }
}

@media screen and (max-width: 480px) {
  .myserviceheader {
    flex-direction: column;
    align-items: flex-start;
  }

  .myserviceheader button {
    margin-top: 10px;
  }

  .imgsev1 button {
    padding: 5px;
  }

  .input_servicephoto button,
  .pink-container .edit-button {
    padding: 5px 10px;
  }
}


.tab-link {
  display: inline-block;
  margin-right: 15px;
  padding: 10px 15px;
  text-decoration: none;
  color: #0056b3; /* Dark blue */
  border-radius: 5px;
  transition: background-color 0.3s;
}

.tab-link:hover {
  background-color: #FF0078; /* Dark pink */
  color: white;
}

.analytics-container {
  padding: 20px;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  margin-top: 20px;
}


.smallanalytics-container,
.tiny-container {
  flex: 1 1 calc(33.333% - 30px);
  background-color: #FF0066; /* Medium pink */
  color: white;
  padding: 15px;
  border-radius: 5px;
  text-align: center;
}

@media screen and (max-width: 768px) {
  .tab-link {
    display: block;
    margin-bottom: 10px;
  }

  .smallanalytics-container,
  .tiny-container {
    flex: 1 1 calc(50% - 30px);
  }

  .analytics-container {
    padding: 15px;
  }

 
}

@media screen and (max-width: 480px) {
  .smallanalytics-container,
  .tiny-container {
    flex: 1 1 100%;
  }

 

  .tab-link {
    margin-bottom: 5px;
  }
}

button {
  background-color: #FF0040; /* Darker pink */
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #FA3980; /* Another shade of pink */
}

  `}</style>
</div>
);
};

export default UserDashboard;


//pink colours: #FF0040,#FF0066, #FF0078, #FA3980, #ffeba7, #ff3c78, #21B6A8,#007bff, #0056b3
