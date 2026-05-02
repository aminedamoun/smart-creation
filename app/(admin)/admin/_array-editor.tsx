"use client";

import { useState } from "react";

type Field = { key: string; label: string; type?: "text" | "textarea" };

export function ArrayEditor<T extends Record<string, string>>({
  name,
  label,
  description,
  fields,
  initial,
  template,
}: {
  name: string;                 // hidden input name -> JSON serialized array
  label: string;
  description?: string;
  fields: Field[];
  initial: T[];
  template: T;                  // empty-row template (plain object, JSON-serializable)
}) {
  const [items, setItems] = useState<T[]>(initial);

  const update = (idx: number, key: string, value: string) =>
    setItems((cur) => cur.map((it, i) => (i === idx ? { ...it, [key]: value } : it)));
  const remove = (idx: number) =>
    setItems((cur) => cur.filter((_, i) => i !== idx));
  const add = () => setItems((cur) => [...cur, { ...template }]);

  return (
    <div className="rounded-2xl border border-ink/10 bg-paper-soft p-4">
      <div className="flex items-center justify-between mb-3">
        <div>
          <div className="font-mono text-[0.62rem] uppercase tracking-[0.22em] text-stone">
            {label}
          </div>
          {description && <div className="text-[0.78rem] text-ink-mute mt-0.5">{description}</div>}
        </div>
        <button
          type="button"
          onClick={add}
          className="rounded-full border border-ink/15 bg-paper px-3 py-1 text-[0.78rem] text-ink hover:border-ink/40 transition-colors"
        >
          + Add
        </button>
      </div>
      <ul className="space-y-3">
        {items.map((it, i) => (
          <li key={i} className="rounded-xl border border-ink/10 bg-paper p-3">
            <div className="flex items-center justify-between mb-2">
              <span className="font-mono text-[0.6rem] uppercase tracking-[0.22em] text-stone">
                # {i + 1}
              </span>
              <button
                type="button"
                onClick={() => remove(i)}
                className="text-[0.75rem] text-ink-mute hover:text-red-600"
              >
                Remove
              </button>
            </div>
            <div className={fields.length > 1 ? "grid grid-cols-1 md:grid-cols-2 gap-2" : ""}>
              {fields.map((f) => (
                <label key={f.key} className="block">
                  <span className="block text-[0.7rem] text-ink-mute mb-1">{f.label}</span>
                  {f.type === "textarea" ? (
                    <textarea
                      value={it[f.key] ?? ""}
                      onChange={(e) => update(i, f.key, e.target.value)}
                      className="w-full rounded-lg border border-ink/15 bg-paper px-2.5 py-1.5 text-[0.88rem] focus:outline-none focus:border-ink/40"
                      rows={2}
                    />
                  ) : (
                    <input
                      value={it[f.key] ?? ""}
                      onChange={(e) => update(i, f.key, e.target.value)}
                      className="w-full rounded-lg border border-ink/15 bg-paper px-2.5 py-1.5 text-[0.88rem] focus:outline-none focus:border-ink/40"
                    />
                  )}
                </label>
              ))}
            </div>
          </li>
        ))}
        {items.length === 0 && (
          <li className="text-[0.84rem] text-ink-mute italic">No items yet — click "+ Add"</li>
        )}
      </ul>
      <input type="hidden" name={name} value={JSON.stringify(items)} />
    </div>
  );
}
