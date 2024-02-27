import React from "react";
import "./ProfilePopOut.scss";
import { FaBook, FaUpload, FaUser } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { PiChatsFill } from "react-icons/pi";
import { useAuth } from "../../../auth";
import { useNavigate } from "react-router-dom";

const ProfilePopOut = ({ onClose }) => {
  const { getUserId, loggedInUser } = useAuth();
  const navigate = useNavigate();


  const handleProfileClick = (uid) => {
    navigate(`/profile/${uid}`);
  };

  const handleClick = (destination)=>{
    navigate(`/${destination}`);
  }

  const handleCreateButton=()=>{
    navigate('/create')
  }

  console.log(loggedInUser)
  return (
    <div className="my-profile-popup">
      <div className="menu">
        <button
          className={`menu-item`}
          onClick={() => handleProfileClick(getUserId())}
        >
          Profile <FaUser />
        </button>
        {loggedInUser.isTeacher === true ? <button
          className={`menu-item`}
          onClick={() => handleCreateButton()}
        >
          Create <FaUpload />
        </button>:<></>}
        <button
          className={`menu-item`}
          onClick={() => handleClick("coursesEnrolled")}
        >
          Courses Enrolled <FaBook />
        </button>
        <button
          className={`menu-item`}
          onClick={() => handleClick("chat")}
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
