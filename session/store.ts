import { createSession } from "./model";
import type { Session } from "./types";

const STORAGE_KEY = "permessoonline:session";

export function createSessionStore(): Session {
  const session = createSession();

  sessionStorage.setItem(STORAGE_KEY, JSON.stringify(session));

  return session;
}

export function getSessionStore(): Session | null {
  const data = sessionStorage.getItem(STORAGE_KEY);

  if (!data) {
    return null;
  }

  return JSON.parse(data) as Session;
}

export function clearSessionStore() {
  sessionStorage.removeItem(STORAGE_KEY);
}

export function updateSessionStore(session: Session): Session {
  session.updatedAt = new Date().toISOString();

  sessionStorage.setItem(STORAGE_KEY, JSON.stringify(session));

  return session;
}