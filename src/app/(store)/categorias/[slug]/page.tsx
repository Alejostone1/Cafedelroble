import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { ProductCard } from "@/components/product/product-card";

export const dynamic = "force-dynamic";

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = await prisma.category.findUnique({ where: { slug } });
  if (!category) return { title: "Categoría no encontrada" };
  return {
    title: category.name,
    description: category.description ?? `Productos de ${category.name} en Café del Roble`,
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;

  const category = await prisma.category.findUnique({
    where: { slug, isActive: true },
  });

  if (!category) notFound();

  const products = await prisma.product.findMany({
    where: { categoryId: category.id, isActive: true },
    include: {
      images: { orderBy: { sortOrder: "asc" }, take: 1 },
      category: { select: { name: true, slug: true } },
      reviews: { select: { rating: true } },
    },
    orderBy: { isFeatured: "desc" },
  });

  return (
    <div className="min-h-screen bg-stone-50">
      <div className="bg-white border-b border-stone-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <p className="text-sm text-stone-400 mb-1">Categorías / {category.name}</p>
          <h1 className="text-3xl font-bold text-stone-900">{category.name}</h1>
          {category.description && (
            <p className="text-stone-500 mt-1">{category.description}</p>
          )}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {products.length === 0 ? (
          <p className="text-stone-400 text-center py-20">No hay productos en esta categoría aún</p>
        ) : (
          <>
            <p className="text-sm text-stone-500 mb-6">{products.length} productos</p>
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
          </>
        )}
      </div>
    </div>
  );
}
