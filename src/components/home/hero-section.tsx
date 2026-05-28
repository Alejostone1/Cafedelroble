import Link from "next/link";
import { ArrowRight, Star, Package, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-stone-50 via-amber-50/30 to-stone-100">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 right-0 w-96 h-96 bg-amber-200 rounded-full blur-3xl" />
        <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-stone-200 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 bg-amber-100 text-amber-800 px-4 py-1.5 rounded-full text-sm font-medium">
              <Star className="w-3.5 h-3.5 fill-current" />
              Café de especialidad desde 1998
            </div>

            <div className="space-y-4">
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-stone-900 leading-[1.05] tracking-tight">
                El sabor de
                <span className="block text-amber-600">Colombia</span>
                en tu taza
              </h1>
              <p className="text-lg text-stone-600 max-w-md leading-relaxed">
                Granos seleccionados de las mejores fincas cafeteras colombianas.
                Tostado artesanal, entregado fresco directamente a tu puerta.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <Button asChild size="lg" className="group">
                <Link href="/productos">
                  Explorar café
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/sobre-nosotros">Nuestra historia</Link>
              </Button>
            </div>

            {/* Trust signals */}
            <div className="flex flex-wrap gap-6 pt-2">
              {[
                { icon: Star, label: "4.9/5 valoración" },
                { icon: Package, label: "+500 productos" },
                { icon: Truck, label: "Envío gratis +$80.000" },
              ].map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-2 text-sm text-stone-600">
                  <div className="w-8 h-8 rounded-lg bg-white shadow-sm flex items-center justify-center">
                    <Icon className="w-4 h-4 text-amber-600" />
                  </div>
                  {label}
                </div>
              ))}
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative">
            <div className="aspect-square max-w-lg mx-auto relative">
              {/* Main card */}
              <div className="w-full h-full rounded-3xl bg-gradient-to-br from-amber-800 to-stone-900 shadow-2xl overflow-hidden">
                <div className="w-full h-full flex items-center justify-center">
                  <div className="text-center text-white/80 space-y-4">
                    <div className="text-8xl">☕</div>
                    <p className="text-lg font-medium opacity-60">Imagen del producto</p>
                    <p className="text-sm opacity-40">Sube tu imagen destacada</p>
                  </div>
                </div>
              </div>

              {/* Floating cards */}
              <div className="absolute -top-4 -right-4 bg-white rounded-2xl shadow-lg p-4 border border-stone-100">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                    <span className="text-green-600 text-xs font-bold">✓</span>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-stone-900">Pedido confirmado</p>
                    <p className="text-xs text-stone-500">Llegará mañana</p>
                  </div>
                </div>
              </div>

              <div className="absolute -bottom-4 -left-4 bg-white rounded-2xl shadow-lg p-4 border border-stone-100">
                <div className="flex items-center gap-3">
                  <div className="flex -space-x-2">
                    {[1, 2, 3].map((i) => (
                      <div
                        key={i}
                        className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 border-2 border-white"
                      />
                    ))}
                  </div>
                  <div>
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                    <p className="text-xs text-stone-500 mt-0.5">+2.400 reseñas</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
