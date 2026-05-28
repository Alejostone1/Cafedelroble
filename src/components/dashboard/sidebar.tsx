"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard, Package, Tag, ShoppingBag, Users,
  Image as ImageIcon, Settings, Coffee, BarChart2, X,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/dashboard/productos", label: "Productos", icon: Package },
  { href: "/dashboard/categorias", label: "Categorías", icon: Tag },
  { href: "/dashboard/ordenes", label: "Órdenes", icon: ShoppingBag },
  { href: "/dashboard/clientes", label: "Clientes", icon: Users },
  { href: "/dashboard/banners", label: "Banners", icon: ImageIcon },
  { href: "/dashboard/analytics", label: "Analytics", icon: BarChart2 },
  { href: "/dashboard/configuracion", label: "Configuración", icon: Settings },
];

export function DashboardSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-white border-r border-stone-100 flex flex-col shrink-0">
      {/* Logo */}
      <div className="h-16 flex items-center px-6 border-b border-stone-100">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-amber-600 flex items-center justify-center">
            <Coffee className="w-3.5 h-3.5 text-white" />
          </div>
          <span className="font-bold text-stone-900 text-sm">Admin Panel</span>
        </Link>
      </div>

      {/* Navigation */}
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
                  ? "bg-amber-50 text-amber-700"
                  : "text-stone-600 hover:bg-stone-50 hover:text-stone-900"
              )}
            >
              <item.icon className={cn("w-4 h-4 shrink-0", active ? "text-amber-600" : "text-stone-400")} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Bottom */}
      <div className="p-4 border-t border-stone-100">
        <Link
          href="/"
          className="flex items-center gap-2 px-3 py-2 text-xs text-stone-400 hover:text-stone-600 transition-colors rounded-lg hover:bg-stone-50"
        >
          <X className="w-3.5 h-3.5" />
          Salir del panel
        </Link>
      </div>
    </aside>
  );
}
