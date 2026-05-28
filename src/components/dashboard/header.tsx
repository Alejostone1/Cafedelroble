"use client";

import { signOut } from "next-auth/react";
import { Bell, LogOut, User } from "lucide-react";
import { Button } from "@/components/ui/button";

interface DashboardHeaderProps {
  user: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
  };
}

export function DashboardHeader({ user }: DashboardHeaderProps) {
  return (
    <header className="h-16 bg-white border-b border-stone-100 flex items-center justify-between px-6 shrink-0">
      <div />
      <div className="flex items-center gap-3">
        <button className="p-2 text-stone-400 hover:text-stone-600 rounded-lg hover:bg-stone-50 transition-colors">
          <Bell className="w-4 h-4" />
        </button>
        <div className="flex items-center gap-2 pl-3 border-l border-stone-100">
          <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center">
            <User className="w-4 h-4 text-amber-600" />
          </div>
          <div className="hidden sm:block">
            <p className="text-sm font-medium text-stone-900 leading-none">{user.name ?? "Admin"}</p>
            <p className="text-xs text-stone-400 mt-0.5">{user.email}</p>
          </div>
          <button
            onClick={() => signOut({ callbackUrl: "/auth/login" })}
            className="ml-2 p-2 text-stone-400 hover:text-red-500 rounded-lg hover:bg-red-50 transition-colors"
            title="Cerrar sesión"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
}
