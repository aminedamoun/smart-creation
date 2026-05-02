"use server";

import { redirect } from "next/navigation";
import { loginWithPassword, logout, requireAdmin } from "@/lib/admin-auth";
import { supabaseAdmin, SC_MEDIA_BUCKET } from "@/lib/supabase";

// All pages use `force-dynamic`, so re-fetches happen on every request —
// no need for revalidatePath() (which Next 16 Turbopack has issues importing).
const revalidatePath = (_path: string) => {};

/* ── Auth ──────────────────────────────────────────────────────────── */

export async function loginAction(formData: FormData) {
  const password = String(formData.get("password") ?? "");
  const ok = await loginWithPassword(password);
  if (!ok) redirect("/admin/login?error=1");
  redirect("/admin");
}

export async function logoutAction() {
  await logout();
  redirect("/admin/login");
}

/* ── Helpers ───────────────────────────────────────────────────────── */

function valueArr(formData: FormData, name: string): { value: string }[] {
  return formData
    .getAll(name)
    .map((v) => String(v).trim())
    .filter(Boolean)
    .map((value) => ({ value }));
}

function jsonArr<T>(formData: FormData, name: string): T[] {
  const raw = String(formData.get(name) ?? "");
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

async function uploadFile(file: File): Promise<string> {
  const buf = Buffer.from(await file.arrayBuffer());
  const extMatch = file.name.match(/\.[a-zA-Z0-9]+$/);
  const ext = extMatch ? extMatch[0].toLowerCase() : ".jpg";
  const filename = `upload-${Date.now()}-${Math.random().toString(36).slice(2, 8)}${ext}`;
  const { error } = await supabaseAdmin.storage.from(SC_MEDIA_BUCKET).upload(filename, buf, {
    contentType: file.type || "image/jpeg",
    upsert: false,
  });
  if (error) throw new Error(`upload: ${error.message}`);
  return supabaseAdmin.storage.from(SC_MEDIA_BUCKET).getPublicUrl(filename).data.publicUrl;
}

/* ── Centres ───────────────────────────────────────────────────────── */

export async function uploadImageAction(formData: FormData): Promise<{ url: string } | { error: string }> {
  await requireAdmin();
  const f = formData.get("file");
  if (!(f instanceof File) || f.size === 0) return { error: "No file" };
  try {
    const url = await uploadFile(f);
    return { url };
  } catch (e) {
    return { error: (e as Error).message };
  }
}

export async function saveCentreAction(formData: FormData) {
  await requireAdmin();
  const id = formData.get("id") ? Number(formData.get("id")) : null;

  const heroUploaded = formData.get("hero_image_file");
  let heroUrl = String(formData.get("hero_image") ?? "");
  if (heroUploaded instanceof File && heroUploaded.size > 0) {
    heroUrl = await uploadFile(heroUploaded);
  }

  const data = {
    key: String(formData.get("key") ?? "").trim(),
    name: String(formData.get("name") ?? "").trim(),
    tagline: (String(formData.get("tagline") ?? "").trim() || null) as string | null,
    description: (String(formData.get("description") ?? "").trim() || null) as string | null,
    hero_image: heroUrl || null,
    building: String(formData.get("building") ?? "").trim(),
    location: String(formData.get("location") ?? "").trim(),
    address_line: String(formData.get("address_line") ?? "").trim() || null,
    emirate: String(formData.get("emirate") ?? "Dubai, U.A.E.").trim(),
    google_maps_url: String(formData.get("google_maps_url") ?? "").trim() || null,
    phone: String(formData.get("phone") ?? "").trim() || null,
    email: String(formData.get("email") ?? "").trim() || null,
    display_order: Number(formData.get("display_order") || 100),
    advantages: jsonArr<{ title: string; description?: string }>(formData, "advantages"),
    nearby: jsonArr<{ name: string; category: string; distance: string }>(formData, "nearby"),
    gallery: jsonArr<{ url: string; caption?: string }>(formData, "gallery"),
  };

  if (id) {
    const { error } = await supabaseAdmin.from("sc_centres").update(data).eq("id", id);
    if (error) throw new Error(error.message);
  } else {
    const { error } = await supabaseAdmin.from("sc_centres").insert(data);
    if (error) throw new Error(error.message);
  }
  revalidatePath("/admin/centres");
  revalidatePath("/business-centers");
  redirect("/admin/centres");
}

export async function deleteCentreAction(formData: FormData) {
  await requireAdmin();
  const id = Number(formData.get("id"));
  if (!id) return;
  const { error } = await supabaseAdmin.from("sc_centres").delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/centres");
  revalidatePath("/business-centers");
  redirect("/admin/centres");
}

/* ── Properties ────────────────────────────────────────────────────── */

export async function savePropertyAction(formData: FormData) {
  await requireAdmin();
  const id = formData.get("id") ? Number(formData.get("id")) : null;

  const heroUploaded = formData.get("hero_image_file");
  let heroUrl = String(formData.get("hero_image") ?? "");
  if (heroUploaded instanceof File && heroUploaded.size > 0) {
    heroUrl = await uploadFile(heroUploaded);
  }

  const data = {
    slug: String(formData.get("slug") ?? "").trim(),
    title: String(formData.get("title") ?? "").trim(),
    hero_image: heroUrl || null,
    centre_id: formData.get("centre_id") ? Number(formData.get("centre_id")) : null,
    office_no: String(formData.get("office_no") ?? "").trim(),
    category: String(formData.get("category") ?? "Private office"),
    accent: String(formData.get("accent") ?? "blue"),
    description: String(formData.get("description") ?? "").trim(),
    highlights: valueArr(formData, "highlights"),
    featured: formData.get("featured") === "on",
    show_on_home: formData.get("show_on_home") === "on",
    floor: String(formData.get("floor") ?? "").trim() || null,
    sqft: String(formData.get("sqft") ?? "").trim() || null,
    capacity: String(formData.get("capacity") ?? "").trim(),
    view: String(formData.get("view") ?? "").trim() || null,
    features: valueArr(formData, "features"),
    price_amount: String(formData.get("price_amount") ?? "").trim(),
    price_period: String(formData.get("price_period") ?? "").trim() || null,
    price_note: String(formData.get("price_note") ?? "").trim() || null,
    payment_terms: String(formData.get("payment_terms") ?? "").trim() || null,
    payment_options: valueArr(formData, "payment_options"),
    fees: {
      securityDeposit: String(formData.get("fee_securityDeposit") ?? "").trim() || undefined,
      managementFee: String(formData.get("fee_managementFee") ?? "").trim() || undefined,
      ejariFee: String(formData.get("fee_ejariFee") ?? "").trim() || undefined,
      ddaNoc: String(formData.get("fee_ddaNoc") ?? "").trim() || undefined,
      vat: String(formData.get("fee_vat") ?? "").trim() || undefined,
      parking: String(formData.get("fee_parking") ?? "").trim() || undefined,
    },
    availability: String(formData.get("availability") ?? "").trim(),
    availability_accent: String(formData.get("availability_accent") ?? "live"),
    available_from: String(formData.get("available_from") ?? "").trim() || null,
    gallery: jsonArr<{ url: string; caption?: string }>(formData, "gallery"),
  };

  if (id) {
    const { error } = await supabaseAdmin.from("sc_properties").update(data).eq("id", id);
    if (error) throw new Error(error.message);
  } else {
    const { error } = await supabaseAdmin.from("sc_properties").insert(data);
    if (error) throw new Error(error.message);
  }
  revalidatePath("/admin/properties");
  revalidatePath("/");
  revalidatePath("/business-centers");
  redirect("/admin/properties");
}

export async function deletePropertyAction(formData: FormData) {
  await requireAdmin();
  const id = Number(formData.get("id"));
  if (!id) return;
  const { error } = await supabaseAdmin.from("sc_properties").delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/properties");
  revalidatePath("/");
  redirect("/admin/properties");
}
