import React, { useEffect, useState } from "react";
import { strings } from "../../constants/strings";

const Header = () => {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 0);
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    return (
        <header className={`sticky top-0 z-50 flex justify-between -ml-[10vw] -mr-[50vw] items-center px-50 py-4 bg-white bg-opacity-95 backdrop-blur-sm transition-shadow duration-200 font-sans ${scrolled ? "shadow-sm" : ""}`}>
            {/* Logo */}
            <div className="flex items-center gap-2 cursor-pointer">
                <img src="\logo.png" className="w-44" alt={strings.company_name} />
            </div>

            {/* Full-bleed bottom border that ignores header padding */}
            <div className="absolute left-0 right-0 bottom-0 h-px bg-gray-200 -mr-[50vw] pointer-events-none" />

        </header>
    );
}

export default Header;
