import React from 'react';
import { useState, useEffect, useRef } from 'react';
const LocationSearchBox = () => {
   
  // Sample location options
  const locationOptions = ['Option 1', 'Option 2', 'Option 3'];

  return (
    <div className="container">
      <select className="dropdown">
        {locationOptions.map((option) => (
          <option key={option}>{option}</option>
        ))}
      </select>
      <input type="text" className="searchInput" placeholder="Search" />

      <style jsx>{`
        .container {
          display: flex;
          justify-content: space-evenly;
          align-items: center;
          height: 40px;
          background-color: #454545;
          border-radius: 4px;
          padding: 8px;
          position: fixed;
          top: 25%;
          left: 0;
          width: 100%;
          border: solid 2px pink;
          padding-top: 20px;


        }

        .dropdown {
          width: 180px;
          height: 28px;
          border: none;
          background-color: #FDF5E6;
          border-radius: 4px;
          padding: 4px;
          font-size: 14px;
          color: #454545;
          margin-right: 100px
          
        }

        .searchInput {
          
          height: 28px;
          border: none;
          background-color: #FDF5E6;
          border-radius: 4px;
          color: #454545;
          padding: 4px;
          font-size: 14px;
      
        }
      `}</style>
    </div>
  );
};

export default LocationSearchBox;
