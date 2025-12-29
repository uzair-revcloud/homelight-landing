import React from "react";

export default function Footer() {
  return (
    <footer className="page-footer-component w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] border-t border-gray-300 pt-8 md:pt-10 pb-10 md:pb-14 px-4">
      <div className="grid-container mx-auto">
        <div className="row">
          <div className="col-xs-12 bbb"></div>
        </div>
        <div className="row">
          <div className="col-xs-12">
            <ul className="last-details" style={{ margin: "0 !important" }}>
              <li className="flex flex-wrap items-center justify-center gap-2">
                <span>
                  © {import.meta.env.VITE_BRAND_NAME || "Trusted Home Offers"}{" "}
                  Inc., 30 N Gould St, Ste 26362, Sheridan, Wyoming, United
                  States 82801
                </span>
                <span className="text-gray-300 hidden sm:inline">|</span>
                <span className="tos">
                  <a
                    href={import.meta.env.VITE_TERMS_OF_SERVICE_URL}
                    className="hover:underline"
                  >
                    Terms of Service
                  </a>
                  <span className="text-gray-300 mx-2">|</span>
                  <a
                    href={import.meta.env.VITE_PRIVACY_POLICY_URL}
                    className="hover:underline"
                  >
                    Privacy Policy
                  </a>
                </span>
              </li>
              <li className="text-center">
                Do Not Sell or Share My Personal Information
              </li>
            </ul>
          </div>
        </div>
        <div className="row">
          <div className="col-xs-12">
            <ul className="lending-license text-center">
              <li>All rights reserved</li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
