import { Router } from "express";
import { createCategory, getCategory } from "../controllers/food-category.js";
import { authorization, autthenticate } from "../middleware/auth.js";

export const categoryRouter = Router();

categoryRouter.post("/", createCategory, autthenticate, authorization);
categoryRouter.get("/", getCategory);
