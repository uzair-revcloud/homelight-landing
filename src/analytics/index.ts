import { AnalyticsBrowser } from "@segment/analytics-next";

export const analytics = AnalyticsBrowser.load({
  writeKey: import.meta.env.VITE_SEGMENT_WRITE_KEY,
});

// Export quiz tracking functions
export {
  trackQuizStart,
  trackPartialQuizSubmit,
  trackQuizInteraction,
} from "./quiz";
