import React, { useState } from "react";
import "./ProfilePopOut.scss";
import { FaBook, FaUpload, FaUser } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { PiChatsFill } from "react-icons/pi";
import { useAuth } from "../../../auth";
import { useNavigate } from "react-router-dom";

const ProfilePopOut = ({ onClose }) => {
  // State to manage which menu option is active
  const [activeMenu, setActiveMenu] = useState("");
  const { getUserId, loggedInUser } = useAuth();
  const navigate = useNavigate();

  const handleMenuClick = (menu) => {
    setActiveMenu(menu);
  };

  const handleProfileClick = (uid) => {
    navigate(`/profile/${uid}`);
  };

  const handleCreateButton=()=>{
    navigate('/create')
  }

  console.log(loggedInUser)
  return (
    <div className="my-profile-popup">
      <div className="menu">
        <button
          className={`menu-item ${activeMenu === "profile" ? "active" : ""}`}
          onClick={() => handleProfileClick(getUserId())}
        >
          Profile <FaUser />
        </button>
        {loggedInUser.isTeacher == true ? <button
          className={`menu-item ${activeMenu === "messages" ? "active" : ""}`}
          onClick={() => handleCreateButton()}
        >
          Create <FaUpload />
        </button>:<></>}
        <button
          className={`menu-item ${activeMenu === "courses" ? "active" : ""}`}
          onClick={() => handleMenuClick("courses")}
        >
          Courses Enrolled <FaBook />
        </button>
        <button
          className={`menu-item ${activeMenu === "messages" ? "active" : ""}`}
          onClick={() => handleMenuClick("messages")}
        >
          Messages <PiChatsFill />
        </button>
      </div>
      <button className="close-button" onClick={onClose}>
        Close <IoMdClose />
      </button>
    </div>
  );
};

export default ProfilePopOut;
