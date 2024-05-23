// Import React, useState for state management, BrowserRouter as Router, Routes, and Route from react-router-dom
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Import Navbar and different pages/components
import Navbar from './components/Navbar';
import AddSales from './components/Pages/AddSales';
import TopFiveSales from './components/Pages/TopFiveSales';
import TodaysSale from './components/Pages/TodaysSale';
import Login from './components/Pages/Login';
import Register from './components/Pages/Register';
import Logout from './components/Pages/Logout';

// Main App component
const App = () => {
  // State variables for authentication status and user data
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  // Function to handle user login
  const handleLogin = (userData) => {
    // Set isAuthenticated to true and update user data when the user successfully logs in
    setIsAuthenticated(true);
    setUser(userData);
  };

  // Function to handle user logout
  const handleLogout = () => {
    // Set isAuthenticated to false and clear user data when the user logs out
    setIsAuthenticated(false);
    setUser(null);
  };

  // JSX for the component
  return (
    // Set up the BrowserRouter as the main routing component
    <Router>
      
      <Navbar isAuthenticated={isAuthenticated} user={user} />
      
      <Routes>
        <Route path='/' element={<Register />} />
        <Route path='/addSales' element={<AddSales />} />
        <Route path='/topFiveSales' element={<TopFiveSales />} />
        <Route path='/todaysSales' element={<TodaysSale />} />
        <Route path='/login' element={<Login onLogin={handleLogin} />} />
        <Route path='/logout' element={<Logout onLogout={handleLogout} />} />
      </Routes>
      
    </Router>
  );
}

// Export the App component
export default App;
