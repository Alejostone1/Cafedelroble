import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "María Fernanda R.",
    location: "Bogotá",
    rating: 5,
    comment:
      "El mejor café que he probado en mi vida. Desde que lo descubrí, no puedo tomar otro. El aroma al abrir el paquete es increíble.",
    product: "Café Supremo Huila 250g",
    avatar: "MF",
  },
  {
    id: 2,
    name: "Carlos Andres M.",
    location: "Medellín",
    rating: 5,
    comment:
      "Llevo 6 meses con la suscripción mensual y cada entrega es una sorpresa. La calidad es consistente y el servicio excelente.",
    product: "Suscripción mensual",
    avatar: "CA",
  },
  {
    id: 3,
    name: "Laura González",
    location: "Cali",
    rating: 5,
    comment:
      "Compré como regalo para mi papá y quedó enamorado. Ya me pidió que le pidiera más. Definitivamente mi tienda favorita.",
    product: "Set de regalo Premium",
    avatar: "LG",
  },
];

const avatarColors = [
  "bg-amber-100 text-amber-700",
  "bg-stone-100 text-stone-700",
  "bg-orange-100 text-orange-700",
];

export function TestimonialsSection() {
  return (
    <section className="py-20 bg-stone-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-sm font-medium text-amber-600 uppercase tracking-wider mb-2">
            Testimonios
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-stone-900 tracking-tight">
            Lo que dicen nuestros clientes
          </h2>
          <div className="flex items-center justify-center gap-2 mt-4">
            <div className="flex">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <span className="text-stone-600 font-medium">4.9</span>
            <span className="text-stone-400">· +2.400 reseñas verificadas</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <div
              key={t.id}
              className="bg-white rounded-2xl p-6 border border-stone-100 hover:shadow-md transition-shadow duration-200"
            >
              <Quote className="w-8 h-8 text-amber-200 mb-4" />
              <p className="text-stone-700 leading-relaxed mb-6 text-sm">{t.comment}</p>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full ${avatarColors[i]} flex items-center justify-center font-semibold text-sm`}>
                    {t.avatar}
                  </div>
                  <div>
                    <p className="font-semibold text-stone-900 text-sm">{t.name}</p>
                    <p className="text-xs text-stone-400">{t.location}</p>
                  </div>
                </div>
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`w-3.5 h-3.5 ${
                        star <= t.rating ? "fill-amber-400 text-amber-400" : "text-stone-200"
                      }`}
                    />
                  ))}
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-stone-100">
                <p className="text-xs text-stone-400">
                  Compró: <span className="text-stone-600 font-medium">{t.product}</span>
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
