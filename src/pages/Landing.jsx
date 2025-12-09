import Header from '../components/layout/Header'
import HeroSection from '../components/sections/Hero'
import React from 'react'
import Footer from '../components/layout/Footer'
import FAQs from '../components/sections/FAQs'
import { FAQS_LIST } from '../constants/lists'
import RecentlySoldCarousel from '../components/sections/RecentlySoldCarousel'
import ComparisonTable from '../components/sections/ComparisonTable'
import Testimonials from '../components/sections/Testimonials'
import ClientStory from '../components/sections/ClientStory'
import Features from '../components/sections/Features'
import PropertySearch from '../components/sections/PropertySearch'

const Landing = () => {
    return (
        <div className="min-h-screen w-full">
            <Header />
            <main>
                <HeroSection />
                <Features />
                <PropertySearch />
                <ClientStory />
                <Testimonials />
                <ComparisonTable />
                <RecentlySoldCarousel />
                <FAQs faqs={FAQS_LIST} />
            </main>
            <Footer />
        </div>
    )
}

export default Landing
