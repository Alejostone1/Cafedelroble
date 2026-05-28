import { z } from "zod";

export const checkoutSchema = z.object({
  firstName: z.string().min(2, "El nombre es requerido"),
  lastName: z.string().min(2, "El apellido es requerido"),
  email: z.string().email("Email inválido"),
  phone: z.string().min(7, "Teléfono inválido"),
  address1: z.string().min(5, "La dirección es requerida"),
  address2: z.string().optional(),
  city: z.string().min(2, "La ciudad es requerida"),
  state: z.string().min(2, "El departamento es requerido"),
  zipCode: z.string().min(4, "El código postal es requerido"),
  country: z.string().optional(),
  notes: z.string().optional(),
});

export type CheckoutInput = z.infer<typeof checkoutSchema>;
