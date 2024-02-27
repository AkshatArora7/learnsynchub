import React, { useState, useEffect } from "react";
import { useAuth } from "../../auth"; // Assuming you have an auth context
import { firestore } from "../../Firebase"; // Assuming you have Firestore initialized

const CoursesEnrolledPage = () => {
  const { getUserId } = useAuth();
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEnrolledCourses = async () => {
      try {
        const userId = getUserId(); // Get the current user's ID
        const coursesRef = firestore.collection("courses");
        const querySnapshot = await coursesRef.where("studentsEnrolled", "array-contains", userId).get();
        const coursesData = querySnapshot.docs.map(doc => doc.data());
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

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h2>Courses Enrolled</h2>
      <ul>
        {enrolledCourses.map(course => (
          <li key={course.id}>
            <h3>{course.title}</h3>
            <p>{course.description}</p>
            {/* Display other course details */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CoursesEnrolledPage;
