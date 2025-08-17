"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { ThemeToggle } from "../theme/ThemeToggle";

const navItems = [
  { href: "/", label: "Dashboard" }
];

export function Sidebar() {
  const pathname = usePathname();
  return (
    <aside className="hidden md:flex md:flex-col w-60 border-r bg-sidebar-background text-sidebar-foreground">
      <div className="p-4 font-bold text-lg">MyApp</div>
      <nav className="flex-1 px-2 space-y-1">
        {navItems.map(item => {
          const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`block rounded px-3 py-2 text-sm transition-colors ${
                  active
                    ? "bg-accent text-accent-foreground"
                    : "hover:bg-muted hover:text-foreground text-muted-foreground"
                }`}
              >
                {item.label}
              </Link>
            );
        })}
      </nav>
      <div className="p-4">
        <ThemeToggle />
      </div>
    </aside>
  );
}
