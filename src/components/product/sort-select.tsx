"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";

interface SortSelectProps {
  currentOrder?: string;
}

const sortOptions = [
  { value: "destacado", label: "Destacados" },
  { value: "nuevo", label: "Más reciente" },
  { value: "precio-asc", label: "Precio: menor a mayor" },
  { value: "precio-desc", label: "Precio: mayor a menor" },
  { value: "nombre", label: "Nombre A-Z" },
];

export function SortSelect({ currentOrder }: SortSelectProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  function handleChange(value: string) {
    const params = new URLSearchParams(searchParams.toString());
    params.set("orden", value);
    params.delete("pagina");
    router.push(`${pathname}?${params.toString()}`);
  }

  return (
    <select
      value={currentOrder ?? "destacado"}
      onChange={(e) => handleChange(e.target.value)}
      className="h-9 rounded-lg border border-stone-200 bg-white px-3 text-sm text-stone-700 focus:outline-none focus:ring-2 focus:ring-amber-500"
    >
      {sortOptions.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  );
}
