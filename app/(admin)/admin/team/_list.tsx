"use client";

import { useEffect, useMemo, useRef, useState, useTransition } from "react";
import Image from "next/image";
import Link from "next/link";
import { Reorder, useDragControls, motion, AnimatePresence } from "framer-motion";
import {
  ArrowDown,
  ArrowUp,
  EyeOff,
  GripVertical,
  Linkedin,
  Pencil,
  Plus,
  Search,
  Trash2,
} from "lucide-react";
import { reorderTeamAction, deleteTeamMemberAction } from "../actions";

type Member = {
  id: number;
  name: string;
  role: string;
  photo: string | null;
  linkedin: string | null;
  visible: boolean;
};

function initials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

function MemberRow({
  m,
  isFirst,
  isLast,
  onMoveUp,
  onMoveDown,
  draggable,
}: {
  m: Member;
  isFirst: boolean;
  isLast: boolean;
  onMoveUp: () => void;
  onMoveDown: () => void;
  draggable: boolean;
}) {
  const controls = useDragControls();
  const [confirming, setConfirming] = useState(false);

  const inner = (
    <div className="flex items-center gap-4 p-3 md:p-4">
      {draggable && (
        <button
          type="button"
          onPointerDown={(e) => controls.start(e)}
          aria-label="Drag to reorder"
          className="shrink-0 cursor-grab active:cursor-grabbing rounded-lg p-2 text-ink-mute hover:bg-paper-soft hover:text-ink touch-none"
        >
          <GripVertical className="h-4 w-4" strokeWidth={1.8} />
        </button>
      )}

      <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl border border-ink/10 bg-gradient-to-br from-ink to-[#0a1419]">
        {m.photo ? (
          <Image
            src={m.photo}
            alt={m.name}
            fill
            sizes="56px"
            className="object-cover"
          />
        ) : (
          <div className="absolute inset-0 grid place-items-center font-display text-[1rem] tracking-[-0.02em] text-paper/80">
            {initials(m.name)}
          </div>
        )}
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <h3 className="font-display text-[1.02rem] tracking-[-0.01em] text-ink truncate">
            {m.name}
          </h3>
          {!m.visible && (
            <span className="shrink-0 inline-flex items-center gap-1 rounded-full bg-paper-soft border border-ink/10 px-2 py-0.5 font-mono text-[0.55rem] uppercase tracking-[0.18em] text-stone">
              <EyeOff className="h-2.5 w-2.5" strokeWidth={1.8} />
              Hidden
            </span>
          )}
        </div>
        <div className="mt-0.5 text-[0.85rem] text-ink-mute truncate">
          {m.role || "—"}
        </div>
      </div>

      {m.linkedin && (
        <a
          href={m.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn"
          className="shrink-0 rounded-full border border-ink/15 bg-paper p-2 text-ink-mute hover:border-brand/50 hover:text-brand-deep transition-colors"
        >
          <Linkedin className="h-3.5 w-3.5" strokeWidth={1.8} />
        </a>
      )}

      {draggable && (
        <div className="hidden md:flex flex-col gap-0.5 shrink-0">
          <button
            type="button"
            onClick={onMoveUp}
            disabled={isFirst}
            aria-label="Move up"
            className="rounded-md p-1 text-ink-mute hover:bg-paper-soft hover:text-ink disabled:opacity-30 disabled:hover:bg-transparent"
          >
            <ArrowUp className="h-3.5 w-3.5" strokeWidth={1.8} />
          </button>
          <button
            type="button"
            onClick={onMoveDown}
            disabled={isLast}
            aria-label="Move down"
            className="rounded-md p-1 text-ink-mute hover:bg-paper-soft hover:text-ink disabled:opacity-30 disabled:hover:bg-transparent"
          >
            <ArrowDown className="h-3.5 w-3.5" strokeWidth={1.8} />
          </button>
        </div>
      )}

      <Link
        href={`/admin/team/${m.id}`}
        className="shrink-0 inline-flex items-center gap-1.5 rounded-full border border-ink/15 bg-paper px-3 py-1.5 text-[0.8rem] text-ink hover:border-ink/40 transition-colors"
      >
        <Pencil className="h-3 w-3" strokeWidth={1.8} />
        Edit
      </Link>

      {confirming ? (
        <form
          action={deleteTeamMemberAction}
          className="shrink-0 inline-flex items-center gap-1"
        >
          <input type="hidden" name="id" value={m.id} />
          <button
            type="submit"
            className="rounded-full bg-red-600 px-3 py-1.5 text-[0.78rem] text-paper hover:bg-red-700 transition-colors"
          >
            Confirm
          </button>
          <button
            type="button"
            onClick={() => setConfirming(false)}
            className="rounded-full border border-ink/15 px-3 py-1.5 text-[0.78rem] text-ink-mute hover:text-ink hover:border-ink/40 transition-colors"
          >
            Cancel
          </button>
        </form>
      ) : (
        <button
          type="button"
          onClick={() => setConfirming(true)}
          aria-label="Delete"
          className="shrink-0 rounded-full border border-ink/15 bg-paper p-2 text-ink-mute hover:border-red-500/40 hover:text-red-600 transition-colors"
        >
          <Trash2 className="h-3.5 w-3.5" strokeWidth={1.8} />
        </button>
      )}
    </div>
  );

  if (!draggable) {
    return (
      <li className="rounded-2xl border border-ink/10 bg-paper transition-colors hover:border-ink/25">
        {inner}
      </li>
    );
  }

  return (
    <Reorder.Item
      value={m}
      dragListener={false}
      dragControls={controls}
      whileDrag={{
        scale: 1.02,
        boxShadow: "0 24px 60px -20px rgba(13,16,19,0.35)",
        zIndex: 50,
      }}
      className="rounded-2xl border border-ink/10 bg-paper transition-colors hover:border-ink/25"
    >
      {inner}
    </Reorder.Item>
  );
}

export function TeamList({ initial }: { initial: Member[] }) {
  const [members, setMembers] = useState<Member[]>(initial);
  const [query, setQuery] = useState("");
  const [, startTransition] = useTransition();
  const [savedFlash, setSavedFlash] = useState(false);
  const debounceRef = useRef<NodeJS.Timeout | null>(null);
  const lastSavedOrderRef = useRef<string>(initial.map((m) => m.id).join(","));

  const filtered = useMemo(() => {
    if (!query.trim()) return members;
    const q = query.toLowerCase();
    return members.filter(
      (m) => m.name.toLowerCase().includes(q) || m.role.toLowerCase().includes(q),
    );
  }, [members, query]);

  // Debounced save when order changes.
  useEffect(() => {
    const next = members.map((m) => m.id).join(",");
    if (next === lastSavedOrderRef.current) return;
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      const fd = new FormData();
      fd.append("order", JSON.stringify(members.map((m) => m.id)));
      startTransition(async () => {
        try {
          await reorderTeamAction(fd);
          lastSavedOrderRef.current = next;
          setSavedFlash(true);
          setTimeout(() => setSavedFlash(false), 1400);
        } catch (e) {
          console.error("Reorder failed", e);
        }
      });
    }, 600);
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [members]);

  function moveBy(id: number, delta: number) {
    setMembers((cur) => {
      const idx = cur.findIndex((m) => m.id === id);
      if (idx < 0) return cur;
      const next = idx + delta;
      if (next < 0 || next >= cur.length) return cur;
      const copy = [...cur];
      const [item] = copy.splice(idx, 1);
      copy.splice(next, 0, item);
      return copy;
    });
  }

  const isSearching = query.trim().length > 0;

  return (
    <div>
      {/* Toolbar */}
      <div className="mb-6 flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-[240px]">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-ink-mute"
            strokeWidth={1.8}
          />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by name or role…"
            className="w-full rounded-full border border-ink/15 bg-paper pl-9 pr-4 py-2.5 text-[0.9rem] text-ink placeholder:text-ink-mute focus:outline-none focus:border-ink/40"
          />
        </div>
        <Link
          href="/admin/team/new"
          className="inline-flex items-center gap-2 rounded-full bg-ink px-4 py-2.5 text-[0.88rem] text-paper hover:bg-brand-night transition-colors"
        >
          <Plus className="h-4 w-4" strokeWidth={2} />
          Add member
        </Link>
      </div>

      {/* Hint */}
      <div className="mb-4 flex flex-wrap items-center gap-x-4 gap-y-1 font-mono text-[0.62rem] uppercase tracking-[0.18em] text-stone">
        <span>{members.length} members</span>
        <span className="text-stone/50">·</span>
        <span>
          {isSearching
            ? "Drag disabled while searching"
            : "Drag the handle or use arrows to reorder · saves automatically"}
        </span>
        <AnimatePresence>
          {savedFlash && (
            <motion.span
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 border border-emerald-300/40 px-2.5 py-0.5 text-emerald-700 normal-case tracking-normal"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              Saved
            </motion.span>
          )}
        </AnimatePresence>
      </div>

      {isSearching ? (
        <ul className="space-y-2">
          {filtered.map((m, i) => (
            <MemberRow
              key={m.id}
              m={m}
              isFirst={i === 0}
              isLast={i === filtered.length - 1}
              onMoveUp={() => {}}
              onMoveDown={() => {}}
              draggable={false}
            />
          ))}
          {filtered.length === 0 && (
            <li className="rounded-2xl border border-dashed border-ink/15 bg-paper-soft px-5 py-8 text-center text-[0.9rem] text-ink-mute">
              No matches for &ldquo;{query}&rdquo;.
            </li>
          )}
        </ul>
      ) : (
        <Reorder.Group
          axis="y"
          values={members}
          onReorder={setMembers}
          className="space-y-2"
        >
          {members.map((m, i) => (
            <MemberRow
              key={m.id}
              m={m}
              isFirst={i === 0}
              isLast={i === members.length - 1}
              onMoveUp={() => moveBy(m.id, -1)}
              onMoveDown={() => moveBy(m.id, 1)}
              draggable
            />
          ))}
        </Reorder.Group>
      )}

      {members.length === 0 && (
        <div className="rounded-3xl border border-dashed border-ink/15 bg-paper-soft px-6 py-14 text-center">
          <div className="font-display text-[1.1rem] text-ink">No team members yet</div>
          <p className="mt-2 text-[0.92rem] text-ink-mute max-w-md mx-auto">
            Add your first member — photo, role, LinkedIn — and they&apos;ll
            appear on the About page within seconds.
          </p>
          <Link
            href="/admin/team/new"
            className="mt-5 inline-flex items-center gap-2 rounded-full bg-ink px-4 py-2.5 text-[0.88rem] text-paper hover:bg-brand-night transition-colors"
          >
            <Plus className="h-4 w-4" strokeWidth={2} />
            Add the first member
          </Link>
        </div>
      )}
    </div>
  );
}
