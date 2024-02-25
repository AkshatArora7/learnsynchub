import React, { useState, useEffect, useRef } from "react";
import "./AccountsPage.scss";
import { FaEdit, FaSave } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { firestore } from "../../Firebase";

const AccountsPage = () => {
  const { id } = useParams(); // Get the ID from the URL params
  const [img, setImg] = useState('https://avatar.iran.liara.run/public/8');
  const [user, setUser] = useState(null);
  const [isEditingName, setIsEditingName] = useState(false);
  const [isEditingEmail, setIsEditingEmail] = useState(false);
  const [isEditingAddress, setIsEditingAddress] = useState(false);
  

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userRef = firestore.collection("users").doc(id);
        const userData = await userRef.get();
        if (userData.exists) {
          setUser(userData.data());
        } else {
          console.log("User not found");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [id]);

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
    // You can add save functionality here
    alert("Profile details updated!");
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

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="profilePage">
      <h2>User Profile</h2>
      <div className="profileInfo">
      <div className="avatarContainer inputContainer">
        <img
          src={img}
          alt="Avatar"
          className="avatar"
        />
        <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        style={{ display: 'none' }}
        onChange={handleFileInputChange}
      />
      <button onClick={handleButtonClick}>
      <FaEdit/>
      </button>
      </div>
        <div className="inputContainer">
          <div className="userInfo">
            <label>Name:</label>
            {isEditingName ? (
              <input
                type="text"
                value={user.name}
                onChange={(e) => setUser({ ...user, name: e.target.value })}
              />
            ) : (
              <div>{user.name ?? <i>No Name</i>}</div>
            )}
          </div>
          {isEditingName ? (
            <button onClick={() => handleSaveClick("name")}><FaSave/></button>
          ) : (
            <button onClick={() => handleEditClick("name")}><FaEdit/></button>
          )}
        </div>
        <div className="inputContainer">
          <div className="userInfo">
            <label>Email:</label>
            {isEditingEmail ? (
              <input
                type="email"
                value={user.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
              />
            ) : (
              <div>{user.email}</div>
            )}
          </div>
          {isEditingEmail ? (
            <button onClick={() => handleSaveClick("email")}><FaSave/></button>
          ) : (
            <button onClick={() => handleEditClick("email")}><FaEdit/></button>
          )}
        </div>
        <div className="inputContainer">
          <div className="userInfo">
            <label>Address:</label>
            {isEditingAddress ? (
              <input
                type="text"
                value={user.address}
                onChange={(e) => setUser({ ...user, address: e.target.value })}
              />
            ) : (
              <div>{user.address?? <i>No Address Updated</i>}</div>
            )}
          </div>
          {isEditingAddress ? (
            <button onClick={() => handleSaveClick("address")}><FaSave/></button>
          ) : (
            <button onClick={() => handleEditClick("address")}><FaEdit/></button>
          )}
        </div>
      </div>
    </div>
  );
};

export default AccountsPage;
