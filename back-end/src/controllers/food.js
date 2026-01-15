import { FoodModel } from "../models/food.js";

export const createFood = async (req, res) => {
  const { body } = req;
  try {
    const newFood = await FoodModel.create(body);
    res
      .status(200)
      .send({ message: "successfully created, amjilttai", data: newFood });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "error, aldaa garlaa", data: null });
  }
};

export const getFood = async (req, res) => {
  try {
    const foods = await FoodModel.find().populate("categoryId", "name");
    res.status(200).json({ foods });
  } catch (error) {
    console.error(error);
    res.status(500).send("Something went wrong");
  }
};

export const updateFoodPut = async (req, res) => {
  const { id } = req.params;
  const { body } = req;

  try {
    const result = await FoodModel.findByIdAndUpdate(id, body);
    if (!result) {
      return res.status(404).send({ message: "Food not found" });
    }
    res
      .status(200)
      .send({ message: "Succesfully (PUT), amjilttai", data: result });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Update failed, amjiltgui", error });
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
