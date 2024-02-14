import React from 'react'
import { FaUserAlt } from "react-icons/fa";
import './CourseCard.scss'

const CourseCard = ({course}) => {
  return (
    <div className='card'>
        <img src={course.img} alt="Course Thumbnail" />
        <div className="card__details">
            <p className="card__title">{course.title}</p>
            <p className="card__instructor">-By {course.instructor}</p>
            <p className="card__shortDesc">{course.shortDesc}</p>
            <div className="card__footer">
            <p className="card__dateReleased">{course.dateReleased}</p>
            <p className="card__totalStudent"><FaUserAlt />{course.totalStudent}</p>
            </div>
        </div>
            <div className="card__joinBtn">Join Now</div>
    </div>
  )
}

export default CourseCard