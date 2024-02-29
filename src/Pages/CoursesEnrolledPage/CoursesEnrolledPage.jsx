import React, { useState, useEffect } from "react";
import { useAuth } from "../../auth"; // Assuming you have an auth context
import { firestore } from "../../Firebase"; // Assuming you have Firestore initialized
import "./CoursesEnrolledPage.scss";
import loadingGif from "../../Components/Assets/loading.gif";
import { useNavigate } from "react-router-dom";

const CoursesEnrolledPage = () => {
  const { getUserId } = useAuth();
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEnrolledCourses = async () => {
      try {
        const userId = getUserId(); // Get the current user's ID
        const coursesRef = firestore.collection("courses");
        const querySnapshot = await coursesRef
          .where("studentsEnrolled", "array-contains", userId)
          .get();
        const coursesData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setEnrolledCourses(coursesData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching enrolled courses:", error);
        setError("Failed to fetch enrolled courses. Please try again later.");
        setLoading(false);
      }
    };

    fetchEnrolledCourses();
  }, [getUserId]);

  const handleCourseClick = (courseId) => {
    navigate(`/course/${courseId}`);
  };

  if (loading) {
    return (
      <div className="loading">
        <img src={loadingGif} alt="" />
      </div>
    );
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="courses-enrolled-page">
      <h2>Courses Enrolled</h2>
      <ul>
        {enrolledCourses.map((course) => (
          <li key={course.id} className="course-card">
            <div className="course-details">
            <h3>{course.title}</h3>
            <p>{course.description}</p>
            </div>

            <button onClick={() => handleCourseClick(course.id)}>
              Go to Course
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CoursesEnrolledPage;
