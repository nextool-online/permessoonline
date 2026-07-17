import { supabaseServer } from "./supabase/server";

import type { Session } from "@/session";

export async function createSession(session: Session) {
  const { error } = await supabaseServer
    .from("sessions")
    .insert({
      id: session.id,
      status: session.status,
      email: session.email ?? null,
      answers: session.answers,
      case_id: session.caseId ?? null,
      created_at: session.createdAt,
      updated_at: session.updatedAt,
    });

  if (error) {
    throw error;
  }
}

export async function updateSession(session: Session) {
  const { data, error } = await supabaseServer
    .from("sessions")
    .update({
      status: session.status,
      email: session.email ?? null,
      answers: session.answers,
      case_id: session.caseId ?? null,
      updated_at: session.updatedAt,
    })
    .eq("id", session.id)
    .select();

  console.log("UPDATE RESULT:", data);

  if (error) {
    throw error;
  }

  if (!data || data.length === 0) {
    throw new Error("Nenhuma Session foi atualizada.");
  }
}

export async function findSessionById(id: string) {
  const { data, error } = await supabaseServer
    .from("sessions")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    throw error;
  }

  return data;
}

export async function findSessionByEmail(email: string) {
  const { data, error } = await supabaseServer
    .from("sessions")
    .select("*")
    .eq("email", email);

  if (error) {
    throw error;
  }

  return data;
}