/**
 * Server-side data accessors for Supabase. Drop-in replacement for the
 * old payload-queries.ts. Public reads use the anon-key client.
 */
import "server-only";
import { supabasePublic } from "./supabase";
import type { OfficeListing, CenterId } from "./office-listings";

/* ── Types matching the Supabase schema ─────────────────────────────── */

export type CentreRow = {
  id: number;
  key: string;
  name: string;
  tagline: string | null;
  description: string | null;
  hero_image: string | null;
  building: string;
  location: string;
  address_line: string | null;
  emirate: string;
  google_maps_url: string | null;
  phone: string | null;
  email: string | null;
  display_order: number;
  advantages: { title: string; description?: string }[];
  nearby: { name: string; category: string; distance: string }[];
  gallery: { url: string; caption?: string }[];
  created_at: string;
  updated_at: string;
};

export type PropertyRow = {
  id: number;
  slug: string;
  title: string;
  hero_image: string | null;
  centre_id: number | null;
  office_no: string;
  category: OfficeListing["category"];
  accent: OfficeListing["accent"];
  description: string;
  highlights: { value: string }[];
  featured: boolean;
  show_on_home: boolean;
  floor: string | null;
  sqft: string | null;
  capacity: string;
  view: string | null;
  features: { value: string }[];
  price_amount: string;
  price_period: string | null;
  price_note: string | null;
  payment_terms: string | null;
  payment_options: { value: string }[];
  fees: {
    securityDeposit?: string;
    managementFee?: string;
    ejariFee?: string;
    ddaNoc?: string;
    vat?: string;
    parking?: string;
  };
  availability: string;
  availability_accent: OfficeListing["availabilityAccent"];
  available_from: string | null;
  gallery: { url: string; caption?: string }[];
  created_at: string;
  updated_at: string;
};

export type PropertyWithCentre = PropertyRow & { centre: CentreRow | null };

/* ── Reads ─────────────────────────────────────────────────────────── */

export async function getCentres(): Promise<CentreRow[]> {
  const { data, error } = await supabasePublic
    .from("sc_centres")
    .select("*")
    .order("display_order", { ascending: true });
  if (error) throw error;
  return (data ?? []) as CentreRow[];
}

export async function getCentreByKey(key: string): Promise<CentreRow | null> {
  const { data, error } = await supabasePublic
    .from("sc_centres")
    .select("*")
    .eq("key", key)
    .maybeSingle();
  if (error) throw error;
  return data as CentreRow | null;
}

export type PropertyQuery = {
  centreKey?: string;
  featured?: boolean;
  limit?: number;
};

export async function getProperties({
  centreKey,
  featured,
  limit = 200,
}: PropertyQuery = {}): Promise<PropertyWithCentre[]> {
  let q = supabasePublic
    .from("sc_properties")
    .select("*, centre:sc_centres(*)")
    .order("featured", { ascending: false })
    .order("id", { ascending: true })
    .limit(limit);
  if (featured) q = q.eq("featured", true);
  if (centreKey) {
    const centre = await getCentreByKey(centreKey);
    if (!centre) return [];
    q = q.eq("centre_id", centre.id);
  }
  const { data, error } = await q;
  if (error) throw error;
  return (data ?? []) as PropertyWithCentre[];
}

export async function getProperty(slug: string): Promise<PropertyWithCentre | null> {
  const { data, error } = await supabasePublic
    .from("sc_properties")
    .select("*, centre:sc_centres(*)")
    .eq("slug", slug)
    .maybeSingle();
  if (error) throw error;
  return data as PropertyWithCentre | null;
}

export async function getSimilarProperties(opts: {
  centreId: number;
  excludeSlug: string;
  limit?: number;
}): Promise<PropertyWithCentre[]> {
  const { data, error } = await supabasePublic
    .from("sc_properties")
    .select("*, centre:sc_centres(*)")
    .eq("centre_id", opts.centreId)
    .neq("slug", opts.excludeSlug)
    .limit(opts.limit ?? 3);
  if (error) throw error;
  return (data ?? []) as PropertyWithCentre[];
}

/**
 * Map-pin data per centre: { officesCount, priceMin, priceMax } where
 * "price" is parsed from the free-text `price_amount` field. Returns one
 * entry per centre (in display order) so the map can render a pin for each.
 */
export type CentreMapData = {
  id: number;
  key: string;
  name: string;
  address: string;
  officesCount: number;
  priceMin: number | null;
  priceMax: number | null;
  /** Lightweight property list for the map's "available offices" grid */
  properties: {
    slug: string;
    title: string;
    officeNo: string;
    category: string;
    image: string;
    sqft: string | null;
    capacity: string;
    priceAmount: string;
    pricePeriod: string | null;
    availability: string;
    availabilityAccent: string;
  }[];
};

function parseAmount(raw: string | null | undefined): number | null {
  if (!raw) return null;
  const m = raw.replace(/[, ]/g, "").match(/(\d+(?:\.\d+)?)/);
  if (!m) return null;
  const n = Number(m[1]);
  return Number.isFinite(n) ? n : null;
}

export async function getCentresWithMapData(): Promise<CentreMapData[]> {
  const [centres, props] = await Promise.all([
    getCentres(),
    getProperties({ limit: 500 }),
  ]);
  return centres.map((c) => {
    const own = props.filter((p) => p.centre?.id === c.id);
    const prices = own.map((p) => parseAmount(p.price_amount)).filter((n): n is number => n !== null);
    return {
      id: c.id,
      key: c.key,
      name: c.name,
      address:
        [c.building, c.location, c.emirate].filter(Boolean).join(", ") ||
        c.address_line ||
        c.location ||
        "",
      officesCount: own.length,
      priceMin: prices.length ? Math.min(...prices) : null,
      priceMax: prices.length ? Math.max(...prices) : null,
      properties: own.map((p) => ({
        slug: p.slug,
        title: p.title,
        officeNo: p.office_no,
        category: p.category,
        image: p.hero_image ?? "",
        sqft: p.sqft,
        capacity: p.capacity,
        priceAmount: p.price_amount,
        pricePeriod: p.price_period,
        availability: p.availability,
        availabilityAccent: p.availability_accent,
      })),
    };
  });
}

/* ── Adapter: PropertyWithCentre → legacy OfficeListing shape ─────── */

export function propertyToOffice(p: PropertyWithCentre): OfficeListing {
  return {
    id: p.slug,
    slug: p.slug,
    officeNo: p.office_no,
    title: p.title,
    category: p.category,
    accent: p.accent,

    centerId: (p.centre?.key as CenterId) ?? "smart-creation",
    centerName: p.centre?.name ?? "",
    building: p.centre?.building ?? "",
    location: p.centre?.location ?? "",
    floor: p.floor ?? "",
    emirate: p.centre?.emirate ?? "Dubai, U.A.E.",

    sqft: p.sqft ?? undefined,
    capacity: p.capacity,
    view: p.view ?? undefined,
    features: p.features.map((f) => f.value).filter(Boolean),

    price: {
      amount: p.price_amount,
      period: p.price_period ?? "",
      note: p.price_note ?? undefined,
    },
    paymentTerms: p.payment_terms ?? undefined,
    paymentOptions: p.payment_options.map((f) => f.value).filter(Boolean),

    fees: {
      securityDeposit: p.fees.securityDeposit ?? "—",
      managementFee: p.fees.managementFee ?? "—",
      ejariFee: p.fees.ejariFee ?? "—",
      ddaNoc: p.fees.ddaNoc,
      vat: p.fees.vat ?? "5%",
      parking: p.fees.parking,
    },

    availability: p.availability,
    availabilityAccent: p.availability_accent,
    availableFrom: p.available_from ?? undefined,

    image: p.hero_image ?? "",
    imageCount: p.gallery.length,

    featured: p.featured,
    showOnHome: p.show_on_home,
    description: p.description,
    highlights: p.highlights.map((h) => h.value).filter(Boolean),
  };
}

export function propertyToImages(p: PropertyWithCentre): string[] {
  const out: string[] = [];
  if (p.hero_image) out.push(p.hero_image);
  for (const g of p.gallery) if (g.url) out.push(g.url);
  return out;
}
