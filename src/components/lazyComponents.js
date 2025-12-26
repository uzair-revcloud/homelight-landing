import { lazy } from "react";

// Lazy load below-the-fold components for better performance
export const Steps = lazy(() => import("./sections/Steps"));
export const Features = lazy(() => import("./sections/Features"));
export const PropertySearch = lazy(() => import("./sections/PropertySearch"));
export const ClientStory = lazy(() => import("./sections/ClientStory"));
export const Testimonials = lazy(() => import("./sections/Testimonials"));
export const ComparisonTable = lazy(() => import("./sections/ComparisonTable"));
export const RecentlySoldCarousel = lazy(() => import("./sections/RecentlySoldCarousel"));
export const FAQs = lazy(() => import("./sections/FAQs"));
export const Footer = lazy(() => import("./layout/Footer"));

