"use client";
import {
  Sidebar, SidebarContent, SidebarFooter,
  SidebarGroup, SidebarHeader, SidebarProvider,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { MenuLogo } from "@/app/_assets/food_menu_logo";
import { Logo } from "@/app/_assets/logo";
import { OrderLogo } from "@/app/_assets/order_logo";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const currentPath = usePathname();
  const router = useRouter();
  const [isAdmin, setIsAdmin] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [adminEmail, setAdminEmail] = useState(""); // ✅ нэмэх

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) { router.push("/sign_in"); return; }
    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      if (payload.role === "ADMIN") {
        setIsAdmin(true);
        setAdminEmail(payload.email); // ✅ email авах
      } else {
        router.push("/");
      }
    } catch (error) {
      router.push("/sign_in");
    }
  }, []);

  const confirmSignOut = () => {
    localStorage.removeItem("token");
    router.push("/sign_in");
  };

  if (!isAdmin) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-400">Шалгаж байна...</p>
      </div>
    );
  }

  return (
    <div className="flex">
      <SidebarProvider className="w-full bg-[#F4F4F5] flex">
        <Sidebar>
          <SidebarHeader className="flex gap-2 items-center justify-center" />
          <Link href={"/"}>
          <div className="flex gap-2 items-center justify-center p-4">
            <Logo />
            <div>
              <h2>Nom Nom</h2>
              <p>Swift delivery</p>
            </div>
          </div>
          </Link>
          <SidebarContent className="flex items-center">
            <SidebarGroup />
            <Link href="/food">
              <Button className={`w-[165px] cursor-pointer ${currentPath === "/food" ? "bg-red-400" : ""}`}>
                <MenuLogo />
                Food menu
              </Button>
            </Link>
            <Link href="/order">
              <Button className={`w-[165px] cursor-pointer ${currentPath === "/order" ? "bg-red-400" : ""}`}>
                <OrderLogo />
                Orders
              </Button>
            </Link>
            <SidebarGroup />
          </SidebarContent>
          <SidebarFooter className="p-4" />
        </Sidebar>

        <div className="flex flex-col w-full px-7">
          {/* ✅ Admin Header */}
          <div className="flex justify-end items-center gap-4 py-4 border-b mb-4">
            <span className="text-sm text-gray-500">{adminEmail}</span>
            <button
              onClick={() => setShowConfirm(true)}
              className="border border-white rounded-full hover:opacity-70 transition-all"
            >
              <img className="w-9 h-9 rounded-full" src="/images/avatar_image.png" alt="" />
            </button>
          </div>

          <div className="w-full h-full">{children}</div>
        </div>
      </SidebarProvider>

      {/* ✅ Confirm Dialog */}
      {showConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/50" onClick={() => setShowConfirm(false)} />
          <div className="relative bg-white rounded-xl shadow-xl p-6 w-80 space-y-4">
            <h2 className="text-lg font-bold text-center">Системээс гарах уу?</h2>
            {/* ✅ Admin email харуулна */}
            <p className="text-sm text-gray-500 text-center">
              <span className="font-medium text-black">{adminEmail}</span>
              <br />
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
                onClick={confirmSignOut}
                className="flex-1 py-2 bg-red-500 text-white rounded-md text-sm hover:bg-red-600 transition-colors"
              >
                Тийм, гарах
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}