export function applyValidatedParamsToPageData(prev, validatedParams) {
    if (!prev || typeof prev !== "object") return prev;
    if (!validatedParams || typeof validatedParams !== "object") return prev;

    const next = { ...prev };

    // Map API validated params -> our standard pageData keys
    next.prepop_fname = validatedParams.fname || "";
    next.prepop_lname = validatedParams.lname || "";
    next.prepop_name = validatedParams.name || "";
    next.prepop_email = validatedParams.email || "";
    next.prepop_phone = validatedParams.phone || "";
    next.prepop_street = validatedParams.street || "";
    next.prepop_city = validatedParams.city || "";
    next.prepop_state = validatedParams.state || "";
    next.prepop_zip = validatedParams.zip || "";
    next.prepop_address = validatedParams.address || "";

    // Common tracking ids
    next.utmSource = validatedParams.utm_source || "";
    next.utmCampaign = validatedParams.utm_campaign || "";
    next.utmTerm = validatedParams.utm_term || "";
    next.utmContent = validatedParams.utm_content || "";
    next.tuneId = validatedParams.txnid || "";
    next.fbclid = validatedParams.fbclid || "";
    next.gclid = validatedParams.gclid || "";
    next.userId = validatedParams.uid || "";
    next.affid = validatedParams.affid || "";
    next.sessionId = validatedParams.sessionId || "";

    return next;
}


