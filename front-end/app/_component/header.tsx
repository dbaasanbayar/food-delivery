"use client";
import { Logo } from "../_assets/logo";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useCart } from "../contexts/CartContext";
import { CartSidebar } from "./CartSidebar";

export function Header() {
  const router = useRouter();
  const { totalItems } = useCart();
  const [cartOpen, setCartOpen] = useState(false);

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
          <div className="bg-white px-5 flex gap-2 rounded-4xl">
            <span className="text-red-300">Delivery address:</span>
            <span>Add location</span>
          </div>

          {/* ✅ Cart icon */}
          <button
            onClick={() => setCartOpen(true)}
            className="relative text-white"
          >
            🛒
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </button>

          {/* Sign Out */}
          <button
            onClick={handleSignOut}
            className="text-white text-sm border border-white rounded-full hover:bg-white hover:opacity-50 transition-all"
          >
            <img src="/images/avatar_image.png" alt="" />
          </button>

        </div>
      </div>

      {/* ✅ Cart Sidebar */}
      {cartOpen && <CartSidebar onClose={() => setCartOpen(false)} />}
    </>
  );
}
