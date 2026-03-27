import { FoodModel } from "../models/food.js";

export const createFood = async (req, res) => {
  const { name, price, ingredients, categoryId } = req.body;
  try {
    const newFood = await FoodModel.create({
      name,
      price,
      ingredients,
      categoryId,
      image: req.file ? `/uploads/${req.file?.filename}` : "",
    });
    res
      .status(201)
      .send({ message: "hool amjilttai uusgegdlee", 
              data: newFood });
  } catch (error) {
    console.error("Create food error", error.message);
    res.status(500).send({ message: "error, aldaa garlaa", data: null });
  }
};

export const getFood = async (req, res) => {
  try {
    const { categoryId } = req.params;
    // console.log("category id awah", categoryId);
    const query = categoryId ? {categoryId} : {};
    const foods = await FoodModel.find(query).populate("categoryId")

    res.status(200).json(foods);
  } catch (error) {
    console.error(error);
    res.status(500).send("hool duudahad aldaa garlaa");
  }
};

export const updateFoodPut = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await FoodModel.findByIdAndUpdate(id, req.body, { 
      new: true, 
      runValidators: true 
    });

    if (!result) return res.status(404).send({ message: "Хоол олдсонгүй" });

    res.status(200).send({ message: "Амжилттай шинэчлэгдлээ (PUT)", data: result });
  } catch (error) {
    res.status(500).send({ message: "Алдаа гарлаа", error: error.message });
  }
};

export const updateFoodPatch = async (req, res) => {
  const { id } = req.params;
  const { body } = req;

  try {
    const result = await FoodModel.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    });

    if (!result) {
      return res.status(404).send({ message: "Food not found" });
    }

    res
      .status(200)
      .send({ message: "Successfully (PATCH), amjilttai", data: result });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Patch failed", error });
  }
};

export const deleteFood = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await FoodModel.findByIdAndDelete(id);

    if (!result) {
      return res.status(404).send({ message: "Food not found" });
    }
    res
      .status(200)
      .send({ message: "Successfully (DELETE), amjilttai", data: result });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Delete failed", error });
  }
};
