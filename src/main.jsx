import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import React from "react";
import Landing from "./pages/Landing.jsx";

// Set document title with brand name from env variable
const brandName = import.meta.env.VITE_BRAND_NAME || "Trusted Home Offers";
document.title = `Sell your house fast with ${brandName}`;

createRoot(document.getElementById("root")).render(
    <BrowserRouter>
      <Landing />
    </BrowserRouter>
);
