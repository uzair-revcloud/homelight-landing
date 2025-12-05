import React from "react";
import ClientCard from "../ui/ClientCard";
import { strings } from "../../constants/strings";

export default function Testimonials() {
    return (
        <div className="bg-[#f2f8fe] py-20 pb-32 -ml-[10vw] -mr-[10vw] px-50">
            <h2 className="text-4xl font-bold text-center text-gray-900 mb-28">
                {strings.testimonials_heading}
            </h2>
            <div className="flex justify-center gap-6">
                <ClientCard image="/client.jpg"
                    name="Traci M."
                    role="HomeLight Simple Sale Client"
                    quote="HomeLight Simple Sale helped match me with a cash buyer within days. The process was extremely easy and efficient."
                />
                <ClientCard image="/client.jpg"
                    name="Traci M."
                    role="HomeLight Simple Sale Client"
                    quote="HomeLight Simple Sale helped match me with a cash buyer within days. The process was extremely easy and efficient."
                />
            </div>
        </div>
    );
}