import { trackEvent } from "./track";
import { EVENTS } from "./events";

export interface QuizEventProperties {
  quiz_id?: string;
  question_type?: string;
  option_selected?: string;
  dropdown_context?: string;
  input_value?: string;
  user_agent?: string;
  timestamp?: string;
}

/**
 * Track when a user starts a quiz by typing in an input field
 */
export function trackQuizStart(
  inputValue: string,
  context: string = "address_search",
  properties: Partial<QuizEventProperties> = {}
) {
  const eventProperties = {
    quiz_id: properties.quiz_id || "address_quiz",
    question_type: properties.question_type || "address_input",
    input_value: inputValue,
    dropdown_context: context,
    user_agent: typeof navigator !== "undefined" ? navigator.userAgent : "",
    timestamp: new Date().toISOString(),
    ...properties,
  };

  trackEvent(EVENTS.QUIZ_START, eventProperties);
}

/**
 * Track when a user selects an option from dropdown suggestions
 */
export function trackPartialQuizSubmit(
  selectedOption: string,
  inputValue: string,
  context: string = "address_search",
  properties: Partial<QuizEventProperties> = {}
) {
  const eventProperties = {
    quiz_id: properties.quiz_id || "address_quiz",
    question_type: properties.question_type || "address_selection",
    option_selected: selectedOption,
    input_value: inputValue,
    dropdown_context: context,
    user_agent: typeof navigator !== "undefined" ? navigator.userAgent : "",
    timestamp: new Date().toISOString(),
    ...properties,
  };

  trackEvent(EVENTS.PARTIAL_QUIZ_SUBMIT, eventProperties);
}

/**
 * Generic function to track any quiz-related interaction
 */
export function trackQuizInteraction(
  eventType: string,
  properties: Partial<QuizEventProperties> = {}
) {
  const eventProperties = {
    quiz_id: properties.quiz_id || "address_quiz",
    user_agent: typeof navigator !== "undefined" ? navigator.userAgent : "",
    timestamp: new Date().toISOString(),
    ...properties,
  };

  trackEvent(eventType, eventProperties);
}
