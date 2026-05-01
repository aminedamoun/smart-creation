import type { LucideIcon } from "lucide-react";
import {
  Building2,
  Landmark,
  Globe2,
  IdCard,
  Banknote,
  Calculator,
  Briefcase,
  ShieldCheck,
  Bus,
  Cpu,
  Home,
  HardHat,
  Building,
} from "lucide-react";

// ── Brand & company ──────────────────────────────────────────────────
export const BRAND = {
  group: "Smart Creation Group",
  groupLong: "Smart Creation Group of Companies",
  shortMark: "SCG",
  founded: 2013,
  ceo: "Asad Hashmi",
  ceoTitle: "C.E.O of Smart Creation Group of Companies",
  tagline: "Your Trusted Partner in Business Success",
  mission:
    "To empower businesses by providing seamless, efficient, and innovative solutions for business setup, licensing, corporate structuring, and office space solutions. We aim to remove the complexities associated with establishing and managing a business in the UAE — enabling entrepreneurs and enterprises to focus on growth, productivity, and success.",
  vision:
    "To become the leading workspace provider and business consultancy in the UAE — recognised for excellence, innovation, and client satisfaction. We aspire to create a business ecosystem where entrepreneurs can thrive, leveraging our expertise, resources, and cutting-edge office solutions.",
};

export type MegaLink = {
  label: string;
  href: string;
  desc?: string;
  badge?: string;
};

export type MegaGroup = {
  title: string;
  links: MegaLink[];
};

export type MegaFeature = {
  eyebrow: string;
  title: string;
  body: string;
  cta: { label: string; href: string };
};

export type NavItem = {
  label: string;
  href: string;
  mega?: {
    groups: MegaGroup[];
    feature?: MegaFeature;
    footer?: { label: string; href: string };
  };
};

export const navigation: NavItem[] = [
  {
    label: "Services",
    href: "/services",
    mega: {
      groups: [
        {
          title: "Company formation",
          links: [
            { label: "Mainland setup", href: "/services/mainland", desc: "Dubai DET license, LLC, branches" },
            { label: "Free zone setup", href: "/services/free-zone", desc: "Every major UAE free zone" },
            { label: "Offshore structure", href: "/services/offshore", desc: "JAFZA, RAK ICC, Ajman" },
            { label: "Holding & subsidiary", href: "/services/holding", desc: "Group structuring" },
          ],
        },
        {
          title: "Visas & residency",
          links: [
            { label: "PRO services", href: "/services/pro-visa", desc: "Visa, Emirates ID, labour" },
            { label: "Investor visa", href: "/services/investor-visa", desc: "2, 5 and 10-year options" },
            { label: "Golden visa", href: "/services/golden-visa", desc: "10-year long-term residency", badge: "Popular" },
            { label: "Family sponsorship", href: "/services/family-visa", desc: "Spouse, children, parents" },
          ],
        },
        {
          title: "Financial",
          links: [
            { label: "Corporate banking", href: "/services/banking", desc: "UAE & international banks" },
            { label: "Accounting & VAT", href: "/services/accounting", desc: "Monthly books, VAT filing" },
            { label: "Corporate tax", href: "/services/corporate-tax", desc: "Registration, returns, advisory" },
            { label: "Audit", href: "/services/audit", desc: "Statutory, internal, due diligence" },
          ],
        },
        {
          title: "Compliance & licensing",
          links: [
            { label: "Trademark", href: "/services/trademark", desc: "UAE & international filing" },
            { label: "AML / ESR / UBO", href: "/services/compliance", desc: "Frameworks and filings" },
            { label: "Document attestation", href: "/services/attestation", desc: "MOFA, notarisation, embassy" },
            { label: "License renewal", href: "/services/renewal", desc: "Annual renewals across zones" },
          ],
        },
      ],
      feature: {
        eyebrow: "Free · 45 min",
        title: "Tell us what you're building. We'll come back with a plan.",
        body: "Jurisdiction, costs, timeline, banking, visa quota — written up within one business day. No sales script.",
        cta: { label: "Book consultation", href: "/contact" },
      },
      footer: { label: "View all services", href: "/services" },
    },
  },
  {
    label: "Free Zones",
    href: "/free-zones",
    mega: {
      groups: [
        {
          title: "Dubai",
          links: [
            { label: "IFZA", href: "/free-zones/ifza", desc: "International Free Zone Authority" },
            { label: "DMCC", href: "/free-zones/dmcc", desc: "Multi Commodities Centre" },
            { label: "JAFZA", href: "/free-zones/jafza", desc: "Jebel Ali Free Zone" },
            { label: "DIFC", href: "/free-zones/difc", desc: "International Financial Centre" },
            { label: "Meydan", href: "/free-zones/meydan", desc: "Professional services" },
            { label: "DAFZA", href: "/free-zones/dafza", desc: "Airport Free Zone" },
            { label: "DWTC", href: "/free-zones/dwtc", desc: "World Trade Centre" },
            { label: "DCC", href: "/free-zones/dcc", desc: "Dubai CommerCity — e-commerce" },
          ],
        },
        {
          title: "Sharjah & northern emirates",
          links: [
            { label: "SHAMS", href: "/free-zones/shams", desc: "Sharjah Media City" },
            { label: "SPC", href: "/free-zones/spc", desc: "Sharjah Publishing City" },
            { label: "RAKEZ", href: "/free-zones/rakez", desc: "Ras Al Khaimah Economic Zone" },
            { label: "AFZA", href: "/free-zones/ajman", desc: "Ajman Free Zone" },
          ],
        },
      ],
      feature: {
        eyebrow: "Decision tool",
        title: "Not sure which zone fits?",
        body: "Compare all twelve side-by-side — cost, visa quota, activity list, setup time and Corporate Tax impact.",
        cta: { label: "Open the comparison", href: "/compare" },
      },
      footer: { label: "Every zone we cover", href: "/free-zones" },
    },
  },
  {
    label: "Business Centers",
    href: "/business-centers",
  },
  {
    label: "About",
    href: "/about",
  },
  {
    label: "Insights",
    href: "/insights",
  },
  {
    label: "Contact",
    href: "/contact",
  },
];

// ── Group business centres (UAE) ─────────────────────────────────────
export type GroupCenter = {
  id: string;
  index: string;
  name: string;
  city: string;
  country: "UAE";
  address: string;
  summary: string;
  highlights: string[];
};

export const groupCenters: GroupCenter[] = [
  {
    id: "smart-creation",
    index: "01",
    name: "Smart Creation Business Center",
    city: "Dubai",
    country: "UAE",
    address: "19th Floor, Damac Executive Heights (Tecom), Jebel Ali Race Course Road, Dubai",
    summary:
      "The flagship — 500 fully equipped, flexible offices ideal for startups and established businesses, with end-to-end company formation, PRO and tax support on the same floor.",
    highlights: [
      "500 serviced offices",
      "Business setup & licensing",
      "Local sponsorship & corporate structuring",
      "PRO services & financial / tax consultancy",
    ],
  },
  {
    id: "smart-place",
    index: "02",
    name: "Smart Place Business Center",
    city: "Dubai",
    country: "UAE",
    address: "Floor 226, Iridium Building, Umm Suqeim Street, Al Barsha, Dubai",
    summary:
      "Modern, well-equipped workspace tailored for entrepreneurs, startups and established businesses — flexible office solutions with full setup and corporate support.",
    highlights: [
      "Flexible furnished offices",
      "Company formation",
      "Corporate support & PRO",
    ],
  },
  {
    id: "smart-view",
    index: "03",
    name: "Smart View Business Center",
    city: "Bur Dubai",
    country: "UAE",
    address: "Al Arif Building, 15A Street, Al Hamriya, Bur Dubai, Dubai",
    summary:
      "A professional business hub in a prime commercial location — fully equipped offices in a credible, efficient environment that supports daily operations and growth.",
    highlights: [
      "Serviced offices",
      "Business setup & licensing",
      "Local sponsorship & corporate structuring",
      "Financial & tax consultancy",
    ],
  },
  {
    id: "future-space",
    index: "04",
    name: "Future Space Business Center",
    city: "Al Muraqabat, Dubai",
    country: "UAE",
    address: "2nd Floor, Block A, Dubai Municipality Building, Salah Al Din Street, Al Muraqabat, Dubai",
    summary:
      "A premium business hub for modern entrepreneurs, startups and growing companies — fully furnished serviced offices, flexible workstations and modern meeting facilities.",
    highlights: [
      "Premium serviced offices",
      "Flexi desks & virtual offices",
      "Complete company setup",
      "Professional PRO services",
    ],
  },
];

// ── The wider Group of Companies ─────────────────────────────────────
export type GroupCompany = {
  id: string;
  name: string;
  sector: string;
  country: string;
  flag: string;
  summary: string;
  icon: LucideIcon;
  /** Optional brand-mark file under /public/group-logos/. When provided,
   *  the card uses the official logo instead of the lucide icon. */
  logo?: string;
};

export const groupCompanies: GroupCompany[] = [
  {
    id: "smart-creation-bc",
    name: "Smart Creation Business Center",
    sector: "Business Centers · UAE",
    country: "UAE",
    flag: "🇦🇪",
    summary:
      "Flagship 500-office business centre at Damac Executive Heights — end-to-end company formation, licensing, PRO and tax services.",
    icon: Building2,
    logo: "/group-logos/smart-creation-bc.png",
  },
  {
    id: "smart-place-bc",
    name: "Smart Place Business Center",
    sector: "Business Centers · UAE",
    country: "UAE",
    flag: "🇦🇪",
    summary:
      "Modern flexible workspace at Iridium Building, Al Barsha — tailored for entrepreneurs and growing teams.",
    icon: Building2,
    logo: "/group-logos/smart-place.webp",
  },
  {
    id: "smart-view-bc",
    name: "Smart View Business Center",
    sector: "Business Centers · UAE",
    country: "UAE",
    flag: "🇦🇪",
    summary:
      "Professional business hub in Bur Dubai for credible daily operations and confident growth.",
    icon: Building2,
  },
  {
    id: "future-space-bc",
    name: "Future Space Business Center",
    sector: "Business Centers · UAE",
    country: "UAE",
    flag: "🇦🇪",
    summary:
      "Premium serviced offices, flexi desks and virtual offices on Salah Al Din Street, Al Muraqabat.",
    icon: Building2,
  },
  {
    id: "abna-rashid",
    name: "Abna Rashid Hamd Bin Huwaidi Building",
    sector: "Real Estate · UAE",
    country: "UAE",
    flag: "🇦🇪",
    summary:
      "Premium residential, commercial and retail property in Deira, managed by Daw Alard Real Estate Management Supervision Services L.L.C.",
    icon: Building,
  },
  {
    id: "next-journey",
    name: "Next Journey Technology",
    sector: "AI · Software · Digital · UAE",
    country: "UAE",
    flag: "🇦🇪",
    summary:
      "Dubai-headquartered technology arm — AI, mobile and web development, cyber-security, IoT, IT infrastructure and digital marketing.",
    icon: Cpu,
    logo: "/group-logos/next-journey.webp",
  },
  {
    id: "smart-holiday-homes",
    name: "Smart Holiday Homes",
    sector: "Hospitality · UAE",
    country: "UAE",
    flag: "🇦🇪",
    summary:
      "Fully furnished short-term holiday rentals across Dubai — guest welcome, professional cleaning and 24/7 support included.",
    icon: Home,
    logo: "/group-logos/smart-holiday-homes.webp",
  },
  {
    id: "intercity-bus",
    name: "Intercity Bus Service",
    sector: "Transport · Canada",
    country: "Canada",
    flag: "🇨🇦",
    summary:
      "Premier intercity transportation based in London, Ontario — scheduled routes, charter services and a value card programme.",
    icon: Bus,
    logo: "/group-logos/intercity-bus.webp",
  },
  {
    id: "mm-contractor",
    name: "MM Contractor & General Order Supplies",
    sector: "Construction · Pakistan",
    country: "Pakistan",
    flag: "🇵🇰",
    summary:
      "Pakistan-based contracting company — infrastructure, road development, civil works and general contracting for public and private projects.",
    icon: HardHat,
    logo: "/group-logos/mm-contractor.webp",
  },
];

// ── Leadership team ──────────────────────────────────────────────────
export type TeamMember = {
  name: string;
  role: string;
};

export const team: TeamMember[] = [
  { name: "Mahwish", role: "Managing Partner" },
  { name: "Shrushti Gupta", role: "Business Operations Manager" },
  { name: "Yulia Golovko", role: "HR Manager" },
  { name: "Shaista Rehman", role: "Business Development Manager" },
  { name: "Saeed Ur Rehman", role: "Manager Audit, Compliance & Advisory" },
  { name: "Khakan Abbasi", role: "Business & Banking Setup Consultant" },
];

export type Service = {
  id: string;
  index: string;
  title: string;
  summary: string;
  href: string;
  icon: LucideIcon;
};

export const services: Service[] = [
  {
    id: "mainland",
    index: "01",
    title: "Mainland Company Formation",
    summary:
      "Dubai Department of Economy & Tourism licensing for LLCs, branches, and professional firms — with no restriction on where you can trade.",
    href: "/services/mainland",
    icon: Landmark,
  },
  {
    id: "free-zone",
    index: "02",
    title: "Free Zone Setup",
    summary:
      "Direct relationships with every major UAE free zone. We recommend the right one for your sector — IFZA, DMCC, JAFZA, DIFC, and nine more.",
    href: "/services/free-zone",
    icon: Building2,
  },
  {
    id: "offshore",
    index: "03",
    title: "Offshore Incorporation",
    summary:
      "JAFZA Offshore, RAK ICC, and Ajman Offshore structures for holding, asset protection, and international trade.",
    href: "/services/offshore",
    icon: Globe2,
  },
  {
    id: "pro-visa",
    index: "04",
    title: "PRO & Visa Services",
    summary:
      "Investor, employment, family, and Golden Visa processing. Emirates ID, medical, Tawjeeh — handled by our in-house PRO team.",
    href: "/services/pro-visa",
    icon: IdCard,
  },
  {
    id: "banking",
    index: "05",
    title: "Corporate Banking",
    summary:
      "Introductions, pre-qualification, and full application support for Emirates NBD, Mashreq, HSBC, ADCB, WIO and more.",
    href: "/services/banking",
    icon: Banknote,
  },
  {
    id: "accounting",
    index: "06",
    title: "Accounting, VAT & Corporate Tax",
    summary:
      "Monthly bookkeeping, VAT returns, Corporate Tax registration and filing, statutory audit. FTA-compliant, on time.",
    href: "/services/accounting",
    icon: Calculator,
  },
  {
    id: "business-centers",
    index: "07",
    title: "Four Business Centers",
    summary:
      "Private offices, dedicated desks, virtual addresses and meeting rooms across four owned-and-operated locations in Dubai — from Tecom to Bur Dubai to Al Muraqabat.",
    href: "/business-centers",
    icon: Briefcase,
  },
  {
    id: "compliance",
    index: "08",
    title: "Compliance & Licensing",
    summary:
      "AML/CFT frameworks, UBO & ESR filings, trademark registration, document attestation, and annual license renewals.",
    href: "/services/compliance",
    icon: ShieldCheck,
  },
];

export type FreeZone = {
  code: string;
  name: string;
  emirate: string;
  focus: string;
  leadTime: string;
  href: string;
};

export const freeZones: FreeZone[] = [
  { code: "IFZA", name: "International Free Zone Authority", emirate: "Dubai", focus: "General trading & services", leadTime: "3–5 days", href: "/free-zones/ifza" },
  { code: "DMCC", name: "Dubai Multi Commodities Centre", emirate: "Dubai", focus: "Commodities & global trade", leadTime: "7–10 days", href: "/free-zones/dmcc" },
  { code: "JAFZA", name: "Jebel Ali Free Zone", emirate: "Dubai", focus: "Industrial & logistics", leadTime: "5–10 days", href: "/free-zones/jafza" },
  { code: "MEYDAN", name: "Meydan Free Zone", emirate: "Dubai", focus: "Professional services", leadTime: "3–5 days", href: "/free-zones/meydan" },
  { code: "DIFC", name: "Dubai International Financial Centre", emirate: "Dubai", focus: "Finance & fintech", leadTime: "4–6 weeks", href: "/free-zones/difc" },
  { code: "DAFZA", name: "Dubai Airport Free Zone", emirate: "Dubai", focus: "Aviation & e-commerce", leadTime: "5–7 days", href: "/free-zones/dafza" },
  { code: "DCC", name: "Dubai CommerCity", emirate: "Dubai", focus: "E-commerce & digital", leadTime: "5–7 days", href: "/free-zones/dcc" },
  { code: "DWTC", name: "Dubai World Trade Centre", emirate: "Dubai", focus: "Events & services", leadTime: "5–7 days", href: "/free-zones/dwtc" },
  { code: "SHAMS", name: "Sharjah Media City", emirate: "Sharjah", focus: "Media & creative", leadTime: "2–4 days", href: "/free-zones/shams" },
  { code: "SPC", name: "Sharjah Publishing City", emirate: "Sharjah", focus: "Publishing & content", leadTime: "3–5 days", href: "/free-zones/spc" },
  { code: "RAKEZ", name: "Ras Al Khaimah Economic Zone", emirate: "RAK", focus: "Industrial & SME", leadTime: "3–5 days", href: "/free-zones/rakez" },
  { code: "AFZA", name: "Ajman Free Zone", emirate: "Ajman", focus: "SMEs & low-cost trade", leadTime: "2–4 days", href: "/free-zones/ajman" },
];

export type Differentiator = {
  index: string;
  title: string;
  body: string;
};

export const differentiators: Differentiator[] = [
  {
    index: "01",
    title: "Four real offices, not a PO box",
    body:
      "We own and operate four business centres across Dubai — Damac Executive Heights, Iridium Tower (Al Barsha), Al Hamriya (Bur Dubai) and Salah Al Din Street (Al Muraqabat). When investors or clients visit you, they walk into a professional address — not a virtual mailbox.",
  },
  {
    index: "02",
    title: "A group, not a single agency",
    body:
      "Smart Creation Group brings together business centres, real estate, technology (Next Journey), holiday rentals, transport and contracting under one roof. One relationship that grows with you, across sectors and borders.",
  },
  {
    index: "03",
    title: "Twelve years. Ten thousand companies.",
    body:
      "Trusted since 2013 by founders, family offices and multinationals. The edge cases you're about to hit — we've already solved them. Probably twice this quarter.",
  },
  {
    index: "04",
    title: "Beyond the license",
    body:
      "The license is the beginning, not the finish line. We handle visas, banking, accounting, Corporate Tax, audit and compliance — so your company doesn't just exist on paper, it operates.",
  },
];

export type ProcessStep = {
  index: string;
  title: string;
  summary: string;
  duration: string;
};

export const processSteps: ProcessStep[] = [
  {
    index: "01",
    title: "Consultation",
    summary:
      "A 45-minute call with a senior consultant. We map your activity, residency needs, and capital structure — and recommend a jurisdiction. No obligation, no sales script.",
    duration: "Day 0",
  },
  {
    index: "02",
    title: "Structure & license",
    summary:
      "Name reservation, MoA drafting, shareholder documentation, and trade license issuance from the authority of your chosen jurisdiction.",
    duration: "Days 1–10",
  },
  {
    index: "03",
    title: "Visas & Emirates ID",
    summary:
      "Establishment card, investor / employee visas, entry permits, medical, biometrics, and Emirates ID — processed by our in-house PRO team.",
    duration: "Days 10–25",
  },
  {
    index: "04",
    title: "Corporate banking",
    summary:
      "We introduce you to the right banker, prepare your application dossier, and accompany you through compliance questions — across UAE and international banks.",
    duration: "Days 20–45",
  },
  {
    index: "05",
    title: "Office & operations",
    summary:
      "Flexi-desk, private office, or virtual address in our Barsha Heights centre — plus bookkeeping, VAT, and Corporate Tax from day one.",
    duration: "Ongoing",
  },
];

export type Testimonial = {
  quote: string;
  name: string;
  title: string;
  company: string;
  initials: string;
  rating: 1 | 2 | 3 | 4 | 5;
  date: string;
  avatarColor: string;
};

export const googleRating = {
  average: 4.9,
  count: 327,
  profileUrl: "https://www.google.com/maps",
};

export const testimonials: Testimonial[] = [
  {
    quote:
      "Smart Creationstructured and licensed our DMCC holding entity in nine working days. They warned us about three compliance items our previous agent had missed — and fixed them before they became a problem. A rare partner that actually prevents problems instead of invoicing them.",
    name: "Sarah Al Mansouri",
    title: "Founder",
    company: "Mirage Capital Partners",
    initials: "SA",
    rating: 5,
    date: "2 weeks ago",
    avatarColor: "#1a73e8",
  },
  {
    quote:
      "We moved our logistics arm to JAFZA and our trading arm to Meydan. Smart Creationran both tracks in parallel, handled visas for twelve staff, and opened our ADCB account in the same month. One partner, one invoice. Highly recommend.",
    name: "Marcus Weber",
    title: "Chief Executive Officer",
    company: "Ironroot Logistics",
    initials: "MW",
    rating: 5,
    date: "1 month ago",
    avatarColor: "#d93025",
  },
  {
    quote:
      "I've worked with three setup firms in Dubai over ten years. Smart Creationis the only one where a partner actually picks up the phone — and has an answer. Corporate Tax registration was seamless.",
    name: "Priya Shetty",
    title: "Chief Operating Officer",
    company: "Forge & Feld",
    initials: "PS",
    rating: 5,
    date: "3 months ago",
    avatarColor: "#188038",
  },
  {
    quote:
      "From first call to operational business bank account in 32 days. Clear timeline, fixed fees, and a consultant who answered WhatsApp after 9pm when we had a question before a board meeting. Exactly what we needed.",
    name: "David Chen",
    title: "Managing Director",
    company: "Northlane Ventures",
    initials: "DC",
    rating: 5,
    date: "4 months ago",
    avatarColor: "#f9ab00",
  },
  {
    quote:
      "Professional, responsive, and genuinely knowledgeable about the trade-offs between free zones. They talked us out of a cheaper option that would have cost us more in year two. That honesty is worth the fee several times over.",
    name: "Aisha Rahman",
    title: "Founder",
    company: "Qasr Holdings",
    initials: "AR",
    rating: 5,
    date: "6 months ago",
    avatarColor: "#9334e6",
  },
  {
    quote:
      "Excellent service end-to-end. License, visas, Emirates ID, and a real office at Damac Executive Heights — all handled with zero friction. My Emirates NBD account was opened in under two weeks.",
    name: "Rajesh Kumar",
    title: "CEO",
    company: "Ember & Oak Trading",
    initials: "RK",
    rating: 5,
    date: "7 months ago",
    avatarColor: "#e8710a",
  },
];

export type Faq = { q: string; a: string };

export const faqs: Faq[] = [
  {
    q: "How long does it take to set up a company in Dubai?",
    a: "A straightforward free-zone company is usually licensed within 3–10 working days. Mainland LLCs take 7–14 days depending on activity approvals. DIFC, which requires regulatory review, typically takes 4–6 weeks. The visa cycle adds another two to three weeks after licensing.",
  },
  {
    q: "Can foreigners own 100% of a UAE company?",
    a: "Yes. Every free zone has always allowed 100% foreign ownership. Since 2021 the UAE has extended 100% foreign ownership to most mainland activities as well, so unless your business falls under a short list of strategic sectors, you will not need a local partner.",
  },
  {
    q: "What is the most cost-effective way to set up in the UAE?",
    a: "For a solo consultant, freelancer, or digital business, a free zone like IFZA, Meydan, Ajman FZ, or SHAMS can start from AED 12,500–18,000 per year for the license, with the option to add a single investor visa. We will quote the all-in cost — license, visa, Emirates ID, and our fee — on the first call.",
  },
  {
    q: "What's the difference between mainland and free zone?",
    a: "A mainland license (issued by Dubai's DET or another emirate's DED) lets you trade anywhere in the UAE and directly contract with the federal government. A free zone license lets you trade internationally and within your zone, with tax and customs benefits, but requires a local distributor to trade onshore for goods. For most service businesses, both work — the choice comes down to cost, visa quota, and where your customers are.",
  },
  {
    q: "Do I need to be physically in the UAE to start the process?",
    a: "No. We can begin licensing and name reservation remotely with a Power of Attorney and notarised passport copies. You typically need to be in the UAE for 1–3 working days for biometrics, Emirates ID, and bank-account KYC.",
  },
  {
    q: "Am I eligible for the UAE Golden Visa?",
    a: "You may qualify as an investor (AED 2 million in real estate or a qualifying business), as a skilled professional (with a salary threshold and accredited qualification), or under the entrepreneur, scientist, or talent categories. We assess eligibility on the first call and handle the full application.",
  },
  {
    q: "What does Corporate Tax mean for my UAE company?",
    a: "Since 1 June 2023 most UAE businesses pay 9% Corporate Tax on taxable income above AED 375,000. Qualifying free-zone entities that meet the substance and qualifying-income tests can still benefit from a 0% rate on eligible income. We handle registration, transfer-pricing documentation, and annual filing.",
  },
  {
    q: "What's included in your PRO services?",
    a: "Establishment card, visa issuance and renewal, Emirates ID, medical fitness, labour-card processing, document attestation (MOFA, embassy), notarisation, trademark filing, and any liaison with MOHRE, GDRFA, or the relevant free-zone authority. Monthly retainers available.",
  },
];

export type StatItem = {
  value: number;
  suffix?: string;
  prefix?: string;
  label: string;
  caption: string;
};

export const stats: StatItem[] = [
  { value: 10000, suffix: "+", label: "Companies launched", caption: "Since 2013 across every emirate" },
  { value: 45000, suffix: "+", label: "Visas processed", caption: "Investor, employment, family, Golden" },
  { value: 12, label: "Free zones covered", caption: "Direct authority relationships" },
  { value: 96, suffix: "%", label: "Client retention", caption: "Year over year, post-licensing" },
];

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  image: string;
  href: string;
};

export const blogPosts: BlogPost[] = [
  {
    slug: "business-setup-dubai-complete-guide-2026",
    title: "The complete guide to business setup in Dubai (2026)",
    excerpt:
      "Every jurisdiction, every cost, every pitfall — the founder-level breakdown we wish we'd had when we started.",
    category: "Guide",
    date: "Apr 18, 2026",
    readTime: "14 min read",
    image: "/damac-executive.webp",
    href: "/blog/business-setup-dubai-complete-guide-2026",
  },
  {
    slug: "free-zone-vs-mainland-2026",
    title: "Free zone vs. mainland: which is right for your company?",
    excerpt:
      "The 2021 reforms changed the math. Here's how we model the trade-off today — by activity, visa quota, and Corporate Tax exposure.",
    category: "Comparison",
    date: "Apr 09, 2026",
    readTime: "9 min read",
    image: "/building/building-3.jpg",
    href: "/blog/free-zone-vs-mainland-2026",
  },
  {
    slug: "corporate-tax-uae-founders-2026",
    title: "Corporate Tax in the U.A.E.: what founders need to know in 2026",
    excerpt:
      "Qualifying free-zone income, substance tests, and transfer pricing — cut through the noise with what actually matters for a 9% (or 0%) outcome.",
    category: "Tax",
    date: "Mar 27, 2026",
    readTime: "11 min read",
    image: "/offices/office-37.jpg",
    href: "/blog/corporate-tax-uae-founders-2026",
  },
];

export const CONTACT = {
  phone: "+971 4 393 9099",
  phoneAlt: "+971 55 551 9459",
  phoneHref: "tel:+97143939099",
  phoneAltHref: "tel:+971555519459",
  whatsapp: "+971 55 551 9459",
  whatsappHref: "https://wa.me/971555519459",
  email: "info@thesmartcreation.com",
  emailHref: "mailto:info@thesmartcreation.com",
  website: "www.thesmartcreation.com",
  address: "19th Floor, Damac Executive Heights (Tecom)",
  addressLine2: "Jebel Ali Race Course Road, Dubai, U.A.E.",
};
