import Link from "next/link";
import { ArrowRight, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export function CTASection() {
  return (
    <section className="py-20 bg-stone-900 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-amber-500 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-amber-700 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="inline-flex items-center gap-2 bg-amber-600/20 text-amber-400 px-4 py-1.5 rounded-full text-sm font-medium mb-8">
          ☕ Envío gratis en tu primera compra
        </div>

        <h2 className="text-4xl sm:text-5xl font-bold text-white tracking-tight mb-6">
          Descubre el café que{" "}
          <span className="text-amber-400">siempre buscaste</span>
        </h2>

        <p className="text-lg text-stone-400 max-w-xl mx-auto mb-10">
          Más de 2.400 amantes del café ya disfrutan de nuestros granos seleccionados.
          Únete a la familia del Roble hoy.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild size="xl" className="group">
            <Link href="/productos">
              Comenzar ahora
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
          <Button
            asChild
            size="xl"
            variant="outline"
            className="border-stone-700 text-stone-300 bg-transparent hover:bg-stone-800 hover:text-white hover:border-stone-600"
          >
            <a
              href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "573001234567"}?text=Hola! Me gustaría saber más sobre sus cafés`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <MessageCircle className="w-5 h-5" />
              Hablar con nosotros
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
