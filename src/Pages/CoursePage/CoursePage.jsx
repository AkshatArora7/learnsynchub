import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { firestore } from "../../Firebase";
import loading from "../../Components/Assets/loading.gif";
import "./CoursePage.scss";
import { FaPlayCircle } from "react-icons/fa";
import { useAuth } from "../../auth";

const CoursePage = () => {
  const { id } = useParams();
  const [courseData, setCourseData] = useState(null);
  const [videos, setVideos] = useState([]);
  const navigate = useNavigate();
  const { loggedInUser } = useAuth();

  const fetchVideos = async () => {
    if (isEnrolled()) {
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
    }
  };

  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        const courseRef = firestore.collection("courses").doc(id);
        const courseSnapshot = await courseRef.get();
        if (courseSnapshot.exists) {
          setCourseData(courseSnapshot.data());
        } else {
          console.log("Course not found");
        }

        await fetchVideos();
      } catch (error) {
        console.error("Error fetching course data:", error);
      }
    };

    fetchCourseData();
  }, [id]);

  const handleJoin = () => {
    navigate("/checkout", { state: { course: courseData, courseId: id } });
  };

  const handleVideoPlay = (videoId, videoSnapshot) => {
    navigate(`/course/${id}/video/${videoId}`, { state: { videoSnapshot } });
  };

  const isEnrolled = () => {
    return courseData.studentsEnrolled.includes(loggedInUser.uid);
  };

  if (!courseData) {
    return (
      <div className="loading">
        <img src={loading} alt="" />
      </div>
    );
  }

  return (
    <div className="course-page">
      <img
        className="course-thumbnail"
        src={courseData.courseThumbnail}
        alt="Course Thumbnail"
      />
      <div className="all-course-details">
        <div className="course-basic-details">
          <div className="title-container">
            <h1 className="course-title">{courseData.title}</h1>
            {isEnrolled() ? (
              <div></div>
            ) : (
              <div className="join-button" onClick={handleJoin}>
                Join Now for ${courseData.price}
              </div>
            )}
          </div>
          <p className="course-description">{courseData.description}</p>
          <p className="course-instructor">
            Instructor: {courseData.instructorName}
          </p>
          <p className="course-time">
            Creation Time: {new Date(courseData.creationTime).toLocaleString()}
          </p>
          <p className="course-videos">Number of Videos: {videos.length}</p>

          <ul className="reviews">
            <h2>Reviews</h2>
            {courseData.reviews.map((review, index) => (
              <li key={index} className="review-item">
                <p>{review}</p>
              </li>
            ))}
          </ul>
        </div>

        <div className="video-list">
          <h2>Videos</h2>
          {isEnrolled() ? (
            <ul className="videos-container">
              {videos.map((video, index) => (
                <li key={index} className="video-item">
                  <div
                    className="video-thumbnail"
                    onClick={() => {
                      handleVideoPlay(video.id, video);
                    }}
                  >
                    <img src={video.thumbnailUrl} alt="" />
                    <div className="play-overlay">
                      <FaPlayCircle />
                    </div>
                  </div>
                  <h3>{video.title}</h3>
                  <p>Description: {video.description}</p>
                </li>
              ))}
            </ul>
          ) : (
            <div>Enroll to see videos</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CoursePage;
