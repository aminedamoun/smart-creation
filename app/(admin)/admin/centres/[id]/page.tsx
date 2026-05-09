import Link from "next/link";
import { notFound } from "next/navigation";
import { requireAdmin } from "@/lib/admin-auth";
import { supabaseAdmin } from "@/lib/supabase";
import { AdminShell } from "../../_shell";
import { saveCentreAction, deleteCentreAction } from "../../actions";
import { ArrayEditor } from "../../_array-editor";
import { GalleryEditor, HeroImagePicker } from "../../_image-editor";

export const dynamic = "force-dynamic";

type Args = { params: Promise<{ id: string }> };

export default async function CentreEdit({ params }: Args) {
  await requireAdmin();
  const { id } = await params;
  const numId = Number(id);
  if (!numId) notFound();

  const { data } = await supabaseAdmin.from("sc_centres").select("*").eq("id", numId).maybeSingle();
  if (!data) notFound();

  const c = data as {
    id: number; key: string; name: string; tagline: string | null; description: string | null;
    hero_image: string | null; building: string; location: string; address_line: string | null;
    emirate: string; google_maps_url: string | null; phone: string | null; email: string | null;
    display_order: number;
    advantages: { title: string; description?: string }[];
    nearby: { name: string; category: string; distance: string }[];
    gallery: { url: string; caption?: string }[];
  };

  return (
    <AdminShell active="centres">
      <div className="flex items-center justify-between mb-6">
        <div>
          <Link href="/admin/centres" className="text-[0.82rem] text-ink-mute hover:text-ink">
            ← All centres
          </Link>
          <h1 className="font-display text-[1.8rem] tracking-[-0.02em] text-ink mt-1">{c.name}</h1>
        </div>
      </div>

      <form action={saveCentreAction} className="space-y-6 max-w-4xl">
        <input type="hidden" name="id" value={c.id} />

        {/* Identity */}
        <div className="rounded-2xl border border-ink/10 bg-paper p-5 space-y-4">
          <Field label="Key (URL slug)" name="key" defaultValue={c.key} required hint="e.g. smart-creation. Used in /business-centers/<key>" />
          <Field label="Name" name="name" defaultValue={c.name} required />
          <Field label="Tagline" name="tagline" defaultValue={c.tagline ?? ""} />
          <Field label="Description" name="description" defaultValue={c.description ?? ""} textarea />
          <Field label="Display order" name="display_order" defaultValue={String(c.display_order)} type="number" hint="Lower = earlier in lists" />
        </div>

        {/* Hero */}
        <div className="rounded-2xl border border-ink/10 bg-paper p-5">
          <div className="font-mono text-[0.62rem] uppercase tracking-[0.22em] text-stone mb-3">
            Hero image
          </div>
          <HeroImagePicker name="hero_image" initialUrl={c.hero_image} />
        </div>

        {/* Address & contact */}
        <div className="rounded-2xl border border-ink/10 bg-paper p-5 space-y-4">
          <div className="font-mono text-[0.62rem] uppercase tracking-[0.22em] text-stone">
            Address & contact
          </div>
          <Field label="Building" name="building" defaultValue={c.building} required />
          <Field label="Location / area" name="location" defaultValue={c.location} required />
          <Field label="Full street address" name="address_line" defaultValue={c.address_line ?? ""} />
          <Field label="Emirate" name="emirate" defaultValue={c.emirate} required />
          <Field label="Google Maps URL" name="google_maps_url" defaultValue={c.google_maps_url ?? ""} />
          <div className="grid sm:grid-cols-2 gap-4">
            <Field label="Phone" name="phone" defaultValue={c.phone ?? ""} />
            <Field label="Email" name="email" defaultValue={c.email ?? ""} type="email" />
          </div>
        </div>

        <ArrayEditor
          name="advantages"
          label="Advantages"
          description="Bullet points highlighting what makes this centre stand out."
          fields={[
            { key: "title", label: "Title" },
            { key: "description", label: "Description", type: "textarea" },
          ]}
          initial={c.advantages.map((a) => ({ title: a.title, description: a.description ?? "" }))}
          template={{ title: "", description: "" }}
        />

        <ArrayEditor
          name="nearby"
          label="Nearby places"
          fields={[
            { key: "name", label: "Name" },
            { key: "category", label: "Category (metro/mall/landmark/...)" },
            { key: "distance", label: "Distance (e.g. 5 min walk)" },
          ]}
          initial={c.nearby.map((n) => ({ name: n.name, category: n.category, distance: n.distance }))}
          template={{ name: "", category: "landmark", distance: "" }}
        />

        <GalleryEditor name="gallery" initial={c.gallery ?? []} />

        <div className="flex items-center justify-between pt-4 border-t border-ink/10">
          <button
            type="submit"
            className="rounded-full bg-brand-night text-paper px-5 py-2.5 text-[0.92rem] font-medium hover:bg-brand transition-colors"
          >
            Save changes
          </button>
        </div>
      </form>

      <form action={deleteCentreAction} className="mt-12 pt-6 border-t border-red-200 max-w-4xl">
        <input type="hidden" name="id" value={c.id} />
        <button
          type="submit"
          className="text-[0.82rem] text-red-600 hover:underline"
        >
          Delete this centre
        </button>
      </form>
    </AdminShell>
  );
}

function Field({
  label, name, defaultValue, hint, required, type = "text", textarea = false,
}: {
  label: string;
  name: string;
  defaultValue?: string;
  hint?: string;
  required?: boolean;
  type?: string;
  textarea?: boolean;
}) {
  return (
    <label className="block">
      <span className="block text-[0.82rem] text-ink-mute mb-1">
        {label}{required && <span className="text-red-500"> *</span>}
      </span>
      {textarea ? (
        <textarea
          name={name}
          defaultValue={defaultValue}
          required={required}
          rows={4}
          className="w-full rounded-xl border border-ink/15 bg-paper-soft px-3 py-2 text-[0.92rem] focus:outline-none focus:border-ink/40"
        />
      ) : (
        <input
          name={name}
          defaultValue={defaultValue}
          required={required}
          type={type}
          className="w-full rounded-xl border border-ink/15 bg-paper-soft px-3 py-2 text-[0.92rem] focus:outline-none focus:border-ink/40"
        />
      )}
      {hint && <span className="block text-[0.72rem] text-ink-mute mt-1">{hint}</span>}
    </label>
  );
}
