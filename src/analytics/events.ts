export const EVENTS = {
  PAGE_VIEW: "page_view",
  QUIZ_START: "quiz_start",
  PARTIAL_QUIZ_SUBMIT: "partial_quiz_submit",
} as const;

export type UIInteractionEvent = {
  action: "click" | "hover" | "submit" | "focus" | "typing";
  element: "button" | "link" | "input";
  name: string;
  location?: string;
};
