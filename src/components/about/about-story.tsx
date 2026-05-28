"use client";

import { useEffect, useRef } from "react";
import { Heart, Sprout, Mountain } from "lucide-react";

export function AboutStory() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement;
            el.style.opacity = "1";
            el.style.transform = "translateY(0) translateX(0)";
          }
        });
      },
      { threshold: 0.15 }
    );

    const items = ref.current?.querySelectorAll<HTMLElement>("[data-reveal]");
    items?.forEach((item) => {
      item.style.transition = "all 0.8s cubic-bezier(0.16,1,0.3,1)";
      observer.observe(item);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section header */}
        <div
          data-reveal
          style={{ opacity: 0, transform: "translateY(32px)" }}
          className="text-center mb-16"
        >
          <span className="inline-block text-amber-600 text-sm font-semibold uppercase tracking-widest mb-3">
            Nuestra historia
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold text-stone-900 tracking-tight">
            Un sueño cultivado<br />
            <span style={{
              background: "linear-gradient(135deg, #d97706, #b45309)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text"
            }}>con las manos</span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Big coffee visual */}
          <div
            data-reveal
            style={{ opacity: 0, transform: "translateX(-40px)" }}
          >
            <div className="relative">
              {/* Main card */}
              <div className="rounded-3xl bg-gradient-to-br from-amber-900 via-stone-800 to-stone-900 p-10 shadow-2xl">
                <div className="text-center">
                  <div className="text-8xl mb-6 animate-float inline-block">🌳</div>
                  <p className="text-amber-300 font-bold text-2xl mb-2">Vereda El Roble</p>
                  <p className="text-stone-400 text-sm">Toro, Valle del Cauca</p>

                  <div className="mt-8 grid grid-cols-3 gap-4">
                    {[
                      { value: "1600", label: "metros", suffix: "m.s.n.m." },
                      { value: "100%", label: "colombiano", suffix: "" },
                      { value: "2", label: "fundadores", suffix: "" },
                    ].map((stat) => (
                      <div key={stat.label} className="bg-white/5 rounded-2xl p-4 border border-white/10">
                        <p className="text-2xl font-bold text-amber-400">{stat.value}</p>
                        <p className="text-xs text-stone-400 mt-1">{stat.label}</p>
                        {stat.suffix && <p className="text-[10px] text-stone-500">{stat.suffix}</p>}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Floating badge */}
              <div className="absolute -top-4 -right-4 bg-amber-500 text-white rounded-2xl px-4 py-2 shadow-lg font-bold text-sm animate-float" style={{ animationDelay: "0.5s" }}>
                ☕ Origen único
              </div>

              {/* Floating badge 2 */}
              <div className="absolute -bottom-4 -left-4 bg-white rounded-2xl px-4 py-3 shadow-xl border border-stone-100 animate-float" style={{ animationDelay: "1s" }}>
                <div className="flex items-center gap-2">
                  <span className="text-2xl">🏆</span>
                  <div>
                    <p className="text-xs font-bold text-stone-800">Calidad premium</p>
                    <p className="text-xs text-stone-400">Desde la semilla</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Story text */}
          <div className="space-y-8">
            {[
              {
                icon: Heart,
                color: "bg-red-50 text-red-500",
                title: "Un sueño hecho realidad",
                text: "Con mucho amor, dedicación y trabajo, Hernán y Leidy les presentamos nuestro nuevo proyecto: Café del Roble. Un emprendimiento familiar nacido de la pasión por la tierra y el café colombiano.",
                delay: "0s",
              },
              {
                icon: Mountain,
                color: "bg-amber-50 text-amber-600",
                title: "Cultivado en las alturas",
                text: "Nuestro café crece a 1600 metros sobre el nivel del mar en la Vereda El Roble, Toro Valle. La altitud y el clima único de esta región le dan a nuestro café su aroma y sabor incomparables.",
                delay: "0.15s",
              },
              {
                icon: Sprout,
                color: "bg-green-50 text-green-600",
                title: "De la semilla a tu taza",
                text: "Cuidamos cada etapa del proceso artesanalmente: semilla, cultivo, cosecha, tostado y molido. Cada libra de Café del Roble es el resultado de meses de dedicación y amor por el campo colombiano.",
                delay: "0.3s",
              },
            ].map((item) => (
              <div
                key={item.title}
                data-reveal
                style={{ opacity: 0, transform: "translateX(40px)", transitionDelay: item.delay }}
                className="flex gap-5 group"
              >
                <div className={`w-12 h-12 rounded-2xl ${item.color} flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform`}>
                  <item.icon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-stone-900 mb-2 text-lg">{item.title}</h3>
                  <p className="text-stone-600 leading-relaxed">{item.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quote */}
        <div
          data-reveal
          style={{ opacity: 0, transform: "translateY(32px)" }}
          className="mt-20 text-center"
        >
          <div className="inline-block bg-amber-50 border border-amber-100 rounded-3xl px-8 py-6 max-w-2xl">
            <p className="text-2xl text-stone-700 font-light leading-relaxed italic">
              "Gracias por apoyar los emprendimientos familiares<br />
              y el trabajo del campo colombiano."
            </p>
            <p className="mt-4 text-amber-700 font-semibold">— Hernán & Leidy</p>
          </div>
        </div>
      </div>
    </section>
  );
}
