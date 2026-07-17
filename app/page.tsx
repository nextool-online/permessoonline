"use client";

import { useRouter } from "next/navigation";
import { createSessionStore } from "@/session";

export default function HomePage() {
  const router = useRouter();

  function handleStart() {
  createSessionStore();

  router.push("/assistant");
   }

  return (
    <main>
      <h1>PermessoOnline</h1>

      <p>
        Comece sua vida na Itália do jeito certo.
      </p>

      <p>
        Receba tudo o que precisa para solicitar seu Permesso di Soggiorno,
        organizado e personalizado em menos de 5 minutos.
      </p>

      <button onClick={handleStart}>
        Começar agora
      </button>
    </main>
  );
}