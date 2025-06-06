import React, { useContext, useState } from 'react';
import { StoreContext } from '../context/StoreContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from './PlaceOrder.module.css'; // Same style reuse
import { toast } from 'react-toastify';
import { RxCross2 } from "react-icons/rx";
import { FaRegUser } from "react-icons/fa";
import { FaRegCopy } from "react-icons/fa";


const SplitPayment = () => {
  const { cartItems, food_list, url, token, getTotalCartAmount, setCartItems } = useContext(StoreContext);
  const [splitType, setSplitType] = useState("equal");
  const [participants, setParticipants] = useState(2);
  const [customAmounts, setCustomAmounts] = useState([]);
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);


  const totalAmount = getTotalCartAmount() + 2;

  const handleSplitType = (e) => {
    setSplitType(e.target.value);
    if (e.target.value === "custom") {
      setCustomAmounts(Array(participants).fill(0));
    }
  };

  const handlePopUp = () =>{
  }

  const handleParticipantsChange = (e) => {
    const count = parseInt(e.target.value);
    setParticipants(count);
    if (splitType === "custom") {
      setCustomAmounts(Array(count).fill(0));
    }
  };

  const handleCustomAmountChange = (index, value) => {
    const updated = [...customAmounts];
    updated[index] = parseFloat(value) || 0;
    setCustomAmounts(updated);
  };

  const getTotalCustomAmount = () => customAmounts.reduce((acc, val) => acc + val, 0);

  const orderItems = food_list.filter(item => cartItems[item._id] > 0).map(item => ({
    ...item,
    quantity: cartItems[item._id]
  }));

  const initPay = (order) => {
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: 'Split Payment',
      description: 'Split Payment',
      order_id: order.id,
      receipt: order.receipt,
      handler: async (response) => {
        console.log(response.data)
        // try {
        //   const res = await axios.post(url + '/api/order/verifySplitPayment', response, { headers: { token } });
        //   if (res.data.success) {
        //     navigate('/myorders');
        //     setCartItems({});
        //   }
        // } catch (err) {
        //   console.log(err);
        //   toast.error("Payment verification failed");
        // }
      }
    };
    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  const handleSubmit = async () => {
    if (splitType === "custom" && getTotalCustomAmount() !== totalAmount) {
      alert(`Custom split total must be ₹${totalAmount}`);
      return;
    }

    let orderData = {
      items: orderItems,
      addresss: addressData,
      amount: totalAmount,
      participants,
      splitType,
      customAmounts: splitType === "custom" ? customAmounts : [],
    };

    try {
      const response = await axios.post(url + "/api/order/split-payment", orderData, { headers: { token } });
      if (response.data.success) {
        // initPay(response.data.order);
        console.log(response.data);
      } else {
        alert("Order failed");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className={`${styles.container} blur`}>
        <div className={styles.orderLeft}>
          <p className={styles.title}>Split Payment</p>

          <div className='mb-4'>
            <label>Participants:</label>
            <select
              className='ml-3 px-3 py-1 rounded border bg-gray-200'
              value={participants}
              onChange={handleParticipantsChange}
            >
              {[...Array(9)].map((_, i) => (
                <option key={i} value={i + 2}>{i + 2}</option>
              ))}
            </select>
          </div>

          <div className='mb-4 flex '>
            <label className='mr-5'>
              <input
                type='radio'
                name='splitType'
                value='equal'
                checked={splitType === 'equal'}
                onChange={handleSplitType}
              /> Equal Split
            </label>
            <label>
              <input
                type='radio'
                name='splitType'
                value='custom'
                checked={splitType === 'custom'}
                onChange={handleSplitType}
              /> Custom Split
            </label>
          </div>

          {splitType === 'equal' ? (
            <p className='text-lg mt-2'>Each participant pays ₹{(totalAmount / participants).toFixed(2)}</p>
          ) : (
            <div className='space-y-3'>
              {customAmounts.map((amt, index) => (
                <input
                  key={index}
                  type='number'
                  value={amt}
                  onChange={(e) => handleCustomAmountChange(index, e.target.value)}
                  placeholder={`Participant ${index + 1}`}
                  className='block w-full px-3 py-1 border rounded'
                />
              ))}
              <p className='mt-2 text-sm text-gray-600'>Total entered: ₹{getTotalCustomAmount()}</p>
            </div>
          )}
        </div>

        <div className={styles.orderRight}>
          <div className={styles.cartTotal}>
            <h2>Cart Totals</h2>
            <div className={styles.totalDetails}>
              <p>Total Amount</p>
              <p>₹{totalAmount}</p>
            </div>
            <button onClick={handleSubmit} className={styles.btn}>Proceed to Pay</button>
          </div>
        </div>
      </div>

      <div className='py-6 px-11 rounded-2xl absolute right-120 bottom-40 bg-gray-300 flex flex-col'>
        <RxCross2 className='relative left-63 bottom-2 hover:scale-125 text-[20px] cursor-pointer' />

        <div className='flex justify-center items-center'>
          <FaRegUser />
          <p className='ml-3 pr-2 text-blue-800 underline'>https://rzp.io/rzp/SdRWj5a</p>
          <FaRegCopy className='cursor-pointer' />
        </div>

        <div className='flex mt-10 justify-center items-center'>
          <FaRegUser />
          <p className='ml-3 pr-2 text-blue-800 underline'>https://rzp.io/rzp/SdRWj5a</p>
          <FaRegCopy className='cursor-pointer' />
        </div>

        <div className='flex mt-10 justify-center items-center'>
          <FaRegUser />
          <p className='ml-3 pr-2 text-blue-800 underline'>https://rzp.io/rzp/SdRWj5a</p>
          <FaRegCopy className='cursor-pointer' />
        </div>

        <div className='flex mt-10 justify-center items-center'>
          <FaRegUser />
          <p className='ml-3 pr-2 text-blue-800 underline'>https://rzp.io/rzp/SdRWj5a</p>
          <FaRegCopy className='cursor-pointer' />
        </div>

        <button style={{backgroundColor:'tomato'}} type='submit' className='mt-9 py-3 rounded-2xl cursor-pointer'>Proceed to Pay</button>
      </div>

    </>
  );
};

export default SplitPayment;
