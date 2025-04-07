import React from 'react'
import logo from "../assets/finallogo.png"
import profile from "../assets/profile.png"
import styles from "./Navbar.module.css"

const Navbar = () => {
  return (
    <div className={styles.navbarContainer}>
      <img className={styles.logo} src={logo} alt="" />
      <img className={styles.profile} src={profile} alt="" />
    </div>
  )
}

export default Navbar