
"use client";
import { Logo } from "../_assets/logo";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useCart } from "@/app/contexts/CartContext";
import { CartSidebar } from "./CartSidebar";
import { baseUrl } from "@/lib/type";
import { CartIcon } from "../_assets/cart_icon";

export function Header() {
  const router = useRouter();
  const [cartOpen, setCartOpen] = useState(false);
  const [address, setAddress] = useState<string>("Add location");
  const [showConfirm, setShowConfirm] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const { totalItems, deliveryAddress } = useCart();
  
  useEffect(() => {
    const fetchUserAddress = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const payload = JSON.parse(atob(token.split(".")[1]));
        if (payload.role === "ADMIN") {
          setIsAdmin(true);
        }

        const userId = payload._id;
        const res = await fetch(`${baseUrl}/user/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (data.address) setAddress(data.address);
      } catch (error) {
        console.error(error);
      }
    };
    fetchUserAddress();
  }, []);

  const handleSignOut = () => {
    localStorage.removeItem("token");
    router.push("/sign_in");
  };

  return (
    <>
      <div className="bg-[#18181B] w-full flex justify-between px-10 py-2">
        <div className="flex items-center gap-2">
          <Logo />
          <div className="text-white">
            <h1 className="flex gap-1">
              Nom<span className="text-red-300">Nom</span>
            </h1>
            <p>Swift delivery</p>
          </div>
        </div>
        <div className="flex items-center text-sm gap-5">

          {/* ✅ Admin бол Dashboard link харуулна */}
          {isAdmin && (
            <button
              onClick={() => router.push("/food")}
              className="text-white text-sm px-4 py-1.5 border border-white rounded-full hover:bg-white hover:text-black transition-all"
            >
              Dashboard
            </button>
          )}

          {/* Delivery Address */}
          <div className="bg-white px-5 flex gap-2 rounded-full items-center h-9">
            <span className="text-red-300">📍</span>
            <span className="text-gray-700 max-w-[150px] truncate">
              {deliveryAddress || "Add location"}
            </span>
          </div>
          {/* Cart icon */}
          <button
            onClick={() => setCartOpen(true)}
            className="relative text-white"
          >
           <CartIcon/>
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </button>

          {/* Sign Out — Avatar */}
          <button
            onClick={() => setShowConfirm(true)}
            className="text-white text-sm border border-white rounded-full hover:opacity-50 transition-all"
          >
            <img src="/images/avatar_image.png" alt="" />
          </button>
        </div>
      </div>
              
      {/* Cart Sidebar */}
      {cartOpen && <CartSidebar onClose={() => setCartOpen(false)} />}

      {/* Confirm Dialog */}
      {showConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setShowConfirm(false)}
          />
          <div className="relative bg-white rounded-xl shadow-xl p-6 w-80 space-y-4">
            <h2 className="text-lg font-bold text-center">
              Системээс гарах уу?
            </h2>
            <p className="text-sm text-gray-500 text-center">
              Та системээс гарахдаа итгэлтэй байна уу?
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowConfirm(false)}
                className="flex-1 py-2 border rounded-md text-sm hover:bg-gray-50 transition-colors"
              >
                Үгүй
              </button>
              <button
                onClick={handleSignOut}
                className="flex-1 py-2 bg-red-500 text-white rounded-md text-sm hover:bg-red-600 transition-colors"
              >
                Тийм, гарах
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}