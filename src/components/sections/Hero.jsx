import React from "react";
import { strings } from "../../constants/strings";
import InputWithButton from "../ui/InputWithButton";

const HeroSection = ({
  prefillAddress = "",
  pageData = {},
  callIdentityAPIWithAddress,
}) => {
  return (
    <>
      <section className="w-full flex flex-col lg:flex-row justify-between items-center px-4 md:px-8 lg:px-10 py-12 md:py-20 lg:py-24 max-w-full mx-auto  bg-white">
        {/* Left Content */}
        <div className="max-w-xl lg:w-1/2">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-[#1A3B5D] leading-tight mb-6">
            {strings.hero_heading}
          </h1>

          <p className="text-base md:text-lg lg:text-xl mb-8 md:mb-10 leading-relaxed text-gray-600">
            {strings.hero_subheading}
          </p>

          <InputWithButton
            placeholder={strings.search_placeholder}
            ctaText={strings.cta_get_offers}
            ctaColor="#ff9000"
            className="mt-6"
            value={prefillAddress}
            mapboxToken={import.meta.env.VITE_MAPBOX_TOKEN}
            pageData={pageData}
            callIdentityAPIWithAddress={callIdentityAPIWithAddress}
          />
        </div>

        {/* Right Side Illustration */}
        <div className="mt-12 lg:mt-0 lg:w-1/2 flex justify-end">
          <img
            src="/hero.webp"
            alt="Hero Illustration"
            className="w-full max-w-2xl"
            width="800"
            height="600"
            fetchPriority="high"
          />
        </div>
      </section>
      <div className="bg-[#0288D1] text-white px-4 md:px-8 lg:-ml-[10vw] lg:pl-50 py-5 text-sm font-medium ">
        We have Cash Buyers in your area. Enter your address to get started.
      </div>
    </>
  );
};

export default HeroSection;
