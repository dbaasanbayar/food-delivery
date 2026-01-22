import { Router } from "express";

import { getCategoriesWithFoods } from "../controllers/category-with-foods.js";

export const getCategoryFoodRouter = Router();

getCategoryFoodRouter.get("/", getCategoriesWithFoods);
