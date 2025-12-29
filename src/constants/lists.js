export const FAQS_LIST = [
  {
    question: "Who is buying my home?",
    answer: `${
      import.meta.env.VITE_BRAND_NAME || "Trusted Home Offers"
    } has built a nationwide network of hundreds of pre-approved real estate cash buyers or investors. We let them compete to buy your home, so you can get the best offer.`,
  },
  {
    question: "Do I need an agent to participate?",
    answer: `No, you do not need an agent to request offers with ${
      import.meta.env.VITE_BRAND_NAME || "Trusted Home Offers"
    }.`,
  },
  {
    question: "Can I sell a home that's currently listed?",
    answer:
      "If you're looking to sell your home fast and skip the showing process, we are happy to work with you to find the best solution that meets your needs.",
  },
  {
    question: "Do I have to move right away?",
    answer:
      "No. You'll have the flexibility to pick a move date that works for your schedule up to 30 days from closing.",
  },
  {
    question: "Is there a cost to request offers?",
    answer: `No. Requesting an offer from ${
      import.meta.env.VITE_BRAND_NAME || "Trusted Home Offers"
    } is completely free.`,
  },
  {
    question: "Am I obligated to accept an offer?",
    answer: `No, you are not obligated to accept any ${
      import.meta.env.VITE_BRAND_NAME || "Trusted Home Offers"
    } offer you receive.`,
  },
];

export const PROPERTIES_LIST = [
  {
    id: 1,
    price: "$1,299,000",
    address: "6508 Mira Vista Lane San Diego, CA",
    beds: 3,
    baths: 2,
    sqft: 1753,
    daysSold: 5,
    image:
      "/views/simple-sale-replica-without-checkout-features/images/property_image.webp",
  },
  {
    id: 2,
    price: "$1,699,000",
    address: "1210 Anita Pl Fullerton, CA",
    beds: 4,
    baths: 3,
    sqft: 2856,
    daysSold: 4,
    image:
      "/views/simple-sale-replica-without-checkout-features/images/property_image.webp",
  },
  {
    id: 3,
    price: "$599,999",
    address: "6913 Basswood Place Rancho Cucamonga, CA",
    beds: 3,
    baths: 2,
    sqft: 1280,
    daysSold: 12,
    image:
      "/views/simple-sale-replica-without-checkout-features/images/property_image.webp",
  },
  {
    id: 4,
    price: "$2,150,000",
    address: "4521 Ocean View Dr Los Angeles, CA",
    beds: 5,
    baths: 4,
    sqft: 3200,
    daysSold: 3,
    image:
      "/views/simple-sale-replica-without-checkout-features/images/property_image.webp",
  },
  {
    id: 5,
    price: "$875,000",
    address: "2341 Maple Street Sacramento, CA",
    beds: 3,
    baths: 2,
    sqft: 1650,
    daysSold: 7,
    image:
      "/views/simple-sale-replica-without-checkout-features/images/property_image.webp",
  },
  {
    id: 6,
    price: "$1,299,000",
    address: "6508 Mira Vista Lane San Diego, CA",
    beds: 5,
    baths: 4,
    sqft: 2856,
    daysSold: 1,
    image:
      "/views/simple-sale-replica-without-checkout-features/images/property_image.webp",
  },
];

export const TABLE_ROWS = [
  { label: "Cash offer within a week", traditional: false, simpleSale: true },
  { label: "No repairs or updates", traditional: false, simpleSale: true },
  { label: "No listing or showings", traditional: false, simpleSale: true },
  {
    label: "No offer negotiation or buyer demands",
    traditional: false,
    simpleSale: true,
  },
  {
    label: "No home sale contingency on next home purchase",
    traditional: false,
    simpleSale: true,
  },
  {
    label: "No expensive double mortgage, bridge loan, or interim housing",
    traditional: false,
    simpleSale: true,
  },
  {
    label: "Close in as little as 10 days",
    traditional: false,
    simpleSale: true,
  },
];

export const FEATURES_LIST = [
  {
    icon: "https://d1xt9s86fx9r45.cloudfront.net/assets/hl-production/packs/media/components/icons/purchase-price-772382e79d22664be34b77438a5fcc1a.png",
    title: "Get our best offer",
    description:
      "We use neighborhood data and local market experts to present the best offer to you. There's no upfront cost for repairs and we never charge a program fee or closing costs.",
  },
  {
    icon: "https://d1xt9s86fx9r45.cloudfront.net/assets/hl-production/packs/media/components/icons/choose-date-b9ae74b57c52d9f2dc1fb22c849cd9c9.png",
    title: "Sell when you're ready",
    description:
      "There's no need to prep. When you're ready, our dedicated Client Advisor will take care of everything.",
  },
  {
    icon: "https://d1xt9s86fx9r45.cloudfront.net/assets/hl-production/packs/media/components/icons/work-together-260856c01ace9309ce6f10567d0bef3c.png",
    title: "Sell fast and confidently",
    description: "We can put cash in your hand in as few as 10 days.",
  },
];

export const CLIENTS_LIST = [
  {
    image:
      "/views/simple-sale-replica-without-checkout-features/images/client.jpg",
    name: "Kevin L.",
    role: `${import.meta.env.VITE_BRAND_NAME || "Trusted Home Offers"} Client`,
    quote:
      "From the initial phone consultation, to the closing of escrow, the entire process was so quick and simple. Everyone was extremely helpful, responsive, and professional.",
  },
  {
    image:
      "/views/simple-sale-replica-without-checkout-features/images/client-2.jpg",
    name: "Traci M.",
    role: `${import.meta.env.VITE_BRAND_NAME || "Trusted Home Offers"} Client`,
    quote: `${
      import.meta.env.VITE_BRAND_NAME || "Trusted Home Offers"
    } helped match me with a cash buyer within days. The process was extremely easy and efficient. I would definitely recommend ${
      import.meta.env.VITE_BRAND_NAME || "Trusted Home Offers"
    } to anyone trying to sell their home.`,
  },
];
