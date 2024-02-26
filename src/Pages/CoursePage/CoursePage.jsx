import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { firestore } from "../../Firebase";
import loading from "../../Components/Assets/loading.gif";
import "./CoursePage.scss";
import { FaPlayCircle } from "react-icons/fa";

const CoursePage = () => {
  const { id } = useParams();
  const [courseData, setCourseData] = useState(null);
  const [videos, setVideos] = useState([]);
  const navigate = useNavigate();


  useEffect(() => {
    // Function to fetch course data
    const fetchCourseData = async () => {
      try {
        const courseRef = firestore.collection("courses").doc(id);
        const courseSnapshot = await courseRef.get();
        if (courseSnapshot.exists) {
          setCourseData(courseSnapshot.data());
        } else {
          console.log("Course not found");
        }
      } catch (error) {
        console.error("Error fetching course data:", error);
      }
    };

    // Function to fetch videos
    const fetchVideos = async () => {
      try {
        const videosRef = firestore
          .collection("videos")
          .where("courseId", "==", id);
        const videosSnapshot = await videosRef.get();
        const videosData = videosSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setVideos(videosData);
      } catch (error) {
        console.error("Error fetching videos:", error);
      }
    };

    // Call the fetch functions
    fetchCourseData();
    fetchVideos();
  }, [id]);


  const handleVideoPlay=(videoId)=>{
    navigate(`/course/${id}/video/${videoId}}`)
  }

  if (!courseData) {
    return (
      <div className="loading">
        <img src={loading} alt="" />
      </div>
    );
  }

  return (
    <div>
      <h1>{courseData.title}</h1>
      <p>Price: {courseData.price}</p>
      <p>Description: {courseData.description}</p>
      <p>Created By: {courseData.instructorName}</p>
      {/* Display other course details */}

      <h2>Videos</h2>
      <ul className="video-list">
        {videos.map((video, index) => (
          <li key={index} className="video-item">
            <h3>{video.title}</h3>
            <p>Description: {video.description}</p>
            <div className="video-thumbnail" onClick={()=>{handleVideoPlay(video.id)}}>
              <img src={video.thumbnailUrl} alt="" />
              <div className="play-overlay">
                <FaPlayCircle />
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CoursePage;
