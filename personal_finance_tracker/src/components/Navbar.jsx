"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Navbar() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <header className="w-full px-6 py-4 bg-background border-b flex justify-between items-center">
      {/* Left side - App Name */}
      <h1 className="text-xl font-semibold">Personal Finance</h1>

      {/* Right side - Theme Toggle */}
      <Button
        variant="outline"
        className="rounded-md px-4 py-2 flex items-center gap-2"
        onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      >
        {theme === "light" ? <Sun size={18} /> : <Moon size={18} />}
        <span className="text-sm">{theme === "light" ? "Light" : "Dark"}</span>
      </Button>
    </header>
  );
}
