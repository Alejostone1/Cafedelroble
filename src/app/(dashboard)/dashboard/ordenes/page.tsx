import type { Metadata } from "next";

export const dynamic = "force-dynamic";
import { prisma } from "@/lib/prisma";
import { formatPrice, formatDate } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { OrderStatusUpdater } from "@/components/dashboard/order-status-updater";

export const metadata: Metadata = {
  title: "Órdenes — Admin",
};

const statusColors: Record<string, "default" | "success" | "destructive" | "secondary" | "outline"> = {
  PENDING: "default",
  CONFIRMED: "outline",
  PROCESSING: "outline",
  SHIPPED: "outline",
  DELIVERED: "success",
  CANCELLED: "destructive",
};

const statusLabels: Record<string, string> = {
  PENDING: "Pendiente",
  CONFIRMED: "Confirmado",
  PROCESSING: "Procesando",
  SHIPPED: "Enviado",
  DELIVERED: "Entregado",
  CANCELLED: "Cancelado",
  REFUNDED: "Reembolsado",
};

export default async function DashboardOrdersPage() {
  const orders = await prisma.order.findMany({
    include: {
      items: true,
      user: { select: { name: true, email: true } },
    },
    orderBy: { createdAt: "desc" },
    take: 50,
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-stone-900">Órdenes</h1>
        <p className="text-stone-500 text-sm mt-1">{orders.length} órdenes en total</p>
      </div>

      <div className="bg-white rounded-2xl border border-stone-100 overflow-hidden">
        {orders.length === 0 ? (
          <div className="text-center py-16 text-stone-400">
            <p className="font-medium">No hay órdenes aún</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[600px]">
              <thead>
                <tr className="border-b border-stone-100 bg-stone-50">
                  {["Orden", "Cliente", "Total", "Estado", "Fecha", "Acciones"].map((h) => (
                    <th key={h} className="text-left text-xs font-medium text-stone-500 uppercase tracking-wider px-5 py-4">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-50">
                {orders.map((order: {
                  id: string; orderNumber: string; status: string;
                  total: unknown; createdAt: Date; guestName: string | null;
                  guestEmail: string | null;
                  items: unknown[];
                  user: { name: string | null; email: string | null } | null;
                }) => (
                  <tr key={order.id} className="hover:bg-stone-50/50 transition-colors">
                    <td className="px-5 py-4">
                      <div>
                        <p className="font-mono text-sm font-medium text-stone-900">{order.orderNumber}</p>
                        <p className="text-xs text-stone-400">{order.items.length} productos</p>
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <p className="text-sm text-stone-900">
                        {order.user?.name ?? order.guestName ?? "Cliente invitado"}
                      </p>
                      <p className="text-xs text-stone-400">
                        {order.user?.email ?? order.guestEmail ?? "—"}
                      </p>
                    </td>
                    <td className="px-5 py-4">
                      <span className="font-semibold text-stone-900 text-sm">
                        {formatPrice(Number(order.total))}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <Badge variant={statusColors[order.status] ?? "secondary"}>
                        {statusLabels[order.status] ?? order.status}
                      </Badge>
                    </td>
                    <td className="px-5 py-4">
                      <span className="text-sm text-stone-500">
                        {formatDate(order.createdAt)}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <OrderStatusUpdater orderId={order.id} currentStatus={order.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
