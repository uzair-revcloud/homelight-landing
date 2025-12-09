import React from "react";

const steps = [
    {
        title: "Tell us about your home and speak to a Home Consultant",
        desc: "This helps us get the best possible offer from our investors for your home.",
        icon: "https://d1xt9s86fx9r45.cloudfront.net/assets/hl-production/packs/media/components/icons/female-agent-6d9cb9b7ed725bc9330cc11c9442ae2c.png",
        highlighted: true,
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
    return (
        <section className="max-w-[150rem] mx-auto flex flex-col py-20 text-[#273653] font-sans px-4">
            {/* Heading */}
            <div className="text-center mb-16">
                <div className="text-sm font-bold tracking-widest text-blue-500">
                    4 EASY STEPS
                </div>
                <h2 className="text-4xl font-bold leading-tight mt-4">
                    How HomeLight <br className="md:hidden" /> Simple Sale<sup>®</sup> Works
                </h2>
                <p className="text-lg mt-6 max-w-3xl mx-auto">
                    Compare the top real estate agents and the largest investor network to get the
                    best price and close fast.
                </p>
            </div>

            {/* Steps 1 & 2 */}
            <div className="flex flex-col gap-20">
                {steps.map((step, i) => (
                    <div key={i} className="step-wrapper">
                        {/* SVG Connector Line */}
                        {i !== 0 && (
                            <svg xmlns="http://www.w3.org/2000/svg" width="2" height="64" viewBox="0 0 2 64" fill="none" class="line-top"><path d="M1 0L1 64" stroke="url(#paint0_linear_2767_13211)" stroke-width="2"></path><defs><linearGradient id="paint0_linear_2767_13211" x1="1.5" y1="-2.18557e-08" x2="1.5" y2="64" gradientUnits="userSpaceOnUse"><stop stop-color="#46B6FF" stop-opacity="0"></stop><stop offset="1" stop-color="#46B6FF"></stop></linearGradient></defs></svg>
                        )}

                        <div className="flex gap-6 items-start">
                            {/* Icon */}
                            <div className="w-20 h-20 shrink-0">
                                <img src={step.icon} alt="" className="w-full h-full object-contain" />
                            </div>

                            {/* Description */}
                            <div>
                                <h3 className="text-2xl font-semibold">{step.title}</h3>
                                <p className="mt-2 text-base">{step.desc}</p>
                            </div>
                        </div>
                    </div>
                ))}

                {/* Step 3 — Investors vs Agents Split */}
                <div className="mt-10">
                    <div className="flex items-center justify-center gap-6 text-3xl font-bold mb-10">
                        <span>Investors</span>
                        <div className="w-14 h-14 flex items-center justify-center rounded-full bg-blue-200 text-blue-600 text-xl font-extrabold">
                            VS
                        </div>
                        <span>Agents</span>
                    </div>

                    <div className="grid md:grid-cols-2 gap-12">
                        {/* Investors */}
                        <div>
                            <h3 className="text-2xl font-semibold">Talk to investors</h3>
                            <p className="mt-2">
                                Investors can help you sell your home for a competitive price in as few
                                as 10 days, with no additional fees, agent commission, or prep-work.
                            </p>

                            <div className="grid grid-cols-3 gap-4 mt-6">
                                {investorLogos.map((logo, i) => (
                                    <img key={i} src={logo} alt="logo" className="w-full" />
                                ))}
                            </div>
                        </div>

                        {/* Agents */}
                        <div>
                            <h3 className="text-2xl font-semibold">Talk to agents</h3>
                            <p className="mt-2">
                                Agents can get you top dollar in your local market by listing your home.
                            </p>

                            <div className="grid grid-cols-3 gap-4 mt-6">
                                {agentLogos.map((logo, i) => (
                                    <img key={i} src={logo} alt="logo" className="w-full" />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Step 4 */}
                <div className="flex gap-6 items-start mt-10">
                    <div className="w-20 h-20 shrink-0">
                        <img
                            src="https://d1xt9s86fx9r45.cloudfront.net/assets/hl-production/packs/media/components/icons/cash-b773a84789521953cac0fce23ac8d8f7.png"
                            alt=""
                            className="w-full h-full object-contain"
                        />
                    </div>
                    <div>
                        <h3 className="text-2xl font-semibold">
                            Accept the top offer and get ready for your move
                        </h3>
                        <p className="mt-2">
                            Receive multiple offers and get the best deal for your home.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
