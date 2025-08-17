"use client";

import { ThemeToggle } from "../theme/ThemeToggle";

export function TopBar() {
  return (
    <header className="flex items-center justify-between px-4 h-14 border-b bg-topbar-background backdrop-blur supports-[backdrop-filter]:bg-topbar-background/80">
      <h1 className="text-sm font-medium">Dashboard</h1>
      <div className="flex items-center gap-2 md:hidden">
        <ThemeToggle />
      </div>
    </header>
  );
}
