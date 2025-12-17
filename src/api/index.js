export const BASE_URL = "https://api.palisade.ai";

export const validateLandingPage = async (data) => {
  const response = await fetch(`${BASE_URL}/checkout/prepop/v2/validate/landing-page`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.json();
};
