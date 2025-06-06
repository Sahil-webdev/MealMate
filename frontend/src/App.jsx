import React, { useState } from 'react'
import Navbar from './components/Navbar'
import { Route, Routes } from 'react-router-dom'
import Home from "./components/Home"
import PlaceOrder from "./components/PlaceOrder"
import Cart from "./components/Cart"
import Footer from './components/Footer'
import Login from './components/Login'
import FoodDisplay from './components/FoodDisplay'
import { ToastContainer } from 'react-toastify';
import MyOrders from './components/MyOrders'
import Aboutus from './components/Aboutus'
import SplitPayment from './components/SplitPayment'

const App = () => {

  const [showLogin, setShowLogin] = useState(false);

  return (
    <>
      {showLogin ? <Login setShowLogin={setShowLogin} /> : null}
      <div className='w-[85%] m-auto'>
      <ToastContainer />
        <Navbar setShowLogin={setShowLogin} />
        <hr />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/menu' element={<FoodDisplay />} />
          <Route path='/place-order' element={<PlaceOrder />} />
          <Route path='/aboutus' element={<Aboutus />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/myorders' element={<MyOrders />} />
          <Route path='/splitpayment' element={<SplitPayment />} />
        </Routes>
      </div>
      <Footer />
    </>
  )
}

export default App