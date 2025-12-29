import { useEffect, useState } from "react";

export function useGeolocationPermission() {
  const [permission, setPermission] = useState("unknown");

  useEffect(() => {
    // Only check permissions if geolocation is enabled via environment variable
    if (import.meta.env.VITE_ENABLE_GEOLOCATION !== "true") {
      setPermission("disabled");
      return;
    }

    if (!("geolocation" in navigator)) {
      setPermission("browser_disabled");
      return;
    }

    if (!("permissions" in navigator)) {
      setPermission("unsupported");
      return;
    }

    let permissionStatus;

    navigator.permissions
      .query({ name: "geolocation" })
      .then((status) => {
        permissionStatus = status;

        // Initial state
        setPermission(status.state);

        // Listen for changes
        status.onchange = () => {
          setPermission(status.state);
        };
      })
      .catch(() => {
        setPermission("unknown");
      });

    return () => {
      if (permissionStatus) {
        permissionStatus.onchange = null;
      }
    };
  }, []);

  return permission;
}
