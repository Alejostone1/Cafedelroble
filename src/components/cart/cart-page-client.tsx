"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useCartStore } from "@/store/cart-store";
import { formatPrice } from "@/lib/utils";

export function CartPageClient() {
  const { items, removeItem, updateQuantity, clearCart, getTotalPrice } = useCartStore();

  const subtotal = getTotalPrice();
  const shipping = subtotal >= 80000 ? 0 : 12000;
  const total = subtotal + shipping;

  const whatsappItems = items
    .map((i) => `• ${i.name} x${i.quantity} = ${formatPrice(i.price * i.quantity)}`)
    .join("\n");
  const whatsappMessage = encodeURIComponent(
    `Hola! Quiero hacer el siguiente pedido:\n\n${whatsappItems}\n\nTotal: ${formatPrice(total)}`
  );
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "573001234567";

  if (items.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center py-20 text-center">
        <ShoppingBag className="w-16 h-16 text-stone-200 mb-6" />
        <h2 className="text-2xl font-bold text-stone-900 mb-2">Tu carrito está vacío</h2>
        <p className="text-stone-500 mb-8">Agrega algunos productos para continuar</p>
        <Button asChild size="lg">
          <Link href="/productos">
            Ver productos
            <ArrowRight className="w-4 h-4" />
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-stone-900">
            Carrito <span className="text-stone-400 font-normal">({items.length})</span>
          </h1>
          <button
            onClick={clearCart}
            className="text-sm text-stone-400 hover:text-red-500 transition-colors flex items-center gap-1.5"
          >
            <Trash2 className="w-4 h-4" />
            Vaciar carrito
          </button>
        </div>

        <div className="grid lg:grid-cols-[1fr,380px] gap-8">
          {/* Items */}
          <div className="space-y-4">
            {items.map((item) => (
              <div
                key={item.productId}
                className="bg-white rounded-2xl border border-stone-100 p-4 flex gap-4"
              >
                <Link href={`/productos/${item.slug}`} className="shrink-0">
                  <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden bg-stone-50">
                    {item.image ? (
                      <Image src={item.image} alt={item.name} fill className="object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-2xl">☕</div>
                    )}
                  </div>
                </Link>

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <Link href={`/productos/${item.slug}`}>
                      <h3 className="font-semibold text-stone-900 text-sm sm:text-base hover:text-amber-700 transition-colors line-clamp-2">
                        {item.name}
                      </h3>
                    </Link>
                    <button
                      onClick={() => removeItem(item.productId)}
                      className="text-stone-300 hover:text-red-500 transition-colors shrink-0 p-1"
                      aria-label="Eliminar producto"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                        disabled={item.quantity <= 1}
                        className="w-8 h-8 rounded-lg border border-stone-200 flex items-center justify-center hover:bg-stone-50 transition-colors disabled:opacity-50"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="w-8 text-center font-semibold text-sm">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                        disabled={item.quantity >= item.stock}
                        className="w-8 h-8 rounded-lg border border-stone-200 flex items-center justify-center hover:bg-stone-50 transition-colors disabled:opacity-50"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-stone-900">{formatPrice(item.price * item.quantity)}</p>
                      {item.quantity > 1 && (
                        <p className="text-xs text-stone-400">{formatPrice(item.price)} c/u</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="space-y-4">
            <div className="bg-white rounded-2xl border border-stone-100 p-6">
              <h2 className="font-bold text-stone-900 text-lg mb-6">Resumen del pedido</h2>

              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-stone-600">Subtotal</span>
                  <span className="font-medium text-stone-900">{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-stone-600">Envío</span>
                  <span className={`font-medium ${shipping === 0 ? "text-green-600" : "text-stone-900"}`}>
                    {shipping === 0 ? "Gratis" : formatPrice(shipping)}
                  </span>
                </div>
                {shipping > 0 && (
                  <p className="text-xs text-stone-400">
                    Agrega {formatPrice(80000 - subtotal)} más para envío gratis
                  </p>
                )}
                <Separator />
                <div className="flex justify-between">
                  <span className="font-bold text-stone-900">Total</span>
                  <span className="font-bold text-stone-900 text-xl">{formatPrice(total)}</span>
                </div>
              </div>

              <div className="space-y-3 mt-6">
                <Button asChild size="lg" className="w-full">
                  <Link href="/checkout">
                    Proceder al pago
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </Button>

                <a
                  href={`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full h-12 rounded-lg bg-[#25D366] text-white font-medium text-sm flex items-center justify-center gap-2 hover:bg-[#22c55e] transition-colors"
                >
                  <MessageCircle className="w-5 h-5" />
                  Pedir por WhatsApp
                </a>

                <Button asChild variant="ghost" size="sm" className="w-full">
                  <Link href="/productos">Seguir comprando</Link>
                </Button>
              </div>
            </div>

            {/* Security */}
            <div className="bg-stone-50 rounded-2xl p-4 text-center">
              <p className="text-xs text-stone-500">
                🔒 Pago seguro con SSL • Datos encriptados
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
