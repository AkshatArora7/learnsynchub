import React, { useEffect, useState } from "react";
import "./MainPage.scss";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../auth";
import CourseCard from "../../Components/Widgets/CourseCard/CourseCard";
import NavBar from "../../Components/Widgets/NavBar/NavBar";
import Footer from "../../Components/Widgets/Footer/Footer";
import instructors from "../../Data/instructors";
import { firestore } from "../../Firebase";
import TopInstructors from "../../Components/Widgets/TopInstructors/TopInstructors";

const MainPage = () => {
  const [courses, setCourses] = useState([])

  // const topInstructors = instructors.sort((a, b) => b.getAverageRating() - a.getAverageRating()).slice(0, 7);
  const [topInstructors, setTopInstructors] = useState([])


  const navigate = useNavigate();
  const { logout } = useAuth();
  const handleLogout = async () => {
    try {
      await logout();
      console.log("User logged out successfully!");
      navigate("/login");
    } catch (error) {
      console.error("Error logging out:", error.message);
    }
  };


  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const instructorsSnapshot = await firestore
        .collection("users")
        .where("isTeacher", "==", true)
        .get();
      const instructorsData = instructorsSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTopInstructors(instructorsData);

        const coursesSnapshot = await firestore.collection("courses").limit(8).get();
        const coursesData = coursesSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setCourses(coursesData);
      } catch (error) {
        console.error("Error fetching courses:", error.message);
      }
    };

    fetchCourses();
  }, []);




  return (
    <div className="mainPage">
      <NavBar handleLogout={handleLogout} />
      <div className="mainPageWrapper">
        <div className="courses">
          <h3>Available Courses</h3>
          <div className="course-list">
            {courses.map((course, index) => (
              <CourseCard key={index} course={course} />
            ))}
          </div>
        </div>
        <div className="topInstructors">
          <h3>Top Instructors</h3>
          <div className="instructorsList">

            {topInstructors.map((instructor, index) => (
              <TopInstructors key={index} instructor={instructor} />
              ))}
              </div>
        </div>
      </div>
        <Footer/>
    </div>
  );
};

export default MainPage;
