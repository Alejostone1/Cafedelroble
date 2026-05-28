"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ShoppingCart, Star, Heart, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useCartStore } from "@/store/cart-store";
import { formatPrice, calculateDiscount } from "@/lib/utils";
import { toast } from "sonner";

interface ProductCardProps {
  product: {
    id: string;
    name: string;
    slug: string;
    price: number;
    comparePrice: number | null;
    stock: number;
    isFeatured: boolean;
    isNew: boolean;
    image: string | null;
    category: { name: string; slug: string };
    avgRating: number | null;
    reviewCount: number;
  };
}

export function ProductCard({ product }: ProductCardProps) {
  const addItem = useCartStore((s) => s.addItem);
  const discount = product.comparePrice
    ? calculateDiscount(product.price, product.comparePrice)
    : 0;

  function handleAddToCart(e: React.MouseEvent) {
    e.preventDefault();
    if (product.stock === 0) return;
    addItem({
      id: product.id,
      productId: product.id,
      name: product.name,
      price: product.price,
      image: product.image ?? "/placeholder-product.jpg",
      stock: product.stock,
      slug: product.slug,
    });
    toast.success(`${product.name} agregado al carrito`);
  }

  return (
    <Link href={`/productos/${product.slug}`} className="group block">
      <div className="rounded-2xl bg-white border border-stone-100 overflow-hidden hover:shadow-lg hover:border-stone-200 transition-all duration-300 hover:-translate-y-0.5">
        {/* Image */}
        <div className="relative aspect-square bg-stone-50 overflow-hidden">
          {product.image ? (
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-stone-300">
              <span className="text-5xl">☕</span>
            </div>
          )}

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-1.5">
            {product.isNew && <Badge variant="new">Nuevo</Badge>}
            {discount > 0 && <Badge variant="sale">-{discount}%</Badge>}
            {product.stock === 0 && (
              <Badge variant="secondary">Sin stock</Badge>
            )}
          </div>

          {/* Quick actions */}
          <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <button
              className="w-8 h-8 rounded-lg bg-white shadow-md flex items-center justify-center text-stone-400 hover:text-red-500 transition-colors"
              onClick={(e) => e.preventDefault()}
              aria-label="Agregar a favoritos"
            >
              <Heart className="w-4 h-4" />
            </button>
          </div>

          {/* Add to cart overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
            <Button
              onClick={handleAddToCart}
              disabled={product.stock === 0}
              className="w-full h-9 text-xs gap-1.5 shadow-lg"
              size="sm"
            >
              <ShoppingCart className="w-3.5 h-3.5" />
              {product.stock === 0 ? "Sin stock" : "Agregar al carrito"}
            </Button>
          </div>
        </div>

        {/* Info */}
        <div className="p-4 space-y-2">
          <p className="text-xs text-stone-400 uppercase tracking-wider">
            {product.category.name}
          </p>
          <h3 className="font-semibold text-stone-900 text-sm leading-tight line-clamp-2 group-hover:text-amber-700 transition-colors">
            {product.name}
          </h3>

          {/* Rating */}
          {product.avgRating && (
            <div className="flex items-center gap-1.5">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`w-3 h-3 ${
                      star <= Math.round(product.avgRating!)
                        ? "fill-amber-400 text-amber-400"
                        : "text-stone-200"
                    }`}
                  />
                ))}
              </div>
              <span className="text-xs text-stone-400">({product.reviewCount})</span>
            </div>
          )}

          {/* Price */}
          <div className="flex items-center gap-2">
            <span className="font-bold text-stone-900">
              {formatPrice(product.price)}
            </span>
            {product.comparePrice && (
              <span className="text-xs text-stone-400 line-through">
                {formatPrice(product.comparePrice)}
              </span>
            )}
          </div>

          {/* Mobile add to cart */}
          <button
            onClick={handleAddToCart}
            disabled={product.stock === 0}
            className="sm:hidden w-full h-9 rounded-lg bg-amber-600 text-white text-xs font-medium flex items-center justify-center gap-1.5 hover:bg-amber-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ShoppingCart className="w-3.5 h-3.5" />
            {product.stock === 0 ? "Sin stock" : "Agregar"}
          </button>
        </div>
      </div>
    </Link>
  );
}
