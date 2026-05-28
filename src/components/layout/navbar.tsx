"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { ShoppingCart, Menu, Search, User, X, Coffee, ArrowRight } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { useCartStore } from "@/store/cart-store";
import { formatPrice } from "@/lib/utils";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/productos", label: "Productos" },
  { href: "/categorias", label: "Categorías" },
  { href: "/sobre-nosotros", label: "Nosotros" },
  { href: "/contacto", label: "Contacto" },
];

interface Sugerencia {
  id: string;
  name: string;
  slug: string;
  price: number;
  image: string | null;
  category: string;
}

export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const totalItems = useCartStore((s) => s.getTotalItems());

  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [sugerencias, setSugerencias] = useState<Sugerencia[]>([]);
  const [cargando, setCargando] = useState(false);
  const [enfocado, setEnfocado] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => { cerrarBuscador(); }, [pathname]);

  useEffect(() => {
    function onClickFuera(e: MouseEvent) {
      if (
        dropdownRef.current && !dropdownRef.current.contains(e.target as Node) &&
        inputRef.current && !inputRef.current.contains(e.target as Node)
      ) setEnfocado(false);
    }
    document.addEventListener("mousedown", onClickFuera);
    return () => document.removeEventListener("mousedown", onClickFuera);
  }, []);

  const buscar = useCallback((texto: string) => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    if (texto.trim().length < 2) { setSugerencias([]); return; }
    debounceRef.current = setTimeout(async () => {
      setCargando(true);
      try {
        const res = await fetch(`/api/productos/buscar?q=${encodeURIComponent(texto)}`);
        setSugerencias(await res.json());
      } catch { setSugerencias([]); } finally { setCargando(false); }
    }, 280);
  }, []);

  function cerrarBuscador() {
    setSearchOpen(false); setQuery(""); setSugerencias([]); setEnfocado(false);
  }
  function abrirBuscador() {
    setSearchOpen(true); setTimeout(() => inputRef.current?.focus(), 60);
  }
  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter" && query.trim()) {
      router.push(`/productos?q=${encodeURIComponent(query.trim())}`); cerrarBuscador();
    }
    if (e.key === "Escape") cerrarBuscador();
  }
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setQuery(e.target.value); buscar(e.target.value);
  }
  function irAProducto(slug: string) { router.push(`/productos/${slug}`); cerrarBuscador(); }
  function irACatalogo() {
    if (query.trim()) { router.push(`/productos?q=${encodeURIComponent(query.trim())}`); cerrarBuscador(); }
  }

  const mostrarDropdown = enfocado && query.trim().length >= 2;

  return (
    <header className={cn(
      "sticky top-0 z-50 w-full transition-all duration-300 border-b border-navbar-line",
      scrolled ? "bg-navbar/95 backdrop-blur-md shadow-token-sm" : "bg-navbar"
    )}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-3">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group shrink-0">
            <div className="w-8 h-8 rounded-lg bg-brand flex items-center justify-center group-hover:bg-brand-hover transition-colors">
              <Coffee className="w-4 h-4 text-brand-fg" />
            </div>
            <span className="font-bold text-fg text-lg tracking-tight hidden sm:block">
              Café del Roble
            </span>
          </Link>

          {/* Nav desktop */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href}
                className={cn(
                  "px-3 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap",
                  pathname === link.href || pathname.startsWith(link.href + "/")
                    ? "bg-brand-subtle text-fg-brand"
                    : "text-fg-secondary hover:text-fg hover:bg-surface-hover"
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Acciones */}
          <div className="flex items-center gap-1">

            {/* ── Buscador ── */}
            {searchOpen ? (
              <div className="relative flex items-center gap-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400 pointer-events-none" />
                  <input
                    ref={inputRef}
                    type="text"
                    value={query}
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                    onFocus={() => setEnfocado(true)}
                    placeholder="Buscar café, productos..."
                    className="h-9 w-52 sm:w-72 rounded-xl border border-input-line bg-input pl-9 pr-4 text-sm text-fg placeholder:text-fg-muted focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all"
                  />
                  {cargando && (
                    <svg className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 animate-spin text-amber-500" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                    </svg>
                  )}
                </div>
                <button onClick={cerrarBuscador} className="p-2 text-stone-400 hover:text-stone-700 hover:bg-stone-100 rounded-lg transition-colors" aria-label="Cerrar">
                  <X className="w-4 h-4" />
                </button>

                {/* Dropdown de sugerencias */}
                {mostrarDropdown && (
                  <div ref={dropdownRef} className="absolute top-full left-0 mt-2 w-full sm:w-80 bg-elevated rounded-2xl border border-line shadow-token-xl overflow-hidden z-50">
                    {sugerencias.length > 0 ? (
                      <>
                        <p className="px-4 py-2.5 text-xs text-fg-muted font-medium uppercase tracking-wider border-b border-line-muted">
                          Resultados encontrados
                        </p>
                        <ul>
                          {sugerencias.map((s) => (
                            <li key={s.id}>
                              <button onMouseDown={() => irAProducto(s.slug)}
                                className="w-full flex items-center gap-3 px-4 py-3 hover:bg-brand-subtle transition-colors text-left group"
                              >
                                <div className="w-10 h-10 rounded-xl overflow-hidden bg-muted-bg shrink-0">
                                  {s.image
                                    ? <Image src={s.image} alt={s.name} width={40} height={40} className="w-full h-full object-cover"/>
                                    : <div className="w-full h-full flex items-center justify-center text-lg">☕</div>
                                  }
                                </div>
                                <div className="flex-1 min-w-0">
                                  <p className="text-sm font-medium text-fg truncate group-hover:text-fg-brand transition-colors">{s.name}</p>
                                  <p className="text-xs text-fg-muted">{s.category}</p>
                                </div>
                                <span className="text-sm font-bold text-fg-brand shrink-0">{formatPrice(s.price)}</span>
                              </button>
                            </li>
                          ))}
                        </ul>
                        <button onMouseDown={irACatalogo}
                          className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-muted-bg hover:bg-brand-subtle text-sm font-medium text-fg-secondary hover:text-fg-brand transition-colors border-t border-line-muted"
                        >
                          Ver todos los resultados <ArrowRight className="w-4 h-4" />
                        </button>
                      </>
                    ) : (
                      <div className="px-4 py-8 text-center">
                        <p className="text-3xl mb-3">🔍</p>
                        <p className="text-sm font-medium text-fg">Sin resultados para &quot;{query}&quot;</p>
                        <button onMouseDown={irACatalogo} className="mt-3 text-xs text-fg-brand hover:text-fg-link font-medium underline">
                          Buscar en todo el catálogo
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ) : (
              <button onClick={abrirBuscador} className="p-2 text-stone-600 hover:text-stone-900 hover:bg-stone-50 rounded-lg transition-colors" aria-label="Buscar">
                <Search className="w-5 h-5" />
              </button>
            )}

            {/* Toggle tema */}
            <ThemeToggle className="hidden sm:flex mx-1" />

            {/* Cuenta */}
            <Link href="/auth/login" className="p-2 text-fg-secondary hover:text-fg hover:bg-surface-hover rounded-lg transition-colors hidden sm:flex" aria-label="Mi cuenta">
              <User className="w-5 h-5" />
            </Link>

            {/* Carrito */}
            <Link href="/carrito" className="relative p-2 text-fg-secondary hover:text-fg hover:bg-surface-hover rounded-lg transition-colors" aria-label={`Carrito: ${totalItems}`}>
              <ShoppingCart className="w-5 h-5" />
              {totalItems > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-5 h-5 rounded-full bg-amber-600 text-white text-[10px] font-bold flex items-center justify-center">
                  {totalItems > 99 ? "99+" : totalItems}
                </span>
              )}
            </Link>

            {/* Menú móvil */}
            <Sheet>
              <SheetTrigger asChild>
                <button className="p-2 text-fg-secondary hover:text-fg hover:bg-surface-hover rounded-lg transition-colors md:hidden" aria-label="Menú">
                  <Menu className="w-5 h-5" />
                </button>
              </SheetTrigger>
              <SheetContent side="right" className="w-72 bg-surface border-l border-line">
                <div className="flex flex-col gap-1 mt-6">
                  <Link href="/" className="flex items-center gap-2 mb-5">
                    <div className="w-8 h-8 rounded-lg bg-brand flex items-center justify-center">
                      <Coffee className="w-4 h-4 text-brand-fg" />
                    </div>
                    <span className="font-bold text-fg text-lg">Café del Roble</span>
                  </Link>
                  {/* Buscador en móvil */}
                  <form
                    className="relative mb-4"
                    onSubmit={(e) => {
                      e.preventDefault();
                      const q = (e.currentTarget.elements.namedItem("mq") as HTMLInputElement).value.trim();
                      if (q) router.push(`/productos?q=${encodeURIComponent(q)}`);
                    }}
                  >
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-fg-muted" />
                    <input name="mq" type="search" placeholder="Buscar productos..."
                      className="w-full h-10 rounded-xl border border-input-line bg-input pl-9 pr-3 text-sm text-fg placeholder:text-fg-muted focus:outline-none focus:ring-2 focus:ring-ring"
                    />
                  </form>
                  {navLinks.map((link) => (
                    <Link key={link.href} href={link.href}
                      className={cn(
                        "px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                        pathname === link.href ? "bg-brand-subtle text-fg-brand" : "text-fg-secondary hover:bg-surface-hover hover:text-fg"
                      )}
                    >
                      {link.label}
                    </Link>
                  ))}
                  <div className="mt-4 pt-4 border-t border-line flex items-center justify-between">
                    <Link href="/auth/login" className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium text-fg-secondary hover:bg-surface-hover hover:text-fg transition-colors">
                      <User className="w-4 h-4" /> Mi cuenta
                    </Link>
                    <ThemeToggle size="sm" />
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
