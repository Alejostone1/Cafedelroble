import { Truck, Shield, RefreshCcw, Award, Leaf, Coffee } from "lucide-react";

const benefits = [
  {
    icon: Truck,
    title: "Envío rápido",
    description: "Envío gratis en compras superiores a $80.000. Entrega en 2-3 días hábiles.",
    color: "bg-amber-50 text-amber-600",
  },
  {
    icon: Shield,
    title: "Pago seguro",
    description: "Transacciones protegidas con encriptación SSL y Stripe.",
    color: "bg-blue-50 text-blue-600",
  },
  {
    icon: RefreshCcw,
    title: "Devoluciones",
    description: "30 días de garantía de satisfacción. Si no te gusta, te devolvemos el dinero.",
    color: "bg-green-50 text-green-600",
  },
  {
    icon: Award,
    title: "Calidad premium",
    description: "Café de especialidad con certificación de origen y proceso artesanal.",
    color: "bg-purple-50 text-purple-600",
  },
  {
    icon: Leaf,
    title: "Sostenible",
    description: "Comercio justo con los cafeteros. Empaques biodegradables.",
    color: "bg-emerald-50 text-emerald-600",
  },
  {
    icon: Coffee,
    title: "Expertos en café",
    description: "Más de 25 años de experiencia seleccionando los mejores granos.",
    color: "bg-orange-50 text-orange-600",
  },
];

export function BenefitsSection() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-sm font-medium text-amber-600 uppercase tracking-wider mb-2">
            ¿Por qué elegirnos?
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-stone-900 tracking-tight">
            La diferencia Café del Roble
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((benefit) => (
            <div
              key={benefit.title}
              className="group flex gap-4 p-6 rounded-2xl border border-stone-100 hover:border-stone-200 hover:shadow-sm transition-all duration-200"
            >
              <div className={`w-12 h-12 rounded-xl ${benefit.color} flex items-center justify-center shrink-0`}>
                <benefit.icon className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-semibold text-stone-900 mb-1">{benefit.title}</h3>
                <p className="text-sm text-stone-500 leading-relaxed">{benefit.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
