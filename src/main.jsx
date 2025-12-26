import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import React from "react";
import Landing from "./pages/Landing.jsx";

// Set document title with brand name from env variable
const brandName = import.meta.env.VITE_BRAND_NAME || "Trusted Home Offers";
document.title = `Sell your house fast with ${brandName}`;

// Set favicon from env variable
const faviconPath = import.meta.env.VITE_BRAND_FAVICON || "/favicon.png";
let link = document.querySelector("link[rel='icon']");
if (link) {
  link.href = faviconPath;
} else {
  link = document.createElement("link");
  link.rel = "icon";
  link.type = "image/png";
  link.href = faviconPath;
  document.head.appendChild(link);
}

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Landing />
  </BrowserRouter>
);
