import { FoodCategoryModel } from "../models/food-category.js";

export const createCategory = async (req, res) => {
  const { name } = req.body;
  try {
    if (!name) {
      return res.status(400).json({ message: "Category name is required" });
    }
    const newCategory = await FoodCategoryModel.create({ name });
    res
      .status(200)
      .json({ message: "Category created succesfully!", data: newCategory });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const getCategory = async (req, res) => {
  try {
    const categoryData = await FoodCategoryModel.find();

    res.status(200).json(categoryData);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// export const getCategory = async (req, res) => {
//   const { name } = req.query;   // ✅ use query instead of body

//   try {
//     if (!name) {
//       return res.status(400).json({ message: "Name query is required" });
//     }

//     const categoryData = await FoodCategoryModel.find({ name });

//     res.status(200).json(categoryData);
//   } catch (error) {
//     res.status(500).json({ message: "Server error", error: error.message });
//   }
// };
// Frontend call
// fetch(`${baseUrl}/category?name=huushuur`)
