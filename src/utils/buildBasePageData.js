import { platform } from "platform";
import { getQueryParam } from "./getQueryParam";

function safeWindow() {
  return typeof window !== "undefined" ? window : undefined;
}

function safeNavigator() {
  return typeof navigator !== "undefined" ? navigator : undefined;
}

export function buildBasePageData(params) {
  const w = safeWindow();
  const n = safeNavigator();

  const data = {};

  // ---------- Page metadata ----------
  data.title = typeof document !== "undefined" ? document.title : "";
  data.domain = w?.location?.origin || "";
  data.url = w?.location?.href || "";
  data.path = w?.location?.pathname || "";
  data.url_without_param = (w?.location?.origin || "") + (w?.location?.pathname || "");
  data.userAgent = n?.userAgent || "";
  data.locale = n?.language || "";
  data.address_chosen = "no";

  // OS (platform.js)
  if (w?.platform) {
    data.os = {
      name: platform.os?.family || "",
      version: platform.os?.version || "",
    };
  }

  // ---------- User / IDs ----------
  const userId = getQueryParam(params, "uid");
  if (userId) data.userId = userId;

  // ---------- UTM params ----------
  data.utmSource = getQueryParam(params, "utm_source");
  data.utmCampaign = getQueryParam(params, "utm_campaign");
  data.utmMedium = "affiliate";
  data.utmTerm = getQueryParam(params, "utm_term");
  data.utmContent = getQueryParam(params, "utm_content");

  // ---------- Attribution ----------
  data.tuneId = getQueryParam(params, "txnid");
  data.fbclid = getQueryParam(params, "fbclid");
  data.gclid = getQueryParam(params, "gclid");

  // ---------- Prepop fields ----------
  data.prepop_name = getQueryParam(params, "name");
  data.prepop_fname = getQueryParam(params, "fname");
  data.prepop_lname = getQueryParam(params, "lname");
  data.prepop_email = getQueryParam(params, "email");

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

  data.prepop_phone = normalizePhoneNumber(getQueryParam(params, "phone"));

  data.prepop_street = getQueryParam(params, "street");
  data.prepop_city = getQueryParam(params, "city");
  data.prepop_state = getQueryParam(params, "state");
  data.prepop_zip = getQueryParam(params, "zip");
  data.prepop_address = getQueryParam(params, "address");

  // ---------- Quiz placeholders ----------
  data.quiz_address = "";
  data.quiz_name = "";
  data.quiz_email = "";
  data.quiz_phone = "";

  return data;
}


