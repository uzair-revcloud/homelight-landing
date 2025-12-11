import React, { useEffect, useRef, useState } from "react";

const steps = [
    {
        title: "Tell us about your home and speak to a Home Consultant",
        desc: "This helps us get the best possible offer from our investors for your home.",
        icon: "https://d1xt9s86fx9r45.cloudfront.net/assets/hl-production/packs/media/components/icons/female-agent-6d9cb9b7ed725bc9330cc11c9442ae2c.png",
    },
    {
        title: "We use your local neighborhood data",
        desc: "We'll use our local expert’s evaluation and our pricing model to determine the best price for your home.",
        icon: "https://d1xt9s86fx9r45.cloudfront.net/assets/hl-production/packs/media/components/icons/home-search-e62b5a3ac516a60f572f481221054c49.png",
    },
];

const investorLogos = [
    "https://d1xt9s86fx9r45.cloudfront.net/assets/hl-production/packs/media/images/productsLandingPages/simpleSale/investor-ocean-city-e31adcaa7aadcda286498fc1904aaa0b.png",
    "https://d1xt9s86fx9r45.cloudfront.net/assets/hl-production/packs/media/images/productsLandingPages/simpleSale/investor-sundae-3b4dcf442c42cddf24b6382b8bae54dc.png",
    "https://d1xt9s86fx9r45.cloudfront.net/assets/hl-production/packs/media/images/productsLandingPages/simpleSale/investor-abi-298f2880a24392016e4ec2f8ed590b18.png",
    "https://d1xt9s86fx9r45.cloudfront.net/assets/hl-production/packs/media/images/productsLandingPages/simpleSale/investor-tricon-16f255f330a41d01b937a34138a0fef8.png",
    "https://d1xt9s86fx9r45.cloudfront.net/assets/hl-production/packs/media/images/productsLandingPages/simpleSale/investor-homego-b719ec1be03d512133e74043cd98432a.png",
    "https://d1xt9s86fx9r45.cloudfront.net/assets/hl-production/packs/media/images/productsLandingPages/simpleSale/investor-homevestors-3fb45f31ee486106f5df9a8f9099d53e.png",
];

const agentLogos = [
    "https://d1xt9s86fx9r45.cloudfront.net/assets/hl-production/packs/media/images/productsLandingPages/simpleSale/agent-weichert-c731d7b67939d0076e03e765ededd1b1.png",
    "https://d1xt9s86fx9r45.cloudfront.net/assets/hl-production/packs/media/images/productsLandingPages/simpleSale/agent-long-and-foster-91466736de5f19bfd684587d1de75f4e.png",
    "https://d1xt9s86fx9r45.cloudfront.net/assets/hl-production/packs/media/images/productsLandingPages/simpleSale/agent-exp-0934e00c3575df80f9566de2751b9ddd.png",
    "https://d1xt9s86fx9r45.cloudfront.net/assets/hl-production/packs/media/images/productsLandingPages/simpleSale/agent-sothebys-4fdf1a7f3ebab8f0fa41fc584a7fcfa3.png",
    "https://d1xt9s86fx9r45.cloudfront.net/assets/hl-production/packs/media/images/productsLandingPages/simpleSale/agent-prudential-85ab4b32f9130dc61ba608a72438005b.png",
    "https://d1xt9s86fx9r45.cloudfront.net/assets/hl-production/packs/media/images/productsLandingPages/simpleSale/agent-realty-one-fc1daee8c565c004f1c2c6bf58918931.png",
];

export default function Steps() {
    const stepRefs = useRef([]);
    const [activeStep, setActiveStep] = useState(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveStep(Number(entry.target.dataset.step));
                    }
                });
            },
            {
                rootMargin: "-50% 0px -50% 0px",
                threshold: 0,
            }
        );

        stepRefs.current.forEach((el) => el && observer.observe(el));

        return () => {
            stepRefs.current.forEach((el) => el && observer.unobserve(el));
        };
    }, []);

    return (
        <section className="max-w-[150rem] mx-auto flex flex-col py-20 text-[#273653]  px-4">

            {/* Heading */}
            <div className="text-center mb-16">
                <div className="text-sm font-bold tracking-widest text-blue-500">4 EASY STEPS</div>
                <h2 className="text-3xl font-bold mt-4">
                    How HomeLight <br className="md:hidden" /> Simple Sale<sup>®</sup> Works
                </h2>
                <p className="text-lg mt-4 max-w-4xl mx-auto">
                    Compare the top real estate agents and the largest investor network to get the
                    best price and close fast.
                </p>
            </div>

            <div className="flex flex-col ">

                {/* STEP 1 & STEP 2 */}
                {steps.map((step, i) => (
                    <div
                        key={i}
                        data-step={i + 1}
                        ref={(el) => (stepRefs.current[i] = el)}
                        className="rounded-2xl"
                    >
                        {/* Step Number */}
                        {i !== 0 && (
                            <div>
                                <svg style={{ margin: "auto" }} xmlns="http://www.w3.org/2000/svg" width="2" height="64" viewBox="0 0 2 64" fill="none" class="line-top"><path d="M1 0L1 64" stroke="url(#paint0_linear_2767_13211)" stroke-width="2"></path><defs><linearGradient id="paint0_linear_2767_13211" x1="1.5" y1="-2.18557e-08" x2="1.5" y2="64" gradientUnits="userSpaceOnUse"><stop stop-color="#46B6FF" stop-opacity="0"></stop><stop offset="1" stop-color="#46B6FF"></stop></linearGradient></defs></svg>
                            </div>
                        )}
                        <div className={`w-8 h-8 mb-5 mx-auto  flex items-center justify-center 
                                        border-2 rounded-full text-md font-bold transition-colors duration-300
                                        ${activeStep === i + 1 ? "bg-[#46b6ff] border-[#46b6ff] text-white" : "bg-white border-gray-200 text-gray-400"}`}>
                            {i + 1}
                        </div>

                        {/* Content */}
                        <div className="flex flex-col md:flex-row gap-6 items-center md:items-start justify-center text-center md:text-left">
                            <div className="w-28 h-28 shrink-0">
                                <img src={step.icon} alt="" className="w-full h-full object-contain" />
                            </div>
                            <div className="max-w-xl">
                                <h3 className="text-2xl font-bold">{step.title}</h3>
                                <p className="mt-4 text-gray-500 text-base">{step.desc}</p>
                            </div>
                        </div>
                    </div>
                ))}

                {/* STEP 3 */}
                <div
                    data-step={3}
                    ref={(el) => (stepRefs.current[2] = el)}
                    className="rounded-2xl"
                >
                    {/* Step Number */}
                    <div>
                        <svg style={{ margin: "auto" }} xmlns="http://www.w3.org/2000/svg" width="2" height="64" viewBox="0 0 2 64" fill="none" class="line-top"><path d="M1 0L1 64" stroke="url(#paint0_linear_2767_13211)" stroke-width="2"></path><defs><linearGradient id="paint0_linear_2767_13211" x1="1.5" y1="-2.18557e-08" x2="1.5" y2="64" gradientUnits="userSpaceOnUse"><stop stop-color="#46B6FF" stop-opacity="0"></stop><stop offset="1" stop-color="#46B6FF"></stop></linearGradient></defs></svg>
                    </div>
                    <div className={`w-8 h-8 mx-auto flex items-center justify-center 
                                    border-2 rounded-full text-md font-bold transition-colors duration-300
                                    ${activeStep === 3 ? "bg-[#46b6ff] border-[#46b6ff] text-white" : "bg-white border-gray-200 text-gray-400"}`}>
                        3
                    </div>

                    {/* Curved SVGs */}
                    <div className="hidden md:flex justify-center mb-10 -mt-1">
                        <svg xmlns="http://www.w3.org/2000/svg" width="272" height="114" viewBox="0 0 272 114" fill="none">
                            <path d="M271 1C270.327 20.6972 252.125 60.0917 184.701 60.0917C100.421 60.0917 4.53272 55.2538 1.00001 100.868V114"
                                stroke="#46B6FF" strokeWidth="2" />
                        </svg>

                        <svg xmlns="http://www.w3.org/2000/svg" width="272" height="114" viewBox="0 0 272 114" fill="none" style={{ transform: "scaleX(-1)" }}>
                            <path d="M271 1C270.327 20.6972 252.125 60.0917 184.701 60.0917C100.421 60.0917 4.53272 55.2538 1.00001 100.868V114"
                                stroke="#46B6FF" strokeWidth="2" />
                        </svg>
                    </div>

                    {/* VS */}
                    <div className="flex gap-6 text-2xl md:text-4xl font-bold mb-10 md:mb-24 justify-center -ml-10">
                        <span>Investors</span>
                        <div className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full bg-[#f1b707] text-white text-base md:text-lg font-bold">
                            VS
                        </div>
                        <span>Agents</span>
                    </div>

                    {/* Cards */}
                    <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 justify-center items-center">

                        {/* Investors Card */}
                        <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg border border-gray-400 w-full max-w-xl lg:max-w-[35rem] transform lg:-translate-y-10">
                            <h3 className="text-xl md:text-2xl font-bold">Talk to investors</h3>
                            <p className="mt-2 text-sm md:text-base">
                                Investors can help you sell your home for a competitive price in as few
                                as 10 days, with no additional fees, agent commission, or prep-work.
                            </p>

                            <div className="grid grid-cols-3 gap-4 md:gap-8 mt-6">
                                {investorLogos.map((logo, i) => (
                                    <img key={i} src={logo} alt="logo" />
                                ))}
                            </div>
                        </div>

                        {/* Agents Card */}
                        <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg border border-gray-400 w-full max-w-xl lg:max-w-[35rem] transform lg:-translate-y-10">
                            <h3 className="text-xl md:text-2xl font-bold">Talk to agents</h3>
                            <p className="mt-2 text-sm md:text-base">Agents can get you top dollar in your local market by listing your home.</p>
                            <div className="grid grid-cols-3 gap-4 md:gap-8 mt-10 md:mt-14 ">
                                {agentLogos.map((logo, i) => (
                                    <span className="mr-0 md:mr-6" key={i}>
                                        <img src={logo} alt="logo" />
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* STEP 4 */}
                <div
                    data-step={4}
                    ref={(el) => (stepRefs.current[3] = el)}
                    className="rounded-2xl"
                >
                    {/* Step Number */}
                    <div>
                        <svg style={{ margin: "auto" }} xmlns="http://www.w3.org/2000/svg" width="2" height="64" viewBox="0 0 2 64" fill="none" class="line-top"><path d="M1 0L1 64" stroke="url(#paint0_linear_2767_13211)" stroke-width="2"></path><defs><linearGradient id="paint0_linear_2767_13211" x1="1.5" y1="-2.18557e-08" x2="1.5" y2="64" gradientUnits="userSpaceOnUse"><stop stop-color="#46B6FF" stop-opacity="0"></stop><stop offset="1" stop-color="#46B6FF"></stop></linearGradient></defs></svg>
                    </div>
                    <div className={`w-8 h-8 mb-5 mx-auto flex items-center justify-center 
                                    border-2 rounded-full text-md font-bold transition-colors duration-300
                                    ${activeStep === 4 ? "bg-[#46b6ff] border-[#46b6ff] text-white" : "bg-white border-gray-200 text-gray-400"}`}>
                        4
                    </div>

                    <div className="flex flex-col md:flex-row gap-6 items-center md:items-start justify-center text-center md:text-left">
                        <div className="w-20 h-20 shrink-0">
                            <img
                                src="https://d1xt9s86fx9r45.cloudfront.net/assets/hl-production/packs/media/components/icons/cash-b773a84789521953cac0fce23ac8d8f7.png"
                                alt=""
                                className="w-full h-full object-contain"
                            />
                        </div>
                        <div className="max-w-xl">
                            <h3 className="text-2xl font-semibold">
                                Accept the top offer and get ready for your move
                            </h3>
                            <p className="mt-2">Receive multiple offers and get the best deal for your home.</p>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
}
