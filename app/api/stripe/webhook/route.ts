import { NextResponse } from "next/server";
import type Stripe from "stripe";

import { stripe } from "@/lib/stripe/server";
import {
  findSessionById,
  updateSession,
} from "@/lib/session-service";

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
    const checkoutSession = event.data.object as Stripe.Checkout.Session;

    console.log("CHECKOUT SESSION COMPLETED");

    console.log("ID:");
    console.log(checkoutSession.id);

    console.log("CUSTOMER:");
    console.log(checkoutSession.customer_email);

    console.log("METADATA:");
    console.log(checkoutSession.metadata);

    const sessionId = checkoutSession.metadata?.sessionId;

    if (!sessionId) {
      console.error("SESSION ID NÃO ENCONTRADO NO METADATA");

      return NextResponse.json(
        {
          success: false,
          message: "SessionId ausente.",
        },
        {
          status: 400,
        }
      );
    }

    console.log("SESSION ID:");
    console.log(sessionId);

    try {
      const session = await findSessionById(sessionId);

      console.log("SESSION ENCONTRADA:");
      console.log(session);

      
      session.status = "payment_approved";

session.updatedAt = new Date().toISOString();

session.stripeCheckoutId = checkoutSession.id;

session.stripePaymentIntentId =
  typeof checkoutSession.payment_intent === "string"
    ? checkoutSession.payment_intent
    : checkoutSession.payment_intent?.id;

session.paidAt = new Date().toISOString();

await updateSession(session);

      console.log("SESSION ATUALIZADA COM SUCESSO");
    } catch (error) {
      console.error("ERRO AO ATUALIZAR SESSION:", error);

      return NextResponse.json(
        {
          success: false,
          message: "Erro ao atualizar Session.",
        },
        {
          status: 500,
        }
      );
    }
  }

  return NextResponse.json({
    received: true,
  });
}