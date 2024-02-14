import React from 'react'
import { FaUserGraduate } from 'react-icons/fa'
import { IoLogOutOutline } from 'react-icons/io5'
import './NavBar.scss'

const NavBar = ({handleLogout}) => {
  return (
    <nav>
        <h1>LearnSync Hub</h1>
      <div className="actionButtons">
      <div onClick={handleLogout}><IoLogOutOutline /></div>
      <div><FaUserGraduate /></div>
      </div>
    </nav>
  )
}

export default NavBar