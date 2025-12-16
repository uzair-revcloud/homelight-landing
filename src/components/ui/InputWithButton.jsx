import React, { useState, useEffect, useRef } from "react";
import { trackQuizStart, trackPartialQuizSubmit } from "../../analytics/quiz";

const InputWithButton = ({
  ctaText = "Send",
  ctaColor = "#2563eb",
  onSubmit,
  placeholder = "",
  className = "",
  value,
  inputClassName = "",
  maxWidth = "max-w-xl",
  mapboxToken,
}) => {
  const [inputValue, setInputValue] = useState(value || "");
  const [suggestions, setSuggestions] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef();

  const handleSubmit = (e) => {
    if (e && e.preventDefault) e.preventDefault();
    if (typeof onSubmit === "function") onSubmit(inputValue);
    setShowDropdown(false);
  };

  // Fetch suggestions from Mapbox API
  useEffect(() => {
    if (!mapboxToken || !inputValue) {
      setSuggestions([]);
      return;
    }

    const controller = new AbortController();
    // Set a debounce timeout
    const debounceTimeout = setTimeout(async () => {
      try {
        if (inputValue) {
          const res = await fetch(
            `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
              inputValue
            )}.json?autocomplete=true&access_token=${mapboxToken}&country=us&types=address`,
            { signal: controller.signal }
          );
          const data = await res.json();
          setSuggestions(data.features || []);
        }
      } catch (err) {
        if (err.name !== "AbortError") console.error(err);
      }
    }, 300); // 300ms debounce

    return () => {
      clearTimeout(debounceTimeout);
      controller.abort();
    };
  }, [inputValue, mapboxToken]);

  // Handle clicking outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelectSuggestion = (place) => {
    setInputValue(place.place_name);
    setShowDropdown(false);
    // Fire both quiz events when user selects from dropdown
    trackQuizStart(place.place_name, "address_search");
    trackPartialQuizSubmit(place.place_name, inputValue, "address_search");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`flex flex-col md:flex-row md:items-center ${className}`}
    >
      <div
        className={`relative flex items-center shadow-lg rounded-lg w-full ${maxWidth} bg-white border border-gray-300 md:flex-1`}
        ref={dropdownRef}
      >
        <svg
          className="w-5 h-5 text-gray-400 ml-3 shrink-0"
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
          value={inputValue}
          placeholder={placeholder}
          className={`flex-1 py-5 px-3 outline-none text-gray-700 bg-white min-w-0 ${inputClassName}`}
          onChange={(e) => {
            setInputValue(e.target.value);
            setShowDropdown(true);
          }}
          autoComplete="off"
        />

        {showDropdown && suggestions.length > 0 && (
          <ul className="absolute z-999 top-full left-0 right-0 bg-white text-gray-700 border border-gray-300 mt-1 max-h-60 overflow-y-auto rounded-md shadow-lg">
            {suggestions.map((s) => (
              <li
                key={s.id}
                className="px-3 py-2 hover:bg-gray-100 cursor-pointer text-sm border-b border-gray-100"
                onClick={() => handleSelectSuggestion(s)}
              >
                {s.place_name}
              </li>
            ))}
          </ul>
        )}

        <button
          type="submit"
          onClick={handleSubmit}
          style={{ backgroundColor: ctaColor }}
          className="hidden md:block m-2 text-white font-semibold px-4 py-3 transition-colors rounded-md"
        >
          {ctaText}
        </button>
      </div>

      <button
        type="submit"
        onClick={handleSubmit}
        style={{ backgroundColor: ctaColor }}
        className="md:hidden w-full mt-4 text-white font-semibold px-4 py-4 transition-colors rounded-md shadow-lg"
      >
        {ctaText}
      </button>
    </form>
  );
};

export default InputWithButton;
