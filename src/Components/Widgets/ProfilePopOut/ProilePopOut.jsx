import React, { useState } from 'react';
import './ProfilePopOut.scss';
import { FaBook, FaUser } from 'react-icons/fa';
import { IoMdClose } from "react-icons/io";
import { PiChatsFill } from "react-icons/pi";



const ProfilePopOut = ({ onClose }) => {
  // State to manage which menu option is active
  const [activeMenu, setActiveMenu] = useState('');

  const handleMenuClick = (menu) => {
    setActiveMenu(menu);
  };

  return (
    <div className='my-profile-popup'>
      <div className='menu'>
        <button className={`menu-item ${activeMenu === 'profile' ? 'active' : ''}`} onClick={() => handleMenuClick('profile')}>Profile <FaUser /></button>
        <button className={`menu-item ${activeMenu === 'courses' ? 'active' : ''}`} onClick={() => handleMenuClick('courses')}>Courses Enrolled <FaBook /></button>
        <button className={`menu-item ${activeMenu === 'messages' ? 'active' : ''}`} onClick={() => handleMenuClick('messages')}>Messages <PiChatsFill /></button>
      </div>
      <button className='close-button' onClick={onClose}>Close <IoMdClose /></button>
    </div>
  );
};

export default ProfilePopOut;
