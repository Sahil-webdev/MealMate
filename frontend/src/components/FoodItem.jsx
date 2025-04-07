import React, { useContext, useState } from 'react'
import stars from "../assets/rating.png"
import { StoreContext } from '../context/StoreContext'
import styles from "./FoodItem.module.css"

const FoodItem = ({id, name, description, price, image}) => {

  const {currency,cartItems, addToCart, removeFromCart,  url} = useContext(StoreContext)

  return (
    <div className={styles.foodItem}>
        <div className={styles.itemImg}>
          <img src={url + "/images/" + image} alt="" />
          {
            !cartItems[id] 
            ? <i onClick={()=>addToCart(id)} className={`fa-solid fa-plus ${styles.blackAdd}`}></i>
            : <div className={styles.plusMinus}>
              <div className={styles.redMinusBg}><i onClick={()=>removeFromCart(id)} className={`fa-solid fa-minus ${styles.redMinus}`} style={{color: "#ff0000"}}></i></div>
              <p>{cartItems[id]}</p>
              <div className={styles.greenPlusBg}><i onClick={()=>addToCart(id)} className={`fa-solid fa-plus ${styles.greenAdd}`} style={{color: "#00ff04"}}></i></div>
            </div>
          }
        </div>
        <div className={styles.info}>
          <div className={styles.nameRating}>
            <p>{name}</p>
            <img className={styles.ratingImg} src={stars} alt="" />
          </div>
          <p className={styles.desc}>{description}</p>
          <p className={styles.price}>{currency}{price}</p>
        </div>
    </div>
  )
}

export default FoodItem