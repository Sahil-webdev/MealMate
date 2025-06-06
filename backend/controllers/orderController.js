import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js"
import razorpay from "razorpay"

const currency = "inr"

const razorpayInstance = new razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
})


//placing user order for frontend

const placeOrder = async (req, res) => {
    try {
        const { userId, items, amount, address } = req.body;

        const orderData = {
            userId,
            items,
            address,
            amount,
            payment: false,
            date: Date.now(),

        }

        const newOrder = new orderModel(orderData);
        await newOrder.save();

        const options = {
            amount: amount * 100,
            currency: currency.toUpperCase(),
            receipt: newOrder._id.toString()
        }

        await razorpayInstance.orders.create(options, (error, order) => {
            if (error) {
                console.log(error)
                return res.json({ success: false, message: error })
            }
            res.json({ success: true, order })
        })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// orderController.js ke andar hi
// const splitPayment = async (req, res) => {
//     try {
//         const { splitType, participants, amount, customAmounts, items, userId, address } = req.body;

//         const orderData = {
//             userId,
//             items,
//             address,
//             amount,
//             payment: false,
//             date: Date.now(),
//             splitType,
//             participants,
//             customAmounts
//         };

//         const newOrder = new orderModel(orderData);
//         await newOrder.save();

//         const options = {
//             amount: amount * 100,
//             currency: currency.toUpperCase(),
//             receipt: newOrder._id.toString()
//         };

//         const order = await razorpayInstance.orders.create(options);

//         res.json({ success: true, order });

//     } catch (error) {
//         console.log("Split Payment Error:", error);
//         res.json({ success: false, message: error.message });
//     }
// };

const splitPayment = async (req, res) => {
    try {
        const { userId, items, amount, address, splitType, participants, customAmounts } = req.body;

        const orderData = {
            userId,
            items,
            amount,
            address,
            isSplitPayment: true,
            splitType,
            customAmounts,
            participants
        };

        const newOrder = new orderModel(orderData);
        await newOrder.save();

        const options = {
            amount: amount * 100, // in paise
            currency: currency.toUpperCase(),
            receipt: newOrder._id.toString()
        };

        const order = await razorpayInstance.orders.create(options);

        // You can generate your own link pattern if needed
        const paymentLink = `https://mealmate.com/split-payment/${newOrder._id}`;

        res.json({
            success: true,
            message: "Split Payment Order Created",
            order,
            paymentLink
        });

    } catch (error) {
        console.error("Split Payment Error:", error);
        res.status(500).json({ success: false, message: error.message });
    }
};




const verifyRazorpay = async (req, res) => {
    try {
        const { userId, razorpay_order_id } = req.body;

        const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id)
        // console.log(orderInfo);
        if (orderInfo.status === 'paid') {
            await orderModel.findByIdAndUpdate(orderInfo.receipt, { payment: true });
            await userModel.findByIdAndUpdate(userId, { cartData: {} });
            res.json({ success: true, message: "Payment Successful" });
        } else {
            res.json({ success: false, message: "Payment Failed" });
        }
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}

const verifySplitPayment = async(req,res) =>{
    try {
        const {userId, razorpay_order_id} = req.body;

        const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id)
        console.log(orderInfo);
    } catch (error) {
        
    }
}

const userOrders = async (req, res) => {
    try {
        const { userId } = req.body;

        const orders = await orderModel.find({ userId });

        res.json({ success: true, data: orders })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

export { placeOrder, verifyRazorpay, userOrders, splitPayment, verifySplitPayment }