import Link from "next/link";
import { ArrowRight, Phone, Mail, MessageCircle, MapPin } from "lucide-react";
import { CONTACT } from "@/lib/data";
import { Logo } from "@/components/logo";

export function FinalCTA() {
  return (
    <section id="contact-cta" className="relative py-24 md:py-36 bg-ink text-paper overflow-hidden">
      {/* Ambient decoration */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 left-1/2 h-[700px] w-[700px] -translate-x-1/2 rounded-full"
        style={{
          background:
            "radial-gradient(closest-side, rgba(72,168,219,0.35), rgba(72,168,219,0) 70%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #f6f3ec 1px, transparent 1px), linear-gradient(to bottom, #f6f3ec 1px, transparent 1px)",
          backgroundSize: "96px 96px",
        }}
      />

      <div className="container-edit relative">
        <div className="grid grid-cols-12 gap-x-4 md:gap-x-8 gap-y-16 items-center">
          <div className="col-span-12 lg:col-span-7">
            <div className="flex items-center gap-3 font-mono text-[0.7rem] uppercase tracking-[0.22em] text-mist">
              <span className="h-px w-8 bg-paper/25" />
              § 10 · Start your company
            </div>

            <h2 className="font-display mt-6 text-[clamp(2.2rem,5.5vw,4.2rem)] leading-[1.02] tracking-[-0.025em] text-paper text-balance">
              Your U.A.E. company starts with{" "}
              <span className="text-brand">one conversation.</span>
            </h2>

            <p className="mt-6 max-w-xl text-[1.05rem] leading-relaxed text-paper/75 text-pretty">
              Book a free 45-minute consultation. Tell us what you're building. We'll come
              back with a written plan (jurisdiction, costs, timeline, and the next steps)
              within one working day. No sales script.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row gap-3 sm:gap-4">
              <Link
                href="/contact"
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-brand px-6 py-3.5 text-[0.95rem] font-medium text-ink hover:bg-paper transition-colors"
              >
                Book free consultation
                <ArrowRight
                  className="h-4 w-4 transition-transform group-hover:translate-x-1"
                  strokeWidth={2}
                />
              </Link>
              <Link
                href={CONTACT.whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center justify-center gap-2 rounded-full border border-paper/20 bg-paper/5 backdrop-blur px-5 py-3 text-[0.9rem] text-paper hover:bg-paper/10 transition-colors"
              >
                <MessageCircle className="h-4 w-4" strokeWidth={1.8} />
                WhatsApp us
              </Link>
            </div>
          </div>

          {/* Contact card */}
          <div className="col-span-12 lg:col-span-5">
            <div className="relative rounded-3xl border border-paper/15 bg-paper/5 backdrop-blur-xl p-8 md:p-10">
              <Logo />
              <div className="mt-8 space-y-5">
                <ContactRow
                  icon={<Phone className="h-4 w-4" strokeWidth={1.8} />}
                  label="Call direct"
                  value={CONTACT.phone}
                  href={CONTACT.phoneHref}
                />
                <ContactRow
                  icon={<Phone className="h-4 w-4" strokeWidth={1.8} />}
                  label="Mobile"
                  value={CONTACT.phoneAlt}
                  href={CONTACT.phoneAltHref}
                />
                <ContactRow
                  icon={<Mail className="h-4 w-4" strokeWidth={1.8} />}
                  label="Email"
                  value={CONTACT.email}
                  href={CONTACT.emailHref}
                />
                <ContactRow
                  icon={<MapPin className="h-4 w-4" strokeWidth={1.8} />}
                  label="Office"
                  value={
                    <>
                      {CONTACT.address}
                      <br />
                      {CONTACT.addressLine2}
                    </>
                  }
                />
              </div>

              <div className="mt-10 hairline-t pt-5 flex items-center justify-between font-mono text-[0.68rem] uppercase tracking-[0.2em] text-mist">
                <span>Mon to Sat · 09:00 – 18:00 GST</span>
                <span className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-brand animate-pulse" />
                  Open now
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ContactRow({
  icon,
  label,
  value,
  href,
}: {
  icon: React.ReactNode;
  label: string;
  value: React.ReactNode;
  href?: string;
}) {
  const Comp: "a" | "div" = href ? "a" : "div";
  return (
    <Comp
      href={href}
      {...(href ? { target: href.startsWith("http") ? "_blank" : undefined, rel: "noopener noreferrer" } : {})}
      className="group flex items-start gap-4"
    >
      <span className="flex h-9 w-9 items-center justify-center rounded-full border border-paper/15 bg-paper/5 text-paper shrink-0 group-hover:border-brand group-hover:text-brand transition-colors">
        {icon}
      </span>
      <div>
        <div className="font-mono text-[0.66rem] uppercase tracking-[0.22em] text-mist mb-0.5">
          {label}
        </div>
        <div className="text-[0.98rem] text-paper leading-snug">{value}</div>
      </div>
    </Comp>
  );
}
