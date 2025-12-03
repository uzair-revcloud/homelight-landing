import React from "react";
import { strings } from "../../constants/strings";

const Header = () => {
    return (
        <header className="flex justify-between items-center px-10 py-4 bg-white font-sans">
            {/* Logo */}
            <div className="flex items-center gap-2 cursor-pointer">
                <img src="\logo.png" className="w-44" alt={strings.company_name} />
            </div>

        </header>
    );
}

export default Header;
