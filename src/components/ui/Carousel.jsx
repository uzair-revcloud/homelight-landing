import React, { useState, useRef, useEffect } from "react";

const Carousel = ({ children, title }) => {
    const [currentPage, setCurrentPage] = useState(0);
    const scrollContainerRef = useRef(null);

    const items = React.Children.toArray(children);
    const itemsPerPage = 3;
    const totalPages = Math.ceil(items.length / itemsPerPage);

    useEffect(() => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.style.scrollBehavior = "smooth";
        }
    }, []);

    const handlePrev = () => {
        const newPage = currentPage === 0 ? totalPages - 1 : currentPage - 1;
        setCurrentPage(newPage);
        scrollToPage(newPage);
    };

    const handleNext = () => {
        const newPage = currentPage === totalPages - 1 ? 0 : currentPage + 1;
        setCurrentPage(newPage);
        scrollToPage(newPage);
    };

    const scrollToPage = (pageIndex) => {
        const container = scrollContainerRef.current;
        if (!container) return;

        const pageWidth = container.offsetWidth;

        container.scrollTo({
            left: pageIndex * pageWidth,
            behavior: "smooth",
        });
    };

    const handleDotClick = (pageIndex) => {
        setCurrentPage(pageIndex);
        scrollToPage(pageIndex);
    };

    return (
        <div className="w-full py-12 bg-gray-50">
            <div className="max-w-6xl mx-auto px-10">
                {title && (
                    <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">
                        {title}
                    </h2>
                )}

                {/* Carousel Wrapper */}
                <div className="relative">
                    {/* Left Arrow */}
                    <button
                        onClick={handlePrev}
                        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-12 z-10 
                        bg-white rounded-full p-3 shadow-lg hover:bg-gray-100"
                        aria-label="Previous"
                    >
                        <svg className="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>

                    {/* Items container */}
                    <div
                        ref={scrollContainerRef}
                        className="overflow-x-hidden ml-5"
                    >
                        <div
                            className="flex gap-16"
                            style={{ width: `${(items.length / itemsPerPage) * 100}%` }}
                        >
                            {items.map((child, i) => (
                                <div key={i}>
                                    {child}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right Arrow */}
                    <button
                        onClick={handleNext}
                        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-12 z-10 
                        bg-white rounded-full p-3 shadow-lg hover:bg-gray-100"
                        aria-label="Next"
                    >
                        <svg className="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </button>
                </div>

                {/* Pagination */}
                <div className="flex justify-center gap-2 mt-8">
                    {Array.from({ length: totalPages }).map((_, index) => (
                        <button
                            key={index}
                            onClick={() => handleDotClick(index)}
                            className={`w-2 h-2 rounded-full transition-all ${index === currentPage ? "bg-blue-600 w-8" : "bg-gray-300"
                                }`}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Carousel;
