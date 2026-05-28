"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Lock, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useCartStore } from "@/store/cart-store";
import { formatPrice } from "@/lib/utils";
import { checkoutSchema, type CheckoutInput } from "@/validators/order";
import { toast } from "sonner";

export function CheckoutPageClient() {
  const { items, getTotalPrice } = useCartStore();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CheckoutInput>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: { country: "Colombia" },
  });

  const subtotal = getTotalPrice();
  const shipping = subtotal >= 80000 ? 0 : 12000;
  const total = subtotal + shipping;

  async function onSubmit(data: CheckoutInput) {
    setLoading(true);
    try {
      const response = await fetch("/api/checkout/stripe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items, shipping: data, total }),
      });

      const result = await response.json();
      if (result.url) {
        window.location.href = result.url;
      } else {
        toast.error("Error al procesar el pago");
      }
    } catch {
      toast.error("Error al conectar con el servidor");
    } finally {
      setLoading(false);
    }
  }

  if (items.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center py-20 text-center">
        <ShoppingBag className="w-16 h-16 text-stone-200 mb-6" />
        <h2 className="text-2xl font-bold text-stone-900 mb-2">Carrito vacío</h2>
        <p className="text-stone-500 mb-8">Agrega productos antes de continuar</p>
        <Button asChild>
          <Link href="/productos">Ver productos</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <Link href="/carrito" className="text-stone-400 hover:text-stone-600 transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <h1 className="text-2xl font-bold text-stone-900">Finalizar compra</h1>
        </div>

        <div className="grid lg:grid-cols-[1fr,420px] gap-8">
          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            {/* Contact */}
            <div className="bg-white rounded-2xl border border-stone-100 p-6">
              <h2 className="font-bold text-stone-900 mb-5">Información de contacto</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label htmlFor="firstName">Nombre *</Label>
                  <Input
                    id="firstName"
                    placeholder="Juan"
                    error={errors.firstName?.message}
                    {...register("firstName")}
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="lastName">Apellido *</Label>
                  <Input
                    id="lastName"
                    placeholder="Pérez"
                    error={errors.lastName?.message}
                    {...register("lastName")}
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="juan@ejemplo.com"
                    error={errors.email?.message}
                    {...register("email")}
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="phone">Teléfono *</Label>
                  <Input
                    id="phone"
                    placeholder="300 123 4567"
                    error={errors.phone?.message}
                    {...register("phone")}
                  />
                </div>
              </div>
            </div>

            {/* Shipping */}
            <div className="bg-white rounded-2xl border border-stone-100 p-6">
              <h2 className="font-bold text-stone-900 mb-5">Dirección de envío</h2>
              <div className="space-y-4">
                <div className="space-y-1.5">
                  <Label htmlFor="address1">Dirección *</Label>
                  <Input
                    id="address1"
                    placeholder="Calle 123 # 45-67, Apto 8"
                    error={errors.address1?.message}
                    {...register("address1")}
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="address2">Información adicional</Label>
                  <Input
                    id="address2"
                    placeholder="Torre B, Piso 3 (opcional)"
                    {...register("address2")}
                  />
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label htmlFor="city">Ciudad *</Label>
                    <Input
                      id="city"
                      placeholder="Bogotá"
                      error={errors.city?.message}
                      {...register("city")}
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="state">Departamento *</Label>
                    <Input
                      id="state"
                      placeholder="Cundinamarca"
                      error={errors.state?.message}
                      {...register("state")}
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="zipCode">Código postal *</Label>
                    <Input
                      id="zipCode"
                      placeholder="110111"
                      error={errors.zipCode?.message}
                      {...register("zipCode")}
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="country">País</Label>
                    <Input id="country" disabled {...register("country")} />
                  </div>
                </div>
              </div>
            </div>

            <Button
              type="submit"
              size="lg"
              loading={loading}
              className="w-full gap-2"
            >
              <Lock className="w-4 h-4" />
              Pagar {formatPrice(total)} — Continuar con Stripe
            </Button>
          </form>

          {/* Summary */}
          <div className="space-y-4">
            <div className="bg-white rounded-2xl border border-stone-100 p-6">
              <h2 className="font-bold text-stone-900 mb-5">Resumen ({items.length} productos)</h2>
              <div className="space-y-4 mb-6">
                {items.map((item) => (
                  <div key={item.productId} className="flex gap-3">
                    <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-stone-50 shrink-0">
                      {item.image ? (
                        <Image src={item.image} alt={item.name} fill className="object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-xl">☕</div>
                      )}
                      <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-stone-600 text-white text-[10px] font-bold flex items-center justify-center">
                        {item.quantity}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-stone-900 line-clamp-2">{item.name}</p>
                      <p className="text-sm text-stone-500 mt-0.5">{formatPrice(item.price * item.quantity)}</p>
                    </div>
                  </div>
                ))}
              </div>

              <Separator className="mb-4" />

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-stone-600">Subtotal</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-stone-600">Envío</span>
                  <span className={shipping === 0 ? "text-green-600" : ""}>
                    {shipping === 0 ? "Gratis" : formatPrice(shipping)}
                  </span>
                </div>
                <Separator />
                <div className="flex justify-between font-bold text-base">
                  <span>Total</span>
                  <span>{formatPrice(total)}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-center gap-2 text-xs text-stone-400 bg-stone-50 rounded-xl p-3">
              <Lock className="w-3.5 h-3.5" />
              Pago 100% seguro con Stripe
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
