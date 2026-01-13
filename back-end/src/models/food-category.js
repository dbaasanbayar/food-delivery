import { Schema, model } from "mongoose";

const foodCategorySchemas = new Schema(
  {
    name: { type: String },
  },
  {
    timestamps: true,
  }
);

export const FoodCategoryModel = model("food category", foodCategorySchemas);
