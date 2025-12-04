import Header from '../components/layout/Header'
import HeroSection from '../components/sections/Hero'
import React from 'react'
import Steps from '../components/sections/Steps'
import Footer from '../components/layout/Footer'
import FAQs from '../components/sections/FAQs'
import { FAQS_LIST } from '../constants/lists'
import RecentlySoldCarousel from '../components/sections/RecentlySoldCarousel'

const Landing = () => {
    return (
        <div className="min-h-screen w-full">
            <Header />
            <main>
                <HeroSection />
                <Steps />
                <RecentlySoldCarousel />
                <FAQs faqs={FAQS_LIST} />
            </main>
            <Footer />
        </div>
    )
}

export default Landing
