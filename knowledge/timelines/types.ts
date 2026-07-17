export type TimelineStep = {
  id: string;
  title: string;
  description?: string;
  order: number;
};

export type Timeline = {
  id: string;
  name: string;
 steps: TimelineStep[];
};