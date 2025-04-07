import { loginUser, registerUser } from "../controllers/userController.js";
import express from "express"

const userRouter = express.Router();

userRouter.post('/loginUser', loginUser);
userRouter.post('/registerUser', registerUser);

export default userRouter