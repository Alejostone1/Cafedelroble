"use client";

import { useEffect, useRef } from "react";
import { MessageCircle } from "lucide-react";

export function ContactHero() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const items = ref.current?.querySelectorAll<HTMLElement>("[data-a]");
    items?.forEach((el, i) => {
      el.style.opacity = "0";
      el.style.transform = "translateY(28px)";
      setTimeout(() => {
        el.style.transition = "all 0.8s cubic-bezier(0.16,1,0.3,1)";
        el.style.opacity = "1";
        el.style.transform = "translateY(0)";
      }, i * 130);
    });
  }, []);

  return (
    <section
      ref={ref}
      className="relative pt-24 pb-16 bg-gradient-to-br from-stone-50 via-amber-50/40 to-stone-100 overflow-hidden"
    >
      {/* Blobs decorativos */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-amber-200/30 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4 animate-pulse-slow" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-stone-200/50 rounded-full blur-3xl translate-y-1/3 -translate-x-1/4 animate-pulse-slow delay-500" />
      </div>

      {/* Cuadrícula decorativa */}
      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            "linear-gradient(#92400e 1px,transparent 1px),linear-gradient(90deg,#92400e 1px,transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Ícono animado */}
        <div data-a className="inline-flex items-center justify-center mb-6">
          <div className="relative">
            <div className="w-20 h-20 rounded-3xl bg-amber-600 flex items-center justify-center shadow-2xl shadow-amber-600/40 hover:scale-110 transition-transform cursor-default">
              <MessageCircle className="w-9 h-9 text-white" />
            </div>
            {/* Ping exterior */}
            <span className="absolute inset-0 rounded-3xl bg-amber-600/30 animate-ping" />
          </div>
        </div>

        {/* Chip */}
        <div data-a className="inline-flex items-center gap-2 bg-white border border-amber-200 text-amber-700 px-4 py-1.5 rounded-full text-sm font-medium mb-6 shadow-sm">
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          Respondemos en menos de 2 horas
        </div>

        {/* Título */}
        <h1 data-a className="text-5xl sm:text-7xl font-bold text-stone-900 tracking-tight leading-tight mb-5">
          Hablemos de
          <span
            className="block"
            style={{
              background: "linear-gradient(135deg,#d97706,#b45309,#92400e)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            café ☕
          </span>
        </h1>

        <p data-a className="text-lg text-stone-500 max-w-lg mx-auto leading-relaxed mb-8">
          ¿Pedidos, preguntas o simplemente quieres saber más sobre nuestro café de origen?
          Estamos aquí para ti.
        </p>

        {/* Datos rápidos */}
        <div data-a className="flex flex-wrap justify-center gap-4">
          {[
            { icon: "📲", label: "314 426 4715" },
            { icon: "📍", label: "Toro, Valle del Cauca" },
            { icon: "🚚", label: "Pereira & Dosquebradas" },
          ].map((d) => (
            <span
              key={d.label}
              className="flex items-center gap-2 bg-white/80 backdrop-blur border border-stone-200 px-4 py-2 rounded-full text-sm text-stone-700 shadow-sm"
            >
              {d.icon} {d.label}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
