"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import {
  getSessionStore,
  updateSessionStore,
} from "@/session";

export default function CheckoutPage() {
  const router = useRouter();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const session = getSessionStore();

    if (!session || session.status !== "email_captured") {
      router.replace("/");
      return;
    }

    setIsReady(true);
  }, [router]);

  async function handlePaymentApproved() {
    const session = getSessionStore();

    if (!session) {
      router.replace("/");
      return;
    }

    const updatedSession = {
      ...session,
      status: "payment_approved" as const,
    };

    updateSessionStore(updatedSession);

    const response = await fetch(`/api/session/${updatedSession.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedSession),
    });

    if (!response.ok) {
      alert("Erro ao atualizar a sessão.");
      return;
    }

    router.push("/thank-you");
  }
  async function handleCheckout() {
  const session = getSessionStore();

  if (!session) {
    router.replace("/");
    return;
  }

  const response = await fetch("/api/checkout", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(session),
  });

  if (!response.ok) {
    alert("Erro ao iniciar o pagamento.");
    return;
  }

  const data = await response.json();

  window.location.href = data.url;
}

  if (!isReady) {
    return null;
  }

  return (
    <main>
      <h1>Checkout</h1>

      <p>A integração com o Stripe será adicionada futuramente.</p>

      <button onClick={handleCheckout}>
       Pagar agora
      </button>
    </main>
  );
}