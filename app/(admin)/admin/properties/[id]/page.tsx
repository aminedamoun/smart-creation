import Link from "next/link";
import { notFound } from "next/navigation";
import { requireAdmin } from "@/lib/admin-auth";
import { supabaseAdmin } from "@/lib/supabase";
import { AdminShell } from "../../_shell";
import { PropertyForm, type PropertyFormData } from "../_form";

export const dynamic = "force-dynamic";

type Args = { params: Promise<{ id: string }> };

export default async function EditProperty({ params }: Args) {
  await requireAdmin();
  const { id } = await params;
  const numId = Number(id);
  if (!numId) notFound();

  const [propRes, centresRes] = await Promise.all([
    supabaseAdmin.from("sc_properties").select("*").eq("id", numId).maybeSingle(),
    supabaseAdmin.from("sc_centres").select("id, name").order("display_order"),
  ]);
  if (!propRes.data) notFound();
  const p = propRes.data as PropertyFormData;
  const centres = (centresRes.data ?? []) as { id: number; name: string }[];

  return (
    <AdminShell active="properties">
      <div className="mb-6">
        <Link href="/admin/properties" className="text-[0.82rem] text-ink-mute hover:text-ink">
          ← All properties
        </Link>
        <h1 className="font-display text-[1.8rem] tracking-[-0.02em] text-ink mt-1">{p.title}</h1>
      </div>
      <PropertyForm data={p} centres={centres} />
    </AdminShell>
  );
}
