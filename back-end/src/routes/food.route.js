import { Router } from "express";
import { createFood, getFood } from "../controllers/food.js";

export const foodRouter = Router();

foodRouter.get("/", getFood).post("/", createFood);
