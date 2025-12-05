import Header from '../components/layout/Header'
import HeroSection from '../components/sections/Hero'
import React from 'react'
import Steps from '../components/sections/Steps'
import Footer from '../components/layout/Footer'
import FAQs from '../components/sections/FAQs'
import { FAQS_LIST } from '../constants/lists'
import RecentlySoldCarousel from '../components/sections/RecentlySoldCarousel'
import ComparisonTable from '../components/sections/ComparisonTable'
import Testimonials from '../components/sections/Testimonials'
import ClientStory from '../components/sections/ClientStory'
import { strings } from '../constants/strings'

const Landing = () => {
    return (
        <div className="min-h-screen w-full">
            <Header />
            <main>
                <HeroSection />
                <Steps />
                <ClientStory
                    imageUrl="https://d1xt9s86fx9r45.cloudfront.net/assets/hl-production/packs/media/images/productsLandingPages/simpleSale/testimonial-bao-w-cf59538fe38458d19d69fbb2ec5f3bb7.webp"
                    videoUrl="https://player.vimeo.com/video/123456789"
                    quote={strings.client_story_quote}
                    name={strings.client_story_name}
                    role={strings.client_story_role}
                />

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
