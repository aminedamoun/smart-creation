import Link from "next/link";
import { requireAdmin } from "@/lib/admin-auth";
import { AdminShell } from "../../_shell";
import { InsightForm, type InsightFormData } from "../_form";

export const dynamic = "force-dynamic";

export default async function NewInsightPage() {
  await requireAdmin();

  const today = new Date().toISOString().slice(0, 10);
  const data: InsightFormData = {
    id: null,
    slug: "",
    title: "",
    excerpt: "",
    meta_title: "",
    meta_description: "",
    primary_keyword: "",
    secondary_keywords: [],
    category: "Insight",
    date: today,
    read_minutes: 0,
    cover: null,
    body: "",
    faqs: [],
    status: "published",
  };

  return (
    <AdminShell active="insights">
      <div className="mb-6">
        <Link
          href="/admin/insights"
          className="text-[0.85rem] text-ink-mute hover:text-ink"
        >
          ← Back to insights
        </Link>
      </div>
      <h1 className="font-display text-[1.75rem] tracking-[-0.02em] text-ink mb-8">
        Create insight
      </h1>
      <InsightForm data={data} />
    </AdminShell>
  );
}
