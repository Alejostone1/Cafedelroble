import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { prisma } from "@/lib/prisma";
import { generateOrderNumber } from "@/lib/utils";
import type Stripe from "stripe";

export async function POST(req: Request) {
  const body = await req.text();
  const signature = req.headers.get("stripe-signature");

  if (!signature) {
    return NextResponse.json({ error: "No signature" }, { status: 400 });
  }

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (error) {
    console.error("Webhook signature verification failed:", error);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    await handleCheckoutCompleted(session);
  }

  return NextResponse.json({ received: true });
}

async function handleCheckoutCompleted(session: Stripe.Checkout.Session) {
  try {
    const lineItems = await stripe.checkout.sessions.listLineItems(session.id, {
      expand: ["data.price.product"],
    });

    const orderNumber = session.metadata?.orderNumber ?? generateOrderNumber();
    const subtotal = (session.amount_subtotal ?? 0) / 100;
    const total = (session.amount_total ?? 0) / 100;

    await prisma.order.create({
      data: {
        orderNumber,
        status: "CONFIRMED",
        paymentStatus: "PAID",
        paymentMethod: "STRIPE",
        subtotal,
        total,
        guestEmail: session.customer_email ?? undefined,
        guestName: session.metadata?.customerName ?? undefined,
        guestPhone: session.metadata?.phone ?? undefined,
        stripeSessionId: session.id,
        stripePaymentId: session.payment_intent as string,
        items: {
          create: lineItems.data.map((item) => ({
            productName: item.description ?? "Producto",
            quantity: item.quantity ?? 1,
            price: (item.price?.unit_amount ?? 0) / 100,
            total: (item.amount_total ?? 0) / 100,
            productId: "placeholder",
          })),
        },
        payment: {
          create: {
            amount: total,
            currency: "COP",
            status: "PAID",
            method: "STRIPE",
            stripeSessionId: session.id,
            stripePaymentId: session.payment_intent as string,
          },
        },
      },
    });
  } catch (error) {
    console.error("Error creating order:", error);
  }
}
