"use server";

import { redirect } from "next/navigation";
import { loginWithPassword, logout, requireAdmin } from "@/lib/admin-auth";
import { supabaseAdmin, SC_MEDIA_BUCKET } from "@/lib/supabase";
import { estimateReadMinutes, slugifyInsightTitle } from "@/lib/insights";

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
    highlights: jsonArr<{ value: string }>(formData, "highlights").filter(
      (h) => typeof h?.value === "string" && h.value.trim() !== ""
    ),
    featured: formData.get("featured") === "on",
    show_on_home: formData.get("show_on_home") === "on",
    floor: String(formData.get("floor") ?? "").trim() || null,
    sqft: String(formData.get("sqft") ?? "").trim() || null,
    capacity: String(formData.get("capacity") ?? "").trim(),
    view: String(formData.get("view") ?? "").trim() || null,
    features: jsonArr<{ value: string }>(formData, "features").filter(
      (f) => typeof f?.value === "string" && f.value.trim() !== ""
    ),
    price_amount: String(formData.get("price_amount") ?? "").trim(),
    price_period: String(formData.get("price_period") ?? "").trim() || null,
    price_note: String(formData.get("price_note") ?? "").trim() || null,
    payment_terms: String(formData.get("payment_terms") ?? "").trim() || null,
    payment_options: jsonArr<{ value: string }>(formData, "payment_options").filter(
      (p) => typeof p?.value === "string" && p.value.trim() !== ""
    ),
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

/* ── Insights ──────────────────────────────────────────────────────── */

export async function saveInsightAction(formData: FormData) {
  await requireAdmin();
  const id = formData.get("id") ? Number(formData.get("id")) : null;

  // Cover URL is uploaded via uploadImageAction in the picker and stored
  // back into a hidden field; we just read the resulting URL.
  const coverUrl = String(formData.get("cover") ?? "").trim();

  const title = String(formData.get("title") ?? "").trim();
  let slug = String(formData.get("slug") ?? "").trim();
  if (!slug) slug = slugifyInsightTitle(title);

  const body = String(formData.get("body") ?? "");
  const readMinutesIn = Number(formData.get("read_minutes") || 0);
  const readMinutes =
    readMinutesIn > 0 ? readMinutesIn : estimateReadMinutes(body);

  const status = String(formData.get("status") ?? "published").trim();

  const data = {
    slug,
    title,
    excerpt: String(formData.get("excerpt") ?? "").trim(),
    meta_title: String(formData.get("meta_title") ?? "").trim(),
    meta_description: String(formData.get("meta_description") ?? "").trim(),
    primary_keyword: String(formData.get("primary_keyword") ?? "").trim(),
    secondary_keywords: jsonArr<{ value: string }>(formData, "secondary_keywords")
      .map((k) => (typeof k?.value === "string" ? k.value.trim() : ""))
      .filter(Boolean),
    category: String(formData.get("category") ?? "Insight").trim() || "Insight",
    date: String(formData.get("date") ?? "").trim() || new Date().toISOString().slice(0, 10),
    read_minutes: readMinutes,
    cover: coverUrl || "",
    body,
    faqs: jsonArr<{ q: string; a: string }>(formData, "faqs").filter(
      (f) =>
        typeof f?.q === "string" &&
        typeof f?.a === "string" &&
        f.q.trim() !== "" &&
        f.a.trim() !== "",
    ),
    status: status === "draft" ? "draft" : "published",
    updated_at: new Date().toISOString(),
  };

  if (id) {
    const { error } = await supabaseAdmin
      .from("sc_insights")
      .update(data)
      .eq("id", id);
    if (error) throw new Error(error.message);
  } else {
    const { error } = await supabaseAdmin.from("sc_insights").insert(data);
    if (error) throw new Error(error.message);
  }
  revalidatePath("/admin/insights");
  revalidatePath("/insights");
  revalidatePath(`/insights/${slug}`);
  revalidatePath("/");
  redirect("/admin/insights");
}

/* ── Team ──────────────────────────────────────────────────────────── */

export async function saveTeamMemberAction(formData: FormData) {
  await requireAdmin();
  const id = formData.get("id") ? Number(formData.get("id")) : null;

  const data = {
    name: String(formData.get("name") ?? "").trim(),
    role: String(formData.get("role") ?? "").trim(),
    photo: String(formData.get("photo") ?? "").trim() || null,
    linkedin: String(formData.get("linkedin") ?? "").trim() || null,
    visible: formData.get("visible") === "on",
  };

  if (!data.name) throw new Error("Name is required");

  if (id) {
    const { error } = await supabaseAdmin
      .from("sc_team")
      .update(data)
      .eq("id", id);
    if (error) throw new Error(error.message);
  } else {
    const { data: maxRow } = await supabaseAdmin
      .from("sc_team")
      .select("display_order")
      .order("display_order", { ascending: false })
      .limit(1)
      .maybeSingle();
    const nextOrder = (maxRow?.display_order ?? 0) + 10;
    const { error } = await supabaseAdmin
      .from("sc_team")
      .insert({ ...data, display_order: nextOrder });
    if (error) throw new Error(error.message);
  }
  revalidatePath("/admin/team");
  revalidatePath("/about");
  redirect("/admin/team");
}

export async function deleteTeamMemberAction(formData: FormData) {
  await requireAdmin();
  const id = Number(formData.get("id"));
  if (!id) return;
  const { error } = await supabaseAdmin.from("sc_team").delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/team");
  revalidatePath("/about");
  redirect("/admin/team");
}

export async function reorderTeamAction(formData: FormData) {
  await requireAdmin();
  const raw = String(formData.get("order") ?? "");
  let ids: number[];
  try {
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) throw new Error("not an array");
    ids = parsed.map((n) => Number(n)).filter((n) => Number.isFinite(n));
  } catch {
    throw new Error("Invalid order payload");
  }
  if (ids.length === 0) return;

  await Promise.all(
    ids.map((id, idx) =>
      supabaseAdmin
        .from("sc_team")
        .update({ display_order: (idx + 1) * 10 })
        .eq("id", id),
    ),
  );
  revalidatePath("/admin/team");
  revalidatePath("/about");
}

export async function deleteInsightAction(formData: FormData) {
  await requireAdmin();
  const id = Number(formData.get("id"));
  if (!id) return;
  const { error } = await supabaseAdmin
    .from("sc_insights")
    .delete()
    .eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/insights");
  revalidatePath("/insights");
  revalidatePath("/");
  redirect("/admin/insights");
}
