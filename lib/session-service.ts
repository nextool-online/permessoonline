import { supabaseServer } from "./supabase/server";

import type { Session, SessionRow } from "@/session";

function mapSessionRowToSession(row: SessionRow): Session {
  return {
    id: row.id,
    status: row.status,
    email: row.email ?? undefined,
    answers: row.answers,
    caseId: row.case_id ?? undefined,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
    stripeCheckoutId: row.stripe_checkout_id ?? undefined,
    stripePaymentIntentId:
      row.stripe_payment_intent_id ?? undefined,
    paidAt: row.paid_at ?? undefined,
  };
}

function mapSessionToSessionRow(session: Session): SessionRow {
  return {
    id: session.id,
    status: session.status,
    email: session.email ?? null,
    answers: session.answers,
    case_id: session.caseId ?? null,
    created_at: session.createdAt,
    updated_at: session.updatedAt,
    stripe_checkout_id:
      session.stripeCheckoutId ?? null,
    stripe_payment_intent_id:
      session.stripePaymentIntentId ?? null,
    paid_at: session.paidAt ?? null,
  };
}

export async function createSession(session: Session) {
  const { error } = await supabaseServer
    .from("sessions")
    .insert(mapSessionToSessionRow(session))

  if (error) {
    throw error;
  }
}

export async function updateSession(session: Session) {
  const row = mapSessionToSessionRow(session);
  const { data, error } = await supabaseServer
    .from("sessions")
    .update({
    status: row.status,
    email: row.email,
    answers: row.answers,
    case_id: row.case_id,
    updated_at: row.updated_at,
    stripe_checkout_id: row.stripe_checkout_id,
    stripe_payment_intent_id: row.stripe_payment_intent_id,
    paid_at: row.paid_at,
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

export async function findSessionById(
  id: string
): Promise<Session> {
  const { data, error } = await supabaseServer
    .from("sessions")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    throw error;
  }

  return mapSessionRowToSession(data as SessionRow);
}

export async function findSessionByEmail(
  email: string
): Promise<Session[]> {
  const { data, error } = await supabaseServer
    .from("sessions")
    .select("*")
    .eq("email", email);

  if (error) {
    throw error;
  }

  return (data as SessionRow[]).map(mapSessionRowToSession);
}