import React from "react";
import { strings } from "../../constants/strings";
import InputWithButton from "../ui/InputWithButton";

export default function PropertySearch() {
    return (
        <section className="py-20 bg-[#2c4a6b] -ml-[10vw] -mr-[10vw] px-50">
            <div className="max-w-3xl mx-auto text-center">
                <h2 className="text-4xl font-bold text-white mb-8">
                    {strings.search_section_heading}
                </h2>
                <InputWithButton
                    placeholder={strings.enter_property_address}
                    ctaText={strings.cta_get_estimate}
                    ctaColor="#3ba5f5"
                    maxWidth="max-w-6xl"
                />
            </div>
        </section>
    );
}
