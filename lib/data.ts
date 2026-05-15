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
  Sparkles,
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
    "To empower businesses by providing seamless, efficient, and innovative solutions for business setup, licensing, corporate structuring, and office space solutions. We aim to remove the complexities associated with establishing and managing a business in the UAE, enabling entrepreneurs and enterprises to focus on growth, productivity, and success.",
  vision:
    "To become the leading workspace provider and business consultancy in the UAE, recognised for excellence, innovation, and client satisfaction. We aspire to create a business ecosystem where entrepreneurs can thrive, leveraging our expertise, resources, and cutting-edge office solutions.",
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
  /** When true, the top-level nav label is a non-link trigger (only opens the mega). */
  noLink?: boolean;
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
    noLink: true,
    mega: {
      groups: [
        {
          title: "Company formation",
          links: [
            { label: "Mainland setup", href: "/services/company-formation#mainland", desc: "Dubai DET license, LLC, branches" },
            { label: "Free zone setup", href: "/services/company-formation#free-zone", desc: "Every major UAE free zone" },
            { label: "Offshore structure", href: "/services/company-formation#offshore", desc: "JAFZA, RAK ICC, Ajman" },
            { label: "Holding & subsidiary", href: "/services/company-formation#holding", desc: "Group structuring" },
          ],
        },
        {
          title: "Visas & residency",
          links: [
            { label: "PRO services", href: "/services/visas#pro-visa", desc: "Visa, Emirates ID, labour" },
            { label: "Investor visa", href: "/services/visas#investor-visa", desc: "2, 5 and 10-year options" },
            { label: "Golden visa", href: "/services/visas#golden-visa", desc: "10-year long-term residency", badge: "Popular" },
            { label: "Family sponsorship", href: "/services/visas#family-visa", desc: "Spouse, children, parents" },
          ],
        },
        {
          title: "Financial",
          links: [
            { label: "Corporate banking", href: "/services/financial#banking", desc: "UAE & international banks" },
            { label: "Accounting & VAT", href: "/services/financial#accounting", desc: "Monthly books, VAT filing" },
            { label: "Corporate tax", href: "/services/financial#corporate-tax", desc: "Registration, returns, advisory" },
            { label: "Audit", href: "/services/financial#audit", desc: "Statutory, internal, due diligence" },
          ],
        },
        {
          title: "Compliance & licensing",
          links: [
            { label: "Trademark", href: "/services/compliance#trademark", desc: "UAE & international filing" },
            { label: "AML / ESR / UBO", href: "/services/compliance#aml-esr-ubo", desc: "Frameworks and filings" },
            { label: "Document attestation", href: "/services/compliance#attestation", desc: "MOFA, notarisation, embassy" },
            { label: "License renewal", href: "/services/compliance#renewal", desc: "Annual renewals across zones" },
          ],
        },
      ],
      feature: {
        eyebrow: "Free · 45 min",
        title: "Tell us what you're building. We'll come back with a plan.",
        body: "Jurisdiction, costs, timeline, banking, visa quota: written up within one business day. No sales script.",
        cta: { label: "Book consultation", href: "/contact" },
      },
      footer: { label: "Book consultation", href: "/contact" },
    },
  },
  {
    label: "Free Zones",
    href: "/free-zones",
    noLink: true,
    mega: {
      groups: [
        {
          title: "Dubai",
          links: [
            { label: "IFZA", href: "/free-zones/dubai#ifza", desc: "International Free Zone Authority" },
            { label: "DMCC", href: "/free-zones/dubai#dmcc", desc: "Multi Commodities Centre" },
            { label: "DIFC", href: "/free-zones/dubai#difc", desc: "International Financial Centre" },
            { label: "Meydan", href: "/free-zones/dubai#meydan", desc: "Professional services" },
            { label: "DCC", href: "/free-zones/dubai#dcc", desc: "Dubai CommerCity for e-commerce" },
            { label: "DTEC", href: "/free-zones/dubai#dtec", desc: "Technology Entrepreneur Campus" },
            { label: "ANCFZ", href: "/free-zones/dubai#ancfz", desc: "Ajman NuVentures Centre" },
            { label: "UAQ", href: "/free-zones/dubai#uaq", desc: "Umm Al Quwain Free Trade Zone" },
          ],
        },
        {
          title: "Sharjah & northern emirates",
          links: [
            { label: "SHAMS", href: "/free-zones/northern-emirates#shams", desc: "Sharjah Media City" },
            { label: "SPC", href: "/free-zones/northern-emirates#spc", desc: "Sharjah Publishing City" },
            { label: "RAKEZ", href: "/free-zones/northern-emirates#rakez", desc: "Ras Al Khaimah Economic Zone" },
            { label: "AFZA", href: "/free-zones/northern-emirates#afza", desc: "Ajman Free Zone" },
          ],
        },
      ],
      feature: {
        eyebrow: "Decision tool",
        title: "Not sure which zone fits?",
        body: "Compare all twelve side-by-side: cost, visa quota, activity list, setup time and Corporate Tax impact.",
        cta: { label: "See every zone", href: "/free-zones" },
      },
      footer: { label: "Every zone we cover", href: "/free-zones" },
    },
  },
  {
    label: "Smart Group",
    href: "/business-centers",
    noLink: true,
    mega: {
      groups: [
        {
          title: "Business Centres",
          links: [
            { label: "Smart Creation",  href: "/business-centers/smart-creation", desc: "Tecom · Barsha Heights" },
            { label: "Smart Place",     href: "/business-centers/smart-place",    desc: "Al Barsha 1" },
            { label: "Smart View",      href: "/business-centers/smart-view",     desc: "Bur Dubai" },
            { label: "Future Space",    href: "/business-centers/future-space",   desc: "Al Muraqabat" },
            { label: "Smart Founders",  href: "/business-centers/smart-founders", desc: "Umm Ramool" },
            { label: "Abna Rashid",     href: "/business-centers/abna-rashid",    desc: "Naif · Deira" },
          ],
        },
        {
          title: "Group Companies",
          links: [
            { label: "Smart Business Creation",  href: "/affiliated-companies#smart-business-creation", desc: "Business setup · UAE" },
            { label: "Next Journey Technology",  href: "/affiliated-companies#next-journey",           desc: "Technology · UAE" },
            { label: "Smart Holiday Homes",      href: "/affiliated-companies#smart-holiday-homes",    desc: "Hospitality · UAE" },
            { label: "Intercity Bus Service",    href: "/affiliated-companies#intercity-bus",          desc: "Transport · Canada" },
            { label: "MM Contractor",            href: "/affiliated-companies#mm-contractor",          desc: "Construction · Pakistan" },
            { label: "Immersion Social",         href: "/affiliated-companies#immersion-social",       desc: "Experiences · UAE" },
          ],
        },
      ],
      feature: {
        eyebrow: "Operating snapshot",
        title: "One Group. Three countries. Twelve years.",
        body: "Six owned business centres across Dubai plus six specialist arms in the UAE, Canada and Pakistan — every file run by the same accountable team.",
        cta: { label: "Meet the Group", href: "/about" },
      },
      footer: { label: "About the Group", href: "/about" },
    },
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
  /** Brand-mark file under /public/centres/. Used in place of the
   *  textual name on the centre cards. */
  logo: string;
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
    logo: "/centres/smart-creation.webp",
    city: "Dubai",
    country: "UAE",
    address: "19th Floor, Damac Executive Heights (Tecom), Jebel Ali Race Course Road, Dubai",
    summary:
      "The flagship. 500 fully equipped, flexible offices ideal for startups and established businesses, with end-to-end company formation, PRO and tax support on the same floor.",
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
    logo: "/centres/smart-place.webp",
    city: "Dubai",
    country: "UAE",
    address: "Floor 226, Iridium Building, Umm Suqeim Street, Al Barsha, Dubai",
    summary:
      "Modern, well-equipped workspace tailored for entrepreneurs, startups and established businesses. Flexible office solutions with full setup and corporate support.",
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
    logo: "/centres/smart-view.webp",
    city: "Bur Dubai",
    country: "UAE",
    address: "Al Arif Building, 15A Street, Al Hamriya, Bur Dubai, Dubai",
    summary:
      "A professional business hub in a prime commercial location. Fully equipped offices in a credible, efficient environment that supports daily operations and growth.",
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
    logo: "/centres/future-space.webp",
    city: "Al Muraqabat, Dubai",
    country: "UAE",
    address: "2nd Floor, Block A, Dubai Municipality Building, Salah Al Din Street, Al Muraqabat, Dubai",
    summary:
      "A premium business hub for modern entrepreneurs, startups and growing companies. Fully furnished serviced offices, flexible workstations and modern meeting facilities.",
    highlights: [
      "Premium serviced offices",
      "Flexi desks & virtual offices",
      "Complete company setup",
      "Professional PRO services",
    ],
  },
  {
    id: "smart-founders",
    index: "05",
    name: "Smart Founders Business Center",
    logo: "/centres/smart-founders.webp",
    city: "Dubai",
    country: "UAE",
    address: "Smart Founders Centre, Dubai, U.A.E.",
    summary:
      "A dedicated workspace for early-stage founders and small teams: desks, meeting space and back-office support tailored to new businesses getting off the ground.",
    highlights: [
      "Founder-focused workspace",
      "Desks & meeting rooms",
      "Back-office & PRO support",
    ],
  },
  {
    id: "abna-rashid",
    index: "06",
    name: "Abna Rashid Building",
    logo: "/centres/abna-rashid.webp",
    city: "Naif, Deira",
    country: "UAE",
    address: "Abna Rashid Hamd Bin Huwaidi Building, Street 27A, Al Nakhal · Naif, Deira, Dubai",
    summary:
      "Our owned freehold building in Naif, Deira, Dubai's historic trading core. Multiple floors of flexible space serving import/export, wholesale and trading businesses, walking distance to the gold and spice souks.",
    highlights: [
      "Owned freehold property",
      "Flexible commercial floors",
      "Trading-district address",
      "Walk to gold & spice souks",
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
      "Flagship 500-office business centre at Damac Executive Heights, with end-to-end company formation, licensing, PRO and tax services.",
    icon: Building2,
    logo: "/group-logos/smart-creation-bc.webp",
  },
  {
    id: "smart-place-bc",
    name: "Smart Place Business Center",
    sector: "Business Centers · UAE",
    country: "UAE",
    flag: "🇦🇪",
    summary:
      "Modern flexible workspace at Iridium Building, Al Barsha, tailored for entrepreneurs and growing teams.",
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
    logo: "/group-logos/smart-view.webp",
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
    logo: "/group-logos/future-space.webp",
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
    logo: "/group-logos/abna-rashid.webp",
  },
  {
    id: "smart-founders",
    name: "Smart Founders Business Center",
    sector: "Business Centers · UAE",
    country: "UAE",
    flag: "🇦🇪",
    summary:
      "Dedicated workspace for early-stage founders and small teams: desks, meeting rooms and back-office support tailored to new businesses getting off the ground.",
    icon: Building2,
    logo: "/group-logos/smart-founders.webp",
  },
  {
    id: "smart-holiday-homes",
    name: "Smart Holiday Homes",
    sector: "Hospitality · UAE",
    country: "UAE",
    flag: "🇦🇪",
    summary:
      "Fully furnished short-term holiday rentals across Dubai, with guest welcome, professional cleaning and 24/7 support included.",
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
      "Premier intercity transportation based in London, Ontario: scheduled routes, charter services and a value card programme.",
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
      "Pakistan-based contracting company: infrastructure, road development, civil works and general contracting for public and private projects.",
    icon: HardHat,
    logo: "/group-logos/mm-contractor.webp",
  },
  {
    id: "smart-accounting-tax",
    name: "Smart Accounting & Tax",
    sector: "Finance & Tax · UAE",
    country: "UAE",
    flag: "🇦🇪",
    summary:
      "Dedicated bookkeeping, VAT, Corporate Tax registration and audit-readiness arm, calendared so nothing slips and every cycle files clean.",
    icon: Calculator,
    logo: "/group-logos/smart-accounting-tax.webp",
  },
  {
    id: "smart-business-creation",
    name: "Smart Business Creation",
    sector: "Business Setup · UAE",
    country: "UAE",
    flag: "🇦🇪",
    summary:
      "Original founding brand of the Group, with company formation, banking and PRO services delivered under the Smart Business Creation banner since 2013.",
    icon: Briefcase,
    logo: "/group-logos/smart-business-creation.webp",
  },
  {
    id: "next-journey",
    name: "Next Journey",
    sector: "Travel & Tourism · UAE",
    country: "UAE",
    flag: "🇦🇪",
    summary:
      "Travel and tourism arm of the Group: curated U.A.E. experiences, leisure packages and corporate travel for clients and visitors alike.",
    icon: Globe2,
    logo: "/group-logos/next-journey.webp",
  },
  {
    id: "immersion",
    name: "Immersion",
    sector: "Experiences · UAE",
    country: "UAE",
    flag: "🇦🇪",
    summary:
      "Immersive experiences arm of the Group: events, brand activations and guided itineraries that bring the U.A.E.'s story to life.",
    icon: Sparkles,
    logo: "/group-logos/immersion.webp",
  },
];

// ── Team ─────────────────────────────────────────────────────────────
export type TeamMember = {
  name: string;
  role: string;
  /** Path under /public; omit to fall back to initials placeholder */
  photo?: string;
  /** Public LinkedIn profile URL */
  linkedin?: string;
};

export const team: TeamMember[] = [
  // CEO — kept here so the dedicated spotlight section can read it.
  // Filtered out of the team grid (he's already shown above on the about page).
  { name: "Asad Hashmi", role: "Chief Executive Officer", photo: "/ceo-asad-hashmi.webp" },

  // Management
  { name: "Mahwish", role: "Managing Partner", linkedin: "https://www.linkedin.com/in/mahwishch/" },
  { name: "Shrushti Gupta", role: "Business Operations & HR Manager", photo: "/team/shrushti-gupta.webp", linkedin: "https://www.linkedin.com/in/shrushti-gupta-lion-%E2%9C%8C-7351a3112/" },

  // Business Setup Consultants
  { name: "Mian Aqib Riaz", role: "Business Setup Consultant", linkedin: "https://www.linkedin.com/in/mian-aqib-3227426b/" },
  { name: "Shaista Rehman", role: "Business Setup Consultant", linkedin: "https://www.linkedin.com/in/shaista-rehman-/" },
  { name: "Jawad Khan", role: "Business Setup Consultant & Public Relations Officer", photo: "/team/jawad-khan.webp", linkedin: "https://www.linkedin.com/in/jawadd-khan/" },
  { name: "Asher Ejaz", role: "Business Setup Consultant", photo: "/team/asher-ejaz.webp", linkedin: "https://www.linkedin.com/in/asher-e-3a8939188/" },
  { name: "Ayesha Ahmed", role: "Business Setup Consultant", photo: "/team/ayesha-ahmad.webp", linkedin: "https://www.linkedin.com/in/ayesha-ahmed-1873223ab/" },
  { name: "Ruby Sharma", role: "Business Setup Consultant", photo: "/team/ruby-sharma.webp", linkedin: "https://www.linkedin.com/in/ruby-sharma-8089842b7/" },
  { name: "Sidra Subhani", role: "Business Setup Consultant", photo: "/team/sidra-subhani.webp", linkedin: "https://www.linkedin.com/in/sidra-subhani-446020288/" },
  { name: "Zeeshan Rasheed", role: "Business Setup Consultant", photo: "/team/zeeshan-rasheed.webp", linkedin: "https://www.linkedin.com/in/zeeshan-rasheed-188463351/" },
  { name: "Shamsa Kanwal", role: "Business Setup Consultant & Public Relations Officer", photo: "/team/shamsa-kanwal.webp", linkedin: "https://www.linkedin.com/in/shamsa-farooq-749b12322/" },
  { name: "Famey Johnson", role: "Business Setup Consultant", linkedin: "https://www.linkedin.com/in/famey-johnson-1703892a5/" },
  { name: "Ashenafi Tsigab", role: "Business Setup Consultant", photo: "/team/ashenafi-tsigab.webp", linkedin: "https://www.linkedin.com/in/ashenafi-tsigab-118956374/" },
  { name: "Volodymyr Fedorets", role: "Business Setup Consultant", photo: "/team/volodymyr-fedorets.webp", linkedin: "https://www.linkedin.com/in/volodymyr-fedorets/" },
  { name: "Sarath Shaji", role: "Business Setup Consultant", linkedin: "https://www.linkedin.com/in/sarathshajismartbusinescreation/" },
  { name: "Yousuf Khan", role: "Business Setup Consultant", photo: "/team/yusuf-khan.webp", linkedin: "https://www.linkedin.com/in/yousuf-khan-227309263/" },

  // Accounts & Banking
  { name: "Saeed Ur Rehman", role: "Audit, Advisory & Compliance Manager", photo: "/team/saeed-ur-rehman.webp", linkedin: "https://www.linkedin.com/in/saeed-ur-rehman-aca-4b4143387/" },
  { name: "Renju Raj", role: "Accountant", photo: "/team/renju-raj.webp" },
  { name: "Khakan Abbasi", role: "Banking & Business Setup Consultant", photo: "/team/khakan-abbasi.webp", linkedin: "https://www.linkedin.com/in/khakan-abbasi-84ab6261/" },

  // Operations
  { name: "Afrin Hameed", role: "Business Coordinator", photo: "/team/afrin-hameed.webp", linkedin: "https://www.linkedin.com/in/afrin-hameed-9956b1129/" },
  { name: "Faria Nasir", role: "Digital Marketing & Business Development Specialist", photo: "/team/fariha-nasir.webp", linkedin: "https://www.linkedin.com/in/faria-nasir-068856252/" },
  { name: "Athena Janin Sayson Gadiana", role: "Administrative Assistant", photo: "/team/athena-saysongadiana.webp", linkedin: "https://www.linkedin.com/in/athena-janin-gadiana-2086a02b4/" },
  { name: "Wardah Minhaj", role: "Administrative Operations Executive", photo: "/team/wardah-minhaj.webp", linkedin: "https://www.linkedin.com/in/wardah-minhaj-8836b9182" },
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
      "Dubai Department of Economy & Tourism licensing for LLCs, branches, and professional firms, with no restriction on where you can trade.",
    href: "/services/company-formation#mainland",
    icon: Landmark,
  },
  {
    id: "free-zone",
    index: "02",
    title: "Free Zone Setup",
    summary:
      "Direct relationships with every major UAE free zone. We recommend the right one for your sector: IFZA, DMCC, JAFZA, DIFC, and nine more.",
    href: "/services/company-formation#free-zone",
    icon: Building2,
  },
  {
    id: "offshore",
    index: "03",
    title: "Offshore Incorporation",
    summary:
      "JAFZA Offshore, RAK ICC, and Ajman Offshore structures for holding, asset protection, and international trade.",
    href: "/services/company-formation#offshore",
    icon: Globe2,
  },
  {
    id: "pro-visa",
    index: "04",
    title: "PRO & Visa Services",
    summary:
      "Investor, employment, family, and Golden Visa processing. Emirates ID, medical, Tawjeeh: all handled by our in-house PRO team.",
    href: "/services/visas#pro-visa",
    icon: IdCard,
  },
  {
    id: "banking",
    index: "05",
    title: "Corporate Banking",
    summary:
      "Introductions, pre-qualification, and full application support for Emirates NBD, Mashreq, HSBC, ADCB, WIO and more.",
    href: "/services/financial#banking",
    icon: Banknote,
  },
  {
    id: "accounting",
    index: "06",
    title: "Accounting, VAT & Corporate Tax",
    summary:
      "Monthly bookkeeping, VAT returns, Corporate Tax registration and filing, statutory audit. FTA-compliant, on time.",
    href: "/services/financial#accounting",
    icon: Calculator,
  },
  {
    id: "business-centers",
    index: "07",
    title: "Six Business Centers",
    summary:
      "Private offices, dedicated desks, virtual addresses and meeting rooms across six owned-and-operated locations in Dubai: from Tecom to Bur Dubai to Al Muraqabat.",
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
  /** Optional explicit logo path. Falls back to /free-zones/{code}.png. */
  logoSrc?: string;
};

export const freeZones: FreeZone[] = [
  // Dubai zones — each anchor matches a `<section id="…">` on /free-zones/dubai
  // NOTE: the .png files in /public/free-zones are exported in a shifted
  // order — each file contains a different zone's logo than its filename
  // suggests. The logoSrc below points each card to the FILE that holds
  // its correct artwork (observed from the rendered cards).
  { code: "DMCC",   name: "Dubai Multi Commodities Centre",          emirate: "Dubai",     focus: "General trading & commodities",   leadTime: "5–7 days", href: "/free-zones/dubai#dmcc",   logoSrc: "/free-zones/ifza.png" },
  { code: "MEYDAN", name: "Meydan Free Zone",                        emirate: "Dubai",     focus: "Professional services",            leadTime: "3–5 days", href: "/free-zones/dubai#meydan", logoSrc: "/free-zones/jafza.png" },
  { code: "DIFC",   name: "Dubai International Financial Centre",     emirate: "Dubai",     focus: "Finance & professional services",  leadTime: "20+ days", href: "/free-zones/dubai#difc",   logoSrc: "/free-zones/meydan.png" },
  { code: "DCC",    name: "Dubai CommerCity",                         emirate: "Dubai",     focus: "E-commerce & digital trade",       leadTime: "5–7 days", href: "/free-zones/dubai#dcc",    logoSrc: "/free-zones/dafza.png" },
  { code: "IFZA",   name: "International Free Zone Authority",        emirate: "Dubai",     focus: "General trading & services",       leadTime: "3–5 days", href: "/free-zones/dubai#ifza",   logoSrc: "/free-zones/afza.png" },
  { code: "DTEC",   name: "Dubai Technology Entrepreneur Campus",     emirate: "Dubai",     focus: "Technology & digital focus",       leadTime: "3–5 days", href: "/free-zones/dubai#dtec",   logoSrc: "/free-zones/dtec.webp" },
  { code: "ANCFZ",  name: "Ajman NuVentures Centre Free Zone",        emirate: "Dubai",     focus: "Startups & SMEs",                  leadTime: "2–4 days", href: "/free-zones/dubai#ancfz",  logoSrc: "/free-zones/anc.webp" },
  { code: "UAQ",    name: "Umm Al Quwain Free Trade Zone",            emirate: "Dubai",     focus: "Fast-setup environment for SMEs",  leadTime: "2–4 days", href: "/free-zones/dubai#uaq",    logoSrc: "/free-zones/uaq.webp" },
  // Northern emirates — each anchor matches /free-zones/northern-emirates
  { code: "SHAMS",  name: "Sharjah Media City",                       emirate: "Sharjah",   focus: "Media & creative",                 leadTime: "2–4 days", href: "/free-zones/northern-emirates#shams", logoSrc: "/free-zones/dwtc.png" },
  { code: "SPC",    name: "Sharjah Publishing City",                  emirate: "Sharjah",   focus: "Publishing & content",             leadTime: "3–5 days", href: "/free-zones/northern-emirates#spc",   logoSrc: "/free-zones/shams.png" },
  { code: "RAKEZ",  name: "Ras Al Khaimah Economic Zone",             emirate: "RAK",       focus: "Industrial & SME",                 leadTime: "3–5 days", href: "/free-zones/northern-emirates#rakez", logoSrc: "/free-zones/spc.png" },
  { code: "AFZA",   name: "Ajman Free Zone",                          emirate: "Ajman",     focus: "SMEs & low-cost trade",            leadTime: "2–4 days", href: "/free-zones/northern-emirates#afza",  logoSrc: "/free-zones/rakez.png" },
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
      "We own and operate six business centres across Dubai: Damac Executive Heights (Tecom), Iridium Tower (Al Barsha), Al Hamriya (Bur Dubai), Salah Al Din Street (Al Muraqabat), Umm Ramool (Smart Founders) and Naif/Deira (Abna Rashid). When investors or clients visit you, they walk into a professional address, not a virtual mailbox.",
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
      "Trusted since 2013 by founders, family offices and multinationals. The edge cases you're about to hit, we've already solved them. Probably twice this quarter.",
  },
  {
    index: "04",
    title: "Beyond the license",
    body:
      "The license is the beginning, not the finish line. We handle visas, banking, accounting, Corporate Tax, audit and compliance, so your company doesn't just exist on paper, it operates.",
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
      "A 45-minute call with a senior consultant. We map your activity, residency needs, and capital structure, then recommend a jurisdiction. No obligation, no sales script.",
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
      "Establishment card, investor / employee visas, entry permits, medical, biometrics, and Emirates ID: processed by our in-house PRO team.",
    duration: "Days 10–25",
  },
  {
    index: "04",
    title: "Corporate banking",
    summary:
      "We introduce you to the right banker, prepare your application dossier, and accompany you through compliance questions across UAE and international banks.",
    duration: "Days 20–45",
  },
  {
    index: "05",
    title: "Office & operations",
    summary:
      "Flexi-desk, private office, or virtual address in our Barsha Heights centre, plus bookkeeping, VAT, and Corporate Tax from day one.",
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
  /** Optional reviewer photo under /public. Falls back to coloured initials. */
  photo?: string;
};

export const googleRating = {
  average: 4.9,
  count: 327,
  /** Public Google Business profile (reads all reviews). */
  profileUrl: "https://share.google/1dajNlp5Rf9qaLxXv",
  /** Direct "write a review" link from Google Business. */
  writeReviewUrl: "https://g.page/r/CTJ-ZCcQwEuBEBM/review",
};

export const testimonials: Testimonial[] = [
  {
    quote:
      "It was a great experience dealing with you. Highly appreciate your professionalism — you delivered service even while on your personal holiday. Your Ejari and other services were so prompt and fast that my licence renewal was done in a day. When we wanted to see a new office space you immediately showed us. Highly appreciate your timely, prompt and professional service.",
    name: "CA Sonali Shah",
    title: "Chartered Accountant",
    company: "Verified Google review",
    initials: "SS",
    rating: 5,
    date: "Recently",
    avatarColor: "#1a73e8",
    photo: "/reviews/sonali.png",
  },
  {
    quote:
      "Smart Creation Business Center is dedicated to providing top-notch office solutions, including virtual offices, business setup services and PRO assistance, all tailored to entrepreneurs and companies in Dubai. With a customer-centric approach, they ensure seamless operations, professional support and a prestigious business address. Whether you're a startup or an established firm, their efficient and affordable services make business growth easier and hassle-free.",
    name: "M Shahid Asraaf Chohan",
    title: "Client",
    company: "Verified Google review",
    initials: "MS",
    rating: 5,
    date: "Recently",
    avatarColor: "#d93025",
    photo: "/reviews/shahidasraafchohan.png",
  },
  {
    quote:
      "Smart Business Creation Center is undoubtedly a professional agency. I recently embarked on the journey of starting my business and encountered a multitude of requirements. The SBCC team not only provided invaluable assistance but also guided us through all the necessary services. I wholeheartedly endorse them, particularly for new company registration, securing office space, banking, visa procurement and related services. Highly recommend.",
    name: "Raj Husen",
    title: "Founder",
    company: "Verified Google review",
    initials: "RH",
    rating: 5,
    date: "Recently",
    avatarColor: "#188038",
    photo: "/reviews/rajhusen.png",
  },
  {
    quote:
      "Professional service, so helpful in supporting the set-up of the new company. Ongoing support is cost-effective and value for money. All staff at the business centre are brilliant, friendly and very helpful with every query. Brilliant access to car park for everyone.",
    name: "Latica Grover",
    title: "Founder",
    company: "Verified Google review",
    initials: "LG",
    rating: 5,
    date: "Recently",
    avatarColor: "#f9ab00",
    photo: "/reviews/laticagrover.png",
  },
  {
    quote:
      "I would like to appreciate Shamsa and the Smart Creation team for their professionalism, commitment and high-quality services. The company has built a strong reputation by consistently delivering reliable solutions and exceeding client expectations. Their team demonstrates excellent expertise, integrity and dedication, which truly sets them apart. Always a pleasure to work with such a trusted, customer-focused organisation.",
    name: "Umar Zaman",
    title: "Client",
    company: "Verified Google review",
    initials: "UZ",
    rating: 5,
    date: "Recently",
    avatarColor: "#9334e6",
    photo: "/reviews/umarzaman.png",
  },
  {
    quote:
      "I first connected with Shamsa Kanwal, Smart Creation Business Setup Consultant & PRO, through a networking referral. I had inquiries on company formation in multiple jurisdictions and was impressed by her up-to-date knowledge of UAE mainland and free-zone regulations. Her timely, accurate responses helped us close a client inquiry quickly and with complete satisfaction. Proactive, eager to stay updated on new rules and compliance, and always cost-effective. Highly recommend for anyone setting up in Dubai or the UAE.",
    name: "Arif Saeed",
    title: "Business Professional",
    company: "Verified Google review",
    initials: "AS",
    rating: 5,
    date: "Recently",
    avatarColor: "#e8710a",
    photo: "/reviews/arifsaeed.png",
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
    a: "For a solo consultant, freelancer, or digital business, a free zone like IFZA, Meydan, Ajman FZ, or SHAMS can start from AED 12,500–18,000 per year for the license, with the option to add a single investor visa. We will quote the all-in cost on the first call: license, visa, Emirates ID, and our fee.",
  },
  {
    q: "What's the difference between mainland and free zone?",
    a: "A mainland license (issued by Dubai's DET or another emirate's DED) lets you trade anywhere in the UAE and directly contract with the federal government. A free zone license lets you trade internationally and within your zone, with tax and customs benefits, but requires a local distributor to trade onshore for goods. For most service businesses, both work; the choice comes down to cost, visa quota, and where your customers are.",
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
      "Every jurisdiction, every cost, every pitfall: the founder-level breakdown we wish we'd had when we started.",
    category: "Guide",
    date: "Apr 18, 2026",
    readTime: "14 min read",
    image: "/damac-executive.webp",
    href: "/insights/how-to-start-business-dubai-2026",
  },
  {
    slug: "free-zone-vs-mainland-2026",
    title: "Free zone vs. mainland: which is right for your company?",
    excerpt:
      "The 2021 reforms changed the math. Here's how we model the trade-off today: by activity, visa quota, and Corporate Tax exposure.",
    category: "Comparison",
    date: "Apr 09, 2026",
    readTime: "9 min read",
    image: "/building/building-3.jpg",
    href: "/insights/free-zone-vs-mainland-dubai-2026",
  },
  {
    slug: "corporate-tax-uae-founders-2026",
    title: "Corporate Tax in the U.A.E.: what founders need to know in 2026",
    excerpt:
      "Qualifying free-zone income, substance tests, and transfer pricing: cut through the noise with what actually matters for a 9% (or 0%) outcome.",
    category: "Tax",
    date: "Mar 27, 2026",
    readTime: "11 min read",
    image: "/offices/office-37.jpg",
    href: "/insights/uae-corporate-tax-vat-2026-guide",
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
