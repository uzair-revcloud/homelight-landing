import { useEffect, useRef, useCallback } from "react";

// Reusable function to call identity API
export async function callIdentityAPI({
    getPageData,
    setPageData,
    setDefaultEventProperties,
    overrideAddress = null
}) {
    // Get current pageData from the getter function
    const currentPageData = getPageData ? getPageData() : {};

    if (!currentPageData || Object.keys(currentPageData).length === 0) return;

    // Use override address if provided, otherwise use existing address
    const name = currentPageData?.prepop_name || "";
    const email = currentPageData?.prepop_email || "";
    const phone = currentPageData?.prepop_phone || "";
    const address = overrideAddress !== null ? overrideAddress : (currentPageData?.prepop_address || "");

    // If all fields are absent, don't call API
    if (!name && !email && !phone && !address) {
        return;
    }

    // Construct queryParams from available data
    const queryParams = new URLSearchParams();
    if (name) queryParams.set("name", name);
    if (email) queryParams.set("email", email);
    if (phone) queryParams.set("phone", phone);
    if (address) queryParams.set("address", address);

    const apiUrl = `https://api.palisade.ai/checkout/v3/search/partial-match?${queryParams.toString()}`;

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        const identityResp = data.data?.[0];
        let resposneToReturn = null;

        setPageData((prev) => {
            const next = { ...prev };

            // If override address was provided, set it with final precedence
            if (overrideAddress !== null) {
                next.quiz_address = overrideAddress;
            }

            next.identity_api_source =
                data?.data?.[0]?._index === "data_axle"
                    ? "address_dataaxle"
                    : "address_internal";

            // Set identity API response
            next.identity_api_res = identityResp;

            // Fill missing fields from API response (but don't override the address if it was provided)
            const apiSource = data.data?.[0]?._source;
            if (apiSource) {
                if (!next.prepop_name && apiSource.name) {
                    next.quiz_name = apiSource.name;
                }
                if (!next.prepop_email && apiSource.email) {
                    next.quiz_email = apiSource.email;
                }
                if (!next.prepop_phone && apiSource.phone) {
                    next.quiz_phone = apiSource.phone;
                }
                // Only set address from API if no override address was provided
                if (overrideAddress === null && !next.prepop_address && apiSource.address) {
                    next.quiz_address = apiSource.address;
                }
            }

            // Set identity checkout category
            next.identity_checkout_category =
                identityResp?._source?.name &&
                    identityResp?._source?.email &&
                    identityResp?._source?.phone
                    ? "all_data_present"
                    : "partial_data_present";

            setDefaultEventProperties(next);
            resposneToReturn = next;
            return next;
        });

        return resposneToReturn;

    } catch (error) {
        setPageData((prev) => {
            const next = { ...prev };
            next.identity_api_error = error.message;
            setDefaultEventProperties(next);
            return next;
        });

        console.error("There was an error fetching data:", error);
    }
}

export function useIdentityEnrichment({ pageData, setPageData, setDefaultEventProperties }) {
    const hasCalledApiRef = useRef(false);

    // Create a callback function that can be called manually
    // Use a ref to always get the latest pageData
    const pageDataRef = useRef(pageData);
    useEffect(() => {
        pageDataRef.current = pageData;
    }, [pageData]);

    const callIdentityAPIWithAddress = useCallback((address) => {
        return callIdentityAPI({
            getPageData: () => pageDataRef.current,
            setPageData,
            setDefaultEventProperties,
            overrideAddress: address
        });
    }, [setPageData, setDefaultEventProperties]);

    useEffect(() => {
        // Only call once when pageData is available
        if (hasCalledApiRef.current) return;
        if (!pageData || Object.keys(pageData).length === 0) return;

        // Check if any of name, email, phone, or address is missing
        const name = pageData?.prepop_name || "";
        const email = pageData?.prepop_email || "";
        const phone = pageData?.prepop_phone || "";
        const address = pageData?.prepop_address || "";

        // If all fields are present, no need to call API
        if (name && email && phone && address) {
            hasCalledApiRef.current = true;
            return;
        }

        // If all fields are absent, don't call API
        if (!name && !email && !phone && !address) {
            hasCalledApiRef.current = true;
            return;
        }

        // If at least one field is present but some are missing, call the API
        hasCalledApiRef.current = true;
        let cancelled = false;

        callIdentityAPI({
            getPageData: () => pageData,
            setPageData,
            setDefaultEventProperties,
            overrideAddress: null
        })
            .then(() => {
                if (cancelled) return;
            })
            .catch(() => {
                if (cancelled) return;
            });

        return () => {
            cancelled = true;
        };
    }, [pageData, setPageData, setDefaultEventProperties]);

    return { callIdentityAPIWithAddress };
}

