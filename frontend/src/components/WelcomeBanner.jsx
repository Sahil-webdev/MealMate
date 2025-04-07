import React from 'react'
import welcomeBanner from "../assets/welcomeBanner2.jpg"
import styles from "./WelcomeBanner.module.css"
import banner1 from "../assets/offerbanner1.jpg"
import banner2 from "../assets/offerbanner2.jpg"
import banner3 from "../assets/offerbanner3.jpg"


const WelcomeBanner = () => {
  return (
    <div>
      <div className={styles.offerBanner}>
        <div className={styles.bannerDiv}>
          <img className={`${styles.banner} `} src={banner1} alt="" />
        </div>
        <div className={styles.bannerDiv}>
          <img className={styles.banner} src={banner2} alt="" />
        </div>
        <div className={styles.bannerDiv}>
          <img  className={styles.banner} src={banner3} alt="" />
        </div>
      </div>

      <div className={styles.welcomeImg}>
      </div>
    </div>
  )
}

export default WelcomeBanner