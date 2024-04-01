import React, { useState } from "react";
import { IoMdSettings } from "react-icons/io";
import { IoLogOutOutline } from "react-icons/io5";
import { IoArrowBack } from "react-icons/io5";
import "./NavBar.scss";
import ProfilePopOut from "../ProfilePopOut/ProilePopOut";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../auth";

const NavBar = ({ isBack }) => {
  const [isProfilePopupOpen, setIsProfilePopupOpen] = useState(false);
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      console.log("User logged out successfully!");
      navigate("/login");
    } catch (error) {
      console.error("Error logging out:", error.message);
    }
  };

  const toggleProfilePopup = () => {
    setIsProfilePopupOpen(!isProfilePopupOpen);
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  const gotohome = ()=>{
    navigate("/");
  }

  return (
    <nav>
      {isBack == true ? (
        <div onClick={handleGoBack}>
          <IoArrowBack className="backButton" />
        </div>
      ) : (
        <></>
      )}
      <h1 onClick={gotohome} className="brandName">LearnSync Hub</h1>
      <div className="actionButtons">
        <div onClick={handleLogout}>
          <IoLogOutOutline />
        </div>
        <div onClick={toggleProfilePopup}>
          <IoMdSettings />
        </div>
        {isProfilePopupOpen && <ProfilePopOut onClose={toggleProfilePopup} />}
      </div>
    </nav>
  );
};

export default NavBar;
