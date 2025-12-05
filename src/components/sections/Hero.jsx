import React from "react";
import { strings } from "../../constants/strings";
import InputWithButton from "../ui/InputWithButton";
const HeroSection = () => {
    return (
        <>
            <section className="w-full flex flex-col lg:flex-row justify-between items-center px-10 py-24 max-w-full mx-auto font-sans bg-white">
                {/* Left Content */}
                <div className="max-w-2xl lg:w-1/2">
                    <h1 className="text-9xl font-bold text-[#1A3B5D] leading-tight mb-6">
                        {strings.hero_heading}
                    </h1>

                    <p className="text-gray-600 text-xl mb-10 leading-relaxed">
                        {strings.hero_subheading}
                    </p>

                    <InputWithButton
                        placeholder={strings.search_placeholder}
                        ctaText={strings.cta_get_offers}
                        ctaColor="#ff9000"
                        className="mt-6"
                    />
                </div>

                {/* Right Side Illustration */}
                <div className="mt-12 lg:mt-0 lg:w-1/2 flex justify-end">
                    <img
                        src="/hero.webp"
                        alt="Hero Illustration"
                        className="w-full max-w-2xl" />
                </div>
            </section>
            <div className="bg-[#0288D1] text-white -ml-[10vw] pl-50 py-5 text-sm font-medium font-sans">
                We have Cash Buyers in your area. Enter your address to get started.
            </div>
        </>
    );
}

export default HeroSection;