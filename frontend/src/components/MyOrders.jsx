import React, { useContext, useEffect, useState } from 'react'
import styles from "./MyOrders.module.css"
import {StoreContext} from "../context/StoreContext"
import axios from 'axios';
import parcel from "../assets/parcel.png"

const MyOrders = () => {

  const {url, token, symbol} = useContext(StoreContext);
  const [data, setData] = useState([]);

  const fetchOrders = async() =>{
    const response = await axios.post(url+"/api/order/userorders", {}, {headers:{token}});
    setData(response.data.data);
    console.log(response.data.data);
  }

  useEffect(()=>{
    if(token){
      fetchOrders();
    }
  },[token])

  return (
    <div className='my-4'>
      <h2 className='text-2xl font-bold'>My Orders</h2>
      <div className='mt-5 flex flex-col gap-4'>
        {data.map((order, index)=>{
          return(
            <div className='grid grid-cols-6 border border-orange-600 items-center gap-8 text-[14px] py-[10px] px-[20px] text-gray-700' key={index}>
              <img className='w-12' src={parcel} alt="parcel-img"/>
              <p>{order.items.map((item, index)=>{
                if(index === order.items.length-1){
                  return item.name+ " X " +item.quantity
                }else{
                  return item.name+ " X " +item.quantity+ ", "
                }
              })}</p>
              <p>{symbol} {order.amount}.00</p>
              <p>Items: {order.items.length}</p>
              <p><span>&#x25cf;</span> <b>{order.status}</b></p>
              <button className='bg-gray-300 border border-black py-1.5 px-4 cursor-pointer w-28'>Track Order</button>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default MyOrders