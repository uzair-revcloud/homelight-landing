import React from "react";

export function FeatureCard({ icon, title, description }) {
    return (
        <div className="bg-white rounded-xl shadow-xs p-8 border border-gray-100">
            {/* Icon */}
            <div className="w-20 h-20 mb-6">
                <img src={icon} alt="" className="w-full h-full object-contain" />
            </div>

            {/* Title */}
            <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {title}
            </h3>

            {/* Description */}
            <p className="text-gray-600 leading-relaxed">
                {description}
            </p>
        </div>
    );
}
