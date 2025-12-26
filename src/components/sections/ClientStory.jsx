import React, { useState } from "react";
import { strings } from "../../constants/strings";

export default function ClientStory() {
  const [showVideo, setShowVideo] = useState(false);

  const data = {
    imageUrl:
      "https://d1xt9s86fx9r45.cloudfront.net/assets/hl-production/packs/media/images/productsLandingPages/simpleSale/testimonial-bao-w-cf59538fe38458d19d69fbb2ec5f3bb7.webp",
    videoUrl: "https://www.youtube.com/embed/hmLePc7lN",
    quote: strings.client_story_quote,
    name: strings.client_story_name,
    role: strings.client_story_role,
  };

  return (
    <section className="py-12 md:py-16 lg:py-20 bg-white">
      <div className="text-center mb-12">
        <p className="text-sm tracking-wide font-semibold text-blue-700">
          {strings.client_stories_label}
        </p>
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mt-2">
          {strings.client_stories_heading}
        </h2>
      </div>

      <div className="max-w-[1250px] mx-auto grid grid-cols-1 md:grid-cols-2 items-start gap-8 md:gap-0 px-4 md:px-0">
        {/* LEFT — Clickable Image → Video */}
        <div className="rounded-2xl overflow-hidden shadow-lg cursor-pointer">
          {!showVideo ? (
            <img
              src={data.imageUrl}
              alt={data.name}
              className="w-full h-80 md:h-[380px] object-cover"
              onClick={() => setShowVideo(true)}
              loading="lazy"
              width="625"
              height="380"
            />
          ) : (
            <iframe
              src={data.videoUrl}
              className="w-full h-80 md:h-[380px]"
              frameBorder="0"
              allow="autoplay; fullscreen"
              allowFullScreen
            ></iframe>
          )}
        </div>

        {/* RIGHT — Quote + Client Info */}
        <div className="md:ml-24 max-w-full">
          <p className="text-[20px] md:text-[24px] text-gray-700 font-semibold leading-[1.2] tracking-[0.8px]">
            "{data.quote}"
          </p>

          <div className="mt-8 md:mt-12">
            <p className="font-semibold text-gray-900 text-lg">{data.name}</p>
            <p className="text-gray-500 text-sm mt-1">{data.role}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
