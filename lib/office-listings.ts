/**
 * Full office inventory — used by both the home-page featured grid and the
 * detail pages at /business-centers/[id].
 *
 * All offices are at the same building (Damac Executive Heights, 19th Floor,
 * Barsha Heights / Tecom). Image assets live at /public/offices/ as
 * office-{id}-{n}.jpg, with office-{id}.jpg as the hero alias.
 */

export type OfficeAccent = "blue" | "stone" | "sand";

/** Maps to GroupCenter ids in lib/data.ts */
export type CenterId =
  | "smart-creation"
  | "smart-place"
  | "smart-view"
  | "future-space"
  | "abna-rashid";

export type OfficeListing = {
  id: string;
  slug: string;
  officeNo: string;
  title: string;
  category:
    | "Private office"
    | "Co-working"
    | "Dedicated desk"
    | "Virtual Office"
    | "Flexi Desk"
    | "Day Office"
    | "Meeting Room"
    | "Business Address"
    | "Telephone Answering";
  accent: OfficeAccent;

  // Location
  centerId: CenterId;
  centerName: string;
  building: string;
  location: string;
  floor: string;
  emirate: string;

  // Specs
  sqft?: string;
  capacity: string;
  view?: string;
  features: string[];

  // Price
  price: { amount: string; period: string; note?: string };
  paymentTerms?: string;
  paymentOptions?: string[];

  // Fees (already-standardised, per-office)
  fees: {
    securityDeposit: string;
    managementFee: string;
    ejariFee: string;
    ddaNoc?: string;
    vat: string;
    parking?: string;
  };

  // Availability
  availability: string;
  availabilityAccent: "live" | "upcoming";
  availableFrom?: string;

  // Media
  image: string;
  imageCount: number;

  // Marketing
  featured?: boolean;
  showOnHome?: boolean;
  description: string;
  highlights: string[];
};

const centerLocations: Record<
  CenterId,
  Pick<OfficeListing, "centerId" | "centerName" | "building" | "location" | "floor" | "emirate">
> = {
  "smart-creation": {
    centerId: "smart-creation",
    centerName: "Smart Creation Business Center",
    building: "Damac Executive Heights (Tecom)",
    location: "Jebel Ali Race Course Road",
    floor: "19th Floor",
    emirate: "Dubai, U.A.E.",
  },
  "smart-place": {
    centerId: "smart-place",
    centerName: "Smart Place Business Center",
    building: "Iridium Building",
    location: "Umm Suqeim Street, Al Barsha",
    floor: "Floor 226",
    emirate: "Dubai, U.A.E.",
  },
  "smart-view": {
    centerId: "smart-view",
    centerName: "Smart View Business Center",
    building: "Al Arif Building",
    location: "15A Street, Al Hamriya, Bur Dubai",
    floor: "Ground Floor",
    emirate: "Dubai, U.A.E.",
  },
  "future-space": {
    centerId: "future-space",
    centerName: "Future Space Business Center",
    building: "Dubai Municipality Building, Block A",
    location: "Salah Al Din Street, Al Muraqabat",
    floor: "2nd Floor",
    emirate: "Dubai, U.A.E.",
  },
  "abna-rashid": {
    centerId: "abna-rashid",
    centerName: "Abna Rashid Hamd Bin Huwaidi Building",
    building: "Abna Rashid Hamd Bin Huwaidi Building",
    location: "Street 27A, Al Nakhal · Naif, Deira",
    floor: "Various floors",
    emirate: "Dubai, U.A.E.",
  },
};

const standardFees = {
  securityDeposit: "AED 5,000",
  managementFee: "AED 1,500",
  ejariFee: "AED 500",
  ddaNoc: "AED 1,400",
  vat: "5%",
  parking: "AED 3,500 / yr (optional)",
};

const coworkingFees = {
  securityDeposit: "AED 1,000",
  managementFee: "AED 500",
  ejariFee: "–",
  ddaNoc: "–",
  vat: "5%",
  parking: "AED 4,000 / yr (optional)",
};

const flexFees = {
  securityDeposit: "AED 3,000",
  managementFee: "AED 1,500",
  ejariFee: "AED 500",
  ddaNoc: "–",
  vat: "5%",
  parking: "AED 3,500 / yr (optional)",
};

export const officeListings: OfficeListing[] = [
  {
    id: "office-14",
    slug: "office-14",
    officeNo: "Office 14",
    title: "Team Suite",
    category: "Private office",
    accent: "blue",
    ...centerLocations["smart-creation"],
    sqft: "300 sq ft",
    capacity: "4–5 desks",
    view: "Skyline",
    features: ["Furnished", "Door signage", "24/7 access", "Kitchenette access", "Meeting room credits"],
    price: { amount: "80,000", period: "/ year", note: "From AED" },
    paymentTerms: "4 payments",
    paymentOptions: ["4 cheques"],
    fees: standardFees,
    availability: "Available now",
    availabilityAccent: "live",
    image: "/offices/office-14.jpg",
    imageCount: 7,
    featured: true,
    showOnHome: true,
    description:
      "Our largest available suite on the 19th floor. The Team Suite accommodates a four-to-five person team with room for a small meeting table and storage. Floor-to-ceiling glazing along one wall, direct entry off the reception corridor, and a dedicated signage strip on the door. Your clients walk into your brand, not ours.",
    highlights: [
      "300 sq ft · 4–5 desks",
      "Direct reception-corridor entry",
      "Door signage included",
      "24/7 keycard access",
      "Four-payment schedule",
    ],
  },
  {
    id: "office-17",
    slug: "office-17",
    officeNo: "Office 17",
    title: "Corner Suite",
    category: "Private office",
    accent: "blue",
    ...centerLocations["smart-creation"],
    sqft: "290 sq ft",
    capacity: "3–4 desks",
    view: "Skyline",
    features: ["Furnished", "Door signage", "24/7 access", "Corner windows"],
    price: { amount: "78,000", period: "/ year", note: "From AED" },
    paymentTerms: "4 payments",
    paymentOptions: ["4 cheques"],
    fees: standardFees,
    availability: "Available now",
    availabilityAccent: "live",
    image: "/offices/office-17.jpg",
    imageCount: 6,
    showOnHome: true,
    description:
      "Two-sided glazing in this corner office gives you double the daylight of a standard suite. Comfortable for a three-to-four person team, with a long desk line along one wall and space for a round meeting table. A favourite with design and creative teams.",
    highlights: [
      "290 sq ft · 3–4 desks",
      "Corner windows for double daylight",
      "Door signage included",
      "24/7 keycard access",
    ],
  },
  {
    id: "office-09",
    slug: "office-09",
    officeNo: "Office 09",
    title: "Executive Studio",
    category: "Private office",
    accent: "blue",
    ...centerLocations["smart-place"],
    sqft: "200 sq ft",
    capacity: "2–3 desks",
    view: "Tecom",
    features: ["Furnished", "Flexible payment", "24/7 access", "Door signage"],
    price: { amount: "65,000", period: "/ year", note: "From AED" },
    paymentTerms: "1–2 payments (or 70,000 in 4 payments)",
    paymentOptions: ["1 cheque", "2 cheques", "4 cheques (at AED 70,000)"],
    fees: standardFees,
    availability: "Available now",
    availabilityAccent: "live",
    image: "/offices/office-09.jpg",
    imageCount: 8,
    featured: true,
    showOnHome: true,
    description:
      "A well-proportioned two-to-three person studio with the most flexible payment terms of any unit on the floor. Take it at AED 65,000 in one or two cheques, or stretch across four at AED 70,000. Comes fully furnished and move-in ready.",
    highlights: [
      "200 sq ft · 2–3 desks",
      "Flexible payment: 1, 2 or 4 cheques",
      "AED 65,000 in 1–2 cheques",
      "AED 70,000 in 4 cheques",
      "Door signage included",
    ],
  },
  {
    id: "office-16",
    slug: "office-16",
    officeNo: "Office 16",
    title: "Compact Suite",
    category: "Private office",
    accent: "blue",
    ...centerLocations["smart-place"],
    sqft: "190 sq ft",
    capacity: "2 desks",
    view: "Internal",
    features: ["Furnished", "Door signage", "24/7 access"],
    price: { amount: "60,000", period: "/ year", note: "From AED" },
    fees: standardFees,
    availability: "Available now",
    availabilityAccent: "live",
    image: "/offices/office-16.jpg",
    imageCount: 6,
    showOnHome: true,
    description:
      "A tidy two-desk private studio, ideal for founders-plus-one setups or single-operator businesses that need a proper door with a nameplate. Fully furnished with two desks, chairs, and a small storage cabinet.",
    highlights: [
      "190 sq ft · 2 desks",
      "Door signage included",
      "Fully furnished",
      "24/7 keycard access",
    ],
  },
  {
    id: "office-37",
    slug: "office-37",
    officeNo: "Office 37",
    title: "Studio",
    category: "Private office",
    accent: "blue",
    ...centerLocations["smart-view"],
    sqft: "200 sq ft",
    capacity: "2–3 desks",
    view: "Internal",
    features: ["Furnished", "Door signage", "24/7 access"],
    price: { amount: "55,000", period: "/ year", note: "From AED" },
    fees: standardFees,
    availability: "Available now",
    availabilityAccent: "live",
    image: "/offices/office-37.jpg",
    imageCount: 6,
    description:
      "A 200 sq ft private studio at one of our most competitive price points. Fits two to three desks, furnished and ready to occupy. A strong choice for cost-conscious founders who still need a licensed office for visa quota.",
    highlights: [
      "200 sq ft · 2–3 desks",
      "Best value at this size",
      "Door signage included",
      "24/7 keycard access",
    ],
  },
  {
    id: "office-48",
    slug: "office-48",
    officeNo: "Office 48",
    title: "Studio",
    category: "Private office",
    accent: "blue",
    ...centerLocations["smart-view"],
    sqft: "200 sq ft",
    capacity: "2–3 desks",
    view: "Internal",
    features: ["Furnished", "Door signage", "24/7 access"],
    price: { amount: "55,000", period: "/ year", note: "From AED" },
    fees: standardFees,
    availability: "Available now",
    availabilityAccent: "live",
    image: "/offices/office-48.jpg",
    imageCount: 4,
    description:
      "Identical in size and fit-out to Office 37: a 200 sq ft private studio for two to three desks. Separate location on the floor; pick the one with the layout your team prefers.",
    highlights: [
      "200 sq ft · 2–3 desks",
      "Alternative layout to Office 37",
      "Door signage included",
      "24/7 keycard access",
    ],
  },
  {
    id: "office-32",
    slug: "office-32",
    officeNo: "Office 32",
    title: "Solo Studio",
    category: "Private office",
    accent: "blue",
    ...centerLocations["future-space"],
    sqft: "100 sq ft",
    capacity: "1 desk",
    view: "Internal",
    features: ["Furnished", "24/7 access"],
    price: { amount: "35,000", period: "/ year", note: "From AED" },
    fees: standardFees,
    availability: "From 1 Feb 2026",
    availabilityAccent: "upcoming",
    availableFrom: "2026-02-01",
    image: "/offices/office-32.jpg",
    imageCount: 6,
    description:
      "Our smallest private office: a 100 sq ft single-desk unit with a proper door. Perfect for a solo consultant or freelancer who needs their own lockable, licensed space for visa and banking KYC purposes.",
    highlights: [
      "100 sq ft · 1 desk",
      "Smallest private unit on the floor",
      "Releases 1 Feb 2026",
      "24/7 keycard access",
    ],
  },
  {
    id: "office-49",
    slug: "office-49",
    officeNo: "Co-working",
    title: "Shared Workspace",
    category: "Co-working",
    accent: "stone",
    ...centerLocations["smart-creation"],
    capacity: "Flex hot desk",
    features: ["Separate entrance", "Lounge", "Coffee bar", "Meeting credits"],
    price: { amount: "7,000", period: "/ year", note: "From AED" },
    paymentTerms: "Without Ejari",
    fees: coworkingFees,
    availability: "Available now",
    availabilityAccent: "live",
    image: "/offices/office-49.jpg",
    imageCount: 5,
    showOnHome: true,
    description:
      "Our co-working lounge has a separate main entrance off the lift lobby, so you and your visitors don't go through the private-office corridor. Hot-desk seating, a coffee bar, printer, and meeting-room credits. Lowest-commitment plan on the floor.",
    highlights: [
      "Separate main entrance",
      "Hot desk: no reservation needed",
      "Coffee bar + lounge",
      "Meeting-room credits included",
      "No Ejari required",
    ],
  },
  {
    id: "office-51",
    slug: "office-51",
    officeNo: "Flex space",
    title: "Dedicated & Shared",
    category: "Dedicated desk",
    accent: "sand",
    ...centerLocations["future-space"],
    capacity: "1 desk · locker",
    features: ["Meeting rooms incl.", "Ejari option", "Lockable storage", "Parking optional"],
    price: { amount: "10,000", period: "/ year", note: "From AED" },
    paymentTerms: "Without Ejari · AED 15,000 with Ejari",
    paymentOptions: ["Dedicated desk without Ejari: AED 10,000", "Dedicated desk with Ejari: AED 15,000", "Shared desk without Ejari: AED 10,000", "Shared desk with Ejari: AED 15,000"],
    fees: flexFees,
    availability: "Available now",
    availabilityAccent: "live",
    image: "/offices/office-51.jpg",
    imageCount: 5,
    showOnHome: true,
    description:
      "A step up from co-working: your own dedicated desk with a locker, inside a smaller shared room. Includes meeting-room access and optional parking. Choose the Ejari-included plan if you need the office on your trade licence for visa sponsorship.",
    highlights: [
      "Dedicated desk + locker",
      "Meeting rooms included",
      "Ejari-included plan available",
      "Optional parking (AED 3,500/yr)",
    ],
  },
  {
    id: "office-50",
    slug: "office-50",
    officeNo: "Office 50",
    title: "Showcase Suite",
    category: "Private office",
    accent: "blue",
    ...centerLocations["abna-rashid"],
    capacity: "Contact for details",
    features: ["Furnished", "Door signage", "24/7 access"],
    price: { amount: "On request", period: "", note: "Price" },
    fees: standardFees,
    availability: "Contact to confirm",
    availabilityAccent: "upcoming",
    image: "/offices/office-50.jpg",
    imageCount: 10,
    description:
      "A photogenic private suite on the 19th floor. We're finalising the pricing; contact us for the current package and viewing appointment.",
    highlights: [
      "Private furnished office",
      "Ten photographs on file",
      "Pricing on request",
    ],
  },
];

export function getOfficeListing(id: string): OfficeListing | undefined {
  return officeListings.find((o) => o.id === id);
}

export function getHomeOffices(): OfficeListing[] {
  return officeListings.filter((o) => o.showOnHome);
}

export function getSimilarOffices(
  current: OfficeListing,
  limit = 3
): OfficeListing[] {
  const sameCategory = officeListings.filter(
    (o) => o.id !== current.id && o.category === current.category
  );
  if (sameCategory.length >= limit) return sameCategory.slice(0, limit);
  const others = officeListings.filter(
    (o) => o.id !== current.id && !sameCategory.includes(o)
  );
  return [...sameCategory, ...others].slice(0, limit);
}

/** Build the full image array for a listing. */
export function getOfficeImages(listing: OfficeListing): string[] {
  return Array.from(
    { length: listing.imageCount },
    (_, i) => `/offices/${listing.slug}-${i + 1}.jpg`
  );
}
