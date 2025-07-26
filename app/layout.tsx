import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";

import {
  ClerkProvider,
} from '@clerk/nextjs'
import { NotebookProvider } from "@/context/notebook-context";

const inter = Inter({
  subsets: ["latin"],
});


export const metadata: Metadata = {
  title: "NoteFlow",
  description: "Where ideas and AI flow together",
};

export default function RootLayout({ children, }: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <ClerkProvider afterSignOutUrl={"/"}>
      <html lang="en" suppressHydrationWarning>
        <body
          className={inter.className}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange>
            <NotebookProvider>{children}</NotebookProvider>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
