import { useEffect, useState } from "react";
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

const Landing = () => {
  const [params] = useSearchParams();
  const [pageViewFired, setPageViewFired] = useState(false);
  const pageData = usePageData(params, { pageViewFired });
  const { requestLocation } = useGeolocation();

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

  useEffect(() => {
    trackPageView(EVENTS.PAGE_VIEW, {
      pageTitle: "HomeLight Landing",
      url: window.location.href,
      timestamp: new Date().toISOString(),
      entry: true,
    }).then(() => {
      setPageViewFired(true);
    });
  }, []);

  // Request user location as soon as the page loads
  useEffect(() => {
    requestLocation();
  }, [requestLocation]);

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
