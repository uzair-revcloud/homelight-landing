import { useEffect, useRef } from "react";

export function useIdentityEnrichment({ pageData, setPageData, setDefaultEventProperties }) {
    const hasCalledApiRef = useRef(false);

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

        // Construct queryParams from available data
        const queryParams = new URLSearchParams();
        if (name) queryParams.set("name", name);
        if (email) queryParams.set("email", email);
        if (phone) queryParams.set("phone", phone);
        if (address) queryParams.set("address", address);

        const apiUrl = `https://api.palisade.ai/checkout/v3/search/partial-match?${queryParams.toString()}`;

        const fetchIdentityData = async () => {
            try {
                const response = await fetch(apiUrl);
                const data = await response.json();
                const identityResp = data.data?.[0];


                setPageData((prev) => {
                    const next = { ...prev };
                    next.identity_api_source =
                        data?.data?.[0]?._index === "data_axle"
                            ? "address_dataaxle"
                            : "address_internal";

                    // Set identity API response
                    next.identity_api_res = identityResp;

                    // Fill missing fields from API response
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
                        if (!next.prepop_address && apiSource.address) {
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
                    return next;
                });

            } catch (error) {
                if (cancelled) return;

                setPageData((prev) => {
                    const next = { ...prev };
                    next.identity_api_error = error.message;
                    setDefaultEventProperties(next);
                    return next;
                });

                console.error("There was an error fetching data:", error);
            }
        };

        fetchIdentityData();

        return () => {
            cancelled = true;
        };
    }, [pageData, setPageData, setDefaultEventProperties]);
}

