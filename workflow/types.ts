import type { Session } from "@/session";

export type WorkflowStep =
  | "landing"
  | "assistant"
  | "email"
  | "checkout"
  | "thankyou"
  | "download";

export type WorkflowContext = {
  session: Session;
  currentStep: WorkflowStep;
};