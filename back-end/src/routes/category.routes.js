import { Router } from "express";
import { createCategory, getCategory } from "../controllers/food-category.js";
import { authorization, authenticate } from "../middleware/auth.js";

export const categoryRouter = Router();

categoryRouter.post("/", createCategory, authenticate, authorization);
categoryRouter.get("/", getCategory);
