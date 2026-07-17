import type { Session } from "./types";

export function createSession(): Session {
  const now = new Date().toISOString();

  return {
    id: crypto.randomUUID(),
    status: "started",
    answers: [],
    createdAt: now,
    updatedAt: now,
  };
}