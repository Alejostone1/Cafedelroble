import { prisma } from "@/lib/prisma";
import { FiltersClient } from "./filters-client";

export async function ProductsFilters() {
  let categories: { id: string; name: string; slug: string }[] = [];
  try {
    categories = await prisma.category.findMany({
      where: { isActive: true },
      select: { id: true, name: true, slug: true },
      orderBy: { name: "asc" },
    });
  } catch {
    categories = [];
  }

  return <FiltersClient categories={categories} />;
}
