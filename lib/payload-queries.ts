/**
 * Server-side data accessors that hit Payload's local API directly
 * (no HTTP roundtrip). Import only from server components / route handlers.
 */
import "server-only";
import { getPayload, type Where } from "payload";
import config from "@payload-config";
import type { OfficeListing, CenterId } from "./office-listings";

const payloadPromise = getPayload({ config });

/* ── Adapters: Payload → legacy shape used by existing components ──── */

type PayloadMedia = { id: string | number; url?: string | null; filename?: string | null; alt?: string | null };
type PayloadProperty = Record<string, unknown> & { id: string | number };
type PayloadCentre = Record<string, unknown> & { id: string | number; key: string };

function mediaUrl(m: unknown): string {
  if (!m || typeof m !== "object") return "";
  const media = m as PayloadMedia;
  let raw = media.url || (media.filename ? `/api/media/file/${media.filename}` : "");
  // Strip the origin only if it's a localhost / serverURL prefix on a
  // SAME-ORIGIN path (e.g. dev). Cross-origin URLs (Vercel Blob CDN) must
  // stay absolute so the browser fetches the right host.
  if (raw.startsWith("http://localhost") || raw.startsWith("http://127.0.0.1")) {
    try {
      raw = new URL(raw).pathname;
    } catch {
      /* ignore */
    }
  } else if (raw.startsWith("https://") || raw.startsWith("http://")) {
    try {
      const u = new URL(raw);
      // If it's the same origin as our serverURL, strip it.
      const server = process.env.PAYLOAD_PUBLIC_SERVER_URL;
      if (server && raw.startsWith(server)) {
        raw = u.pathname;
      }
    } catch {
      /* ignore */
    }
  }
  return raw;
}

function valuesArr(arr: unknown): string[] {
  if (!Array.isArray(arr)) return [];
  return arr
    .map((row) => (row && typeof row === "object" && "value" in row ? String((row as { value: string }).value) : ""))
    .filter(Boolean);
}

export function propertyToOffice(p: PayloadProperty): OfficeListing {
  const centre = (p.center as PayloadCentre | undefined) ?? null;
  const hero = p.heroImage as PayloadMedia | undefined;
  const fees = (p.fees as Record<string, string> | undefined) ?? {};
  const galleryArr = Array.isArray(p.gallery) ? (p.gallery as { image: PayloadMedia }[]) : [];

  return {
    id: String(p.slug ?? p.id),
    slug: String(p.slug ?? p.id),
    officeNo: String(p.officeNo ?? ""),
    title: String(p.title ?? ""),
    category: (p.category as OfficeListing["category"]) ?? "Private office",
    accent: (p.accent as OfficeListing["accent"]) ?? "blue",

    centerId: (centre?.key as CenterId) ?? "smart-creation",
    centerName: String(centre?.name ?? ""),
    building: String(centre?.building ?? ""),
    location: String(centre?.location ?? ""),
    floor: String(p.floor ?? centre?.floor ?? ""),
    emirate: String(centre?.emirate ?? "Dubai, U.A.E."),

    sqft: (p.sqft as string) || undefined,
    capacity: String(p.capacity ?? ""),
    view: (p.view as string) || undefined,
    features: valuesArr(p.features),

    price: {
      amount: String(p.priceAmount ?? ""),
      period: String(p.pricePeriod ?? ""),
      note: (p.priceNote as string) || undefined,
    },
    paymentTerms: (p.paymentTerms as string) || undefined,
    paymentOptions: valuesArr(p.paymentOptions),

    fees: {
      securityDeposit: String(fees.securityDeposit ?? "—"),
      managementFee: String(fees.managementFee ?? "—"),
      ejariFee: String(fees.ejariFee ?? "—"),
      ddaNoc: fees.ddaNoc ? String(fees.ddaNoc) : undefined,
      vat: String(fees.vat ?? "5%"),
      parking: fees.parking ? String(fees.parking) : undefined,
    },

    availability: String(p.availability ?? "Available now"),
    availabilityAccent: (p.availabilityAccent as OfficeListing["availabilityAccent"]) ?? "live",
    availableFrom: (p.availableFrom as string) || undefined,

    image: mediaUrl(hero),
    imageCount: galleryArr.length,

    featured: Boolean(p.featured),
    showOnHome: Boolean(p.showOnHome),
    description: String(p.description ?? ""),
    highlights: valuesArr(p.highlights),
  };
}

export function propertyToImages(p: PayloadProperty): string[] {
  const hero = p.heroImage as PayloadMedia | undefined;
  const galleryArr = Array.isArray(p.gallery) ? (p.gallery as { image: PayloadMedia }[]) : [];
  const heroSrc = mediaUrl(hero);
  const galleryUrls = galleryArr.map((g) => mediaUrl(g.image)).filter(Boolean);
  return heroSrc ? [heroSrc, ...galleryUrls] : galleryUrls;
}

/* ── Queries ───────────────────────────────────────────────────────── */

export async function getCentres() {
  const payload = await payloadPromise;
  const res = await payload.find({
    collection: "centers",
    limit: 100,
    sort: "displayOrder",
    depth: 2,
  });
  return res.docs;
}

export async function getCentreByKey(key: string) {
  const payload = await payloadPromise;
  const res = await payload.find({
    collection: "centers",
    where: { key: { equals: key } },
    limit: 1,
    depth: 3,
  });
  return res.docs[0] ?? null;
}

export type PropertyQuery = {
  centreKey?: string;
  featured?: boolean;
  limit?: number;
};

export async function getProperties({ centreKey, featured, limit = 100 }: PropertyQuery = {}) {
  const payload = await payloadPromise;
  const where: Where = {};
  if (featured) where.featured = { equals: true };
  if (centreKey) {
    const centre = await getCentreByKey(centreKey);
    if (!centre) return [];
    where.center = { equals: centre.id };
  }
  const res = await payload.find({
    collection: "properties",
    where,
    limit,
    depth: 2,
    sort: "-featured",
  });
  return res.docs;
}

export async function getProperty(slug: string) {
  const payload = await payloadPromise;
  const res = await payload.find({
    collection: "properties",
    where: { slug: { equals: slug } },
    limit: 1,
    depth: 3,
  });
  return res.docs[0] ?? null;
}

export async function getSimilarProperties(opts: { centreId: string | number; excludeSlug: string; limit?: number }) {
  const payload = await payloadPromise;
  const res = await payload.find({
    collection: "properties",
    where: {
      and: [
        { center: { equals: opts.centreId } },
        { slug: { not_equals: opts.excludeSlug } },
      ],
    },
    limit: opts.limit ?? 3,
    depth: 2,
  });
  return res.docs;
}
