import Header from '../components/layout/Header'
import HeroSection from '../components/sections/Hero'
import React from 'react'
import Steps from '../components/sections/Steps'
const Landing = () => {
    return (
        <div className="min-h-screen w-full">
            <Header />
            <main>
                <HeroSection />
                <Steps />
            </main>
        </div>
    )
}

export default Landing
