import { Suspense } from "react";
import type { Metadata } from "next";
import { ProductsGrid } from "@/components/product/products-grid";
import { ProductsFilters } from "@/components/product/products-filters";
import { Skeleton } from "@/components/ui/skeleton";

export const metadata: Metadata = {
  title: "Productos",
  description: "Explora nuestra selección de cafés de especialidad colombianos.",
};

export const dynamic = "force-dynamic";

interface ProductsPageProps {
  searchParams: Promise<{
    q?: string;
    categoria?: string;
    orden?: string;
    filter?: string;
    pagina?: string;
    minPrecio?: string;
    maxPrecio?: string;
  }>;
}

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  const params = await searchParams;

  return (
    <div className="min-h-screen bg-stone-50">
      <div className="bg-white border-b border-stone-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl font-bold text-stone-900 tracking-tight">
            {params.q ? `Resultados para "${params.q}"` : "Todos los productos"}
          </h1>
          {params.categoria && (
            <p className="text-stone-500 mt-1">Categoría: {params.categoria}</p>
          )}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters sidebar */}
          <aside className="w-full lg:w-64 shrink-0">
            <Suspense fallback={<Skeleton className="h-96 w-full rounded-2xl" />}>
              <ProductsFilters />
            </Suspense>
          </aside>

          {/* Products grid */}
          <div className="flex-1">
            <Suspense fallback={<ProductsGridSkeleton />}>
              <ProductsGrid searchParams={params} />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
}

function ProductsGridSkeleton() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      {Array.from({ length: 9 }).map((_, i) => (
        <div key={i} className="rounded-2xl bg-white overflow-hidden">
          <Skeleton className="aspect-square" />
          <div className="p-4 space-y-2">
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
          </div>
        </div>
      ))}
    </div>
  );
}
