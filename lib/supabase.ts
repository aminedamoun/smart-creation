/**
 * Supabase clients.
 *
 * - `supabasePublic` (anon key) — used by public site reads. RLS enforces
 *   read-only access to sc_centres / sc_properties.
 * - `supabaseAdmin` (service role key, server-only) — used by the admin
 *   UI route handlers and by migration scripts. Bypasses RLS. NEVER import
 *   this from a client component.
 */
import "server-only";
import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY ?? "";

if (!url || !anonKey) {
  // Soft-warn so build doesn't crash; runtime queries will throw clearly.
  console.warn("[supabase] NEXT_PUBLIC_SUPABASE_URL / NEXT_PUBLIC_SUPABASE_ANON_KEY missing");
}

export const supabasePublic = createClient(url, anonKey, {
  auth: { persistSession: false },
});

export const supabaseAdmin = createClient(url, serviceKey || anonKey, {
  auth: { persistSession: false },
});

export const SC_MEDIA_BUCKET = "sc-media";
