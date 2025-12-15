import React from "react";
import { strings } from "../../constants/strings";
import InputWithButton from "../ui/InputWithButton";

export default function PropertySearch() {
    return (
        <section className="py-12 md:py-16 lg:py-20 bg-[#2c4a6b] px-4 md:px-8 lg:-ml-[10vw] lg:-mr-[10vw] lg:px-50">
            <div className="max-w-3xl mx-auto">
                <h2 className="text-2xl md:text-3xl text-center lg:text-4xl font-bold text-white mb-8">
                    {strings.search_section_heading}
                </h2>
                <InputWithButton
                    placeholder={strings.enter_property_address}
                    ctaText={strings.cta_get_estimate}
                    ctaColor="#3ba5f5"
                    maxWidth="max-w-6xl"
                    mapboxToken={import.meta.env.VITE_MAPBOX_TOKEN}
                />
            </div>
        </section>
    );
}
