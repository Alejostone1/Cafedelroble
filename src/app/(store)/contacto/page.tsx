import type { Metadata } from "next";
import { ContactHero } from "@/components/contact/contact-hero";
import { ContactContent } from "@/components/contact/contact-content";

export const metadata: Metadata = {
  title: "Contacto — Café del Roble",
  description:
    "Contáctanos para pedidos, preguntas o sugerencias. Domicilios en Pereira y Dosquebradas. WhatsApp: 314 426 4715.",
};

export default function ContactoPage() {
  return (
    <div className="overflow-hidden">
      <ContactHero />
      <ContactContent />
    </div>
  );
}
