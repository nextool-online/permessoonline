export type AlertLevel = "info" | "warning" | "error";

export type Alert = {
  id: string;
  title: string;
  description: string;
  level: AlertLevel;
};