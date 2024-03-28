import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { firestore } from "../../Firebase";
import "./InstructorProfile.scss"; // Import the corresponding CSS file
import { FaStar } from "react-icons/fa";
import NavBar from "../../Components/Widgets/NavBar/NavBar";
import Loading from "../../Components/Widgets/Loading/Loading";

const InstructorProfile = () => {
  const { id } = useParams();
  const [instructor, setInstructor] = useState(null);
  const [instructorCourses, setInstructorCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInstructorData = async () => {
      try {
        const instructorDoc = await firestore.collection("users").doc(id).get();
        if (instructorDoc.exists) {
          const instructorData = instructorDoc.data();
          setInstructor(instructorData);

          // Fetch courses created by the instructor
          const coursesSnapshot = await firestore
            .collection("courses")
            .where("createdBy", "==", id)
            .get();
          const coursesData = coursesSnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setInstructorCourses(coursesData);
          setLoading(false);
        } else {
          console.log("Instructor not found");
        }
      } catch (error) {
        console.error("Error fetching instructor data:", error);
      }
    };

    fetchInstructorData();
  }, [id]);

  const navigate = useNavigate();

  const handleCourseClick = (id) => {
    navigate(`/course/${id}`);
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="instructor-profile">
      <NavBar isBack={true} />
      <div className="profileHeader">
        <div className="instructorImg">
          <img src={instructor.photoURL} alt={instructor.name} />
        </div>
        <div className="profile-details">
          <h2>{instructor.name}</h2>
          <p>
            <strong>Email:</strong> {instructor.email}
          </p>
        </div>
      </div>
      <div className="courses-section">
        <h3>Courses Created by {instructor.name}</h3>
        <div className="courses-container">
          {instructorCourses.map((course) => (
            <div
              key={course.id}
              className="course-tile"
              onClick={() => {
                handleCourseClick(course.id);
              }}
            >
              <img src={course.courseThumbnail} alt={course.title} />
              <h4>{course.title}</h4>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default InstructorProfile;
