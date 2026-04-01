import { Router } from "express";
import {
  createOrder,
  getAllOrders,
  getOrderByUser,
  updateOrderStatus,
} from "../controllers/foodOrder.js";
import { authenticate } from "../middleware/auth.js";

export const foodOrderRouter = Router();

foodOrderRouter.post("/", authenticate, createOrder);         
foodOrderRouter.get("/", authenticate, getAllOrders);           
foodOrderRouter.get("/:userId", authenticate, getOrderByUser); 
foodOrderRouter.patch("/:foodOrderId", authenticate, updateOrderStatus);