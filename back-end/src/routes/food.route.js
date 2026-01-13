import { Router } from "express";
import {
  createFood,
  deleteFood,
  getFood,
  updateFoodPatch,
  updateFoodPut,
} from "../controllers/food.js";

export const foodRouter = Router();

foodRouter.get("/", getFood);
foodRouter.post("/", createFood);
foodRouter.put("/:id", updateFoodPut);
foodRouter.patch("/:id", updateFoodPatch);
foodRouter.delete("/:id", deleteFood);
