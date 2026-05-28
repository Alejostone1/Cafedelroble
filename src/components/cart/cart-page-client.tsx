"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Trash2, Plus, Minus, ShoppingBag, ArrowRight,
  MessageCircle, Lock, Truck, ChevronLeft, Tag,
  Coffee, Star, Package,
} from "lucide-react";
import { useCartStore } from "@/store/cart-store";
import { formatPrice } from "@/lib/utils";

const ENVIO_GRATIS = 80000;
const COSTO_ENVIO = 12000;

/* ─────────────────────────────────────────── */
export function CartPageClient() {
  const { items, removeItem, updateQuantity, clearCart, getTotalPrice } = useCartStore();

  const subtotal   = getTotalPrice();
  const shipping   = subtotal >= ENVIO_GRATIS ? 0 : COSTO_ENVIO;
  const total      = subtotal + shipping;
  const progreso   = Math.min((subtotal / ENVIO_GRATIS) * 100, 100);
  const faltante   = ENVIO_GRATIS - subtotal;

  const waNumber  = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "573144264715";
  const waMsg     = encodeURIComponent(
    `Hola! 😊 Quiero hacer este pedido:\n\n` +
    items.map((i) => `• ${i.name} x${i.quantity} — ${formatPrice(i.price * i.quantity)}`).join("\n") +
    `\n\n📦 *Total: ${formatPrice(total)}*`
  );

  /* ── Carrito vacío ── */
  if (items.length === 0) return <CartVacio />;

  return (
    <div className="min-h-screen bg-gradient-to-b from-stone-50 to-white">

      {/* ── Header de página ── */}
      <div className="border-b border-stone-100 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/productos"
              className="w-9 h-9 rounded-xl border border-stone-200 flex items-center justify-center text-stone-500 hover:bg-stone-50 hover:border-stone-300 transition-all"
            >
              <ChevronLeft className="w-4 h-4" />
            </Link>
            <div>
              <h1 className="text-xl font-bold text-stone-900">Mi carrito</h1>
              <p className="text-xs text-stone-400">{items.length} {items.length === 1 ? "producto" : "productos"}</p>
            </div>
          </div>
          <button onClick={clearCart}
            className="text-xs text-stone-400 hover:text-red-500 transition-colors flex items-center gap-1.5 px-3 py-1.5 rounded-lg hover:bg-red-50"
          >
            <Trash2 className="w-3.5 h-3.5" />
            Vaciar
          </button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        <div className="grid lg:grid-cols-[1fr_380px] gap-8 items-start">

          {/* ─── COLUMNA IZQUIERDA: productos ─── */}
          <div className="space-y-3">

            {/* Barra de envío gratis */}
            <ShippingProgressBar progreso={progreso} faltante={faltante} />

            {/* Lista de productos */}
            <div className="space-y-3">
              {items.map((item, i) => (
                <CartItem
                  key={item.productId}
                  item={item}
                  index={i}
                  onRemove={() => removeItem(item.productId)}
                  onQtyChange={(q) => updateQuantity(item.productId, q)}
                />
              ))}
            </div>

            {/* Sugerencia de seguir comprando */}
            <Link href="/productos"
              className="flex items-center justify-center gap-2 py-4 rounded-2xl border-2 border-dashed border-stone-200 text-stone-400 hover:border-amber-300 hover:text-amber-600 hover:bg-amber-50 transition-all text-sm font-medium mt-2"
            >
              <Plus className="w-4 h-4" />
              Agregar más productos
            </Link>
          </div>

          {/* ─── COLUMNA DERECHA: resumen sticky ─── */}
          <div className="lg:sticky lg:top-24 space-y-4">
            <ResumenPedido
              subtotal={subtotal}
              shipping={shipping}
              total={total}
              progreso={progreso}
              faltante={faltante}
              waUrl={`https://wa.me/${waNumber}?text=${waMsg}`}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────
   Barra de progreso para envío gratis
───────────────────────────────────────────────── */
function ShippingProgressBar({ progreso, faltante }: { progreso: number; faltante: number }) {
  return (
    <div className="bg-white rounded-2xl border border-stone-100 p-4">
      <div className="flex items-center justify-between mb-2.5">
        <div className="flex items-center gap-2 text-sm">
          <Truck className={`w-4 h-4 ${progreso >= 100 ? "text-green-500" : "text-stone-400"}`} />
          {progreso >= 100 ? (
            <span className="font-semibold text-green-600">🎉 ¡Tienes envío gratis!</span>
          ) : (
            <span className="text-stone-600">
              Te faltan <strong className="text-amber-700">{formatPrice(faltante)}</strong> para envío gratis
            </span>
          )}
        </div>
        <span className="text-xs text-stone-400 font-medium">{Math.round(progreso)}%</span>
      </div>
      <div className="h-2 bg-stone-100 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-700 ease-out"
          style={{
            width: `${progreso}%`,
            background: progreso >= 100
              ? "linear-gradient(90deg,#22c55e,#16a34a)"
              : "linear-gradient(90deg,#f59e0b,#d97706)",
          }}
        />
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────
   Tarjeta de producto en el carrito
───────────────────────────────────────────────── */
interface Item {
  productId: string; name: string; slug: string;
  price: number; image: string | null; quantity: number; stock: number;
}
function CartItem({ item, index, onRemove, onQtyChange }: {
  item: Item; index: number; onRemove: () => void; onQtyChange: (q: number) => void;
}) {
  const [removing, setRemoving] = useState(false);

  function handleRemove() {
    setRemoving(true);
    setTimeout(onRemove, 300);
  }

  return (
    <div
      className="group bg-white rounded-2xl border border-stone-100 overflow-hidden hover:border-stone-200 hover:shadow-md transition-all duration-300"
      style={{
        opacity: removing ? 0 : 1,
        transform: removing ? "scale(0.96) translateX(20px)" : "scale(1)",
        transition: "all 0.3s cubic-bezier(0.4,0,0.2,1)",
        animationDelay: `${index * 60}ms`,
      }}
    >
      <div className="flex gap-0">
        {/* Imagen grande */}
        <Link href={`/productos/${item.slug}`} className="shrink-0">
          <div className="relative w-28 h-28 sm:w-36 sm:h-36 bg-stone-50 overflow-hidden">
            {item.image ? (
              <Image
                src={item.image} alt={item.name} fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                sizes="144px"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-4xl">☕</div>
            )}
          </div>
        </Link>

        {/* Info del producto */}
        <div className="flex-1 min-w-0 p-4 flex flex-col justify-between">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <Link href={`/productos/${item.slug}`}>
                <h3 className="font-semibold text-stone-900 text-sm sm:text-base hover:text-amber-700 transition-colors line-clamp-2 leading-snug">
                  {item.name}
                </h3>
              </Link>
              <p className="text-xs text-stone-400 mt-0.5">{formatPrice(item.price)} por unidad</p>
            </div>
            <button
              onClick={handleRemove}
              className="shrink-0 w-7 h-7 rounded-lg flex items-center justify-center text-stone-300 hover:text-red-500 hover:bg-red-50 transition-all"
              aria-label="Eliminar"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Precio + controles de cantidad */}
          <div className="flex items-center justify-between mt-3">
            {/* Cantidad */}
            <div className="flex items-center gap-1 bg-stone-50 rounded-xl p-1">
              <button
                onClick={() => onQtyChange(item.quantity - 1)}
                disabled={item.quantity <= 1}
                className="w-7 h-7 rounded-lg flex items-center justify-center text-stone-500 hover:bg-white hover:text-stone-900 hover:shadow-sm transition-all disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <Minus className="w-3 h-3" />
              </button>
              <span className="w-8 text-center text-sm font-bold text-stone-900">
                {item.quantity}
              </span>
              <button
                onClick={() => onQtyChange(item.quantity + 1)}
                disabled={item.quantity >= item.stock}
                className="w-7 h-7 rounded-lg flex items-center justify-center text-stone-500 hover:bg-white hover:text-stone-900 hover:shadow-sm transition-all disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <Plus className="w-3 h-3" />
              </button>
            </div>

            {/* Precio total del item */}
            <div className="text-right">
              <p className="font-bold text-stone-900 text-base">
                {formatPrice(item.price * item.quantity)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────
   Resumen del pedido (sidebar)
───────────────────────────────────────────────── */
function ResumenPedido({ subtotal, shipping, total, progreso, faltante, waUrl }: {
  subtotal: number; shipping: number; total: number;
  progreso: number; faltante: number; waUrl: string;
}) {
  return (
    <>
      {/* Card principal */}
      <div className="bg-white rounded-3xl border border-stone-100 overflow-hidden shadow-sm">
        {/* Header */}
        <div className="bg-gradient-to-r from-stone-900 to-stone-800 px-6 py-5">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-amber-600 flex items-center justify-center">
              <Coffee className="w-4 h-4 text-white" />
            </div>
            <div>
              <h2 className="text-white font-bold">Resumen del pedido</h2>
              <p className="text-stone-400 text-xs">Café del Roble</p>
            </div>
          </div>
        </div>

        <div className="p-6 space-y-4">
          {/* Desglose */}
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-stone-500">Subtotal</span>
              <span className="font-medium text-stone-900">{formatPrice(subtotal)}</span>
            </div>

            {/* Envío con barra mini */}
            <div>
              <div className="flex justify-between text-sm mb-1.5">
                <span className="text-stone-500 flex items-center gap-1.5">
                  <Truck className="w-3.5 h-3.5" />
                  Envío
                </span>
                {shipping === 0 ? (
                  <span className="text-green-600 font-semibold text-xs bg-green-50 px-2 py-0.5 rounded-full">
                    ¡Gratis!
                  </span>
                ) : (
                  <span className="font-medium text-stone-900">{formatPrice(shipping)}</span>
                )}
              </div>
              {shipping > 0 && (
                <div>
                  <div className="h-1.5 bg-stone-100 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-amber-400 to-amber-600 rounded-full transition-all duration-700"
                      style={{ width: `${progreso}%` }} />
                  </div>
                  <p className="text-[11px] text-stone-400 mt-1">
                    Agrega {formatPrice(faltante)} más para envío gratis
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Separador */}
          <div className="h-px bg-stone-100" />

          {/* Total */}
          <div className="flex justify-between items-center">
            <span className="font-bold text-stone-900">Total</span>
            <div className="text-right">
              <span className="font-black text-2xl text-stone-900">{formatPrice(total)}</span>
              <p className="text-[11px] text-stone-400">IVA incluido</p>
            </div>
          </div>

          {/* Botones CTA */}
          <div className="space-y-2.5 pt-1">
            {/* Botón principal Stripe */}
            <Link href="/checkout"
              className="w-full h-13 rounded-2xl bg-stone-900 text-white font-bold flex items-center justify-center gap-2.5 hover:bg-stone-800 transition-all hover:shadow-xl hover:shadow-stone-900/20 hover:scale-[1.01] active:scale-[0.99] py-4 text-sm"
            >
              <Lock className="w-4 h-4" />
              Pagar con tarjeta
              <ArrowRight className="w-4 h-4 ml-auto" />
            </Link>

            {/* WhatsApp */}
            <a
              href={waUrl} target="_blank" rel="noopener noreferrer"
              className="w-full h-13 rounded-2xl bg-[#25D366] text-white font-bold flex items-center justify-center gap-2.5 hover:bg-[#22c55e] transition-all hover:shadow-xl hover:shadow-green-600/20 hover:scale-[1.01] active:scale-[0.99] py-4 text-sm"
            >
              <svg className="w-5 h-5 shrink-0" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Pedir por WhatsApp
            </a>

            {/* Seguir comprando */}
            <Link href="/productos"
              className="w-full py-3 rounded-2xl border border-stone-200 text-stone-500 font-medium flex items-center justify-center gap-2 hover:bg-stone-50 hover:text-stone-700 transition-all text-sm"
            >
              <ChevronLeft className="w-4 h-4" />
              Seguir comprando
            </Link>
          </div>
        </div>
      </div>

      {/* Garantías */}
      <div className="grid grid-cols-3 gap-2">
        {[
          { icon: Lock,    label: "Pago\nseguro" },
          { icon: Truck,   label: "Envío\nrápido" },
          { icon: Package, label: "Embalaje\nprotegido" },
        ].map(({ icon: Icon, label }) => (
          <div key={label} className="bg-white rounded-2xl border border-stone-100 p-3 text-center">
            <Icon className="w-4 h-4 text-amber-600 mx-auto mb-1.5" />
            <p className="text-[11px] text-stone-500 leading-tight whitespace-pre-line">{label}</p>
          </div>
        ))}
      </div>

      {/* Valoraciones */}
      <div className="bg-amber-50 rounded-2xl border border-amber-100 px-5 py-4 flex items-center gap-3">
        <div className="flex shrink-0">
          {[1,2,3,4,5].map((s) => (
            <Star key={s} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
          ))}
        </div>
        <p className="text-xs text-amber-800 leading-snug">
          <strong>+2.400 clientes</strong> felices con su Café del Roble
        </p>
      </div>
    </>
  );
}

/* ─────────────────────────────────────────────────
   Estado vacío
───────────────────────────────────────────────── */
function CartVacio() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center py-20 px-4">
      {/* Ilustración */}
      <div className="relative mb-8">
        <div className="w-32 h-32 rounded-full bg-amber-50 border-2 border-amber-100 flex items-center justify-center">
          <ShoppingBag className="w-14 h-14 text-amber-300" />
        </div>
        <div className="absolute -top-2 -right-2 w-10 h-10 rounded-full bg-stone-100 flex items-center justify-center text-2xl">
          ☕
        </div>
      </div>

      <h2 className="text-2xl font-bold text-stone-900 mb-2 text-center">
        Tu carrito está vacío
      </h2>
      <p className="text-stone-500 mb-8 text-center max-w-xs leading-relaxed">
        Agrega nuestros cafés de especialidad para empezar tu pedido.
      </p>

      {/* CTAs */}
      <div className="flex flex-col sm:flex-row gap-3 w-full max-w-sm">
        <Link href="/productos"
          className="flex-1 h-12 rounded-2xl bg-stone-900 text-white font-semibold flex items-center justify-center gap-2 hover:bg-stone-800 transition-all hover:shadow-lg text-sm"
        >
          <Coffee className="w-4 h-4" />
          Ver el catálogo
        </Link>
        <a
          href="https://wa.me/573144264715?text=Hola! Me interesa el Café del Roble"
          target="_blank" rel="noopener noreferrer"
          className="flex-1 h-12 rounded-2xl bg-[#25D366] text-white font-semibold flex items-center justify-center gap-2 hover:bg-[#22c55e] transition-all text-sm"
        >
          <MessageCircle className="w-4 h-4" />
          WhatsApp
        </a>
      </div>

      {/* Productos populares sugeridos */}
      <div className="mt-12 w-full max-w-md">
        <p className="text-xs text-stone-400 uppercase tracking-widest text-center mb-4">
          Productos populares
        </p>
        <div className="flex flex-wrap justify-center gap-2">
          {["Café Supremo Huila 250g", "Café en Grano 500g", "Set Degustación"].map((p) => (
            <Link key={p} href={`/productos?q=${encodeURIComponent(p)}`}
              className="px-4 py-2 bg-white border border-stone-200 rounded-full text-sm text-stone-600 hover:border-amber-300 hover:text-amber-700 hover:bg-amber-50 transition-all"
            >
              {p}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
