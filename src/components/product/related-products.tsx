import { prisma } from "@/lib/prisma";
import { ProductCard } from "./product-card";

interface RelatedProductsProps {
  categoryId: string;
  excludeId: string;
}

export async function RelatedProducts({ categoryId, excludeId }: RelatedProductsProps) {
  const products: {
    id: string; name: string; slug: string;
    price: unknown; comparePrice: unknown;
    stock: number; isFeatured: boolean; isNew: boolean;
    images: { url: string }[];
    category: { name: string; slug: string };
    reviews: { rating: number }[];
  }[] = await prisma.product.findMany({
    where: { categoryId, isActive: true, id: { not: excludeId } },
    include: {
      images: { orderBy: { sortOrder: "asc" }, take: 1 },
      category: { select: { name: true, slug: true } },
      reviews: { select: { rating: true } },
    },
    take: 4,
    orderBy: { isFeatured: "desc" },
  });

  if (!products.length) return null;

  return (
    <div>
      <h2 className="text-2xl font-bold text-stone-900 mb-8">Productos relacionados</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
        {products.map((product) => (
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
    </div>
  );
}
