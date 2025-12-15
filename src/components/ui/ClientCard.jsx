import React from "react";

export default function ClientCard({ image, name, role, quote }) {
    return (
        <div className="max-w-[570px] py-16 pb-20 p-8 rounded-3xl shadow-sm bg-white text-center border border-gray-100">

            {/* Avatar */}
            <div className="w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden">
                <img
                    src={image}
                    alt={name}
                    className="w-full h-full object-cover"
                />
            </div>

            {/* Name */}
            <h2 className="text-3xl font-bold text-gray-900">{name}</h2>

            {/* Role / Subtitle */}
            <p className="text-gray-500 font-semibold mt-1">{role}</p>

            {/* Divider */}
            <div className="my-6 border-t border-gray-200"></div>

            {/* Quote */}
            <p className="text-gray-500 font-medium text-lg leading-relaxed px-2">
                "{quote}"
            </p>
        </div>
    );
}
