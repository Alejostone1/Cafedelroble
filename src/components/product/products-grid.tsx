import { prisma } from "@/lib/prisma";
import { ProductCard } from "./product-card";
import { SortSelect } from "./sort-select";
import { Package } from "lucide-react";
import type { Prisma } from "../../generated/prisma/client";

interface ProductsGridProps {
  searchParams: {
    q?: string;
    categoria?: string;
    orden?: string;
    filter?: string;
    pagina?: string;
    minPrecio?: string;
    maxPrecio?: string;
  };
}

const ITEMS_PER_PAGE = 12;

export async function ProductsGrid({ searchParams }: ProductsGridProps) {
  const page = Math.max(1, parseInt(searchParams.pagina ?? "1"));
  const skip = (page - 1) * ITEMS_PER_PAGE;

  const where: Prisma.ProductWhereInput = {
    isActive: true,
    ...(searchParams.q && {
      OR: [
        { name: { contains: searchParams.q, mode: "insensitive" } },
        { description: { contains: searchParams.q, mode: "insensitive" } },
      ],
    }),
    ...(searchParams.categoria && {
      category: { slug: searchParams.categoria },
    }),
    ...(searchParams.filter === "nuevo" && { isNew: true }),
    ...(searchParams.filter === "destacado" && { isFeatured: true }),
    ...(searchParams.filter === "oferta" && {
      comparePrice: { not: null },
    }),
    ...((searchParams.minPrecio || searchParams.maxPrecio) && {
      price: {
        ...(searchParams.minPrecio && { gte: parseFloat(searchParams.minPrecio) }),
        ...(searchParams.maxPrecio && { lte: parseFloat(searchParams.maxPrecio) }),
      },
    }),
  };

  const orderBy: Prisma.ProductOrderByWithRelationInput = (() => {
    switch (searchParams.orden) {
      case "precio-asc": return { price: "asc" };
      case "precio-desc": return { price: "desc" };
      case "nombre": return { name: "asc" };
      case "nuevo": return { createdAt: "desc" };
      default: return { isFeatured: "desc" };
    }
  })();

  const [products, total] = await Promise.all([
    prisma.product.findMany({
      where,
      orderBy,
      skip,
      take: ITEMS_PER_PAGE,
      include: {
        images: { orderBy: { sortOrder: "asc" }, take: 1 },
        category: { select: { name: true, slug: true } },
        reviews: { select: { rating: true } },
      },
    }),
    prisma.product.count({ where }),
  ]);

  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <Package className="w-12 h-12 text-stone-300 mb-4" />
        <h3 className="text-lg font-semibold text-stone-700 mb-2">
          No encontramos productos
        </h3>
        <p className="text-stone-500 text-sm">
          Intenta con otros términos de búsqueda o filtros diferentes.
        </p>
      </div>
    );
  }

  const totalPages = Math.ceil(total / ITEMS_PER_PAGE);

  return (
    <div className="space-y-6">
      {/* Toolbar */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-stone-500">
          {total} {total === 1 ? "producto" : "productos"}
        </p>
        <SortSelect currentOrder={searchParams.orden} />
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
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

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center gap-2 pt-4">
          {Array.from({ length: totalPages }).map((_, i) => {
            const pageNum = i + 1;
            const params = new URLSearchParams();
            if (searchParams.q) params.set("q", searchParams.q);
            if (searchParams.categoria) params.set("categoria", searchParams.categoria);
            if (searchParams.orden) params.set("orden", searchParams.orden);
            params.set("pagina", pageNum.toString());

            return (
              <a
                key={pageNum}
                href={`/productos?${params.toString()}`}
                className={`w-9 h-9 rounded-lg flex items-center justify-center text-sm font-medium transition-colors ${
                  page === pageNum
                    ? "bg-amber-600 text-white"
                    : "bg-white border border-stone-200 text-stone-700 hover:bg-stone-50"
                }`}
              >
                {pageNum}
              </a>
            );
          })}
        </div>
      )}
    </div>
  );
}
