import type { MetadataRoute } from "next";
import { prisma } from "@/lib/prisma";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: appUrl, lastModified: new Date(), changeFrequency: "daily", priority: 1 },
    { url: `${appUrl}/productos`, lastModified: new Date(), changeFrequency: "daily", priority: 0.9 },
    { url: `${appUrl}/categorias`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${appUrl}/sobre-nosotros`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
    { url: `${appUrl}/contacto`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
  ];

  let productRoutes: MetadataRoute.Sitemap = [];
  let categoryRoutes: MetadataRoute.Sitemap = [];

  try {
    const [products, categories] = await Promise.all([
      prisma.product.findMany({ where: { isActive: true }, select: { slug: true, updatedAt: true } }),
      prisma.category.findMany({ where: { isActive: true }, select: { slug: true, updatedAt: true } }),
    ]);

    productRoutes = products.map((p: { slug: string; updatedAt: Date }) => ({
      url: `${appUrl}/productos/${p.slug}`,
      lastModified: p.updatedAt,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    }));

    categoryRoutes = categories.map((c: { slug: string; updatedAt: Date }) => ({
      url: `${appUrl}/categorias/${c.slug}`,
      lastModified: c.updatedAt,
      changeFrequency: "weekly" as const,
      priority: 0.7,
    }));
  } catch {
    // Database might not be connected yet
  }

  return [...staticRoutes, ...productRoutes, ...categoryRoutes];
}
