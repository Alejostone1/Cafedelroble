import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const q = searchParams.get("q")?.trim();

  if (!q || q.length < 2) {
    return NextResponse.json([]);
  }

  try {
    const productos = await prisma.product.findMany({
      where: {
        isActive: true,
        OR: [
          { name: { contains: q, mode: "insensitive" } },
          { description: { contains: q, mode: "insensitive" } },
          { category: { name: { contains: q, mode: "insensitive" } } },
        ],
      },
      select: {
        id: true,
        name: true,
        slug: true,
        price: true,
        images: { select: { url: true }, take: 1, orderBy: { sortOrder: "asc" } },
        category: { select: { name: true } },
      },
      take: 5,
    });

    return NextResponse.json(
      productos.map((p) => ({
        id: p.id,
        name: p.name,
        slug: p.slug,
        price: Number(p.price),
        image: p.images[0]?.url ?? null,
        category: p.category.name,
      }))
    );
  } catch {
    return NextResponse.json([]);
  }
}
