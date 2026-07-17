"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import {
  getSessionStore,
  updateSessionStore,
} from "@/session";

export default function EmailPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [isReady, setIsReady] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const session = getSessionStore();

    if (!session || session.status !== "questions_completed") {
      router.replace("/");
      return;
    }

    setEmail(session.email ?? "");
    setIsReady(true);
  }, [router]);

  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    if (isSubmitting) {
      return;
    }

    const normalizedEmail = email.trim().toLowerCase();

    if (!normalizedEmail) {
      return;
    }

    const session = getSessionStore();

    if (!session || session.status !== "questions_completed") {
      router.replace("/");
      return;
    }

    const updatedSession = {
      ...session,
      email: normalizedEmail,
      status: "email_captured" as const,
    };

    setIsSubmitting(true);
    setErrorMessage("");

    try {
      const response = await fetch("/api/session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedSession),
      });

      if (!response.ok) {
        let serverMessage = "Não foi possível salvar seu progresso.";

        try {
          const errorBody = await response.json();

          if (
            typeof errorBody?.message === "string" &&
            errorBody.message
          ) {
            serverMessage = errorBody.message;
          }

          console.error("SESSION CREATE ERROR:", errorBody);
        } catch {
          console.error(
            "SESSION CREATE ERROR: resposta inválida",
            response.status
          );
        }

        setErrorMessage(
          `${serverMessage} Tente novamente.`
        );

        return;
      }

      // A Session local só amadurece depois que o servidor confirma.
      updateSessionStore(updatedSession);

      router.push("/checkout");
    } catch (error) {
      console.error("SESSION NETWORK ERROR:", error);

      setErrorMessage(
        "Não foi possível conectar ao servidor. Tente novamente."
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  if (!isReady) {
    return null;
  }

  return (
    <main>
      <h1>Informe seu e-mail</h1>

      <p>Use o e-mail no qual deseja receber seu Kit.</p>

      <form onSubmit={handleSubmit}>
        <label htmlFor="email">E-mail</label>

        <input
          id="email"
          name="email"
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          autoComplete="email"
          disabled={isSubmitting}
          required
        />

        {errorMessage ? (
          <p role="alert">{errorMessage}</p>
        ) : null}

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Salvando..." : "Salvar e continuar"}
        </button>
      </form>
    </main>
  );
}