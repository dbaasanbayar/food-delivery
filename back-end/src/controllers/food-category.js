import { FoodCategoryModel } from "../models/food-category.js";

export const createCategory = async (req, res) => {
  try {
    const existingCategory = await FoodCategoryModel.findOne({ categoryName });
    if (existingCategory) {
      return res.status(400).json({message: "Энэ категори аль хэдийн байна."})
    }
    const newCategory = await FoodCategoryModel.create({categoryName});
    res.status(201).json({ message: "Категори амжилттай үүсгэгдлээ", data: newCategory })
  } catch (error) { 
    res.status(500).json({ message: "Алдаа гарлаа", error: error.message
    })
  }
}

export const getCategory = async (req, res) => {
  try {
    const categories = await FoodCategoryModel.find();
    res.status(200).json({ data: categories});
  }
  catch (error) {
    res.status(500).json({message: "Алдаа гарлаа", error: error.message})
  }
}

// export const createCategory = async (req, res) => {
//   const { name } = req.body;
//   try {
//     if (!name) {
//       return res.status(400).json({ message: "Category name is required" });
//     }
//     const newCategory = await FoodCategoryModel.create({ name });
//     res
//       .status(200)
//       .json({ message: "Category created succesfully!", data: newCategory });
//   } catch (error) {
//     res.status(500).json({ message: "Server error", error: error.message });
//   }
// };

// export const getCategory = async (req, res) => {
//   try {
//     const categoryData = await FoodCategoryModel.find();

//     res.status(200).json(categoryData);
//   } catch (error) {
//     res.status(500).json({ message: "Server error", error: error.message });
//   }
// };

