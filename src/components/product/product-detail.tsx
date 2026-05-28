"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ShoppingCart, MessageCircle, Star, Minus, Plus,
  ChevronRight, Package, Truck, Shield, Check,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useCartStore } from "@/store/cart-store";
import { formatPrice, calculateDiscount } from "@/lib/utils";
import { toast } from "sonner";

interface ProductDetailProps {
  product: {
    id: string;
    name: string;
    slug: string;
    description: string | null;
    price: unknown;
    comparePrice: unknown | null;
    stock: number;
    sku: string | null;
    isNew: boolean;
    isFeatured: boolean;
    categoryId: string;
    category: { id: string; name: string; slug: string };
    images: { id: string; url: string; altText: string | null }[];
    reviews: {
      id: string;
      rating: number;
      comment: string | null;
      title: string | null;
      createdAt: Date;
      user: { name: string | null; image: string | null };
    }[];
  };
}

export function ProductDetail({ product }: ProductDetailProps) {
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const addItem = useCartStore((s) => s.addItem);

  const price = Number(product.price);
  const comparePrice = product.comparePrice ? Number(product.comparePrice) : null;
  const discount = comparePrice ? calculateDiscount(price, comparePrice) : 0;
  const avgRating = product.reviews.length
    ? product.reviews.reduce((a, r) => a + r.rating, 0) / product.reviews.length
    : null;

  const whatsappMessage = encodeURIComponent(
    `Hola! Me interesa comprar "${product.name}" x${quantity}.\nPrecio: ${formatPrice(price * quantity)}`
  );
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "573001234567";

  function handleAddToCart() {
    addItem({
      id: product.id,
      productId: product.id,
      name: product.name,
      price,
      image: product.images[0]?.url ?? "/placeholder-product.jpg",
      stock: product.stock,
      slug: product.slug,
      quantity,
    });
    toast.success(`${product.name} agregado al carrito`);
  }

  return (
    <div>
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1.5 text-sm text-stone-400 mb-8">
        <Link href="/" className="hover:text-stone-600 transition-colors">Inicio</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <Link href="/productos" className="hover:text-stone-600 transition-colors">Productos</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <Link href={`/categorias/${product.category.slug}`} className="hover:text-stone-600 transition-colors">
          {product.category.name}
        </Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-stone-600">{product.name}</span>
      </nav>

      <div className="grid md:grid-cols-2 gap-10 lg:gap-16">
        {/* Images */}
        <div className="space-y-4">
          <div className="relative aspect-square rounded-2xl overflow-hidden bg-stone-50 border border-stone-100">
            {product.images[selectedImage] ? (
              <Image
                src={product.images[selectedImage].url}
                alt={product.images[selectedImage].altText ?? product.name}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-stone-300">
                <span className="text-8xl">☕</span>
              </div>
            )}
            {discount > 0 && (
              <div className="absolute top-4 left-4">
                <Badge variant="sale">-{discount}%</Badge>
              </div>
            )}
          </div>

          {product.images.length > 1 && (
            <div className="flex gap-3 overflow-x-auto pb-2">
              {product.images.map((img, i) => (
                <button
                  key={img.id}
                  onClick={() => setSelectedImage(i)}
                  className={`relative w-20 h-20 rounded-xl overflow-hidden border-2 transition-colors shrink-0 ${
                    selectedImage === i ? "border-amber-500" : "border-stone-100 hover:border-stone-300"
                  }`}
                >
                  <Image src={img.url} alt={img.altText ?? ""} fill className="object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Link
                href={`/categorias/${product.category.slug}`}
                className="text-xs font-medium text-amber-600 uppercase tracking-wider hover:text-amber-700"
              >
                {product.category.name}
              </Link>
              {product.isNew && <Badge variant="new">Nuevo</Badge>}
            </div>
            <h1 className="text-3xl font-bold text-stone-900 tracking-tight">{product.name}</h1>

            {avgRating && (
              <div className="flex items-center gap-2 mt-3">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star
                      key={s}
                      className={`w-4 h-4 ${
                        s <= Math.round(avgRating)
                          ? "fill-amber-400 text-amber-400"
                          : "text-stone-200"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-stone-500">
                  {avgRating.toFixed(1)} ({product.reviews.length} reseñas)
                </span>
              </div>
            )}
          </div>

          {/* Price */}
          <div className="flex items-baseline gap-3">
            <span className="text-4xl font-bold text-stone-900">{formatPrice(price)}</span>
            {comparePrice && (
              <>
                <span className="text-xl text-stone-400 line-through">{formatPrice(comparePrice)}</span>
                <Badge variant="sale">-{discount}%</Badge>
              </>
            )}
          </div>

          {/* Description */}
          {product.description && (
            <p className="text-stone-600 leading-relaxed">{product.description}</p>
          )}

          {/* Stock */}
          <div className="flex items-center gap-2">
            {product.stock > 0 ? (
              <>
                <div className="w-2 h-2 rounded-full bg-green-500" />
                <span className="text-sm text-stone-600">
                  {product.stock > 10
                    ? "En stock"
                    : `Solo quedan ${product.stock} unidades`}
                </span>
              </>
            ) : (
              <>
                <div className="w-2 h-2 rounded-full bg-red-500" />
                <span className="text-sm text-red-600">Sin stock</span>
              </>
            )}
          </div>

          {/* Quantity */}
          <div>
            <p className="text-sm font-medium text-stone-700 mb-2">Cantidad</p>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-10 h-10 rounded-lg border border-stone-200 flex items-center justify-center hover:bg-stone-50 transition-colors disabled:opacity-50"
                disabled={quantity <= 1}
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="w-12 text-center font-semibold text-stone-900">{quantity}</span>
              <button
                onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                className="w-10 h-10 rounded-lg border border-stone-200 flex items-center justify-center hover:bg-stone-50 transition-colors disabled:opacity-50"
                disabled={quantity >= product.stock}
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col gap-3">
            <Button
              onClick={handleAddToCart}
              disabled={product.stock === 0}
              size="lg"
              className="w-full gap-2"
            >
              <ShoppingCart className="w-5 h-5" />
              {product.stock === 0 ? "Sin stock" : `Agregar al carrito — ${formatPrice(price * quantity)}`}
            </Button>

            <a
              href={`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full h-12 rounded-lg bg-[#25D366] text-white font-medium text-sm flex items-center justify-center gap-2 hover:bg-[#22c55e] transition-colors"
            >
              <MessageCircle className="w-5 h-5" />
              Comprar por WhatsApp
            </a>
          </div>

          {/* Benefits */}
          <div className="grid grid-cols-3 gap-3 pt-2">
            {[
              { icon: Truck, text: "Envío gratis +$80k" },
              { icon: Shield, text: "Pago seguro" },
              { icon: Package, text: "Embalaje protegido" },
            ].map(({ icon: Icon, text }) => (
              <div key={text} className="flex flex-col items-center gap-1.5 p-3 rounded-xl bg-stone-50 text-center">
                <Icon className="w-4 h-4 text-amber-600" />
                <span className="text-xs text-stone-600">{text}</span>
              </div>
            ))}
          </div>

          {product.sku && (
            <p className="text-xs text-stone-400">SKU: {product.sku}</p>
          )}
        </div>
      </div>

      {/* Reviews */}
      {product.reviews.length > 0 && (
        <div className="mt-16 pt-10 border-t border-stone-100">
          <h2 className="text-2xl font-bold text-stone-900 mb-8">
            Reseñas ({product.reviews.length})
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {product.reviews.map((review) => (
              <div key={review.id} className="bg-stone-50 rounded-2xl p-5">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <p className="font-medium text-stone-900 text-sm">{review.user.name ?? "Cliente"}</p>
                    <div className="flex mt-1">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <Star
                          key={s}
                          className={`w-3.5 h-3.5 ${
                            s <= review.rating ? "fill-amber-400 text-amber-400" : "text-stone-200"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                  <span className="text-xs text-stone-400">
                    {new Date(review.createdAt).toLocaleDateString("es-CO")}
                  </span>
                </div>
                {review.title && (
                  <p className="font-medium text-stone-800 text-sm mb-1">{review.title}</p>
                )}
                {review.comment && (
                  <p className="text-sm text-stone-600 leading-relaxed">{review.comment}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
