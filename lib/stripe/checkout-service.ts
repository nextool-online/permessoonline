import { stripe } from "./server";
import { stripeConfig } from "./config";

import type { Session } from "@/session";

export async function createCheckoutSession(session: Session) {
  console.log("========== CREATE CHECKOUT ==========");
  console.log("SESSION RECEBIDA:");
  console.log(session);

  const payload = {
    mode: "payment" as const,

    line_items: [
      {
        price: stripeConfig.priceId,
        quantity: 1,
      },
    ],

    success_url: stripeConfig.successUrl,

    cancel_url: stripeConfig.cancelUrl,

    customer_email: session.email,

    metadata: {
      sessionId: session.id,
    },
  };

  console.log("PAYLOAD ENVIADO AO STRIPE:");
  console.log(JSON.stringify(payload, null, 2));

  const checkoutSession =
    await stripe.checkout.sessions.create(payload);

  console.log("CHECKOUT SESSION CRIADA:");
  console.log(checkoutSession.id);

  console.log("METADATA RETORNADA PELO STRIPE:");
  console.log(checkoutSession.metadata);

  console.log("=====================================");

  return checkoutSession;
}