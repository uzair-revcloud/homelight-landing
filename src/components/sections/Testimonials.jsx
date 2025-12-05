import React from "react";
import ClientCard from "../ui/ClientCard";
import { strings } from "../../constants/strings";
import { CLIENTS_LIST } from "../../constants/lists";

export default function Testimonials() {

    return (
        <div className="bg-[#f2f8fe] py-20 pb-32 -ml-[10vw] -mr-[10vw] px-50">
            <h2 className="text-4xl font-bold text-center text-gray-900 mb-28">
                What our clients are saying<br /> about HomeLight Simple Sale®
            </h2>
            <div className="flex justify-center gap-6">
                {CLIENTS_LIST.map((client, idx) => (
                    <ClientCard
                        key={idx}
                        image={client.image}
                        name={client.name}
                        role={client.role}
                        quote={client.quote}
                    />
                ))}
            </div>
        </div>
    );
}