import { useEffect, useState } from "react";
import { platform } from "platform";

export function usePageData(params) {
  const [pageData, setPageData] = useState({});

  useEffect(() => {
    const data = {};

    const getParam = (key) => params?.get(key) || "";

    // ---------- Page metadata ----------
    data.title = document.title;
    data.domain = window.location.origin;
    data.url = window.location.href;
    data.path = window.location.pathname;
    data.url_without_param = window.location.origin + window.location.pathname;
    data.userAgent = navigator.userAgent;
    data.locale = navigator.language;

    // OS (platform.js)
    if (window.platform) {
      data.os = {
        name: platform.os?.family || "",
        version: platform.os?.version || "",
      };
    }

    // ---------- User / IDs ----------
    const userId = getParam("uid");
    if (userId) {
      data.userId = userId;
    }

    // ---------- UTM params ----------
    data.utmSource = getParam("utm_source");
    data.utmCampaign = getParam("utm_campaign");
    data.utmMedium = "affiliate";
    data.utmTerm = getParam("utm_term");
    data.utmContent = getParam("utm_content");

    // ---------- Attribution ----------
    data.tuneId = getParam("txnid");
    data.fbclid = getParam("fbclid");
    data.gclid = getParam("gclid");

    // ---------- Prepop fields ----------
    data.prepop_name = getParam("name");
    data.prepop_fname = getParam("fname");
    data.prepop_lname = getParam("lname");
    data.prepop_email = getParam("email");
    data.prepop_phone = getParam("phone");
    data.prepop_street = getParam("street");
    data.prepop_city = getParam("city");
    data.prepop_state = getParam("state");
    data.prepop_zip = getParam("zip");
    data.prepop_address = getParam("address");

    // ---------- Quiz placeholders ----------
    data.quiz_address = "";
    data.quiz_name = "";
    data.quiz_email = "";
    data.quiz_phone = "";
    data.quiz_firstname = "";
    data.quiz_lastname = "";

    // ---------- Derived names ----------
    try {
      const fullName = getParam("name");
      data.prepop_firstname = fullName.split(" ")[0] || "";
      data.prepop_lastname = fullName.split(" ")[1] || "";
    } catch {
      data.prepop_firstname = "";
      data.prepop_lastname = "";
    }

    // ---------- Static values ----------
    data.event = "page_view";
    data.brand = "try.simplesalecashoffer.com";

    setPageData(data);

    // ---------- Async values ----------
    // Anonymous ID
    if (window.analytics) {
      window.analytics.ready(() => {
        setPageData((prev) => ({
          ...prev,
          anonymousID: window.analytics.user().anonymousId(),
        }));
      });
    }

    // IP Address
    fetch("https://api.ipify.org?format=json")
      .then((res) => res.json())
      .then((res) => {
        setPageData((prev) => ({
          ...prev,
          ip: res.ip,
        }));
      })
      .catch(() => {});
  }, [params]);

  return pageData;
}
