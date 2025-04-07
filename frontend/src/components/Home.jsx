import React, { useState } from 'react'
import Header from './Header'
import ExploreMenu from './ExploreMenu'
import FoodDisplay from './FoodDisplay'
import WelcomeBanner from './WelcomeBanner'

const Home = () => {

  // const [category, setCategory] = useState("All")


  return (
    <div>
      <Header />
      <ExploreMenu /> 
      {/* <FoodDisplay /> */}
      <WelcomeBanner />
    </div>
  )
}

export default Home