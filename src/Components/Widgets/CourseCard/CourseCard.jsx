import React from "react";
import { FaUserAlt } from "react-icons/fa";
import "./CourseCard.scss";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../auth";
import { FaCheck } from "react-icons/fa";

const CourseCard = ({ course }) => {
  const { loggedInUser } = useAuth();
  const truncateDescription = (description) => {
    const words = description.split(" ");
    if (words.length > 5) {
      return words.slice(0, 5).join(" ") + "...";
    }
    return description;
  };

  const date = new Date(course.creationTime);
  const formattedDate = date.toLocaleDateString();
  const navigate = useNavigate();

  const handleJoin = () => {
    navigate(`/course/${course.id}`);
  };

  const isUserEnrolled = () => {
    return course.studentsEnrolled.includes(loggedInUser.uid);
  };

  return (
    <div className="card">
      <img src={course.courseThumbnail} alt="Course Thumbnail" />
      <div className="card__details">
        <p className="card__title">{course.title}</p>
        <p className="card__instructor">-By {course.instructorName}</p>
        <p className="card__shortDesc">
          {truncateDescription(course.description)}
        </p>
        <div className="card__footer">
          <p className="card__dateReleased">{formattedDate}</p>
          <p className="card__totalStudent">
            <FaUserAlt />
            {course.studentsEnrolled.length}
          </p>
        </div>
      </div>
      {isUserEnrolled() ? (
        <div className="card__alreadyenrolled">
          <FaCheck /> Enrolled Already
        </div>
      ) : (
        <div className="card__joinBtn" onClick={handleJoin}>
          Join Now
        </div>
      )}
    </div>
  );
};

export default CourseCard;
