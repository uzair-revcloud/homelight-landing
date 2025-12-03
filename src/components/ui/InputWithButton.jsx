import React, { useState } from 'react'

const InputWithButton = ({
    ctaText = 'Send',
    ctaColor = '#2563eb',
    onSubmit,
    placeholder = '',
    className = '',
    inputClassName = '',
    buttonClassName = '',
}) => {
    const [value, setValue] = useState('')

    const handleSubmit = (e) => {
        if (e && e.preventDefault) e.preventDefault()
        if (typeof onSubmit === 'function') onSubmit(value)
    }

    return (
        <form onSubmit={handleSubmit} className={`flex items-center ${className}`}>
            <div className="flex items-center shadow-lg rounded-lg overflow-hidden w-full max-w-xl border border-gray-300">
                <div className="px-4 text-gray-400">🔍</div>
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
