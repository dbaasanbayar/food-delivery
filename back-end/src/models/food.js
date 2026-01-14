import { Schema, model } from "mongoose";

const foodSchemas = new Schema(
  {
    foodName: { type: String, required: true },
    price: { type: Number },
    image: { type: String },
    ingredients: { type: String },
    categoryId: { type: Schema.Types.ObjectId, ref: "category" },
  },
  {
    timestamps: true,
  }
);

export const FoodModel = model("food", foodSchemas);
