import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { firestore } from "../../Firebase";
import loading from "../../Components/Assets/loading.gif";
import "./CoursePage.scss";
import Modal from "../../Components/Widgets/Modal/Modal";
import { FaPlayCircle } from "react-icons/fa";
import { useAuth } from "../../auth";
import { FaStar } from "react-icons/fa";
import NavBar from "../../Components/Widgets/NavBar/NavBar";

const CoursePage = () => {
  const { id } = useParams();
  const [courseData, setCourseData] = useState(null);
  const [videos, setVideos] = useState([]);
  const navigate = useNavigate();
  const { loggedInUser } = useAuth();
  const [instructor, setInstructor] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [reviewContent, setReviewContent] = useState("");
  const [reviewRating, setReviewRating] = useState(0);

  const [reviews, setReviews] = useState([]);

  const isEnrolled = () => {
    return courseData.studentsEnrolled.includes(loggedInUser.uid);
  };

  const handleReviewSubmit = async () => {
    try {
      // Add review to Firestore
      await firestore.collection("reviews").add({
        courseId: id,
        userId: loggedInUser.uid,
        review: reviewContent,
        rating: reviewRating,
        createdAt: new Date(),
      });
      setIsModalOpen(false);
      setReviewContent("");
      setReviewRating(0);
    } catch (error) {
      console.error("Error adding review:", error);
    }
  };

  const handleReviewClick = () => {
    setIsModalOpen(true);
  };

  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        const courseRef = firestore.collection("courses").doc(id);
        const courseSnapshot = await courseRef.get();
        if (courseSnapshot.exists) {
          setCourseData(courseSnapshot.data());
          if (
            courseSnapshot.data().studentsEnrolled.includes(loggedInUser.uid)
          ) {
            try {
              const instructorRef = firestore
                .collection("users")
                .doc(courseSnapshot.data().createdBy);
              const instructorDoc = await instructorRef.get();
              if (instructorDoc.exists) {
                const instructorData = {
                  id: instructorDoc.id,
                  ...instructorDoc.data(),
                };
                setInstructor(instructorData);
              } else {
                console.log("Instructor not found");
              }
              const videosRef = firestore
                .collection("videos")
                .where("courseId", "==", id);
              const videosSnapshot = await videosRef.get();
              const videosData = videosSnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
              }));
              setVideos(videosData);

              const reviewsRef = firestore.collection("reviews").where("courseId", "==", id);
        const reviewsSnapshot = await reviewsRef.get();
        const reviewsData = await Promise.all(reviewsSnapshot.docs.map(async (doc) => {
          const reviewData = doc.data();
          const userRef = firestore.collection("users").doc(reviewData.userId);
          const userDoc = await userRef.get();
          if (userDoc.exists) {
            const userData = userDoc.data();
            return {
              id: doc.id,
              userName: userData.name,
              userPhotoURL: userData.photoURL,
              ...reviewData,
            };
          } else {
            console.log("User not found for review:", doc.id);
            return null;
          }
        }));
        setReviews(reviewsData.filter(review => review !== null));
            } catch (error) {
              console.error("Error fetching videos:", error);
            }
          }
        } else {
          console.log("Course not found");
        }
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

  const handleChat = () => {
    navigate(`/chat`, { state: { instructor: instructor } });
  };

  const handleStarClick = (rating) => {
    setReviewRating(rating);
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
      <NavBar isBack={true} />
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
              <div className="message-button" onClick={handleChat}>
                Message Instructor
              </div>
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
            <div className="reviewsHeader">
              <h2>Reviews</h2>
              <div className="addReviewButton" onClick={handleReviewClick}>
                Add Review
              </div>
            </div>
            {reviews.map((review, index) => (
              <li key={index} className="review-item">
                <div className="review-header">
                  <img
                    src={review.userPhotoURL}
                    alt="User Profile"
                    className="user-avatar"
                  />
                  <div className="user-info">
                    <h4>{review.userName}</h4>
                    <p>{review.createdAt.toDate().toLocaleDateString()}</p>
                  </div>
                  <div className="user-rating">
                    {[...Array(review.rating)].map((_, index) => (
                      <FaStar
                        key={index}
                        className="star filled"
                        color="gold"
                      />
                    ))}
                  </div>
                </div>
                <p className="review-content">{review.review}</p>
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
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div className="review-form">
          <h2>Add Review</h2>
          <textarea
            value={reviewContent}
            onChange={(e) => setReviewContent(e.target.value)}
            placeholder="Enter your review..."
            className="review-textarea"
          />
          <div className="rating-stars">
            {[...Array(5)].map((_, index) => {
              const ratingValue = index + 1;
              return (
                <FaStar
                  key={index}
                  className={
                    ratingValue <= reviewRating ? "star filled" : "star"
                  }
                  onClick={() => handleStarClick(ratingValue)}
                />
              );
            })}
          </div>
          <button onClick={handleReviewSubmit} className="submit-review-button">
            Submit Review
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default CoursePage;
