import { config } from "dotenv";
config({ path: ".env.local" });
config({ path: ".env" });

import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import bcrypt from "bcryptjs";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("🌱 Iniciando seed de base de datos...");

  // Admin user
  const hashedPassword = await bcrypt.hash("admin123456", 12);
  const admin = await prisma.user.upsert({
    where: { email: "admin@cafedelroble.co" },
    update: {},
    create: {
      name: "Administrador",
      email: "admin@cafedelroble.co",
      password: hashedPassword,
      role: "ADMIN",
    },
  });
  console.log("✅ Admin creado:", admin.email);

  // Categories
  const categories = await Promise.all([
    prisma.category.upsert({
      where: { slug: "cafe-molido" },
      update: {},
      create: {
        name: "Café Molido",
        slug: "cafe-molido",
        description: "Café ya molido, listo para preparar en tu método favorito",
        sortOrder: 1,
      },
    }),
    prisma.category.upsert({
      where: { slug: "cafe-en-grano" },
      update: {},
      create: {
        name: "Café en Grano",
        slug: "cafe-en-grano",
        description: "Granos enteros para moler en casa y disfrutar la máxima frescura",
        sortOrder: 2,
      },
    }),
    prisma.category.upsert({
      where: { slug: "cafe-instantaneo" },
      update: {},
      create: {
        name: "Café Instantáneo",
        slug: "cafe-instantaneo",
        description: "Café soluble de alta calidad, listo en segundos",
        sortOrder: 3,
      },
    }),
    prisma.category.upsert({
      where: { slug: "accesorios" },
      update: {},
      create: {
        name: "Accesorios",
        slug: "accesorios",
        description: "Equipos y accesorios para preparar el café perfecto",
        sortOrder: 4,
      },
    }),
  ]);
  console.log("✅ Categorías creadas:", categories.map((c: { name: string }) => c.name).join(", "));

  // Products
  const products = [
    {
      name: "Café Supremo Huila 250g",
      slug: "cafe-supremo-huila-250g",
      description: "Nuestro café insignia del Huila, con notas de caramelo, fruta roja y chocolate oscuro. Cosecha de finca única, tueste medio.",
      price: 32000,
      comparePrice: 38000,
      stock: 50,
      sku: "CSH-250",
      categorySlug: "cafe-molido",
      isFeatured: true,
      isNew: false,
    },
    {
      name: "Café Nariño Premium en Grano 500g",
      slug: "cafe-narino-premium-grano-500g",
      description: "Granos selectos de las alturas de Nariño. Perfil floral con acidez brillante y final largo. Ideal para espresso y filtrado.",
      price: 58000,
      comparePrice: 68000,
      stock: 30,
      sku: "CNP-500",
      categorySlug: "cafe-en-grano",
      isFeatured: true,
      isNew: false,
    },
    {
      name: "Café Tolima Single Origin 250g",
      slug: "cafe-tolima-single-origin-250g",
      description: "Origen único de la finca Villa Esperanza, Tolima. Proceso natural con notas de mora, panela y nuez. Tueste claro.",
      price: 45000,
      stock: 20,
      sku: "CTS-250",
      categorySlug: "cafe-molido",
      isFeatured: false,
      isNew: true,
    },
    {
      name: "Café Instantáneo Premium 200g",
      slug: "cafe-instantaneo-premium-200g",
      description: "Café soluble elaborado con granos de especialidad. Sin comprometer el sabor, máxima comodidad.",
      price: 22000,
      comparePrice: 28000,
      stock: 100,
      sku: "CIP-200",
      categorySlug: "cafe-instantaneo",
      isFeatured: true,
      isNew: false,
    },
    {
      name: "Café Cauca Orgánico 250g",
      slug: "cafe-cauca-organico-250g",
      description: "Certificado orgánico del Cauca. Cultivado sin pesticidas, con prácticas sostenibles. Perfil suave y equilibrado.",
      price: 36000,
      stock: 25,
      sku: "CCO-250",
      categorySlug: "cafe-molido",
      isFeatured: false,
      isNew: true,
    },
    {
      name: "Set de Degustación 4 Variedades",
      slug: "set-degustacion-4-variedades",
      description: "Descubre 4 de nuestros mejores cafés en tamaños de muestra. Perfecto para conocer tu favorito.",
      price: 65000,
      comparePrice: 80000,
      stock: 15,
      sku: "SD-4V",
      categorySlug: "cafe-molido",
      isFeatured: true,
      isNew: false,
    },
  ];

  for (const productData of products) {
    const category = categories.find((c: { slug: string }) => c.slug === productData.categorySlug);
    if (!category) continue;

    await prisma.product.upsert({
      where: { slug: productData.slug },
      update: {},
      create: {
        name: productData.name,
        slug: productData.slug,
        description: productData.description,
        price: productData.price,
        comparePrice: productData.comparePrice ?? null,
        stock: productData.stock,
        sku: productData.sku,
        categoryId: category.id,
        isFeatured: productData.isFeatured,
        isNew: productData.isNew,
        isActive: true,
      },
    });
  }
  console.log("✅ Productos creados:", products.length);

  // Banners
  await prisma.banner.upsert({
    where: { id: "banner-hero-1" },
    update: {},
    create: {
      id: "banner-hero-1",
      title: "Café de Especialidad",
      subtitle: "Desde las montañas colombianas",
      description: "Descubre nuestros granos seleccionados",
      image: "https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=1600",
      link: "/productos",
      buttonText: "Ver productos",
      isActive: true,
      sortOrder: 1,
    },
  });
  console.log("✅ Banners creados");

  console.log("🎉 Seed completado exitosamente!");
}

main()
  .catch((e) => {
    console.error("❌ Error en seed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
