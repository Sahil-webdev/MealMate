import React, { useContext, useState } from 'react'
import logo from "../assets/finallogo.png"
import { CiSearch } from "react-icons/ci";
import { BsBasket3Fill } from "react-icons/bs";
import styles from "./Navbar.module.css"
import { NavLink } from 'react-router-dom';
import { StoreContext } from '../context/StoreContext';
import { useNavigate } from "react-router-dom"


const Navbar = ({ setShowLogin }) => {

    const navigate = useNavigate();

    const [hrTag, setHrTag] = useState("home")
    const { getTotalCartAmount, setToken, token } = useContext(StoreContext)

    const logOut = () =>{
        navigate("/")
        localStorage.removeItem("token");
        setToken('')
    }


    return (
        <div className={`pt-8 pb-6 px-8 flex justify-between items-center ${styles.navbar}`}>
            <NavLink to="/" onClick={() => setHrTag("logo")} className={hrTag === "logo" ? setHrTag("home") : ""}><img src={logo} alt="logo" className={`w-[170px] h-[48px] ${styles.logo}`} /></NavLink>

            <ul className={`flex gap-5 list-none text-[18px] ${styles.navbarMenu}`}>
                <NavLink to="/" onClick={() => setHrTag("home")} className={hrTag === "home" ? `${styles.active}` : ""}>Home</NavLink>
                <NavLink to="/menu" onClick={() => setHrTag("menu")} className={hrTag === "menu" ? `${styles.active}` : ""}>Menu</NavLink>
                <a href='#footer' onClick={() => setHrTag("contact-us")} className={hrTag === "contact-us" ? `${styles.active}` : ""}>Contact Us</a>
            </ul>

            <div className='flex gap-10 text-2xl items-center'>
                <CiSearch className='text-[30px]' />
                <div>
                    <NavLink to="/cart" onClick={() => setHrTag("cart")} className={hrTag === "cart" ? setHrTag("") : ""}><BsBasket3Fill /></NavLink>
                    <div className={`${getTotalCartAmount() === 0 ? '' : styles.dot}`}></div>
                </div>
                {!token ? <button onClick={() => { setShowLogin(true) }} className={`py-2 px-2 text-[16px] w-[108px] h-[42px] rounded-3xl ${styles.navBtn}`}>Sign in</button>
                    : <div className={styles.navProfile}>
                        <i className="fa-solid fa-user"></i>
                        <ul className={styles.profileDropdown}>
                            <NavLink to="/myorders"><li><i className="fa-solid fa-bag-shopping" style={{color: "#ff6347"}}></i> <p>Orders</p></li></NavLink>
                            <hr />
                            <li onClick={logOut}><i className="fa-solid fa-right-from-bracket" style={{color: "#ff6347"}}></i> <p>Log out</p></li>
                        </ul>
                    </div>}

            </div>
        </div>
    )
}

export default Navbar