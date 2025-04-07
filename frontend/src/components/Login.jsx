import React, { useContext, useEffect, useState, useSyncExternalStore } from 'react'
import styles from "./Login.module.css"
import { RxCross2 } from "react-icons/rx";
import { StoreContext } from '../context/StoreContext';
import axios from "axios"
import { toast } from "react-toastify"
import { useNavigate } from 'react-router-dom';

const Login = ({ setShowLogin }) => {

    const { url, setToken, token } = useContext(StoreContext)
    const navigate = useNavigate();

    const [currState, setCurrState] = useState("Login");

    /* const [data, setData] = useState({
         name:"",
         email:"",
         password:""
     })*/

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // const onChangeHandler = (event) => {
    //     const name = event.target.name;
    //     const value = event.target.value;

    //     setData(data => ({ ...data, [name]: value }))
    // }

    //This is for checking are data store in state variable or not
    // useEffect(()=>{
    //     console.log(data);
    // },[data])


    /*const handleSubmitBtn = async (event) => {
        event.preventDefault();

        try {
            if (currState === "Sign Up") {
                const response = await axios.post(url + '/api/user/registerUser', { name, email, password })
                if (response.data.success) {
                    setToken(response.data.token)
                    localStorage.setItem("token", response.data.token);
                    toast.success("Your are Registered")
                } else {
                    toast.error(response.data.message);
                }
            } else {
                const response = await axios.post(url + "/api/user/loginUser", { email, password });
                if (response.data.success) {
                    setToken(response.data.token)
                    localStorage.setItem("token", response.data.token);
                    toast.success("Login successfully")
                    navigate('/');
                    setShowLogin(false)
                } else {
                    toast.error(response.data.message);
                }
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    }*/

    const handleSignup = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post(url + '/api/user/registerUser', { name, email, password })
            if (response.data.success) {
                // setToken(response.data.token)
                // localStorage.setItem("token", response.data.token);
                setCurrState('Login')
                toast.success("Your are Registered")
                navigate('/');
                setName("");
                setEmail("");
                setPassword("");
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    }

    const handleLogin = async(event) =>{
        event.preventDefault();

        try {
            const response = await axios.post(url + "/api/user/loginUser", { email, password });
            if (response.data.success) {
                setToken(response.data.token)
                localStorage.setItem("token", response.data.token);
                toast.success("Login successfully")
                navigate("/");
                setShowLogin(false);
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    }

    useEffect(() => {
        if (token) {
            console.log(token)
            navigate('/')
        }
    }, [token])

    return (
        <div className={styles.loginPopup}>
            {
                currState === "Login"
                    ? <form onSubmit={handleLogin} className={styles.container}>
                    <div className={styles.loginTitle}>
                        <h2>{currState}</h2>
                        <RxCross2 className='cursor-pointer' onClick={() => { setShowLogin(false) }} />
                    </div>

                    <div className={styles.loginInput}>
                        <input name='email' onChange={(e) => setEmail(e.target.value)} value={email} type="email" placeholder='Your Email' required />
                        <input name='password' onChange={(e) => setPassword(e.target.value)} value={password} type="password" placeholder='Your password' required />
                    </div>
                    <button className={styles.loginBtn} type='submit'>Login</button>
                    <div className={styles.checkDiv}>
                        <input type="checkbox" required />
                        <p>By continuing, i agree to the terms of use & privacy policy.</p>
                    </div>
                    <p>Create a new account? <span onClick={() => { setCurrState("Sign Up") }}>Click here</span></p>
                </form>
                    : <form onSubmit={handleSignup} className={styles.container}>
                        <div className={styles.loginTitle}>
                            <h2>{currState}</h2>
                            <RxCross2 className='cursor-pointer' onClick={() => { setShowLogin(false) }} />
                        </div>

                        <div className={styles.loginInput}>
                            <input name='name' onChange={(e) => setName(e.target.value)} value={name} type="text" placeholder='Your Name' required />
                            <input name='email' onChange={(e) => setEmail(e.target.value)} value={email} type="email" placeholder='Your Email' required />
                            <input name='password' onChange={(e) => setPassword(e.target.value)} value={password} type="password" placeholder='Your password' required />
                        </div>
                        <button className={styles.loginBtn} type='submit'>Create Account</button>
                        <div className={styles.checkDiv}>
                            <input type="checkbox" required />
                            <p>By continuing, i agree to the terms of use & privacy policy.</p>
                        </div>
                        <p>Already have an account? <span onClick={() => { setCurrState("Login") }}>Login here</span></p>
                    </form>
            }


        </div>
    )
}

export default Login