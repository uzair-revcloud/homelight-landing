import React, { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { trackPartialQuizSubmit, trackQuizStart } from "../analytics/quiz";
import { setDefaultEventProperties } from "../analytics/track";
import { trackPageView } from "../analytics/track.js";
import Footer from "../components/layout/Footer";
import Header from "../components/layout/Header";
import ClientStory from "../components/sections/ClientStory";
import ComparisonTable from "../components/sections/ComparisonTable";
import FAQs from "../components/sections/FAQs";
import Features from "../components/sections/Features";
import HeroSection from "../components/sections/Hero";
import PropertySearch from "../components/sections/PropertySearch";
import RecentlySoldCarousel from "../components/sections/RecentlySoldCarousel";
import Steps from "../components/sections/Steps";
import Testimonials from "../components/sections/Testimonials";
import { FAQS_LIST } from "../constants/lists";
import { useAlysonSession } from "../hooks/useAlysonSession.js";
import { useGeolocation } from "../hooks/useGeolocation.js";
import { usePageData } from "../hooks/usePageData.jsx";
import { buildRedirectUrl } from "../utils/buildRedirectUrl";
import { useGeolocationPermission } from "../hooks/useGeoLocationPermission.jsx";

const Landing = () => {
  const [params, _] = useSearchParams();
  const [pageViewFired, setPageViewFired] = useState(false);
  const { pageData, setPageData } = usePageData(params, { pageViewFired });
  const geolocationPermission = useGeolocationPermission();
  const {
    requestLocation,
    address: geolocationAddress,
    status: geolocationStatus,
    coords,
  } = useGeolocation();
  useAlysonSession();
  const pageViewFiredRef = useRef(false);

  const prefillAddress = (() => {
    const clean = (v) => (typeof v === "string" ? v.trim() : "");
    const street = clean(pageData?.prepop_street);
    const city = clean(pageData?.prepop_city);
    const state = clean(pageData?.prepop_state);
    const zip = clean(pageData?.prepop_zip);
    const address = clean(pageData?.prepop_address);

    if (address && (!street || !city || !state || !zip)) return address;

    const parts = [];
    if (street) parts.push(street);

    const localityParts = [];
    if (city) localityParts.push(city);
    if (state) localityParts.push(state);
    const locality = localityParts.join(", ");

    const tail = [locality, zip]
      .filter(Boolean)
      .join(locality && zip ? " " : "");
    if (tail) parts.push(tail);

    return parts.join(parts.length > 1 ? ", " : "");
  })();

  function isValidParam(val) {
    if (!val || typeof val !== "string") return false;
    val = decodeURIComponent(val.trim());

    // Reject placeholders, empty, or HTML-like values
    if (
      val === "" ||
      val.startsWith("<") ||
      val.includes("PLACEHOLDER") ||
      val.includes("placeholder")
    ) {
      return false;
    }

    return true;
  }

  // Request user location as soon as the page loads (only if enabled via environment variable)
  useEffect(() => {
    if (import.meta.env.VITE_ENABLE_GEOLOCATION) {
      requestLocation();
    }
  }, [requestLocation]);

  useEffect(() => {
    // Ensure page view event fires exactly once
    if (pageViewFiredRef.current) return;

    // Wait for geolocation permission to be determined (not "unknown")
    // If geolocation is not enabled, fire immediately
    if (
      import.meta.env.VITE_ENABLE_GEOLOCATION &&
      geolocationPermission === "unknown"
    ) {
      return; // Wait for permission to be determined
    }

    pageViewFiredRef.current = true;

    // Prepare geolocation fields for pageView event
    const geolocationPermissionValue =
      geolocationPermission === "granted"
        ? "allowed"
        : geolocationPermission === "denied"
        ? "user_disabled"
        : geolocationPermission === "prompt"
        ? "prompt"
        : geolocationPermission || "unknown";

    setPageData((prev) => {
      const next = {
        ...prev,
        geolocation_permission: geolocationPermissionValue,
        geolocation_triggered:
          geolocationPermission === "denied"
            ? "no"
            : geolocationStatus !== "idle"
            ? "yes"
            : pageData?.geolocation_triggered || "no",
      };
      return next;
    });

    trackPageView(import.meta.env.VITE_BRAND_NAME || "Trusted Home Offers", {
      title: import.meta.env.VITE_BRAND_NAME || "Trusted Home Offers",
      url: window.location.href,
      entry: true,
      sessionId: window.alysonSessionId,
      quiz_address: geolocationAddress || pageData?.quiz_address || "",
      geolocation_address:
        geolocationAddress || pageData?.geolocation_address || "",
      geolocation_lat:
        coords?.latitude?.toString() || pageData?.geolocation_lat || "",
      geolocation_long:
        coords?.longitude?.toString() || pageData?.geolocation_long || "",
      geolocation_permission: geolocationPermissionValue,
      geolocation_triggered:
        geolocationPermission === "denied"
          ? "no"
          : geolocationStatus !== "idle"
          ? "yes"
          : pageData?.geolocation_triggered || "no",
    }).then(() => {
      setPageViewFired(true);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [geolocationPermission]);

  useEffect(() => {
    if (!import.meta.env.VITE_ENABLE_GEOLOCATION) return;

    // Wait for geolocation permission to be determined before firing quiz events
    if (geolocationPermission === "unknown") {
      return; // Wait for permission to be determined
    }

    if (geolocationStatus === "success" && geolocationAddress && coords) {
      setPageData((prev) => {
        const next = {
          ...prev,

          // ✅ geolocation fields
          quiz_address: geolocationAddress,
          prepop_address: geolocationAddress,
          geolocation_address: geolocationAddress,
          geolocation_lat: coords.latitude?.toString() || "",
          geolocation_long: coords.longitude?.toString() || "",
          address_chosen: "geolocation",
          geolocation_permission:
            geolocationPermission === "granted"
              ? "allowed"
              : geolocationPermission === "denied"
              ? "user_disabled"
              : geolocationPermission === "prompt"
              ? "prompt"
              : geolocationPermission || "unknown",
          geolocation_triggered:
            geolocationPermission === "denied" ? "no" : "yes",
        };

        setDefaultEventProperties(next);

        // Only fire quiz events after permission is determined
        trackQuizStart(geolocationAddress, "geolocation");
        trackPartialQuizSubmit(
          geolocationAddress,
          geolocationAddress,
          "geolocation"
        );

        const redirectUrl = buildRedirectUrl(
          {
            address: geolocationAddress,
            phone: prev?.prepop_phone || "",
            name: prev?.prepop_name || "",
          },
          "https://www.homelight.com/simple-sale/quiz"
        );

        window.location.href = redirectUrl;

        return next;
      });
    }
  }, [
    geolocationStatus,
    geolocationAddress,
    coords,
    geolocationPermission,
    setPageData,
  ]);

  return (
    <div className="min-h-screen w-full">
      <Header />
      <main>
        <HeroSection
          prefillAddress={isValidParam(prefillAddress) ? prefillAddress : ""}
          pageData={pageData}
        />
        <Steps />
        <Features />
        <PropertySearch
          prefillAddress={isValidParam(prefillAddress) ? prefillAddress : ""}
          pageData={pageData}
        />
        <ClientStory />
        <Testimonials />
        <ComparisonTable />
        <RecentlySoldCarousel />
        <FAQs faqs={FAQS_LIST} />
      </main>
      <Footer />
    </div>
  );
};

export default Landing;
