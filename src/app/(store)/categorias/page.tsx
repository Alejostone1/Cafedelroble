import type { Metadata } from "next";
import Link from "next/link";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Categorías",
  description: "Explora todas las categorías de Café del Roble",
};

const categoryEmojis: Record<string, string> = {
  "cafe-molido": "☕",
  "cafe-en-grano": "🫘",
  "cafe-instantaneo": "⚡",
  "accesorios": "🧰",
  "suscripciones": "📦",
  default: "☕",
};

export default async function CategoriesPage() {
  const categories = await prisma.category.findMany({
    where: { isActive: true },
    include: { _count: { select: { products: { where: { isActive: true } } } } },
    orderBy: { sortOrder: "asc" },
  });

  return (
    <div className="min-h-screen bg-stone-50">
      <div className="bg-white border-b border-stone-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <h1 className="text-3xl font-bold text-stone-900">Categorías</h1>
          <p className="text-stone-500 mt-1">Explora nuestra selección por tipo de café</p>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {categories.length === 0 ? (
          <p className="text-stone-400 text-center py-20">No hay categorías disponibles aún</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {categories.map((cat: { id: string; name: string; slug: string; description: string | null; _count: { products: number } }) => (
              <Link
                key={cat.id}
                href={`/categorias/${cat.slug}`}
                className="bg-white rounded-2xl border border-stone-100 p-6 hover:shadow-md hover:border-stone-200 transition-all duration-200 hover:-translate-y-0.5"
              >
                <div className="text-4xl mb-3">
                  {categoryEmojis[cat.slug] ?? categoryEmojis.default}
                </div>
                <h2 className="font-semibold text-stone-900">{cat.name}</h2>
                {cat.description && (
                  <p className="text-sm text-stone-500 mt-1 line-clamp-2">{cat.description}</p>
                )}
                <p className="text-xs text-stone-400 mt-3">
                  {cat._count.products} {cat._count.products === 1 ? "producto" : "productos"}
                </p>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
