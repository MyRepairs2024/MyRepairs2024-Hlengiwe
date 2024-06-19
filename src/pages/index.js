import React, { useState, useEffect } from 'react';
import Header from './components/Header1';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { faL } from '@fortawesome/free-solid-svg-icons';
import PDFLink from './PDFLink'; 

const cardData = [
  {
    icon: '/Icon1.1.png',
    title: 'Appliance Repairs',
    hoverIcon: '/Icon1.png',
   
  },

  {
    icon: '/Icon2.1.png',
    title: 'Plumber',
    hoverIcon: '/Icon2.png',
   
  },
  
  {
    icon: '/Icon3.1.png',
    title: 'Electrician Services',
    hoverIcon: '/Icon3.png',
  
  },
  
  {
    icon: '/Icon4.1.png', 
    title: 'Painting and Decoration',
    hoverIcon: '/Icon4.png',
   
  },
  {
    icon: '/Icon5.1.png',
    title: 'Capentry',
    hoverIcon: '/Icon5.png',
   
  },
  {
    icon: '/Icon6.1.png',
    title: 'HAVC',
    hoverIcon: '/Icon6.png',
  
  },

  {
    icon: '/Icon7.1.png', 
    title: 'Gardening and Landscaping',
    hoverIcon: '/Icon7.png',
    
  },
  {
    icon: '/Icon8.1.png',
    title: 'Home Security Services',
    hoverIcon: '/Icon8.png',
   
  },
  {
    icon: '/Icon9.1.png',
    title: 'Handyman Services',
    hoverIcon: '/Icon9.png',
  
  },

  {
    icon: '/Icon10.1.png', 
    title: 'Roofing Services',
    hoverIcon: '/Icon10.png',
   
  },
  {
    icon: '/Icon11.1.png',
    title: 'Cleaning Services',
    hoverIcon: '/Icon11.png',
    
  },
  {
    icon: '/Icon12.1.png',
    title: 'Locksmith Services',
    hoverIcon: '/Icon12.png',
   
  },
  
];

const HomePage = () => {
  const [hoveredCard, setHoveredCard] = useState(null);
  const [showScrollButton, setShowScrollButton] = useState(false);
  const [expandedCard, setExpandedCard] = useState(null);
  
  //for popup containers
  const [showPopup, setShowPopup] = useState(false);
  const [showPopupPlumbing, setShowPopupPlumbing] = useState(false); // New state for plumbing services
 const [showPopupElectricianServices,setshowPopupElectricianServices]=useState(false);
 const[showpopupPaintingAndDecoration, setShowPopupPaintingAndDecoration]=useState(false);
 const [showPopupHomeSecurityServices, setShowPopupHomeSecurityServices] = useState(false);
 const [showPopupGardeningAndLandscaping , setShowPopupGardeningAndLandscaping ] = useState(false);  
 const [showPopupHAVC , setShowPopupHAVC ] = useState(false);  
 const [showPopupCapentry,setShowPopupCapentry] = useState(false);
 const [showPopupHandymanServices, setShowPopupHandymanServices] = useState(false);
 const [showPopupRoofingServices, setShowPopupRoofingServices] = useState(false);
 const [showPopupCleaningServices, setShowPopupCleaningServices] = useState(false);
 const [showPopupLocksmithServices, setShowPopupLocksmithServices] = useState(false);
 const [showNextContainerHS, setShowNextContainerHS] = useState(false);
 const [showNextContainerRS, setShowNextContainerRS] = useState(false);
 const [showNextContainerCS, setShowNextContainerCS] = useState(false);
 const [showNextContainerLS, setShowNextContainerLS] = useState(false);
 const [showNextContainerC, setShowNextContainerC] = useState(false);
const [showNextContainer, setShowNextContainer] = useState(false);
const [selectedService, setSelectedService] = useState("");

const [selectedTime, setSelectedTime] = useState("");
const [selectedDate, setSelectedDate] = useState(null);
const [description, setDescription] = useState('');
const [hasSubFaults, setHasSubFaults] = useState('no');
const [selectedMainFault, setSelectedMainFault] = useState('');
const [selectedSubFault, setSelectedSubFault] = useState('');
const [applianceRepairsClicked, setApplianceRepairsClicked] = useState(false);
const [plumberClicked, setPlumberClicked] = useState(false);
const [showPopupOtherServices, setShowPopupOtherServices] = useState(false);
const [isModalOpen, setIsModalOpen] = useState(false);
const [showProfilePopup, setShowProfilePopup] = useState(false);

//for address/location
const [location, setLocation] = useState("");
const [address, setAddress] = useState('');
const [loading, setLoading] = useState(false);

const profileInfo = {
  name: 'John Doe',
  description: "I'm a friendly and experienced Uber driver with a passion for providing safe and comfortable rides to my passengers. With [X] years of driving experience and a clean driving record, I prioritize customer satisfaction and timely service. I am familiar with the [Your City] area and can navigate efficiently to ensure on-time arrivals. Whether you need a quick trip across town or a longer journey, I'm here to make your ride enjoyable and stress-free.",
  email: 'john@example.com',
  price: 'R 900',
  vehicle: 'Toyota Camry, 2018'
};

const getAddressFromCoordinates = async (lat, lon) => {
  const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY; // Securely manage your API key
  const apiUrl = 'https://maps.googleapis.com/maps/api/geocode/json?latlng={latitude},{longitude}&key={YOUR_API_KEY}'

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    console.log('Geocoding response:', data); // Detailed logging for debugging

    if (data.status === 'OK' && data.results.length > 0) {
      return data.results[0].formatted_address;
    } else {
      console.error('Geocoding error:', data.status, data.error_message);
      return 'Address not found';
    }
  } catch (error) {
    console.error('Fetch error:', error);
    return 'Error fetching address';
  }
};


const getLocation = () => {
  if (navigator.geolocation) {
    setLoading(true);
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        setLocation(`${latitude}, ${longitude}`);

        const address = await getAddressFromCoordinates(latitude, longitude);
        console.log("Address fetched: ", address);
        setAddress(address);
        setLoading(false);
      },
      (error) => {
        console.error("Error getting location:", error);
        alert("Error getting location. Please try again.");
        setLoading(false);
      }
    );
  } else {
    alert("Geolocation is not supported by this browser.");
  }
};


//for Appliances repairs
const subFaultsAppliancesRepairs = {
  '1.1': [
    { id: 1, name: 'Compressor Not Running', description: 'The compressor fails to start, resulting in no cooling.' },
    { id: 2, name: 'Compressor Noisy', description: 'Unusual or excessively loud noises coming from the compressor.' },
    { id: 3, name: 'Compressor Overheating', description: 'The compressor becomes too hot, affecting cooling efficiency.' }
  ],
  '1.2': [
    { id: 1, name: 'Inaccurate temperature reading', description: 'The thermostat provides incorrect temperature information' },
    { id: 2, name: 'Thermostat Unresponsive', description: 'The thermostat doesnt adjust or regulate the temperature as intended.' },
    { id: 3, name: 'Thermostat Sensor Malfuction', description: 'The sensor resposible for temperature measurement is faulty .' }
  ],
  '1.3': [
    { id: 1, name: 'Low Refrigerant Levels: ', description: 'Reduced cooling due to insufficient refrigerant levels..' },
    { id: 2, name: 'Leaking Refrigerant: ', description: 'Refrigerant leaks lead to a decline in cooling performance.' },
    { id: 3, name: 'Inadequate Cooling: ', description: 'Inadequate cooling even after cleaning coils and components.' }
  ],
  '1.4': [
    { id: 1, name: 'Torn or Worn Seals: ', description: 'Seals are torn, cracked, or damaged, leading to air leaks.' },
    { id: 2, name: 'Lose Seals', description: 'Seals that doent seal properly due to poor alignment or wear' },
    { id: 3, name: 'Moldy Seals: ', description: 'Seals that have mold growth due to moisture accumulation.' }
  ],
  '1.5': [
    { id: 1, name: 'Excessive Frost Buildup:', description: ' Frost accumulates more than usual, hindering proper cooling.' },
    { id: 2, name: 'Defrost Heater Failure', description: 'The defrost heater that doesnt work,leading to frost build up' },
    { id: 3, name: 'Defrost Timer Malfunction:', description: ' The timer doesnt initiate defrost cyclesas intended' }
  ]
};





//for Handyman Services
const subFaultsHandymanServices = {
  '9.1': [
    { id: '9.1.1', name: 'fixing leaks', description: 'fixing leaks'},
    { id: '9.1.2', name: 'loose fixtures', description: 'loose fixtures' },
  ],
  '9.2': [
    { id: '9.2.1', name: 'damaged woodwork', description: 'Repairing or replacing damaged woodwork'},
    { id: '9.2.2', name: 'shelves',description: 'Repairing or replacing damaged Shelves'},
    {id: '9.2.3', name: 'cabinets', description: 'Repairing or replacing damaged cabinets'},
    {id: '9.2.4', name: 'furniture', description: 'Repairing or replacing damaged furniture'},
  ],
  '9.3': [
    { id: '9.3.1', name: 'leaky faucets', description: 'Fixing leaky faucets'},
    {id: '9.3.2', name: 'unclogging drains',description: 'Fixing unclogging drains'},
    {id: '9.3.3', name: 'addressing minor plumbing issues',description: 'Fixing addressing minor plumbing issues'},
  ],
  '9.4': [
    { id: '9.4.1', name: 'light fixtures', description: 'Replacing light fixtures'},
    { id: '9.4.2', name: ' outlets', description: 'Replacing outlets'},
    { id: '9.4.3', name: 'switches', description: 'Replacing switches'},
    { id: '9.4.4', name: 'addressing simple electrical issues', description: 'fixing simple electrical issues'},
  ],
  '9.5': [
    { id: '9.5.1', name: 'Painting and Touch-Ups', description: 'Painting walls'},
    { id: '9.5.2', name: 'Painting ceilings', description: 'Painting ceilings'},
    { id: '9.5.3', name: 'Painting furniture', description: 'Painting furniture'},
    { id: '9.5.4', name: 'Painting and Touch-Ups', description: 'Painting walls and Touch-Ups'},
  ],
  '9.6': [
    { id: '9.6.1', name: 'Patching holes', description: 'Patching holes'},
    { id: '9.6.2', name: 'fixing cracks', description: 'fixing cracks'},
    { id: '9.6.3', name: 'damaged Drywall', description: 'repairing damaged drywall'},
  ],
  '9.7': [
    { id: '9.7.1', name: 'Door Repairs', description: 'Repairing or adjusting doors'},
    { id: '9.7.2', name: 'windows Repairs', description: 'Repairing or adjusting windows'},
    { id: '9.7.3', name: 'frames Repairs', description: 'Repairing or adjusting frames for proper functionality'},
  ],
  '9.8': [
    { id: '9.8.1', name: 'Tile and Grout Repairs', description: 'Replacing broken tiles'},
    { id: '9.8.2', name: 'Grout Repairs', description: 'Replacing broken grout'},
    { id: '9.8.3', name: 'addressing tile-related issues', description: 'addressing tile-related issues'},
  ],
  '9.9': [
    { id: '9.9.1', name: 'Furniture Assembly', description: 'Assembling and setting up furniture'},
    { id: '9.9.2', name: 'cabinets', description: 'Assembling and setting up cabinets'},
    { id: '9.9.3', name: 'shelving', description: 'Assembling and setting up shelving'},
  ],
  '9.10': [
    { id: '9.10.1', name: 'Gutter Cleaning and Maintenance', description: 'Cleaning gutters'},
    { id: '9.10.2', name: ' removing debris', description: ' removing debris'},
    { id: '9.10.3', name: 'ensuring proper drainage', description: 'ensuring proper drainage'},
  ],
  '9.11': [
    { id: '9.11.1', name: 'Pressure Washing', description: 'Pressure washing exterior surfaces'},
    { id: '9.11.2', name: 'Pressure decks', description: 'Pressure washing decks'},
    { id: '9.11.3', name: 'Pressure driveways', description: 'Pressure washing driveways'},
    { id: '9.11.4', name: 'Pressure sidewalks.', description: 'Pressure washing sidewalks'},
  ],
  '9.12': [
    { id: '9.12.1', name: 'Weather stripping and Sealing', description: 'Adding weatherstripping'},
    { id: '9.12.2', name: 'caulking', description: 'Adding caulking'},
    { id: '9.12.3', name: 'sealing to improve energy efficiency', description: 'sealing to improve energy efficiency'},
  ],
  '9.13': [
    { id: '9.13.1', name: 'microwaves Repairs', description: 'Repairing minor issues with appliances like microwaves'},
    { id: '9.13.2', name: ' toasters Repairs', description: 'Repairing minor issues with appliances like  toasters'},
    { id: '9.13.3', name: ' Fans Repairs', description: 'Repairing minor issues with appliances like fans'},
  ],
  '9.14': [
    { id: '9.14.1', name: 'Replacing air filters', description: 'Replacing air filters'},
    { id: '9.14.2', name: 'cleaning vents', description: 'Replacing cleaning vents'},
    { id: '9.14.3', name: 'addressing minor HVAC issues', description: 'addressing minor HVAC issues'},
  ],
  '9.15': [
    { id: '9.15.1', name: 'Installing shelves', description: 'Installing shelves'},
    { id: '9.15.2', name: ' hooked Storage Solutions', description: 'hooksd Storage Solutions'},
    { id: '9.15.3', name: 'organizational systems to maximize storage', description: 'organizational systems to maximize storage'},
  ],
  '9.16': [
    { id: '9.16.1', name: 'damaged fences Repairs', description: 'Repairing damaged fences'},
    { id: '9.16.2', name: 'Gate Repairs', description: 'Repairing damaged gates'},
    { id: '9.16.3', name: 'posts for security and aesthetics', description: 'Repairing damaged posts for security and aesthetics'},
  ],
  '9.17': [
    { id: '9.17.1', name: 'Decks Repairs', description: 'Repairing and maintaining decks'},
    { id: '9.17.2', name: 'Patio Repairs', description: 'Repairing and maintaining patios'},
    { id: '9.17.3', name: 'outdoor structures Repairs', description: 'Repairing and maintaining outdoor structures'},
  ],
  '9.18': [
    { id: '9.18.1', name: 'Trimming bushes', description: 'Trimming bushes'},
    { id: '9.18.2', name: 'mowing lawns', description: 'mowing lawns'},
    { id: '9.18.3', name: 'basic garden maintenance', description: 'basic garden maintenance'},
  ],
  '9.19': [
    { id: '9.19.1', name: 'Pet Door Installation', description: 'Installing pet doors for easy access for pets.' },
  ],
  '9.20': [
    { id: '9.20.1', name: 'Installing smoke detectors', description: 'Installing smoke detectors'},
    { id: '9.20.1', name: 'Installing carbon monoxide detectors', description: 'Installing  carbon monoxide detectors'},
    { id: '9.20.1', name: 'Installing safety railings', description: 'Installing safety railings,'},
  ],
};





//for Roofing Services
const subFaultsRoofingServices = {
  '10.1': [
    { id: '10.1.1', name: 'Roof Inspection', description: 'Thoroughly inspecting roofs to identify damage'},
    { id: '10.1.2', name: 'areas of concern Inspection', description: 'Thoroughly inspecting areas of concern to identify damage'},
    { id: '10.1.3', name: 'leaks Inspection', description: 'Thoroughly inspecting  leaks to identify damage'},
  ],
  '10.2': [
    { id: '10.2.1', name: 'Roof Repair', description: 'Repairing damaged or deteriorating roofs'},
    { id: '10.2.2', name: 'including fixing leaks Repair', description: 'Repairing damaged or deteriorating leaks'},
    { id: '10.2.3', name: 'replacing shingles Repair', description: 'Repairing damaged or deteriorating shingles'},
    { id: '10.2.4', name: 'addressing structural issues', description: 'addressing structural issues'},
  ],
  '10.3': [
    { id: '10.3.1', name: 'Roof Replacement', description: 'Completely replacing old or damaged roofs with new roofing materials.' },
  ],
  '10.4': [
    { id: '10.4.1', name: 'New Roof Installation', description: 'Installing roofs on new constructions or additions to buildings.' },
  ],
  '10.5': [
    { id: '10.5.1', name: 'Shingle Replacement', description: 'Replacing individual damaged or missing shingles to maintain the integrity of the roof.' },
  ],
  '10.6': [
    { id: '10.6.1', name: 'Install Roofing Services', description: 'Installing'},
    { id: '10.6.2', name: 'Repairing Roofing Services', description: 'Installing'},
    { id: '10.6.3', name: 'Replacing flat roofing systems', description: 'replacing flat roofing systems commonly used on commercial buildings'},
  ],
  '10.7': [
    { id: '10.7.1', name: 'Metal Roofing Services', description: 'Installing and maintaining metal roofing systems known for their durability and longevity.' },
  ],
  '10.8': [
    { id: '10.8.1', name: 'Installing Tile Roofing Services', description: 'Installing'},
    { id: '10.8.2', name: 'Repairing Roof', description: 'Repairing Roof'},
    { id: '10.8.3', name: 'Replacing tile roofing systems', description: 'replacing tile roofing systems for a unique and stylish appearance'},
  ],
  '10.9': [
    { id: '10.9.1', name: 'Installing Slate Roofing Services', description: 'Installing'},
    { id: '10.9.2', name: 'Repairing Slate Roofing Services', description: 'repairing'}, 
    { id: '10.9.3', name: ' replacing slate roofing', description: ' replacing slate roofing, known for its natural beauty and durability'},
  ],
  '10.10': [
    { id: '10.10.1', name: 'Roof Maintenance Services', description: 'Performing routine maintenance tasks to prolong the lifespan of roofs and prevent potential issues.' },
  ],
  '10.11': [
    { id: '10.11.1', name: 'Emergency Roofing Services', description: 'Providing urgent repairs and solutions for roof leaks and storm damage.' },
  ],
  '10.12': [
    { id: '10.12.1', name: 'Gutter Installation and Repair', description: 'Installing and repairing gutters and downspouts to ensure proper drainage and prevent water damage.' },
  ],
  '10.13': [
    { id: '10.13.1', name: 'Roof Ventilation Installation', description: 'Installing roof ventilation systems to regulate temperature and moisture levels in the attic.' },
  ],
  '10.14': [
    { id: '10.14.1', name: 'Skylight Installation and Repair', description: 'Installing and repairing skylights to bring natural light into interior spaces.' },
  ],
  '10.15': [
    { id: '10.15.1', name: 'Roof Coating Application', description: 'Applying protective coatings to extend the life of roofing materials and improve energy efficiency.' },
  ],
  '10.16': [
    { id: '10.16.1', name: 'Flashing Installation and Repair', description: 'Installing or repairing flashing around chimneys'},
    { id: '10.16.2', name: ' vents Installation and Repair', description: 'Installing or repairing  vents around chimneys'},
    { id: '10.16.3', name: 'other roof protrusions to prevent leaks Repair', description: 'Installing or repairing other roof protrusions to prevent leaks around chimneys'},
  ],
  '10.17': [
    { id: '10.17.1', name: 'Roof Insulation Installation', description: 'Adding insulation to roofs to improve energy efficiency and temperature control.' },
  ],
  '10.18': [
    { id: '10.18.1', name: 'Roof Waterproofing', description: 'Applying waterproofing solutions to prevent water infiltration and extend the life of roofs.' },
  ],
  '10.19': [
    { id: '10.19.1', name: 'Roof Consulting and Advice', description: 'Providing expert advice on roof maintenance, repairs, and replacements.' },
  ],
  '10.20': [
    { id: '10.20.1', name: 'Green Roof Installation', description: 'Installing green roofs with vegetation for environmental benefits and aesthetic appeal.' },
  ],
  '10.21': [
    { id: '10.21.1', name: 'Roofing Design and Planning', description: 'Collaborating with architects and builders to design roofs that complement the overall structure.' },
  ],
};


//for Cleaning services
const subFaultsCleaningServices= {
  '11.1': [
    { id: '11.1.1', name: 'Homes Cleaning', description: 'Regular or one-time cleaning of homes'},
    { id: '11.1.2', name: 'apartments Cleaning', description: 'Regular or one-time cleaning of apartments'},
    { id: '11.1.3', name: 'Condos Cleaning', description: 'Regular or one-time cleaning of condos'},
  ],
  '11.2': [
    { id: '11.2.1', name: 'Commercial Cleaning', description: 'Cleaning services for offices'},
    { id: '11.2.2', name: 'Retail stores Cleaning', description: 'Cleaning services for retail stores'},
    { id: '11.2.3', name: 'Restaurants Cleaning', description: 'Cleaning services for restaurants'},
    { id: '11.2.4', name: 'Other commercial spaces Cleaning', description: 'Cleaning services for other commercial spaces'},
  ],
  '11.3': [
    { id: '11.3.1', name: 'Deep Cleaning', description: 'Thorough and comprehensive cleaning that covers areas often missed in regular cleaning routines.' },
  ],
  '11.4': [
    { id: '11.4.1', name: 'Move-In/Move-Out Cleaning', description: 'Cleaning homes or apartments before moving in or after moving out.' },
  ],
  '11.5': [
    { id: '11.5.1', name: 'Post-Construction Cleaning', description: 'Cleaning up after construction or renovation projects to remove dust'},
    { id: '11.5.2', name: 'Debris Cleaning', description: 'Cleaning up debris'},
    { id: '11.5.3', name: 'Construction Residues Cleaning', description: 'Cleaning up after construction residues'},
  ],
  '11.6': [
    { id: '11.6.1', name: 'Vacation Rental Cleaning', description: 'Cleaning and preparing vacation rental properties for new guests.' },
  ],
  '11.7': [
    { id: '11.7.1', name: 'Window Cleaning', description: 'Cleaning windows'},
    { id: '11.7.2', name: 'Glass doors Cleaning', description: 'Cleaning glass doors'},
    { id: '11.7.3', name: 'Glass Surfaces Inside and Outside Cleaning', description: 'Cleaning windows'}, 
  ],
  '11.8': [
    { id: '11.8.1', name: 'Carpet Cleaning', description: 'Cleaning carpets'},
    { id: '11.8.2', name: 'Rugs Cleaning', description: 'Cleaning Rugs'},
    { id: '11.8.3', name: 'Sofas Cleaning', description: 'Cleaning sofas'},
    { id: '11.8.4', name: 'Upholstery Cleaning', description: 'Cleaning upholstery using professional cleaning equipment'},
  ],
  '11.9': [
    { id: '11.9.1', name: 'Floor Cleaning and Polishing', description: 'Cleaning and polishing hard floors'},
    { id: '11.9.2', name: 'Wood Cleaning and Polishing', description: 'Cleaning and polishing hard wood'},
    { id: '11.9.3', name: 'Tiles Cleaning and Polishing', description: 'Cleaning and polishing hard tiles'},
    { id: '11.9.4', name: 'Stones Cleaning and Polishing', description: 'Cleaning and polishing hard stones'},
  ],
  '11.10': [
    { id: '11.10.1', name: 'Kitchen Cleaning', description: 'Cleaning and sanitizing kitchen surfaces'},
    { id: '11.10.2', name: 'Appliances Cleaning', description: 'Cleaning and sanitizing appliances'},
    { id: '11.10.3', name: 'Countertops Cleaning', description: 'Cleaning and sanitizing countertops surfaces'},
    { id: '11.10.4', name: 'Sinks Cleaning', description: 'Cleaning and sanitizing sinks'},

  ],
  '11.11': [
    { id: '11.11.1', name: 'Bathroom Cleaning', description: 'Cleaning and sanitizing bathrooms'},
    { id: '11.11.2', name: 'Toilets Cleaning', description: 'Cleaning and sanitizing toiletss'},
    { id: '11.11.3', name: 'Sinks Cleaning', description: 'Cleaning and sanitizing sinks'},
    { id: '11.11.4', name: 'Tubs Cleaning', description: 'Cleaning and sanitizing tubs'},
  ],
  '11.12': [
    { id: '11.12.1', name: 'Dusting and Surface Wiping', description: 'Dusting and wiping down surfaces'},
    { id: '11.12.2', name: 'Dusting and Surface Electronics', description: 'Dusting and wiping down Electronics'},
    { id: '11.12.3', name: 'Dusting and Surface Furniture', description: 'Dusting and wiping down furniture'},
  ],
  '11.13': [
    { id: '11.13.1', name: 'Stoves Cleaning', description: 'Cleaning and degreasing kitchen appliances like stoves'},
    { id: '11.13.2', name: 'Ovens Cleaning', description: 'Cleaning and degreasing kitchen appliances like Ovens'},
    { id: '11.13.3', name: 'Microwaves Cleaning', description: 'Cleaning and degreasing kitchen appliances like microwavess'},
    { id: '11.13.4', name: 'Refrigerators Cleaning', description: 'Cleaning and degreasing kitchen appliances like refrigerators'},
  ],
  '11.14': [
    { id: '11.14.1', name: 'Garage and Basement Cleaning', description: 'Cleaning and organizing garage and basement spaces.' },
  ],
  '11.15': [
    { id: '11.15.1', name: 'Air Duct Cleaning', description: 'Cleaning HVAC air ducts to improve indoor air quality and system efficiency.' },
  ],
  '11.16': [
    { id: '11.16.1', name: 'Mattress Cleaning', description: 'Cleaning and sanitizing mattresses to remove dust mites and allergens.' },
  ],
  '11.17': [
    { id: '11.17.1', name: 'Pet Hair Removal', description: 'Cleaning and deodorizing areas affected by pet hair'},
    { id: '11.17.2', name: 'Stains Removal', description: 'Cleaning and deodorizing areas affected by stains'},
    { id: '11.17.3', name: 'Odor Removal', description: 'Cleaning and deodorizing areas affected by odors'},
  ],
  '11.18': [
    { id: '11.18.1', name: 'Green Cleaning Services', description: 'Using eco-friendly cleaning products and practices for environmentally conscious clients.' },
  ],
  '11.19': [
    { id: '11.19.1', name: 'Special Event Cleaning', description: 'Providing cleaning services before or after special events'},
    { id: '11.19.2', name: 'After Party Cleaning', description: 'Providing cleaning services before or after parties'},
    { id: '11.19.3', name: 'After Gatherings Cleaning', description: 'Providing cleaning services before or after gatherings'},
  ],
  '11.20': [
    { id: '11.20.1', name: 'Hoarding Cleanup', description: 'Cleaning and decluttering extreme messes and hoarding situations.' },
  ],


};



//for Locksmith services
const subFaultsLocksmith = {
  '12.1': [
    { id: '12.1.1', name: 'Door Lock Installation', description: 'Installing new locks on doors'},
    { id: '12.1.2', name: 'windows Locks Installation', description: 'Installing new locks on windows'},
    { id: '12.1.3', name: 'cabinets Locks Installation', description: 'Installing new locks on cabinets'},
    { id: '12.1.4', name: 'safes Locks Installation', description: 'Installing new locks on safes'},
    { id: '12.1.5', name: 'Other access points Locks Installation', description: 'Installing locks on other access points'},
  ],
  '12.2': [
    { id: '12.2.1', name: 'Lock Repair', description: 'Repairing damaged or malfunctioning locks to restore their functionality.' },
  ],
  '12.3': [
    { id: '12.3.1', name: 'Lock Replacement', description: 'Replacing old or broken locks with new ones for enhanced security.' },
  ],
  '12.4': [
    { id: '12.4.1', name: 'Key Cutting and Duplication', description: 'Cutting new keys and duplicating existing keys for various locks.' },
  ],
  '12.5': [
    { id: '12.5.1', name: 'Key Extraction', description: 'Removing broken or stuck keys from locks without damaging the lock mechanism.' },
  ],
  '12.6': [
    { id: '12.6.1', name: 'Lock Rekeying', description: 'Changing the internal pins of a lock cylinder to match a new set of keys'},
    { id: '12.6.2', name: 'rendering old keys ineffective', description: 'Changing the internal pins of a lock cylinder to match a new set of keys'},
  ],
  '12.7': [
    { id: '12.7.1', name: 'Master Key Systems', description: 'Creating master key systems that provide different levels of access within a property.' },
  ],
  '12.8': [
    { id: '12.8.1', name: 'Installing electronic keyless entry systems', description: 'Installing electronic keyless entry systems'},
    { id: '12.8.2', name: 'keypad locks and smart locks Installation', description: 'Installing electronic keyless entry systems'},
  ],
  '12.9': [
    { id: '12.9.1', name: 'Emergency Lockout Services', description: 'Assisting individuals who are locked out of their homes, cars, or businesses.' },
  ],
  '12.10': [
    { id: '12.10.1', name: 'Providing advice and recommendations on security solutions', description: 'Providing advice and recommendations on security solutions'},
    { id: '12.10.2', name: 'Security Consultation locks and access control systems', description: 'Providing advice and recommendations on security solutions'},
  ],
  '12.11': [
    { id: '12.11.1', name: 'Burglary and Break-In Repairs', description: 'Repairing locks and doors that have been damaged during break-ins or burglary attempts.' },
  ],
  '12.12': [
    { id: '12.12.1', name: 'Padlock Removal', description: 'Removing padlocks from gates'},
    { id: '12.12.2', name: 'Storage units when the keys are lost', description: 'storage units when the keys are lost'},
  ],
  '12.13': [
    { id: '12.13.1', name: 'Installing Mailbox Locks', description: 'Installing'},
    { id: '12.13.2', name: 'Repairing Locks', description: 'Repairing Lock Services'},
    { id: '12.13.3', name: 'Replacing locks on mailboxes', description: 'Replacing Lock Services for added security'},
  ],
  '12.14': [
    { id: '12.14.1', name: 'Opening Safe ', desciption: 'Opening Safe Services'},
    { id: '12.14.2', name: ' Repairing Safe', description: 'repairing Safe Services'},
    { id: '12.14.3', name: 'servicing safes', description: 'servicing safes'},
    { id: '12.14.4', name: 'Forgotten Combination', description: 'assisting with forgotten combinations'},
  ],
  '12.15': [
    { id: '12.15.1', name: 'Installing Garage Door Lock', description: 'Installing'},
    { id: '12.15.2', name: 'Repairing Garage Door Lock Services', description: 'Repairing'},
    { id: '12.15.3', name: 'Replacing Garage Door Lock Services', description: 'replacing locks on garage doors and ensuring proper security'},
  ],
  '12.16': [
    { id: '12.16.1', name: 'Installing and servicing electronic locks', description: 'Installing and servicing electronic locks'},
    { id: '12.16.2', name: 'Installing Combination locks and biometric locks', description: 'Installing Combination locks and biometric locks'},
  ],
  '12.17': [
    { id: '12.17.1', name: 'car lockouts', description: 'Assisting with car lockouts'},
    { id: '12.17.2', name: 'ignition lock repairs', description: 'Assisting with ignition lock repairs'},
    { id: '12.17.3', name: ' key replacements', description: 'Assisting with  key replacements'},
  ],
  '12.18': [
    { id: '12.18.1', name: 'Lock Hardware Upgrades', description: 'Upgrading locks with higher-security options'},
    { id: '12.18.2', name: 'anti-pick and anti-bump mechanisms Upgrades', description: 'Upgrading locks with anti-pick and anti-bump mechanisms'},
  ],
  '12.19': [
    { id: '12.19.1', name: 'Security Assessment and Auditing', description: 'Evaluating the security of locks and access points and recommending improvements.' },
  ],
  '12.20': [
    { id: '12.20.1', name: 'Lock Maintenance', description: 'Providing routine maintenance to keep locks functioning smoothly and preventing issues.' },
  ],
};



//for Cleaning Services

;

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setShowScrollButton(true);
      } else {
        setShowScrollButton(false);
      }
    };
    

    // Attach the scroll event listener
    window.addEventListener('scroll', handleScroll);

    // Clean up the event listener when the component unmounts
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

//Appliance Repairs
  const handleCardClick = (index,title) => {
    if (title === 'Appliance Repairs' || title === 'Plumber') {
      if (title === 'Appliance Repairs') {
       setShowPopup(true); // Show 'Appliance Repairs' pop-up
      } else {
        setShowPopup(false); // Hide 'Appliance Repairs' pop-up
      }
      setExpandedCard((prevExpandedCard) => (prevExpandedCard === index ? null : index));
      setShowPopupOtherServices(false); // Hide pop-ups for other services
      document.body.style.overflow = 'hidden'; // Disable scrolling when pop-up is open
    } else {
      setShowPopupOtherServices(false); // Show pop-ups for other services
      setShowPopup(false); // Hide 'Appliance Repairs' pop-up
      setExpandedCard((prevExpandedCard) => (prevExpandedCard === index ? null : index));
      document.body.style.overflow = ''; // Enable scrolling when pop-up is closed
      
    }
 
  };


  


  const handleDescriptionItemClick = (line) => {
    // Handle click on individual lines within long description
    console.log('Clicked line:', line);
    
  };
  const handleCloseButtonClick = () => {
    setShowPopup(false);
    setShowNextContainer(false); // Reset the state when closing the popup
  };


  const handleContactCustomer = () => {
    setShowPopup(true);
    window.location.href = '/customer-login'; 
  };

  const handleNextButtonClick = () => {
    setShowNextContainer(true);
    
  };
  
  


  const showPosition = (position) => {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
   // setLocation(`${latitude}, ${longitude}`);
   console.log("Latitude: " + latitude + ", Longitude: " + longitude);

  }

  const showError = (error) => {
    switch(error.code) {
      case error.PERMISSION_DENIED:
        alert("User denied the request for Geolocation.");
        break;
      case error.POSITION_UNAVAILABLE:
        alert("Location information is unavailable.");
        break;
      case error.TIMEOUT:
        alert("The request to get user location timed out.");
        break;
      case error.UNKNOWN_ERROR:
        alert("An unknown error occurred.");
        break;
      default:
        alert("An unknown error occurred.");
    }
  }
  const handleViewProfile = () => {
    setShowProfilePopup(true);
  };

  const handleCloseProfilePopup = () => {
    setShowProfilePopup(false);
  };
  

 
  return (
    <div className="home-page">
   <a id="top"></a>

      <header className='header1'>
        <div className='firstheader'>

       <h6 className='topheader'>+27 064 897 3566 | info@myrepairs.com</h6>
  </div>
      </header>
    
      <Header />
      
      <main>
        <section className="banner">
          {
<div className='slider'><div className='intro'>
  <h1>Hello!</h1><br/> 
  <h4>Welcome To
    <br/>
     My Repairs.</h4>

 </div>
              <div className='images'>        
              <img src="/machines.png" className='image1' alt="Repairman" style={{ width: '600px', objectFit: 'cover',  borderRadius: "10px"}}/>
             <img src="/guy4.png" className='image2' alt="Repairman" style={{ width: '250px', objectFit: 'cover',  borderRadius: "10px" }}/>
              <img src="/guy2.png" className='image3' alt="Repairman" style={{ width: '550px', objectFit: 'cover',  borderRadius: "10px"}}/>
              <img src="/tools.png" className= 'image4' alt="Repairman" style={{ width: '350px', objectFit: 'cover',  borderRadius: "10px"}}/>

</div>
</div>
          }
        </section>


<section className="services">
          {
   <div>
    <div className='service-heading'> 
        <h2 className="heading-with-lines">  OUR SERVICES  </h2>            
    </div>


            {/*Card container*/}
  <div className="card-container">
     {cardData.map((card, index) => (
        <div
             className={`card ${index === expandedCard ? 'expanded' : ''}`}
             key={index}
             onClick={() => {
              handleCardClick(index, card.title);
              setSelectedService(card.title);
              if (card.title === 'Plumber') {
                setShowPopupPlumbing(true);
              } else if (card.title === 'Electrician') {
                setshowPopupElectricianServices(true);
              } else if (card.title === 'Painting and Decoration') {
                setShowPopupPaintingAndDecoration(true);
              } else if (card.title === 'Carpentry') {
                setShowPopupCarpentry(true);
              } else if (card.title === 'HAVC') {
                setShowPopupHAVC(true);
              } else if (card.title === 'Gardening and Landscaping') {
                setShowPopupGardeningAndLandscaping(true);
              } else if (card.title === 'Home Security Services') {
                setShowPopupHomeSecurityServices(true);
              } else if (card.title === 'Handyman Services') { // Handle Handyman Services card click
                setShowPopupHandymanServices(true);
              } else if (card.title === 'Roofing Services') { // Handle Roofing Services card click
                setShowPopupRoofingServices(true);
              } else if (card.title === 'Cleaning Services') { // Handle Cleaning Services card click
                setShowPopupCleaningServices(true);
              } else if (card.title === 'Locksmith Services') { // Handle Locksmith Services card click
                setShowPopupLocksmithServices(true);
              } else {
                setShowPopup(true); // For other cards
              }
            }}
            
             onMouseEnter={() => setHoveredCard(index)}
             onMouseLeave={() => setHoveredCard(null)}
          >
            <div className="icon-container">
               <img
                  src={index === hoveredCard ? card.hoverIcon : card.icon}
                  alt={card.title}
                  className="card-icon"
                  style={{ width: '200px', height: '180px' }}
                />
             </div>
             <div className="card-title">{card.title}</div>
             </div>
            ))}
          </div>
</div>  }





{/*Popup for Appliance Repairs*/}
{showPopup && (
  <div className="popup-container">
    <div className="popup-content">
      
      {/* Close button */}
      <button className="close-button" onClick={handleCloseButtonClick} style={{fontWeight: 'bold',color: 'black' }}>X</button>
      {/* Three containers */}
      <div className="infoContainer">
        <p style={{ fontWeight: 'bold', color: '#fff',fontSize: '15px'}}>What do you need help with?</p>
  <select value={selectedService} 
  onChange={(e) => setSelectedService(e.target.value)}  
  style={{ borderRadius: '5px' ,width: '250px',height: '40px'}}>
   <option value="">Select Service</option>
<option value="electrician">Refrigerator Repair</option>
<option value="appliance">Oven and Hob Repair</option>
<option value="electrician">Washing Machine Repair</option>
<option value="appliance">Fridge Repair</option>
<option value="electrician">Dishwasher Repair</option>
<option value="appliance">Tumble Dryer Repair</option>
<option value="electrician">Dishwasher Repair</option>
<option value="appliance">Microwave Repair</option>
<option value="electrician">Freezer Repair</option>
<option value="appliance">Garbage Disposal Repair</option>
<option value="electrician">Air Conditioning Repair</option>
<option value="appliance">Water Heater Repair</option>
<option value="appliance">Extractor Hood Repair</option>
<option value="appliance">Ice Maker Repair</option>
<option value="appliance">Small Appliance Repair</option>
<option value="appliance">General Maintenance and Servicing</option>
</select>

  <p style={{ fontWeight: 'bold', color: '#fff',fontSize: '15px'}}>Select your brand?</p>
  <select value={selectedService} onChange={(e) => setSelectedService(e.target.value)}  style={{ borderRadius: '5px' ,width: '250px',height: '40px'}}>
    <option value="">Select Brand</option>
    <option value="electrician">Whirlpool Corporation</option>
    <option value="appliance">LG Electronics</option>
    <option value="electrician">Samsung Electronics</option>
    <option value="appliance">Electrolux</option>
    <option value="electrician">Bosch: </option>
    <option value="appliance">General Electic</option>
    <option value="electrician">Sofa Repair</option>
    <option value="appliance">Haier Group </option>
    <option value="electrician">Miele</option>
    <option value="appliance">Panasonic Corporation</option>
    <option value="electrician">Siemens</option>
    <option value="appliance">Maytag</option>
    <option value="appliance">AEG</option>
    <option value="appliance">KitchenAid</option>
    <option value="appliance">Sharp Corporation</option>
    <option value="appliance">Indesit Company</option>
  </select>


 {/* Yes or No question */}
 <p style={{ fontWeight: 'bold', color: '#fff', fontSize: '15px' }}>Are there any faults?</p>
            <select
              value={hasSubFaults}
              onChange={(e) => setHasSubFaults(e.target.value)}
              style={{ borderRadius: '5px', width: '250px', height: '40px' }}
            >
              <option value="no">No</option>
              <option value="yes">Yes</option>
            </select>
            {/* Input for sub faults if "Yes" */}
            {hasSubFaults === 'yes' && (
              <div>
                <p style={{ fontWeight: 'bold', color: '#fff', fontSize: '15px' }}>Select  Fault:</p>
                <select
                  value={selectedMainFault}
                  onChange={(e) => setSelectedMainFault(e.target.value)}
                  style={{ borderRadius: '5px', width: '250px', height: '40px' }}
                >
                  <option value="">Select Main Fault</option>
                  <option value="1.1">Compressor Replacement</option>
                  <option value="1.2">Thermostat Repair</option>
                  <option value="1.3">Refrigerant Recharge</option>
                  <option value="1.4">Door Seal Replacement</option>
                  <option value="1.5">Defrost System Repair</option>
                </select>
                {/* Render subfaults dropdown based on selected main fault */}
                {selectedMainFault && (
                  <div>
                    <p style={{ fontWeight: 'bold', color: '#fff', fontSize: '15px' }}>Sub Faults:</p>
                    <select
                      value={selectedSubFault}
                      onChange={(e) => setSelectedSubFault(e.target.value)}
                      style={{ borderRadius: '5px', width: '250px', height: '40px' }}
                    >
                      <option value="">Select Sub Fault</option>
                      {subFaultsAppliancesRepairs[selectedMainFault]?(
                         subFaultsAppliancesRepairs[selectedMainFault].map(subFault => (
                          <option key={subFault.id} value={subFault.id}>{subFault.name}</option>
  ))
                      ):(
                        <option value="">No sub faults available</option> )}
                    </select>
                  </div>
                )}
                  </div>
            )}
  <p style={{ fontWeight: 'bold', color: '#fff', fontSize: '15px'}}>Description:</p>
  <textarea
  value={description}
  onChange={(e) => setDescription(e.target.value)}
  placeholder="Describe the issue or any additional details"
  style={{ width: '250px', minHeight: '50px' }} // Adjust width and height as needed
></textarea>

  <div>
  <p style={{ fontWeight: 'bold', color: '#fff', fontSize: '15px' }}>Where are you based?</p>
      <input
        type="text"
        value={address || location}
        onChange={(e) => setAddress(e.target.value)}
        style={{ borderRadius: '5px', width: '250px', height: '40px' }}
        placeholder="Enter Your Location"
      />
      <button
        onClick={getLocation}
        style={{
          fontWeight: 'bold',
          color: '#fff',
          marginTop: '10px',
          backgroundColor: '#40E0D0',
          border: '3px solid #40E0D0',
          borderRadius: '7px',
          width: '250px',
          height: '40px'
        }}
        disabled={loading}
      >
         {loading ? 'Fetching Location...' : 'Get My Location'}
      </button>
      {location && (
        <p style={{ fontWeight: 'bold', color: '#fff', fontSize: '15px' }}>Coordinates: {location}</p>
      )}
       {address && (
        <p style={{ fontWeight: 'bold', color: '#fff', fontSize: '15px' }}>Your address is: {address}</p>
      )}
      <p style={{ fontWeight: 'bold', color: '#fff', fontSize: '15px' }}>When are you available?</p>
       </div>

  <DatePicker 
        selected={selectedDate}
        onChange={date => setSelectedDate(date)}
        showTimeSelect
        dateFormat="MMMM d, yyyy h:mm aa"
        placeholderText="Select Date and Time" 
        className="custom-datepicker"
      />
          <button className="small-button"
           onClick={ handleNextButtonClick} 
           style={{ fontWeight: 'bold', 
           color: '#fff', 
           marginTop: '15px',
            backgroundColor: '#40E0D0', 
            border: '3px solid #40E0D0', 
            borderRadius: '7px',
            width: '80px',
            height: '40px' ,
            marginLeft: '150px'
            }}
            >
                Next
              </button>
           
</div>  
    </div>
  </div>
  
)}








 {/* Popup for Plumbing Services */}
 {showPopupPlumbing && (
          <div className="popup-container">
            <div className="popup-content">
              {/* Close button */}
      <button className="close-button" onClick={()=>setShowPopupPlumbing(false)} style={{fontWeight: 'bold',color: 'black' }}>X</button>
        {/* Three containers */}
      <div className="infoContainer">
        <p style={{ fontWeight: 'bold', color: '#fff',fontSize: '15px'}}>What do you need help with?</p>
 
       
       <select value={selectedService}
                onChange={(e) => setSelectedService(e.target.value)}
                style={{ borderRadius: '5px', width: '250px', height: '40px' }}
              >
                 <option value="">Select Service</option>
  <option value="gas-line-installation-repair">Gas Line Installation, Repair, and Inspection</option>
<option value="septic-tank-services">Septic Tank Services</option>
<option value="plumbing-inspections">Plumbing Inspections</option>
<option value="fixture-upgrades">Fixture Upgrades</option>
<option value="bathroom-kitchen-remodels">Bathroom and Kitchen Remodels</option>
<option value="outdoor-plumbing">Outdoor Plumbing</option>
<option value="water-pressure-regulation">Water Pressure Regulation</option>
<option value="frozen-pipe-thawing">Frozen Pipe Thawing</option>
<option value="hydro-jetting">Hydro Jetting</option>
<option value="plumbing-system-maintenance">Plumbing System Maintenance</option>
<option value="commercial-plumbing-services">Commercial Plumbing Services</option>
<option value="plumbing-consultation-advice">Plumbing Consultation and Advice</option>
</select>

              
              {/* Yes or No question */}
 <p style={{ fontWeight: 'bold', color: '#fff', fontSize: '15px' }}>Are there any faults?</p>
            <select
              value={hasSubFaults}
              onChange={(e) => setHasSubFaults(e.target.value)}
              style={{ borderRadius: '5px', width: '250px', height: '40px' }}
            >
              <option value="no">No</option>
              <option value="yes">Yes</option>
            </select>
            {/* Input for sub faults if "Yes" */}
            {hasSubFaults === 'yes' && (
              <div>
                <p style={{ fontWeight: 'bold', color: '#fff', fontSize: '15px' }}>Select  Fault:</p>
                <select
                  value={selectedMainFault}
                  onChange={(e) => setSelectedMainFault(e.target.value)}
                  style={{ borderRadius: '5px', width: '250px', height: '40px' }}
                >
                  <option value="">Select Main Fault</option>
                  <option value="1.1">Compressor Replacement</option>
                  <option value="1.2">Thermostat Repair</option>
                  <option value="1.3">Refrigerant Recharge</option>
                  <option value="1.4">Door Seal Replacement</option>
                  <option value="1.5">Defrost System Repair</option>
                </select>
                {/* Render subfaults dropdown based on selected main fault */}
                {selectedMainFault && (
                  <div>
                    <p style={{ fontWeight: 'bold', color: '#fff', fontSize: '15px' }}>Sub Faults:</p>
                    <select
                      value={selectedSubFault}
                      onChange={(e) => setSelectedSubFault(e.target.value)}
                      style={{ borderRadius: '5px', width: '250px', height: '40px' }}
                    >
                      <option value="">Select Sub Fault</option>
                      {subFaults[selectedMainFault].map(subFault => (
                        <option key={subFault.id} value={subFault.id}>{subFault.name}</option>
                      ))}
                    </select>
                  </div>
                )}
                  </div>
            )}
  <p style={{ fontWeight: 'bold', color: '#fff', fontSize: '15px'}}>Description:</p>
  <textarea
  value={description}
  onChange={(e) => setDescription(e.target.value)}
  placeholder="Describe the issue or any additional details"
  style={{ width: '250px', minHeight: '50px' }} // Adjust width and height as needed
></textarea>
  
 <p style={{ fontWeight: 'bold', color: '#fff', fontSize: '15px' }}>Where are you based?</p>

      <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} style={{ borderRadius: '5px', width: '250px', height: '40px' }} placeholder="Enter Your Location" />
      <button onClick={getLocation} style={{ fontWeight: 'bold', color: '#fff', marginTop: '10px', backgroundColor: '#40E0D0', border: '3px solid #40E0D0', borderRadius: '7px', width: '250px', height: '40px' }}>
        Get My Location
      </button>
  <p style={{ fontWeight: 'bold', color: '#fff',fontSize: '15px'}}>When are you available?</p>
  



  <DatePicker 
        selected={selectedDate}
        onChange={date => setSelectedDate(date)}
        showTimeSelect
        dateFormat="MMMM d, yyyy h:mm aa"
        placeholderText="Select Date and Time" 
        className="custom-datepicker"
      />
          <button className="small-button" onClick={ handleNextButtonClick} style={{ fontWeight: 'bold', color: '#fff', marginTop: '15px', backgroundColor: '#40E0D0', border: '3px solid #40E0D0', borderRadius: '7px',width: '80px',height: '40px' ,marginLeft: '150px'}}>
                Next
              </button>
               </div>
          </div>
          </div>
        )}






{/* Popup for Electrician Services */}
{showPopupElectricianServices && (
          <div className="popup-container">
            <div className="popup-content">
             {/* Close button */}
      <button className="close-button" onClick={()=>setshowPopupElectricianServices(false)} style={{fontWeight: 'bold',color: 'black' }}>X</button>
      {/* Three containers */}
      <div className="infoContainer">
        <p style={{ fontWeight: 'bold', color: '#fff',fontSize: '15px'}}>What do you need help with?</p>
    <select
                value={selectedService}
                onChange={(e) => setSelectedService(e.target.value)}
                style={{ borderRadius: '5px', width: '250px', height: '40px' }}
              >
                <option value="">Select Service</option>
  <option value="electrical-installation">Electrical Installation</option>
<option value="electrical-repair">Electrical Repair</option>
<option value="electrical-upgrades">Electrical Upgrades</option>
<option value="lighting-installation-repair">Lighting Installation and Repair</option>
<option value="outlet-switch-installation">Outlet and Switch Installation</option>
<option value="circuit-breaker-services">Circuit Breaker Services</option>
<option value="electrical-wiring">Electrical Wiring</option>
<option value="ceiling-fan-installation-repair">Ceiling Fan Installation and Repair</option>
<option value="appliance-wiring">Appliance Wiring</option>
<option value="data-communication-wiring">Data and Communication Wiring</option>
<option value="outdoor-electrical-services">Outdoor Electrical Services</option>
<option value="electrical-safety-inspections">Electrical Safety Inspections</option>
<option value="surge-protection-installation">Surge Protection Installation</option>
<option value="emergency-electrical-services">Emergency Electrical Services</option>
<option value="electrical-panel-upgrade">Electrical Panel Upgrade</option>
<option value="grounding-bonding">Grounding and Bonding</option>
<option value="generator-installation-maintenance">Generator Installation and Maintenance</option>
<option value="energy-efficiency-audits">Energy Efficiency Audits</option>
<option value="smoke-carbon-monoxide-detector-installation">Smoke and Carbon Monoxide Detector Installation</option>
<option value="home-automation-smart-home-services">Home Automation and Smart Home Services</option>
</select>

              {/* Yes or No question */}
 <p style={{ fontWeight: 'bold', color: '#fff', fontSize: '15px' }}>Are there any faults?</p>
            <select
              value={hasSubFaults}
              onChange={(e) => setHasSubFaults(e.target.value)}
              style={{ borderRadius: '5px', width: '250px', height: '40px' }}
            >
              <option value="no">No</option>
              <option value="yes">Yes</option>
            </select>
            {/* Input for sub faults if "Yes" */}
            {hasSubFaults === 'yes' && (
              <div>
                <p style={{ fontWeight: 'bold', color: '#fff', fontSize: '15px' }}>Select  Fault:</p>
                <select
                  value={selectedMainFault}
                  onChange={(e) => setSelectedMainFault(e.target.value)}
                  style={{ borderRadius: '5px', width: '250px', height: '40px' }}
                >
                  <option value="">Select Main Fault</option>
                  <option value="1.1">Compressor Replacement</option>
                  <option value="1.2">Thermostat Repair</option>
                  <option value="1.3">Refrigerant Recharge</option>
                  <option value="1.4">Door Seal Replacement</option>
                  <option value="1.5">Defrost System Repair</option>
                </select>
                {/* Render subfaults dropdown based on selected main fault */}
                {selectedMainFault && (
                  <div>
                    <p style={{ fontWeight: 'bold', color: '#fff', fontSize: '15px' }}>Sub Faults:</p>
                    <select
                      value={selectedSubFault}
                      onChange={(e) => setSelectedSubFault(e.target.value)}
                      style={{ borderRadius: '5px', width: '250px', height: '40px' }}
                    >
                      <option value="">Select Sub Fault</option>
                      {subFaults[selectedMainFault].map(subFault => (
                        <option key={subFault.id} value={subFault.id}>{subFault.name}</option>
                      ))}
                    </select>
                  </div>
                )}
                  </div>
            )}
  <p style={{ fontWeight: 'bold', color: '#fff', fontSize: '15px'}}>Description:</p>
  <textarea
  value={description}
  onChange={(e) => setDescription(e.target.value)}
  placeholder="Describe the issue or any additional details"
  style={{ width: '250px', minHeight: '50px' }} // Adjust width and height as needed
></textarea>
  
 <p style={{ fontWeight: 'bold', color: '#fff', fontSize: '15px' }}>Where are you based?</p>

      <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} style={{ borderRadius: '5px', width: '250px', height: '40px' }} placeholder="Enter Your Location" />
      <button onClick={getLocation} style={{ fontWeight: 'bold', color: '#fff', marginTop: '10px', backgroundColor: '#40E0D0', border: '3px solid #40E0D0', borderRadius: '7px', width: '250px', height: '40px' }}>
        Get My Location
      </button>
  <p style={{ fontWeight: 'bold', color: '#fff',fontSize: '15px'}}>When are you available?</p>
  
  <DatePicker 
        selected={selectedDate}
        onChange={date => setSelectedDate(date)}
        showTimeSelect
        dateFormat="MMMM d, yyyy h:mm aa"
        placeholderText="Select Date and Time" 
        className="custom-datepicker"
      />
          <button className="small-button" onClick={ handleNextButtonClick} style={{ fontWeight: 'bold', color: '#fff', marginTop: '15px', backgroundColor: '#40E0D0', border: '3px solid #40E0D0', borderRadius: '7px',width: '80px',height: '40px' ,marginLeft: '150px'}}>
                Next
              </button>
              </div>
          </div>
          </div>
        )}










      {/* Popup for painting and decoration Services */}
{showpopupPaintingAndDecoration && (
          <div className="popup-container">
            <div className="popup-content">
               {/* Close button */}
      <button className="close-button" onClick={()=>setShowPopupPaintingAndDecoration(false)} style={{fontWeight: 'bold',color: 'black' }}>X</button>
      {/* Three containers */}
      <div className="infoContainer">
        <p style={{ fontWeight: 'bold', color: '#fff',fontSize: '15px'}}>What do you need help with?</p>
   <select
                value={selectedService}
                onChange={(e) => setSelectedService(e.target.value)}
                style={{ borderRadius: '5px', width: '250px', height: '40px' }}
              >
                <option value="">Select Service</option>
  <option value="interior-painting">Interior Painting</option>
<option value="exterior-painting">Exterior Painting</option>
<option value="wallpaper-installation-removal">Wallpaper Installation and Removal</option>
<option value="surface-preparation">Surface Preparation</option>
<option value="colour-consultation">Colour Consultation</option>
<option value="cabinet-painting-refinishing">Cabinet Painting and Refinishing</option>
<option value="trim-moulding-painting">Trim and Moulding Painting</option>
<option value="textured-painting">Textured Painting</option>
<option value="faux-finishes">Faux Finishes</option>
<option value="staining-varnishing">Staining and Varnishing</option>
<option value="decorative-painting">Decorative Painting</option>
<option value="plaster-repair">Plaster Repair</option>
<option value="pressure-washing">Pressure Washing</option>
<option value="epoxy-flooring">Epoxy Flooring</option>
<option value="texture-removal">Texture Removal</option>
<option value="drywall-repair-patching">Drywall Repair and Patching</option>
<option value="caulking-sealing">Caulking and Sealing</option>
<option value="exterior-stucco-painting">Exterior Stucco Painting</option>
<option value="deck-fence-staining-painting">Deck and Fence Staining/Painting</option>
<option value="power-sanding-stripping">Power Sanding and Stripping</option>
<option value="colour-matching">Colour Matching</option>
<option value="interior-design-collaboration">Interior Design Collaboration</option>
</select>

              {/* Yes or No question */}
 <p style={{ fontWeight: 'bold', color: '#fff', fontSize: '15px' }}>Are there any faults?</p>
            <select
              value={hasSubFaults}
              onChange={(e) => setHasSubFaults(e.target.value)}
              style={{ borderRadius: '5px', width: '250px', height: '40px' }}
            >
              <option value="no">No</option>
              <option value="yes">Yes</option>
            </select>
            {/* Input for sub faults if "Yes" */}
            {hasSubFaults === 'yes' && (
              <div>
                <p style={{ fontWeight: 'bold', color: '#fff', fontSize: '15px' }}>Select  Fault:</p>
                <select
                  value={selectedMainFault}
                  onChange={(e) => setSelectedMainFault(e.target.value)}
                  style={{ borderRadius: '5px', width: '250px', height: '40px' }}
                >
                  <option value="">Select Main Fault</option>
                  <option value="1.1">Compressor Replacement</option>
                  <option value="1.2">Thermostat Repair</option>
                  <option value="1.3">Refrigerant Recharge</option>
                  <option value="1.4">Door Seal Replacement</option>
                  <option value="1.5">Defrost System Repair</option>
                </select>
                {/* Render subfaults dropdown based on selected main fault */}
                {selectedMainFault && (
                  <div>
                    <p style={{ fontWeight: 'bold', color: '#fff', fontSize: '15px' }}>Sub Faults:</p>
                    <select
                      value={selectedSubFault}
                      onChange={(e) => setSelectedSubFault(e.target.value)}
                      style={{ borderRadius: '5px', width: '250px', height: '40px' }}
                    >
                      <option value="">Select Sub Fault</option>
                      {subFaults[selectedMainFault].map(subFault => (
                        <option key={subFault.id} value={subFault.id}>{subFault.name}</option>
                      ))}
                    </select>
                  </div>
                )}
                  </div>
            )}
  <p style={{ fontWeight: 'bold', color: '#fff', fontSize: '15px'}}>Description:</p>
  <textarea
  value={description}
  onChange={(e) => setDescription(e.target.value)}
  placeholder="Describe the issue or any additional details"
  style={{ width: '250px', minHeight: '50px' }} // Adjust width and height as needed
></textarea>
  
 <p style={{ fontWeight: 'bold', color: '#fff', fontSize: '15px' }}>Where are you based?</p>

      <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} style={{ borderRadius: '5px', width: '250px', height: '40px' }} placeholder="Enter Your Location" />
      <button onClick={getLocation} style={{ fontWeight: 'bold', color: '#fff', marginTop: '10px', backgroundColor: '#40E0D0', border: '3px solid #40E0D0', borderRadius: '7px', width: '250px', height: '40px' }}>
        Get My Location
      </button>
  <p style={{ fontWeight: 'bold', color: '#fff',fontSize: '15px'}}>When are you available?</p>
  
  <DatePicker 
        selected={selectedDate}
        onChange={date => setSelectedDate(date)}
        showTimeSelect
        dateFormat="MMMM d, yyyy h:mm aa"
        placeholderText="Select Date and Time" 
        className="custom-datepicker"
      />
          <button className="small-button" onClick={ handleNextButtonClick} style={{ fontWeight: 'bold', color: '#fff', marginTop: '15px', backgroundColor: '#40E0D0', border: '3px solid #40E0D0', borderRadius: '7px',width: '80px',height: '40px' ,marginLeft: '150px'}}>
                Next
              </button>
               </div>
          </div>
          </div>
        )}





      {/* Popup for Capentry Services */}
      {showPopupCapentry && (
          <div className="popup-container">
            <div className="popup-content">
             {/* Close button */}
      <button className="close-button" onClick={()=>setShowPopupCapentry(false)} style={{fontWeight: 'bold',color: 'black' }}>X</button>
      {/* Three containers */}
      <div className="infoContainer">
        <p style={{ fontWeight: 'bold', color: '#fff',fontSize: '15px'}}>What do you need help with?</p>
    <select
                value={selectedService}
                onChange={(e) => setSelectedService(e.target.value)}
                style={{ borderRadius: '5px', width: '250px', height: '40px' }}
              >
               <option value="">Select Service</option>
  <option value="custom-furniture-building">Custom Furniture Building</option>
  <option value="cabinet-installation">Cabinet Installation</option>
  <option value="trim-molding-installation">Trim and Molding Installation</option>
  <option value="door-installation-repair">Door Installation and Repair</option>
  <option value="window-installation-repair">Window Installation and Repair</option>
  <option value="staircase-design-installation">Staircase Design and Installation</option>
  <option value="deck-patio-construction">Deck and Patio Construction</option>
  <option value="framing-structural-carpentry">Framing and Structural Carpentry</option>
  <option value="wood-flooring-installation">Wood Flooring Installation</option>
  <option value="carpentry-repairs">Carpentry Repairs</option>
  <option value="shelving-storage-solutions">Shelving and Storage Solutions</option>
  <option value="carpentry-restorations">Carpentry Restorations</option>
  <option value="outdoor-structures">Outdoor Structures</option>
  <option value="fencing-gate-installation">Fencing and Gate Installation</option>
  <option value="wooden-siding-installation">Wooden Siding Installation</option>
  <option value="custom-carpentry-projects">Custom Carpentry Projects</option>
  <option value="finishing-refinishing">Finishing and Refinishing</option>
  <option value="bespoke-carpentry">Bespoke Carpentry</option>
  <option value="carpentry-consultation">Carpentry Consultation</option>
  <option value="collaboration-architects-designers">Collaboration with Architects and Designers</option>
</select>


              {/* Yes or No question */}
 <p style={{ fontWeight: 'bold', color: '#fff', fontSize: '15px' }}>Are there any faults?</p>
            <select
              value={hasSubFaults}
              onChange={(e) => setHasSubFaults(e.target.value)}
              style={{ borderRadius: '5px', width: '250px', height: '40px' }}
            >
              <option value="no">No</option>
              <option value="yes">Yes</option>
            </select>
            {/* Input for sub faults if "Yes" */}
            {hasSubFaults === 'yes' && (
              <div>
                <p style={{ fontWeight: 'bold', color: '#fff', fontSize: '15px' }}>Select  Fault:</p>
                <select
                  value={selectedMainFault}
                  onChange={(e) => setSelectedMainFault(e.target.value)}
                  style={{ borderRadius: '5px', width: '250px', height: '40px' }}
                >
                  <option value="">Select Main Fault</option>
                  <option value="1.1">Compressor Replacement</option>
                  <option value="1.2">Thermostat Repair</option>
                  <option value="1.3">Refrigerant Recharge</option>
                  <option value="1.4">Door Seal Replacement</option>
                  <option value="1.5">Defrost System Repair</option>
                </select>
                {/* Render subfaults dropdown based on selected main fault */}
                {selectedMainFault && (
                  <div>
                    <p style={{ fontWeight: 'bold', color: '#fff', fontSize: '15px' }}>Sub Faults:</p>
                    <select
                      value={selectedSubFault}
                      onChange={(e) => setSelectedSubFault(e.target.value)}
                      style={{ borderRadius: '5px', width: '250px', height: '40px' }}
                    >
                      <option value="">Select Sub Fault</option>
                      {subFaults[selectedMainFault].map(subFault => (
                        <option key={subFault.id} value={subFault.id}>{subFault.name}</option>
                      ))}
                    </select>
                  </div>
                )}
                  </div>
            )}
  <p style={{ fontWeight: 'bold', color: '#fff', fontSize: '15px'}}>Description:</p>
  <textarea
  value={description}
  onChange={(e) => setDescription(e.target.value)}
  placeholder="Describe the issue or any additional details"
  style={{ width: '250px', minHeight: '50px' }} // Adjust width and height as needed
></textarea>
  
 <p style={{ fontWeight: 'bold', color: '#fff', fontSize: '15px' }}>Where are you based?</p>

      <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} style={{ borderRadius: '5px', width: '250px', height: '40px' }} placeholder="Enter Your Location" />
      <button onClick={getLocation} style={{ fontWeight: 'bold', color: '#fff', marginTop: '10px', backgroundColor: '#40E0D0', border: '3px solid #40E0D0', borderRadius: '7px', width: '250px', height: '40px' }}>
        Get My Location
      </button>
  <p style={{ fontWeight: 'bold', color: '#fff',fontSize: '15px'}}>When are you available?</p>
  
  <DatePicker 
        selected={selectedDate}
        onChange={date => setSelectedDate(date)}
        showTimeSelect
        dateFormat="MMMM d, yyyy h:mm aa"
        placeholderText="Select Date and Time" 
        className="custom-datepicker"
      />
          <button className="small-button" onClick={ handleNextButtonClick} style={{ fontWeight: 'bold', color: '#fff', marginTop: '15px', backgroundColor: '#40E0D0', border: '3px solid #40E0D0', borderRadius: '7px',width: '80px',height: '40px' ,marginLeft: '150px'}}>
                Next
              </button>
               </div>
          </div>
          </div>
        )}






{/* Popup for HAVC Services */}
{showPopupHAVC && (
          <div className="popup-container">
            <div className="popup-content">
               {/* Close button */}
      <button className="close-button" onClick={()=>setShowPopupHAVC(false)} style={{fontWeight: 'bold',color: 'black' }}>X</button>
      {/* Three containers */}
      <div className="infoContainer">
        <p style={{ fontWeight: 'bold', color: '#fff',fontSize: '15px'}}>What do you need help with?</p>
    <select
                value={selectedService}
                onChange={(e) => setSelectedService(e.target.value)}
                style={{ borderRadius: '5px', width: '250px', height: '40px' }}
              >
                <option value="">Select Service</option>
 <option value="heating-system-installation-repair">Heating System Installation and Repair</option>
<option value="air-conditioning-installation-repair">Air Conditioning Installation and Repair</option>
<option value="ventilation-system-installation-maintenance">Ventilation System Installation and Maintenance</option>
<option value="indoor-air-quality-services">Indoor Air Quality Services</option>
<option value="hvac-system-inspections-maintenance">HVAC System Inspections and Maintenance</option>
<option value="duct-cleaning-sealing">Duct Cleaning and Sealing</option>
<option value="thermostat-installation-calibration">Thermostat Installation and Calibration</option>
<option value="heat-pump-services">Heat Pump Services</option>
<option value="boiler-services">Boiler Services</option>
<option value="furnace-services">Furnace Services</option>
<option value="emergency-hvac-services">Emergency HVAC Services</option>
<option value="ductwork-design-installation">Ductwork Design and Installation</option>
<option value="energy-efficiency-audits">Energy Efficiency Audits</option>
<option value="zoning-system-installation">Zoning System Installation</option>
<option value="geothermal-heating-cooling">Geothermal Heating and Cooling</option>
<option value="hvac-retrofitting">HVAC Retrofitting</option>
<option value="refrigerant-services">Refrigerant Services</option>
<option value="commercial-hvac-services">Commercial HVAC Services</option>
<option value="hvac-system-design-installation">HVAC System Design and Installation</option>
<option value="hvac-consulting-advice">HVAC Consulting and Advice</option>
</select>

              {/* Yes or No question */}
 <p style={{ fontWeight: 'bold', color: '#fff', fontSize: '15px' }}>Are there any faults?</p>
            <select
              value={hasSubFaults}
              onChange={(e) => setHasSubFaults(e.target.value)}
              style={{ borderRadius: '5px', width: '250px', height: '40px' }}
            >
              <option value="no">No</option>
              <option value="yes">Yes</option>
            </select>
            {/* Input for sub faults if "Yes" */}
            {hasSubFaults === 'yes' && (
              <div>
                <p style={{ fontWeight: 'bold', color: '#fff', fontSize: '15px' }}>Select  Fault:</p>
                <select
                  value={selectedMainFault}
                  onChange={(e) => setSelectedMainFault(e.target.value)}
                  style={{ borderRadius: '5px', width: '250px', height: '40px' }}
                >
                  <option value="">Select Main Fault</option>
                  <option value="1.1">Compressor Replacement</option>
                  <option value="1.2">Thermostat Repair</option>
                  <option value="1.3">Refrigerant Recharge</option>
                  <option value="1.4">Door Seal Replacement</option>
                  <option value="1.5">Defrost System Repair</option>
                </select>
                {/* Render subfaults dropdown based on selected main fault */}
                {selectedMainFault && (
                  <div>
                    <p style={{ fontWeight: 'bold', color: '#fff', fontSize: '15px' }}>Sub Faults:</p>
                    <select
                      value={selectedSubFault}
                      onChange={(e) => setSelectedSubFault(e.target.value)}
                      style={{ borderRadius: '5px', width: '250px', height: '40px' }}
                    >
                      <option value="">Select Sub Fault</option>
                      {subFaults[selectedMainFault].map(subFault => (
                        <option key={subFault.id} value={subFault.id}>{subFault.name}</option>
                      ))}
                    </select>
                  </div>
                )}
                  </div>
            )}
  <p style={{ fontWeight: 'bold', color: '#fff', fontSize: '15px'}}>Description:</p>
  <textarea
  value={description}
  onChange={(e) => setDescription(e.target.value)}
  placeholder="Describe the issue or any additional details"
  style={{ width: '250px', minHeight: '50px' }} // Adjust width and height as needed
></textarea>
  
 <p style={{ fontWeight: 'bold', color: '#fff', fontSize: '15px' }}>Where are you based?</p>

      <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} style={{ borderRadius: '5px', width: '250px', height: '40px' }} placeholder="Enter Your Location" />
      <button onClick={getLocation} style={{ fontWeight: 'bold', color: '#fff', marginTop: '10px', backgroundColor: '#40E0D0', border: '3px solid #40E0D0', borderRadius: '7px', width: '250px', height: '40px' }}>
        Get My Location
      </button>
  <p style={{ fontWeight: 'bold', color: '#fff',fontSize: '15px'}}>When are you available?</p>
  
  <DatePicker 
        selected={selectedDate}
        onChange={date => setSelectedDate(date)}
        showTimeSelect
        dateFormat="MMMM d, yyyy h:mm aa"
        placeholderText="Select Date and Time" 
        className="custom-datepicker"
      />
          <button className="small-button" onClick={ handleNextButtonClick} style={{ fontWeight: 'bold', color: '#fff', marginTop: '15px', backgroundColor: '#40E0D0', border: '3px solid #40E0D0', borderRadius: '7px',width: '80px',height: '40px' ,marginLeft: '150px'}}>
                Next
              </button>
               </div>
          </div>
          </div>
        )}





{/* Popup for Gardening And Landscaping Services */}
{showPopupGardeningAndLandscaping && (
          <div className="popup-container">
            <div className="popup-content">
              {/* Close button */}
      <button className="close-button" onClick={()=>setShowPopupGardeningAndLandscaping(false)} style={{fontWeight: 'bold',color: 'black' }}>X</button>
      {/* Three containers */}
      <div className="infoContainer">
        <p style={{ fontWeight: 'bold', color: '#fff',fontSize: '15px'}}>What do you need help with?</p>
   <select
                value={selectedService}
                onChange={(e) => setSelectedService(e.target.value)}
                style={{ borderRadius: '5px', width: '250px', height: '40px' }}
              >
                <option value="">Select Service</option>
  <option value="landscape-design">Landscape Design</option>
<option value="planting-garden-bed-installation">Planting and Garden Bed Installation</option>
<option value="lawn-care-maintenance">Lawn Care and Maintenance</option>
<option value="hardscape-installation">Hardscape Installation</option>
<option value="irrigation-system-installation-maintenance">Irrigation System Installation and Maintenance</option>
<option value="mulching-ground-cover-installation">Mulching and Ground Cover Installation</option>
<option value="pruning-trimming">Pruning and Trimming</option>
<option value="seasonal-planting-maintenance">Seasonal Planting and Maintenance</option>
<option value="landscape-lighting-installation">Landscape Lighting Installation</option>
<option value="water-features-installation">Water Features Installation</option>
<option value="garden-renovation-restoration">Garden Renovation and Restoration</option>
<option value="sod-installation">Sod Installation</option>
<option value="vegetable-herb-garden-setup">Vegetable and Herb Garden Setup</option>
<option value="xeriscaping-drought-tolerant-landscaping">Xeriscaping and Drought-Tolerant Landscaping</option>
<option value="soil-testing-conditioning">Soil Testing and Conditioning</option>
<option value="garden-pest-disease-management">Garden Pest and Disease Management</option>
<option value="container-gardening">Container Gardening</option>
<option value="edible-landscaping">Edible Landscaping</option>
<option value="landscape-consultation">Landscape Consultation</option>
<option value="commercial-landscaping-services">Commercial Landscaping Services</option>
</select>

              {/* Yes or No question */}
 <p style={{ fontWeight: 'bold', color: '#fff', fontSize: '15px' }}>Are there any faults?</p>
            <select
              value={hasSubFaults}
              onChange={(e) => setHasSubFaults(e.target.value)}
              style={{ borderRadius: '5px', width: '250px', height: '40px' }}
            >
              <option value="no">No</option>
              <option value="yes">Yes</option>
            </select>
            {/* Input for sub faults if "Yes" */}
            {hasSubFaults === 'yes' && (
              <div>
                <p style={{ fontWeight: 'bold', color: '#fff', fontSize: '15px' }}>Select  Fault:</p>
                <select
                  value={selectedMainFault}
                  onChange={(e) => setSelectedMainFault(e.target.value)}
                  style={{ borderRadius: '5px', width: '250px', height: '40px' }}
                >
                  <option value="">Select Main Fault</option>
                  <option value="1.1">Compressor Replacement</option>
                  <option value="1.2">Thermostat Repair</option>
                  <option value="1.3">Refrigerant Recharge</option>
                  <option value="1.4">Door Seal Replacement</option>
                  <option value="1.5">Defrost System Repair</option>
                </select>
                {/* Render subfaults dropdown based on selected main fault */}
                {selectedMainFault && (
                  <div>
                    <p style={{ fontWeight: 'bold', color: '#fff', fontSize: '15px' }}>Sub Faults:</p>
                    <select
                      value={selectedSubFault}
                      onChange={(e) => setSelectedSubFault(e.target.value)}
                      style={{ borderRadius: '5px', width: '250px', height: '40px' }}
                    >
                      <option value="">Select Sub Fault</option>
                      {subFaults[selectedMainFault].map(subFault => (
                        <option key={subFault.id} value={subFault.id}>{subFault.name}</option>
                      ))}
                    </select>
                  </div>
                )}
                  </div>
            )}
  <p style={{ fontWeight: 'bold', color: '#fff', fontSize: '15px'}}>Description:</p>
  <textarea
  value={description}
  onChange={(e) => setDescription(e.target.value)}
  placeholder="Describe the issue or any additional details"
  style={{ width: '250px', minHeight: '50px' }} // Adjust width and height as needed
></textarea>
  
 <p style={{ fontWeight: 'bold', color: '#fff', fontSize: '15px' }}>Where are you based?</p>

      <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} style={{ borderRadius: '5px', width: '250px', height: '40px' }} placeholder="Enter Your Location" />
      <button onClick={getLocation} style={{ fontWeight: 'bold', color: '#fff', marginTop: '10px', backgroundColor: '#40E0D0', border: '3px solid #40E0D0', borderRadius: '7px', width: '250px', height: '40px' }}>
        Get My Location
      </button>
  <p style={{ fontWeight: 'bold', color: '#fff',fontSize: '15px'}}>When are you available?</p>
  
  <DatePicker 
        selected={selectedDate}
        onChange={date => setSelectedDate(date)}
        showTimeSelect
        dateFormat="MMMM d, yyyy h:mm aa"
        placeholderText="Select Date and Time" 
        className="custom-datepicker"
      />
          <button className="small-button" onClick={ handleNextButtonClick} style={{ fontWeight: 'bold', color: '#fff', marginTop: '15px', backgroundColor: '#40E0D0', border: '3px solid #40E0D0', borderRadius: '7px',width: '80px',height: '40px' ,marginLeft: '150px'}}>
                Next
              </button>
               </div>
          </div>
          </div>
        )}




{/* Popup for Home Security Services */}
{showPopupHomeSecurityServices && (
          <div className="popup-container">
            <div className="popup-content">
               {/* Close button */}
      <button className="close-button" onClick={()=>setShowPopupHomeSecurityServices(false)} style={{fontWeight: 'bold',color: 'black' }}>X</button>
      {/* Three containers */}
      <div className="infoContainer">
        <p style={{ fontWeight: 'bold', color: '#fff',fontSize: '15px'}}>What do you need help with?</p>
   <select
                value={selectedService}
                onChange={(e) => setSelectedService(e.target.value)}
                style={{ borderRadius: '5px', width: '250px', height: '40px' }}
              >
                 <option value="">Select Service</option>
  <option value="security-system-installation">Security System Installation</option>
<option value="video-surveillance-system-installation">Video Surveillance System Installation</option>
<option value="smart-home-security-integration">Smart Home Security Integration</option>
<option value="burglar-alarm-monitoring">Burglar Alarm Monitoring</option>
<option value="access-control-system-installation">Access Control System Installation</option>
<option value="home-automation-security">Home Automation Security</option>
<option value="emergency-response-services">Emergency Response Services</option>
<option value="fire-smoke-detection">Fire and Smoke Detection</option>
<option value="carbon-monoxide-detection">Carbon Monoxide Detection</option>
<option value="home-security-system-upgrades">Home Security System Upgrades</option>
<option value="security-system-maintenance">Security System Maintenance</option>
<option value="security-consultation-assessment">Security Consultation and Assessment</option>
<option value="alarm-system-repair">Alarm System Repair</option>
<option value="security-system-monitoring-services">Security System Monitoring Services</option>
<option value="remote-surveillance-services">Remote Surveillance Services</option>
<option value="security-system-integration-emergency-services">Security System Integration with Emergency Services</option>
<option value="security-system-customization">Security System Customization</option>
<option value="security-system-app-training">Security System App Training</option>
<option value="flood-water-leak-detection">Flood and Water Leak Detection</option>
<option value="security-system-education">Security System Education</option>
</select>



              {/* Yes or No question */}
 <p style={{ fontWeight: 'bold', color: '#fff', fontSize: '15px' }}>Are there any faults?</p>
            <select
              value={hasSubFaults}
              onChange={(e) => setHasSubFaults(e.target.value)}
              style={{ borderRadius: '5px', width: '250px', height: '40px' }}
            >
              <option value="no">No</option>
              <option value="yes">Yes</option>
            </select>
            {/* Input for sub faults if "Yes" */}
            {hasSubFaults === 'yes' && (
              <div>
                <p style={{ fontWeight: 'bold', color: '#fff', fontSize: '15px' }}>Select  Fault:</p>
                <select
                  value={selectedMainFault}
                  onChange={(e) => setSelectedMainFault(e.target.value)}
                  style={{ borderRadius: '5px', width: '250px', height: '40px' }}
                >
                  <option value="">Select Main Fault</option>
                  <option value="1.1">Compressor Replacement</option>
                  <option value="1.2">Thermostat Repair</option>
                  <option value="1.3">Refrigerant Recharge</option>
                  <option value="1.4">Door Seal Replacement</option>
                  <option value="1.5">Defrost System Repair</option>
                </select>
                {/* Render subfaults dropdown based on selected main fault */}
                {selectedMainFault && (
                  <div>
                    <p style={{ fontWeight: 'bold', color: '#fff', fontSize: '15px' }}>Sub Faults:</p>
                    <select
                      value={selectedSubFault}
                      onChange={(e) => setSelectedSubFault(e.target.value)}
                      style={{ borderRadius: '5px', width: '250px', height: '40px' }}
                    >
                      <option value="">Select Sub Fault</option>
                      {subFaults[selectedMainFault].map(subFault => (
                        <option key={subFault.id} value={subFault.id}>{subFault.name}</option>
                      ))}
                    </select>
                  </div>
                )}
                  </div>
            )}
  <p style={{ fontWeight: 'bold', color: '#fff', fontSize: '15px'}}>Description:</p>
  <textarea
  value={description}
  onChange={(e) => setDescription(e.target.value)}
  placeholder="Describe the issue or any additional details"
  style={{ width: '250px', minHeight: '50px' }} // Adjust width and height as needed
></textarea>
  
 <p style={{ fontWeight: 'bold', color: '#fff', fontSize: '15px' }}>Where are you based?</p>

      <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} style={{ borderRadius: '5px', width: '250px', height: '40px' }} placeholder="Enter Your Location" />
      <button onClick={getLocation} style={{ fontWeight: 'bold', color: '#fff', marginTop: '10px', backgroundColor: '#40E0D0', border: '3px solid #40E0D0', borderRadius: '7px', width: '250px', height: '40px' }}>
        Get My Location
      </button>
  <p style={{ fontWeight: 'bold', color: '#fff',fontSize: '15px'}}>When are you available?</p>
  
  <DatePicker 
        selected={selectedDate}
        onChange={date => setSelectedDate(date)}
        showTimeSelect
        dateFormat="MMMM d, yyyy h:mm aa"
        placeholderText="Select Date and Time" 
        className="custom-datepicker"
      />
          <button className="small-button" onClick={ handleNextButtonClick} style={{ fontWeight: 'bold', color: '#fff', marginTop: '15px', backgroundColor: '#40E0D0', border: '3px solid #40E0D0', borderRadius: '7px',width: '80px',height: '40px' ,marginLeft: '150px'}}>
                Next
              </button>
               </div>
          </div>
          </div>
        )}















{/* Popup for Handyman Services  */}
{showPopupHandymanServices && (
          <div className="popup-container">
            <div className="popup-content">
               {/* Close button */}
      <button className="close-button" onClick={()=>setShowPopupHandymanServices(false)} style={{fontWeight: 'bold',color: 'black' }}>X</button>
      {/* Three containers */}
      <div className="infoContainer">
        <p style={{ fontWeight: 'bold', color: '#fff',fontSize: '15px'}}>What do you need help with?</p>
   <select
                value={selectedService}
                onChange={(e) => setSelectedService(e.target.value)}
                style={{ borderRadius: '5px', width: '250px', height: '40px' }}
              >
                <option value="">Select Service</option>
  <option value="general-repairs">General Repairs</option>
<option value="carpentry-repairs">Carpentry Repairs</option>
<option value="plumbing-repairs">Plumbing Repairs</option>
<option value="electrical-repairs">Electrical Repairs</option>
<option value="painting-touch-ups">Painting and Touch-Ups</option>
<option value="drywall-repairs">Drywall Repairs</option>
<option value="door-window-repairs">Door and Window Repairs</option>
<option value="tile-grout-repairs">Tile and Grout Repairs</option>
<option value="furniture-assembly">Furniture Assembly</option>
<option value="gutter-cleaning-maintenance">Gutter Cleaning and Maintenance</option>
<option value="pressure-washing">Pressure Washing</option>
<option value="weatherstripping-sealing">Weatherstripping and Sealing</option>
<option value="small-appliance-repairs">Small Appliance Repairs</option>
<option value="minor-hvac-maintenance">Minor HVAC Maintenance</option>
<option value="shelving-storage-solutions">Shelving and Storage Solutions</option>
<option value="fence-gate-repairs">Fence and Gate Repairs</option>
<option value="deck-patio-repairs">Deck and Patio Repairs</option>
<option value="basic-landscaping">Basic Landscaping</option>
<option value="pet-door-installation">Pet Door Installation</option>
<option value="home-safety-enhancements">Home Safety Enhancements</option>
</select>

              {/* Yes or No question */}
 <p style={{ fontWeight: 'bold', color: '#fff', fontSize: '15px' }}>Are there any faults?</p>
            <select
              value={hasSubFaults}
              onChange={(e) => setHasSubFaults(e.target.value)}
              style={{ borderRadius: '5px', width: '250px', height: '40px' }}
            >
              <option value="no">No</option>
              <option value="yes">Yes</option>
            </select>
            {/* Input for sub faults if "Yes" */}
            {hasSubFaults === 'yes' && (
              <div>
                <p style={{ fontWeight: 'bold', color: '#fff', fontSize: '15px' }}>Select  Fault:</p>
                <select
                  value={selectedMainFault}
                  onChange={(e) => setSelectedMainFault(e.target.value)}
                  style={{ borderRadius: '5px', width: '250px', height: '40px' }}
                >
                 <option value="">Select Main Fault</option>
  <option value="9.1">General Repairs</option>
  <option value="9.2">Carpentry Repairs</option>
  <option value="9.3">Plumbing Repairs</option>
  <option value="9.4">Electrical Repairs</option>
  <option value="9.5">Painting and Touch-Ups</option>
  <option value="9.6">Drywall Repairs</option>
  <option value="9.7">Door and Window Repairs</option>
  <option value="9.8">Tile and Grout Repairs</option>
  <option value="9.9">Furniture Assembly</option>
  <option value="9.10">Gutter Cleaning and Maintenance</option>
  <option value="9.11">Pressure Washing</option>
  <option value="9.12">Weatherstripping and Sealing</option>
  <option value="9.13">Small Appliance Repairs</option>
  <option value="9.14">Minor HVAC Maintenance</option>
  <option value="9.15">Shelving and Storage Solutions</option>
  <option value="9.16">Fence and Gate Repairs</option>
  <option value="9.17">Deck and Patio Repairs</option>
  <option value="9.18">Basic Landscaping</option>
  <option value="9.19">Pet Door Installation</option>
  <option value="9.20">Home Safety Enhancements</option>
</select>
                {/* Render subfaults dropdown based on selected main fault */}
                {selectedMainFault && (
                  <div>
                    <p style={{ fontWeight: 'bold', color: '#fff', fontSize: '15px' }}>Sub Faults:</p>
                    <select
                      value={selectedSubFault}
                      onChange={(e) => setSelectedSubFault(e.target.value)}
                      style={{ borderRadius: '5px', width: '250px', height: '40px' }}
                    >
                      <option value="">Select Sub Fault</option>
                      {subFaultsHandymanServices[selectedMainFault].map(subFault => (
                        <option key={subFault.id} value={subFault.id}>{subFault.name}</option>
                      ))}
                    </select>
                  </div>
                )}
                  </div>
            )}
  <p style={{ fontWeight: 'bold', color: '#fff', fontSize: '15px'}}>Description:</p>
  <textarea
  value={description}
  onChange={(e) => setDescription(e.target.value)}
  placeholder="Describe the issue or any additional details"
  style={{ width: '250px', minHeight: '50px' }} // Adjust width and height as needed
></textarea>
  
 <p style={{ fontWeight: 'bold', color: '#fff', fontSize: '15px' }}>Where are you based?</p>

      <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} style={{ borderRadius: '5px', width: '250px', height: '40px' }} placeholder="Enter Your Location" />
      <button onClick={getLocation} style={{ fontWeight: 'bold', color: '#fff', marginTop: '10px', backgroundColor: '#40E0D0', border: '3px solid #40E0D0', borderRadius: '7px', width: '250px', height: '40px' }}>
        Get My Location
      </button>
  <p style={{ fontWeight: 'bold', color: '#fff',fontSize: '15px'}}>When are you available?</p>
  
  <DatePicker 
        selected={selectedDate}
        onChange={date => setSelectedDate(date)}
        showTimeSelect
        dateFormat="MMMM d, yyyy h:mm aa"
        placeholderText="Select Date and Time" 
        className="custom-datepicker"
      />
          <button className="small-button" onClick={ handleNextButtonClick} style={{ fontWeight: 'bold', color: '#fff', marginTop: '15px', backgroundColor: '#40E0D0', border: '3px solid #40E0D0', borderRadius: '7px',width: '80px',height: '40px' ,marginLeft: '150px'}}>
                Next
              </button>
               </div>
          </div>
          </div>
        )}


{/* Popup for Roofing services */}
{showPopupRoofingServices && (
          <div className="popup-container">
            <div className="popup-content">
               {/* Close button */}
      <button className="close-button" onClick={()=>setShowPopupRoofingServices(false)} style={{fontWeight: 'bold',color: 'black' }}>X</button>
      {/* Three containers */}
      <div className="infoContainer">
        <p style={{ fontWeight: 'bold', color: '#fff',fontSize: '15px'}}>What do you need help with?</p>
   <select
                value={selectedService}
                onChange={(e) => setSelectedService(e.target.value)}
                style={{ borderRadius: '5px', width: '250px', height: '40px' }}
              >
                <option value="">Select Service</option>
  <option value="roof-inspection">Roof Inspection</option>
<option value="roof-repair">Roof Repair</option>
<option value="roof-replacement">Roof Replacement</option>
<option value="new-roof-installation">New Roof Installation</option>
<option value="shingle-replacement">Shingle Replacement</option>
<option value="flat-roofing-services">Flat Roofing Services</option>
<option value="metal-roofing-services">Metal Roofing Services</option>
<option value="tile-roofing-services">Tile Roofing Services</option>
<option value="slate-roofing-services">Slate Roofing Services</option>
<option value="roof-maintenance-services">Roof Maintenance Services</option>
<option value="emergency-roofing-services">Emergency Roofing Services</option>
<option value="gutter-installation-repair">Gutter Installation and Repair</option>
<option value="roof-ventilation-installation">Roof Ventilation Installation</option>
<option value="skylight-installation-repair">Skylight Installation and Repair</option>
<option value="roof-coating-application">Roof Coating Application</option>
<option value="flashing-installation-repair">Flashing Installation and Repair</option>
<option value="roof-insulation-installation">Roof Insulation Installation</option>
<option value="roof-waterproofing">Roof Waterproofing</option>
<option value="roof-consulting-advice">Roof Consulting and Advice</option>
<option value="green-roof-installation">Green Roof Installation</option>
<option value="roofing-design-planning">Roofing Design and Planning</option>
</select>

              {/* Yes or No question */}
 <p style={{ fontWeight: 'bold', color: '#fff', fontSize: '15px' }}>Are there any faults?</p>
            <select
              value={hasSubFaults}
              onChange={(e) => setHasSubFaults(e.target.value)}
              style={{ borderRadius: '5px', width: '250px', height: '40px' }}
            >
              <option value="no">No</option>
              <option value="yes">Yes</option>
            </select>
            {/* Input for sub faults if "Yes" */}
            {hasSubFaults === 'yes' && (
              <div>
                <p style={{ fontWeight: 'bold', color: '#fff', fontSize: '15px' }}>Select  Fault:</p>
                <select
                  value={selectedMainFault}
                  onChange={(e) => setSelectedMainFault(e.target.value)}
                  style={{ borderRadius: '5px', width: '250px', height: '40px' }}
                >
                   <option value="">Select Main Fault</option>
  <option value="10.1">Roof Inspection</option>
  <option value="10.2">Roof Repair</option>
  <option value="10.3">Roof Replacement</option>
  <option value="10.4">New Roof Installation</option>
  <option value="10.5">Shingle Replacement</option>
  <option value="10.6">Flat Roofing Services</option>
  <option value="10.7">Metal Roofing Services</option>
  <option value="10.8">Tile Roofing Services</option>
  <option value="10.9">Slate Roofing Services</option>
  <option value="10.10">Roof Maintenance Services</option>
  <option value="10.11">Emergency Roofing Services</option>
  <option value="10.12">Gutter Installation and Repair</option>
  <option value="10.13">Roof Ventilation Installation</option>
  <option value="10.14">Skylight Installation and Repair</option>
  <option value="10.15">Roof Coating Application</option>
  <option value="10.16">Flashing Installation and Repair</option>
  <option value="10.17">Roof Insulation Installation</option>
  <option value="10.18">Roof Waterproofing</option>
  <option value="10.19">Roof Consulting and Advice</option>
  <option value="10.20">Green Roof Installation</option>
  <option value="10.21">Roofing Design and Planning</option>
</select>
                {/* Render subfaults dropdown based on selected main fault */}
                {selectedMainFault && (
                  <div>
                    <p style={{ fontWeight: 'bold', color: '#fff', fontSize: '15px' }}>Sub Faults:</p>
                    <select
                      value={selectedSubFault}
                      onChange={(e) => setSelectedSubFault(e.target.value)}
                      style={{ borderRadius: '5px', width: '250px', height: '40px' }}
                    >
                      <option value="">Select Sub Fault</option>
                      {subFaultsRoofingServices[selectedMainFault].map(subFault => (
                        <option key={subFault.id} value={subFault.id}>{subFault.name}</option>
                      ))}
                    </select>
                  </div>
                )}
                  </div>
            )}
  <p style={{ fontWeight: 'bold', color: '#fff', fontSize: '15px'}}>Description:</p>
  <textarea
  value={description}
  onChange={(e) => setDescription(e.target.value)}
  placeholder="Describe the issue or any additional details"
  style={{ width: '250px', minHeight: '50px' }} // Adjust width and height as needed
></textarea>

  <div>
 <p style={{ fontWeight: 'bold', color: '#fff', fontSize: '15px' }}>Where are you based?</p>
      <input 
      type="text" 
      value={address}
       onChange={(e) => setAddress(e.target.value)} 
       style={{ borderRadius: '5px', width: '250px', height: '40px' }} 
       placeholder="Enter Your Location" 
       />
      <button
       onClick={getLocation} 
       style={{ fontWeight: 'bold', 
       color: '#fff', marginTop: '10px',
        backgroundColor: '#40E0D0', 
        border: '3px solid #40E0D0',
        borderRadius: '7px', width: '250px', 
        height: '40px' 
         }}
         >
         Get My Location
      </button>
      {location && (
        <p style={{ fontWeight: 'bold', color: '#fff', fontSize: '15px' }}>Coordinates: {location}</p>
      )}
      {address && (
        <p style={{ fontWeight: 'bold', color: '#fff', fontSize: '15px' }}>Your address is: {address}</p>
      )}
      <p style={{ fontWeight: 'bold', color: '#fff', fontSize: '15px' }}>When are you available?</p>
   </div>
  <DatePicker 
        selected={selectedDate}
        onChange={date => setSelectedDate(date)}
        showTimeSelect
        dateFormat="MMMM d, yyyy h:mm aa"
        placeholderText="Select Date and Time" 
        className="custom-datepicker"
      />
          <button className="small-button" onClick={ handleNextButtonClick} style={{ fontWeight: 'bold', color: '#fff', marginTop: '15px', backgroundColor: '#40E0D0', border: '3px solid #40E0D0', borderRadius: '7px',width: '80px',height: '40px' ,marginLeft: '150px'}}>
                Next
              </button>
               </div>
          </div>
          </div>
        )}


{/* Popup for Cleaning Services */}
{showPopupCleaningServices && (
          <div className="popup-container">
            <div className="popup-content">
              {/* Close button */}
      <button className="close-button" onClick={()=>setShowPopupCleaningServices(false)} style={{fontWeight: 'bold',color: 'black' }}>X</button>
      {/* Three containers */}
      <div className="infoContainer">
        <p style={{ fontWeight: 'bold', color: '#fff',fontSize: '15px'}}>What do you need help with?</p>
   <select
                value={selectedService}
                onChange={(e) => setSelectedService(e.target.value)}
                style={{ borderRadius: '5px', width: '250px', height: '40px' }}
              >
                <option value="">Select Service</option>
  <option value="regular-cleaning">Regular Cleaning</option>
<option value="one-time-cleaning">One-Time Cleaning</option>
<option value="deep-cleaning">Deep Cleaning</option>
<option value="move-in-move-out-cleaning">Move-In/Move-Out Cleaning</option>
<option value="post-construction-cleaning">Post-Construction Cleaning</option>
<option value="vacation-rental-cleaning">Vacation Rental Cleaning</option>
<option value="window-cleaning">Window Cleaning</option>
<option value="carpet-upholstery-cleaning">Carpet and Upholstery Cleaning</option>
<option value="floor-cleaning-polishing">Floor Cleaning and Polishing</option>
<option value="kitchen-cleaning">Kitchen Cleaning</option>
<option value="bathroom-cleaning">Bathroom Cleaning</option>
<option value="dusting-surface-wiping">Dusting and Surface Wiping</option>
<option value="appliance-cleaning">Appliance Cleaning</option>
<option value="garage-basement-cleaning">Garage and Basement Cleaning</option>
<option value="air-duct-cleaning">Air Duct Cleaning</option>
<option value="mattress-cleaning">Mattress Cleaning</option>
<option value="pet-hair-odor-removal">Pet Hair and Odor Removal</option>
<option value="green-cleaning-services">Green Cleaning Services</option>
<option value="special-event-cleaning">Special Event Cleaning</option>
<option value="hoarding-cleanup">Hoarding Cleanup</option>
</select>              {/* Yes or No question */}
 <p style={{ fontWeight: 'bold', color: '#fff', fontSize: '15px' }}>Are there any faults?</p>
            <select
              value={hasSubFaults}
              onChange={(e) => setHasSubFaults(e.target.value)}
              style={{ borderRadius: '5px', width: '250px', height: '40px' }}
            >
              <option value="no">No</option>
              <option value="yes">Yes</option>
            </select>
            {/* Input for sub faults if "Yes" */}
            {hasSubFaults === 'yes' && (
              <div>
                <p style={{ fontWeight: 'bold', color: '#fff', fontSize: '15px' }}>Select  Fault:</p>
                <select
                  value={selectedMainFault}
                  onChange={(e) => setSelectedMainFault(e.target.value)}
                  style={{ borderRadius: '5px', width: '250px', height: '40px' }}
                >
<option value="">Select Main Fault</option>
  <option value="11.1">Residential Cleaning</option>
  <option value="11.2">Commercial Cleaning</option>
  <option value="11.3">Deep Cleaning</option>
  <option value="11.4">Move-In/Move-Out Cleaning</option>
  <option value="11.5">Post-Construction Cleaning</option>
  <option value="11.6">Vacation Rental Cleaning</option>
  <option value="11.7">Window Cleaning</option>
  <option value="11.8">Carpet and Upholstery Cleaning</option>
  <option value="11.9">Floor Cleaning and Polishing</option>
  <option value="11.10">Kitchen Cleaning</option>
  <option value="11.11">Bathroom Cleaning</option>
  <option value="11.12">Dusting and Surface Wiping</option>
  <option value="11.13">Appliance Cleaning</option>
  <option value="11.14">Garage and Basement Cleaning</option>
  <option value="11.15">Air Duct Cleaning</option>
  <option value="11.16">Mattress Cleaning</option>
  <option value="11.17">Pet Hair and Odor Removal</option>
  <option value="11.18">Green Cleaning Services</option>
  <option value="11.19">Special Event Cleaning</option>
  <option value="11.20">Hoarding Cleanup</option>
</select>{/* Render subfaults dropdown based on selected main fault */}
                {selectedMainFault && (
                  <div>
                    <p style={{ fontWeight: 'bold', color: '#fff', fontSize: '15px' }}>Sub Faults:</p>
                    <select
                      value={selectedSubFault}
                      onChange={(e) => setSelectedSubFault(e.target.value)}
                      style={{ borderRadius: '5px', width: '250px', height: '40px' }}
                    >
                      <option value="">Select Sub Fault</option>
                      {subFaultsCleaningServices[selectedMainFault].map(subFault => (
                        <option key={subFault.id} value={subFault.id}>{subFault.name}</option>
                      ))}
                    </select>
                  </div>
                )}
                  </div>
            )}
  <p style={{ fontWeight: 'bold', color: '#fff', fontSize: '15px'}}>Description:</p>
  <textarea
  value={description}
  onChange={(e) => setDescription(e.target.value)}
  placeholder="Describe the issue or any additional details"
  style={{ width: '250px', minHeight: '50px' }} // Adjust width and height as needed
></textarea>
  
 <p style={{ fontWeight: 'bold', color: '#fff', fontSize: '15px' }}>Where are you based?</p>

      <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} style={{ borderRadius: '5px', width: '250px', height: '40px' }} placeholder="Enter Your Location" />
      <button onClick={getLocation} style={{ fontWeight: 'bold', color: '#fff', marginTop: '10px', backgroundColor: '#40E0D0', border: '3px solid #40E0D0', borderRadius: '7px', width: '250px', height: '40px' }}>
        Get My Location
      </button>
  <p style={{ fontWeight: 'bold', color: '#fff',fontSize: '15px'}}>When are you available?</p>
  
  <DatePicker 
        selected={selectedDate}
        onChange={date => setSelectedDate(date)}
        showTimeSelect
        dateFormat="MMMM d, yyyy h:mm aa"
        placeholderText="Select Date and Time" 
        className="custom-datepicker"
      />
          <button className="small-button" onClick={ handleNextButtonClick} style={{ fontWeight: 'bold', color: '#fff', marginTop: '15px', backgroundColor: '#40E0D0', border: '3px solid #40E0D0', borderRadius: '7px',width: '80px',height: '40px' ,marginLeft: '150px'}}>
                Next
              </button>
               </div>
          </div>
          </div>
        )}


{/* Popup for Locksmith Services  */}
{showPopupLocksmithServices && (
          <div className="popup-container">
            <div className="popup-content">
              {/* Close button */}
      <button className="close-button" onClick={()=>setShowPopupLocksmithServices(false)} style={{fontWeight: 'bold',color: 'black' }}>X</button>
      {/* Three containers */}
      <div className="infoContainer">
        <p style={{ fontWeight: 'bold', color: '#fff',fontSize: '15px'}}>What do you need help with?</p>
  <select
                value={selectedService}
                onChange={(e) => setSelectedService(e.target.value)}
                style={{ borderRadius: '5px', width: '250px', height: '40px' }}
              >
               <option value="">Select Service</option>
        <option value="lock-installation">Lock Installation</option>
<option value="lock-repair">Lock Repair</option>
<option value="lock-replacement">Lock Replacement</option>
<option value="key-cutting-duplication">Key Cutting and Duplication</option>
<option value="key-extraction">Key Extraction</option>
<option value="lock-rekeying">Lock Rekeying</option>
<option value="master-key-systems">Master Key Systems</option>
<option value="keyless-entry-system-installation">Keyless Entry System Installation</option>
<option value="emergency-lockout-services">Emergency Lockout Services</option>
<option value="security-consultation">Security Consultation</option>
<option value="burglary-break-in-repairs">Burglary and Break-In Repairs</option>
<option value="padlock-removal">Padlock Removal</option>
<option value="mailbox-lock-services">Mailbox Lock Services</option>
<option value="safe-services">Safe Services</option>
<option value="garage-door-lock-services">Garage Door Lock Services</option>
<option value="electronic-lock-services">Electronic Lock Services</option>
<option value="automotive-lock-services">Automotive Lock Services</option>
<option value="lock-hardware-upgrades">Lock Hardware Upgrades</option>
<option value="security-assessment-auditing">Security Assessment and Auditing</option>
<option value="lock-maintenance">Lock Maintenance</option>
</select>

              {/* Yes or No question */}
 <p style={{ fontWeight: 'bold', color: '#fff', fontSize: '15px' }}>Are there any faults?</p>
            <select
              value={hasSubFaults}
              onChange={(e) => setHasSubFaults(e.target.value)}
              style={{ borderRadius: '5px', width: '250px', height: '40px' }}
            >
              <option value="no">No</option>
              <option value="yes">Yes</option>
            </select>
            {/* Input for sub faults if "Yes" */}
            {hasSubFaults === 'yes' && (
              <div>
                <p style={{ fontWeight: 'bold', color: '#fff', fontSize: '15px' }}>Select  Fault:</p>
                <select
                  value={selectedMainFault}
                  onChange={(e) => setSelectedMainFault(e.target.value)}
                  style={{ borderRadius: '5px', width: '250px', height: '40px' }}
                >
                  <option value="">Select Main Fault</option>
<option value="12.1">Lock Installation</option>
<option value="12.2">Lock Repair</option>
<option value="12.3">Lock Replacement</option>
<option value="12.4">Key Cutting and Duplication</option>
<option value="12.5">Key Extraction</option>
<option value="12.6">Lock Rekeying</option>
<option value="12.7">Master Key System</option>
<option value="12.8">Keyless Entry System Installation</option>
<option value="12.9">Emergency Lock Service</option>
<option value="12.10">Security Consultation</option>
<option value="12.11">Burglary and Break-in Repairs</option>
<option value="12.12">Padlock Removal</option>
<option value="12.13">Mailbox Lock Services</option>
<option value="12.14">Safe Services</option>
<option value="12.15">Garage Door Lock Services</option>
<option value="12.16">Electronic Lock Services</option> 
<option value="12.17">Automotive Lock Services</option>
<option value="12.18">Lock Hardware Upgrades</option>
<option value="12.19">Security Assessment and Auditing</option>
<option value="12.20">Lock Maintenance</option>
</select>
                {/* Render subfaults dropdown based on selected main fault */}
                {selectedMainFault && (
                  <div>
                    <p style={{ fontWeight: 'bold', color: '#fff', fontSize: '15px' }}>Sub Faults:</p>
                    <select
                      value={selectedSubFault}
                      onChange={(e) => setSelectedSubFault(e.target.value)}
                      style={{ borderRadius: '5px', width: '250px', height: '40px' }}
                    >
                      <option value="">Select Sub Fault</option>
                      {subFaultsLocksmith[selectedMainFault].map(subFault => (
                        <option key={subFault.id} value={subFault.id}>{subFault.name}</option>
                      ))}
                    </select>
                  </div>
                )}
                  </div>
            )}
  <p style={{ fontWeight: 'bold', color: '#fff', fontSize: '15px'}}>Description:</p>
  <textarea
  value={description}
  onChange={(e) => setDescription(e.target.value)}
  placeholder="Describe the issue or any additional details"
  style={{ width: '250px', minHeight: '50px' }} // Adjust width and height as needed
></textarea>
  

<div>
<p style={{ fontWeight: 'bold', color: '#fff', fontSize: '15px' }}>Where are you based?</p>
      <input
        type="text"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        style={{ borderRadius: '5px', width: '250px', height: '40px' }}
        placeholder="Enter Your Location"
      />
      <button
      onClick={getLocation}
        style={{
          fontWeight: 'bold',
          color: '#fff',
          marginTop: '10px',
          backgroundColor: '#40E0D0',
          border: '3px solid #40E0D0',
          borderRadius: '7px',
          width: '250px',
          height: '40px'
        }}
      >
 Get My Location
      </button>
      {address && (
        <p style={{ fontWeight: 'bold', color: '#fff', fontSize: '15px' }}>Your address is: {address}</p>
      )}
      <p style={{ fontWeight: 'bold', color: '#fff', fontSize: '15px' }}>When are you available?</p>
    </div>



  <DatePicker 
        selected={selectedDate}
        onChange={date => setSelectedDate(date)}
        showTimeSelect
        dateFormat="MMMM d, yyyy h:mm aa"
        placeholderText="Select Date and Time" 
        className="custom-datepicker"
      />
          <button className="small-button" onClick={ handleNextButtonClick} style={{ fontWeight: 'bold', color: '#fff', marginTop: '15px', backgroundColor: '#40E0D0', border: '3px solid #40E0D0', borderRadius: '7px',width: '80px',height: '40px' ,marginLeft: '150px'}}>
                Next
              </button>
               </div>
          </div>
          </div>
        )}





{showNextContainer && (
   <div className="popup-container">
     <button className="close-button" onClick={handleCloseButtonClick} style={{fontWeight: 'bold',color: 'black' }}>X</button>
        <div className="inner-container">
      


      {/*for  Electrical Repairs */}
        <div className="container">
         <img src="person_Icon1.png" alt="Picture Icon" className="icon1" style={{ width: '60px', height: '60px' }} />
         <hr style={{ color: '#ff0068', backgroundColor: '#ff0068', height: '1px', border: 'none' }} />
   
           <p style={{ fontWeight: 'bold', color: '#ff0068',fontSize: '25px'}}>Peter</p>
           <hr style={{ color: '#ff0068', backgroundColor: '#ff0068', height: '1px', border: 'none' }} />
           <p style={{ fontWeight: 'bold', color: '#ff0068' }}> Electrical Repair</p>
         
           {/* Email address */}
           <p style={{ fontWeight: 'bold', color: '#ff0068' }}> peter@gmail.com</p>
           
           {/* Price */}
           <p style={{ fontWeight: 'bold', color: '#ff0068' }}>Price:R 900</p>
           <a href="#" onClick={() => handleViewProfile(profileInfo)} style={{ fontWeight: 'bold', color: '#ff0068', marginTop: '10px', textDecoration: 'underline' }}>
          View Profile
        </a>
        {showProfilePopup && (
  <div className="profile-popup">
    <div className="popup-content">
      <div className="profile-container">
        <h2>{profileInfo.name}</h2>
        <p>{profileInfo.description}</p>
        <p>Email: {profileInfo.email}</p>
        <p>Price: {profileInfo.price}</p>
        <p>Vehicle: {profileInfo.vehicle}</p>
      </div>
      <button onClick={handleCloseProfilePopup} >Close</button>
    </div>
  </div>
)}
        {/* Request button */}
    <button className='small-button' 
    onClick={handleContactCustomer}
     style={{ fontWeight: 'bold', color: '#fff',marginTop: '30px',backgroundColor: '#40E0D0', border: '3px solid #40E0D0', borderRadius: '7px'}}>            
             Request
           </button>
         </div>
       
           {/* Container 2 */}
           <div className="container">
           <img src="person_Icon1.png" alt="Picture Icon" className="icon1" style={{ width: '60px', height: '60px' }} />
           <hr style={{ color: '#ff0068', backgroundColor: '#ff0068', height: '1px', border: 'none' }} />
           <p style={{ fontWeight: 'bold', color: '#ff0068',fontSize: '25px'}}>Angel</p>
           <hr style={{ color: '#ff0068', backgroundColor: '#ff0068', height: '1px', border: 'none' }} />
           <p style={{ fontWeight: 'bold', color: '#ff0068' }}> Electrical Upgrades</p>
           {/* Email address */}
           <p style={{ fontWeight: 'bold', color: '#ff0068' }}> angel@yahoo.com</p>
           
           {/* Price */}
           <p style={{ fontWeight: 'bold', color: '#ff0068' }}>Price: R 1200</p>
           <a href="#" onClick={() => handleViewProfile(profileInfo)} style={{ fontWeight: 'bold', color: '#ff0068', marginTop: '10px', textDecoration: 'underline' }}>
          View Profile
        </a>



        {showProfilePopup && (
  <div className="profile-popup">
    <div className="popup-content">
      <div className="profile-container">
        <h2>{profileInfo.name}</h2>
        <p>{profileInfo.description}</p>
        <p>Email: {profileInfo.email}</p>
        <p>Price: {profileInfo.price}</p>
        <p>Vehicle: {profileInfo.vehicle}</p>
      </div>
      <button onClick={handleCloseProfilePopup}>Close</button>
    </div>
  </div>
)}
           
           {/* Request button */}
           <button className='small-button' onClick={handleContactCustomer} style={{ fontWeight: 'bold', color: '#fff',marginTop: '30px',backgroundColor: '#40E0D0', border: '3px solid #40E0D0', borderRadius: '7px'}}>
             
             Request
           </button>
           </div>
           {/* Container 3 */}
           <div className="container">
           <img src="person_Icon1.png" alt="Picture Icon" className="icon1" style={{ width: '60px', height: '60px' }} />
           <hr style={{ color: '#ff0068', backgroundColor: '#ff0068', height: '1px', border: 'none' }} />
           <p style={{ fontWeight: 'bold', color: '#ff0068',fontSize: '25px' }}>John</p>
           <hr style={{ color: '#ff0068', backgroundColor: '#ff0068', height: '1px', border: 'none' }} />
           
           <p style={{ fontWeight: 'bold', color: '#ff0068' }}> Electrical Installation</p>
   
           
           {/* Email address */}
           <p style={{ fontWeight: 'bold', color: '#ff0068' }}> refiloem@gmail.com</p>
           
           {/* Price */}
           <p style={{ fontWeight: 'bold', color: '#ff0068' }}>Price: R 700</p>
           <a href="#" onClick={() => handleViewProfile(profileInfo)} style={{ fontWeight: 'bold', color: '#ff0068', marginTop: '10px', textDecoration: 'underline' }}>
          View Profile
        </a>
        {showProfilePopup && (
  <div className="profile-popup">
    <div className="popup-content">
      <div className="profile-container">
        <h2>{profileInfo.name}</h2>
        <p>{profileInfo.description}</p>
        <p>Email: {profileInfo.email}</p>
        <p>Price: {profileInfo.price}</p>
        <p>Vehicle: {profileInfo.vehicle}</p>
      </div>
      <button onClick={handleCloseProfilePopup}>Close</button>
    </div>
  </div>
)}
           
           {/* Request button */}
           <button className='small-button' onClick={handleContactCustomer} style={{ fontWeight: 'bold', color: '#fff',marginTop: '30px',backgroundColor: '#40E0D0', border: '3px solid #40E0D0', borderRadius: '7px'}}>
             Request
           </button>
           </div>
   
   
   
   
             </div>
 </div>
               )}



{showNextContainerHS && (
  <div className="popup-container">
    <button className="close-button" onClick={handleCloseButtonClick} style={{ fontWeight: 'bold', color: 'black' }}>X</button>
    <div className="inner-container">
      {/* Container 1 */}
      <div className="container">
        {/* Content for service provider 1 */}
      </div>
       {/* Request button */}
    <button className='small-button' onClick={handleContactCustomer} style={{ fontWeight: 'bold', color: '#fff',marginTop: '30px',backgroundColor: '#40E0D0', border: '3px solid #40E0D0', borderRadius: '7px'}}>            
             Request
           </button>
         </div>
       
           {/* Container 2 */}
           <div className="container">
           <img src="person_Icon1.png" alt="Picture Icon" className="icon1" style={{ width: '60px', height: '60px' }} />
           <hr style={{ color: '#ff0068', backgroundColor: '#ff0068', height: '1px', border: 'none' }} />
           <p style={{ fontWeight: 'bold', color: '#ff0068',fontSize: '25px'}}>Angel</p>
           <hr style={{ color: '#ff0068', backgroundColor: '#ff0068', height: '1px', border: 'none' }} />
           <p style={{ fontWeight: 'bold', color: '#ff0068' }}> Electrical Upgrades</p>
           {/* Email address */}
           <p style={{ fontWeight: 'bold', color: '#ff0068' }}> angel@yahoo.com</p>
           
           {/* Price */}
           <p style={{ fontWeight: 'bold', color: '#ff0068' }}>Price: R 1200</p>
           <a href="#" onClick={() => handleViewProfile(profileInfo)} style={{ fontWeight: 'bold', color: '#ff0068', marginTop: '10px', textDecoration: 'underline' }}>
          View Profile
        </a>



        {showProfilePopup && (
  <div className="profile-popup">
    <div className="popup-content">
      <div className="profile-container">
        <h2>{profileInfo.name}</h2>
        <p>{profileInfo.description}</p>
        <p>Email: {profileInfo.email}</p>
        <p>Price: {profileInfo.price}</p>
        <p>Vehicle: {profileInfo.vehicle}</p>
      </div>
      <button onClick={handleCloseProfilePopup}>Close</button>
    </div>
  </div>
)}
           
           {/* Request button */}
           <button className='small-button' onClick={handleContactCustomer} style={{ fontWeight: 'bold', color: '#fff',marginTop: '30px',backgroundColor: '#40E0D0', border: '3px solid #40E0D0', borderRadius: '7px'}}>
             
             Request
           </button>
           </div>
           {/* Container 3 */}
           <div className="container">
           <img src="person_Icon1.png" alt="Picture Icon" className="icon1" style={{ width: '60px', height: '60px' }} />
           <hr style={{ color: '#ff0068', backgroundColor: '#ff0068', height: '1px', border: 'none' }} />
           <p style={{ fontWeight: 'bold', color: '#ff0068',fontSize: '25px' }}>John</p>
           <hr style={{ color: '#ff0068', backgroundColor: '#ff0068', height: '1px', border: 'none' }} />
           
           <p style={{ fontWeight: 'bold', color: '#ff0068' }}> Electrical Installation</p>
   
           
           {/* Email address */}
           <p style={{ fontWeight: 'bold', color: '#ff0068' }}> refiloem@gmail.com</p>
           
           {/* Price */}
           <p style={{ fontWeight: 'bold', color: '#ff0068' }}>Price: R 700</p>
           <a href="#" onClick={() => handleViewProfile(profileInfo)} style={{ fontWeight: 'bold', color: '#ff0068', marginTop: '10px', textDecoration: 'underline' }}>
          View Profile
        </a>
        {showProfilePopup && (
  <div className="profile-popup">
    <div className="popup-content">
      <div className="profile-container">
        <h2>{profileInfo.name}</h2>
        <p>{profileInfo.description}</p>
        <p>Email: {profileInfo.email}</p>
        <p>Price: {profileInfo.price}</p>
        <p>Vehicle: {profileInfo.vehicle}</p>
      </div>
      <button onClick={handleCloseProfilePopup}>Close</button>
    </div>
  </div>
)}
           
           {/* Request button */}
           <button className='small-button' onClick={handleContactCustomer} style={{ fontWeight: 'bold', color: '#fff',marginTop: '30px',backgroundColor: '#40E0D0', border: '3px solid #40E0D0', borderRadius: '7px'}}>
             Request
           </button>
           </div>
   
   
   
   
             </div>
)}

{showNextContainerRS && (
  <div className="popup-container">
    <button className="close-button" onClick={handleCloseButtonClick} style={{ fontWeight: 'bold', color: 'black' }}>X</button>
    <div className="inner-container">
      {/* Container 1 */}
      <div className="container">
        {/* Content for service provider 1 */}
      </div>
        {/* Request button */}
    <button className='small-button' onClick={handleContactCustomer} style={{ fontWeight: 'bold', color: '#fff',marginTop: '30px',backgroundColor: '#40E0D0', border: '3px solid #40E0D0', borderRadius: '7px'}}>            
             Request
           </button>
         </div>
       
           {/* Container 2 */}
           <div className="container">
           <img src="person_Icon1.png" alt="Picture Icon" className="icon1" style={{ width: '60px', height: '60px' }} />
           <hr style={{ color: '#ff0068', backgroundColor: '#ff0068', height: '1px', border: 'none' }} />
           <p style={{ fontWeight: 'bold', color: '#ff0068',fontSize: '25px'}}>Angel</p>
           <hr style={{ color: '#ff0068', backgroundColor: '#ff0068', height: '1px', border: 'none' }} />
           <p style={{ fontWeight: 'bold', color: '#ff0068' }}> Electrical Upgrades</p>
           {/* Email address */}
           <p style={{ fontWeight: 'bold', color: '#ff0068' }}> angel@yahoo.com</p>
           
           {/* Price */}
           <p style={{ fontWeight: 'bold', color: '#ff0068' }}>Price: R 1200</p>
           <a href="#" onClick={() => handleViewProfile(profileInfo)} style={{ fontWeight: 'bold', color: '#ff0068', marginTop: '10px', textDecoration: 'underline' }}>
          View Profile
        </a>



        {showProfilePopup && (
  <div className="profile-popup">
    <div className="popup-content">
      <div className="profile-container">
        <h2>{profileInfo.name}</h2>
        <p>{profileInfo.description}</p>
        <p>Email: {profileInfo.email}</p>
        <p>Price: {profileInfo.price}</p>
        <p>Vehicle: {profileInfo.vehicle}</p>
      </div>
      <button onClick={handleCloseProfilePopup}>Close</button>
    </div>
  </div>
)}
           
           {/* Request button */}
           <button className='small-button' onClick={handleContactCustomer} style={{ fontWeight: 'bold', color: '#fff',marginTop: '30px',backgroundColor: '#40E0D0', border: '3px solid #40E0D0', borderRadius: '7px'}}>
             
             Request
           </button>
           </div>
           {/* Container 3 */}
           <div className="container">
           <img src="person_Icon1.png" alt="Picture Icon" className="icon1" style={{ width: '60px', height: '60px' }} />
           <hr style={{ color: '#ff0068', backgroundColor: '#ff0068', height: '1px', border: 'none' }} />
           <p style={{ fontWeight: 'bold', color: '#ff0068',fontSize: '25px' }}>John</p>
           <hr style={{ color: '#ff0068', backgroundColor: '#ff0068', height: '1px', border: 'none' }} />
           
           <p style={{ fontWeight: 'bold', color: '#ff0068' }}> Electrical Installation</p>
   
           
           {/* Email address */}
           <p style={{ fontWeight: 'bold', color: '#ff0068' }}> refiloem@gmail.com</p>
           
           {/* Price */}
           <p style={{ fontWeight: 'bold', color: '#ff0068' }}>Price: R 700</p>
           <a href="#" onClick={() => handleViewProfile(profileInfo)} style={{ fontWeight: 'bold', color: '#ff0068', marginTop: '10px', textDecoration: 'underline' }}>
          View Profile
        </a>
        {showProfilePopup && (
  <div className="profile-popup">
    <div className="popup-content">
      <div className="profile-container">
        <h2>{profileInfo.name}</h2>
        <p>{profileInfo.description}</p>
        <p>Email: {profileInfo.email}</p>
        <p>Price: {profileInfo.price}</p>
        <p>Vehicle: {profileInfo.vehicle}</p>
      </div>
      <button onClick={handleCloseProfilePopup}>Close</button>
    </div>
  </div>
)}
           
           {/* Request button */}
           <button className='small-button' onClick={handleContactCustomer} style={{ fontWeight: 'bold', color: '#fff',marginTop: '30px',backgroundColor: '#40E0D0', border: '3px solid #40E0D0', borderRadius: '7px'}}>
             Request
           </button>
           </div> 
             </div>
 
)}

{showNextContainerCS && (
  <div className="popup-container">
    <button className="close-button" onClick={handleCloseButtonClick} style={{ fontWeight: 'bold', color: 'black' }}>X</button>
    <div className="inner-container">
      {/* Container 1 */}
      <div className="container">
        {/* Content for service provider 1 */}
      </div>
       {/* Request button */}
    <button className='small-button' onClick={handleContactCustomer} style={{ fontWeight: 'bold', color: '#fff',marginTop: '30px',backgroundColor: '#40E0D0', border: '3px solid #40E0D0', borderRadius: '7px'}}>            
             Request
           </button>
         </div>
       
           {/* Container 2 */}
           <div className="container">
           <img src="person_Icon1.png" alt="Picture Icon" className="icon1" style={{ width: '60px', height: '60px' }} />
           <hr style={{ color: '#ff0068', backgroundColor: '#ff0068', height: '1px', border: 'none' }} />
           <p style={{ fontWeight: 'bold', color: '#ff0068',fontSize: '25px'}}>Angel</p>
           <hr style={{ color: '#ff0068', backgroundColor: '#ff0068', height: '1px', border: 'none' }} />
           <p style={{ fontWeight: 'bold', color: '#ff0068' }}> Electrical Upgrades</p>
           {/* Email address */}
           <p style={{ fontWeight: 'bold', color: '#ff0068' }}> angel@yahoo.com</p>
           
           {/* Price */}
           <p style={{ fontWeight: 'bold', color: '#ff0068' }}>Price: R 1200</p>
           <a href="#" onClick={() => handleViewProfile(profileInfo)} style={{ fontWeight: 'bold', color: '#ff0068', marginTop: '10px', textDecoration: 'underline' }}>
          View Profile
        </a>



        {showProfilePopup && (
  <div className="profile-popup">
    <div className="popup-content">
      <div className="profile-container">
        <h2>{profileInfo.name}</h2>
        <p>{profileInfo.description}</p>
        <p>Email: {profileInfo.email}</p>
        <p>Price: {profileInfo.price}</p>
        <p>Vehicle: {profileInfo.vehicle}</p>
      </div>
      <button onClick={handleCloseProfilePopup}>Close</button>
    </div>
  </div>
)}
           
           {/* Request button */}
           <button className='small-button' onClick={handleContactCustomer} style={{ fontWeight: 'bold', color: '#fff',marginTop: '30px',backgroundColor: '#40E0D0', border: '3px solid #40E0D0', borderRadius: '7px'}}>
             
             Request
           </button>
           </div>
           {/* Container 3 */}
           <div className="container">
           <img src="person_Icon1.png" alt="Picture Icon" className="icon1" style={{ width: '60px', height: '60px' }} />
           <hr style={{ color: '#ff0068', backgroundColor: '#ff0068', height: '1px', border: 'none' }} />
           <p style={{ fontWeight: 'bold', color: '#ff0068',fontSize: '25px' }}>John</p>
           <hr style={{ color: '#ff0068', backgroundColor: '#ff0068', height: '1px', border: 'none' }} />
           
           <p style={{ fontWeight: 'bold', color: '#ff0068' }}> Electrical Installation</p>
   
           
           {/* Email address */}
           <p style={{ fontWeight: 'bold', color: '#ff0068' }}> refiloem@gmail.com</p>
           
           {/* Price */}
           <p style={{ fontWeight: 'bold', color: '#ff0068' }}>Price: R 700</p>
           <a href="#" onClick={() => handleViewProfile(profileInfo)} style={{ fontWeight: 'bold', color: '#ff0068', marginTop: '10px', textDecoration: 'underline' }}>
          View Profile
        </a>
        {showProfilePopup && (
  <div className="profile-popup">
    <div className="popup-content">
      <div className="profile-container">
        <h2>{profileInfo.name}</h2>
        <p>{profileInfo.description}</p>
        <p>Email: {profileInfo.email}</p>
        <p>Price: {profileInfo.price}</p>
        <p>Vehicle: {profileInfo.vehicle}</p>
      </div>
      <button onClick={handleCloseProfilePopup}>Close</button>
    </div>
  </div>
)}
           
           {/* Request button */}
           <button className='small-button' onClick={handleContactCustomer} style={{ fontWeight: 'bold', color: '#fff',marginTop: '30px',backgroundColor: '#40E0D0', border: '3px solid #40E0D0', borderRadius: '7px'}}>
             Request
           </button>
             </div>
 </div>
)}

{showNextContainerLS && (
  <div className="popup-container">
    <button className="close-button" onClick={handleCloseButtonClick} style={{ fontWeight: 'bold', color: 'black' }}>X</button>
    <div className="inner-container">
      {/* Container 1 */}
      <div className="container">
        {/* Content for service provider 1 */}
      </div>
        {/* Request button */}
    <button className='small-button' onClick={handleContactCustomer} style={{ fontWeight: 'bold', color: '#fff',marginTop: '30px',backgroundColor: '#40E0D0', border: '3px solid #40E0D0', borderRadius: '7px'}}>            
             Request
           </button>
         </div>
       
           {/* Container 2 */}
           <div className="container">
           <img src="person_Icon1.png" alt="Picture Icon" className="icon1" style={{ width: '60px', height: '60px' }} />
           <hr style={{ color: '#ff0068', backgroundColor: '#ff0068', height: '1px', border: 'none' }} />
           <p style={{ fontWeight: 'bold', color: '#ff0068',fontSize: '25px'}}>Angel</p>
           <hr style={{ color: '#ff0068', backgroundColor: '#ff0068', height: '1px', border: 'none' }} />
           <p style={{ fontWeight: 'bold', color: '#ff0068' }}> Electrical Upgrades</p>
           {/* Email address */}
           <p style={{ fontWeight: 'bold', color: '#ff0068' }}> angel@yahoo.com</p>
           
           {/* Price */}
           <p style={{ fontWeight: 'bold', color: '#ff0068' }}>Price: R 1200</p>
           <a href="#" onClick={() => handleViewProfile(profileInfo)} style={{ fontWeight: 'bold', color: '#ff0068', marginTop: '10px', textDecoration: 'underline' }}>
          View Profile
        </a>



        {showProfilePopup && (
  <div className="profile-popup">
    <div className="popup-content">
      <div className="profile-container">
        <h2>{profileInfo.name}</h2>
        <p>{profileInfo.description}</p>
        <p>Email: {profileInfo.email}</p>
        <p>Price: {profileInfo.price}</p>
        <p>Vehicle: {profileInfo.vehicle}</p>
      </div>
      <button onClick={handleCloseProfilePopup}>Close</button>
    </div>
  </div>
)}
           
           {/* Request button */}
           <button className='small-button' onClick={handleContactCustomer} style={{ fontWeight: 'bold', color: '#fff',marginTop: '30px',backgroundColor: '#40E0D0', border: '3px solid #40E0D0', borderRadius: '7px'}}>
             
             Request
           </button>
           </div>
           {/* Container 3 */}
           <div className="container">
           <img src="person_Icon1.png" alt="Picture Icon" className="icon1" style={{ width: '60px', height: '60px' }} />
           <hr style={{ color: '#ff0068', backgroundColor: '#ff0068', height: '1px', border: 'none' }} />
           <p style={{ fontWeight: 'bold', color: '#ff0068',fontSize: '25px' }}>John</p>
           <hr style={{ color: '#ff0068', backgroundColor: '#ff0068', height: '1px', border: 'none' }} />
           
           <p style={{ fontWeight: 'bold', color: '#ff0068' }}> Electrical Installation</p>
   
           
           {/* Email address */}
           <p style={{ fontWeight: 'bold', color: '#ff0068' }}> refiloem@gmail.com</p>
           
           {/* Price */}
           <p style={{ fontWeight: 'bold', color: '#ff0068' }}>Price: R 700</p>
           <a href="#" onClick={() => handleViewProfile(profileInfo)} style={{ fontWeight: 'bold', color: '#ff0068', marginTop: '10px', textDecoration: 'underline' }}>
          View Profile
        </a>
        {showProfilePopup && (
  <div className="profile-popup">
    <div className="popup-content">
      <div className="profile-container">
        <h2>{profileInfo.name}</h2>
        <p>{profileInfo.description}</p>
        <p>Email: {profileInfo.email}</p>
        <p>Price: {profileInfo.price}</p>
        <p>Vehicle: {profileInfo.vehicle}</p>
      </div>
      <button onClick={handleCloseProfilePopup}>Close</button>
    </div>
  </div>
)}
           
           {/* Request button */}
           <button className='small-button' onClick={handleContactCustomer} style={{ fontWeight: 'bold', color: '#fff',marginTop: '30px',backgroundColor: '#40E0D0', border: '3px solid #40E0D0', borderRadius: '7px'}}>
             Request
           </button>
           </div>
             </div>
)}

{showNextContainerC && (
  <div className="popup-container">
    <button className="close-button" onClick={handleCloseButtonClick} style={{ fontWeight: 'bold', color: 'black' }}>X</button>
    <div className="inner-container">
      {/* Container 1 */}
      <div className="container">
        {/* Content for service provider 1 */}
      </div>
       {/* Request button */}
    <button className='small-button' onClick={handleContactCustomer} style={{ fontWeight: 'bold', color: '#fff',marginTop: '30px',backgroundColor: '#40E0D0', border: '3px solid #40E0D0', borderRadius: '7px'}}>            
             Request
           </button>
         </div>
       
           {/* Container 2 */}
           <div className="container">
           <img src="person_Icon1.png" alt="Picture Icon" className="icon1" style={{ width: '60px', height: '60px' }} />
           <hr style={{ color: '#ff0068', backgroundColor: '#ff0068', height: '1px', border: 'none' }} />
           <p style={{ fontWeight: 'bold', color: '#ff0068',fontSize: '25px'}}>Angel</p>
           <hr style={{ color: '#ff0068', backgroundColor: '#ff0068', height: '1px', border: 'none' }} />
           <p style={{ fontWeight: 'bold', color: '#ff0068' }}> Electrical Upgrades</p>
           {/* Email address */}
           <p style={{ fontWeight: 'bold', color: '#ff0068' }}> angel@yahoo.com</p>
           
           {/* Price */}
           <p style={{ fontWeight: 'bold', color: '#ff0068' }}>Price: R 1200</p>
           <a href="#" onClick={() => handleViewProfile(profileInfo)} style={{ fontWeight: 'bold', color: '#ff0068', marginTop: '10px', textDecoration: 'underline' }}>
          View Profile
        </a>



        {showProfilePopup && (
  <div className="profile-popup">
    <div className="popup-content">
      <div className="profile-container">
        <h2>{profileInfo.name}</h2>
        <p>{profileInfo.description}</p>
        <p>Email: {profileInfo.email}</p>
        <p>Price: {profileInfo.price}</p>
        <p>Vehicle: {profileInfo.vehicle}</p>
      </div>
      <button onClick={handleCloseProfilePopup}>Close</button>
    </div>
  </div>
)}
           
           {/* Request button */}
           <button className='small-button' onClick={handleContactCustomer} style={{ fontWeight: 'bold', color: '#fff',marginTop: '30px',backgroundColor: '#40E0D0', border: '3px solid #40E0D0', borderRadius: '7px'}}>
             
             Request
           </button>
           </div>
           {/* Container 3 */}
           <div className="container">
           <img src="person_Icon1.png" alt="Picture Icon" className="icon1" style={{ width: '60px', height: '60px' }} />
           <hr style={{ color: '#ff0068', backgroundColor: '#ff0068', height: '1px', border: 'none' }} />
           <p style={{ fontWeight: 'bold', color: '#ff0068',fontSize: '25px' }}>John</p>
           <hr style={{ color: '#ff0068', backgroundColor: '#ff0068', height: '1px', border: 'none' }} />
           
           <p style={{ fontWeight: 'bold', color: '#ff0068' }}> Electrical Installation</p>
   
           
           {/* Email address */}
           <p style={{ fontWeight: 'bold', color: '#ff0068' }}> refiloem@gmail.com</p>
           
           {/* Price */}
           <p style={{ fontWeight: 'bold', color: '#ff0068' }}>Price: R 700</p>
           <a href="#" onClick={() => handleViewProfile(profileInfo)} style={{ fontWeight: 'bold', color: '#ff0068', marginTop: '10px', textDecoration: 'underline' }}>
          View Profile
        </a>
        {showProfilePopup && (
  <div className="profile-popup">
    <div className="popup-content">
      <div className="profile-container">
        <h2>{profileInfo.name}</h2>
        <p>{profileInfo.description}</p>
        <p>Email: {profileInfo.email}</p>
        <p>Price: {profileInfo.price}</p>
        <p>Vehicle: {profileInfo.vehicle}</p>
      </div>
      <button onClick={handleCloseProfilePopup}>Close</button>
    </div>
  </div>
)}
           
           {/* Request button */}
           <button className='small-button' onClick={handleContactCustomer} style={{ fontWeight: 'bold', color: '#fff',marginTop: '30px',backgroundColor: '#40E0D0', border: '3px solid #40E0D0', borderRadius: '7px'}}>
             Request
           </button>
           </div>
  </div>
)}

        </section>

       








        <section className='partnership'>
          <div className='pictureandinfo'>
            <div className='foldedpic'>
              <img src='/foldedman.png' alt='JoinUs'style={{width: "500px", height:'500px'}}/>
            </div>
            <div className='pictureinfo' >
              <h1 style={{color: '#ff0068', fontWeight: 'bold', fontFamily: 'poppins', fontSize: '40px', marginBottom: '40px'}}>Become a partner and enjoy many benefits</h1>
              <button style={{color: '#fff', float: 'right', background: '#ff0068', borderStyle: 'none', fontWeight: 'bold', fontFamily: 'poppins', padding: "8px", borderRadius: '10px', marginRight: '40px'}}>
                Register Now
                </button>
               <PDFLink/>
            </div>
            
          </div>
        </section>
        <section className="contactcontainer">
          {<div className='contactdetails'>
            <div className='registerimg'>

            </div>
            <div className='contactcontainer1'>
            <div>
              <h1 className='contactheading'style={{}}>Your Repairs<br/> Made Simple!</h1>
              <p className='contactparagraph'>Easily repair and maintain home<br/> 
appliances at your fingertips</p>



            </div>
            <div><img className='phone' src="/phone.png" style={{ width: '500px', height: '400px' }}/></div>
            
            </div>
            </div>}
        </section>
      
     
      </main>
      <footer className='finalsection'>
        {
          <div className='homefooter'>
            
            <div className='footerlogo'>

            </div>
            <div className='footerinfo'>
              
              <div className='footeraddress'>
                <p>Grand Central Office Park<br/>
Opposite Grand Central International Airport<br/>
<br/>49 New Road,Midrand<br/> +27 064 897 3566| info@myrepairs.com</p>
              </div>
              <div className='footerlinks'>
                <label>Links</label>
                <ul className='footerlist'>
                <li><a href='/'>Home</a></li>
                <li><a href='/provider_homepage'>Become A Partner</a></li>
                <li><a href='/Apps'>Apps</a></li>
                <li><a href='/ContactUs'>Contact us</a></li>
                </ul>
             </div>
              <div className='footerlinks2'>
                <label>Information</label>
                <ul className='footerlist'>
                <li> <a href='/PrivacyPolicy'>Privacy Policy</a></li>
                <li><a href='/TermsAndConditionsModal'>TermsAndConditionsModal</a></li>
               <li> <a href='/Disclaimer'>Disclaimer</a></li>
               <li> <a href='/Cancellation'>Cancellation</a></li>
                <li><a href='/RefundAndReturn'>Return And Refund</a></li>
              </ul>
              </div>

            </div>
          </div>
        }
      </footer>
    
      {showScrollButton && (
        <div
          className={`scroll-to-top ${showScrollButton ? 'show' : ''}`}
          onClick={() => {
            const topElement = document.getElementById('top');
            if (topElement) {
              topElement.scrollIntoView({ behavior: 'smooth' });
            }
          }}
        >
          ^
        </div>
      )}

      <style jsx global>{`
     

  .pictureinfo{
    padding: 20px;
    width: 390px;
  }
.pictureandinfo{
  display: flex;
  width: 970px;
  margin: 0 auto;
  justify-content: space-between;
  align-items: center;
  
}


@keyframes colorfulShadow {
  0% {
    box-shadow: 0 0 10px rgba(255, 0, 0, 0.5);
  }
  25% {
    box-shadow: 0 0 10px rgba(0, 255, 0, 0.5);
  }
  50% {
    box-shadow: 0 0 10px rgba(0, 0, 255, 0.5);
  }
  75% {
    box-shadow: 0 0 10px rgba(255, 255, 0, 0.5);
  }
  100% {
    box-shadow: 0 0 10px rgba(255, 0, 255, 0.5);
  }
}

     @keyframes slideInFromTop {
      0% {
        transform: translateY(-100%);
      }
      100% {
        transform: translateY(0);
      }
    }
    
    @keyframes bounce {
      0%, 100% {
        transform: translateY(0);
      }
      50% {
        transform: translateY(-10px);
      }
    }
    .card {
      position: relative;
      overflow: hidden;
      height: auto;
      width: auto;
      padding: 5px;
      border-style: none;
      z-index: 1;
    }
    
    .card:hover .expanded-content-container,
    .card:hover + .long-description-container .expanded-content-container {
      display: block; /* Show the container on hover */
    }
    
 
    .long-description-container {
      position: relative; /* Make sure the position is relative */
      z-index: 1000; /* Set a z-index for the description box */
      max-height: 150px; /* Adjust the max height as per your need */
      overflow-y: auto;

    }
    
    .expanded-content {
      font-size: 20px;
      position: relative;
      color: #ff0068;
      font-weight: bold;
      font-family:  Courier New;
      box-shadow: 0 0 10px rgba(255, 0, 104, 0.7);
      transition: box-shadow 0.5s ease;
      display: flex;
      justify-content: center;
      z-index: 1;
      overflow: auto;
      scrollbar-width: none; /* Firefox */
      -ms-overflow-style: none; /* IE and Edge */
    }
    
    .expanded-content::-webkit-scrollbar {
      width: 0;
      background: transparent;
    }
    
    .long-description-container div {
      margin-bottom: 10px;
    }
    
    .long-description-container strong {
      margin-right: 5px;
    }
      label{
      margin-left: 40px;
      font-family: poppins;
      font-weight: bold;
      font-size: 20px;

        text-align: center;
       color: #fff;
        place-items: center;
      }
      .footerlist li a{
        list-style: none;
        text-decoration: none;
       color: #fff;
        
      }
      .footerlist li{
        list-style: none;
      }
      .footerlinks2{
        width: 300px;
        font-family: poppins;
      font-weight: bold;
        padding-left: 50px;
      }
      .footerlinks{
        font-family: poppins;
      font-weight: bold;
        width: 300px;
        padding-left: 60px;
       border-left: 2px solid #fff;
       border-right: 2px solid #fff;
        justify-content: center;
       
        
      }
      .footeraddress{
        font-family: poppins;
      font-weight: bold;
        padding-top: 40px;
        width: 300px;
     color: #fff;

      }
      .footerinfo{
        display: flex;
        width: 950px;
        justify-content: space-evenly;
        margin: 0 auto;
        margin-top: 10px;
       padding: 30px;

       
      }
      .finalsection{
        width: 100%;
        width: 100vw;
        background-color: #ff0068;

      }
      .homefooter{
        width: 970px;
        margin: 0 auto;
        background-color: #ff0068;

  
      }
      .footerimage{
        margin-left: 0px;
      }
      .footerlogo{
        padding:10px;
        width: 950px;
       margin: 0 auto;
       mix-blend-mode: none;
        height: 150px;
      }
      .Downloadheading{
        color: black;
        font-weight: bold;
        font-family: poppins;
        font-size: 35px;
      }
      .contactparagraph{
        color: #21B6A8;
        font-weight: bold;
        font-family: poppins;
        font-size: 25px;
        padding-left: 35px;
       
      }
      .contactheading{
        font-size: 50px;
        color: #ff0050;
        font-weight: bold;
        font-family: poppins;
       padding-left: 35px;
      }
      .contactcontainer1{
        margin: 0 auto;
        display: flex;
        align-items: center;

        width: 950px;
        padding:20px;
        justify-content: space-between;
      }
      .contactdetails{
        margin: 0 auto;
       padding-bottom: 50px;
        width: 1005;
     
        align-items: end;
        padding: 10px;
        margin-bottom: 20px;
        justify-content: space-between;
      }

      .sponsors{
        background: #E3E6E3;
        align-items: center;
        height: 400px;
        width: 970px;
      margin: 0 auto;
      display: flex;
      justify-content: space-between;
      }
   
      .descrip-p{
        font-family: poppins;
        font-weight: bold;
      }
      .descrip-p1{
        font-family: poppins;
        color: #21B6A8;
        font-weight: bold;
      }
      .stepdescription{
        margin-top: -10px;
        justify-content: space-around;
        margin-left: 5px;
        color: #ff0068;
       
        

      }
      .stepinstructions{
        margin-top: -13px;
        justify-content: space-around;
        margin-left: 5px;
        font-size: 11px;
        color: #454545;
        font-weight: bold;
      }
      .stepheadings{
        font-family: poppins;
        font-weight: bold;
        font-size: 36px;
        color: #ff0055;
      }
      .step2headings{
        font-family: poppins;
        font-weight: bold;
        font-size: 36px;
      }
      .step3headings{
        font-family: poppins;
        font-weight: bold;
        font-size: 36px;
        color: #ff0055;
      }
      .step4headings{
        font-family: poppins;
        font-weight: bold;
        font-size: 36px;
      }
      .step5headings{
        font-family: poppins;
        font-weight: bold;
        font-size: 36px;
        color: #ff0055;
      }
      .step6headings{
        font-family: poppins;
        font-weight: bold;
        font-size: 36px;
      }
      .iconarea1{
        display: flex;
        
        align-items: end;
        justify-content: space-evenly;
        color: #21B6A8;
       

      }
      .iconarea2{
        display: flex;
        
        align-items: end;
        justify-content: space-evenly;
        color: #21B6A8;
       

      }
      .iconarea3{
        display: flex;
        
        align-items: end;
        justify-content: space-evenly;
        color: #21B6A8;
       

      }
      .iconarea4{
        display: flex;
        
        align-items: end;
        justify-content: space-evenly;
        color: #21B6A8;
       

      }
      .iconarea5{
        display: flex;
        
        align-items: end;
        justify-content: space-evenly;
        color: #21B6A8;
       

      }
      .iconarea6{
        display: flex;
        
        align-items: end;
        justify-content: space-evenly;
        color: #21B6A8;
       

      }
      .step1{
width: 250px;

      }
      .step2{
        width: 250px;
        
              }
              .step3{
                width: 250px;
                
                      }
                      .step4{
                        width: 250px;
                        
                              }
                              .step5{
                                width: 250px;
                                
                                      }
                                      .step6{
                                        width: 250px;
                                        
                                              }
    
      .phase1{
        display: flex;
        justify-content: space-between;
        border-bottom: 2px solid #ff0055;
      }
      .phase2{
        margin-top: 20px;
        display: flex;
        justify-content: space-between;
        border-bottom: 2px solid #ff0055;
      }
      .howitworks{
        margin: 0 auto;
        margin-top:25px;
        width: 950px;
        padding: 20px;
        padding-left: 0;
        padding-right: 0;
       
      }

body::-webkit-scrollbar {
  width: 0.1rem;
  background-color: transparent; 
}


body::-webkit-scrollbar-thumb {
  background-color: transparent;
}


body {
  scrollbar-width: none;
}


body {
  -ms-overflow-style: none; 
}
@media (max-width: 768px){
  .scroll-to-top{
    display: none;
  }
}
      .scroll-to-top {
        position: fixed;
        bottom: 50px;
        right: 50px;
        background-color: #21B6A8;
        color: white;
        width: 60px;
        height: 60px;
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        opacity: 0;
        font-size: 40px;
        font-weight: bold;
        transition: opacity 0.3s;
      }
      
      .scroll-to-top.show {
        opacity: 1;
      }

      .scroll-to-top:hover{
        background: #ff0068;
        transition: background 0.3s;
      }
      
 
   .heading-with-lines {
    display: flex;
    font-family: poppins;
    align-items: center;
    font-size: 40px; 
    font-weight: bold;
    color: #ff0050;
  }
  .heading-with-lines::before,
  .heading-with-lines::after {
    content: '';
    flex-grow: 1;
    font-weight: bold;
   
    border-top: 2px solid #ff0055;
    margin: 0 10px; 
    width: 30px;
  }

      .services{
        background: #fff;
        margin-top: -10px;

      }
      .service-heading{
       width: 970px;
      
        text-align: center;
        padding-top: 100px;
        color: white;
        margin: 0 auto;
       
        justify-content: center;

      }
      .hovered .card-icon {
        background-image: url('/icons/icon-hover-background.png'); // Change to the background image on hover
      }
      .card{
        display: flex;
        flex-direction: column;
        overflow: hidden;
        height: auto;
        width: auto;
        padding: 5px;
        border-style: none;

      }
      .card:hover{
        .card-title{
          color: #ff0068;
          
        }
      }
      
 .card-container {
  display: grid;
  width: 1000px;
  margin: 0 auto;
  padding-top: 20px;
  border-radius: 30px;
  grid-template-columns: repeat(4, 1fr); /* Four columns */
  gap: 20px; /* Gap between cards */
  justify-items: center; /* Center icons horizontally */
  
}
.icon-container {
  display: flex;
          justify-content: center;
          align-items: center;
          height: 100px; 
          margin-top: 40px;
          margin-bottom: 25px;
}
.card-title {
  text-align: center;
  position: relative;
  margin: 0 auto;
  margin-top: 25px;
  font-weight: bold;
  font-family: poppins;
 color:#21B6A8;
  width: 85px;
  
}

.section-heading {
  text-align: center;
  margin-bottom: 20px;
}
.section-line {
  border: none;
  border-top: 1px solid #ccc;
  margin: 10px auto;
  width: 50px;
}
.images{
  margin-top: 0px;
  background: black;

}
.image1{
  position: absolute;
  margin-top: -80px;
  margin-left: -650px;
z-index: 3;

}
.image2{
  position: absolute;
z-index: 1;
width: 80px;
object-fit: cover;
margin-left: -750px;
margin-top: -30px;

}


.image3{
  position: absolute;
  z-index: 2;
  margin-top: -220px;
  margin-left: -600px;
}
.image4{
  position: absolute;
  z-index: 1;
  margin-left: -380px;
  margin-top: -80px;
}

      .btn-register1{
        margin-top: 30px;
        border-radius: 10px;
        background:#21B6A8;
        color: white;
        font-weight: bold;
        padding: 8px; 
      }
      h1{
        font-size: 80px;
        font-family: poppins;
      }
    
      h4{
        font-size: 30px;
        margin-top: -50px;
        font-family: poppins;
      }
      .topheader{
        margin-left: 40px;
      }

      .pdf{
        margin-left: 930px;
        background-color: #ff0068;
        color:fff;
      }

      .filler{
        margin-left: 930px;
        background-color: #ff0068;
        color:fff;
      }
.intro{
  display: block;
  width: 300px;
 margin-left: 40px;
}
.slider{
  display: flex;
  align-items: center;
  width: 970px;
      
        background: #ff0068;
        padding-top: 100px;
        color: white;
        margin: 0 auto;
       
        justify-content: space-between;
  color: white;
  font-weight: bold;
  font-size: 20px
  
  
  
}
      .banner{
        width: 100%;
        height: 350px;
        background: #ff0068;
        width: 100vw;
        margin: 0 auto;
      }
      .home-page{
        
      display: flex;
      flex-direction: column;
      width: 100%;
      padding: 0px;
      

      }
      .header1{
       width: 100vw;
       background: #fff;
      }
      .paragraph1{
        padding-top: 5px;
       font-weight: bold;
       color: #ff0068;
        margin-top: 10px;
        font-family: Arial;
        font-size: 20px;
       

      }
      .firstheader{
        display: flex;
       
        width: 970px;
      
        text-align: center;
      
        color: white;
        margin: 0 auto;
       
line-height: 5px;
        background: #fff;
        
        font-weight: bold;
        color: #ff0068;

     
       
     
      
      
      }
      .Menu{
        width: 100%;
        background: red;
        height: 100px;
      }
      .long-description-container {
        max-width: 500px;
        margin: 0 auto;
        padding: 10px;
        display: grid;
        grid-template-rows: repeat(2, auto); /* Set the number of rows */
        gap: 5px; /* Adjust the gap between rows if needed */
      }
      .popup-container {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(255, 192, 203, 0.9); /* Pink color with some transparency */
        z-index: 9999; /* Ensure the popup is above other elements */
        display: flex;
        justify-content: center;
        align-items: center;
        
      }
      
 
      .close-button {
        position: absolute;
        top: 10px;
        right: 10px;
        background-color: transparent;
        border: none;
        color: #fff; /* Color of the close button */
        font-size: 20px;
        cursor: pointer;
      }
      .inner-container {
        display: flex;
        justify-content: space-between;
      }
      
      .container {
        width: 250px; /* Adjust the width as per your layout */
        height: 450px;
        padding: 20px;
        border-radius: 10px;
        box-sizing: border-box;
        background-color: #fff; /* Pink background color */
        color: #fff; /* Text color */
        text-align: center; /* Center the content */
        font-size: 20px; /* Adjust the font size */
        margin: 15px; /* Added margin to create space between containers */
        border: 2px solid #ff0068;
      }
      .infoContainer{
        width: 600px; /* Adjust the width as per your layout */
        height: 650px;
        padding: 20px;
        border-radius: 10px;
        box-sizing: border-box;
        background-color: #ff0068; /* Pink background color */
        color: #fff; /* Text color */
        text-align: center; /* Center the content */
        font-size: 20px; /* Adjust the font size */
        margin: 15px; /* Added margin to create space between containers */
        border: 2px solid #ff0068;

      }
      .custom-datepicker {
        /* Your custom styles here */
        border-radius: 5px;
        /* Add any other styles you want */
      }
      .profile-popup {
  position: fixed; /* This ensures the popup stays fixed in the viewport */
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 192, 203, 0.9); /* Pink color with some transparency */
  z-index: 9999; /* Ensure the popup appears on top of other elements */
  display: flex;
  justify-content: center;
  align-items: center;
}

.popup-content {
  background-color: #ff0068;
  padding: 20px;
  border-radius: 10px;
  
}

.profile-container {
  height: 400px;
  width: 600px;
}
     
     
    
      `}</style>
    </div>
  );
}

export default HomePage;
