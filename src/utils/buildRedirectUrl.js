/**
 * Builds a redirect URL with encoded query parameters
 * @param {Object} params - Object containing name, email, phone, address, timestamp
 * @param {string} baseUrl - Base URL for redirect (defaults to current origin + /checkout)
 * @returns {string} URL with encoded query parameters
 */
export function buildRedirectUrl(params, baseUrl = null) {
  const {
    address = "",
    timestamp = new Date().toISOString(),
  } = params;

  const url = new URL(baseUrl);
  
  url.searchParams.set("interested_in_agent", true)
  if (address) url.searchParams.set("address", address);
  if (timestamp) url.searchParams.set("timestamp", timestamp);

  return url.toString();
}

