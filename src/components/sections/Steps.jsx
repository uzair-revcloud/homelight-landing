import React from "react";
import StepItem from "../ui/StepsItems";

const Steps = () => {
    return (
        <section className="w-full py-20 bg-white">
            <div className="max-w-4xl mx-auto text-center">
                <p className="text-blue-500 font-semibold tracking-wide text-sm">4 EASY STEPS</p>
                <h2 className="text-2xl font-bold text-gray-900 mt-1">
                    How HomeLight Simple Sale Works
                </h2>
                <p className="text-gray-500 mt-3 text-sm">
                    Compare the top real estate agents and the largest investor network to get the best
                    price and close fast.
                </p>
            </div>

            <div className="mt-10 relative max-w-3xl mx-auto">

                {/* Step 1 */}
                <StepItem
                    number="1"
                    title="Tell us about your home and speak to a Home Consultant"
                    description="This helps us get the best possible offer from our investors for your home."
                />

                {/* Step 2 */}
                <StepItem
                    number="2"
                    title="We use your local neighborhood data"
                    description="We'll use our local expert’s evaluation and our pricing model to determine the best price for your home."
                />

                {/* Curved Split Line for Step 3 */}
                <div className="relative my-20 flex justify-center">
                    <div className="relative z-10 w-10 h-10 rounded-full bg-white border border-gray-300 flex items-center justify-center text-gray-700 font-semibold">
                        3
                    </div>

                    <div className="absolute top-1/2 w-full flex justify-center">
                        <div className="w-full max-w-3xl relative">
                            <svg className="w-full h-24 text-blue-300" viewBox="0 0 600 200">
                                <path
                                    d="M10 10 C 150 180, 450 180, 590 10"
                                    stroke="rgb(96,165,250)"
                                    strokeWidth="4"
                                    fill="transparent"
                                />
                            </svg>
                        </div>
                    </div>
                </div>

                {/* Section below split */}
                <div className="text-center mt-10">
                    <h3 className="text-3xl font-bold text-gray-900">
                        Investors <span className="text-yellow-400">vs</span> Agents
                    </h3>
                </div>
            </div>
        </section>
    );
}

export default Steps;