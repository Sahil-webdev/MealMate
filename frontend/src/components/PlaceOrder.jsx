import React, { useContext, useEffect, useState } from 'react'
import styles from "./PlaceOrder.module.css"
import { StoreContext } from '../context/StoreContext'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import {toast} from "react-toastify"

const PlaceOrder = () => {

  const navigate = useNavigate();

  const {getTotalCartAmount, food_list, cartItems, setCartItems, url, token} =  useContext(StoreContext);

  const [data, setData] = useState({
    firstName:"",
    lastName:"",
    email:"",
    street:"",
    city:"",
    state:"",
    zipcode:"",
    countary:"",
    phone:""
  })

  const onChangeHandler = (event) =>{
    const name = event.target.name;
    const value = event.target.value;
    setData(data=>({...data,[name]:value}));
  }

  const initPay = (order) =>{
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: 'Order Payment',
      description: 'Order Payment',
      order_id: order.id,
      receipt: order.receipt,
      handler: async (response)=>{
        console.log(response);
        try {
          const {data} = await axios.post(url + '/api/order/verifypayment', response, {headers:{token}})
          if(data.success){
            navigate('/myorders');
            setCartItems({})
          }
        } catch (error) {
          console.log(error);
          toast.error(error)
        }
      }
    }
    const rzp = new window.Razorpay(options)
    rzp.open()
  }

  useEffect(()=>{
    console.log(data);
  },[data])

  const handleSubmitBtn = async(event) =>{
    event.preventDefault();  
    let orderItems = [];
    food_list.map((item)=>{
      if(cartItems[item._id]>0){
        let itemInfo = item;
        itemInfo["quantity"]= cartItems[item._id];
        orderItems.push(itemInfo)
      }
    })

    let orderData = {
      address: data,
      items: orderItems,
      amount: getTotalCartAmount() + 2
    };

    let response = await axios.post(url + "/api/order/place", orderData, {headers:{token}})
    if(response.data.success){
      initPay(response.data.order)
    }
    else{
      alert("Error");
    }
  }

  return (
    <form className={styles.container} onSubmit={handleSubmitBtn}>
      <div className={styles.orderLeft}>
        <p className={styles.title}>Delivery Information</p>

        <div className={styles.multiFields}>
          <input name='firstName' onChange={onChangeHandler} value={data.firstName} type="text" placeholder='First Name' required />
          <input name='lastName' onChange={onChangeHandler} value={data.lastName} type="text" placeholder='Last Name' required />
        </div>

        <input name='email' onChange={onChangeHandler} value={data.email} type="email" placeholder='Your Email Address' required />
        <input name='street' onChange={onChangeHandler} value={data.street} type="text" placeholder='Street' required />

        <div className={styles.multiFields}>
          <input name='city' onChange={onChangeHandler} value={data.city}  type="text" placeholder='City' required />
          <input name='state' onChange={onChangeHandler} value={data.state}  type="text" placeholder='State' required />
        </div>

        <div className={styles.multiFields}>
          <input name='zipcode' onChange={onChangeHandler} value={data.zipcode}  type="text" placeholder='Zip Code' required />
          <input name='countary' onChange={onChangeHandler} value={data.countary}  type="text" placeholder='Country' required />
        </div>

        <input name='phone' onChange={onChangeHandler} value={data.phone}  type="number" placeholder='Phone Number' required />
      </div>

      <div className={styles.orderRight}>
      <div className={styles.cartTotal}>
          <h2>Cart Totals</h2>
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
              <p>{getTotalCartAmount() === 0 ? 0 : getTotalCartAmount()+ 2}</p>
            </div>
          </div>
          <button className={styles.btn}>PROCEED TO PAYMENT</button>
        </div>
      </div>
    </form>
  )
}

export default PlaceOrder