import type { Metadata } from "next";
import { AboutHero } from "@/components/about/about-hero";
import { AboutStory } from "@/components/about/about-story";
import { AboutFeatures } from "@/components/about/about-features";
import { AboutPricing } from "@/components/about/about-pricing";
import { AboutCTA } from "@/components/about/about-cta";

export const metadata: Metadata = {
  title: "Sobre Nosotros — Café del Roble",
  description:
    "Conoce la historia de Café del Roble, cultivado en la Vereda El Roble, Toro Valle, por Hernán y Leidy. Café 100% colombiano a 1600 metros de altura.",
};

export default function AboutPage() {
  return (
    <div className="overflow-hidden">
      <AboutHero />
      <AboutStory />
      <AboutFeatures />
      <AboutPricing />
      <AboutCTA />
    </div>
  );
}
