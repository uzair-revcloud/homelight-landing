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
  data.prepop_phone = getQueryParam(params, "phone");
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
  data.quiz_firstname = "";
  data.quiz_lastname = "";

  return data;
}


