/* Seed script — imports the static office listings into Payload.
 *
 *   npx tsx scripts/seed.mts            # seed if empty
 *   npx tsx scripts/seed.mts --force    # wipe + re-seed
 *
 * Idempotent by default: refuses to run if any properties already exist.
 */
import path from "path";
import fs from "fs/promises";
import { readFileSync } from "fs";

// Load .env.local manually before importing Payload (its bundled env loader breaks on Next.js 16).
try {
  const envFile = readFileSync(path.resolve(process.cwd(), ".env.local"), "utf8");
  for (const line of envFile.split("\n")) {
    const m = line.match(/^([A-Z0-9_]+)=(.*)$/);
    if (m && !process.env[m[1]]) process.env[m[1]] = m[2];
  }
} catch {
  /* no .env.local — assume vars already set */
}

import { getPayload } from "payload";
const config = (await import(path.resolve(process.cwd(), "payload.config.ts"))).default;
const { officeListings } = await import(path.resolve(process.cwd(), "lib/office-listings.ts"));
type OfficeListing = (typeof officeListings)[number];

const FORCE = process.argv.includes("--force");
const PUBLIC_DIR = path.resolve(process.cwd(), "public");

type PayloadInstance = Awaited<ReturnType<typeof getPayload>>;

async function uploadImage(
  payload: PayloadInstance,
  relPath: string,
  alt: string
): Promise<string | number | null> {
  const absPath = path.join(PUBLIC_DIR, relPath.replace(/^\//, ""));
  try {
    const data = await fs.readFile(absPath);
    const filename = path.basename(absPath);
    const doc = await payload.create({
      collection: "media",
      data: { alt },
      file: {
        data,
        mimetype: "image/jpeg",
        name: filename,
        size: data.length,
      },
    });
    return doc.id;
  } catch (err) {
    console.warn(`  ! skipped ${relPath}: ${(err as Error).message}`);
    return null;
  }
}

function toArrayValues(values: string[] | undefined) {
  return (values ?? []).map((value) => ({ value }));
}

/* ── Centres ───────────────────────────────────────────────────────── */

type CentreSeed = {
  key: string;
  name: string;
  tagline: string;
  description: string;
  building: string;
  location: string;
  addressLine: string;
  emirate: string;
  googleMapsUrl?: string;
  phone?: string;
  email?: string;
  defaultFloor: string;
  heroImage: string;
  galleryImages: { path: string; caption?: string }[];
  advantages: { title: string; description?: string }[];
  nearby: { name: string; category: string; distance: string }[];
  displayOrder: number;
};

const SC_PHONE = "+97143939099";
const SC_EMAIL = "info@thesmartcreation.com";

const centres: CentreSeed[] = [
  {
    key: "smart-creation",
    name: "Smart Creation Business Center",
    tagline: "Our flagship centre — 19th-floor Tecom skyline views.",
    description:
      "Smart Creation Business Center sits on the 19th floor of Damac Executive Heights, one of Tecom's most recognised commercial towers. Tenants get sweeping views over Sheikh Zayed Road, walk-in distance to two metro stations, and a fully-serviced floor with reception, meeting rooms, and concierge services.",
    building: "Damac Executive Heights (Tecom)",
    location: "Jebel Ali Race Course Road",
    addressLine:
      "19th Floor, Damac Executive Heights, Jebel Ali Race Course Road, Tecom (Barsha Heights), Dubai",
    emirate: "Dubai, U.A.E.",
    googleMapsUrl: "https://maps.google.com/?q=Damac+Executive+Heights+Dubai",
    phone: SC_PHONE,
    email: SC_EMAIL,
    defaultFloor: "19th Floor",
    heroImage: "/damac-executive.webp",
    galleryImages: [
      { path: "/reception.jpg", caption: "Reception" },
      { path: "/building/building-1.jpg", caption: "Lobby" },
      { path: "/building/building-2.jpg", caption: "Meeting room" },
      { path: "/building/building-3.jpg", caption: "Co-working area" },
    ],
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
    displayOrder: 10,
  },
  {
    key: "smart-place",
    name: "Smart Place Business Center",
    tagline: "Al Barsha — minutes from Mall of the Emirates.",
    description:
      "Located on Umm Suqeim Street in the heart of Al Barsha, Smart Place gives you fast access to the Mall of the Emirates, Sheikh Zayed Road, and the residential heart of the city. Compact furnished suites priced for solo founders and small teams.",
    building: "Iridium Building",
    location: "Umm Suqeim Street, Al Barsha",
    addressLine: "Iridium Building, Umm Suqeim Street, Al Barsha, Dubai",
    emirate: "Dubai, U.A.E.",
    googleMapsUrl: "https://maps.google.com/?q=Iridium+Building+Al+Barsha+Dubai",
    phone: SC_PHONE,
    email: SC_EMAIL,
    defaultFloor: "Floor 226",
    heroImage: "/building/building-4.jpg",
    galleryImages: [
      { path: "/building/building-4.jpg", caption: "Building exterior" },
      { path: "/building/building-5.jpg", caption: "Floor entrance" },
    ],
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
    displayOrder: 20,
  },
  {
    key: "smart-view",
    name: "Smart View Business Center",
    tagline: "Bur Dubai — heart of old Dubai trading.",
    description:
      "Smart View sits in the historic Bur Dubai trading district at Al Hamriya. Ground-floor offices with great street visibility, ideal for retail-adjacent businesses, traders, and consulting firms working with the gold and textile markets.",
    building: "Al Arif Building",
    location: "15A Street, Al Hamriya, Bur Dubai",
    addressLine: "Al Arif Building, 15A Street, Al Hamriya, Bur Dubai",
    emirate: "Dubai, U.A.E.",
    googleMapsUrl: "https://maps.google.com/?q=Al+Arif+Building+Bur+Dubai",
    phone: SC_PHONE,
    email: SC_EMAIL,
    defaultFloor: "Ground Floor",
    heroImage: "/building/building-6.jpg",
    galleryImages: [
      { path: "/building/building-6.jpg", caption: "Building exterior" },
      { path: "/building/building-7.jpg", caption: "Reception area" },
    ],
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
    displayOrder: 30,
  },
  {
    key: "future-space",
    name: "Future Space Business Center",
    tagline: "Deira — close to Salah Al Din metro.",
    description:
      "Future Space is in the Dubai Municipality Building on Salah Al Din Street, one of Deira's most established commercial corridors. A practical second-floor centre with everything a small business needs — meeting rooms, banking partners across the street, and direct metro access.",
    building: "Dubai Municipality Building, Block A",
    location: "Salah Al Din Street, Al Muraqabat",
    addressLine: "Block A, 2nd Floor, Dubai Municipality Building, Salah Al Din Street, Al Muraqabat, Deira",
    emirate: "Dubai, U.A.E.",
    googleMapsUrl: "https://maps.google.com/?q=Dubai+Municipality+Salah+Al+Din",
    phone: SC_PHONE,
    email: SC_EMAIL,
    defaultFloor: "2nd Floor",
    heroImage: "/building/building-8.jpg",
    galleryImages: [
      { path: "/building/building-8.jpg", caption: "Building exterior" },
      { path: "/building/building-1.jpg", caption: "Office floor" },
    ],
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
    displayOrder: 40,
  },
  {
    key: "abna-rashid",
    name: "Abna Rashid Hamd Bin Huwaidi Building",
    tagline: "Owned freehold property — Naif, Deira.",
    description:
      "Our owned commercial building in Naif, Deira — historically Dubai's trading core. Multiple floors of flexible space serving import/export, wholesale, and trading businesses. Walking distance to the gold and spice souks.",
    building: "Abna Rashid Hamd Bin Huwaidi Building",
    location: "Street 27A, Al Nakhal — Naif, Deira",
    addressLine: "Abna Rashid Hamd Bin Huwaidi Building, Street 27A, Al Nakhal — Naif, Deira",
    emirate: "Dubai, U.A.E.",
    googleMapsUrl: "https://maps.google.com/?q=Abna+Rashid+Building+Naif+Deira",
    phone: SC_PHONE,
    email: SC_EMAIL,
    defaultFloor: "Various floors",
    heroImage: "/building/building-2.jpg",
    galleryImages: [
      { path: "/building/building-2.jpg", caption: "Building exterior" },
      { path: "/building/building-3.jpg", caption: "Interior" },
    ],
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
    displayOrder: 50,
  },
];

async function seedCentres(
  payload: PayloadInstance
): Promise<Record<string, string | number>> {
  const map: Record<string, string | number> = {};
  for (const c of centres) {
    console.log(`+ centre: ${c.name}`);
    const heroId = await uploadImage(payload, c.heroImage, `${c.name} — main image`);
    if (!heroId) {
      console.warn(`  ! hero image missing for centre ${c.key} (${c.heroImage})`);
      continue;
    }
    const galleryEntries: { image: string | number; caption?: string }[] = [];
    for (const g of c.galleryImages) {
      const id = await uploadImage(payload, g.path, `${c.name} — ${g.caption ?? "interior"}`);
      if (id) galleryEntries.push({ image: id, caption: g.caption });
    }
    const created = await payload.create({
      collection: "centers",
      data: {
        key: c.key,
        name: c.name,
        tagline: c.tagline,
        description: c.description,
        building: c.building,
        location: c.location,
        addressLine: c.addressLine,
        emirate: c.emirate,
        googleMapsUrl: c.googleMapsUrl,
        phone: c.phone,
        email: c.email,
        heroImage: heroId,
        gallery: galleryEntries,
        advantages: c.advantages,
        nearby: c.nearby,
        displayOrder: c.displayOrder,
      },
    });
    map[c.key] = created.id;
  }
  return map;
}

/* ── Properties ────────────────────────────────────────────────────── */

async function seedProperty(
  payload: PayloadInstance,
  o: OfficeListing,
  centreMap: Record<string, string | number>
) {
  console.log(`→ ${o.id}  ${o.title}`);

  const centerId = centreMap[o.centerId];
  if (!centerId) {
    console.warn(`  ! no centre for key ${o.centerId}, skipping`);
    return;
  }

  const heroMediaId = await uploadImage(payload, o.image, `${o.title} — main view`);
  if (!heroMediaId) {
    console.warn(`  ! hero image missing for ${o.id}, skipping property`);
    return;
  }

  const galleryIds: (string | number)[] = [];
  for (let i = 1; i <= o.imageCount; i++) {
    const rel = `/offices/${o.id}-${i}.jpg`;
    const id = await uploadImage(payload, rel, `${o.title} — image ${i}`);
    if (id) galleryIds.push(id);
  }

  await payload.create({
    collection: "properties",
    data: {
      title: o.title,
      slug: o.slug,
      heroImage: heroMediaId,
      center: centerId,
      officeNo: o.officeNo,
      category: o.category,
      accent: o.accent,
      description: o.description,
      highlights: toArrayValues(o.highlights),
      featured: o.featured ?? false,
      showOnHome: o.showOnHome ?? false,

      floor: o.floor,
      sqft: o.sqft,
      capacity: o.capacity,
      view: o.view,
      features: toArrayValues(o.features),

      priceAmount: o.price.amount,
      pricePeriod: o.price.period?.trim() ? o.price.period : undefined,
      priceNote: o.price.note,
      paymentTerms: o.paymentTerms,
      paymentOptions: toArrayValues(o.paymentOptions),

      fees: {
        securityDeposit: o.fees.securityDeposit,
        managementFee: o.fees.managementFee,
        ejariFee: o.fees.ejariFee,
        ddaNoc: o.fees.ddaNoc,
        vat: o.fees.vat,
        parking: o.fees.parking,
      },

      availability: o.availability,
      availabilityAccent: o.availabilityAccent,
      availableFrom: o.availableFrom ? new Date(o.availableFrom).toISOString() : undefined,

      gallery: galleryIds.map((image) => ({ image })),
    },
  });
}

/* ── Main ──────────────────────────────────────────────────────────── */

async function main() {
  const payload = await getPayload({ config });

  const existing = await payload.find({ collection: "properties", limit: 1 });
  if (existing.totalDocs > 0 && !FORCE) {
    console.log(
      `Already seeded — ${existing.totalDocs} properties exist. Pass --force to wipe and re-seed.`
    );
    process.exit(0);
  }

  if (FORCE) {
    console.log("Force mode — wiping properties, centres and media…");
    await payload.delete({ collection: "properties", where: { id: { exists: true } } });
    await payload.delete({ collection: "centers", where: { id: { exists: true } } });
    await payload.delete({ collection: "media", where: { id: { exists: true } } });
  }

  const centreMap = await seedCentres(payload);

  for (const o of officeListings) {
    await seedProperty(payload, o, centreMap);
  }

  const after = await payload.find({ collection: "properties", limit: 0 });
  const centresAfter = await payload.find({ collection: "centers", limit: 0 });
  console.log(
    `\nDone — ${centresAfter.totalDocs} centres, ${after.totalDocs} properties in DB.`
  );
  process.exit(0);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
