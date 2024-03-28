import React, { useState } from 'react'
import './RegisterForm.scss'
import { FaUser, FaLock  } from "react-icons/fa";
import { Link, Navigate, useNavigate } from 'react-router-dom';
import loadingGIF from "../../Components/Assets/loading.gif"
import { useAuth } from '../../auth';



const RegisterForm = () => {
  const [email, setEmail] = useState('');
  const { register } = useAuth();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);


  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await register(email, password, confirmPassword); 
      navigate('/');
    } catch (error) {
      console.error("Error registering user:", error.message);
    }


    setLoading(false);
  };

  const storedAuth = localStorage.getItem("isAuthenticated");

  if (storedAuth === "true") {
    return <Navigate to="/" />;
  }

  return (
    <div className='register'>
        <div className="register__wrapper">
        <form onSubmit={handleSubmit}>
            <h1>Register</h1>
            <div className='register__inputBox'>
                <input type='email' placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} required/>
                <FaUser className='register__icon'/>
            </div>
            <div className='register__inputBox'>
                <input type='password' placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} required/>
                <FaLock className='register__icon'/>
            </div>
            <div className='register__inputBox'>
                <input type='password' placeholder='Re-Enter Password' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required/>
                <FaLock className='register__icon'/>
            </div>
            <button className='register__submitBtn' type='submit'>
            {loading ? (
              <img src={loadingGIF} alt="Loading..." />
            ) : (
              "Register"
            )}
            </button>
            <div className="register__registerLink">
                <p>Already have an account? <Link to='/login'>Login</Link> </p>
            </div>
        </form>
        </div>
    </div>
  )
}

export default RegisterForm