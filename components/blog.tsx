"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, Clock } from "lucide-react";
import { SectionHeader } from "@/components/ui/section-header";

export type BlogCardPost = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  image: string;
  href: string;
};

export function Blog({ posts }: { posts: BlogCardPost[] }) {
  const blogPosts = posts;
  return (
    <section id="journal" className="relative py-24 md:py-36 bg-paper-soft">
      <div className="container-edit">
        <div className="grid grid-cols-12 gap-x-8 gap-y-8 items-end mb-12 md:mb-16">
          <div className="col-span-12 lg:col-span-8">
            <SectionHeader
              section="§ 10 — Journal"
              title={
                <>
                  Playbooks & field notes{" "}
                  <span className="text-brand-deep">from the ground.</span>
                </>
              }
              lede="Practical, no-fluff writing on Dubai company formation, Corporate Tax, banking, and the edge cases that actually slow founders down."
            />
          </div>
          <div className="col-span-12 lg:col-span-4 lg:text-right">
            <Link
              href="/blog"
              className="group inline-flex items-center gap-2 font-mono text-[0.72rem] uppercase tracking-[0.2em] text-ink hover:text-brand-deep transition-colors"
            >
              View all articles
              <ArrowUpRight
                className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                strokeWidth={1.8}
              />
            </Link>
          </div>
        </div>

        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
          {blogPosts.map((post, idx) => (
            <motion.li
              key={post.slug}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                duration: 0.55,
                delay: idx * 0.08,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <Link
                href={post.href}
                className="group flex h-full flex-col rounded-3xl border border-ink/10 bg-paper overflow-hidden transition-all hover:border-ink/25 hover:shadow-[0_18px_50px_-28px_rgba(13,16,19,0.3)]"
              >
                {/* Image */}
                <div className="relative aspect-[16/9] overflow-hidden bg-paper-deep">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                  />
                  <div
                    aria-hidden
                    className="absolute inset-0 bg-gradient-to-t from-ink/50 via-ink/0 to-transparent"
                  />
                  {/* Category badge */}
                  <div className="absolute top-3 left-3">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-paper/95 backdrop-blur-md px-2.5 py-1 font-mono text-[0.6rem] uppercase tracking-[0.22em] text-ink">
                      <span className="inline-block h-1.5 w-1.5 rounded-full bg-brand" />
                      {post.category}
                    </span>
                  </div>
                </div>

                {/* Body */}
                <div className="flex flex-1 flex-col p-6 md:p-7">
                  <div className="flex items-center gap-3 font-mono text-[0.66rem] uppercase tracking-[0.18em] text-stone">
                    <span>{post.date}</span>
                    <span className="text-mist/70">·</span>
                    <span className="inline-flex items-center gap-1">
                      <Clock className="h-3 w-3" strokeWidth={1.6} />
                      {post.readTime}
                    </span>
                  </div>
                  <h3 className="mt-4 font-display text-[1.25rem] md:text-[1.35rem] leading-[1.15] tracking-[-0.015em] text-ink text-balance group-hover:text-brand-deep transition-colors">
                    {post.title}
                  </h3>
                  <p className="mt-3 text-[0.92rem] leading-relaxed text-ink-mute text-pretty line-clamp-3">
                    {post.excerpt}
                  </p>
                  <div className="mt-auto pt-6 flex items-center gap-2 font-mono text-[0.7rem] uppercase tracking-[0.18em] text-ink-mute group-hover:text-brand-deep transition-colors">
                    Read article
                    <ArrowUpRight
                      className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      strokeWidth={1.8}
                    />
                  </div>
                </div>
              </Link>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
