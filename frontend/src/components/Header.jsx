import React from 'react'
import styles from "./Header.module.css"
import { Link } from 'react-router-dom'

const Header = () => {
    return (
        <div className={styles.header}>
            <div className={styles.headerContent}>
                <h2 className='text-white font-semibold text-6xl max-w-2xl mb-6'>Order your favourite food here</h2>
                <p className={styles.para1}>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Atque exercitationem illo soluta quaerat reiciendis, alias labore, voluptatibus sapiente eos, laborum maxime necessitatibus sapiente.</p>
                <Link to="/menu"><button className={styles.headBtn}>View Menu</button></Link>
            </div>
        </div>
    )
}

export default Header