import { NextResponse } from "next/server";

import { createCheckoutSession } from "@/lib/stripe/checkout-service";

import type { Session } from "@/session";

export async function POST(request: Request) {
  try {
    const session = (await request.json()) as Session;

    const checkoutSession = await createCheckoutSession(session);

    return NextResponse.json({
      success: true,
      url: checkoutSession.url,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Erro ao criar Checkout.",
      },
      {
        status: 500,
      }
    );
  }
}