import Link from "next/link";
import Image from "next/image";
import { requireAdmin } from "@/lib/admin-auth";
import { getAllInsightsAdmin } from "@/lib/insights";
import { AdminShell } from "../_shell";

export const dynamic = "force-dynamic";

const fmt = (iso: string) =>
  new Date(iso + "T00:00:00Z").toLocaleDateString("en-GB", {
    year: "numeric",
    month: "short",
    day: "2-digit",
    timeZone: "UTC",
  });

export default async function InsightsList() {
  await requireAdmin();
  const posts = await getAllInsightsAdmin();

  return (
    <AdminShell active="insights">
      <div className="flex items-end justify-between mb-8 gap-4 flex-wrap">
        <div>
          <div className="font-mono text-[0.66rem] uppercase tracking-[0.22em] text-stone mb-2">
            Content
          </div>
          <h1 className="font-display text-[2rem] tracking-[-0.02em] text-ink">
            Insights
          </h1>
          <p className="mt-2 text-[0.92rem] text-ink-mute">
            Long-form blog posts. New ones automatically pick up the same
            premium layout: title, cover, byline, pull-quote, sticky TOC,
            FAQ, related posts, CTA.
          </p>
        </div>
        <Link
          href="/admin/insights/new"
          className="rounded-full bg-brand-night text-paper px-4 py-2 text-[0.88rem] font-medium hover:bg-brand transition-colors"
        >
          + Create insight
        </Link>
      </div>

      {posts.length === 0 ? (
        <p className="text-ink-mute">
          No insights yet. Click "+ Create insight" to add one.
        </p>
      ) : (
        <ul className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {posts.map((p) => (
            <li key={p.id}>
              <Link
                href={`/admin/insights/${p.id}`}
                className="group block rounded-3xl border border-ink/10 bg-paper overflow-hidden hover:border-ink/30 transition-colors"
              >
                <div className="relative aspect-[16/9] bg-paper-soft">
                  {p.cover && (
                    <Image
                      src={p.cover}
                      alt={p.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover"
                    />
                  )}
                  <div className="absolute top-3 left-3 flex gap-1.5">
                    <span
                      className={
                        "rounded-full px-2.5 py-0.5 font-mono text-[0.6rem] uppercase tracking-[0.2em] " +
                        (p.status === "published"
                          ? "bg-emerald-500/90 text-paper"
                          : "bg-amber-500/90 text-ink")
                      }
                    >
                      {p.status}
                    </span>
                    <span className="rounded-full bg-ink/70 backdrop-blur-md px-2.5 py-0.5 font-mono text-[0.6rem] uppercase tracking-[0.2em] text-paper">
                      {p.category}
                    </span>
                  </div>
                </div>
                <div className="p-4">
                  <div className="font-mono text-[0.6rem] uppercase tracking-[0.22em] text-stone">
                    {fmt(p.date)} · {p.readMinutes} min read
                  </div>
                  <h3 className="mt-1 font-display text-[1.05rem] tracking-[-0.01em] text-ink line-clamp-2 leading-snug">
                    {p.title}
                  </h3>
                  <p className="mt-2 text-[0.86rem] text-ink-mute line-clamp-2">
                    {p.excerpt}
                  </p>
                  <div className="mt-3 font-mono text-[0.6rem] uppercase tracking-[0.18em] text-stone truncate">
                    /insights/{p.slug}
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </AdminShell>
  );
}
