import React from 'react';
import { useParams } from 'react-router-dom';
import instructors from '../../Data/instructors';


const InstructorProfile = () => {
  const { id } = useParams();

  const instructor = instructors.find(instructor => instructor.id === parseInt(id));

  if (!instructor) {
    return <div>Instructor not found</div>;
  }

  return (
    <div className='instructor-profile'>
      <img src={instructor.img} alt={instructor.name} />
      <h2>{instructor.name}</h2>
      <p>Email: {instructor.email}</p>
      <p>Bio: {instructor.bio}</p>
      {/* Additional information like courses, ratings, reviews, etc. */}
    </div>
  );
}

export default InstructorProfile;
