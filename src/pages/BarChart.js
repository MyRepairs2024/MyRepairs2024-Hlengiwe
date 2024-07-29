import React, { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js/auto';

const BarChart = ({ servicePerformanceData,months }) => {
  const chartRef = useRef(null);
  const [currentMonthIndex, setCurrentMonthIndex] = useState(0);
  
//code for the bar chart
  useEffect(() => {
    if (servicePerformanceData.length > 0) {
      const ctx = chartRef.current.getContext('2d');

      const monthData = servicePerformanceData[currentMonthIndex].monthData; 
      const labels = monthData.map(entry => entry.day);
      const serviceCounts = monthData.map(entry => entry.serviceCount);

      if (chartRef.current && chartRef.current.chart) {
        chartRef.current.chart.destroy();
      }

      const chartInstance = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: labels,
          datasets: [
            {
              label: months[currentMonthIndex],
              data: serviceCounts,
              backgroundColor:[
                '#ff0066',
                '#148F77',
                '#17202A',
              '#909497',
              
            ],
      
              borderWidth: 1,
            },
          ],
         
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
            },
          },
          plugins: {
            tooltip: {
              mode: 'index',
              intersect: false,
            },
          },


          },
      });

      return () => {
        chartInstance.destroy(); // Cleanup chart instance on component unmount
      };
    }
  }, [servicePerformanceData, currentMonthIndex]);

  

  const handleNextMonth = () => {
    setCurrentMonthIndex(prevIndex => (prevIndex < servicePerformanceData.length - 1 ? prevIndex + 1 : prevIndex));
  };

  const handlePrevMonth = () => {
    setCurrentMonthIndex(prevIndex => (prevIndex > 0 ? prevIndex - 1 : prevIndex));
  };

  return (
    <div>
      <button onClick={handlePrevMonth} 
      disabled={currentMonthIndex === 0}
      >
        Previous Month
        </button>

      <button onClick={handleNextMonth} 
      disabled={currentMonthIndex === months.length - 1}
      >Next Month</button>
      <canvas ref={chartRef}></canvas>
   </div>
  );
};

export default BarChart;