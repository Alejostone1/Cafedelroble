"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowDown, MapPin } from "lucide-react";

export function AboutHero() {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;
    const items = el.querySelectorAll<HTMLElement>("[data-animate]");
    items.forEach((item, i) => {
      item.style.opacity = "0";
      setTimeout(() => {
        item.style.transition = "all 0.7s cubic-bezier(0.16,1,0.3,1)";
        item.style.opacity = "1";
        item.style.transform = "translateY(0)";
      }, i * 150);
    });
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-stone-900"
    >
      {/* Animated background blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-amber-600/20 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-amber-800/15 rounded-full blur-3xl animate-pulse-slow delay-400" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-stone-800/50 rounded-full blur-2xl" />
      </div>

      {/* Rotating ring */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[500px] h-[500px] border border-amber-600/10 rounded-full animate-spin-slow" />
        <div className="absolute w-[400px] h-[400px] border border-amber-500/10 rounded-full animate-spin-slow" style={{ animationDirection: "reverse", animationDuration: "15s" }} />
      </div>

      {/* Coffee cup illustration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
        <div className="animate-float">
          <div className="text-[120px] opacity-5 select-none">☕</div>
        </div>
      </div>

      {/* Steam animations */}
      <div className="absolute top-1/2 left-1/2 pointer-events-none" style={{ transform: "translate(-50%, -80%)" }}>
        <div className="flex gap-3">
          <div className="w-1 h-8 bg-amber-400/20 rounded-full animate-steam-1" />
          <div className="w-1 h-10 bg-amber-400/20 rounded-full animate-steam-2" />
          <div className="w-1 h-7 bg-amber-400/20 rounded-full animate-steam-3" />
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        {/* Badge */}
        <div
          data-animate
          style={{ transform: "translateY(20px)" }}
          className="inline-flex items-center gap-2 bg-amber-600/20 border border-amber-600/30 text-amber-300 px-5 py-2 rounded-full text-sm font-medium mb-8 backdrop-blur-sm"
        >
          <MapPin className="w-3.5 h-3.5" />
          Vereda El Roble, Toro Valle — 1600 m.s.n.m.
        </div>

        {/* Title */}
        <h1
          data-animate
          style={{ transform: "translateY(24px)" }}
          className="text-5xl sm:text-7xl lg:text-8xl font-bold text-white tracking-tight leading-[0.95] mb-6"
        >
          Café del
          <span className="block" style={{
            background: "linear-gradient(135deg, #fbbf24, #d97706, #b45309)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text"
          }}>
            Roble
          </span>
        </h1>

        {/* Subtitle */}
        <p
          data-animate
          style={{ transform: "translateY(24px)" }}
          className="text-lg sm:text-xl text-stone-400 max-w-xl mx-auto leading-relaxed mb-4"
        >
          Un sueño hecho realidad con amor, dedicación y trabajo.
          <span className="block mt-1 text-amber-400 font-medium">
            Hernán & Leidy
          </span>
        </p>

        {/* Tagline */}
        <p
          data-animate
          style={{ transform: "translateY(24px)" }}
          className="text-stone-500 text-sm tracking-[0.3em] uppercase mb-12"
        >
          🌱 El poder del café en tus manos
        </p>

        {/* CTA */}
        <div
          data-animate
          style={{ transform: "translateY(24px)" }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link
            href="/productos"
            className="px-8 py-4 bg-amber-600 text-white font-semibold rounded-xl hover:bg-amber-500 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-amber-600/30"
          >
            Ver nuestros productos
          </Link>
          <a
            href="https://wa.me/573144264715?text=Hola! Me interesa el Café del Roble"
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-4 bg-[#25D366] text-white font-semibold rounded-xl hover:bg-[#22c55e] transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            Pedir por WhatsApp
          </a>
        </div>

        {/* Scroll indicator */}
        <div
          data-animate
          style={{ transform: "translateY(24px)" }}
          className="mt-16 flex flex-col items-center gap-2 text-stone-600"
        >
          <span className="text-xs tracking-widest uppercase">Conoce nuestra historia</span>
          <ArrowDown className="w-4 h-4 animate-bounce" />
        </div>
      </div>

      {/* Bottom gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent" />
    </section>
  );
}
