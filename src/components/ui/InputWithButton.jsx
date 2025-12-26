import React, { useState, useEffect, useRef } from "react";
import { trackQuizStart, trackPartialQuizSubmit } from "../../analytics/quiz";
import { buildRedirectUrl } from "../../utils/buildRedirectUrl";

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
  pageData = {},
  callIdentityAPIWithAddress,
}) => {
  const [inputValue, setInputValue] = useState(value || "");
  const [suggestions, setSuggestions] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const dropdownRef = useRef();

  // Keep internal state in sync for initial prefill (don’t clobber user typing)
  useEffect(() => {
    if (!value) return;
    setInputValue((prev) => (prev ? prev : value));
  }, [value]);

  const handleRedirect = (address) => {
    if (isLoading) return; // Prevent multiple redirects

    setIsLoading(true);
    const redirectUrl = buildRedirectUrl(
      {
        address: address || inputValue || "",
        name: pageData?.prepop_name || "",
        phone: pageData?.prepop_phone || "",
        email: pageData?.prepop_email || "",
      },
      "https://www.homelight.com/simple-sale/quiz"
    );
    // window.location.href = redirectUrl;
    window.open(redirectUrl, "_blank");
  };

  const handleSubmit = async (e) => {
    if (e && e.preventDefault) e.preventDefault();
    if (typeof onSubmit === "function") onSubmit(inputValue);
    setShowDropdown(false);
    setIsLoading(true);

    // Call identity API with the new address (takes final precedence)
    if (callIdentityAPIWithAddress && inputValue) {
      await callIdentityAPIWithAddress(inputValue);
    }

    await trackQuizStart(inputValue, "address_search", {
      address_chosen: "manual",
    });
    await trackPartialQuizSubmit(inputValue, inputValue, "address_search", {
      address_chosen: "manual",
    });
    setIsLoading(false);
    handleRedirect(inputValue);
  };

  // Fetch suggestions from Mapbox API
  useEffect(() => {
    // Only fetch when the user is actively interacting (dropdown is open).
    // This prevents burning Mapbox calls for prefilled/initial values.
    if (!showDropdown || !mapboxToken || !inputValue) {
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
  }, [inputValue, mapboxToken, showDropdown]);

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

  const handleSelectSuggestion = async (place) => {
    setInputValue(place.place_name);
    setShowDropdown(false);
    setIsLoading(true);

    // Call identity API with the selected address (takes final precedence)
    if (callIdentityAPIWithAddress && place.place_name) {
      await callIdentityAPIWithAddress(place.place_name);
    }

    // Fire both quiz events when user selects from dropdown
    await trackQuizStart(place.place_name, "address_search", {
      address_chosen: "dropdown",
    });
    await trackPartialQuizSubmit(
      place.place_name,
      inputValue,
      "address_search",
      { address_chosen: "dropdown" }
    );
    setIsLoading(false);
    // Redirect to checkout URL with encoded params
    handleRedirect(place.place_name);
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
          disabled={isLoading}
          style={{ backgroundColor: ctaColor, opacity: isLoading ? 0.7 : 1 }}
          className="hidden md:block m-2 text-white font-semibold px-4 py-3 transition-colors rounded-md cursor-pointer disabled:cursor-not-allowed disabled:opacity-70"
        >
          {isLoading ? (
            <span className="flex items-center gap-2">
              <svg
                className="animate-spin h-4 w-4 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Loading...
            </span>
          ) : (
            ctaText
          )}
        </button>
      </div>

      <button
        type="submit"
        onClick={handleSubmit}
        disabled={isLoading}
        style={{ backgroundColor: ctaColor, opacity: isLoading ? 0.7 : 1 }}
        className="md:hidden w-full mt-4 text-white font-semibold px-4 py-4 transition-colors rounded-md shadow-lg cursor-pointer disabled:cursor-not-allowed disabled:opacity-70"
      >
        {isLoading ? (
          <span className="flex items-center justify-center gap-2">
            <svg
              className="animate-spin h-4 w-4 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            Loading...
          </span>
        ) : (
          ctaText
        )}
      </button>
    </form>
  );
};

export default InputWithButton;
