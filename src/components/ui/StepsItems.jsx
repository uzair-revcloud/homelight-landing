import React from 'react';

const StepItem = ({ number, title, description }) => {
    return (
        <div className="relative flex items-start gap-10 py-14">
            {/* Number Circle */}
            <div className="absolute left-1/2 transform -translate-x-1/2 -top-2">
                <div className="w-10 h-10 rounded-full bg-white border border-gray-300 flex items-center justify-center font-semibold text-blue-500">
                    {number}
                </div>
            </div>

            {/* Content */}
            <div className="max-w-lg mx-auto pt-5">
                <h3 className="text-2xl font-semibold text-gray-900">{title}</h3>
                <p className="text-gray-500 mt-2">{description}</p>
            </div>
        </div>
    );
}

export default StepItem;
