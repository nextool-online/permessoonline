export type SessionStatus =
  | "started"
  | "questions_completed"
  | "email_captured"
  | "checkout_started"
  | "payment_approved"
  | "kit_generated"
  | "downloaded";

export type SessionAnswer = {
  questionId: string;
  value: string;
};

export type Session = {
  id: string;
  status: SessionStatus;
  answers: SessionAnswer[];
  email?: string;
  caseId?: string;
  createdAt: string;
  updatedAt: string;
  stripeCheckoutId?: string;
  stripePaymentIntentId?: string;
  paidAt?: string;
};

/**
 * Representa exatamente uma linha da tabela "sessions" do Supabase.
 * Nunca deve ser utilizada fora da camada de persistência.
 */
export type SessionRow = {
  id: string;
  status: SessionStatus;
  answers: SessionAnswer[];
  email: string | null;
  case_id: string | null;
  created_at: string;
  updated_at: string;
  stripe_checkout_id: string | null;
  stripe_payment_intent_id: string | null;
  paid_at: string | null;
};