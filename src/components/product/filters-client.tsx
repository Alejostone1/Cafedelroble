"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { Filter, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface FiltersClientProps {
  categories: { id: string; name: string; slug: string }[];
}

const filterOptions = [
  { value: "nuevo", label: "Nuevos" },
  { value: "destacado", label: "Destacados" },
  { value: "oferta", label: "En oferta" },
];

export function FiltersClient({ categories }: FiltersClientProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const activeCategory = searchParams.get("categoria");
  const activeFilter = searchParams.get("filter");
  const hasFilters = activeCategory || activeFilter;

  function setParam(key: string, value: string | null) {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    params.delete("pagina");
    router.push(`${pathname}?${params.toString()}`);
  }

  function clearFilters() {
    router.push(pathname);
  }

  return (
    <div className="bg-white rounded-2xl border border-stone-100 p-5 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 font-semibold text-stone-900">
          <Filter className="w-4 h-4" />
          Filtros
        </div>
        {hasFilters && (
          <button
            onClick={clearFilters}
            className="text-xs text-stone-400 hover:text-stone-600 flex items-center gap-1 transition-colors"
          >
            <X className="w-3 h-3" />
            Limpiar
          </button>
        )}
      </div>

      {/* Categories */}
      <div>
        <h3 className="text-sm font-semibold text-stone-700 mb-3">Categorías</h3>
        <div className="space-y-1">
          <button
            onClick={() => setParam("categoria", null)}
            className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
              !activeCategory
                ? "bg-amber-50 text-amber-700 font-medium"
                : "text-stone-600 hover:bg-stone-50"
            }`}
          >
            Todas las categorías
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setParam("categoria", cat.slug)}
              className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                activeCategory === cat.slug
                  ? "bg-amber-50 text-amber-700 font-medium"
                  : "text-stone-600 hover:bg-stone-50"
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      {/* Filters */}
      <div>
        <h3 className="text-sm font-semibold text-stone-700 mb-3">Tipo</h3>
        <div className="space-y-1">
          {filterOptions.map((opt) => (
            <button
              key={opt.value}
              onClick={() =>
                setParam("filter", activeFilter === opt.value ? null : opt.value)
              }
              className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                activeFilter === opt.value
                  ? "bg-amber-50 text-amber-700 font-medium"
                  : "text-stone-600 hover:bg-stone-50"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
