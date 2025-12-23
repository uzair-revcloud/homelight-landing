import { trackEvent } from "./track";
import { EVENTS } from "./events";

export interface QuizEventProperties {
  quiz_id?: string;
  question_type?: string;
  option_selected?: string;
  dropdown_context?: string;
  input_value?: string;
  invalid_fields?: string[];
}

/**
 * Track when a user starts a quiz by typing in an input field
 */
export async function trackQuizStart(
  inputValue: string,
  context: string = "address_search",
  properties: Partial<QuizEventProperties> = {}
) {
  console.log("trackQuizStart", inputValue, context, properties)
  const eventProperties = {
    quiz_id: properties.quiz_id || "address_quiz",
    question_type: properties.question_type || "address_input",
    input_value: inputValue,
    dropdown_context: context,
    ...properties,
  };

  await trackEvent(EVENTS.QUIZ_START, eventProperties);
}

/**
 * Track when a user selects an option from dropdown suggestions
 */
export async function trackPartialQuizSubmit(
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
    ...properties,
  };

  await trackEvent(EVENTS.PARTIAL_QUIZ_SUBMIT, eventProperties);
}

/**
 * Generic function to track any quiz-related interaction
 */
export async function trackQuizInteraction(
  eventType: string,
  properties: Partial<QuizEventProperties> = {}
) {
  const eventProperties = {
    quiz_id: properties.quiz_id || "address_quiz",
    ...properties,
  };

  await trackEvent(eventType, eventProperties);
}
