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

function extractInvalidatedFields(res) {
  return res &&
    typeof res === "object" &&
    res.data &&
    typeof res.data === "object" &&
    Array.isArray(res.data.invalidFields)
    ? res.data.invalidFields
    : null;
}

function extractValidatedUrl(res) {
  return res &&
    typeof res === "object" &&
    res.data &&
    typeof res.data === "object" &&
    typeof res.data.validatedUrl === "string"
    ? res.data.validatedUrl
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
    // Only call API if enabled via environment variable
    if (import.meta.env.VITE_ENABLE_LANDING_PAGE_API !== "true") return;

    if (!pageViewFired) return;
    if (hasValidatedLandingPageRef.current) return;
    if (!pageData || Object.keys(pageData).length === 0) return;

    hasValidatedLandingPageRef.current = true;
    let cancelled = false;

    validateLandingPage({ url: window.location.href })
      .then((res) => {
        if (cancelled) return;
        if (!res || res.error) return;

        const validatedParams = extractValidatedParams(res);
        const invalidatedFields = extractInvalidatedFields(res);
        const validatedUrl = extractValidatedUrl(res);

        setPageData((prev) => {
          const next = applyValidatedParamsToPageData({ ...prev }, validatedParams);
          // Add invalidated_fields to pageData
          if (invalidatedFields !== null) {
            next.invalid_fields = invalidatedFields;
          }

          // Add validated_url to pageData
          if (validatedUrl !== null) {
            next.validated_url = validatedUrl;
          }

          setDefaultEventProperties(next);
          return next;
        });

        // Update URL with validated_url without reloading
        if (validatedUrl && validatedUrl !== window.location.href) {
          window.history.replaceState({}, "", validatedUrl);
        }
      })
      .catch(() => { });

    return () => {
      cancelled = true;
    };
  }, [pageViewFired, pageData, setPageData, setDefaultEventProperties]);
}


