import Link from "next/link";
import { ArrowUpRight, Linkedin, Instagram, Facebook, Youtube } from "lucide-react";
import { Logo } from "@/components/logo";
import { CONTACT, freeZones, services } from "@/lib/data";

const columns = [
  {
    title: "Services",
    links: services.slice(0, 8).map((s) => ({ label: s.title, href: s.href })),
  },
  {
    title: "Free zones",
    links: freeZones.slice(0, 8).map((z) => ({
      label: `${z.code} — ${z.emirate}`,
      href: z.href,
    })),
  },
  {
    title: "Group",
    links: [
      { label: "About the Group", href: "/about" },
      { label: "Our Business Centres", href: "/business-centers" },
      { label: "Next Journey Technology", href: "/group/next-journey" },
      { label: "Smart Holiday Homes", href: "/group/smart-holiday-homes" },
      { label: "Intercity Bus (Canada)", href: "/group/intercity-bus" },
      { label: "MM Contractor (Pakistan)", href: "/group/mm-contractor" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Cost calculator", href: "/calculator" },
      { label: "Free zone comparison", href: "/compare" },
      { label: "Golden Visa guide", href: "/golden-visa" },
      { label: "Corporate Tax guide", href: "/corporate-tax" },
      { label: "VAT guide", href: "/vat" },
      { label: "Company profile (PDF)", href: "/company-profile.pdf" },
    ],
  },
];

const socials = [
  { label: "LinkedIn", href: "https://linkedin.com", icon: Linkedin },
  { label: "Instagram", href: "https://instagram.com", icon: Instagram },
  { label: "Facebook", href: "https://facebook.com", icon: Facebook },
  { label: "YouTube", href: "https://youtube.com", icon: Youtube },
];

export function SiteFooter() {
  return (
    <footer className="relative bg-paper-deep text-ink border-t border-ink/10">
      <div className="container-edit py-20 md:py-24">
        <div className="grid grid-cols-12 gap-x-8 gap-y-14">
          {/* Brand column */}
          <div className="col-span-12 lg:col-span-4">
            <Logo />
            <p className="mt-6 max-w-sm text-[0.95rem] leading-relaxed text-ink-mute">
              A multi-sector group spanning four Dubai business centres, real estate,
              technology, hospitality, transport and contracting — trusted since 2013.
            </p>

            <address className="not-italic mt-8 text-[0.92rem] text-ink leading-relaxed">
              <div>{CONTACT.address}</div>
              <div className="text-ink-mute">{CONTACT.addressLine2}</div>
            </address>

            <div className="mt-6 space-y-1.5 text-[0.92rem]">
              <a href={CONTACT.phoneHref} className="block text-ink hover:text-brand-deep transition-colors">
                {CONTACT.phone}
              </a>
              <a href={CONTACT.emailHref} className="block text-ink hover:text-brand-deep transition-colors">
                {CONTACT.email}
              </a>
            </div>

            <div className="mt-8 flex items-center gap-2">
              {socials.map((s) => {
                const Icon = s.icon;
                return (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-ink/15 text-ink-mute hover:border-ink hover:text-ink transition-colors"
                  >
                    <Icon className="h-4 w-4" strokeWidth={1.6} />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Link columns */}
          <div className="col-span-12 lg:col-span-8 grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-12">
            {columns.map((col) => (
              <div key={col.title}>
                <div className="font-mono text-[0.68rem] uppercase tracking-[0.22em] text-stone mb-5">
                  {col.title}
                </div>
                <ul className="space-y-2.5">
                  {col.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="group inline-flex items-center gap-1 text-[0.9rem] text-ink-mute hover:text-ink transition-colors"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom strip */}
        <div className="mt-16 pt-8 border-t border-ink/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-4 font-mono text-[0.7rem] uppercase tracking-[0.2em] text-stone">
            <span>© 2026 Smart Creation Group of Companies</span>
            <span className="text-mist/50">·</span>
            <span>Dubai, U.A.E.</span>
          </div>
          <ul className="flex flex-wrap items-center gap-x-6 gap-y-2 text-[0.82rem] text-ink-mute">
            <li><Link href="/privacy" className="hover:text-ink transition-colors">Privacy</Link></li>
            <li><Link href="/terms" className="hover:text-ink transition-colors">Terms</Link></li>
            <li><Link href="/cookies" className="hover:text-ink transition-colors">Cookies</Link></li>
            <li><Link href="/sitemap.xml" className="hover:text-ink transition-colors inline-flex items-center gap-1">
              Sitemap <ArrowUpRight className="h-3 w-3" strokeWidth={1.5} />
            </Link></li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
