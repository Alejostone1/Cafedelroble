import type { Metadata } from "next";

export const dynamic = "force-dynamic";
import { prisma } from "@/lib/prisma";
import { formatPrice } from "@/lib/utils";
import {
  TrendingUp, ShoppingBag, Users, Package,
  ArrowUpRight, Clock,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Dashboard",
};

async function getDashboardStats() {
  const [
    totalOrders,
    totalCustomers,
    totalProducts,
    revenueResult,
    recentOrders,
  ] = await Promise.all([
    prisma.order.count(),
    prisma.user.count({ where: { role: "CUSTOMER" } }),
    prisma.product.count({ where: { isActive: true } }),
    prisma.order.aggregate({
      where: { paymentStatus: "PAID" },
      _sum: { total: true },
    }),
    prisma.order.findMany({
      take: 5,
      orderBy: { createdAt: "desc" },
      include: {
        items: { take: 1 },
      },
    }),
  ]);

  return {
    totalOrders,
    totalCustomers,
    totalProducts,
    totalRevenue: Number(revenueResult._sum.total ?? 0),
    recentOrders,
  };
}

const statusColors: Record<string, string> = {
  PENDING: "bg-yellow-100 text-yellow-700",
  CONFIRMED: "bg-blue-100 text-blue-700",
  PROCESSING: "bg-purple-100 text-purple-700",
  SHIPPED: "bg-indigo-100 text-indigo-700",
  DELIVERED: "bg-green-100 text-green-700",
  CANCELLED: "bg-red-100 text-red-700",
};

const statusLabels: Record<string, string> = {
  PENDING: "Pendiente",
  CONFIRMED: "Confirmado",
  PROCESSING: "Procesando",
  SHIPPED: "Enviado",
  DELIVERED: "Entregado",
  CANCELLED: "Cancelado",
};

export default async function DashboardPage() {
  const stats = await getDashboardStats();

  const statCards = [
    {
      title: "Ingresos totales",
      value: formatPrice(stats.totalRevenue),
      icon: TrendingUp,
      color: "text-green-600 bg-green-50",
      change: "+12% este mes",
    },
    {
      title: "Total órdenes",
      value: stats.totalOrders.toString(),
      icon: ShoppingBag,
      color: "text-blue-600 bg-blue-50",
      change: "+8 esta semana",
    },
    {
      title: "Clientes",
      value: stats.totalCustomers.toString(),
      icon: Users,
      color: "text-purple-600 bg-purple-50",
      change: "+5 este mes",
    },
    {
      title: "Productos activos",
      value: stats.totalProducts.toString(),
      icon: Package,
      color: "text-amber-600 bg-amber-50",
      change: "Total en catálogo",
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-stone-900">Dashboard</h1>
        <p className="text-stone-500 text-sm mt-1">Resumen general del negocio</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((stat) => (
          <Card key={stat.title}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <p className="text-sm font-medium text-stone-500">{stat.title}</p>
                <div className={`w-9 h-9 rounded-xl ${stat.color} flex items-center justify-center`}>
                  <stat.icon className="w-4 h-4" />
                </div>
              </div>
              <p className="text-2xl font-bold text-stone-900">{stat.value}</p>
              <p className="text-xs text-stone-400 mt-1 flex items-center gap-1">
                <ArrowUpRight className="w-3 h-3 text-green-500" />
                {stat.change}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Orders */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Órdenes recientes</CardTitle>
            <a href="/dashboard/ordenes" className="text-sm text-amber-600 hover:text-amber-700 transition-colors">
              Ver todas →
            </a>
          </div>
        </CardHeader>
        <CardContent>
          {stats.recentOrders.length === 0 ? (
            <div className="text-center py-8 text-stone-400">
              <Clock className="w-8 h-8 mx-auto mb-2 opacity-40" />
              <p className="text-sm">No hay órdenes aún</p>
            </div>
          ) : (
            <div className="space-y-3">
              {stats.recentOrders.map((order: { id: string; orderNumber: string; status: string; total: unknown; createdAt: Date }) => (
                <div key={order.id} className="flex items-center justify-between p-4 rounded-xl bg-stone-50 hover:bg-stone-100 transition-colors">
                  <div>
                    <p className="font-medium text-stone-900 text-sm">{order.orderNumber}</p>
                    <p className="text-xs text-stone-400 mt-0.5">
                      {new Date(order.createdAt).toLocaleDateString("es-CO")}
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${statusColors[order.status] ?? "bg-stone-100 text-stone-600"}`}>
                      {statusLabels[order.status] ?? order.status}
                    </span>
                    <span className="font-semibold text-stone-900 text-sm">
                      {formatPrice(Number(order.total))}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
