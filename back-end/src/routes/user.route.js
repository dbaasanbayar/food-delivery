import { Router } from "express";
import { signIn, signUp } from "../controllers/user.js";
import { verifyToken } from "../middleware/auth.js";

export const userRouter = Router();

userRouter.post("/signin", signIn);
userRouter.post("/signup", signUp);
