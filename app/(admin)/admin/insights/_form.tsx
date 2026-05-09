import { saveInsightAction, deleteInsightAction } from "../actions";
import { ArrayEditor } from "../_array-editor";
import { HeroImagePicker } from "../_image-editor";
import { RichEditor } from "./_editor";

export type InsightFormData = {
  id: number | null;
  slug: string;
  title: string;
  excerpt: string;
  meta_title: string;
  meta_description: string;
  primary_keyword: string;
  secondary_keywords: { value: string }[];
  category: string;
  date: string;
  read_minutes: number;
  cover: string | null;
  body: string;
  faqs: { q: string; a: string }[];
  status: "draft" | "published";
};

export function InsightForm({ data }: { data: InsightFormData }) {
  const isNew = data.id === null;
  return (
    <>
      <form action={saveInsightAction} className="space-y-6 max-w-4xl">
        {data.id !== null && (
          <input type="hidden" name="id" value={data.id} />
        )}

        {/* Identity */}
        <div className="rounded-2xl border border-ink/10 bg-paper p-5 space-y-4">
          <div className="font-mono text-[0.62rem] uppercase tracking-[0.22em] text-stone">
            Identity
          </div>
          <Field
            label="Title"
            name="title"
            defaultValue={data.title}
            required
            hint="The full editorial title — appears as H1 on the published page."
          />
          <div className="grid sm:grid-cols-2 gap-4">
            <Field
              label="Slug (URL)"
              name="slug"
              defaultValue={data.slug}
              hint="Leave blank to auto-generate from the title."
            />
            <label className="block">
              <span className="block text-[0.82rem] text-ink-mute mb-1">
                Status <span className="text-red-500">*</span>
              </span>
              <select
                name="status"
                defaultValue={data.status}
                required
                className="w-full rounded-xl border border-ink/15 bg-paper-soft px-3 py-2 text-[0.92rem] focus:outline-none focus:border-ink/40"
              >
                <option value="published">Published</option>
                <option value="draft">Draft</option>
              </select>
            </label>
          </div>
          <Field
            label="Excerpt"
            name="excerpt"
            defaultValue={data.excerpt}
            textarea
            required
            hint="One- or two-sentence summary. Shown in the listing card and as the pull-quote on the article page."
          />
          <div className="grid sm:grid-cols-3 gap-4">
            <Field
              label="Category"
              name="category"
              defaultValue={data.category}
              required
              hint="e.g. Company formation, Strategy, Tax & compliance"
            />
            <Field
              label="Date"
              name="date"
              defaultValue={data.date}
              type="date"
              required
            />
            <Field
              label="Read minutes"
              name="read_minutes"
              defaultValue={String(data.read_minutes)}
              type="number"
              hint="Leave 0 to auto-calc from body length."
            />
          </div>
        </div>

        {/* Cover */}
        <div className="rounded-2xl border border-ink/10 bg-paper p-5">
          <div className="font-mono text-[0.62rem] uppercase tracking-[0.22em] text-stone mb-3">
            Cover image
          </div>
          <HeroImagePicker name="cover" initialUrl={data.cover} />
          <p className="mt-3 text-[0.78rem] text-ink-mute">
            Renders at 16:9 on the article page (max ~900 px wide). Recommend
            uploading at 1600 × 900 or larger.
          </p>
        </div>

        {/* SEO */}
        <div className="rounded-2xl border border-ink/10 bg-paper p-5 space-y-4">
          <div className="font-mono text-[0.62rem] uppercase tracking-[0.22em] text-stone">
            SEO
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <Field
              label="Meta title"
              name="meta_title"
              defaultValue={data.meta_title}
              hint="60-70 chars. Falls back to the article title if blank."
            />
            <Field
              label="Primary keyword"
              name="primary_keyword"
              defaultValue={data.primary_keyword}
            />
          </div>
          <Field
            label="Meta description"
            name="meta_description"
            defaultValue={data.meta_description}
            textarea
            hint="150-160 chars. Falls back to the excerpt if blank."
          />
          <ValueArrayEditor
            name="secondary_keywords"
            label="Secondary keywords"
            initial={data.secondary_keywords.map((k) => k.value)}
            description="3–5 supporting keywords. Used for internal SEO tracking only — not shown on the article page."
          />
        </div>

        {/* Body — WYSIWYG editor (TipTap). Stored as markdown so the public
            article still renders through react-markdown without any change. */}
        <div className="rounded-2xl border border-ink/10 bg-paper p-5 space-y-3">
          <div className="flex items-center justify-between gap-3">
            <div>
              <div className="font-mono text-[0.62rem] uppercase tracking-[0.22em] text-stone">
                Article body
              </div>
              <p className="text-[0.78rem] text-ink-mute mt-1">
                Just type — bold, headings, lists and links work like any
                normal editor. Use <kbd className="px-1.5 py-0.5 bg-paper-soft border border-ink/15 rounded text-[0.7rem] font-mono">⌘B</kbd>{" "}
                <kbd className="px-1.5 py-0.5 bg-paper-soft border border-ink/15 rounded text-[0.7rem] font-mono">⌘I</kbd>{" "}
                <kbd className="px-1.5 py-0.5 bg-paper-soft border border-ink/15 rounded text-[0.7rem] font-mono">⌘Z</kbd>{" "}
                or the toolbar. Headings auto-become the sticky table of
                contents.
              </p>
            </div>
          </div>
          <RichEditor name="body" initial={data.body} />
        </div>

        {/* FAQs */}
        <div className="rounded-2xl border border-ink/10 bg-paper p-5">
          <div className="font-mono text-[0.62rem] uppercase tracking-[0.22em] text-stone mb-2">
            FAQs
          </div>
          <p className="text-[0.78rem] text-ink-mute mb-3">
            Each Q/A pair appears in the accordion at the bottom of the article.
            Leave the section empty to hide it entirely.
          </p>
          <ArrayEditor<{ q: string; a: string }>
            name="faqs"
            label="Frequently asked"
            fields={[
              { key: "q", label: "Question" },
              { key: "a", label: "Answer", type: "textarea" },
            ]}
            initial={data.faqs}
            template={{ q: "", a: "" }}
          />
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-ink/10">
          <button
            type="submit"
            className="rounded-full bg-brand-night text-paper px-5 py-2.5 text-[0.92rem] font-medium hover:bg-brand transition-colors"
          >
            {isNew ? "Create insight" : "Save changes"}
          </button>
          {!isNew && data.slug && (
            <a
              href={`/insights/${data.slug}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[0.85rem] text-ink-mute hover:text-ink underline"
            >
              View on site →
            </a>
          )}
        </div>
      </form>

      {!isNew && data.id !== null && (
        <form action={deleteInsightAction} className="mt-12 pt-6 border-t border-red-200 max-w-4xl">
          <input type="hidden" name="id" value={data.id} />
          <button type="submit" className="text-[0.82rem] text-red-600 hover:underline">
            Delete this insight
          </button>
        </form>
      )}
    </>
  );
}

function Field({
  label,
  name,
  defaultValue,
  hint,
  required,
  type = "text",
  textarea = false,
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
        {label}
        {required && <span className="text-red-500"> *</span>}
      </span>
      {textarea ? (
        <textarea
          name={name}
          defaultValue={defaultValue}
          required={required}
          rows={3}
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
      {hint && (
        <span className="block text-[0.72rem] text-ink-mute mt-1">{hint}</span>
      )}
    </label>
  );
}

function ValueArrayEditor({
  name,
  label,
  initial,
  description,
}: {
  name: string;
  label: string;
  initial: string[];
  description?: string;
}) {
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
