import { NextResponse } from "next/server";
import type Stripe from "stripe";

import { stripe } from "@/lib/stripe/server";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const signature = request.headers.get("stripe-signature");

  if (!signature) {
    return NextResponse.json(
      {
        success: false,
        message: "Assinatura Stripe ausente.",
      },
      {
        status: 400,
      }
    );
  }

  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!webhookSecret) {
    console.error("STRIPE_WEBHOOK_SECRET não configurado.");

    return NextResponse.json(
      {
        success: false,
        message: "Webhook não configurado.",
      },
      {
        status: 500,
      }
    );
  }

  const body = await request.text();

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      webhookSecret
    );
  } catch (error) {
    console.error("Erro ao validar webhook do Stripe:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Assinatura inválida.",
      },
      {
        status: 400,
      }
    );
  }

  console.log("STRIPE EVENT:", event.type);

if (event.type === "checkout.session.completed") {
  const checkoutSession = event.data.object;

  console.log("CHECKOUT SESSION COMPLETED");

  console.log("ID:");
  console.log(checkoutSession.id);

  console.log("CUSTOMER:");
  console.log(checkoutSession.customer_email);

  console.log("METADATA:");
  console.log(checkoutSession.metadata);

  if (checkoutSession.metadata) {
    console.log("SESSION ID:");
    console.log(checkoutSession.metadata.sessionId);
  } else {
    console.log("SEM METADATA");
  }
}

return NextResponse.json({
  received: true,
});
}