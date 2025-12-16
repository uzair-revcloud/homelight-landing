import { analytics } from "./";

export function trackEvent<T extends Record<string, any>>(
  event: string,
  properties: T
) {
  if (!analytics) return;

  analytics.track(event, {
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
    ...properties,
    app: "web",
    timestamp: new Date().toISOString(),
  });
}
