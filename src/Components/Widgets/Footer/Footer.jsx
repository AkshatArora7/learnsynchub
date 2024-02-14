import React from 'react'
import './Footer.scss'

const Footer = () => {
  return (
    <footer>
      <div className="brand">&copy; 2024 LearnSync Hub</div>
      <div className="morePages">
        <div className="extras">About Us</div>
        <div className="extras">Privacy Policy</div>
        <div className="extras">Contact</div>
      </div>
    </footer>
  )
}

export default Footer