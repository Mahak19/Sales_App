// Import React, useState for state management, useEffect for side effects
import React, { useState, useEffect } from 'react';
//Import axios for HTTP requests
import axios from 'axios';

// Functional component for displaying today's total revenue
const TodaysSales = () => {
  // State variable to store the totalAmount
  const [totalAmount, setTotalAmount] = useState(0);

  const fetchTotalAmount = async () => {
    try {
      const response = await axios.get('https://salesapp-backend.onrender.com/sales/totalSales');
      console.log(response);
      setTotalAmount(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchTotalAmount();
  }, [totalAmount]);

  // JSX for the component
  return (
    <div className="container">
      <h2 className="text-center my-4">TOTAL REVENUE IS {totalAmount}</h2>
    </div>
  );
};

// Export the TodaysSales component
export default TodaysSales;
