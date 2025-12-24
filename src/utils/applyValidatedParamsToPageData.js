// Normalize phone number: if more than 10 digits, pick last 10. If has country code (+X), keep country code + last 10 digits
function normalizePhoneNumber(rawPhone) {
    if (!rawPhone) return "";
    
    // Remove all non-digit characters except the leading +
    const cleaned = rawPhone.replace(/[^\d+]/g, "");
    
    if (cleaned.startsWith("+")) {
        // Has country code: extract country code and last 10 digits of the remaining number
        // Match country code (1-4 digits after +)
        const countryCodeMatch = cleaned.match(/^\+(\d{1,4})/);
        if (countryCodeMatch) {
            const countryCode = countryCodeMatch[1];
            const digitsAfterCountryCode = cleaned.substring(countryCodeMatch[0].length);
            
            if (digitsAfterCountryCode.length > 10) {
                // Take last 10 digits after country code
                const last10Digits = digitsAfterCountryCode.slice(-10);
                return `+${countryCode}${last10Digits}`;
            } else {
                // 10 or fewer digits, keep as is
                return cleaned;
            }
        } else {
            // Invalid format, just clean it
            return cleaned;
        }
    } else {
        // No country code: if more than 10 digits, take last 10
        const digitsOnly = cleaned.replace(/\D/g, "");
        if (digitsOnly.length > 10) {
            return digitsOnly.slice(-10);
        } else {
            return digitsOnly;
        }
    }
}

export function applyValidatedParamsToPageData(prev, validatedParams) {
    if (!prev || typeof prev !== "object") return prev;
    if (!validatedParams || typeof validatedParams !== "object") return prev;

    const next = { ...prev };

    // Map API validated params -> our standard pageData keys
    next.prepop_fname = validatedParams.fname || "";
    next.prepop_lname = validatedParams.lname || "";
    next.prepop_name = validatedParams.name || "";
    next.prepop_email = validatedParams.email || "";
    next.prepop_phone = normalizePhoneNumber(validatedParams.phone || "");
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


