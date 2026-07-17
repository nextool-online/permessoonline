import type { Question } from "./types";

export const questions: Question[] = [
  {
    id: "arrival-country",
    title: "Em que país você está atualmente?",
    options: [],
  },
  {
    id: "permit-type",
    title: "Qual tipo de Permesso di Soggiorno você deseja solicitar?",
    options: [],
  },
];

export type { Question, QuestionOption } from "./types";