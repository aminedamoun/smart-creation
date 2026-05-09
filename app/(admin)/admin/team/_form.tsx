"use client";

import Link from "next/link";
import { ArrowLeft, Eye } from "lucide-react";
import { HeroImagePicker } from "../_image-editor";
import { saveTeamMemberAction } from "../actions";

type Initial = {
  id?: number;
  name?: string;
  role?: string;
  photo?: string | null;
  linkedin?: string | null;
  visible?: boolean;
};

export function TeamMemberForm({ initial }: { initial?: Initial }) {
  const isEdit = Boolean(initial?.id);

  return (
    <form action={saveTeamMemberAction} className="max-w-3xl">
      {initial?.id && <input type="hidden" name="id" value={initial.id} />}

      <Link
        href="/admin/team"
        className="inline-flex items-center gap-1.5 mb-6 text-[0.85rem] text-ink-mute hover:text-ink transition-colors"
      >
        <ArrowLeft className="h-3.5 w-3.5" strokeWidth={1.8} />
        All members
      </Link>

      <div className="font-mono text-[0.66rem] uppercase tracking-[0.22em] text-stone mb-2">
        {isEdit ? "Edit member" : "Add member"}
      </div>
      <h1 className="font-display text-[1.75rem] tracking-[-0.02em] text-ink mb-8">
        {isEdit ? initial?.name : "New team member"}
      </h1>

      {/* Photo */}
      <section className="mb-8">
        <Label>Photo</Label>
        <Hint>Square or 3:4 portrait works best. Falls back to initials if empty.</Hint>
        <div className="mt-3">
          <HeroImagePicker name="photo" initialUrl={initial?.photo} />
        </div>
      </section>

      {/* Name */}
      <section className="mb-6">
        <Label htmlFor="name">Full name</Label>
        <input
          id="name"
          name="name"
          required
          defaultValue={initial?.name ?? ""}
          placeholder="Jane Doe"
          className="mt-2 w-full rounded-xl border border-ink/15 bg-paper px-4 py-2.5 text-[0.95rem] text-ink placeholder:text-ink-mute focus:outline-none focus:border-ink/40"
        />
      </section>

      {/* Role */}
      <section className="mb-6">
        <Label htmlFor="role">Role / title</Label>
        <input
          id="role"
          name="role"
          defaultValue={initial?.role ?? ""}
          placeholder="Business Setup Consultant"
          className="mt-2 w-full rounded-xl border border-ink/15 bg-paper px-4 py-2.5 text-[0.95rem] text-ink placeholder:text-ink-mute focus:outline-none focus:border-ink/40"
        />
      </section>

      {/* LinkedIn */}
      <section className="mb-8">
        <Label htmlFor="linkedin">LinkedIn URL</Label>
        <Hint>Optional. Adds a LinkedIn icon on their card.</Hint>
        <input
          id="linkedin"
          name="linkedin"
          type="url"
          defaultValue={initial?.linkedin ?? ""}
          placeholder="https://www.linkedin.com/in/…"
          className="mt-2 w-full rounded-xl border border-ink/15 bg-paper px-4 py-2.5 text-[0.95rem] text-ink placeholder:text-ink-mute focus:outline-none focus:border-ink/40"
        />
      </section>

      {/* Visibility */}
      <section className="mb-10">
        <label className="cursor-pointer flex items-start gap-3 rounded-2xl border border-ink/10 bg-paper p-4 hover:border-ink/25 has-[:checked]:border-brand/50 has-[:checked]:bg-brand/[0.04] transition-colors max-w-md">
          <input
            type="checkbox"
            name="visible"
            defaultChecked={initial?.visible ?? true}
            className="peer sr-only"
          />
          <span className="mt-0.5 inline-flex h-7 w-7 items-center justify-center rounded-full bg-paper-soft border border-ink/10 text-ink-mute peer-checked:bg-brand peer-checked:text-ink peer-checked:border-brand transition-colors">
            <Eye className="h-3.5 w-3.5" strokeWidth={1.8} />
          </span>
          <span className="min-w-0 flex-1">
            <span className="block font-display text-[0.98rem] tracking-[-0.01em] text-ink">
              Visible on About page
            </span>
            <span className="block mt-0.5 text-[0.82rem] text-ink-mute">
              Toggle off to hide without deleting.
            </span>
          </span>
          <span className="mt-1 inline-flex h-5 w-9 shrink-0 items-center rounded-full bg-paper-soft border border-ink/10 peer-checked:bg-brand peer-checked:border-brand transition-colors">
            <span className="ml-0.5 h-4 w-4 rounded-full bg-paper border border-ink/15 peer-checked:translate-x-4 transition-transform" />
          </span>
        </label>
      </section>

      <div className="flex items-center gap-3">
        <button
          type="submit"
          className="rounded-full bg-ink px-5 py-2.5 text-[0.92rem] text-paper hover:bg-brand-night transition-colors"
        >
          {isEdit ? "Save changes" : "Add member"}
        </button>
        <Link
          href="/admin/team"
          className="rounded-full border border-ink/15 bg-paper px-5 py-2.5 text-[0.92rem] text-ink-mute hover:text-ink hover:border-ink/40 transition-colors"
        >
          Cancel
        </Link>
      </div>
    </form>
  );
}

function Label({
  children,
  htmlFor,
}: {
  children: React.ReactNode;
  htmlFor?: string;
}) {
  return (
    <label
      htmlFor={htmlFor}
      className="font-mono text-[0.62rem] uppercase tracking-[0.22em] text-stone"
    >
      {children}
    </label>
  );
}

function Hint({ children }: { children: React.ReactNode }) {
  return <p className="mt-1.5 text-[0.82rem] text-ink-mute">{children}</p>;
}
