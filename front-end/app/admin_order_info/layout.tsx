import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarProvider,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { MenuLogo } from "@/app/images/_component/food_menu_logo";
import { Logo } from "@/app/images/_component/logo";
import { OrderLogo } from "@/app/images/_component/order_logo";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex">
      <SidebarProvider className="w-full bg-[#F4F4F5] flex justify-between">
        {children}
        <Sidebar className="bg-amber-200">
          <SidebarHeader className="bg-blue-600 flex gap-2 items-center justify-center" />
          <div className="flex gap-2 items-center justify-center">
            <Logo />
            <div>
              <h2>Nom Nom</h2>
              <p>Swift delivery</p>
            </div>
          </div>
          <SidebarContent className="bg-blue-400 flex items-center">
            <SidebarGroup className="bg-amber-300" />
            <Button className="w-[165px] cursor-pointer">
              <MenuLogo />
              <p>Food menu</p>
            </Button>
            <Button className="w-[165px] cursor-pointer">
              <OrderLogo />
              <p>Orders</p>
            </Button>
            <img src="/images/avatar_image.png" alt="" />
            <SidebarGroup className="bg-red-500" />
          </SidebarContent>
          <SidebarFooter className="bg-orange-500" />
        </Sidebar>
        <div>
          <img className="w-9 h-9 " src="/images/avatar_image.png" alt="" />
        </div>
      </SidebarProvider>
    </div>
  );
}
