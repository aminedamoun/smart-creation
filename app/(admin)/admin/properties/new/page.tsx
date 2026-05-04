import Link from "next/link";
import { requireAdmin } from "@/lib/admin-auth";
import { supabaseAdmin } from "@/lib/supabase";
import { AdminShell } from "../../_shell";
import { PropertyForm, type PropertyFormData } from "../_form";

export const dynamic = "force-dynamic";

export default async function NewProperty() {
  await requireAdmin();
  const { data: centresData } = await supabaseAdmin
    .from("sc_centres")
    .select("id, name")
    .order("display_order");
  const centres = (centresData ?? []) as { id: number; name: string }[];

  const empty: PropertyFormData = {
    id: null,
    slug: "",
    title: "",
    hero_image: null,
    centre_id: null,
    office_no: "",
    category: "Private office",
    accent: "blue",
    description: "",
    highlights: [],
    featured: false,
    show_on_home: false,
    floor: null,
    sqft: null,
    capacity: "",
    view: null,
    features: [],
    price_amount: "",
    price_period: "/year",
    price_note: "From AED",
    payment_terms: null,
    payment_options: [],
    fees: { securityDeposit: "AED 5,000", managementFee: "AED 1,500", ejariFee: "AED 500", vat: "5%" },
    availability: "Available now",
    availability_accent: "live",
    available_from: null,
    gallery: [],
  };

  return (
    <AdminShell active="properties">
      <div className="mb-6">
        <Link href="/admin/properties" className="text-[0.82rem] text-ink-mute hover:text-ink">
          ← All properties
        </Link>
        <h1 className="font-display text-[1.8rem] tracking-[-0.02em] text-ink mt-1">New property</h1>
      </div>
      <PropertyForm data={empty} centres={centres} />
    </AdminShell>
  );
}
