/**
 * Helpers for the public Supabase media bucket.
 *
 * All site images live in the public `sc-media` bucket. We refer to them via
 * a single CDN base URL composed at module load time so callers can use a
 * tiny path string, e.g. `cdn("/team/asad-hashmi.webp")`.
 *
 * The base is derived from `NEXT_PUBLIC_SUPABASE_URL` so it ships in client
 * bundles automatically.
 */

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
const BUCKET = "sc-media";

export const CDN_BASE = SUPABASE_URL
  ? `${SUPABASE_URL}/storage/v1/object/public/${BUCKET}`
  : "";

/**
 * Resolve a media path. Pass either:
 *   - a leading-slash relative path: `/team/asad.webp` → `https://…/sc-media/team/asad.webp`
 *   - a full https URL: passed through untouched
 *   - empty / nullish: returns empty string
 */
export function cdn(p: string | null | undefined): string {
  if (!p) return "";
  if (/^https?:\/\//i.test(p)) return p;
  if (!CDN_BASE) return p; // local dev fallback before env loaded
  return `${CDN_BASE}${p.startsWith("/") ? p : `/${p}`}`;
}
