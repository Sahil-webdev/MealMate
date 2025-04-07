import React, { useContext } from 'react'
import styles from "./Cart.module.css"
import { food_list } from '../assets/asset'
import { StoreContext } from '../context/StoreContext'
import { useNavigate } from 'react-router-dom'

const Cart = () => {

  const { currency, cartItems, food_list, removeFromCart, getTotalCartAmount, url } = useContext(StoreContext)
  const navigate = useNavigate();

  return (
    <div className={styles.cartContainer}>
      <div className={styles.cartItems}>
        <div className={styles.cartTitle}>
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <br />
        <hr />
        {food_list.map((item, index) => {
          if (cartItems[item._id] > 0) {
            return (
              <div key={index}>
                <div className={`${styles.itemsItem} ${styles.cartTitle}`}>
                  <img src={url+ "/images/" + item.image} alt="" />
                  <p>{item.name}</p>
                  <p>{currency}{item.price}</p>
                  <p>{cartItems[item._id]}</p>
                  <p>{currency}{item.price * cartItems[item._id]}</p>
                  <p onClick={()=>removeFromCart(item._id)} className='cursor-pointer'>X</p>
                </div>
                <hr />
              </div>
            )
          }
        })}
      </div>

      <div className={styles.amountSec}>
        <div className={styles.cartTotal}>
          <h2 className='font-bold text-2xl'>Cart Totals</h2>
          <div>
            <div className={styles.totalDetails}>
              <p>Subtotal</p>
              <p>{getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className={styles.totalDetails}>
              <p>Delivery Fee</p>
              <p>{getTotalCartAmount() === 0 ? 0 : 2}</p>
            </div>
            <hr />
            <div className={styles.totalDetails}>
              <p>Total</p>
              <p>{getTotalCartAmount() === 0 ? 0: getTotalCartAmount()+ 2}</p>
            </div>
          </div>
          <button onClick={()=>navigate('/place-order')} className={styles.btn}>PROCEED TO CHECKOUT</button>
        </div>
      </div>
    </div>
  )
}

export default Cart