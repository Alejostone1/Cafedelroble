import type { Metadata } from "next";

export const dynamic = "force-dynamic";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { formatPrice } from "@/lib/utils";
import { Plus, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DeleteProductButton } from "@/components/dashboard/delete-product-button";

export const metadata: Metadata = {
  title: "Productos — Admin",
};

export default async function DashboardProductsPage() {
  const products = await prisma.product.findMany({
    include: {
      category: { select: { name: true } },
      images: { take: 1, orderBy: { sortOrder: "asc" } },
    },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-stone-900">Productos</h1>
          <p className="text-stone-500 text-sm mt-1">{products.length} productos en total</p>
        </div>
        <Button asChild>
          <Link href="/dashboard/productos/nuevo">
            <Plus className="w-4 h-4" />
            Nuevo producto
          </Link>
        </Button>
      </div>

      <div className="bg-white rounded-2xl border border-stone-100 overflow-hidden">
        {products.length === 0 ? (
          <div className="text-center py-16">
            <Package className="w-10 h-10 text-stone-300 mx-auto mb-3" />
            <p className="text-stone-500 font-medium">No hay productos aún</p>
            <p className="text-stone-400 text-sm mt-1">Crea tu primer producto</p>
          </div>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="border-b border-stone-100 bg-stone-50">
                <th className="text-left text-xs font-medium text-stone-500 uppercase tracking-wider px-6 py-4">
                  Producto
                </th>
                <th className="text-left text-xs font-medium text-stone-500 uppercase tracking-wider px-4 py-4 hidden md:table-cell">
                  Categoría
                </th>
                <th className="text-left text-xs font-medium text-stone-500 uppercase tracking-wider px-4 py-4">
                  Precio
                </th>
                <th className="text-left text-xs font-medium text-stone-500 uppercase tracking-wider px-4 py-4 hidden sm:table-cell">
                  Stock
                </th>
                <th className="text-left text-xs font-medium text-stone-500 uppercase tracking-wider px-4 py-4 hidden lg:table-cell">
                  Estado
                </th>
                <th className="px-6 py-4" />
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-50">
              {products.map((product: {
              id: string; name: string; sku: string | null; price: unknown;
              stock: number; isActive: boolean;
              category: { name: string };
              images: { url: string }[];
            }) => (
                <tr key={product.id} className="hover:bg-stone-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-stone-100 flex items-center justify-center shrink-0 overflow-hidden">
                        {product.images[0]?.url ? (
                          <img src={product.images[0].url} alt="" className="w-full h-full object-cover" />
                        ) : (
                          <span className="text-lg">☕</span>
                        )}
                      </div>
                      <div>
                        <p className="font-medium text-stone-900 text-sm">{product.name}</p>
                        <p className="text-xs text-stone-400">SKU: {product.sku ?? "—"}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4 hidden md:table-cell">
                    <span className="text-sm text-stone-600">{product.category.name}</span>
                  </td>
                  <td className="px-4 py-4">
                    <span className="text-sm font-medium text-stone-900">
                      {formatPrice(Number(product.price))}
                    </span>
                  </td>
                  <td className="px-4 py-4 hidden sm:table-cell">
                    <span className={`text-sm font-medium ${product.stock === 0 ? "text-red-600" : product.stock < 10 ? "text-yellow-600" : "text-green-600"}`}>
                      {product.stock}
                    </span>
                  </td>
                  <td className="px-4 py-4 hidden lg:table-cell">
                    <Badge variant={product.isActive ? "success" : "secondary"}>
                      {product.isActive ? "Activo" : "Inactivo"}
                    </Badge>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 justify-end">
                      <Link
                        href={`/dashboard/productos/${product.id}/editar`}
                        className="text-xs text-amber-600 hover:text-amber-700 font-medium transition-colors"
                      >
                        Editar
                      </Link>
                      <DeleteProductButton id={product.id} name={product.name} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
