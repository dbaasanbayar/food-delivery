import { Router } from "express";
import {
  createFood,
  deleteFood,
  getFood,
  updateFoodPatch,
  updateFoodPut,
} from "../controllers/food.js";
import { upload } from "../middleware/upload.js";

export const foodRouter = Router();

foodRouter.get("/:categoryId", getFood);
foodRouter.get("/", getFood);
foodRouter.post("/", upload.single("image"), createFood);
foodRouter.put("/:id", updateFoodPut);
foodRouter.patch("/:id", updateFoodPatch);
foodRouter.delete("/:id", deleteFood);
