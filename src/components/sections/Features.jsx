import React from "react";
import { FeatureCard } from "../ui/FeatureCard";
import { FEATURES_LIST } from "../../constants/lists";

export default function Features() {

    return (
        <section className="py-12 md:py-16 lg:py-20 bg-[#F5FAFF] px-4 md:px-8 lg:-ml-[10vw] lg:-mr-[10vw] lg:px-50">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center text-gray-900 mb-12 md:mb-16">
                The fastest and easiest way<br /> to sell your home
            </h2>

            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 px-4">
                {FEATURES_LIST.map((item, idx) => (
                    <FeatureCard
                        key={idx}
                        icon={item.icon}
                        title={item.title}
                        description={item.description}
                    />
                ))}
            </div>
        </section>
    );
}
