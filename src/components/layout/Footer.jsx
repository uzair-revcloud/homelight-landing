import React from "react";
export default function Footer() {
    return (
        <footer className="w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] border-t border-gray-300 pt-8 md:pt-10 pb-10 md:pb-14 flex flex-col text-center items-center text-gray-600 px-4">


            {/* Accessibility Text */}
            <p className="max-w-4xl text-xs leading-relaxed mb-6">
                Our Commitment to Accessibility: Trusted Home Offers is committed to making our website accessible
                and user friendly to all. While we are constantly working to improve, we welcome your feedback
                and accommodation requests. If you are having difficulty accessing or navigating our website,
                or if you have any suggestions to improve accessibility,
                <a href="#" className=" ml-1 underline">please email our team</a>.
            </p>

            {/* Links */}
            <div className="flex flex-col md:flex-row flex-wrap justify-center text-xs mb-4 text-gray-700 gap-2 md:gap-0">
                <span className="px-2">© Trusted Home Offers, Inc., 1375 N Scottsdale Road, Suite 140, Scottsdale, AZ 85257</span>

                <span className="text-gray-300 hidden md:inline">|</span>

                <a href="#" className="px-2 hover:underline">Terms of Service</a>

                <span className="text-gray-300 hidden md:inline">|</span>

                <a href="#" className="px-2 hover:underline">Privacy Policy (UPDATED 2023)</a>

                <span className="text-gray-300 hidden md:inline">|</span>

                <a href="#" className="px-2 text-blue-500 hover:underline">Do Not Sell or Share My Personal Information</a>
            </div>


            {/* License text */}
            <p className="text-xs mb-4">
                Trusted Home Offers, Inc. is a licensed real estate broker in the State of California, DRE license # 01900940.
            </p>

            {/* Copyright */}
            <p className="text-xs">All rights reserved</p>
        </footer>
    );
}
