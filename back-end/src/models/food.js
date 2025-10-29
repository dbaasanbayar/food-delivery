import { Schema, model } from "mongoose";

const foodSchemas = new Schema(
  {
    foodName: { type: String, required: true },
    price: { type: Number },
    image: { type: String },
    ingredients: { type: String },
  },
  {
    timestamps: true,
  }
);

export const FoodModel = model("food", foodSchemas);

// Food	Type
// _id	ObjectId
// foodName	String
// price	Number
// image	String
// ingredients	String
// category	ObjectId
// createdAt	Date
// updatedAt	Date
