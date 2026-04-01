
import { FoodOrderModel } from "../models/food-order.js";
import { UserModel } from "../models/user.js";

// Захиалга үүсгэх
export const createOrder = async (req, res) => {
  try {
    const { foodOrderItems, totalPrice, deliveryAddress } = req.body;
    const userId = req.user._id; // ← token-оос авна

    // 1. Захиалга үүсгэнэ
    const order = await FoodOrderModel.create({
      user: userId,
      foodOrderItems,
      totalPrice,
      deliveryAddress,
      status: "PENDING",
    });

    // 2. User-ийн orderedFoods-д нэмнэ
    await UserModel.findByIdAndUpdate(userId, {
      $push: { orderedFoods: order._id },
    });

    res.status(201).json({ message: "Захиалга амжилттай үүслээ", data: order });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Алдаа гарлаа", error });
  }
};

// Бүх захиалга авах (Admin)
export const getAllOrders = async (req, res) => {
  try {
    const orders = await FoodOrderModel.find()
      .populate("user", "email phoneNumber address") // ← user мэдээлэл
      .sort({ createdAt: -1 }); // ← шинэ захиалга эхэнд

    res.json({ message: "Success", data: orders });
  } catch (error) {
    res.status(500).json({ message: "Алдаа гарлаа", error });
  }
};

// Хэрэглэгчийн захиалга авах
export const getOrderByUser = async (req, res) => {
  try {
    const { userId } = req.params;

    const orders = await FoodOrderModel.find({ user: userId })
      .sort({ createdAt: -1 });

    res.json({ message: "Success", data: orders });
  } catch (error) {
    res.status(500).json({ message: "Алдаа гарлаа", error });
  }
};

// Захиалгын төлөв өөрчлөх (Admin)
export const updateOrderStatus = async (req, res) => {
  try {
    const { foodOrderId } = req.params;
    const { status } = req.body;

    const order = await FoodOrderModel.findByIdAndUpdate(
      foodOrderId,
      { status },
      { new: true }
    );

    if (!order) {
      return res.status(404).json({ message: "Захиалга олдсонгүй" });
    }

    res.json({ message: "Төлөв амжилттай өөрчлөгдлөө", data: order });
  } catch (error) {
    res.status(500).json({ message: "Алдаа гарлаа", error });
  }
};