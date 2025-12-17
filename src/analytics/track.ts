import { analytics } from "./";

let defaultEventProperties: Record<string, any> = {};

export function setDefaultEventProperties(properties: Record<string, any>) {
  defaultEventProperties = { ...properties };
}

export function trackEvent<T extends Record<string, any>>(
  event: string,
  properties: T
) {
  if (!analytics) return;

  analytics.track(event, {
    ...defaultEventProperties,
    ...properties,
    app: "web",
    timestamp: new Date().toISOString(),
  });
}

export function trackPageView(
  pageName: string,
  properties?: Record<string, any>
) {
  if (!analytics) return;

  analytics.page(pageName, {
    ...defaultEventProperties,
    ...properties,
    app: "web",
    timestamp: new Date().toISOString(),
  });
}
