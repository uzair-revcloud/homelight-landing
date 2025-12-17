import { useEffect } from "react";

export function useAsyncEnrichments({ setPageData, setDefaultEventProperties }) {
  useEffect(() => {
    let cancelled = false;

    // Anonymous ID (Segment)
    if (window?.analytics) {
      window.analytics.ready(() => {
        if (cancelled) return;
        setPageData((prev) => {
          const next = {
            ...prev,
            anonymousID: window.analytics.user().anonymousId(),
          };
          setDefaultEventProperties(next);
          return next;
        });
      });
    }

    // IP Address
    fetch("https://api.ipify.org?format=json")
      .then((res) => res.json())
      .then((res) => {
        if (cancelled) return;
        setPageData((prev) => {
          const next = { ...prev, ip: res.ip };
          setDefaultEventProperties(next);
          return next;
        });
      })
      .catch(() => {});

    return () => {
      cancelled = true;
    };
  }, [setPageData, setDefaultEventProperties]);
}


