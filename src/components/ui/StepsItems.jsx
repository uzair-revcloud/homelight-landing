import React from 'react';

const StepItem = ({ number, title, description }) => {
    return (
        <div className="relative flex items-start gap-10 py-7">
            <div className="absolute left-1/2 transform -translate-x-1/2 -top-2 flex flex-col items-center">
                {number !== "1" && (
                    <div className="w-px h-12 bg-gray-300" aria-hidden="true" />
                )}

                <div className="w-7 h-7 rounded-full bg-white border border-gray-300 flex items-center text-sm justify-center font-semibold text-blue-500">
                    {number}
                </div>
            </div>

            {/* Content */}
            <div className="max-w-lg mx-auto pt-10">
                <h3 className="text-xl font-bold text-gray-900">{title}</h3>
                <p className="text-gray-500 mt-1 text-sm">{description}</p>
            </div>
        </div>
    );
}

export default StepItem;
