import React, { useState } from "react";
import { firestore, storage } from "../../Firebase"; // Assuming you have Firebase initialized
import "./CreateCourse.scss"; // Your CSS file for styling
import Modal from "../../Components/Widgets/Modal/Modal";
import { FaUpload } from "react-icons/fa";
import NavBar from "../../Components/Widgets/NavBar/NavBar";
import useLoggedInUser from "../../loggedInUser";
import { useAuth } from "../../auth";

const CreateCourse = () => {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [videos, setVideos] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [videoTitle, setVideoTitle] = useState("");
  const [videoDescription, setVideoDescription] = useState("");
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [thumbnail, setThumbnail] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [courseThumbnailPreview, setCourseThumbnailPreview] = useState(null);
  const [courseThumbnail, setCourseThumbnail] = useState(null);
  const [level, setLevel] = useState("beginner");
  const { loggedInUser } = useAuth();

  const uid = localStorage.getItem("uid");

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleVideoSelect = (e) => {
    const file = e.target.files[0];
    setSelectedVideo(file);
    // Generate thumbnail here if needed
  };

  const handleCourseThumbnailSelect = (e) => {
    const file = e.target.files[0];
    setCourseThumbnail(file);
    // Preview the selected image
    const reader = new FileReader();
    reader.onload = () => {
      setCourseThumbnailPreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleThumbnailSelect = (e) => {
    const file = e.target.files[0];
    setThumbnail(file);
  };

  const handleAddVideo = () => {
    const videoData = {
      title: videoTitle,
      description: videoDescription,
      video: selectedVideo,
      thumbnail: thumbnail,
    };

    console.log("videoData", videoData);
    setVideos([...videos, videoData]);
    setIsModalOpen(false);
    setVideoTitle("");
    setVideoDescription("");
    setSelectedVideo(null);
    setThumbnail(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsUploading(true);

    try {
      // Upload course thumbnail to Firebase Storage
      const thumbnailRef = storage
        .ref()
        .child(`${uid}/${title}/${courseThumbnail.name}`);
      const thumbnailSnapshot = await thumbnailRef.put(courseThumbnail);
      const thumbnailUrl = await thumbnailSnapshot.ref.getDownloadURL();

      const courseRef = await firestore.collection("courses").add({
        title,
        price,
        description,
        createdBy: uid,
        creationTime: new Date.now(),
        lastUpdated: new Date.now(),
        reviews: [],
        courseThumbnail: thumbnailUrl,
        studentsEnrolled: [],
        level,
        instructorName: loggedInUser.name,
      });

      setTitle("");
      setPrice("");
      setDescription("");
      setVideos([]);
      setIsUploading(false);
      setUploadProgress(0);
    } catch (error) {
      console.error("Error creating course:", error);
      setIsUploading(false);
    }
  };

  const handleRemoveVideo = (index) => {
    const updatedVideos = [...videos];
    updatedVideos.splice(index, 1);
    setVideos(updatedVideos);
  };

  return (
    <div className="createcoursepageContainer">
      <NavBar isBack={true} />
      <div className="create-course-page">
        <h2>Create Course</h2>
        <form>
          <label>Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <label>Price:</label>
          <input
            type="text"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
          <label>Description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
          <div className="level">
            <label>Level:</label>
            <select value={level} onChange={(e) => setLevel(e.target.value)}>
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </select>
          </div>
          <label htmlFor="courseImage">Course Thumbnail:</label>
          <input
            type="file"
            id="courseThumbnail"
            accept="image/*"
            onChange={handleCourseThumbnailSelect}
            required
            className="inputfile"
          />
          <label htmlFor="courseThumbnail" className="courseThumbnailLabel">
            <FaUpload />
            <p>Choose File</p>
          </label>

          {/* Preview of the selected course thumbnail */}
          {courseThumbnailPreview && (
            <div className="thumbnail-preview">
              <img
                src={courseThumbnailPreview}
                alt="Course Thumbnail Preview"
              />
            </div>
          )}
          <label>Videos:</label>
          <button onClick={handleModalOpen}>Add Video</button>
          {/* Display selected videos with titles */}
          {videos.map((videoData, index) => (
            <div key={index} className="video-preview">
              <div className="video-preview__info">
                <p>Title: {videoData.title}</p>
                <p>Description: {videoData.description}</p>
              </div>
              <div className="video-preview__media">
                <video src={URL.createObjectURL(videoData.video)} controls />
                {videoData.thumbnail && (
                  <img
                    src={URL.createObjectURL(videoData.thumbnail)}
                    alt="Thumbnail"
                  />
                )}
              </div>
              <button onClick={() => handleRemoveVideo(index)}>
                Remove Video
              </button>
            </div>
          ))}
          <Modal isOpen={isModalOpen} onClose={handleModalClose}>
            <h3>Add Video</h3>
            <form>
              <label>Title:</label>
              <input
                type="text"
                value={videoTitle}
                onChange={(e) => setVideoTitle(e.target.value)}
                required
              />
              <label>Description:</label>
              <textarea
                value={videoDescription}
                onChange={(e) => setVideoDescription(e.target.value)}
                required
              />
              <label>Select Video:</label>
              <input
                type="file"
                accept="video/*"
                onChange={handleVideoSelect}
                required
                id="selectVideo"
              />
              <label htmlFor="selectVideo">
                <FaUpload />
                <p>Choose Video</p>
              </label>
              {/* Display thumbnail */}
              {thumbnail && (
                <img
                  className="thumbnailPreview"
                  src={URL.createObjectURL(thumbnail)}
                  alt="Thumbnail"
                />
              )}
              {/* Button to select thumbnail */}
              <label>Select Thumbnail:</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleThumbnailSelect}
                required
                id="selectThumbnail"
              />
              <label htmlFor="selectThumbnail">
                <FaUpload />
                <p>Choose Thumbnail</p>
              </label>
              <button type="button" onClick={handleAddVideo}>
                Add Video
              </button>
            </form>
          </Modal>
          <div className="buttonContainer">
            {isUploading ? (
              <p>
                Uploading Course....
                <br />
                Please wait
              </p>
            ) : (
              <button onClick={handleSubmit}>Create Course</button>
            )}
            {isUploading && (
              <progress
                className="uploadProgress"
                value={uploadProgress}
                max="100"
              />
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateCourse;
