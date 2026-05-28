"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ShoppingCart, Check } from "lucide-react";

const presentations = [
  {
    weight: "120 g",
    name: "Mini Degustación",
    price: "$15.000",
    emoji: "☕",
    description: "Ideal para conocer nuestro café o regalar.",
    perks: ["Perfecto para regalo", "Envío económico", "1–2 semanas de consumo"],
    popular: false,
    gradient: "from-stone-800 to-stone-900",
    border: "border-stone-200",
    buttonClass: "bg-stone-800 hover:bg-stone-700 text-white",
  },
  {
    weight: "250 g",
    name: "Media Libra",
    price: "$22.000",
    emoji: "☕",
    description: "El favorito para consumo personal diario.",
    perks: ["2–3 semanas de consumo", "Precio equilibrado", "Ideal para una persona"],
    popular: true,
    gradient: "from-amber-700 to-amber-900",
    border: "border-amber-300",
    buttonClass: "bg-amber-600 hover:bg-amber-500 text-white",
  },
  {
    weight: "500 g",
    name: "Libra Completa",
    price: "$35.000",
    emoji: "☕",
    description: "Para los verdaderos amantes del café.",
    perks: ["Hasta 1 mes de consumo", "Mejor precio por gramo", "Ideal para familia"],
    popular: false,
    gradient: "from-stone-800 to-stone-900",
    border: "border-stone-200",
    buttonClass: "bg-stone-800 hover:bg-stone-700 text-white",
  },
];

export function AboutPricing() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(32px)",
            transition: "all 0.8s cubic-bezier(0.16,1,0.3,1)",
          }}
          className="text-center mb-14"
        >
          <span className="inline-block text-amber-600 text-sm font-semibold uppercase tracking-widest mb-3">
            Presentaciones
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold text-stone-900 tracking-tight mb-4">
            Elige tu tamaño ideal
          </h2>
          <p className="text-stone-500 max-w-md mx-auto">
            🚚 Domicilios en <strong>Pereira y Dosquebradas</strong>
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {presentations.map((p, i) => (
            <div
              key={p.weight}
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0) scale(1)" : "translateY(40px) scale(0.95)",
                transition: `all 0.8s cubic-bezier(0.16,1,0.3,1) ${i * 0.15}s`,
              }}
              className={`relative rounded-3xl border-2 ${p.border} overflow-hidden group hover:-translate-y-2 transition-transform duration-300 ${p.popular ? "shadow-2xl shadow-amber-200" : "shadow-md"}`}
            >
              {p.popular && (
                <div className="absolute top-0 left-0 right-0 bg-amber-500 text-white text-xs font-bold text-center py-2 uppercase tracking-widest">
                  ⭐ Más popular
                </div>
              )}

              {/* Header */}
              <div className={`bg-gradient-to-br ${p.gradient} p-8 ${p.popular ? "pt-12" : ""} text-center`}>
                <div className="text-6xl mb-3 group-hover:scale-110 transition-transform inline-block">
                  {p.emoji}
                </div>
                {/* Steam effect */}
                <div className="flex justify-center gap-2 mb-4">
                  <div className="w-0.5 h-4 bg-white/20 rounded-full animate-steam-1" />
                  <div className="w-0.5 h-5 bg-white/20 rounded-full animate-steam-2" />
                  <div className="w-0.5 h-3 bg-white/20 rounded-full animate-steam-3" />
                </div>
                <p className="text-white/60 text-sm font-medium uppercase tracking-widest mb-1">{p.weight}</p>
                <h3 className="text-white text-xl font-bold mb-2">{p.name}</h3>
                <div className="text-4xl font-bold text-white mt-3">{p.price}</div>
                <p className="text-white/50 text-xs mt-1">por presentación</p>
              </div>

              {/* Body */}
              <div className="p-6 bg-white">
                <p className="text-stone-600 text-sm mb-5 text-center">{p.description}</p>
                <ul className="space-y-3 mb-6">
                  {p.perks.map((perk) => (
                    <li key={perk} className="flex items-center gap-3 text-sm text-stone-700">
                      <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center shrink-0">
                        <Check className="w-3 h-3 text-green-600" />
                      </div>
                      {perk}
                    </li>
                  ))}
                </ul>

                <div className="flex flex-col gap-2">
                  <a
                    href={`https://wa.me/573144264715?text=Hola! Quiero pedir Café del Roble ${p.weight} - ${p.price}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-full py-3 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition-all hover:scale-[1.02] ${p.buttonClass}`}
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                    Pedir por WhatsApp
                  </a>
                  <Link
                    href="/productos"
                    className="w-full py-2.5 rounded-xl font-medium text-sm border border-stone-200 text-stone-600 flex items-center justify-center gap-2 hover:bg-stone-50 transition-colors"
                  >
                    <ShoppingCart className="w-4 h-4" />
                    Ver en tienda
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
