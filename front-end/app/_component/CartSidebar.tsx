"use client";
import { useCart } from "@/app/contexts/CartContext";
import { baseUrl } from "@/lib/type";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

// Төлөвийн өнгө
const statusColor: Record<string, string> = {
  PENDING:    "bg-yellow-100 text-yellow-700",
  PREPARING:  "bg-blue-100 text-blue-700",
  DELIVERING: "bg-purple-100 text-purple-700",
  DELIVERED:  "bg-green-100 text-green-700",
  CANCELLED:  "bg-red-100 text-red-700",
};

// Төлөвийн монгол нэр
const statusLabel: Record<string, string> = {
  PENDING:    "Хүлээгдэж байна",
  PREPARING:  "Бэлтгэж байна",
  DELIVERING: "Хүргэж байна",
  DELIVERED:  "Хүргэгдсэн",
  CANCELLED:  "Цуцлагдсан",
};

type OrderItem = {
  food: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
};

type Order = {
  _id: string;
  foodOrderItems: OrderItem[];
  totalPrice: number;
  status: string;
  deliveryAddress: string;
  createdAt: string;
};

export const CartSidebar = ({ onClose }: { onClose: () => void }) => {
  const { cartItems, removeFromCart, increaseQuantity, decreaseQuantity, totalPrice, clearCart, deliveryAddress, setDeliveryAddress } = useCart();
  const [tab, setTab] = useState<"cart" | "orders">("cart"); // ✅ Таб
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loadingOrders, setLoadingOrders] = useState(false);

  // ✅ Хэрэглэгчийн захиалгуудыг татах
  const fetchMyOrders = async () => {
    setLoadingOrders(true);
    try {
      const token = localStorage.getItem("token");

      // Token-оос userId авна
      const payload = JSON.parse(atob(token!.split(".")[1]));
      const userId = payload._id;

      const res = await fetch(`${baseUrl}/food-order/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setOrders(data.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingOrders(false);
    }
  };

  // ✅ Захиалга таб нээхэд татна
  useEffect(() => {
    if (tab === "orders") {
      fetchMyOrders();
    }
  }, [tab]);

  // ✅ Захиалга илгээх
  const handleOrder = async () => {
    if (!deliveryAddress) {
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
          deliveryAddress: deliveryAddress,
        }),
      });

      if (!response.ok) throw new Error("Захиалга амжилтгүй");

      clearCart();
      setDeliveryAddress(""); 

      // ✅ Захиалга илгээсний дараа Orders таб руу шилжинэ
      setTab("orders");
      fetchMyOrders();
    } catch (error) {
      alert("Захиалга илгээхэд алдаа гарлаа!");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />

      {/* Sidebar */}
      <div className="relative bg-white w-full max-w-md h-full flex flex-col shadow-xl">

        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-bold">NomNom</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-black text-2xl">
            ✕
          </button>
        </div>

        {/* ✅ Таб */}
        <div className="flex border-b">
          <button
            onClick={() => setTab("cart")}
            className={`flex-1 py-3 text-sm font-medium transition-colors ${
              tab === "cart"
                ? "border-b-2 border-black text-black"
                : "text-gray-400 hover:text-black"
            }`}
          >
            🛒 Сагс {cartItems.length > 0 && `(${cartItems.length})`}
          </button>
          <button
            onClick={() => setTab("orders")}
            className={`flex-1 py-3 text-sm font-medium transition-colors ${
              tab === "orders"
                ? "border-b-2 border-black text-black"
                : "text-gray-400 hover:text-black"
            }`}
          >
            📋 Захиалга
          </button>
        </div>

        {/* ✅ Сагс таб */}
        {tab === "cart" && (
          <>
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {cartItems.length === 0 ? (
                <p className="text-center text-gray-400 mt-10">
                  Сагс хоосон байна
                </p>
              ) : (
                cartItems.map((item) => (
                  <div
                    key={item.food._id}
                    className="flex gap-3 items-center border-b pb-4"
                  >
                    <img
                      src={`${baseUrl}${item.food.image}`}
                      alt={item.food.name}
                      className="w-16 h-16 object-cover rounded-md"
                    />
                    <div className="flex-1">
                      <p className="font-semibold">{item.food.name}</p>
                      <p className="text-green-600 font-bold">
                        {item.food.price * item.quantity}$
                      </p>
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

            {/* Сагсны footer */}
            {cartItems.length > 0 && (
              <div className="p-4 border-t space-y-3">
                <div className="flex justify-between font-bold text-lg">
                  <span>Нийт:</span>
                  <span className="text-green-600">{totalPrice}$</span>
                </div>
                <input
                onChange={(e) => {
                  console.log("Хаяг:", e.target.value); // ← Console-д харагдах ёстой
                  setDeliveryAddress(e.target.value);
                }}
                  value={deliveryAddress}
                  placeholder="Хүргэлтийн хаяг оруулна уу..."
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
          </>
        )}

        {/* ✅ Захиалга таб */}
        {tab === "orders" && (
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {loadingOrders ? (
              <p className="text-center text-gray-400 mt-10">
                Уншиж байна...
              </p>
            ) : orders.length === 0 ? (
              <p className="text-center text-gray-400 mt-10">
                Захиалга байхгүй байна
              </p>
            ) : (
              orders.map((order) => (
                <div
                  key={order._id}
                  className="border rounded-xl p-4 space-y-3"
                >
                  {/* Төлөв */}
                  <div className="flex justify-between items-center">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${statusColor[order.status]}`}
                    >
                      {statusLabel[order.status]}
                    </span>
                    <span className="text-xs text-gray-400">
                      {new Date(order.createdAt).toLocaleString("mn-MN")}
                    </span>
                  </div>

                  {/* Хоолнууд */}
                  <div className="space-y-2">
                    {order.foodOrderItems.map((item, index) => (
                      <div key={index} className="flex justify-between text-sm">
                        <span>
                          {item.name} × {item.quantity}
                        </span>
                        <span className="font-medium text-green-600">
                          {item.price * item.quantity}$
                        </span>
                      </div>
                    ))}
                  </div>
                  {/* Хүргэлтийн хаяг */}
                  <p className="text-xs text-gray-500">
                    📍 {order.deliveryAddress}
                  </p>

                  {/* Нийт үнэ */}
                  <div className="flex justify-between font-bold border-t pt-2">
                    <span>Нийт:</span>
                    <span className="text-green-600">{order.totalPrice}$</span>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};