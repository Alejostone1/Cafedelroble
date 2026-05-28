"use client";

import { useEffect, useRef } from "react";

const features = [
  {
    emoji: "🏔️",
    title: "Cosechado a 1600 m",
    description: "La altitud perfecta para desarrollar los mejores aromas y sabores en cada grano.",
    color: "from-sky-50 to-blue-50 border-sky-100",
    accent: "text-sky-600",
  },
  {
    emoji: "🇨🇴",
    title: "100% colombiano",
    description: "Orgullo nacional en cada taza. Cultivado y procesado en suelo colombiano.",
    color: "from-amber-50 to-yellow-50 border-amber-100",
    accent: "text-amber-600",
  },
  {
    emoji: "🔥",
    title: "Tostado artesanal",
    description: "Tostado y molido con técnicas artesanales para preservar todo el sabor.",
    color: "from-orange-50 to-red-50 border-orange-100",
    accent: "text-orange-600",
  },
  {
    emoji: "🌱",
    title: "Café de origen",
    description: "Trazabilidad completa desde la finca. Sabes exactamente de dónde viene tu café.",
    color: "from-green-50 to-emerald-50 border-green-100",
    accent: "text-green-600",
  },
];

export function AboutFeatures() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const cards = ref.current?.querySelectorAll<HTMLElement>("[data-card]");
            cards?.forEach((card, i) => {
              setTimeout(() => {
                card.style.opacity = "1";
                card.style.transform = "translateY(0)";
              }, i * 120);
            });
          }
        });
      },
      { threshold: 0.2 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} className="py-24 bg-stone-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <span className="inline-block text-amber-600 text-sm font-semibold uppercase tracking-widest mb-3">
            ¿Por qué elegirnos?
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold text-stone-900 tracking-tight">
            Nuestro café es
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {features.map((f) => (
            <div
              key={f.title}
              data-card
              style={{ opacity: 0, transform: "translateY(32px)", transition: "all 0.7s cubic-bezier(0.16,1,0.3,1)" }}
              className={`group bg-gradient-to-br ${f.color} border rounded-3xl p-7 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 cursor-default`}
            >
              <div className="text-5xl mb-5 group-hover:scale-110 transition-transform inline-block">
                {f.emoji}
              </div>
              <div className="flex items-center gap-2 mb-3">
                <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse-slow" />
                <span className={`text-xs font-bold uppercase tracking-wider ${f.accent}`}>
                  Garantizado
                </span>
              </div>
              <h3 className="text-lg font-bold text-stone-900 mb-2">{f.title}</h3>
              <p className="text-sm text-stone-600 leading-relaxed">{f.description}</p>
            </div>
          ))}
        </div>

        {/* Stats row */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { number: "1600", label: "metros de altura", suffix: "m" },
            { number: "100", label: "café colombiano", suffix: "%" },
            { number: "3", label: "presentaciones", suffix: "" },
            { number: "∞", label: "amor por el café", suffix: "" },
          ].map((s, i) => (
            <div
              key={s.label}
              data-card
              style={{ opacity: 0, transform: "translateY(32px)", transition: `all 0.7s cubic-bezier(0.16,1,0.3,1) ${i * 0.1}s` }}
              className="text-center bg-white rounded-2xl p-6 border border-stone-100 shadow-sm"
            >
              <p className="text-4xl font-bold text-amber-600">
                {s.number}<span className="text-2xl">{s.suffix}</span>
              </p>
              <p className="text-sm text-stone-500 mt-1">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
