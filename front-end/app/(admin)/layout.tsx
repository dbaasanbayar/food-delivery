"use client";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarProvider,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { MenuLogo } from "@/app/_assets/food_menu_logo";
import { Logo } from "@/app/_assets/logo";
import { OrderLogo } from "@/app/_assets/order_logo";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const currentPath = usePathname();

  console.log(currentPath);
  return (
    <div className="flex">
      <SidebarProvider className="w-full bg-[#F4F4F5] flex">
        <Sidebar>
          <SidebarHeader className="flex gap-2 items-center justify-center" />
          <div className="flex gap-2 items-center justify-center">
            <Logo />
            <div>
              <h2>Nom Nom</h2>
              <p>Swift delivery</p>
            </div>
          </div>
          <SidebarContent className=" flex items-center">
            <SidebarGroup />
            <Link href="/food">
              <Button
                className={`w-[165px] cursor-pointer hover:not-focus ${
                  currentPath === "/food" ? "bg-red-400" : null
                }`}
              >
                <MenuLogo />
                Food menu
              </Button>
            </Link>
            <Link href="/order">
              <Button
                className={`w-[165px] cursor-pointer ${
                  currentPath === "/order" ? " bg-red-400" : null
                }`}
              >
                <OrderLogo />
                <p>Orders</p>
              </Button>
            </Link>
            <SidebarGroup />
          </SidebarContent>
          <SidebarFooter />
        </Sidebar>
        <div className="flex flex-col w-full px-7">
          <div className="flex justify-end items-center py-7">
            <img className="w-9 h-9 " src="/images/avatar_image.png" alt="" />
          </div>
          <div className="w-full h-full">{children}</div>
        </div>
      </SidebarProvider>
    </div>
  );
}
