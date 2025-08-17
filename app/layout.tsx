import "./globals.css";

import { Inter } from "next/font/google";
import React from "react";

import { Sidebar } from "@/components/layout/Sidebar";
import { TopBar } from "@/components/layout/TopBar";
import { ThemeProvider } from "@/components/theme/ThemeProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Dashboard",
  description: "Analytics dashboard"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className + " bg-background text-foreground"}>
        <ThemeProvider>
          <div className="flex h-screen overflow-hidden">
            <Sidebar />
            <div className="flex flex-col flex-1 min-w-0">
              <TopBar />
              <main className="flex-1 overflow-auto p-6">{children}</main>
            </div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
