import { FoodCategoryModel } from "../models/food-category.js";

export const getCategoriesWithFoods = async (req, res) => {
  try {
    const categories = await FoodCategoryModel.find().populate("foods").lean();
    res.status(200).json(categories);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
