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