"use client";

import { useEffect, useRef, useState } from "react";
import {
  Phone, MapPin, Clock, Send, CheckCircle2,
  MessageCircle, Coffee, ArrowRight,
} from "lucide-react";

/* ─── Canales de contacto ─── */
const canales = [
  {
    icon: MessageCircle,
    color: "bg-green-500",
    glow: "shadow-green-500/30",
    titulo: "WhatsApp",
    valor: "314 426 4715",
    descripcion: "Respuesta inmediata · pedidos y consultas",
    accion: "Abrir chat",
    href: "https://wa.me/573144264715?text=Hola%21%20Me%20interesa%20el%20Caf%C3%A9%20del%20Roble%20%F0%9F%8C%B3",
    externo: true,
  },
  {
    icon: Phone,
    color: "bg-amber-600",
    glow: "shadow-amber-600/30",
    titulo: "Llamada",
    valor: "314 426 4715",
    descripcion: "Lunes a sábado · 8 am – 7 pm",
    accion: "Llamar ahora",
    href: "tel:+573144264715",
    externo: false,
  },
  {
    icon: MapPin,
    color: "bg-sky-600",
    glow: "shadow-sky-600/30",
    titulo: "Origen",
    valor: "Vereda El Roble",
    descripcion: "Toro, Valle del Cauca · 1 600 m.s.n.m.",
    accion: "Ver en mapa",
    href: "https://maps.google.com/?q=Toro+Valle+del+Cauca+Colombia",
    externo: true,
  },
  {
    icon: Clock,
    color: "bg-purple-600",
    glow: "shadow-purple-600/30",
    titulo: "Domicilios",
    valor: "Pereira & Dosquebradas",
    descripcion: "Entrega el mismo día · pedidos antes de las 3 pm",
    accion: "Pedir ahora",
    href: "https://wa.me/573144264715?text=Quiero%20un%20domicilio%20de%20Caf%C3%A9%20del%20Roble",
    externo: true,
  },
];

/* ─── Asuntos predefinidos ─── */
const asuntos = [
  "Quiero hacer un pedido",
  "Consulta sobre precios",
  "Domicilio a mi dirección",
  "Información del café",
  "Otro",
];

/* ─── Componente principal ─── */
export function ContactContent() {
  const ref = useRef<HTMLDivElement>(null);

  /* ── Animación al entrar ── */
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const el = e.target as HTMLElement;
            el.style.opacity = "1";
            el.style.transform = "translateY(0) translateX(0)";
          }
        });
      },
      { threshold: 0.12 }
    );
    ref.current
      ?.querySelectorAll<HTMLElement>("[data-r]")
      .forEach((el) => {
        el.style.transition = "all 0.75s cubic-bezier(0.16,1,0.3,1)";
        obs.observe(el);
      });
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={ref} className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ─── Tarjetas de canales ─── */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-20">
          {canales.map((c, i) => (
            <a
              key={c.titulo}
              href={c.href}
              target={c.externo ? "_blank" : undefined}
              rel={c.externo ? "noopener noreferrer" : undefined}
              data-r
              style={{
                opacity: 0,
                transform: "translateY(36px)",
                transitionDelay: `${i * 0.1}s`,
              }}
              className={`group flex flex-col gap-4 p-6 rounded-3xl border border-stone-100 bg-white hover:shadow-xl ${c.glow} hover:-translate-y-2 transition-all duration-300 cursor-pointer`}
            >
              <div className={`w-12 h-12 rounded-2xl ${c.color} flex items-center justify-center shadow-lg ${c.glow} group-hover:scale-110 transition-transform`}>
                <c.icon className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1">
                <p className="text-xs text-stone-400 uppercase tracking-widest mb-0.5">{c.titulo}</p>
                <p className="font-bold text-stone-900 text-base">{c.valor}</p>
                <p className="text-xs text-stone-500 mt-1 leading-relaxed">{c.descripcion}</p>
              </div>
              <span className="flex items-center gap-1.5 text-sm font-semibold text-amber-600 group-hover:gap-3 transition-all">
                {c.accion}
                <ArrowRight className="w-4 h-4" />
              </span>
            </a>
          ))}
        </div>

        {/* ─── Formulario + Info lateral ─── */}
        <div className="grid lg:grid-cols-[1fr,380px] gap-10">
          {/* Formulario */}
          <div
            data-r
            style={{ opacity: 0, transform: "translateX(-40px)" }}
          >
            <ContactForm />
          </div>

          {/* Info lateral */}
          <div
            data-r
            style={{ opacity: 0, transform: "translateX(40px)" }}
            className="space-y-6"
          >
            <InfoCard />
            <WhatsAppCard />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Formulario de contacto ─── */
function ContactForm() {
  const [asunto, setAsunto] = useState(asuntos[0]);
  const [enviado, setEnviado] = useState(false);
  const [loading, setLoading] = useState(false);
  const [campos, setCampos] = useState({ nombre: "", telefono: "", mensaje: "" });

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setCampos((p) => ({ ...p, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    // Genera mensaje de WhatsApp con los datos del formulario
    const texto = encodeURIComponent(
      `Hola! Me llamo ${campos.nombre}.\n📌 Asunto: ${asunto}\n📞 Teléfono: ${campos.telefono || "no indicado"}\n💬 ${campos.mensaje}`
    );
    setTimeout(() => {
      setLoading(false);
      setEnviado(true);
      window.open(`https://wa.me/573144264715?text=${texto}`, "_blank");
    }, 900);
  }

  if (enviado) {
    return (
      <div className="h-full flex flex-col items-center justify-center py-20 text-center rounded-3xl bg-green-50 border border-green-100">
        <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mb-5 animate-scale-in">
          <CheckCircle2 className="w-10 h-10 text-green-600" />
        </div>
        <h3 className="text-2xl font-bold text-stone-900 mb-2">¡Mensaje enviado!</h3>
        <p className="text-stone-500 mb-6 max-w-xs">
          Te redirigimos a WhatsApp para continuar la conversación con Hernán y Leidy.
        </p>
        <button
          onClick={() => { setEnviado(false); setCampos({ nombre: "", telefono: "", mensaje: "" }); }}
          className="text-sm text-amber-600 hover:text-amber-700 font-medium underline"
        >
          Enviar otro mensaje
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-3xl border border-stone-100 shadow-sm overflow-hidden">
      {/* Encabezado del formulario */}
      <div className="bg-gradient-to-r from-stone-900 to-stone-800 px-8 py-7">
        <div className="flex items-center gap-3 mb-1">
          <Coffee className="w-5 h-5 text-amber-400" />
          <h2 className="text-white font-bold text-xl">Envíanos un mensaje</h2>
        </div>
        <p className="text-stone-400 text-sm">
          Completa el formulario y te contactamos por WhatsApp.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="p-8 space-y-6">
        {/* Nombre */}
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-stone-700">Tu nombre *</label>
          <input
            name="nombre"
            value={campos.nombre}
            onChange={handleChange}
            required
            placeholder="Ej. Juan Pérez"
            className="w-full h-11 rounded-xl border border-stone-200 px-4 text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
          />
        </div>

        {/* Teléfono */}
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-stone-700">Teléfono (opcional)</label>
          <input
            name="telefono"
            value={campos.telefono}
            onChange={handleChange}
            placeholder="Ej. 312 345 6789"
            className="w-full h-11 rounded-xl border border-stone-200 px-4 text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
          />
        </div>

        {/* Asunto como chips */}
        <div className="space-y-2.5">
          <label className="text-sm font-medium text-stone-700">Asunto *</label>
          <div className="flex flex-wrap gap-2">
            {asuntos.map((a) => (
              <button
                key={a}
                type="button"
                onClick={() => setAsunto(a)}
                className={`px-4 py-2 rounded-xl text-sm font-medium border transition-all duration-200 ${
                  asunto === a
                    ? "bg-amber-600 text-white border-amber-600 scale-[1.04] shadow-md shadow-amber-600/20"
                    : "bg-white text-stone-600 border-stone-200 hover:border-amber-300 hover:text-amber-700"
                }`}
              >
                {a}
              </button>
            ))}
          </div>
        </div>

        {/* Mensaje */}
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-stone-700">Mensaje *</label>
          <textarea
            name="mensaje"
            value={campos.mensaje}
            onChange={handleChange}
            required
            rows={4}
            placeholder="Cuéntanos cómo podemos ayudarte…"
            className="w-full rounded-xl border border-stone-200 px-4 py-3 text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all resize-none"
          />
        </div>

        {/* Botón de envío */}
        <button
          type="submit"
          disabled={loading}
          className="w-full h-12 rounded-xl bg-amber-600 text-white font-semibold flex items-center justify-center gap-2 hover:bg-amber-500 disabled:opacity-70 transition-all hover:shadow-lg hover:shadow-amber-600/30 hover:scale-[1.01] active:scale-[0.99]"
        >
          {loading ? (
            <>
              <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Enviando…
            </>
          ) : (
            <>
              <Send className="w-4 h-4" />
              Enviar por WhatsApp
            </>
          )}
        </button>

        <p className="text-xs text-stone-400 text-center">
          Al enviar, abriremos WhatsApp con tu mensaje listo para enviar.
        </p>
      </form>
    </div>
  );
}

/* ─── Tarjeta de información ─── */
function InfoCard() {
  const items = [
    { emoji: "🌳", label: "Origen", valor: "Vereda El Roble, Toro – Valle" },
    { emoji: "⛰️", label: "Altitud", valor: "1 600 metros sobre el nivel del mar" },
    { emoji: "🚚", label: "Domicilios", valor: "Pereira y Dosquebradas" },
    { emoji: "⏰", label: "Atención", valor: "Lunes a sábado · 8 am – 7 pm" },
    { emoji: "👨‍🌾", label: "Fundadores", valor: "Hernán & Leidy" },
  ];

  return (
    <div className="bg-stone-900 rounded-3xl p-7 text-white">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-9 h-9 rounded-xl bg-amber-600 flex items-center justify-center">
          <Coffee className="w-4 h-4 text-white" />
        </div>
        <h3 className="font-bold text-lg">Información</h3>
      </div>
      <div className="space-y-4">
        {items.map((it) => (
          <div key={it.label} className="flex gap-3 group">
            <span className="text-xl shrink-0 group-hover:scale-125 transition-transform">
              {it.emoji}
            </span>
            <div>
              <p className="text-xs text-stone-500 uppercase tracking-wider">{it.label}</p>
              <p className="text-sm text-stone-200 leading-snug">{it.valor}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── Tarjeta de WhatsApp ─── */
function WhatsAppCard() {
  const mensajes = [
    { texto: "Quiero 1 libra de café", delay: "0s" },
    { texto: "¿Hacen domicilios a Pereira?", delay: "0.3s" },
    { texto: "¿Cuánto cuesta la media libra?", delay: "0.6s" },
  ];

  return (
    <div className="rounded-3xl overflow-hidden border border-stone-100 shadow-sm">
      {/* Header tipo WhatsApp */}
      <div className="bg-[#075E54] px-5 py-4 flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-amber-600 flex items-center justify-center text-white font-bold text-sm shrink-0">
          CR
        </div>
        <div>
          <p className="text-white font-semibold text-sm">Café del Roble</p>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <p className="text-green-300 text-xs">En línea</p>
          </div>
        </div>
        <svg className="w-6 h-6 text-white ml-auto" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
      </div>

      {/* Mensajes de ejemplo */}
      <div className="bg-[#ece5dd] px-4 py-5 space-y-3">
        {mensajes.map((m) => (
          <div
            key={m.texto}
            className="bg-white rounded-2xl rounded-tl-none px-4 py-2.5 shadow-sm max-w-[85%] animate-fade-up"
            style={{ animationDelay: m.delay, animationFillMode: "both" }}
          >
            <p className="text-stone-800 text-sm">{m.texto}</p>
            <p className="text-[10px] text-stone-400 text-right mt-1">✓✓</p>
          </div>
        ))}
        {/* Burbuja de respuesta */}
        <div className="bg-[#dcf8c6] rounded-2xl rounded-tr-none px-4 py-2.5 shadow-sm max-w-[85%] ml-auto animate-fade-up delay-700" style={{ animationFillMode: "both" }}>
          <p className="text-stone-800 text-sm">¡Hola! Con gusto te atendemos 🌳☕</p>
          <p className="text-[10px] text-stone-500 text-right mt-1">✓✓</p>
        </div>
      </div>

      {/* Botón de WhatsApp */}
      <a
        href="https://wa.me/573144264715?text=Hola%21%20Me%20interesa%20el%20Caf%C3%A9%20del%20Roble%20%F0%9F%8C%B3"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center gap-2.5 bg-[#25D366] text-white font-semibold py-4 hover:bg-[#22c55e] transition-colors text-sm"
      >
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
        Abrir WhatsApp · 314 426 4715
      </a>
    </div>
  );
}
