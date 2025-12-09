import React from "react";
import { TABLE_ROWS } from "../../constants/lists";
import { strings } from "../../constants/strings";

export default function ComparisonTable() {
    const CheckIcon = () => (
        <div className="flex items-center justify-center">
            <svg viewBox="0 0 18 18" className="w-5 h-5">
                <path d="M18 9C18 13.9706 13.9706 18 9 18C4.02942 18 0 13.9706 0 9C0 4.02942 4.02942 0 9 0C13.9706 0 18 4.02942 18 9Z" fill="#1192E5" />
                <path d="M7.95891 13.7654L14.6363 7.088C14.8631 6.86126 14.8631 6.4936 14.6363 6.26686L13.8152 5.44572C13.5884 5.21894 13.2208 5.21894 12.994 5.44572L7.54832 10.8914L5.00586 8.34891C4.77911 8.12217 4.41146 8.12217 4.18468 8.34891L3.36354 9.17005C3.1368 9.39679 3.1368 9.76445 3.36354 9.99119L7.13773 13.7654C7.36451 13.9922 7.73213 13.9922 7.95891 13.7654Z" fill="white" />
            </svg>
        </div>
    );

    const CloseIcon = () => (
        <div className="flex items-center justify-center">
            <svg viewBox="0 0 18 18" className="w-5 h-5">
                <circle cx="9" cy="9" r="9" fill="#C5C8CD" />
                <path d="M10.1528 9.0376L12.6775 6.51295C12.8235 6.36694 12.8235 6.12999 12.6775 5.98374L12.0909 5.39711C11.9449 5.25109 11.7079 5.25109 11.5617 5.39711L9.03724 7.92199L6.51259 5.39734C6.36658 5.25133 6.12963 5.25133 5.98338 5.39734L5.39699 5.98374C5.25097 6.12975 5.25097 6.3667 5.39699 6.51295L7.92163 9.0376L5.39699 11.5622C5.25097 11.7083 5.25097 11.9452 5.39699 12.0915L5.98362 12.6781C6.12963 12.8241 6.36658 12.8241 6.51283 12.6781L9.03724 10.1532L11.5619 12.6779C11.7079 12.8239 11.9449 12.8239 12.0911 12.6779L12.6777 12.0912C12.8237 11.9452 12.8237 11.7083 12.6777 11.562L10.1528 9.0376Z" fill="white" />
            </svg>
        </div>
    );

    return (
        <div className="w-full py-12 md:py-16 lg:py-20 bg-white px-4 md:px-0">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center text-gray-900 mb-12">
                {strings.comparison_table_heading}
            </h2>
            <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-md overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left shadow rounded-lg">
                        <thead>
                            <tr className="bg-white py-24">
                                <th className="w-1/2 invisible"></th>
                                <th className="p-4 py-5 font-semibold text-center border-r border-l border-t rounded-lg border-[#eef0f6] text-gray-800">{strings.comparison_traditional_sale}</th>
                                <th className="p-4 font-semibold bg-[#f2f8fe] text-center border-r border-l border-t border-[#eef0f6] text-[#1192E5]">{strings.comparison_simple_sale}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {TABLE_ROWS.map((row, i) => (
                                <tr key={i} className={`border-t border-l border-[#eef0f6]`}>
                                    <td className="p-6 text-gray-700">{row.label}</td>
                                    <td className="p-4 text-center border-r border-l border-[#eef0f6]">
                                        {row.traditional ? <CheckIcon /> : <CloseIcon />}
                                    </td>
                                    <td className="p-4 text-center border-r bg-[#f2f8fe] border-l border-[#eef0f6]">
                                        {row.simpleSale ? <CheckIcon /> : <CloseIcon />}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

