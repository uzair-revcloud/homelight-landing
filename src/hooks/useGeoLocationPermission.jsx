import { useEffect, useState } from "react";

export function useGeolocationPermission() {
  const [permission, setPermission] = useState("unknown");

  useEffect(() => {
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
        setPermission(status.state); // granted | prompt | denied

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
