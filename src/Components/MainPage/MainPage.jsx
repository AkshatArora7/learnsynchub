import React from 'react'
import './MainPage.scss'
import { useNavigate } from 'react-router-dom';
import { auth } from '../../Firebase';
import { useAuth } from '../../auth';

const MainPage = () => {
  const navigate = useNavigate();
  const {logout} = useAuth();
  const handleLogout = async () => {
    try {
      await logout();
      console.log("User logged out successfully!");
      navigate('/login'); // Redirect to login page after logout
    } catch (error) {
      console.error("Error logging out:", error.message);
    }
  };
  return (
    <div>
      <h1>Main Page</h1>
      <button onClick={handleLogout}>Logout</button>
    </div>

  )
}

export default MainPage