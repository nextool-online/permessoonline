import type { Session } from "@/session";
import { knowledge } from "@/knowledge";

export type DecisionResult = {
  caseId?: string;
};

export function runWorkflow(session: Session): DecisionResult {
  void knowledge;

  return {};
}