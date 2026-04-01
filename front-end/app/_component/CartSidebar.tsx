"use client";
import { useCart } from "../contexts/CartContext";
import { baseUrl } from "@/lib/type";
import { useRouter } from "next/navigation";
import { useState } from "react";

export const CartSidebar = ({ onClose }: { onClose: () => void }) => {
  const { cartItems, removeFromCart, increaseQuantity, decreaseQuantity, totalPrice, clearCart } = useCart();
  const [address, setAddress] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const handleOrder = async () => {
    if (!address) {
      alert("Хүргэлтийн хаягаа оруулна уу!");
      return;
    }
    if (cartItems.length === 0) {
      alert("Сагс хоосон байна!");
      return;
    }

    setIsSubmitting(true);
    try {
      const token = localStorage.getItem("token");
      const orderItems = cartItems.map((item) => ({
        food: item.food._id,
        name: item.food.name,
        price: item.food.price,
        quantity: item.quantity,
        image: item.food.image || "",
      }));

      const response = await fetch(`${baseUrl}/food-order`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          foodOrderItems: orderItems,
          totalPrice,
          deliveryAddress: address,
        }),
      });

      if (!response.ok) throw new Error("Захиалга амжилтгүй");

      clearCart();
      onClose();
      alert("Захиалга амжилттай илгээгдлээ! 🎉");
    } catch (error) {
      alert("Захиалга илгээхэд алдаа гарлаа!");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
      />

      {/* Sidebar */}
      <div className="relative bg-white w-full max-w-md h-full flex flex-col shadow-xl">
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-bold">🛒 Миний сагс</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-black text-2xl"
          >
            ✕
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {cartItems.length === 0 ? (
            <p className="text-center text-gray-400 mt-10">Сагс хоосон байна</p>
          ) : (
            cartItems.map((item) => (
              <div key={item.food._id} className="flex gap-3 items-center border-b pb-4">
                <img
                  src={`${baseUrl}${item.food.image}`}
                  alt={item.food.name}
                  className="w-16 h-16 object-cover rounded-md"
                />
                <div className="flex-1">
                  <p className="font-semibold">{item.food.name}</p>
                  <p className="text-green-600 font-bold">{item.food.price * item.quantity}$</p>
                  {/* Тоо өөрчлөх */}
                  <div className="flex items-center gap-2 mt-1">
                    <button
                      onClick={() => decreaseQuantity(item.food._id)}
                      className="w-7 h-7 bg-gray-100 rounded-full hover:bg-gray-200"
                    >
                      −
                    </button>
                    <span className="font-medium">{item.quantity}</span>
                    <button
                      onClick={() => increaseQuantity(item.food._id)}
                      className="w-7 h-7 bg-gray-100 rounded-full hover:bg-gray-200"
                    >
                      +
                    </button>
                  </div>
                </div>
                <button
                  onClick={() => removeFromCart(item.food._id)}
                  className="text-red-400 hover:text-red-600 text-sm"
                >
                  Хасах
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {cartItems.length > 0 && (
          <div className="p-4 border-t space-y-3">
            <div className="flex justify-between font-bold text-lg">
              <span>Нийт:</span>
              <span className="text-green-600">{totalPrice}$</span>
            </div>

            {/* Хүргэлтийн хаяг */}
            <input
              type="text"
              placeholder="Хүргэлтийн хаяг оруулна уу..."
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full h-10 border rounded-md px-3 text-sm"
            />

            <button
              onClick={handleOrder}
              disabled={isSubmitting}
              className="w-full h-11 bg-[#18181B] text-white rounded-md font-medium hover:bg-[#27272A] transition-colors"
            >
              {isSubmitting ? "Илгээж байна..." : "Захиалга өгөх"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};