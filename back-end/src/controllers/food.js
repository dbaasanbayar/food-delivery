import { FoodModel } from "../models/food.js";

export const createFood = async (req, res) => {
  const { body } = req;
  console.log(body);
  try {
    const result = await FoodModel.create(body);
    console.log(result, "result");
    res.status(200).send({ message: "amjilttai", data: result });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "aldaa garlaa", data: null });
  }
};

export const getFood = async (req, res) => {
  try {
    const result = await FoodModel.find();
    console.log(result, "result");
    res.send(result);
  } catch (error) {
    console.error(error);
    res.send(error);
  }
};

// export const deleteFood =
