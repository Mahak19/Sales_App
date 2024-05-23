// Import React, useState for state management
import React, { useState } from 'react';
//Import axios for HTTP requests
import axios from 'axios';
//Import ToastContainer
import { ToastContainer, toast } from 'react-toastify';
//Import useNavigate from react-router-dom for programmatic navigation
import { Link, useNavigate } from 'react-router-dom';
//Import toast for notifications
import 'react-toastify/dist/ReactToastify.css';

// Functional component for user login
const Login = ({ onLogin }) => {
  // State variables for login form fields and error message
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  // Access the navigate function from react-router-dom for redirection
  const navigate = useNavigate();

  // Function to handle form submission
  const handleLogin = async (e) => {
    // Prevent the default form submission behavior
    e.preventDefault();

        // Check if any of the required fields is empty
        if (!email || !password) {
          
          toast.error('All fields are mandatory');
          return;
        }
        
    try {
      setLoading(true); 

      // Make a POST request to the backend API for user login
      const response = await axios.post('https://salesapp-backend.onrender.com/auth/login', {
        email,
        password,
      });

      // console.log('Login response:', response);

      // Extract the token from the response data
      const token = response.data.token;
      // Decode the JWT to get user ID

      // Add the token to the headers for subsequent requests
      // axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      
      // Save the token in session storage
      sessionStorage.setItem('token', token);

      // Call the onLogin callback with the user data
      onLogin(response.data.user)

      setEmail("");
      setPassword("")
      toast.success("User Authenticated.. Login Success!");
      
      // Delay navigation for a short time to allow the loading animation to be visible
      setTimeout(() => {
        navigate('/addSales');
      }, 3000); // Adjust the delay time as needed
    } catch (error) {
      // Log and handle errors
      console.error('Login error:', error.response);

      if (error.response && error.response.status === 401) {
        toast.error('Invalid email or password. Please try again.');
      } else {
        toast.error('An unexpected error occurred. Please try again later.');
      }
    }
    finally{
      setLoading(false);
    }
  };


  

  // JSX for the component
  return (
    <div className="container">

      <h2 className="text-center my-4">LOGIN FORM</h2>
      <span className='login-spinner-container'>
        {loading && 
          <>
            <div className="loading-spinner"></div>
            <div className='ms-2'>Redirecting please wait...</div>
          </>
        }
        
      </span>
      <form onSubmit={handleLogin} className='mb-3'>
        
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email</label>
          
          <input 
            type="email" 
            className="form-control" 
            id="email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          
          <input 
            type="password" 
            className="form-control" 
            id="password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        
        <button type="submit" className="btn btn-primary">Submit</button>
        <div>
          <Link to="/">Don't have a account? Create now</Link>
        </div>
      </form>
      
      <ToastContainer />
      {/* Conditional rendering of error message if there is an error */}
      {/* {error && 
        <div className='alert alert-danger'>{error}</div>
      } */}
    </div>
  );
};

// Export the Login component
export default Login;
