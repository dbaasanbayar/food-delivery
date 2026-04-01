"use client";
import { baseUrl } from "@/lib/type";
import { useEffect, useState } from "react";

// Захиалгын төлөвүүд
const STATUS_OPTIONS = ["PENDING", "PREPARING", "DELIVERING", "DELIVERED", "CANCELLED"];

// Төлөвийн өнгө
const statusColor: Record<string, string> = {
  PENDING:    "bg-yellow-100 text-yellow-700",
  PREPARING:  "bg-blue-100 text-blue-700",
  DELIVERING: "bg-purple-100 text-purple-700",
  DELIVERED:  "bg-green-100 text-green-700",
  CANCELLED:  "bg-red-100 text-red-700",
};

// Захиалгын төрөл
type OrderItem = {
  food: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
};

type Order = {
  _id: string;
  user: { email: string; phoneNumber: string; address: string };
  foodOrderItems: OrderItem[];
  totalPrice: number;
  status: string;
  deliveryAddress: string;
  createdAt: string;
};

const Order = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  // ✅ Бүх захиалга татах
  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${baseUrl}/food-order`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setOrders(data.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // ✅ Төлөв өөрчлөх
  const handleStatusChange = async (orderId: string, newStatus: string) => {
    try {
      const token = localStorage.getItem("token");
      await fetch(`${baseUrl}/food-order/${orderId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status: newStatus }),
      });

      // ✅ UI шинэчлэх
      setOrders((prev) =>
        prev.map((order) =>
          order._id === orderId ? { ...order, status: newStatus } : order
        )
      );
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-gray-500">Уншиж байна...</p>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Захиалгын жагсаалт</h1>

      {orders.length === 0 ? (
        <p className="text-gray-400">Захиалга байхгүй байна</p>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div
              key={order._id}
              className="border rounded-xl p-4 shadow-sm bg-white space-y-4"
            >
              {/* Захиалгын толгой */}
              <div className="flex justify-between items-start flex-wrap gap-2">
                <div>
                  <p className="font-semibold text-sm text-gray-500">
                    Захиалгын ID:
                  </p>
                  <p className="text-xs text-gray-400">{order._id}</p>
                </div>

                {/* Хэрэглэгчийн мэдээлэл */}
                <div className="text-sm text-right">
                  <p className="font-semibold">{order.user?.email}</p>
                  <p className="text-gray-500">{order.user?.phoneNumber}</p>
                </div>
              </div>

              {/* Хоолнууд */}
              <div className="space-y-2">
                {order.foodOrderItems.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 bg-gray-50 rounded-lg p-2"
                  >
                    {item.image && (
                      <img
                        src={`${baseUrl}${item.image}`}
                        alt={item.name}
                        className="w-12 h-12 object-cover rounded-md"
                      />
                    )}
                    <div className="flex-1">
                      <p className="font-medium">{item.name}</p>
                      <p className="text-sm text-gray-500">
                        {item.quantity} ширхэг × {item.price}$
                      </p>
                    </div>
                    <p className="font-bold text-green-600">
                      {item.quantity * item.price}$
                    </p>
                  </div>
                ))}
              </div>

              {/* Хүргэлтийн хаяг + Нийт үнэ */}
              <div className="flex justify-between items-center flex-wrap gap-2 border-t pt-3">
                <div>
                  <p className="text-sm text-gray-500">Хүргэлтийн хаяг:</p>
                  <p className="font-medium">{order.deliveryAddress}</p>
                </div>
                <p className="font-bold text-lg text-green-600">
                  Нийт: {order.totalPrice}$
                </p>
              </div>

              {/* Төлөв өөрчлөх */}
              <div className="flex items-center gap-3 flex-wrap">
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${statusColor[order.status]}`}
                >
                  {order.status}
                </span>
                <select
                  value={order.status}
                  onChange={(e) => handleStatusChange(order._id, e.target.value)}
                  className="border rounded-md px-3 py-1 text-sm"
                >
                  {STATUS_OPTIONS.map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
              </div>

              {/* Огноо */}
              <p className="text-xs text-gray-400">
                {new Date(order.createdAt).toLocaleString("mn-MN")}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Order;
