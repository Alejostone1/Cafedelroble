import Link from "next/link";
import { CheckCircle, Package, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "¡Pedido confirmado!",
};

export default function CheckoutSuccessPage() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center py-20">
      <div className="max-w-md mx-auto px-4 text-center">
        <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-10 h-10 text-green-600" />
        </div>
        <h1 className="text-3xl font-bold text-stone-900 mb-3">¡Pedido confirmado!</h1>
        <p className="text-stone-500 mb-2">
          Tu pago fue procesado exitosamente.
        </p>
        <p className="text-stone-500 mb-8 text-sm">
          Recibirás un email de confirmación con los detalles de tu pedido.
        </p>
        <div className="bg-amber-50 rounded-2xl p-5 mb-8 text-left space-y-2">
          <div className="flex items-center gap-2 text-amber-800 font-medium">
            <Package className="w-4 h-4" />
            ¿Qué sigue?
          </div>
          <ul className="space-y-1.5 text-sm text-amber-700">
            <li>• Procesamos tu pedido en las próximas 24 horas</li>
            <li>• Te enviamos el número de seguimiento por email</li>
            <li>• Entrega en 2-3 días hábiles</li>
          </ul>
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          <Button asChild className="flex-1">
            <Link href="/pedidos">
              Ver mis pedidos
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
          <Button asChild variant="outline" className="flex-1">
            <Link href="/productos">Seguir comprando</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
