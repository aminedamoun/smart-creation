/**
 * Seed Supabase with the 6 centres + the static office listings.
 *
 *   npx tsx scripts/seed-supabase.mts
 *
 * Idempotent: refuses to run if tables aren't empty unless --force is passed.
 */
import { readFileSync } from "fs";
import path from "path";
import { createClient } from "@supabase/supabase-js";

try {
  const env = readFileSync(path.resolve(process.cwd(), ".env.local"), "utf8");
  for (const line of env.split("\n")) {
    const m = line.match(/^([A-Z0-9_]+)=(.*)$/);
    if (m && !process.env[m[1]]) process.env[m[1]] = m[2];
  }
} catch {
  /* ignore */
}

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!url || !key) {
  console.error("Missing NEXT_PUBLIC_SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY");
  process.exit(1);
}
const FORCE = process.argv.includes("--force");

const sb = createClient(url, key, { auth: { persistSession: false } });

const SC_PHONE = "+97143939099";
const SC_EMAIL = "info@thesmartcreation.com";

type CentreSeed = {
  key: string;
  name: string;
  tagline: string;
  description: string;
  building: string;
  location: string;
  address_line: string;
  emirate: string;
  google_maps_url: string;
  phone: string;
  email: string;
  hero_image: string;
  display_order: number;
  advantages: { title: string; description: string }[];
  nearby: { name: string; category: string; distance: string }[];
  gallery: { url: string; caption?: string }[];
};

const centres: CentreSeed[] = [
  {
    key: "smart-creation",
    name: "Smart Creation Business Center",
    tagline: "Our flagship centre — 19th-floor Tecom skyline views.",
    description:
      "Smart Creation Business Center sits on the 19th floor of Damac Executive Heights, one of Tecom's most recognised commercial towers. Tenants get sweeping views over Sheikh Zayed Road, walk-in distance to two metro stations, and a fully-serviced floor with reception, meeting rooms, and concierge services.",
    building: "Damac Executive Heights (Tecom)",
    location: "Jebel Ali Race Course Road",
    address_line:
      "19th Floor, Damac Executive Heights, Jebel Ali Race Course Road, Tecom (Barsha Heights), Dubai",
    emirate: "Dubai, U.A.E.",
    google_maps_url: "https://maps.google.com/?q=Damac+Executive+Heights+Dubai",
    phone: SC_PHONE,
    email: SC_EMAIL,
    hero_image: "/damac-executive.webp",
    display_order: 10,
    advantages: [
      { title: "Skyline-view offices", description: "19th-floor windows overlooking Sheikh Zayed Road and JBR." },
      { title: "Two metro stations within 8 min walk", description: "Internet City and Dubai Internet City stations both serve the building." },
      { title: "Fitted meeting rooms", description: "Three private meeting rooms available from AED 200/hr." },
      { title: "Reception & PRO services on-site", description: "Visa, Ejari, banking introductions handled in-house." },
      { title: "DEWA, internet, A/C included", description: "All utilities bundled in the rent — no surprise bills." },
      { title: "24/7 secure access", description: "Card-key entry; cameras on every floor." },
    ],
    nearby: [
      { name: "Internet City Metro", category: "metro", distance: "8 min walk" },
      { name: "Dubai Internet City Metro", category: "metro", distance: "10 min walk" },
      { name: "Mall of the Emirates", category: "mall", distance: "8 min drive" },
      { name: "JBR / The Beach", category: "landmark", distance: "12 min drive" },
      { name: "Dubai Marina", category: "landmark", distance: "10 min drive" },
      { name: "Mediclinic Mirdif (Tecom branch)", category: "hospital", distance: "5 min drive" },
    ],
    gallery: [
      { url: "/reception.jpg", caption: "Reception" },
      { url: "/building/building-1.jpg", caption: "Lobby" },
      { url: "/building/building-2.jpg", caption: "Meeting room" },
      { url: "/building/building-3.jpg", caption: "Co-working area" },
    ],
  },
  {
    key: "smart-place",
    name: "Smart Place Business Center",
    tagline: "Al Barsha — minutes from Mall of the Emirates.",
    description:
      "Located on Umm Suqeim Street in the heart of Al Barsha, Smart Place gives you fast access to the Mall of the Emirates, Sheikh Zayed Road, and the residential heart of the city. Compact furnished suites priced for solo founders and small teams.",
    building: "Iridium Building",
    location: "Umm Suqeim Street, Al Barsha",
    address_line: "Iridium Building, Umm Suqeim Street, Al Barsha, Dubai",
    emirate: "Dubai, U.A.E.",
    google_maps_url: "https://maps.google.com/?q=Iridium+Building+Al+Barsha+Dubai",
    phone: SC_PHONE,
    email: SC_EMAIL,
    hero_image: "/building/building-4.jpg",
    display_order: 20,
    advantages: [
      { title: "5 min walk to MoE", description: "Lunch options, retail, and the Mall of the Emirates metro all within walking distance." },
      { title: "Compact furnished suites", description: "Right-sized for 1–4 person teams." },
      { title: "Free guest parking", description: "Validated parking for visitors and clients." },
      { title: "Direct Sheikh Zayed Road access", description: "Two minutes to the SZR on/off ramp." },
      { title: "On-site PRO services", description: "Visa renewals and Ejari handled in the same building." },
    ],
    nearby: [
      { name: "Mall of the Emirates", category: "mall", distance: "5 min walk" },
      { name: "Mall of the Emirates Metro", category: "metro", distance: "7 min walk" },
      { name: "Kempinski Hotel MoE", category: "hotel", distance: "5 min walk" },
      { name: "Sharaf DG Metro", category: "metro", distance: "10 min drive" },
      { name: "American Hospital (Al Barsha)", category: "hospital", distance: "6 min drive" },
    ],
    gallery: [
      { url: "/building/building-4.jpg", caption: "Building exterior" },
      { url: "/building/building-5.jpg", caption: "Floor entrance" },
    ],
  },
  {
    key: "smart-view",
    name: "Smart View Business Center",
    tagline: "Bur Dubai — heart of old Dubai trading.",
    description:
      "Smart View sits in the historic Bur Dubai trading district at Al Hamriya. Ground-floor offices with great street visibility, ideal for retail-adjacent businesses, traders, and consulting firms working with the gold and textile markets.",
    building: "Al Arif Building",
    location: "15A Street, Al Hamriya, Bur Dubai",
    address_line: "Al Arif Building, 15A Street, Al Hamriya, Bur Dubai",
    emirate: "Dubai, U.A.E.",
    google_maps_url: "https://maps.google.com/?q=Al+Arif+Building+Bur+Dubai",
    phone: SC_PHONE,
    email: SC_EMAIL,
    hero_image: "/building/building-6.jpg",
    display_order: 30,
    advantages: [
      { title: "Ground-floor visibility", description: "Walk-in trade clients and signage opportunities." },
      { title: "Adjacent to gold & textile souks", description: "Walking distance to the Dubai gold and textile markets." },
      { title: "Lower setup fees", description: "Most affordable starting price across our centres." },
      { title: "Free Ejari processing", description: "Trade licence-friendly with same-day Ejari." },
    ],
    nearby: [
      { name: "Al Fahidi Metro", category: "metro", distance: "8 min walk" },
      { name: "BurJuman Mall", category: "mall", distance: "6 min drive" },
      { name: "Dubai Museum", category: "landmark", distance: "10 min walk" },
      { name: "Gold Souk", category: "landmark", distance: "12 min drive" },
      { name: "Bur Dubai Abra Station", category: "landmark", distance: "10 min walk" },
    ],
    gallery: [
      { url: "/building/building-6.jpg", caption: "Building exterior" },
      { url: "/building/building-7.jpg", caption: "Reception area" },
    ],
  },
  {
    key: "future-space",
    name: "Future Space Business Center",
    tagline: "Deira — close to Salah Al Din metro.",
    description:
      "Future Space is in the Dubai Municipality Building on Salah Al Din Street, one of Deira's most established commercial corridors. A practical second-floor centre with everything a small business needs — meeting rooms, banking partners across the street, and direct metro access.",
    building: "Dubai Municipality Building, Block A",
    location: "Salah Al Din Street, Al Muraqabat",
    address_line: "Block A, 2nd Floor, Dubai Municipality Building, Salah Al Din Street, Al Muraqabat, Deira",
    emirate: "Dubai, U.A.E.",
    google_maps_url: "https://maps.google.com/?q=Dubai+Municipality+Salah+Al+Din",
    phone: SC_PHONE,
    email: SC_EMAIL,
    hero_image: "/building/building-8.jpg",
    display_order: 40,
    advantages: [
      { title: "5 min walk to Salah Al Din Metro", description: "Direct access to the green line." },
      { title: "Banking corridor", description: "ENBD, Mashreq, ADIB and FAB branches within 200m." },
      { title: "DDA NOC ready", description: "All licensing paperwork handled in-house." },
      { title: "Affordable team rooms", description: "Best price-per-desk for 4–6 person teams." },
    ],
    nearby: [
      { name: "Salah Al Din Metro", category: "metro", distance: "5 min walk" },
      { name: "Al Mulla Plaza", category: "mall", distance: "6 min drive" },
      { name: "Reef Mall", category: "mall", distance: "8 min drive" },
      { name: "Dubai Hospital", category: "hospital", distance: "8 min drive" },
      { name: "Deira City Centre", category: "mall", distance: "10 min drive" },
    ],
    gallery: [
      { url: "/building/building-8.jpg", caption: "Building exterior" },
      { url: "/building/building-1.jpg", caption: "Office floor" },
    ],
  },
  {
    key: "smart-founders",
    name: "Smart Founders",
    tagline: "Founder-focused workspace.",
    description:
      "Smart Founders — a dedicated centre for early-stage founders and small teams. Workspace, mentorship adjacency, and back-office support tailored to new businesses.",
    building: "Smart Founders Centre",
    location: "Dubai",
    address_line: "Dubai, U.A.E.",
    emirate: "Dubai, U.A.E.",
    google_maps_url: "",
    phone: SC_PHONE,
    email: SC_EMAIL,
    hero_image: "/centres/smart-founders.webp",
    display_order: 45,
    advantages: [],
    nearby: [],
    gallery: [],
  },
  {
    key: "abna-rashid",
    name: "Abna Rashid Hamd Bin Huwaidi Building",
    tagline: "Owned freehold property — Naif, Deira.",
    description:
      "Our owned commercial building in Naif, Deira — historically Dubai's trading core. Multiple floors of flexible space serving import/export, wholesale, and trading businesses. Walking distance to the gold and spice souks.",
    building: "Abna Rashid Hamd Bin Huwaidi Building",
    location: "Street 27A, Al Nakhal — Naif, Deira",
    address_line: "Abna Rashid Hamd Bin Huwaidi Building, Street 27A, Al Nakhal — Naif, Deira",
    emirate: "Dubai, U.A.E.",
    google_maps_url: "https://maps.google.com/?q=Abna+Rashid+Building+Naif+Deira",
    phone: SC_PHONE,
    email: SC_EMAIL,
    hero_image: "/building/building-2.jpg",
    display_order: 50,
    advantages: [
      { title: "Owned by Smart Creation Group", description: "Long lease security — we control the building." },
      { title: "Trading-friendly area", description: "Heart of Deira's wholesale and trade district." },
      { title: "Walking distance to souks", description: "Gold, spice and fish souks all within 10 minutes." },
      { title: "Multiple floor sizes", description: "Flexibility for retail, warehouse, and office combinations." },
    ],
    nearby: [
      { name: "Baniyas Square Metro", category: "metro", distance: "6 min walk" },
      { name: "Gold Souk", category: "landmark", distance: "5 min walk" },
      { name: "Spice Souk", category: "landmark", distance: "6 min walk" },
      { name: "Dubai Creek", category: "landmark", distance: "10 min walk" },
      { name: "Iranian Hospital", category: "hospital", distance: "8 min drive" },
    ],
    gallery: [
      { url: "/building/building-2.jpg", caption: "Building exterior" },
      { url: "/building/building-3.jpg", caption: "Interior" },
    ],
  },
];

const { officeListings } = await import(
  path.resolve(process.cwd(), "lib/office-listings.ts")
);

const valuesArr = (xs: string[] | undefined) => (xs ?? []).map((v) => ({ value: v }));

async function main() {
  // Idempotency check
  const { count: existingCentres } = await sb
    .from("sc_centres")
    .select("*", { count: "exact", head: true });
  if ((existingCentres ?? 0) > 0 && !FORCE) {
    console.log(`= sc_centres already has ${existingCentres} rows — pass --force to wipe and re-seed.`);
    process.exit(0);
  }

  if (FORCE) {
    console.log("~ wiping sc_properties + sc_centres");
    await sb.from("sc_properties").delete().gte("id", 0);
    await sb.from("sc_centres").delete().gte("id", 0);
  }

  console.log("+ inserting 6 centres");
  const { data: insertedCentres, error: cErr } = await sb
    .from("sc_centres")
    .insert(centres)
    .select("id, key");
  if (cErr) {
    console.error(cErr);
    process.exit(1);
  }

  const centreIdByKey: Record<string, number> = {};
  for (const c of insertedCentres ?? []) centreIdByKey[c.key] = c.id;
  for (const [k, v] of Object.entries(centreIdByKey)) console.log(`  ${k} → id ${v}`);

  // Properties
  type Listing = (typeof officeListings)[number];
  const props = (officeListings as Listing[]).map((o) => ({
    slug: o.slug,
    title: o.title,
    hero_image: o.image,
    centre_id: centreIdByKey[o.centerId] ?? null,
    office_no: o.officeNo,
    category: o.category,
    accent: o.accent,
    description: o.description,
    highlights: valuesArr(o.highlights),
    featured: o.featured ?? false,
    show_on_home: o.showOnHome ?? false,
    floor: o.floor,
    sqft: o.sqft ?? null,
    capacity: o.capacity,
    view: o.view ?? null,
    features: valuesArr(o.features),
    price_amount: o.price.amount,
    price_period: o.price.period ?? null,
    price_note: o.price.note ?? null,
    payment_terms: o.paymentTerms ?? null,
    payment_options: valuesArr(o.paymentOptions),
    fees: o.fees,
    availability: o.availability,
    availability_accent: o.availabilityAccent,
    available_from: o.availableFrom ?? null,
    gallery: Array.from({ length: o.imageCount }, (_, i) => ({
      url: `/offices/${o.id}-${i + 1}.jpg`,
    })),
  }));

  console.log(`+ inserting ${props.length} properties`);
  const { error: pErr } = await sb.from("sc_properties").insert(props);
  if (pErr) {
    console.error(pErr);
    process.exit(1);
  }

  console.log("Done.");
}

await main();
process.exit(0);
