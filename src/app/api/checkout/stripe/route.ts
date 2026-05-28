import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { prisma } from "@/lib/prisma";
import { generateOrderNumber } from "@/lib/utils";
import type { CartItem } from "@/types";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { items, shipping, total } = body as {
      items: CartItem[];
      shipping: {
        firstName: string;
        lastName: string;
        email: string;
        phone: string;
        address1: string;
        city: string;
        state: string;
        zipCode: string;
        country: string;
      };
      total: number;
    };

    if (!items?.length) {
      return NextResponse.json({ error: "Carrito vacío" }, { status: 400 });
    }

    const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";

    const lineItems = items.map((item) => ({
      price_data: {
        currency: "cop",
        product_data: {
          name: item.name,
          images: item.image ? [item.image] : [],
        },
        unit_amount: Math.round(item.price * 100),
      },
      quantity: item.quantity,
    }));

    const orderNumber = generateOrderNumber();

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: `${appUrl}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${appUrl}/checkout/cancelado`,
      customer_email: shipping.email,
      metadata: {
        orderNumber,
        customerName: `${shipping.firstName} ${shipping.lastName}`,
        phone: shipping.phone,
        address: `${shipping.address1}, ${shipping.city}, ${shipping.state}`,
      },
    });

    return NextResponse.json({ url: session.url, sessionId: session.id });
  } catch (error) {
    console.error("Stripe checkout error:", error);
    return NextResponse.json(
      { error: "Error al procesar el pago" },
      { status: 500 }
    );
  }
}
