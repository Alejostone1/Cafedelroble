"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard, Package, Tag, ShoppingBag, Users,
  Image as ImageIcon, Settings, Coffee, BarChart2, X,
} from "lucide-react";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/dashboard",                label: "Dashboard",    icon: LayoutDashboard },
  { href: "/dashboard/productos",      label: "Productos",    icon: Package },
  { href: "/dashboard/categorias",     label: "Categorías",   icon: Tag },
  { href: "/dashboard/ordenes",        label: "Órdenes",      icon: ShoppingBag },
  { href: "/dashboard/clientes",       label: "Clientes",     icon: Users },
  { href: "/dashboard/banners",        label: "Banners",      icon: ImageIcon },
  { href: "/dashboard/analytics",      label: "Analytics",    icon: BarChart2 },
  { href: "/dashboard/configuracion",  label: "Configuración",icon: Settings },
];

export function DashboardSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-sidebar border-r border-sidebar-line flex flex-col shrink-0">
      {/* Logo */}
      <div className="h-16 flex items-center px-6 border-b border-sidebar-line">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-brand flex items-center justify-center">
            <Coffee className="w-3.5 h-3.5 text-brand-fg" />
          </div>
          <span className="font-bold text-fg text-sm">Admin Panel</span>
        </Link>
      </div>

      {/* Nav */}
      <nav className="flex-1 py-4 px-3 space-y-0.5 overflow-y-auto">
        {navItems.map((item) => {
          const active = pathname === item.href || (item.href !== "/dashboard" && pathname.startsWith(item.href));
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                active
                  ? "bg-sidebar-item-active text-sidebar-item-active-fg"
                  : "text-sidebar-fg hover:bg-sidebar-item-hover hover:text-fg"
              )}
            >
              <item.icon className={cn(
                "w-4 h-4 shrink-0",
                active ? "text-sidebar-item-active-fg" : "text-fg-muted"
              )} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Bottom */}
      <div className="p-4 border-t border-sidebar-line space-y-2">
        <div className="flex items-center justify-between px-3">
          <span className="text-xs text-fg-muted">Tema</span>
          <ThemeToggle size="sm" />
        </div>
        <Link
          href="/"
          className="flex items-center gap-2 px-3 py-2 text-xs text-fg-muted hover:text-fg-secondary transition-colors rounded-lg hover:bg-sidebar-item-hover"
        >
          <X className="w-3.5 h-3.5" />
          Salir del panel
        </Link>
      </div>
    </aside>
  );
}
