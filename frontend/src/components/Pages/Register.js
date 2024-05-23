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

// Functional component for user registration
const Register = () => {
  // State variables for user registration form fields and error message
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  
  // Access the navigate function from react-router-dom for redirection
  const navigate = useNavigate();

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!firstName || !lastName || !email || !password) {
      toast.error('All fields are mandatory');
      return;
    }

    try {
      const response = await axios.post('https://salesapp-backend.onrender.com/auth/register', {
        firstName,
        lastName,
        email,
        password,
      });
      
      sessionStorage.setItem('token', response.data.token);

      toast.success('User Registered Successfully! Redirecting to login page...');
      
      setFirstName('');
      setLastName('');
      setEmail('');
      setPassword('');

      setTimeout(() => {
        navigate('/login');
      }, 5000);

    } catch (err) {
      console.error(err.response);

      if (err.response && err.response.status === 400) {
        toast.error(err.response.data.message);
      } else {
        toast.error('An unexpected error occurred. Please try again later.');
      }
    }
  };

  // JSX for the component
  return (
    
    <div className="container">      
      <h2 className="text-center my-4">REGISTRATION FORM</h2>
      
      <form onSubmit={handleSubmit} className='mb-3'>
        
        <div className="mb-3">
          <label htmlFor="firstName" className="form-label">First Name</label>
          
          <input 
            type="text" 
            className="form-control" 
            id="firstName"
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </div>
        
        <div className="mb-3">
          <label htmlFor="lastName" className="form-label">Last Name</label>
          
          <input 
            type="text" 
            className="form-control" 
            id="lastName"
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </div>
        
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email</label>
          
          <input 
            type="email" 
            className="form-control" 
            id="email"
            //value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          
          <input 
            type="password" 
            className="form-control" 
            id="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        
        <button type="submit" className="btn btn-primary">Submit</button>
        <div>
          <Link to="/login">Already have an account? Login</Link>
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

// Export the Register component
export default Register;
