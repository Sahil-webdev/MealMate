import userModel from "../models/userModel.js"

//Add to cart
const addToCart = async (req, res) => {
    try {
        const { userId, itemId } = req.body;

        console.log("userid:", userId);
        console.log("itemid:", itemId);

        let userData = await userModel.findById(userId);
        let cartData = await userData.cartData;

        if (!cartData[itemId]) {
            cartData[itemId] = 1;
        } else {
            cartData[itemId] += 1;
        }          
        console.log(cartData);
        await userModel.findByIdAndUpdate(userId, { cartData });
        res.json({ success: true, message: "Added to Cart" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}


//remove  from cart
const removeFromCart = async (req, res) => {
    try {
        const { userId, itemId } = req.body;

        let userData = await userModel.findById(userId);
        let cartData = await userData.cartData;

        if (cartData[itemId] > 0) {
            cartData[itemId] -= 1;
        }
        await userModel.findByIdAndUpdate(userId, { cartData });
        res.json({ success: true, message: "Removed from cart" })
    } catch (error) {
        console.log(error);;
        res.json({ success: false, message: error.message });
    }
}


//get list of cart
const getCart = async (req, res) => {
    try {
        const { userId } = req.body

        const userData = await userModel.findById(userId)
        const cartData = await userData.cartData

        res.json({ success: true, cartData })

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}


export { addToCart, removeFromCart, getCart }