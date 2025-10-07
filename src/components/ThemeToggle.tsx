"use client";
import { useTheme } from "@/app/context/ThemeContext";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  return (
    <div className="flex items-center gap-2">
      <label className="sr-only" htmlFor="theme-select">Theme</label>
      <select
        id="theme-select"
        className="rounded-md border border-black/10 dark:border-white/15 bg-white dark:bg-[#071428] text-sm px-2 py-1 focus:outline-none focus:ring-2 focus:ring-ieee-300"
        value={theme}
        onChange={(e) => setTheme(e.target.value as any)}
        aria-label="Theme selection"
      >
        <option value="light">Light</option>
        <option value="dark">Dark</option>
        <option value="system">System</option>
      </select>
    </div>
  );
}
