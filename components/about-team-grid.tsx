"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight, Sparkles } from "lucide-react";
import { team, teamDepartments, type TeamMember } from "@/lib/data";

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0 },
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.05 } },
};

function initials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

function MemberCard({
  m,
  size = "regular",
  index,
}: {
  m: TeamMember;
  size?: "lead" | "regular";
  index: number;
}) {
  const isLead = size === "lead";
  return (
    <motion.div
      variants={fadeUp}
      whileHover={{ y: -8 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="group relative"
    >
      {/* Decorative offset frame — peeks on hover */}
      <span
        aria-hidden
        className="absolute inset-0 translate-x-3 translate-y-3 rounded-[28px] border-2 border-brand/40 opacity-0 group-hover:opacity-100 group-hover:translate-x-4 group-hover:translate-y-4 transition-all duration-500"
      />

      <div
        className={
          "relative overflow-hidden rounded-[28px] border border-ink/10 bg-ink shadow-[0_22px_60px_-22px_rgba(13,16,19,0.45)] transition-all duration-500 group-hover:border-brand/50 group-hover:shadow-[0_36px_80px_-25px_rgba(72,168,219,0.6)] aspect-[3/4]"
        }
      >
        {m.photo ? (
          <Image
            src={m.photo}
            alt={m.name}
            fill
            sizes={isLead ? "(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw" : "(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 25vw"}
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.07]"
            priority={isLead && index < 2}
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-ink to-[#0a1419]">
            <span className="font-display text-[3.5rem] tracking-[-0.04em] text-paper/80">
              {initials(m.name)}
            </span>
          </div>
        )}

        {/* Always-visible bottom gradient (taller for legibility) */}
        <div
          aria-hidden
          className="absolute inset-x-0 bottom-0 h-3/4 bg-gradient-to-t from-ink via-ink/55 to-transparent"
        />

        {/* Hover-only top stripe */}
        <span
          aria-hidden
          className="absolute inset-x-0 top-0 h-[3px] origin-left scale-x-0 group-hover:scale-x-100 bg-brand transition-transform duration-700"
        />

        {/* Brand glow corner */}
        <span
          aria-hidden
          className="pointer-events-none absolute -bottom-20 -right-20 h-56 w-56 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700"
          style={{
            background:
              "radial-gradient(closest-side, rgba(72,168,219,0.6), rgba(72,168,219,0) 70%)",
          }}
        />

        {/* Top-left "Sparkles · Smart Creation" pill — always visible, fades stronger on hover */}
        <div className="absolute left-4 top-4 md:left-5 md:top-5 inline-flex items-center gap-1.5 rounded-full border border-paper/15 bg-ink/50 backdrop-blur-md px-2.5 py-1 font-mono text-[0.55rem] uppercase tracking-[0.22em] text-paper/80 group-hover:text-paper group-hover:border-brand/40 transition-all duration-500">
          <Sparkles className="h-2.5 w-2.5 text-brand" strokeWidth={2} />
          {m.department === "leadership" ? "Leadership" : "Team"}
        </div>

        {/* Bottom: name + role */}
        <div className="absolute inset-x-0 bottom-0 p-5 md:p-6 lg:p-7">
          <div
            className={
              (isLead
                ? "font-display font-medium tracking-[-0.02em] text-[1.4rem] md:text-[1.6rem] lg:text-[1.75rem]"
                : "font-display font-medium tracking-[-0.015em] text-[1.15rem] md:text-[1.25rem] lg:text-[1.35rem]") +
              " text-paper leading-[1.05]"
            }
          >
            {m.name}
          </div>
          <div
            className={
              (isLead
                ? "mt-2 font-mono text-[0.66rem] tracking-[0.22em]"
                : "mt-2 font-mono text-[0.6rem] tracking-[0.2em]") +
              " uppercase text-paper/70 group-hover:text-brand-soft transition-colors duration-500 line-clamp-2"
            }
          >
            {m.role}
          </div>

          {/* Bottom thin brand line (hover) */}
          <span
            aria-hidden
            className="mt-3 block h-[2px] w-12 origin-left scale-x-0 group-hover:scale-x-100 bg-brand transition-transform duration-700"
          />
        </div>

        {/* Hover-revealed bottom-right arrow */}
        <div className="absolute right-4 bottom-4 md:right-5 md:bottom-5 inline-flex h-9 w-9 md:h-10 md:w-10 items-center justify-center rounded-full border border-paper/20 bg-ink/60 backdrop-blur-md opacity-0 group-hover:opacity-100 group-hover:bg-brand group-hover:border-brand transition-all duration-500 translate-y-2 group-hover:translate-y-0">
          <ArrowUpRight className="h-4 w-4 text-paper group-hover:text-ink transition-colors" strokeWidth={2} />
        </div>
      </div>
    </motion.div>
  );
}

export function AboutTeamGrid() {
  // Featured = first 5 (Leadership block from data)
  const featured = team.filter((m) => m.department === "leadership");
  const others = teamDepartments
    .filter((d) => d.key !== "leadership")
    .map((d) => ({ ...d, members: team.filter((m) => m.department === d.key) }));
  const total = team.length;

  return (
    <>
      {/* Header */}
      <div className="grid grid-cols-12 gap-x-10 gap-y-6 items-end mb-12 md:mb-16">
        <div className="col-span-12 lg:col-span-8">
          <div className="flex items-center gap-3 font-mono text-[0.66rem] uppercase tracking-[0.22em] text-stone mb-4">
            <span className="h-px w-8 bg-ink/25" />§ The team
          </div>
          <h2 className="font-display font-semibold text-[clamp(1.9rem,3.4vw,2.8rem)] leading-[1.05] tracking-[-0.02em] text-ink text-balance">
            {total} people behind every licence,{" "}
            <span className="text-brand-deep">bank account and visa.</span>
          </h2>
          <p className="mt-5 max-w-2xl text-[1rem] leading-relaxed text-ink-mute">
            Whatever you write us about, the same team gets the file across the
            line — from the consultant who reads your brief, to the PRO who
            stands in the queue, to the accountant who closes your books at
            year-end.
          </p>
        </div>
        <div className="col-span-12 lg:col-span-4 lg:text-right font-mono text-[0.66rem] uppercase tracking-[0.22em] text-stone leading-relaxed">
          {teamDepartments.length} departments · one accountable team
        </div>
      </div>

      {/* Featured: Leadership */}
      <div className="mb-16 md:mb-24">
        <div className="flex items-end justify-between gap-6 flex-wrap mb-6 md:mb-8">
          <div>
            <div className="font-mono text-[0.62rem] uppercase tracking-[0.22em] text-stone mb-2">
              Leadership
            </div>
            <div className="font-display text-[1.25rem] tracking-[-0.015em] text-ink leading-snug max-w-2xl">
              The people who own the file from licence to renewal.
            </div>
          </div>
          <div className="font-mono text-[0.6rem] uppercase tracking-[0.22em] text-stone">
            {featured.length} people
          </div>
        </div>

        <motion.ul
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6 md:gap-8"
        >
          {featured.map((m, i) => (
            <li key={m.name}>
              <MemberCard m={m} size="lead" index={i} />
            </li>
          ))}
        </motion.ul>
      </div>

      {/* Other departments */}
      <div className="space-y-16 md:space-y-20">
        {others.map(
          (g) =>
            g.members.length > 0 && (
              <div key={g.key}>
                <div className="flex items-end justify-between gap-6 flex-wrap mb-6 md:mb-8">
                  <div>
                    <div className="font-mono text-[0.62rem] uppercase tracking-[0.22em] text-stone mb-2">
                      {g.label}
                    </div>
                    <div className="font-display text-[1.2rem] tracking-[-0.015em] text-ink leading-snug max-w-2xl">
                      {g.caption}
                    </div>
                  </div>
                  <div className="font-mono text-[0.6rem] uppercase tracking-[0.22em] text-stone">
                    {g.members.length} people
                  </div>
                </div>

                <motion.ul
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, margin: "-80px" }}
                  variants={stagger}
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 md:gap-6"
                >
                  {g.members.map((m, i) => (
                    <li key={m.name}>
                      <MemberCard m={m} size="regular" index={i} />
                    </li>
                  ))}
                </motion.ul>
              </div>
            ),
        )}
      </div>
    </>
  );
}
