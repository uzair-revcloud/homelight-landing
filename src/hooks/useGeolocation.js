import { useState, useCallback } from "react";

export function useGeolocation() {
  const [coords, setCoords] = useState(null);
  const [address, setAddress] = useState(null);
  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const [error, setError] = useState(null);

  const requestLocation = useCallback(() => {
    if (!("geolocation" in navigator)) {
      setError("Geolocation not supported");
      setStatus("error");
      return;
    }

    setStatus("loading");

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude, longitude } = pos.coords;
        setCoords({ latitude, longitude });

        try {
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&accept-language=en&zoom=18&lat=${latitude}&lon=${longitude}`,
            {
              headers: {
                // IMPORTANT for Nominatim usage policy
                "User-Agent": "HomeLight Landing Page",
              },
            }
          );

          const data = await res.json();
          setAddress(data.display_name || null);
          setStatus("success");
        } catch (err) {
          setError("Reverse geocoding failed");
          setStatus("error");
        }
      },
      (err) => {
        setError(err.message);
        setStatus("error");
      },
      {
        enableHighAccuracy: true,
        timeout: 30000,
        maximumAge: 0,
      }
    );
  }, []);

  return {
    requestLocation,
    coords,
    address,
    status,
    error,
  };
}

