export type QuestionOption = {
  id: string;
  label: string;
};

export type Question = {
  id: string;
  title: string;
  description?: string;
  options: QuestionOption[];
};