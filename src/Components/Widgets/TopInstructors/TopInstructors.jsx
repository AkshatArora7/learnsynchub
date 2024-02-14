import React from 'react'
import './TopInstructors.scss'
import { useNavigate } from 'react-router-dom';

const TopInstructors = ({instructor}) => {
    const navigate  = useNavigate();

    const handleClick = () => {
        navigate(`/instructor/${instructor.id}`);
      };

  return (
    <div onClick={handleClick} className='topInstrutors'>
        <img src={instructor.img} alt={instructor.name} />
    </div>
  )
}

export default TopInstructors