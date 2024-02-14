import React, { useState } from 'react'
import { IoMdSettings } from "react-icons/io";
import { IoLogOutOutline } from 'react-icons/io5'
import './NavBar.scss'
import ProfilePopOut from '../ProfilePopOut/ProilePopOut'

const NavBar = ({handleLogout}) => {

    const [isProfilePopupOpen, setIsProfilePopupOpen] = useState(false);

    const toggleProfilePopup = () => {
        setIsProfilePopupOpen(!isProfilePopupOpen);
      };
    
  return (
    <nav>
        <h1>LearnSync Hub</h1>
      <div className="actionButtons">
      <div onClick={handleLogout}><IoLogOutOutline /></div>
      <div onClick={toggleProfilePopup}><IoMdSettings /></div>
      {isProfilePopupOpen && <ProfilePopOut onClose={toggleProfilePopup} />}
      </div>
    </nav>
  )
}

export default NavBar