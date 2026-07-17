import { questions } from "./questions";
import { cases } from "./cases";
import { documents } from "./documents";
import { timelines } from "./timelines";
import { alerts } from "./alerts";
import { faqs } from "./faqs";

export const knowledge = {
  questions,
  cases,
  documents,
  timelines,
  alerts,
  faqs,
};

export type Knowledge = typeof knowledge;