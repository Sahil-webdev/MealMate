import express from "express"
import authMiddleware from "../middleware/auth.js"
import { placeOrder, splitPayment, userOrders, verifyRazorpay, verifySplitPayment} from "../controllers/orderController.js"

const orderRouter = express.Router();

orderRouter.post("/place", authMiddleware, placeOrder);
orderRouter.post("/split-payment", splitPayment)

//verify payment
orderRouter.post("/verifypayment", authMiddleware, verifyRazorpay);
orderRouter.post("/verifySplitPayment", authMiddleware, verifySplitPayment);


orderRouter.post("/userorders",authMiddleware, userOrders)

export default orderRouter;