"use client"

import {  SignUp } from "@clerk/nextjs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { dark } from "@clerk/themes";
import { useTheme } from "next-themes";


export default function Page() {
  const { resolvedTheme } = useTheme();
  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-4 py-10">
      <Card className="w-full max-w-md shadow-2xl animate-fade-in border-muted/50 rounded-2xl">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-semibold tracking-tight">Welcome</CardTitle>
          <p className="text-muted-foreground text-sm mt-1">Sign in to your account</p>
        </CardHeader>
        <CardContent className="flex justify-center">
          <SignUp appearance={{baseTheme: resolvedTheme === "dark" ? dark : undefined}}/>
        </CardContent>
      </Card>
    </main>
  );
}
