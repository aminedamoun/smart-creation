import Link from "next/link";
import { notFound } from "next/navigation";
import { requireAdmin } from "@/lib/admin-auth";
import { getInsightAdmin } from "@/lib/insights";
import { AdminShell } from "../../_shell";
import { InsightForm, type InsightFormData } from "../_form";

export const dynamic = "force-dynamic";

export default async function EditInsightPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await requireAdmin();
  const { id } = await params;
  const post = await getInsightAdmin(Number(id));
  if (!post) notFound();

  const data: InsightFormData = {
    id: post.id,
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt,
    meta_title: post.metaTitle,
    meta_description: post.metaDescription,
    primary_keyword: post.primaryKeyword,
    secondary_keywords: post.secondaryKeywords.map((v) => ({ value: v })),
    category: post.category,
    date: post.date,
    read_minutes: post.readMinutes,
    cover: post.cover || null,
    body: post.body,
    faqs: post.faqs,
    status: post.status,
  };

  return (
    <AdminShell active="insights">
      <div className="mb-6 flex items-center justify-between">
        <Link
          href="/admin/insights"
          className="text-[0.85rem] text-ink-mute hover:text-ink"
        >
          ← Back to insights
        </Link>
        <span
          className={
            "rounded-full px-3 py-1 font-mono text-[0.6rem] uppercase tracking-[0.18em] " +
            (post.status === "published"
              ? "bg-emerald-500/15 text-emerald-700 border border-emerald-500/30"
              : "bg-amber-500/15 text-amber-700 border border-amber-500/30")
          }
        >
          {post.status}
        </span>
      </div>
      <h1 className="font-display text-[1.75rem] tracking-[-0.02em] text-ink mb-1">
        {post.title}
      </h1>
      <div className="font-mono text-[0.66rem] uppercase tracking-[0.22em] text-stone mb-8">
        /insights/{post.slug}
      </div>
      <InsightForm data={data} />
    </AdminShell>
  );
}
