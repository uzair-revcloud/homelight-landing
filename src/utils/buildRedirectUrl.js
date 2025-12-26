/**
 * Builds a redirect URL with encoded query parameters
 * @param {Object} params - Object containing name, email, phone, address
 * @param {string} baseUrl - Base URL for redirect (defaults to current origin + /checkout)
 * @returns {string} URL with encoded query parameters
 */
export function buildRedirectUrl(params, baseUrl = null) {
  const {
    address = "",
    phone = "",
    name = "",
    email = "",
  } = params;

  const url = new URL(baseUrl);

  url.searchParams.set("interested_in_agent", true)
  if (address) url.searchParams.set("address", address);
  if (name) url.searchParams.set("n", btoa(name));
  if (phone) url.searchParams.set("p", btoa(phone));
  if (email) url.searchParams.set("email", btoa(email));
  return url.toString();
}

