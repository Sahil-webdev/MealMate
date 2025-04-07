import React, { useContext } from 'react'
import styles from "./FoodDisplay.module.css"
import { StoreContext } from '../context/StoreContext'
import FoodItem from './FoodItem'
import ExploreMenu from './ExploreMenu'

const FoodDisplay = () => {

    const { food_list, category } = useContext(StoreContext)

    return (
        <div className={styles.foodDisplay} id='food-display'>
            <ExploreMenu />
            <h2 id='menu-heading'>Top Dishes</h2>
            <div className={styles.foodDisplayList}>
                {
                    food_list.map((item, index) => {
                        { console.log(category, item.category) }
                        if (category === "All" || category === item.category) {
                            return <FoodItem key={index} id={item._id} name={item.name} description={item.description} price={item.price} image={item.image} />
                        }
                    })
                }
            </div>
        </div>
    )
}

export default FoodDisplay