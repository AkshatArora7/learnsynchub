import React, { useState, useEffect, useRef } from "react";
import "./AccountsPage.scss";
import { FaEdit, FaSave } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { firestore } from "../../Firebase";
import { useAuth } from "../../auth";

const AccountsPage = () => {
  const { id } = useParams();
  const { loggedInUser } = useAuth();
  const [img, setImg] = useState(loggedInUser.photoURL);
  const [user, setUser] = useState(null);
  const [isEditingName, setIsEditingName] = useState(false);
  const [isEditingEmail, setIsEditingEmail] = useState(false);
  const [isEditingAddress, setIsEditingAddress] = useState(false);
  const [isTeacher, setIsTeacher] = useState(loggedInUser.isTeacher);

  const handleEditClick = (field) => {
    switch (field) {
      case "name":
        setIsEditingName(true);
        break;
      case "email":
        setIsEditingEmail(true);
        break;
      case "address":
        setIsEditingAddress(true);
        break;
      default:
        break;
    }
  };

  const handleSaveClick = (field) => {
    switch (field) {
      case "name":
        setIsEditingName(false);
        break;
      case "email":
        setIsEditingEmail(false);
        break;
      case "address":
        setIsEditingAddress(false);
        break;
      default:
        break;
    }

    alert("Profile details updated!");
  };

  const handleTeacherToggle = () => {
    firestore
      .collection("users")
      .doc(id)
      .update({
        isTeacher: !isTeacher,
      })
      .then(() => {
        console.log("User role updated successfully!");
        setIsTeacher(!isTeacher);
      })
      .catch((error) => {
        console.error("Error updating user role:", error);
      });
  };

  const handleSaveProfile = () => {

    alert("Profile saved!");
  };

  const fileInputRef = useRef(null);

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const imageUrl = reader.result;
        setImg(imageUrl);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  if (!loggedInUser) {
    return <div>Loading...</div>;
  }

  return (
    <div className="profilePage">
      <h2>User Profile</h2>
      <div className="profileInfo">
        <div className="avatarContainer inputContainer">
          <img src={img} alt="Avatar" className="avatar" />
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            style={{ display: "none" }}
            onChange={handleFileInputChange}
          />
          <button onClick={handleButtonClick}>
            <FaEdit />
          </button>
        </div>
        <div className="inputContainer">
          <div className="userInfo">
            <label>Name:</label>
            {isEditingName ? (
              <input
                type="text"
                value={loggedInUser.name}
                onChange={(e) =>
                  setUser({ ...loggedInUser, name: e.target.value })
                }
              />
            ) : (
              <div>{loggedInUser.name ?? <i>No Name</i>}</div>
            )}
          </div>
          {isEditingName ? (
            <button onClick={() => handleSaveClick("name")}>
              <FaSave />
            </button>
          ) : (
            <button onClick={() => handleEditClick("name")}>
              <FaEdit />
            </button>
          )}
        </div>
        <div className="inputContainer">
          <div className="userInfo">
            <label>Email:</label>
            {isEditingEmail ? (
              <input
                type="email"
                value={loggedInUser.email}
                onChange={(e) =>
                  setUser({ ...loggedInUser, email: e.target.value })
                }
              />
            ) : (
              <div>{loggedInUser.email}</div>
            )}
          </div>
          {isEditingEmail ? (
            <button onClick={() => handleSaveClick("email")}>
              <FaSave />
            </button>
          ) : (
            <button onClick={() => handleEditClick("email")}>
              <FaEdit />
            </button>
          )}
        </div>
        <div className="inputContainer">
          <div className="userInfo">
            <label>Address:</label>
            {isEditingAddress ? (
              <input
                type="text"
                value={user.address}
                onChange={(e) =>
                  setUser({ ...loggedInUser, address: e.target.value })
                }
              />
            ) : (
              <div>{loggedInUser.address ?? <i>No Address Updated</i>}</div>
            )}
          </div>
          {isEditingAddress ? (
            <button onClick={() => handleSaveClick("address")}>
              <FaSave />
            </button>
          ) : (
            <button onClick={() => handleEditClick("address")}>
              <FaEdit />
            </button>
          )}
        </div>
        <div className="inputContainer switchContainer">
          <label htmlFor="teacherSwitch">Teacher Mode</label>
          <input
            id="teacherSwitch"
            type="checkbox"
            checked={isTeacher}
            onChange={handleTeacherToggle}
          />
        </div>
        <button className="saveButton" onClick={handleSaveProfile}>Save Profile</button>
      </div>
    </div>
  );
};

export default AccountsPage;
