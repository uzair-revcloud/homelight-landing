import React from "react";
import { strings } from "../../constants/strings";
const HeroSection = () => {
    return (
        <><section className="w-full flex flex-col lg:flex-row justify-between items-center px-10 py-16 max-w-full mx-auto font-sans bg-white">
            {/* Left Content */}
            <div className="max-w-2xl lg:w-1/2">
                <h1 className="text-8xl font-bold text-[#1A3B5D] leading-tight mb-6">
                    {strings.hero_heading}
                </h1>

                <p className="text-gray-600 text-lg mb-10 leading-relaxed">
                    {strings.hero_subheading}
                </p>

                {/* Search Bar */}
                <div className="flex items-center shadow-lg rounded-lg overflow-hidden w-full max-w-2xl border border-gray-300">
                    <div className="px-5 text-gray-400 text-2xl">🔍</div>
                    <input
                        type="text"
                        placeholder={strings.search_placeholder}
                        className="flex-1 py-4 px-3 outline-none text-gray-700 bg-white text-lg" />
                    <button style={{ backgroundColor: '#ff9000' }} className="m-2 text-white font-semibold px-8 py-4 transition-colors rounded-lg">
                        {strings.cta_get_offers}
                    </button>
                </div>
            </div>

            {/* Right Side Illustration */}
            <div className="mt-12 lg:mt-0 lg:w-1/2 flex justify-end">
                <img
                    src="/hero.webp"
                    alt="Hero Illustration"
                    className="w-full max-w-xlg" />
            </div>
        </section><div className="bg-[#0288D1] text-white -ml-14 px-20 py-5 text-sm font-medium font-sans">
                We have Cash Buyers in your area. Enter your address to get started.
            </div></>
    );
}

export default HeroSection;