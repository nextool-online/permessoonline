"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import {
  getSessionStore,
  updateSessionStore,
} from "@/session";

export default function AssistantPage() {
  const router = useRouter();

  useEffect(() => {
    const session = getSessionStore();

    if (!session) {
      router.replace("/");
    }
  }, [router]);

  function handleContinue() {
    const session = getSessionStore();

    if (!session) {
      router.replace("/");
      return;
    }

    session.status = "questions_completed";

    updateSessionStore(session);

    router.push("/email");
  }

  return (
    <main>
      <h1>Assistente</h1>

      <p>Esta será a primeira etapa do assistente.</p>

      <button onClick={handleContinue}>
        Continuar
      </button>
    </main>
  );
}