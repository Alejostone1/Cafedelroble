"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Phone, MapPin, ArrowRight } from "lucide-react";

export function AboutCTA() {
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
    <section ref={ref} className="py-24 bg-stone-900 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/3 w-96 h-96 bg-amber-600/10 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-0 right-1/3 w-80 h-80 bg-amber-800/10 rounded-full blur-3xl animate-pulse-slow delay-400" />
      </div>

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Big emoji */}
        <div
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "scale(1)" : "scale(0.5)",
            transition: "all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)",
          }}
          className="text-7xl mb-8 inline-block animate-float"
        >
          🌱
        </div>

        <div
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(32px)",
            transition: "all 0.8s cubic-bezier(0.16,1,0.3,1) 0.2s",
          }}
        >
          <h2 className="text-4xl sm:text-6xl font-bold text-white tracking-tight mb-6">
            El poder del café
            <span className="block" style={{
              background: "linear-gradient(135deg, #fbbf24, #d97706)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text"
            }}>
              en tus manos
            </span>
          </h2>

          <p className="text-stone-400 text-lg max-w-lg mx-auto mb-10 leading-relaxed">
            Cada compra nos ayuda a seguir creciendo y compartiendo
            con ustedes el fruto de nuestra tierra.
          </p>
        </div>

        {/* Contact info */}
        <div
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(32px)",
            transition: "all 0.8s cubic-bezier(0.16,1,0.3,1) 0.35s",
          }}
          className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-10"
        >
          <div className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-2xl px-5 py-3">
            <Phone className="w-4 h-4 text-amber-400" />
            <div className="text-left">
              <p className="text-xs text-stone-500">Pedidos</p>
              <p className="text-white font-semibold">314 426 4715</p>
            </div>
          </div>
          <div className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-2xl px-5 py-3">
            <MapPin className="w-4 h-4 text-amber-400" />
            <div className="text-left">
              <p className="text-xs text-stone-500">Domicilios en</p>
              <p className="text-white font-semibold">Pereira & Dosquebradas</p>
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(32px)",
            transition: "all 0.8s cubic-bezier(0.16,1,0.3,1) 0.5s",
          }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <a
            href="https://wa.me/573144264715?text=Hola! Me interesa el Café del Roble. ¿Cómo puedo hacer un pedido?"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-[#25D366] text-white font-bold rounded-xl hover:bg-[#22c55e] transition-all hover:scale-105 hover:shadow-xl hover:shadow-green-600/30"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            Hacer un pedido ahora
          </a>

          <Link
            href="/productos"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-stone-700 text-stone-300 font-semibold rounded-xl hover:bg-stone-800 hover:text-white transition-all hover:scale-105 group"
          >
            Ver todos los productos
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Bottom tagline */}
        <div
          style={{
            opacity: visible ? 1 : 0,
            transition: "opacity 1s ease 0.7s",
          }}
          className="mt-16 pt-8 border-t border-stone-800"
        >
          <p className="text-stone-600 text-sm tracking-widest uppercase">
            ☕ Café del Roble — Vereda El Roble, Toro Valle
          </p>
        </div>
      </div>
    </section>
  );
}
