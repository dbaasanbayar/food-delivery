import { Schema, model } from "mongoose";

export const foodCategorySchemas = new Schema(
  {
    name: { type: String },
  },
  {
    timestamps: true,
  }
);

export const FoodCategoryModel = model("category", foodCategorySchemas);
