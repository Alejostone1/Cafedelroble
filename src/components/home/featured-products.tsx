import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { ProductCard } from "@/components/product/product-card";

async function getFeaturedProducts() {
  try {
    return await prisma.product.findMany({
      where: { isActive: true, isFeatured: true },
      include: {
        images: { orderBy: { sortOrder: "asc" }, take: 1 },
        category: { select: { name: true, slug: true } },
        reviews: { select: { rating: true } },
      },
      orderBy: { createdAt: "desc" },
      take: 8,
    });
  } catch {
    return [];
  }
}

export async function FeaturedProducts() {
  const products = await getFeaturedProducts();

  return (
    <section className="py-20 bg-stone-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="text-sm font-medium text-amber-600 uppercase tracking-wider mb-2">
              Selección
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-stone-900 tracking-tight">
              Productos destacados
            </h2>
          </div>
          <Link
            href="/productos"
            className="hidden sm:flex items-center gap-1.5 text-sm font-medium text-stone-600 hover:text-amber-600 transition-colors group"
          >
            Ver todo el catálogo
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>

        {products.length === 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="rounded-2xl bg-white border border-stone-100 overflow-hidden animate-pulse">
                <div className="aspect-square bg-stone-100" />
                <div className="p-4 space-y-2">
                  <div className="h-4 bg-stone-100 rounded w-3/4" />
                  <div className="h-4 bg-stone-100 rounded w-1/2" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {products.map((product: {
              id: string; name: string; slug: string;
              price: unknown; comparePrice: unknown;
              stock: number; isFeatured: boolean; isNew: boolean;
              images: { url: string }[];
              category: { name: string; slug: string };
              reviews: { rating: number }[];
            }) => (
              <ProductCard
                key={product.id}
                product={{
                  id: product.id,
                  name: product.name,
                  slug: product.slug,
                  price: Number(product.price),
                  comparePrice: product.comparePrice ? Number(product.comparePrice) : null,
                  stock: product.stock,
                  isFeatured: product.isFeatured,
                  isNew: product.isNew,
                  image: product.images[0]?.url ?? null,
                  category: product.category,
                  avgRating:
                    product.reviews.length > 0
                      ? product.reviews.reduce((a: number, r: { rating: number }) => a + r.rating, 0) / product.reviews.length
                      : null,
                  reviewCount: product.reviews.length,
                }}
              />
            ))}
          </div>
        )}

        <div className="mt-10 text-center sm:hidden">
          <Link
            href="/productos"
            className="text-sm font-medium text-amber-600 hover:text-amber-700 transition-colors"
          >
            Ver todo el catálogo →
          </Link>
        </div>
      </div>
    </section>
  );
}
