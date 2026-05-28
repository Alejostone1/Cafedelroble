"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShoppingCart, Menu, Search, User, X, Coffee, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useCartStore } from "@/store/cart-store";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/productos", label: "Productos" },
  { href: "/categorias", label: "Categorías" },
  { href: "/sobre-nosotros", label: "Nosotros" },
  { href: "/contacto", label: "Contacto" },
];

export function Navbar() {
  const pathname = usePathname();
  const totalItems = useCartStore((s) => s.getTotalItems());
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        scrolled
          ? "bg-white/95 backdrop-blur-md shadow-sm border-b border-stone-100"
          : "bg-white border-b border-stone-100"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-amber-600 flex items-center justify-center group-hover:bg-amber-700 transition-colors">
              <Coffee className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-stone-900 text-lg tracking-tight">
              Café del Roble
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                  pathname === link.href || pathname.startsWith(link.href + "/")
                    ? "bg-amber-50 text-amber-700"
                    : "text-stone-600 hover:text-stone-900 hover:bg-stone-50"
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-1">
            {/* Search */}
            {searchOpen ? (
              <div className="flex items-center gap-2 animate-fade-up">
                <input
                  autoFocus
                  type="text"
                  placeholder="Buscar productos..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && searchQuery.trim()) {
                      window.location.href = `/productos?q=${encodeURIComponent(searchQuery)}`;
                    }
                    if (e.key === "Escape") setSearchOpen(false);
                  }}
                  className="h-9 w-48 rounded-lg border border-stone-200 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
                <button
                  onClick={() => setSearchOpen(false)}
                  className="p-2 text-stone-400 hover:text-stone-600 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => setSearchOpen(true)}
                className="p-2 text-stone-600 hover:text-stone-900 hover:bg-stone-50 rounded-lg transition-colors"
                aria-label="Buscar"
              >
                <Search className="w-5 h-5" />
              </button>
            )}

            {/* Account */}
            <Link
              href="/auth/login"
              className="p-2 text-stone-600 hover:text-stone-900 hover:bg-stone-50 rounded-lg transition-colors hidden sm:flex"
              aria-label="Mi cuenta"
            >
              <User className="w-5 h-5" />
            </Link>

            {/* Cart */}
            <Link
              href="/carrito"
              className="relative p-2 text-stone-600 hover:text-stone-900 hover:bg-stone-50 rounded-lg transition-colors"
              aria-label={`Carrito: ${totalItems} productos`}
            >
              <ShoppingCart className="w-5 h-5" />
              {totalItems > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-5 h-5 rounded-full bg-amber-600 text-white text-[10px] font-bold flex items-center justify-center">
                  {totalItems > 99 ? "99+" : totalItems}
                </span>
              )}
            </Link>

            {/* Mobile Menu */}
            <Sheet>
              <SheetTrigger asChild>
                <button
                  className="p-2 text-stone-600 hover:text-stone-900 hover:bg-stone-50 rounded-lg transition-colors md:hidden"
                  aria-label="Menú"
                >
                  <Menu className="w-5 h-5" />
                </button>
              </SheetTrigger>
              <SheetContent side="right" className="w-72">
                <div className="flex flex-col gap-1 mt-6">
                  <Link href="/" className="flex items-center gap-2 mb-6">
                    <div className="w-8 h-8 rounded-lg bg-amber-600 flex items-center justify-center">
                      <Coffee className="w-4 h-4 text-white" />
                    </div>
                    <span className="font-bold text-stone-900 text-lg">Café del Roble</span>
                  </Link>
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={cn(
                        "px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                        pathname === link.href
                          ? "bg-amber-50 text-amber-700"
                          : "text-stone-700 hover:bg-stone-50"
                      )}
                    >
                      {link.label}
                    </Link>
                  ))}
                  <div className="mt-4 pt-4 border-t border-stone-100">
                    <Link
                      href="/auth/login"
                      className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium text-stone-700 hover:bg-stone-50 transition-colors"
                    >
                      <User className="w-4 h-4" />
                      Mi cuenta
                    </Link>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
