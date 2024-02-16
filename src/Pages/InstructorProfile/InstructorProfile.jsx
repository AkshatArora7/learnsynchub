import React from "react";
import { useParams } from "react-router-dom";
import instructors from "../../Data/instructors";
import courses from "../../Data/courses"; // Assuming you have a list of courses
import "./InstructorProfile.scss"; // Import the corresponding CSS file
import { FaStar } from "react-icons/fa";

const InstructorProfile = () => {
  const { id } = useParams();

  const instructor = instructors.find(
    (instructor) => instructor.id === parseInt(id)
  );
  console.log("INSTRUCTOR: ", instructor);
  if (!instructor) {
    return <div className="instructor-profile">Instructor not found</div>;
  }

  // Get courses created by the instructor
  const instructorCourses = instructor.courses.map((course) =>
    courses.find((courseData) => courseData.courseId === course.courseId)
  );
  console.log("Instructor Courses: ", instructorCourses);

  // Group reviews by course
  const reviewsByCourse = instructor.reviews.reduce((acc, review) => {
    acc[review.courseId] = acc[review.courseId] || [];
    acc[review.courseId].push(review);
    return acc;
  }, {});

  return (
    <div className="instructor-profile">
      <div className="profile-details">
        <h2>{instructor.name}</h2>
        <p>
          <strong>Email:</strong> {instructor.email}
        </p>
        <p>
          <strong>Bio:</strong> {instructor.bio}
        </p>
      </div>

      <div className="courses-section">
        <h3>Courses Created by {instructor.name}</h3>
        <div className="courses-container">
          {instructorCourses.map((course) => (
            <div key={course.id} className="course-tile">
              <img src={course.img} alt={course.title} />
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
