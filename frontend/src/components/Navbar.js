// Import React
import React from 'react';
// Import Link component from react-router-dom for navigation
import { Link } from 'react-router-dom';

// Import Bootstrap styles and JavaScript bundle
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

// Navbar component that accepts isAuthenticated and user as props
const Navbar = ({ isAuthenticated, user }) => {

  // console.log('user-', user);
  // JSX for the Navbar
  return (

    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        
        <Link className="navbar-brand" to="/">SALES APP</Link>
        
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">

            {isAuthenticated ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/addSales">ADD SALES</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/topFiveSales">TOP 5 SALES</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/todaysSales">TODAY'S TOTAL REVENUE</Link>
                </li>
                <li className="nav-item">
                  {user && (
                    <span className="nav-link">Welcome, {user.firstName}</span>
                  )}
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/logout" title={user?.email || 'Logout'}>LOGOUT</Link>
                </li>
              </>
            ) : (
              // If user is not authenticated..
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">LOGIN</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/">REGISTER</Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

// Export the Navbar component
export default Navbar;