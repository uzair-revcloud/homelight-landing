import { useEffect, useState, useRef } from "react";
import Header from "../components/layout/Header";
import HeroSection from "../components/sections/Hero";
import React from "react";
import Footer from "../components/layout/Footer";
import FAQs from "../components/sections/FAQs";
import { FAQS_LIST } from "../constants/lists";
import RecentlySoldCarousel from "../components/sections/RecentlySoldCarousel";
import ComparisonTable from "../components/sections/ComparisonTable";
import Testimonials from "../components/sections/Testimonials";
import ClientStory from "../components/sections/ClientStory";
import Features from "../components/sections/Features";
import PropertySearch from "../components/sections/PropertySearch";
import Steps from "../components/sections/Steps";
import { trackPageView } from "../analytics/track.js";
import { EVENTS } from "../analytics/events.js";
import { useSearchParams } from "react-router-dom";
import { usePageData } from "../hooks/usePageData.jsx";
import { useGeolocation } from "../hooks/useGeolocation.js";
import { trackQuizStart, trackPartialQuizSubmit } from "../analytics/quiz";
import { buildRedirectUrl } from "../utils/buildRedirectUrl";
import { setDefaultEventProperties } from "../analytics/track";

const Landing = () => {
  const [params, setParams] = useSearchParams();
  const [pageViewFired, setPageViewFired] = useState(false);
  const { pageData, setPageData } = usePageData(params, { pageViewFired });
  const { requestLocation, address: geolocationAddress, status: geolocationStatus, coords } = useGeolocation();
  const pageViewFiredRef = useRef(false);
  const sessionIdInitializedRef = useRef(false);

  const prefillAddress = (() => {
    const clean = (v) => (typeof v === "string" ? v.trim() : "");
    const street = clean(pageData?.prepop_street);
    const city = clean(pageData?.prepop_city);
    const state = clean(pageData?.prepop_state);
    const zip = clean(pageData?.prepop_zip);
    const address = clean(pageData?.prepop_address);

    if (address) return address;

    const parts = [];
    if (street) parts.push(street);

    const localityParts = [];
    if (city) localityParts.push(city);
    if (state) localityParts.push(state);
    const locality = localityParts.join(", ");

    const tail = [locality, zip].filter(Boolean).join(locality && zip ? " " : "");
    if (tail) parts.push(tail);

    return parts.join(parts.length > 1 ? ", " : "");
  })();

  // Generate UUID v4, store in sessionStorage, and update URL params
  useEffect(() => {
    if (sessionIdInitializedRef.current) return;
    sessionIdInitializedRef.current = true;

    // Generate UUID v4 using crypto.randomUUID() (standard browser API)
    const generateUUIDv4 = () => {
      if (typeof crypto !== 'undefined' && crypto.randomUUID) {
        return crypto.randomUUID();
      }
      // Fallback for older browsers
      return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
        const r = (Math.random() * 16) | 0;
        const v = c === 'x' ? r : (r & 0x3) | 0x8;
        return v.toString(16);
      });
    };

    // Get or generate sessionId
    let sessionId = sessionStorage.getItem('sessionId');
    const currentSessionId = params.get('sessionId');
    
    if (!sessionId && currentSessionId) {
      // Use existing sessionId from URL and store it
      sessionId = currentSessionId;
      sessionStorage.setItem('sessionId', sessionId);
    } else if (!sessionId) {
      // Generate new UUID v4
      sessionId = generateUUIDv4();
      sessionStorage.setItem('sessionId', sessionId);
    }

    // Update URL params if needed
    const currentCheckoutId = params.get('checkoutId');
    
    let needsUpdate = false;
    const newParams = new URLSearchParams(params);

    // Add sessionId if not present
    if (!currentSessionId) {
      newParams.set('sessionId', sessionId);
      needsUpdate = true;
    }

    // Add checkoutId if not present
    if (!currentCheckoutId) {
      newParams.set('checkoutId', '28');
      needsUpdate = true;
    }

    // Update URL if params changed
    if (needsUpdate) {
      setParams(newParams, { replace: true });
    }
  }, [params, setParams]);

  useEffect(() => {
    // Ensure page view event fires exactly once
    if (pageViewFiredRef.current) return;
    
    pageViewFiredRef.current = true;
    trackPageView(EVENTS.PAGE_VIEW, {
      pageTitle: "Trusted Home Offers",
      url: window.location.href,
      timestamp: new Date().toISOString(),
      entry: true,
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

  // Handle geolocation success: update pageData, fire quiz events, and redirect
  useEffect(() => {
    // Only handle geolocation if enabled via environment variable
    if (!import.meta.env.VITE_ENABLE_GEOLOCATION) return;
    
    if (geolocationStatus === "success" && geolocationAddress) {
      // Update pageData with the geolocation address and trigger redirect
      setPageData((prev) => {
        const next = {
          ...prev,
          prepop_address: geolocationAddress,
        };
        setDefaultEventProperties(next);

        // Fire quiz events with the address
        trackQuizStart(geolocationAddress, "geolocation");
        trackPartialQuizSubmit(geolocationAddress, geolocationAddress, "geolocation");

        // Trigger redirect with the address
        const redirectUrl = buildRedirectUrl({
          address: geolocationAddress,
          phone: pageData?.prepop_phone || "",
          name: pageData?.prepop_name || "",
          timestamp: next.timestamp || new Date().toISOString(),
        }, "https://www.homelight.com/simple-sale/quiz");
        
        window.location.href = redirectUrl;

        return next;
      });
    }
  }, [geolocationStatus, geolocationAddress, setPageData]);

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
