import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarProvider,
} from "@/components/ui/sidebar";

// import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

export const AllDishesList = () => {
  console.log("connected");
  return (
    <div>
      <SidebarProvider>
        <Sidebar>
          <SidebarHeader />
          <SidebarContent>
            <SidebarGroup />

            <SidebarGroup />
          </SidebarContent>
          <SidebarFooter />
        </Sidebar>
      </SidebarProvider>
    </div>
  );
};
