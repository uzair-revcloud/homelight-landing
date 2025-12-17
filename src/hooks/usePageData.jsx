import { useEffect, useState } from "react";
import { setDefaultEventProperties } from "../analytics/track";
import { buildBasePageData } from "../utils/buildBasePageData";
import { useAsyncEnrichments } from "./pageData/useAsyncEnrichments";
import { useValidatedLandingPage } from "./pageData/useValidatedLandingPage";

export function usePageData(params, options = {}) {
  const [pageData, setPageData] = useState({});
  const pageViewFired = Boolean(options?.pageViewFired);

  useEffect(() => {
    const data = buildBasePageData(params);
    setPageData(data);
    setDefaultEventProperties(data);
  }, [params]);

  useAsyncEnrichments({ setPageData, setDefaultEventProperties });

  useValidatedLandingPage({
    pageViewFired,
    pageData,
    setPageData,
    setDefaultEventProperties,
  });

  return pageData;
}
