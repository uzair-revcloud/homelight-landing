import React, { useEffect, useRef } from "react";
import ClientCard from "../ui/ClientCard";
import { CLIENTS_LIST } from "../../constants/lists";

export default function Testimonials() {
  const scrollRef = useRef(null);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    // Only auto-scroll on mobile (screen width < 768px)
    const isMobile = window.innerWidth < 768;
    if (!isMobile) return;

    let scrollAmount = 0;
    const scrollSpeed = 1; // pixels per frame
    const cardWidth = 350; // approximate card width + gap

    const scroll = () => {
      if (scrollContainer) {
        scrollAmount += scrollSpeed;
        scrollContainer.scrollLeft = scrollAmount;

        // Reset scroll when reaching the end of first set
        if (scrollAmount >= cardWidth * CLIENTS_LIST.length) {
          scrollAmount = 0;
        }
      }
    };

    const intervalId = setInterval(scroll, 30);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="bg-[#f2f8fe] py-12 md:py-16 lg:py-20 pb-20 md:pb-28 lg:pb-32 px-4 md:px-8 lg:-ml-[10vw] lg:-mr-[10vw] lg:px-50">
      <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center text-gray-900 mb-16 md:mb-24 lg:mb-28">
        What our clients are saying
        <br /> about {import.meta.env.VITE_BRAND_NAME || "Trusted Home Offers"}<sup className="text-2xl">®</sup>
      </h2>

      {/* Mobile: Scrollable carousel */}
      <div
        ref={scrollRef}
        className="md:hidden flex gap-6 overflow-x-auto scrollbar-hide"
        style={{ scrollBehavior: "auto" }}
      >
        {/* Duplicate cards for infinite scroll effect */}
        {[...CLIENTS_LIST, ...CLIENTS_LIST].map((client, idx) => (
          <div key={idx} className="flex-shrink-0 w-[320px]">
            <ClientCard
              image={client.image}
              name={client.name}
              role={client.role}
              quote={client.quote}
            />
          </div>
        ))}
      </div>

      {/* Desktop: Static horizontal layout */}
      <div className="hidden md:flex justify-center gap-6">
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
