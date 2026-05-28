import React from "react";
import Link from "next/link";
import { Coffee, MessageCircle, Mail, Phone, MapPin, Share2, Globe } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-stone-900 text-stone-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-lg bg-amber-600 flex items-center justify-center">
                <Coffee className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-white text-lg">Café del Roble</span>
            </Link>
            <p className="text-sm text-stone-400 leading-relaxed">
              Café de especialidad cultivado con amor en las montañas colombianas. Cada taza cuenta una historia.
            </p>
            <div className="flex gap-3">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-stone-800 flex items-center justify-center hover:bg-amber-600 transition-colors"
                aria-label="Instagram"
              >
                <Share2 className="w-4 h-4" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-stone-800 flex items-center justify-center hover:bg-amber-600 transition-colors"
                aria-label="Facebook"
              >
                <Globe className="w-4 h-4" />
              </a>
              <a
                href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-stone-800 flex items-center justify-center hover:bg-green-600 transition-colors"
                aria-label="WhatsApp"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-white text-sm uppercase tracking-wider">Tienda</h3>
            <ul className="space-y-2.5">
              {[
                { href: "/productos", label: "Todos los productos" },
                { href: "/categorias", label: "Categorías" },
                { href: "/productos?filter=nuevo", label: "Novedades" },
                { href: "/productos?filter=destacado", label: "Destacados" },
                { href: "/productos?filter=oferta", label: "Ofertas" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-stone-400 hover:text-amber-400 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Account */}
          <div className="space-y-4">
            <h3 className="font-semibold text-white text-sm uppercase tracking-wider">Mi Cuenta</h3>
            <ul className="space-y-2.5">
              {[
                { href: "/auth/login", label: "Iniciar sesión" },
                { href: "/auth/registro", label: "Crear cuenta" },
                { href: "/perfil", label: "Mi perfil" },
                { href: "/pedidos", label: "Mis pedidos" },
                { href: "/carrito", label: "Mi carrito" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-stone-400 hover:text-amber-400 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="font-semibold text-white text-sm uppercase tracking-wider">Contacto</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-amber-500 mt-0.5 shrink-0" />
                <span className="text-sm text-stone-400">Bogotá, Colombia</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-amber-500 shrink-0" />
                <a href="tel:+573001234567" className="text-sm text-stone-400 hover:text-amber-400 transition-colors">
                  +57 300 123 4567
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-amber-500 shrink-0" />
                <a href="mailto:hola@cafedelroble.co" className="text-sm text-stone-400 hover:text-amber-400 transition-colors">
                  hola@cafedelroble.co
                </a>
              </li>
              <li className="flex items-center gap-3">
                <MessageCircle className="w-4 h-4 text-green-500 shrink-0" />
                <a
                  href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "573001234567"}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-stone-400 hover:text-green-400 transition-colors"
                >
                  WhatsApp
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-stone-500">
            © {new Date().getFullYear()} Café del Roble. Todos los derechos reservados.
          </p>
          <div className="flex gap-4 text-xs text-stone-500">
            <Link href="/terminos" className="hover:text-stone-300 transition-colors">
              Términos
            </Link>
            <Link href="/privacidad" className="hover:text-stone-300 transition-colors">
              Privacidad
            </Link>
            <Link href="/cookies" className="hover:text-stone-300 transition-colors">
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
