import { HeroSection } from "@/components/home/hero-section";
import { FeaturedCategories } from "@/components/home/featured-categories";
import { FeaturedProducts } from "@/components/home/featured-products";
import { BenefitsSection } from "@/components/home/benefits-section";
import { TestimonialsSection } from "@/components/home/testimonials-section";
import { CTASection } from "@/components/home/cta-section";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Café del Roble — Café de especialidad colombiano",
  description: "Descubre nuestro café de especialidad cultivado en las montañas colombianas.",
};

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <FeaturedCategories />
      <FeaturedProducts />
      <BenefitsSection />
      <TestimonialsSection />
      <CTASection />
    </>
  );
}
