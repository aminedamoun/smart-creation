/**
 * Insights/blog data layer — reads from the Supabase `sc_insights` table.
 * The frontend page + <InsightArticle> rendering layer is unchanged: as long
 * as we return the same shape, every new admin-written post is rendered with
 * the same premium layout.
 */
import "server-only";
import { supabasePublic, supabaseAdmin } from "./supabase";

export type InsightFaq = { q: string; a: string };

export type InsightMeta = {
  slug: string;
  title: string;
  excerpt: string;
  metaTitle: string;
  metaDescription: string;
  primaryKeyword: string;
  secondaryKeywords: string[];
  category: string;
  date: string; // ISO yyyy-mm-dd
  readMinutes: number;
  cover: string; // hero image src
  faqs: InsightFaq[];
};

export type InsightRow = InsightMeta & {
  id: number;
  body: string;
  status: "draft" | "published";
};

type DbRow = {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  meta_title: string;
  meta_description: string;
  primary_keyword: string;
  secondary_keywords: string[] | null;
  category: string;
  date: string;
  read_minutes: number;
  cover: string;
  body: string;
  faqs: InsightFaq[] | null;
  status: "draft" | "published";
};

function rowToMeta(r: DbRow): InsightMeta {
  return {
    slug: r.slug,
    title: r.title,
    excerpt: r.excerpt,
    metaTitle: r.meta_title || r.title,
    metaDescription: r.meta_description || r.excerpt,
    primaryKeyword: r.primary_keyword,
    secondaryKeywords: Array.isArray(r.secondary_keywords)
      ? r.secondary_keywords
      : [],
    category: r.category,
    date: typeof r.date === "string" ? r.date.slice(0, 10) : r.date,
    readMinutes: r.read_minutes,
    cover: r.cover,
    faqs: Array.isArray(r.faqs) ? r.faqs : [],
  };
}

function rowToFull(r: DbRow): InsightRow {
  return { ...rowToMeta(r), id: r.id, body: r.body, status: r.status };
}

/* ── Public reads (used by frontend pages) ─────────────────────────── */

export async function getInsightsList(): Promise<InsightMeta[]> {
  const { data, error } = await supabasePublic
    .from("sc_insights")
    .select("*")
    .eq("status", "published")
    .order("date", { ascending: false });
  if (error) throw error;
  return (data ?? []).map((r) => rowToMeta(r as DbRow));
}

export async function getInsightMeta(
  slug: string,
): Promise<InsightMeta | undefined> {
  const { data, error } = await supabasePublic
    .from("sc_insights")
    .select("*")
    .eq("slug", slug)
    .eq("status", "published")
    .maybeSingle();
  if (error) throw error;
  return data ? rowToMeta(data as DbRow) : undefined;
}

export async function getInsightContent(slug: string): Promise<string> {
  const { data, error } = await supabasePublic
    .from("sc_insights")
    .select("body")
    .eq("slug", slug)
    .eq("status", "published")
    .maybeSingle();
  if (error) throw error;
  return (data?.body as string | undefined) ?? "";
}

/* ── Admin reads (service-role, includes drafts) ───────────────────── */

export async function getAllInsightsAdmin(): Promise<InsightRow[]> {
  const { data, error } = await supabaseAdmin
    .from("sc_insights")
    .select("*")
    .order("updated_at", { ascending: false });
  if (error) throw error;
  return (data ?? []).map((r) => rowToFull(r as DbRow));
}

export async function getInsightAdmin(
  id: number,
): Promise<InsightRow | undefined> {
  const { data, error } = await supabaseAdmin
    .from("sc_insights")
    .select("*")
    .eq("id", id)
    .maybeSingle();
  if (error) throw error;
  return data ? rowToFull(data as DbRow) : undefined;
}

/* ── Helpers ──────────────────────────────────────────────────────── */

/**
 * Pull `## Heading` lines out of the markdown body, slugify them and
 * return the same `{ id, text }[]` shape the InsightArticle TOC expects.
 * Skips fenced code blocks.
 */
export function extractInsightToc(md: string): { id: string; text: string }[] {
  const lines = md.split("\n");
  const entries: { id: string; text: string }[] = [];
  const seen = new Set<string>();
  let inFence = false;
  for (const line of lines) {
    if (/^```/.test(line.trim())) {
      inFence = !inFence;
      continue;
    }
    if (inFence) continue;
    const m = line.match(/^##\s+(.+?)\s*$/);
    if (!m) continue;
    const text = m[1].trim();
    const base = text
      .toLowerCase()
      .replace(/&/g, " and ")
      .replace(/[^a-z0-9\s-]/g, "")
      .trim()
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-");
    let id = base;
    let suffix = 1;
    while (seen.has(id)) {
      suffix += 1;
      id = `${base}-${suffix}`;
    }
    seen.add(id);
    entries.push({ id, text });
  }
  return entries;
}

/**
 * Roughly estimate read minutes from a markdown body (words / 220 wpm,
 * floored to at least 1).
 */
export function estimateReadMinutes(body: string): number {
  const words = body
    .replace(/```[\s\S]*?```/g, "")
    .split(/\s+/)
    .filter(Boolean).length;
  return Math.max(1, Math.round(words / 220));
}

/**
 * Slugify a title — lowercase, drop punctuation, hyphenate. Re-runs the same
 * algorithm the existing slugs follow.
 */
export function slugifyInsightTitle(title: string): string {
  return title
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

/**
 * Section-based authoring — admin form lets the user fill structured
 * "Heading + Content" fields instead of writing raw markdown. We assemble
 * the markdown body server-side from these sections, then the public page
 * renders them through react-markdown like any other post.
 */
export type InsightSection = {
  heading: string;
  content: string;
};

/**
 * Parse an existing markdown body into ordered sections. The first chunk
 * (before the first `## ` heading) becomes a heading-less "intro" section.
 * Inside each section, leading/trailing whitespace is trimmed but paragraph
 * breaks are preserved.
 */
export function parseInsightSections(body: string): InsightSection[] {
  if (!body || !body.trim()) return [];
  const lines = body.split("\n");
  const sections: InsightSection[] = [];
  let currentHeading = "";
  let currentBody: string[] = [];
  let inFence = false;

  const flush = () => {
    const content = currentBody.join("\n").trim();
    if (currentHeading || content) {
      sections.push({ heading: currentHeading, content });
    }
  };

  for (const line of lines) {
    if (/^```/.test(line.trim())) inFence = !inFence;
    if (!inFence) {
      const m = line.match(/^##\s+(.+?)\s*$/);
      if (m) {
        flush();
        currentHeading = m[1].trim();
        currentBody = [];
        continue;
      }
    }
    currentBody.push(line);
  }
  flush();
  return sections;
}

/**
 * Inverse of `parseInsightSections` — turn the sections back into markdown
 * body text. Heading-less sections render as a free-form intro at the top.
 */
export function assembleInsightSections(sections: InsightSection[]): string {
  const out: string[] = [];
  for (const s of sections) {
    const heading = (s.heading ?? "").trim();
    const content = (s.content ?? "").trim();
    if (!heading && !content) continue;
    if (heading) out.push(`## ${heading}`);
    if (content) out.push(content);
  }
  return out.join("\n\n").trim() + "\n";
}
