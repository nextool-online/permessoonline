"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import {
  getSessionStore,
  updateSessionStore,
} from "@/session";

export default function ThankYouPage() {
  const router = useRouter();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const session = getSessionStore();

    if (!session || session.status !== "payment_approved") {
      router.replace("/");
      return;
    }

    setIsReady(true);
  }, [router]);

  function handleDownload() {
    const session = getSessionStore();

    if (!session) {
      router.replace("/");
      return;
    }

    const updatedSession = {
      ...session,
      status: "kit_generated" as const,
    };

    updateSessionStore(updatedSession);

    router.push("/download");
  }

  if (!isReady) {
    return null;
  }

  return (
    <main>
      <h1>Obrigado</h1>

      <p>Seu pagamento foi confirmado.</p>

      <button onClick={handleDownload}>
        Baixar Kit
      </button>
    </main>
  );
}