import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { firestore } from "../../Firebase";
import "./InstructorProfile.scss"; // Import the corresponding CSS file
import { FaStar } from "react-icons/fa";

const InstructorProfile = () => {
  const { id } = useParams();
  const [instructor, setInstructor] = useState(null);
  const [instructorCourses, setInstructorCourses] = useState([]);
  const [reviewsByCourse, setReviewsByCourse] = useState({});

  useEffect(() => {
    const fetchInstructorData = async () => {
      try {
        const instructorDoc = await firestore.collection("users").doc(id).get();
        if (instructorDoc.exists) {
          const instructorData = instructorDoc.data();
          setInstructor(instructorData);
          
          // Fetch courses created by the instructor
          const coursesSnapshot = await firestore.collection("courses").where("createdBy", "==", id).get();
          const coursesData = coursesSnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setInstructorCourses(coursesData);
          
          // Fetch reviews by course
          const reviewsSnapshot = await firestore.collection("reviews").where("instructorId", "==", id).get();
          const reviewsData = reviewsSnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          const reviewsByCourseData = reviewsData.reduce((acc, review) => {
            acc[review.courseId] = acc[review.courseId] || [];
            acc[review.courseId].push(review);
            return acc;
          }, {});
          setReviewsByCourse(reviewsByCourseData);
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

  const handleCourseClick =(id)=>{
    navigate(`/course/${id}`)
  }

  if (!instructor) {
    return <div className="instructor-profile">Loading...</div>;
  }

  return (
    <div className="instructor-profile">
      <div className="profileHeader">
      <div className="instructorImg">
      <img
        src={
         instructor.photoURL
        }
        alt={instructor.name}
      />
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
            <div key={course.id} className="course-tile" onClick={()=>{handleCourseClick(course.id)}}>
              <img src={course.courseThumbnail} alt={course.title} />
              <h4>{course.title}</h4>
              {/* Additional course information */}
            </div>
          ))}
        </div>
      </div>

      <div className="reviews-section">
        <h3>Reviews</h3>
        {instructorCourses.map((course) => (
          <div key={course.id} className="course-reviews">
            <h4>{course.title}</h4>
            <div className="reviews">
              {reviewsByCourse[course.id]?.map((review) => (
                <div key={review.userId} className="review">
                  {[...Array(review.rating)].map((_, index) => (
                    <FaStar
                      key={index}
                      className="reviewRating"
                      color="gold"
                    />
                  ))}
                  <p>{review.review}</p>
                  
                  {/* Additional review information */}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InstructorProfile;
