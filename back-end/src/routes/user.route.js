import { Router } from "express";
import { signUp } from "../controllers/user.js";

export const userRouter = Router();

userRouter.post("/", signUp);
