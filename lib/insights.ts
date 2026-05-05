import "server-only";
import fs from "fs/promises";
import path from "path";

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

const META: InsightMeta[] = [
  {
    slug: "how-to-start-business-dubai-2026",
    title:
      "How to Start a Business in Dubai in 2026: The Complete Step-by-Step Guide for Foreign Investors",
    excerpt:
      "Activity, jurisdiction, name reservation, MOA, licence, visa and bank — the full 2026 setup playbook in one place. Updated for the latest Corporate Tax, e-invoicing and free-zone rules.",
    metaTitle: "How to Start a Business in Dubai in 2026 | Step-by-Step Guide",
    metaDescription:
      "Planning to start a business in Dubai in 2026? Discover the updated company formation process, costs, licenses, visas, and free zone options in this complete guide by Smart Creation Business Setup Consultancy.",
    primaryKeyword: "start a business in Dubai 2026",
    secondaryKeywords: [
      "business setup in Dubai",
      "company formation Dubai 2026",
      "foreign investor Dubai",
      "Dubai trade license",
      "Dubai mainland vs free zone",
    ],
    category: "Company formation",
    date: "2026-04-12",
    readMinutes: 14,
    cover: "/building/building-4.jpg",
    faqs: [
      {
        q: "How long does it take to set up a company in Dubai in 2026?",
        a: "Mainland LLCs typically take 5–10 working days from name reservation to a stamped trade licence. Free-zone licences are faster — IFZA, Meydan and SHAMS regularly hit 2–5 working days. Expect another 1–3 weeks on top for the establishment card, the residence visa and the corporate bank account.",
      },
      {
        q: "Do I still need a local Emirati sponsor?",
        a: "No — for the vast majority of mainland commercial and industrial activities you can hold 100% of the shares as a foreign founder, no local sponsor and no service-agent fees. A small list of strategic and regulated activities (defence, oil & gas, certain utilities, parts of legal services) still require Emirati participation; we flag that on day one.",
      },
      {
        q: "What's the cheapest credible way to start?",
        a: "AFZA (Ajman Free Zone) and SHAMS (Sharjah Media City) start around AED 5,500–6,000 for year one with a flexi-desk and one visa. IFZA in Dubai sits around AED 12,500. \"Cheaper\" usually means slower banking and tighter activity lists, so we match the zone to the activity rather than the lowest sticker price.",
      },
      {
        q: "Can I open a UAE corporate bank account remotely?",
        a: "Most UAE banks still require an in-person meeting at least once for KYC. We pre-screen the file with the bank, walk you into the meeting prepared and follow up daily until the account is live — typically 2–6 weeks depending on shareholder profile and activity.",
      },
      {
        q: "Do I have to lease a physical office?",
        a: "Mainland companies need an Ejari-compliant lease — flexi-desk options now satisfy this for most activities and are available from our centres. Free-zone companies can use smart desks, flexi desks or executive offices depending on the visa quota required.",
      },
    ],
  },
  {
    slug: "free-zone-vs-mainland-dubai-2026",
    title:
      "Free Zone vs Mainland in Dubai 2026: Which One Will Save You More Tax — and Get You a Better Bank Account?",
    excerpt:
      "Tax structure, banking access, customer base and visa quota — compared honestly. The QFZP rules changed; here's how to pick the jurisdiction that pays off for the next five years.",
    metaTitle: "Free Zone vs Mainland Dubai 2026: Tax, Cost & Banking Compared",
    metaDescription:
      "Free zone vs mainland in Dubai 2026 — which jurisdiction saves you more on corporate tax, gets you a better bank account, and matches your business model? Smart Creation breaks it down with the latest QFZP rules.",
    primaryKeyword: "free zone vs mainland Dubai 2026",
    secondaryKeywords: [
      "Dubai free zone company",
      "Dubai mainland LLC",
      "Qualifying Free Zone Person",
      "corporate tax UAE",
      "business jurisdiction Dubai",
    ],
    category: "Strategy",
    date: "2026-04-22",
    readMinutes: 12,
    cover: "/building/building-2.jpg",
    faqs: [
      {
        q: "Which is cheaper to set up — free zone or mainland?",
        a: "Free zone is usually cheaper to start. AFZA, SHAMS and IFZA can land under AED 15,000 in year one. Mainland LLCs sit higher (AED 18,000–35,000+) once you add Ejari, MOA notarisation and the DET licence fees. Renewal-cost differences shrink over time.",
      },
      {
        q: "Can a free-zone company sell to customers in the UAE?",
        a: "Free-zone companies can sell to other free-zone or international clients freely. Selling directly into the mainland market is restricted — you typically need a local distributor, a service agent, or a dual licence. From a tax perspective, mainland-sourced revenue is also generally not Qualifying Income for the QFZP 0% rate.",
      },
      {
        q: "What is QFZP and do I qualify automatically?",
        a: "Qualifying Free Zone Person (QFZP) is the FTA's status that lets a free-zone company keep 0% Corporate Tax on Qualifying Income. It's not automatic — you must maintain real substance in the zone, derive Qualifying Income, file audited financials, comply with transfer-pricing rules, and stay under the de minimis threshold (lower of 5% of revenue or AED 5M).",
      },
      {
        q: "Which has better banking access?",
        a: "Mainland LLCs are generally easiest to bank — clear UAE jurisdiction, audited books, well-understood structure. Tier-1 free zones (DMCC, DIFC, ADGM, JAFZA, DAFZA) are also strong. Smaller, lower-cost free zones can take longer and require bigger deposits because compliance teams treat them as higher risk.",
      },
      {
        q: "Can I migrate from free zone to mainland (or vice-versa) later?",
        a: "Yes, but it's a re-incorporation — new licence, new establishment card, fresh visa file, and the previous entity has to be cancelled. We usually recommend getting the structure right on day one rather than migrating later. If you do need to switch, expect 2–4 weeks of overlap.",
      },
    ],
  },
  {
    slug: "uae-corporate-tax-vat-2026-guide",
    title:
      "The 2026 UAE Corporate Tax & VAT Survival Guide: New Rules Every Business Owner in Dubai Must Know Before December",
    excerpt:
      "E-invoicing rollouts, the 5-year refund deadline, Small Business Relief sunset, EmaraTax registration and FTA compliance — everything that changes in 2026 and how to be ready.",
    metaTitle: "UAE Corporate Tax & VAT 2026 Guide | New Rules for Dubai Businesses",
    metaDescription:
      "UAE corporate tax and VAT have changed in 2026 — e-invoicing, 5-year refund deadlines, Small Business Relief sunset, and more. Smart Creation breaks down everything Dubai business owners must do before December.",
    primaryKeyword: "UAE corporate tax 2026",
    secondaryKeywords: [
      "VAT amendments UAE 2026",
      "Dubai e-invoicing 2026",
      "Small Business Relief UAE",
      "EmaraTax registration",
      "FTA compliance 2026",
    ],
    category: "Tax & compliance",
    date: "2026-04-30",
    readMinutes: 13,
    cover: "/building/building-7.jpg",
    faqs: [
      {
        q: "What's the UAE Corporate Tax rate in 2026?",
        a: "9% on net profits above AED 375,000 for taxable persons. Profits up to AED 375k are taxed at 0%. Qualifying Free Zone Persons can stay at 0% on Qualifying Income; everything else is 9%. Multinational groups with global revenue above EUR 750M fall under the 15% Domestic Minimum Top-Up Tax.",
      },
      {
        q: "When does VAT registration become mandatory?",
        a: "Mandatory registration kicks in once your taxable supplies + imports exceed AED 375,000 over the prior 12 months. Voluntary registration is allowed from AED 187,500 of supplies or expenses — useful when you want to reclaim VAT on inputs while you scale.",
      },
      {
        q: "What is e-invoicing and when does it start?",
        a: "The UAE is rolling out a Peppol-based e-invoicing framework in 2026. Invoices will be issued and exchanged through accredited service providers in a structured digital format, with real-time reporting to the FTA. Most B2B businesses will need compliant invoicing software in place before the phased start dates published by the Ministry of Finance.",
      },
      {
        q: "What is Small Business Relief and is it still available?",
        a: "Small Business Relief lets eligible UAE-resident persons elect to be treated as having no taxable income — effectively 0% — provided revenue stays at or below AED 3M per tax period. It is currently available through the tax periods ending on or before 31 December 2026, after which the relief sunsets unless extended.",
      },
      {
        q: "When are returns and payments due?",
        a: "Corporate Tax returns and any tax due must be filed within 9 months of the end of the relevant tax period — for a calendar-year filer ending 31 Dec 2025, the deadline is 30 Sep 2026. VAT returns are filed quarterly (or monthly for larger filers) within 28 days of the period end, paid via EmaraTax.",
      },
    ],
  },
];

const FILE_FOR_SLUG: Record<string, string> = {
  "how-to-start-business-dubai-2026": "blog-1-how-to-start-business-dubai-2026.md",
  "free-zone-vs-mainland-dubai-2026": "blog-2-free-zone-vs-mainland-dubai-2026.md",
  "uae-corporate-tax-vat-2026-guide": "blog-3-uae-corporate-tax-vat-2026-guide.md",
};

export function getInsightsList(): InsightMeta[] {
  // Newest first
  return [...META].sort((a, b) => b.date.localeCompare(a.date));
}

export function getInsightMeta(slug: string): InsightMeta | undefined {
  return META.find((m) => m.slug === slug);
}

/**
 * Reads the markdown source for a given insight slug. Strips the leading H1 +
 * meta block (everything up to and including the first `---` divider) so the
 * detail page can render the body without duplicating the title metadata.
 */
export async function getInsightContent(slug: string): Promise<string> {
  const file = FILE_FOR_SLUG[slug];
  if (!file) throw new Error(`No insight found for slug ${slug}`);
  const fullPath = path.join(process.cwd(), "content", "insights", file);
  const raw = await fs.readFile(fullPath, "utf8");
  // Drop everything up to and including the first standalone `---`
  const dividerIdx = raw.indexOf("\n---");
  if (dividerIdx === -1) return raw;
  const after = raw.slice(dividerIdx + 4); // skip "\n---"
  return after.trimStart();
}

/**
 * Extracts H2 headings (and their stable slug ids) from a markdown body in
 * source order. The same id sequence is used both in the TOC links and in the
 * rendered <h2> ids, guaranteeing in-page anchors land correctly.
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
    let base = text
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
