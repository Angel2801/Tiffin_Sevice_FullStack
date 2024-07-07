import React from 'react'
import './Footer.css'
import { assets } from '../../assets/assets'
const Footer = () => {
  return (
    <div className='footer' id='footer'>
      <div className='footer-content'>
      <div className='footer-content-left'>
        <img src={assets.img6} alt='' style={{ width: '250px', height: '50px' }}></img>
        <div className='footer-social-icons'>
            <img src={assets.facebook_icon} alt='' style={{ width: '50px', height: '50px' }}></img>
            <img src={assets.instagram_icon} alt='' style={{ width: '50px', height: '50px' }}></img>
            <img src={assets.linkden_icon} alt='' style={{ width: '50px', height: '50px' }}></img>
        </div>
        </div>
        <div className='footer-content-center'>
            <h2>COMPANY</h2>
            <ul>
                <li>Home</li>
                <li>About Us</li>
                <li>Delivery</li>
                <li>Privacy Policy</li>
            </ul>
        </div>
        <div className='footer-content-right'>
            <h2>GET IN TOUCH</h2>
            <ul>
                <li>+91-9999999999</li>
                <li>meal.mate@mealmate.com</li>
            </ul>
        </div>
      </div>
      <hr></hr>
      <p className='footer-copyright'>Copyright 2024 © MealMate.com - All Right Reserved.</p>
    </div>
  )
}

export default Footer
