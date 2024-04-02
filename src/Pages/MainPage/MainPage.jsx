import React, { useEffect, useState } from "react";
import "./MainPage.scss";
import CourseCard from "../../Components/Widgets/CourseCard/CourseCard";
import NavBar from "../../Components/Widgets/NavBar/NavBar";
import Footer from "../../Components/Widgets/Footer/Footer";
import { firestore } from "../../Firebase";
import TopInstructors from "../../Components/Widgets/TopInstructors/TopInstructors";
import Loading from "../../Components/Widgets/Loading/Loading"

const MainPage = () => {
  const [courses, setCourses] = useState([])
  const [loading, setLoading] = useState(true);

  const [topInstructors, setTopInstructors] = useState([])



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

        const coursesSnapshot = await firestore.collection("courses").get();
        const coursesData = coursesSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setCourses(coursesData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching courses:", error.message);
      }
    };

    fetchCourses();
  }, []);


  if(loading){
    return <Loading/>
  }


  return (
    <div className="mainPage">
      <NavBar isBack={false} />
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
