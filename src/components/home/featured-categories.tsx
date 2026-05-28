import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { prisma } from "@/lib/prisma";

async function getCategories() {
  try {
    return await prisma.category.findMany({
      where: { isActive: true, parentId: null },
      orderBy: { sortOrder: "asc" },
      take: 6,
    });
  } catch {
    return [];
  }
}

const categoryEmojis: Record<string, string> = {
  "cafe-molido": "☕",
  "cafe-en-grano": "🫘",
  "cafe-instantaneo": "⚡",
  "accesorios": "🧰",
  "suscripciones": "📦",
  default: "☕",
};

const categoryColors = [
  "from-amber-50 to-amber-100 hover:from-amber-100 hover:to-amber-200",
  "from-stone-50 to-stone-100 hover:from-stone-100 hover:to-stone-200",
  "from-orange-50 to-orange-100 hover:from-orange-100 hover:to-orange-200",
  "from-yellow-50 to-yellow-100 hover:from-yellow-100 hover:to-yellow-200",
  "from-red-50 to-red-100 hover:from-red-100 hover:to-red-200",
  "from-emerald-50 to-emerald-100 hover:from-emerald-100 hover:to-emerald-200",
];

export async function FeaturedCategories() {
  const categories = await getCategories();

  const displayCategories =
    categories.length > 0
      ? categories
      : [
          { id: "1", name: "Café Molido", slug: "cafe-molido", description: "Listo para preparar", image: null },
          { id: "2", name: "Café en Grano", slug: "cafe-en-grano", description: "Para tu molino", image: null },
          { id: "3", name: "Instantáneo", slug: "cafe-instantaneo", description: "Rápido y delicioso", image: null },
          { id: "4", name: "Accesorios", slug: "accesorios", description: "Para el barista", image: null },
        ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="text-sm font-medium text-amber-600 uppercase tracking-wider mb-2">
              Explora
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-stone-900 tracking-tight">
              Nuestras categorías
            </h2>
          </div>
          <Link
            href="/categorias"
            className="hidden sm:flex items-center gap-1.5 text-sm font-medium text-stone-600 hover:text-amber-600 transition-colors group"
          >
            Ver todas
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {(displayCategories as { id: string; name: string; slug: string; description?: string | null }[]).map((cat, i: number) => (
            <Link
              key={cat.id}
              href={`/categorias/${cat.slug}`}
              className={`group relative rounded-2xl bg-gradient-to-br ${categoryColors[i % categoryColors.length]} p-6 transition-all duration-200 hover:shadow-md hover:-translate-y-0.5`}
            >
              <div className="text-4xl mb-3">
                {categoryEmojis[cat.slug] ?? categoryEmojis.default}
              </div>
              <h3 className="font-semibold text-stone-900 text-sm">{cat.name}</h3>
              {(cat as { description?: string | null }).description && (
                <p className="text-xs text-stone-500 mt-1">
                  {(cat as { description?: string | null }).description}
                </p>
              )}
              <ArrowRight className="absolute bottom-4 right-4 w-4 h-4 text-stone-400 transition-transform group-hover:translate-x-0.5 group-hover:text-stone-600" />
            </Link>
          ))}
        </div>

        <div className="mt-6 sm:hidden text-center">
          <Link
            href="/categorias"
            className="text-sm font-medium text-amber-600 hover:text-amber-700 transition-colors"
          >
            Ver todas las categorías →
          </Link>
        </div>
      </div>
    </section>
  );
}
