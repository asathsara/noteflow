import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { ReactNode } from "react";

export default function MainLayout({ children }: { children: ReactNode }) {
    return (
        <SidebarProvider>
                <AppSidebar />
                <main className="flex-1 bg-muted/30 py-12 px-4 sm:px-6 lg:px-8">
                    <SidebarTrigger />
                    {children}
                </main>
        </SidebarProvider>
    );
}
