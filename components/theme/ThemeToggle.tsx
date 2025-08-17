"use client";

import { useTheme } from "./ThemeProvider";

export function ThemeToggle() {
  const { theme, toggle } = useTheme();
  return (
    <button
      type="button"
      aria-label="Toggle theme"
      onClick={toggle}
      className="inline-flex items-center gap-1 rounded border px-3 py-1.5 text-xs font-medium bg-muted hover:bg-accent transition-colors"
    >
      {theme === "light" ? "🌞 Light" : "🌚 Dark"}
    </button>
  );
}
