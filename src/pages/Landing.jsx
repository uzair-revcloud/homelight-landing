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
  const { sessionId } = useAlysonSession();
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

  useEffect(() => {
    // Ensure page view event fires exactly once
    if (pageViewFiredRef.current) return;

    pageViewFiredRef.current = true;
    trackPageView("Trusted Home Offers", {
      title: "Trusted Home Offers",
      url: window.location.href,
      entry: true,
      sessionId: sessionId,
    }).then(() => {
      setPageViewFired(true);
    });
  }, []);

  // Request user location as soon as the page loads (only if enabled via environment variable)
  useEffect(() => {
    if (import.meta.env.VITE_ENABLE_GEOLOCATION) {
      requestLocation();
    }
  }, [requestLocation]);

  useEffect(() => {
    if (!import.meta.env.VITE_ENABLE_GEOLOCATION) return;

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
          geolocation_permission:
            geolocationPermission === "granted"
              ? "allowed"
              : geolocationPermission === "denied"
              ? "user_disabled"
              : geolocationPermission === "prompt"
              ? "prompt"
              : geolocationPermission || "unknown",
          geolocation_triggered: "yes",
        };

        setDefaultEventProperties(next);

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
    geolocationPermission, // ✅ REQUIRED
    setPageData,
  ]);

  return (
    <div className="min-h-screen w-full">
      <Header />
      <main>
        <HeroSection prefillAddress={prefillAddress} pageData={pageData} />
        <Steps />
        <Features />
        <PropertySearch prefillAddress={prefillAddress} pageData={pageData} />
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
