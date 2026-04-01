import { Schema, model } from "mongoose";

// Захиалгын нэг хоолны мэдээлэл
const foodOrderItemSchema = new Schema({
  food: { type: Schema.Types.ObjectId, ref: "food", required: true },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true, default: 1 },
  image: { type: String },
});

const foodOrderSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "user", required: true },
    foodOrderItems: { type: [foodOrderItemSchema], required: true },
    totalPrice: { type: Number, required: true },
    status: {
      type: String,
      enum: ["PENDING", "PREPARING", "DELIVERING", "DELIVERED", "CANCELLED"],
      default: "PENDING",
    },
    deliveryAddress: { type: String, required: true },
  },
  { timestamps: true }
);

export const FoodOrderModel = model("foodorder", foodOrderSchema);
