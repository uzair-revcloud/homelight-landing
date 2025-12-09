import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IoChevronDown, IoChevronUp } from "react-icons/io5";
import React from "react";

export default function FAQs({ faqs = [] }) {
    const [openIndex, setOpenIndex] = useState(0);

    const toggle = (i) => {
        setOpenIndex(i === openIndex ? null : i);
    };

    return (
        <section className="w-full mx-auto py-12 md:py-16 lg:py-20 px-4 md:px-0">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-10 text-center text-[#1e3354]">
                Client FAQs
            </h2>

            <div>
                {faqs.map((faq, i) => (
                    <div key={i} className="border-b border-gray-300 py-4">
                        {/* Question Row */}
                        <div
                            className="flex items-center justify-between cursor-pointer gap-4"
                            onClick={() => toggle(i)}
                        >
                            <h3 className="flex-1 text-left text-md font-bold text-[#1e3354]">
                                {faq.question}
                            </h3>

                            <div className="shrink-0">
                                {openIndex === i ? (
                                    <IoChevronUp className="text-sm text-gray-700" />
                                ) : (
                                    <IoChevronDown className="text-sm text-gray-700" />
                                )}
                            </div>
                        </div>

                        {/* Answer Section */}
                        <AnimatePresence>
                            {openIndex === i && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: "auto", opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.25 }}
                                    className="overflow-hidden"
                                >
                                    <p className="text-gray-600 mt-3 leading-relaxed">
                                        {faq.answer}
                                    </p>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                ))}
            </div>
        </section>
    );
}
