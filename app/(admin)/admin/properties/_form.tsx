import { savePropertyAction, deletePropertyAction } from "../actions";
import { ArrayEditor } from "../_array-editor";
import { GalleryEditor, HeroImagePicker } from "../_image-editor";

type Centre = { id: number; name: string };

export type PropertyFormData = {
  id: number | null;
  slug: string;
  title: string;
  hero_image: string | null;
  centre_id: number | null;
  office_no: string;
  category: string;
  accent: string;
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
    securityDeposit?: string; managementFee?: string; ejariFee?: string;
    ddaNoc?: string; vat?: string; parking?: string;
  };
  availability: string;
  availability_accent: string;
  available_from: string | null;
  gallery: { url: string; caption?: string }[];
};

export function PropertyForm({ data, centres }: { data: PropertyFormData; centres: Centre[] }) {
  const isNew = data.id === null;
  return (
    <>
      <form action={savePropertyAction} className="space-y-6 max-w-4xl">
        {data.id !== null && <input type="hidden" name="id" value={data.id} />}

        {/* Identity */}
        <div className="rounded-2xl border border-ink/10 bg-paper p-5 space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <Field label="Title" name="title" defaultValue={data.title} required />
            <Field label="Office number" name="office_no" defaultValue={data.office_no} required hint="e.g. Office 14" />
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <Field label="Slug (URL)" name="slug" defaultValue={data.slug} required hint="e.g. office-14" />
            <label className="block">
              <span className="block text-[0.82rem] text-ink-mute mb-1">Centre <span className="text-red-500">*</span></span>
              <select
                name="centre_id"
                defaultValue={data.centre_id ?? ""}
                required
                className="w-full rounded-xl border border-ink/15 bg-paper-soft px-3 py-2 text-[0.92rem] focus:outline-none focus:border-ink/40"
              >
                <option value="">Select a centre…</option>
                {centres.map((c) => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            </label>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <label className="block">
              <span className="block text-[0.82rem] text-ink-mute mb-1">Category</span>
              <select name="category" defaultValue={data.category} className="w-full rounded-xl border border-ink/15 bg-paper-soft px-3 py-2 text-[0.92rem] focus:outline-none focus:border-ink/40">
                <option>Private office</option>
                <option>Co-working</option>
                <option>Dedicated desk</option>
              </select>
            </label>
            <label className="block">
              <span className="block text-[0.82rem] text-ink-mute mb-1">Accent</span>
              <select name="accent" defaultValue={data.accent} className="w-full rounded-xl border border-ink/15 bg-paper-soft px-3 py-2 text-[0.92rem] focus:outline-none focus:border-ink/40">
                <option value="blue">Blue</option>
                <option value="stone">Stone</option>
                <option value="sand">Sand</option>
              </select>
            </label>
          </div>
          <Field label="Description" name="description" defaultValue={data.description} textarea required />
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            <label className="inline-flex items-center gap-2">
              <input type="checkbox" name="featured" defaultChecked={data.featured} />
              <span className="text-[0.88rem]">Featured (gold star + sort first)</span>
            </label>
            <label className="inline-flex items-center gap-2">
              <input type="checkbox" name="show_on_home" defaultChecked={data.show_on_home} />
              <span className="text-[0.88rem]">Show on home page</span>
            </label>
          </div>
        </div>

        {/* Hero */}
        <div className="rounded-2xl border border-ink/10 bg-paper p-5">
          <div className="font-mono text-[0.62rem] uppercase tracking-[0.22em] text-stone mb-3">
            Hero image
          </div>
          <HeroImagePicker name="hero_image" initialUrl={data.hero_image} />
        </div>

        {/* Specs */}
        <div className="rounded-2xl border border-ink/10 bg-paper p-5 space-y-4">
          <div className="font-mono text-[0.62rem] uppercase tracking-[0.22em] text-stone">Specs</div>
          <div className="grid sm:grid-cols-3 gap-4">
            <Field label="Size (sqft)" name="sqft" defaultValue={data.sqft ?? ""} />
            <Field label="Capacity" name="capacity" defaultValue={data.capacity} required hint="e.g. 4–5 desks" />
            <Field label="View" name="view" defaultValue={data.view ?? ""} />
          </div>
          <Field label="Floor (overrides centre default)" name="floor" defaultValue={data.floor ?? ""} />
          <ValueArrayEditor name="features" label="Features" initial={data.features.map((f) => f.value)} />
        </div>

        {/* Pricing & fees */}
        <div className="rounded-2xl border border-ink/10 bg-paper p-5 space-y-4">
          <div className="font-mono text-[0.62rem] uppercase tracking-[0.22em] text-stone">Pricing & fees</div>
          <div className="grid sm:grid-cols-3 gap-4">
            <Field label="Price" name="price_amount" defaultValue={data.price_amount} required />
            <Field label="Period" name="price_period" defaultValue={data.price_period ?? ""} hint="e.g. /year" />
            <Field label="Note" name="price_note" defaultValue={data.price_note ?? ""} hint="e.g. From AED" />
          </div>
          <Field label="Payment terms" name="payment_terms" defaultValue={data.payment_terms ?? ""} />
          <ValueArrayEditor name="payment_options" label="Payment options" initial={data.payment_options.map((p) => p.value)} />
          <div className="grid sm:grid-cols-3 gap-3">
            <Field label="Security deposit" name="fee_securityDeposit" defaultValue={data.fees.securityDeposit ?? ""} />
            <Field label="Management fee" name="fee_managementFee" defaultValue={data.fees.managementFee ?? ""} />
            <Field label="Ejari fee" name="fee_ejariFee" defaultValue={data.fees.ejariFee ?? ""} />
            <Field label="DDA NOC" name="fee_ddaNoc" defaultValue={data.fees.ddaNoc ?? ""} />
            <Field label="VAT" name="fee_vat" defaultValue={data.fees.vat ?? ""} />
            <Field label="Parking" name="fee_parking" defaultValue={data.fees.parking ?? ""} />
          </div>
        </div>

        {/* Availability */}
        <div className="rounded-2xl border border-ink/10 bg-paper p-5 space-y-4">
          <div className="font-mono text-[0.62rem] uppercase tracking-[0.22em] text-stone">Availability</div>
          <Field label="Availability label" name="availability" defaultValue={data.availability} required hint='e.g. "Available now" or "Available 1 Aug 2025"' />
          <div className="grid sm:grid-cols-2 gap-4">
            <label className="block">
              <span className="block text-[0.82rem] text-ink-mute mb-1">Status</span>
              <select name="availability_accent" defaultValue={data.availability_accent} className="w-full rounded-xl border border-ink/15 bg-paper-soft px-3 py-2 text-[0.92rem] focus:outline-none focus:border-ink/40">
                <option value="live">Live (available now)</option>
                <option value="upcoming">Upcoming</option>
              </select>
            </label>
            <Field label="Available from" name="available_from" defaultValue={data.available_from ?? ""} type="date" />
          </div>
        </div>

        <ValueArrayEditor name="highlights" label="Highlights" initial={data.highlights.map((h) => h.value)} description="Short bullet points shown on the property page." />

        <GalleryEditor name="gallery" initial={data.gallery ?? []} />

        <div className="flex items-center justify-between pt-4 border-t border-ink/10">
          <button
            type="submit"
            className="rounded-full bg-ink text-paper px-5 py-2.5 text-[0.92rem] font-medium hover:bg-brand-deep transition-colors"
          >
            {isNew ? "Create property" : "Save changes"}
          </button>
        </div>
      </form>

      {!isNew && data.id !== null && (
        <form action={deletePropertyAction} className="mt-12 pt-6 border-t border-red-200 max-w-4xl">
          <input type="hidden" name="id" value={data.id} />
          <button type="submit" className="text-[0.82rem] text-red-600 hover:underline">
            Delete this property
          </button>
        </form>
      )}
    </>
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

function ValueArrayEditor({ name, label, initial, description }: { name: string; label: string; initial: string[]; description?: string }) {
  return (
    <ArrayEditor<{ value: string }>
      name={name}
      label={label}
      description={description}
      fields={[{ key: "value", label: "Value" }]}
      initial={initial.map((v) => ({ value: v }))}
      template={{ value: "" }}
    />
  );
}
