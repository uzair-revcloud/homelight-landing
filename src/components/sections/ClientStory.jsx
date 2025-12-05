import React from "react";
import { strings } from "../../constants/strings";

export default function ClientStory({
    videoUrl,
    imageUrl,
    quote,
    name,
    role
}) {
    return (
        <section className="py-20 bg-white">
            <div className="text-center mb-12">
                <p className="text-sm tracking-wide font-semibold text-blue-700">
                    {strings.client_stories_label}
                </p>
                <h2 className="text-4xl font-bold text-gray-900 mt-2">
                    {strings.client_stories_heading}
                </h2>
            </div>

            <div className="max-w-[1250px] grid grid-cols-1 md:grid-cols-2 items-start">

                {/* LEFT — Video or Image */}
                <div className="rounded-2xl overflow-hidden shadow-lg">
                    {imageUrl ? (
                        <img
                            src={imageUrl}
                            alt={name}
                            className="w-full h-80 md:h-[380px] object-cover"
                        />
                    ) : (
                        <iframe
                            src={videoUrl}
                            className="w-full h-80 md:h-[380px]"
                            frameBorder="0"
                            allow="autoplay; fullscreen"
                            allowFullScreen
                        ></iframe>
                    )}
                </div>

                {/* RIGHT — Quote + Client Info */}
                <div className="ml-24 max-w-full -mr-24">
                    <p className="text-[24px] text-gray-700 font-semibold leading-[1.2] tracking-[0.8px]">
                        "{quote}"
                    </p>

                    <div className="mt-12">
                        <p className="font-semibold text-gray-900 text-lg">{name}</p>
                        <p className="text-gray-500 text-sm mt-1">{role}</p>
                    </div>
                </div>

            </div>
        </section>
    );
}
