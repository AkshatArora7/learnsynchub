import React from "react";
import "./MainPage.scss";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../auth";
import CourseCard from "../../Components/Widgets/CourseCard/CourseCard";
import Course from "../../Models/Course";
import NavBar from "../../Components/Widgets/NavBar/NavBar";

const MainPage = () => {
  const courses = [
    new Course(
      1,
      "Introduction to React",
      50,
      "12/01/24",
      "Learn the basics of React",
      "John Doe",
      "$99",
      "4 weeks",
      "Beginner",
      "https://via.placeholder.com/250"
    ),
    new Course(
      2,
      "Intermediate React",
      30,
      "12/02/24",
      "Build on your React knowledge",
      "Jane Smith",
      "$149",
      "6 weeks",
      "Intermediate",
      "https://via.placeholder.com/250"
    ),
    new Course(
      3,
      "Advanced React",
      20,
      "12/03/24",
      "Master React concepts",
      "Alice Johnson",
      "$199",
      "8 weeks",
      "Advanced",
      "https://via.placeholder.com/250"
    ),
    new Course(
      4,
      "React Hooks",
      40,
      "12/04/24",
      "Explore React hooks",
      "Bob Smith",
      "$129",
      "5 weeks",
      "Intermediate",
      "https://via.placeholder.com/250"
    ),
  ];

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
      </div>
    </div>
  );
};

export default MainPage;
