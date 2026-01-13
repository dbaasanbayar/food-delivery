import { Schema, model } from "mongoose";

const categorySchemas = new Schema(
  {
    name: { type: String },
  },
  {
    timestamps: true,
  }
);

export const CategoryModel = model("category", categorySchemas);
