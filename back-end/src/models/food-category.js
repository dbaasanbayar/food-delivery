import { Schema, model } from "mongoose";

export const foodCategorySchemas = new Schema(
  {
    name: { type: String },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
  },
);
foodCategorySchemas.virtual("foods", {
  ref: "food",
  localField: "_id",
  foreignField: "categoryId",
});

export const FoodCategoryModel = model("category", foodCategorySchemas);
