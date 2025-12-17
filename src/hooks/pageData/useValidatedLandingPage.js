import { useEffect, useRef } from "react";
import { validateLandingPage } from "../../api";
import { applyValidatedParamsToPageData } from "../../utils/applyValidatedParamsToPageData";

function extractValidatedParams(res) {
  return res &&
    typeof res === "object" &&
    res.data &&
    typeof res.data === "object" &&
    res.data.validatedParams &&
    typeof res.data.validatedParams === "object"
    ? res.data.validatedParams
    : null;
}

export function useValidatedLandingPage({
  pageViewFired,
  pageData,
  setPageData,
  setDefaultEventProperties,
}) {
  const hasValidatedLandingPageRef = useRef(false);

  useEffect(() => {
    if (!pageViewFired) return;
    if (hasValidatedLandingPageRef.current) return;
    if (!pageData || Object.keys(pageData).length === 0) return;

    hasValidatedLandingPageRef.current = true;
    let cancelled = false;

    validateLandingPage({ url: window.location.href })
      .then((res) => {
        if (cancelled) return;
        if (!res || res.error) return;

        setPageData((prev) => {
          const validatedParams = extractValidatedParams(res);
          const next = applyValidatedParamsToPageData({ ...prev }, validatedParams);
          setDefaultEventProperties(next);
          return next;
        });
      })
      .catch(() => {});

    return () => {
      cancelled = true;
    };
  }, [pageViewFired, pageData, setPageData, setDefaultEventProperties]);
}


