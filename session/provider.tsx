"use client";

import {
  createContext,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import { createSession } from "./model";
import type { Session } from "./types";

type SessionContextValue = {
  session: Session;
  setSession: React.Dispatch<React.SetStateAction<Session>>;
};

const SessionContext = createContext<SessionContextValue | null>(null);

export function SessionProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [session, setSession] = useState(createSession);

  const value = useMemo(
    () => ({
      session,
      setSession,
    }),
    [session]
  );

  return (
    <SessionContext.Provider value={value}>
      {children}
    </SessionContext.Provider>
  );
}

export function useSession() {
  const context = useContext(SessionContext);

  if (!context) {
    throw new Error("useSession must be used inside SessionProvider");
  }

  return context;
}