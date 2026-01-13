import { FoodModel } from "../models/food.js";

export const createFood = async (req, res) => {
  const { body } = req;
  console.log(body);
  try {
    const result = await FoodModel.create(body);
    console.log(result, "Creating");
    res
      .status(200)
      .send({ message: "successfully delivered, amjilttai", data: result });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "error, aldaa garlaa", data: null });
  }
};

export const getFood = async (req, res) => {
  try {
    const result = await FoodModel.find();
    console.log(result, "Getting data");
    res.send(result);
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
    const result = await FoodModel.findByIdAndUpdate(id, body, { new: true });

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
