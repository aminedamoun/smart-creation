"use client";

import Image from "next/image";
import { m } from "framer-motion";
import { Linkedin } from "lucide-react";

export type TeamMember = {
  name: string;
  role: string;
  photo?: string | null;
  linkedin?: string | null;
};

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0 },
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.04 } },
};

function initials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

function MemberCard({ member }: { member: TeamMember }) {
  return (
    <m.div
      variants={fadeUp}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className="group relative"
    >
      <div className="relative overflow-hidden rounded-2xl border border-ink/10 bg-ink shadow-[0_18px_45px_-22px_rgba(13,16,19,0.4)] transition-all duration-500 group-hover:border-brand/50 group-hover:shadow-[0_28px_70px_-24px_rgba(72,168,219,0.55)] aspect-[3/4]">
        {member.photo ? (
          <Image
            src={member.photo}
            alt={member.name}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-ink to-[#0a1419]">
            <span className="font-display text-[2.6rem] tracking-[-0.04em] text-paper/80">
              {initials(member.name)}
            </span>
          </div>
        )}

        {/* Bottom gradient — keeps name + role legible */}
        <div
          aria-hidden
          className="absolute inset-x-0 bottom-0 h-3/5 bg-gradient-to-t from-ink via-ink/55 to-transparent"
        />

        {/* Hover-only top stripe */}
        <span
          aria-hidden
          className="absolute inset-x-0 top-0 h-[2px] origin-left scale-x-0 group-hover:scale-x-100 bg-brand transition-transform duration-700"
        />

        {/* LinkedIn button — always visible when a profile exists */}
        {member.linkedin && (
          <a
            href={member.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${member.name} on LinkedIn`}
            className="absolute right-3 top-3 inline-flex h-8 w-8 items-center justify-center rounded-full border border-paper/20 bg-ink/55 backdrop-blur-md text-paper transition-all hover:bg-brand hover:text-ink hover:border-brand"
          >
            <Linkedin className="h-3.5 w-3.5" strokeWidth={1.8} />
          </a>
        )}

        {/* Name + role */}
        <div className="absolute inset-x-0 bottom-0 p-4 md:p-5">
          <div className="font-display font-medium tracking-[-0.015em] text-[1rem] md:text-[1.05rem] leading-[1.15] text-paper">
            {member.name}
          </div>
          <div className="mt-1.5 font-mono text-[0.55rem] uppercase tracking-[0.18em] text-paper/75 group-hover:text-brand-soft transition-colors duration-500 line-clamp-2">
            {member.role}
          </div>

          <span
            aria-hidden
            className="mt-2.5 block h-[2px] w-10 origin-left scale-x-0 group-hover:scale-x-100 bg-brand transition-transform duration-700"
          />
        </div>
      </div>
    </m.div>
  );
}

export function AboutTeamGrid({ members }: { members: TeamMember[] }) {
  return (
    <>
      {/* Header */}
      <div className="grid grid-cols-12 gap-x-10 gap-y-6 items-end mb-12 md:mb-16">
        <div className="col-span-12 lg:col-span-8">
          <div className="flex items-center gap-3 font-mono text-[0.66rem] uppercase tracking-[0.22em] text-stone mb-4">
            <span className="h-px w-8 bg-ink/25" />§ The team
          </div>
          <h2 className="font-display font-semibold text-[clamp(1.9rem,3.4vw,2.8rem)] leading-[1.05] tracking-[-0.02em] text-ink text-balance">
            {members.length} people behind every licence,{" "}
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
          One accountable team · Headquartered in Tecom
        </div>
      </div>

      {/* Flat 5-up grid — same size cards, LinkedIn buttons on each */}
      <m.ul
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
        variants={stagger}
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-5"
      >
        {members.map((member) => (
          <li key={member.name}>
            <MemberCard member={member} />
          </li>
        ))}
      </m.ul>
    </>
  );
}
