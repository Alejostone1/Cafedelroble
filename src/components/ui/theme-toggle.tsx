"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/providers/theme-provider";
import { cn } from "@/lib/utils";

interface ThemeToggleProps {
  className?: string;
  size?: "sm" | "default";
}

export function ThemeToggle({ className, size = "default" }: ThemeToggleProps) {
  const { resolvedTheme, toggleTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  return (
    <button
      onClick={toggleTheme}
      aria-label={isDark ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
      className={cn(
        "relative rounded-xl border border-line bg-surface-hover transition-all hover:border-line-strong",
        size === "default" ? "w-12 h-6" : "w-10 h-5",
        className
      )}
    >
      {/* Track */}
      <div className={cn(
        "absolute inset-0.5 rounded-lg transition-colors duration-300",
        isDark ? "bg-brand-subtle" : "bg-muted-bg"
      )} />

      {/* Thumb */}
      <div className={cn(
        "absolute top-0.5 flex items-center justify-center rounded-md bg-surface shadow-token-sm transition-all duration-300",
        size === "default" ? "w-5 h-5" : "w-4 h-4",
        isDark
          ? size === "default" ? "left-[calc(100%-22px)]" : "left-[calc(100%-18px)]"
          : "left-0.5"
      )}>
        {isDark
          ? <Moon className={cn("text-fg-brand", size === "default" ? "w-3 h-3" : "w-2.5 h-2.5")} />
          : <Sun className={cn("text-fg-brand", size === "default" ? "w-3 h-3" : "w-2.5 h-2.5")} />
        }
      </div>
    </button>
  );
}
