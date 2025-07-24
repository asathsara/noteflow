import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { ReactNode } from "react";

import {
    SignInButton,
    SignUpButton,
    SignedIn,
    SignedOut,
    UserButton,
} from '@clerk/nextjs'
import { Button } from "@/components/ui/button";

export default function MainLayout({ children }: { children: ReactNode }) {
    return (


        <SidebarProvider>
            <AppSidebar />

            <main className="flex-1 bg-muted/30 px-4 sm:px-6 lg:px-8">

                <header className="flex justify-end items-center p-4 gap-4 h-16">
                    <SignedOut>
                        <SignInButton>
                            <Button variant="outline">Sign In</Button>
                        </SignInButton>
                        <SignUpButton>
                            <Button>Sign Up</Button>
                        </SignUpButton>
                    </SignedOut>

                    <SignedIn>
                        <UserButton />
                    </SignedIn>
                </header>
                <SidebarTrigger />

                {children}
            </main>
        </SidebarProvider>
    );
}
