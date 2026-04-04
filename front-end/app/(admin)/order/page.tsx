"use client";
import { baseUrl } from "@/lib/type";
import React, { useEffect, useState } from "react";

const STATUS_OPTIONS = ["PENDING", "PREPARING", "DELIVERING", "DELIVERED", "CANCELLED"];

const statusColor: Record<string, string> = {
  PENDING:    "border-yellow-400 text-yellow-600",
  PREPARING:  "border-blue-400 text-blue-600",
  DELIVERING: "border-purple-400 text-purple-600",
  DELIVERED:  "border-green-400 text-green-600",
  CANCELLED:  "border-gray-400 text-gray-500",
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
  user: { email: string; phoneNumber: string; address: string };
  foodOrderItems: OrderItem[];
  totalPrice: number;
  status: string;
  deliveryAddress: string;
  createdAt: string;
};

const ITEMS_PER_PAGE = 10;

const Order = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [bulkStatus, setBulkStatus] = useState("PENDING");

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

  // ✅ Нэг захиалгын төлөв өөрчлөх
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
      setOrders((prev) =>
        prev.map((order) =>
          order._id === orderId ? { ...order, status: newStatus } : order
        )
      );
    } catch (error) {
      console.error(error);
    }
  };

  // ✅ Олон захиалгын төлөв нэгэн зэрэг өөрчлөх
  const handleBulkStatusChange = async () => {
    try {
      const token = localStorage.getItem("token");
      await Promise.all(
        selectedIds.map((id) =>
          fetch(`${baseUrl}/food-order/${id}`, {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ status: bulkStatus }),
          })
        )
      );
      setOrders((prev) =>
        prev.map((order) =>
          selectedIds.includes(order._id)
            ? { ...order, status: bulkStatus }
            : order
        )
      );
      setSelectedIds([]);
    } catch (error) {
      console.error(error);
    }
  };

  // ✅ Checkbox бүгдийг сонгох
  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedIds(paginatedOrders.map((o) => o._id));
    } else {
      setSelectedIds([]);
    }
  };

  // ✅ Pagination
  const totalPages = Math.ceil(orders.length / ITEMS_PER_PAGE);
  const paginatedOrders = orders.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-gray-400">Уншиж байна...</p>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-4">
      {/* Header */}
      <div className="flex justify-between items-center flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-bold">Orders</h1>
          <p className="text-sm text-gray-400">{orders.length} items</p>
        </div>

        {/* ✅ Олноор төлөв өөрчлөх */}
        {selectedIds.length > 0 && (
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500">
              {selectedIds.length} сонгогдсон
            </span>
            <select
              value={bulkStatus}
              onChange={(e) => setBulkStatus(e.target.value)}
              className="border rounded-md px-3 py-1.5 text-sm"
            >
              {STATUS_OPTIONS.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
            <button
              onClick={handleBulkStatusChange}
              className="bg-[#18181B] text-white px-4 py-1.5 rounded-md text-sm"
            >
              Change delivery state
            </button>
          </div>
        )}
      </div>

      {/* ✅ Table */}
      <div className="bg-white rounded-xl shadow-sm overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="border-b">
            <tr className="text-gray-500 text-left">
              <th className="px-4 py-3">
                <input
                  type="checkbox"
                  onChange={(e) => handleSelectAll(e.target.checked)}
                  checked={
                    selectedIds.length === paginatedOrders.length &&
                    paginatedOrders.length > 0
                  }
                />
              </th>
              <th className="px-4 py-3">№</th>
              <th className="px-4 py-3">Customer</th>
              <th className="px-4 py-3">Food</th>
              <th className="px-4 py-3">Date</th>
              <th className="px-4 py-3">Total</th>
              <th className="px-4 py-3">Delivery Address</th>
              <th className="px-4 py-3">Delivery state</th>
            </tr>
          </thead>
          <tbody>
            {paginatedOrders.map((order, index) => (
              <React.Fragment key={order._id}>
                <tr
                  key={order._id}
                  className="border-b hover:bg-gray-50 transition-colors"
                >
                  {/* Checkbox */}
                  <td className="px-4 py-3">
                    <input
                      type="checkbox"
                      checked={selectedIds.includes(order._id)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedIds((prev) => [...prev, order._id]);
                        } else {
                          setSelectedIds((prev) =>
                            prev.filter((id) => id !== order._id)
                          );
                        }
                      }}
                    />
                  </td>

                  {/* № */}
                  <td className="px-4 py-3 text-gray-500">
                    {(currentPage - 1) * ITEMS_PER_PAGE + index + 1}
                  </td>

                  {/* Customer */}
                  <td className="px-4 py-3 font-medium">
                    {order.user?.email ?? "—"}
                  </td>

                  {/* Food dropdown */}
                  <td className="px-4 py-3">
                    <button
                      onClick={() =>
                        setExpandedId(
                          expandedId === order._id ? null : order._id
                        )
                      }
                      className="flex items-center gap-1 text-gray-600 hover:text-black"
                    >
                      {order.foodOrderItems.length} foods
                      <span>{expandedId === order._id ? "▲" : "▼"}</span>
                    </button>
                  </td>

                  {/* Date */}
                  <td className="px-4 py-3 text-gray-500">
                    {new Date(order.createdAt).toLocaleDateString("en-CA")}
                  </td>

                  {/* Total */}
                  <td className="px-4 py-3 font-semibold">
                    ${order.totalPrice}
                  </td>

                  {/* Delivery Address */}
                  <td className="px-4 py-3 text-gray-500 max-w-[200px] truncate">
                    {order.deliveryAddress}
                  </td>

                  {/* Delivery State */}
                  <td className="px-4 py-3">
                    <select
                      value={order.status}
                      onChange={(e) =>
                        handleStatusChange(order._id, e.target.value)
                      }
                      className={`border rounded-full px-3 py-1 text-xs font-medium ${statusColor[order.status]}`}
                    >
                      {STATUS_OPTIONS.map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </td>
                </tr>

                {/* ✅ Food expand */}
                {expandedId === order._id && (
                  <tr key={`${order._id}-expanded`} className="bg-gray-50">
                    <td colSpan={8} className="px-8 py-3">
                      <div className="space-y-2">
                        {order.foodOrderItems.map((item, i) => (
                          <div key={i} className="flex items-center gap-3">
                            {item.image && (
                              <img
                                src={`${baseUrl}${item.image}`}
                                alt={item.name}
                                className="w-10 h-10 rounded-md object-cover"
                              />
                            )}
                            <span className="font-medium">{item.name}</span>
                            <span className="text-gray-400">
                              x {item.quantity}
                            </span>
                            <span className="text-green-600 font-medium">
                              ${item.price * item.quantity}
                            </span>
                          </div>
                        ))}
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>

      {/* ✅ Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-end items-center gap-1">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`w-8 h-8 rounded-md text-sm ${
                currentPage === page
                  ? "bg-[#18181B] text-white"
                  : "border hover:bg-gray-50"
              }`}
            >
              {page}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default Order;