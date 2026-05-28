import { z } from "zod";

export const productSchema = z.object({
  name: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
  slug: z.string().min(2, "El slug es requerido"),
  description: z.string().optional(),
  price: z.number().positive("El precio debe ser positivo"),
  comparePrice: z.number().positive().optional(),
  costPrice: z.number().positive().optional(),
  stock: z.number().int().min(0, "El stock no puede ser negativo"),
  sku: z.string().optional(),
  categoryId: z.string().min(1, "La categoría es requerida"),
  isActive: z.boolean().default(true),
  isFeatured: z.boolean().default(false),
  isNew: z.boolean().default(false),
});

export const categorySchema = z.object({
  name: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
  slug: z.string().min(2, "El slug es requerido"),
  description: z.string().optional(),
  parentId: z.string().optional(),
  isActive: z.boolean().default(true),
});

export type ProductInput = z.infer<typeof productSchema>;
export type CategoryInput = z.infer<typeof categorySchema>;
