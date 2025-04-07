import express from "express"
import authMiddleware from "../middleware/auth.js"
import { placeOrder, userOrders, verifyRazorpay } from "../controllers/orderController.js"

const orderRouter = express.Router();

orderRouter.post("/place", authMiddleware, placeOrder);

//verify payment
orderRouter.post("/verifypayment", authMiddleware, verifyRazorpay);

orderRouter.post("/userorders",authMiddleware, userOrders)

export default orderRouter;