import React from 'react';

const PropertyCard = ({ price, address, beds, baths, sqft, daysSold, image }) => {
    return (
        <div className="relative rounded-lg overflow-hidden shadow-lg bg-gray-800 text-white min-w-[300px] max-w-[350px] h-[280px] flex-shrink-0">
            {/* Background Image */}
            <div className="absolute inset-0">
                <img
                    src={image}
                    alt={address}
                    className="w-full h-full object-cover"
                    loading="lazy"
                    width="350"
                    height="280"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/30 to-black/80"></div>
            </div>

            {/* Badge */}
            <div className="absolute top-4 bg-[#e0ecfd] left-4 text-[#2051c5] text-xs font-semibold px-3 py-1 rounded">
                Sold in under {daysSold} days
            </div>

            {/* Property Details */}
            <div className="absolute bottom-0 left-0 right-0 p-4 z-10">
                <div className="text-2xl font-bold mb-1">{price}</div>
                <div className="text-sm mb-2 text-gray-200">{address}</div>
                <div className="flex items-center gap-4 text-xs text-gray-300">
                    <span className="flex items-center gap-1">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                        </svg>
                        {beds}
                    </span>
                    <span className="flex items-center gap-1">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
                        </svg>
                        {baths}
                    </span>
                    <span className="flex items-center gap-1">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                        </svg>
                        {sqft}
                    </span>
                </div>
            </div>
        </div>
    );
};

export default PropertyCard;
