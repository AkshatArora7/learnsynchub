import React, { useState, useRef } from "react";
import "./AccountsPage.scss";
import { FaEdit, FaSave } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { firestore, storage } from "../../Firebase";
import { useAuth } from "../../auth";

const AccountsPage = () => {
  const { id } = useParams();
  const { loggedInUser } = useAuth();
  const [user, setUser] = useState(loggedInUser);
  const [img, setImg] = useState(loggedInUser.photoURL);
  const [nameInput, setNameInput] = useState(loggedInUser.name);
  const [emailInput, setEmailInput] = useState(loggedInUser.email);
  const [addressInput, setAddressInput] = useState(loggedInUser.address);
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
        setUser({ ...loggedInUser, name: nameInput }); // Update loggedInUser with new name
        break;
      case "email":
        setIsEditingEmail(false);
        setUser({ ...loggedInUser, email: emailInput }); // Update loggedInUser with new email
        break;
      case "address":
        setIsEditingAddress(false);
        setUser({ ...loggedInUser, address: addressInput }); // Update loggedInUser with new address
        break;
      default:
        break;
    }
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

  const handleSaveProfile = async () => {
    try {
      if (img !== loggedInUser.photoURL) {
        // If a new image was uploaded
        const storageRef = storage.ref(); // Get a reference to the storage root
        const imageRef = storageRef.child(
          `user_images/${loggedInUser.uid}/${img.name}`
        ); // Create a reference to the image file

        // Upload the image to Firebase Storage
        const snapshot = await imageRef.putString(img, "data_url");

        // Get the download URL of the uploaded image
        const downloadURL = await snapshot.ref.getDownloadURL();

        // Update the photoURL field in Firestore with the new download URL
        await firestore.collection("users").doc(loggedInUser.uid).update({
          photoURL: downloadURL,
        });
      }

      // Update other profile fields in Firestore
      await firestore.collection("users").doc(loggedInUser.uid).update({
        name: nameInput,
        email: emailInput,
        address: addressInput,
      });

      alert("Profile saved!");
    } catch (error) {
      console.error("Error saving profile:", error);
      alert("Failed to save profile. Please try again later.");
    }
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
                value={nameInput}
                onChange={(e) => setNameInput(e.target.value)}
              />
            ) : (
              <div>{nameInput ?? <i>No Name</i>}</div>
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
                value={emailInput}
                onChange={(e) => {
                  setEmailInput(e.target.value);
                }}
              />
            ) : (
              <div>{emailInput}</div>
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
                value={addressInput}
                onChange={(e) => {setAddressInput(e.target.value)}}
              />
            ) : (
              <div>{addressInput ?? <i>No Address Updated</i>}</div>
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
        <button className="saveButton" onClick={handleSaveProfile}>
          Save Profile
        </button>
      </div>
    </div>
  );
};

export default AccountsPage;
