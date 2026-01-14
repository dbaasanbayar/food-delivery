import { Router } from "express";
import { createCategory, getCategory } from "../controllers/food-category.js";

export const categoryRouter = Router();

categoryRouter.post("/", createCategory);
categoryRouter.get("/", getCategory);
