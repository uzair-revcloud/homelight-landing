import React, { useState } from 'react'

const InputWithButton = ({
    ctaText = 'Send',
    ctaColor = '#2563eb',
    onSubmit,
    placeholder = '',
    className = '',
    inputClassName = '',
    buttonClassName = '',
    maxWidth = 'max-w-xl',
}) => {
    const [value, setValue] = useState('')

    const handleSubmit = (e) => {
        if (e && e.preventDefault) e.preventDefault()
        if (typeof onSubmit === 'function') onSubmit(value)
    }

    return (
        <form onSubmit={handleSubmit} className={`flex items-center ${className}`}>
            <div className={`flex items-center shadow-lg rounded-lg overflow-hidden w-full ${maxWidth} bg-white border border-gray-300`}>
                <svg
                    className="w-5 h-5 text-gray-400 ml-3 bg-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                </svg>
                <input
                    type="text"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    placeholder={placeholder}
                    className={`flex-1 py-5 px-3 outline-none text-gray-700 bg-white ${inputClassName}`}
                />
                <button
                    type="submit"
                    onClick={handleSubmit}
                    style={{ backgroundColor: ctaColor }}
                    className="m-2 text-white font-semibold px-4 py-3 transition-colors rounded-md"
                >
                    {ctaText}
                </button>
            </div>
        </form>
    )
}

export default InputWithButton
