import React from 'react'
import styles from "./Footer.module.css"
import logo from "../assets/finallogo.png"
import fblogo from "../assets/fblogo.png"
import tlogo from "../assets/tlogo.png"
import llogo from "../assets/llogo.png"

const Footer = () => {
  return (
    <div className={styles.footer} id='footer'>
      <div className={styles.footerContent}>
        <div className={styles.footerLeft}>
          <img src={logo} alt="" className={styles.footerLogo} />
          <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Vel assumenda ut maxime, odit explicabo sit soluta voluptates placeat. Doloribus, quo voluptatum dolores reiciendis praesentium quae nihil odit modi molestiae voluptate!</p>
          <div className={styles.socialIcons}>
            <img src={fblogo} alt="" />
            <img src={tlogo} alt="" />
            <img src={llogo} alt="" />
          </div>
        </div>

        <div className={styles.footerCenter}>
          <h2 className='font-bold text-[22px] text-white'>COMPANY</h2>
          <ul>
            <li>Home</li>
            <li>About Us</li>
            <li>Delivery</li>
            <li>Privacy Policy</li>
          </ul>
        </div>

        <div className={styles.footerRight}>
          <h2 className='font-bold text-[22px] text-white'>GET IN TOUCH</h2>
          <ul>
            <li>+1-223-7766553</li>
            <li>contact@mealmate.com</li>
          </ul>
        </div>
      </div>
      <hr />
      <p className={styles.copyright}>Copyright 2025 &copy; mealmate.com - All Right Reserved.   </p>
    </div>
  )
}

export default Footer