import { Router } from "express";
import { forgotPassword, getUser, resetPassword, signIn, signUp, verifyOTP } from "../controllers/user.js";

export const userRouter = Router();

userRouter.post("/signin", signIn);
userRouter.post("/signup", signUp);
userRouter.post("/forgot-password", forgotPassword);
userRouter.post("/verify-otp", verifyOTP);
userRouter.post("/reset-password", resetPassword);
userRouter.get("/:userId", getUser); 
