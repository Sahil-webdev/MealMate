import React, { useContext } from 'react'
import styles from "./ExploreMenu.module.css"
import { menu_list } from '../assets/asset'
import { StoreContext } from '../context/StoreContext'
import { NavLink } from 'react-router-dom'

const ExploreMenu = () => {

  const {category, setCategory} = useContext(StoreContext)


  return (
    <div className={styles.exploreMenu} id='exploreMenu'>
      <h1>Explor Our Menu</h1>
      <p className={styles.menuTxt}>Having the menu available online lets the reader know what you are offering. Use the menu to display deals and promotions.</p>
      <div className={styles.menuList}>
        {
          menu_list.map((item, index)=>{
            return(
              <div onClick={()=>setCategory(prev=>prev===item.menu_name ? "All" : item.menu_name)} key={index}>
                <img className={`${styles.menuImg} ${category === item.menu_name? styles.active : ""}`} src={item.menu_image} alt="" />
                <p className={styles.menuP}>{item.menu_name}</p>
              </div>
            )
          })
        }
      </div>
      <hr />
    </div>
  )
}

export default ExploreMenu