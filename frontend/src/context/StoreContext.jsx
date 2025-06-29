import { createContext, useEffect, useState } from "react";
// import { food_list } from "../assets/asset";
import axios from "axios"

export const StoreContext = createContext(null)


const StoreContextProvider = (props) => {

    const [cartItems, setCartItems] = useState({});
    const [category, setCategory] = useState("All");
    const [token, setToken] = useState("");
    const [food_list, setFoodList] = useState([])
    const symbol = "₹";

    const url = "https://mealmate-backend-fddu.onrender.com"

    const addToCart = async (itemId) => {
        if (!cartItems[itemId]) {
            setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
        } else {
            setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
        }

        if (token) {
            await axios.post(url + "/api/cart/add", { itemId }, { headers: { token } })
        }
    }

    const removeFromCart = async (itemId) => {
        setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
        if (token) {
            await axios.post(url + "/api/cart/remove", { itemId }, { headers: { token } });
        }
    }

    const loadCartData = async (token) => {
        try {
            const response = await axios.post(url + "/api/cart/get", {}, { headers: { token } });
            setCartItems(response.data.cartData)
        } catch (error) {
            console.log(error)
        }
    }

    const getTotalCartAmount = () => {
        let totalAmount = 0;

        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                let itemInfo = food_list.find((product) => product._id === item)
                totalAmount += itemInfo.price * cartItems[item]
            }
        }
        return totalAmount;
    }

    const fetchFoodList = async () => {
        const response = await axios.get(url + "/api/food/list");
        setFoodList(response.data.data)
    }

    useEffect(() => {
        async function loadData() {
            await fetchFoodList();
            if (localStorage.getItem("token")) {
                setToken(localStorage.getItem("token"));
                await loadCartData(localStorage.getItem("token"))
            }
        }
        loadData();
    }, [])


    const currency = "₹";

    const contextValue = {
        food_list, currency, cartItems, setCartItems, addToCart, removeFromCart, category, setCategory,
        getTotalCartAmount, url, token, setToken, symbol
    }

    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}

export default StoreContextProvider
