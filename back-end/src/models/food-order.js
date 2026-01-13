import { Schema, model } from "mongoose";

const foodOrderSchemas = new Schema(
  {
    user: { type: [Schema.ObjectId] },
    totalPrice: { type: String },
    foodOrderItems: { type: [Schema.foodOrderItems] },
    status: { type: String, enum: ["PENDING", "CANCELLED", "DELIVERED"] },
  },
  {
    timestamps: true,
  }
);

export const FoodOrderModel = model("food order", foodOrderSchemas);
