import React, { useState, useEffect } from 'react';
import BarChart from './BarChart'; // Import BarChart component

// dataGenerator.js
export const generateServiceDeliveryData = () => {
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const data = [];

  // Generate data for each month
  months.forEach((month, index) => {
    const daysInMonth = new Date(new Date().getFullYear(), index + 1, 0).getDate();
    const monthData = [];

    // Generate data for each day in the month
    for (let day = 1; day <= daysInMonth; day++) {
      // Generate random service delivery count for demonstration
      const serviceCount = Math.floor(Math.random() * 50) + 10; // Random count between 10 and 60
      monthData.push({ day, serviceCount });
    }

    data.push({ month, monthData });
  });

  return data;
};

const MyComponent = ({ selectedDate, handlePreviousMonth, handleNextMonth }) => {
 const [servicePerformanceData, setServicePerformanceData] = useState([]);
  
 useEffect(() => {
    const fetchData = async () => {
      const month = selectedDate.getMonth();
      const year = selectedDate.getFullYear();
      const response = await fetch(`/api/service-performance-data?month=${month}&year=${year}`);
      const data = await response.json();
      setServicePerformanceData(data);
    };

    fetchData();
  }, [selectedDate]); // Re-fetch data when selectedDate changes

  useEffect(() => {
    const generateData = () => {
      const month = selectedDate.getMonth();
      const year = selectedDate.getFullYear();

      // Generate service delivery data using dataGenerator.js
      const generatedData = generateServiceDeliveryData(month, year);
      setServicePerformanceData(generatedData);
    };

    generateData();
  }, [selectedDate]);
  
  return (
    <div className="services-wrapper">
      {servicePerformanceData.length > 0 ? (
         <canvas id="servicePerformanceChart"></canvas>
          ) : (
          <p>Loading data...</p>
        )}
      
         <style jsx>{`
.services-wrapper {
  background-color: #000;
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
}4

.services-container {
  height: 320px; /* Moved height here */
  padding: 30px;
}
`}</style>
</div>
);
};

export default MyComponent;