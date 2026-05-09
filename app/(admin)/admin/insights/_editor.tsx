"use client";

import { useEffect, useState } from "react";
import { EditorContent, useEditor, type Editor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import Image from "@tiptap/extension-image";
import { Markdown } from "tiptap-markdown";
import {
  Bold,
  Code,
  Heading2,
  Heading3,
  Image as ImageIcon,
  Italic,
  Link as LinkIcon,
  List,
  ListOrdered,
  Minus,
  Quote,
  Redo2,
  Strikethrough,
  Undo2,
} from "lucide-react";
import { uploadImageAction } from "../actions";

/**
 * Premium WYSIWYG blog editor — TipTap (the React port of ProseMirror,
 * what Notion / Linear-class editors use) with a markdown extension so the
 * stored body stays in markdown for the public article renderer.
 *
 * Submits via a hidden input named `name`, so server actions are unchanged.
 */
export function RichEditor({
  name,
  initial,
}: {
  name: string;
  initial: string;
}) {
  const [value, setValue] = useState(initial);

  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({
        heading: { levels: [2, 3] },
        codeBlock: { HTMLAttributes: { class: "tiptap-code" } },
        bulletList: { keepMarks: true, keepAttributes: true },
        orderedList: { keepMarks: true, keepAttributes: true },
        // Disable StarterKit's bundled Link so we don't double-register it
        // alongside our custom-configured @tiptap/extension-link below.
        link: false,
      }),
      Link.configure({
        openOnClick: false,
        autolink: true,
        HTMLAttributes: { class: "tiptap-link" },
      }),
      Placeholder.configure({
        placeholder:
          "Start writing your article. Press '/' for shortcuts, or use the toolbar above.",
        emptyEditorClass: "tiptap-empty",
      }),
      Image.configure({
        HTMLAttributes: { class: "tiptap-image" },
      }),
      Markdown.configure({
        html: true,
        tightLists: true,
        bulletListMarker: "-",
        linkify: true,
        breaks: true,
        transformPastedText: true,
        transformCopiedText: true,
      }),
    ],
    content: initial,
    onUpdate: ({ editor }) => {
      const storage = editor.storage as unknown as {
        markdown?: { getMarkdown?: () => string };
      };
      const md = storage.markdown?.getMarkdown?.() ?? editor.getHTML();
      setValue(md);
    },
  });

  // Re-set content if `initial` changes (e.g. switching post in edit page)
  useEffect(() => {
    if (!editor) return;
    const storage = editor.storage as unknown as { markdown?: unknown };
    if (storage.markdown && initial !== value) {
      editor.commands.setContent(initial, { emitUpdate: false });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editor, initial]);

  if (!editor) {
    return (
      <div className="rounded-xl border border-ink/15 bg-paper-soft p-4 text-[0.86rem] text-ink-mute">
        Loading editor…
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-ink/15 bg-paper overflow-hidden focus-within:border-brand/50 focus-within:shadow-[0_0_0_3px_rgba(72,168,219,0.12)] transition-all">
      <Toolbar editor={editor} />
      <input type="hidden" name={name} value={value} />
      <EditorContent
        editor={editor}
        className="tiptap-shell px-5 md:px-7 py-5 max-h-[640px] overflow-y-auto"
      />
      <Footer editor={editor} />

      {/* Local typography for the editing pane — mirrors the public article */}
      <style jsx global>{`
        .tiptap-shell .ProseMirror {
          outline: none;
          min-height: 360px;
          max-width: 60ch;
          margin: 0 auto;
        }
        .tiptap-shell .ProseMirror > * + * {
          margin-top: 0.85em;
        }
        .tiptap-shell .ProseMirror h1,
        .tiptap-shell .ProseMirror h2,
        .tiptap-shell .ProseMirror h3 {
          font-family: var(--font-display, var(--font-sans));
          font-weight: 600;
          letter-spacing: -0.02em;
          color: var(--color-ink);
          margin-top: 1.3em;
          margin-bottom: 0.4em;
        }
        .tiptap-shell .ProseMirror h1 { font-size: 1.6rem; }
        .tiptap-shell .ProseMirror h2 { font-size: 1.35rem; }
        .tiptap-shell .ProseMirror h3 { font-size: 1.1rem; }
        .tiptap-shell .ProseMirror p {
          line-height: 1.7;
          color: var(--color-ink);
        }
        .tiptap-shell .ProseMirror strong { font-weight: 600; }
        .tiptap-shell .ProseMirror em { font-style: italic; }
        .tiptap-shell .ProseMirror a.tiptap-link,
        .tiptap-shell .ProseMirror a {
          color: var(--color-brand-deep);
          text-decoration: underline;
          text-underline-offset: 3px;
          cursor: pointer;
        }
        .tiptap-shell .ProseMirror ul,
        .tiptap-shell .ProseMirror ol {
          padding-left: 1.5em;
        }
        .tiptap-shell .ProseMirror ul { list-style: disc; }
        .tiptap-shell .ProseMirror ol { list-style: decimal; }
        .tiptap-shell .ProseMirror li { margin: 0.25em 0; line-height: 1.55; }
        .tiptap-shell .ProseMirror li > p { margin: 0; }
        .tiptap-shell .ProseMirror blockquote {
          border-left: 3px solid var(--color-brand);
          background: color-mix(in srgb, var(--color-brand) 8%, transparent);
          padding: 0.6rem 1rem;
          margin: 0.85rem 0;
          font-style: italic;
          color: var(--color-ink);
          border-radius: 0 0.5rem 0.5rem 0;
        }
        .tiptap-shell .ProseMirror blockquote p { margin: 0; }
        .tiptap-shell .ProseMirror code {
          background: var(--color-paper-deep);
          padding: 0.1rem 0.4rem;
          border-radius: 0.3rem;
          font-size: 0.92em;
          font-family: var(--font-mono);
        }
        .tiptap-shell .ProseMirror pre {
          background: var(--color-ink);
          color: var(--color-paper);
          padding: 1rem;
          border-radius: 0.75rem;
          overflow-x: auto;
        }
        .tiptap-shell .ProseMirror pre code {
          background: transparent;
          padding: 0;
          color: inherit;
        }
        .tiptap-shell .ProseMirror hr {
          border: 0;
          border-top: 1px solid color-mix(in srgb, var(--color-ink) 12%, transparent);
          margin: 1.5rem 0;
        }
        .tiptap-shell .ProseMirror img.tiptap-image,
        .tiptap-shell .ProseMirror img {
          max-width: 100%;
          border-radius: 0.75rem;
          border: 1px solid color-mix(in srgb, var(--color-ink) 8%, transparent);
        }
        .tiptap-shell .ProseMirror p.is-editor-empty:first-child::before {
          color: color-mix(in srgb, var(--color-ink) 35%, transparent);
          content: attr(data-placeholder);
          float: left;
          height: 0;
          pointer-events: none;
          font-style: italic;
        }
        .tiptap-shell .ProseMirror table {
          width: 100%;
          border-collapse: collapse;
          margin: 1rem 0;
        }
        .tiptap-shell .ProseMirror th,
        .tiptap-shell .ProseMirror td {
          border: 1px solid color-mix(in srgb, var(--color-ink) 10%, transparent);
          padding: 0.5rem 0.7rem;
          text-align: left;
        }
        .tiptap-shell .ProseMirror th {
          background: var(--color-paper-soft);
          font-weight: 600;
        }
      `}</style>
    </div>
  );
}

function Toolbar({ editor }: { editor: Editor }) {
  const can = editor;
  const is = (name: string, attrs?: Record<string, unknown>) =>
    can.isActive(name, attrs);

  const promptLink = () => {
    const prev = (can.getAttributes("link").href as string | undefined) ?? "";
    const url = window.prompt("Link URL (leave empty to remove)", prev);
    if (url === null) return;
    if (url === "") {
      can.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }
    can
      .chain()
      .focus()
      .extendMarkRange("link")
      .setLink({ href: url, target: "_blank", rel: "noopener noreferrer" })
      .run();
  };

  const insertImage = async () => {
    const inp = document.createElement("input");
    inp.type = "file";
    inp.accept = "image/*";
    inp.onchange = async () => {
      const file = inp.files?.[0];
      if (!file) return;
      const fd = new FormData();
      fd.append("file", file);
      const res = await uploadImageAction(fd);
      if ("error" in res) {
        window.alert(`Upload failed: ${res.error}`);
        return;
      }
      can.chain().focus().setImage({ src: res.url, alt: file.name }).run();
    };
    inp.click();
  };

  return (
    <div className="flex items-center gap-0.5 border-b border-ink/10 bg-paper-soft px-2 py-1.5 sticky top-0 z-[1] flex-wrap">
      <Btn
        label="Heading 2"
        active={is("heading", { level: 2 })}
        onClick={() => can.chain().focus().toggleHeading({ level: 2 }).run()}
      >
        <Heading2 className="h-4 w-4" strokeWidth={1.7} />
      </Btn>
      <Btn
        label="Heading 3"
        active={is("heading", { level: 3 })}
        onClick={() => can.chain().focus().toggleHeading({ level: 3 }).run()}
      >
        <Heading3 className="h-4 w-4" strokeWidth={1.7} />
      </Btn>
      <Sep />
      <Btn
        label="Bold (⌘B)"
        active={is("bold")}
        onClick={() => can.chain().focus().toggleBold().run()}
      >
        <Bold className="h-4 w-4" strokeWidth={2} />
      </Btn>
      <Btn
        label="Italic (⌘I)"
        active={is("italic")}
        onClick={() => can.chain().focus().toggleItalic().run()}
      >
        <Italic className="h-4 w-4" strokeWidth={1.7} />
      </Btn>
      <Btn
        label="Strikethrough"
        active={is("strike")}
        onClick={() => can.chain().focus().toggleStrike().run()}
      >
        <Strikethrough className="h-4 w-4" strokeWidth={1.7} />
      </Btn>
      <Btn
        label="Inline code"
        active={is("code")}
        onClick={() => can.chain().focus().toggleCode().run()}
      >
        <Code className="h-4 w-4" strokeWidth={1.7} />
      </Btn>
      <Sep />
      <Btn
        label="Bullet list"
        active={is("bulletList")}
        onClick={() => can.chain().focus().toggleBulletList().run()}
      >
        <List className="h-4 w-4" strokeWidth={1.7} />
      </Btn>
      <Btn
        label="Numbered list"
        active={is("orderedList")}
        onClick={() => can.chain().focus().toggleOrderedList().run()}
      >
        <ListOrdered className="h-4 w-4" strokeWidth={1.7} />
      </Btn>
      <Btn
        label="Quote"
        active={is("blockquote")}
        onClick={() => can.chain().focus().toggleBlockquote().run()}
      >
        <Quote className="h-4 w-4" strokeWidth={1.7} />
      </Btn>
      <Sep />
      <Btn label="Link" active={is("link")} onClick={promptLink}>
        <LinkIcon className="h-4 w-4" strokeWidth={1.7} />
      </Btn>
      <Btn label="Image" onClick={insertImage}>
        <ImageIcon className="h-4 w-4" strokeWidth={1.7} />
      </Btn>
      <Btn
        label="Horizontal rule"
        onClick={() => can.chain().focus().setHorizontalRule().run()}
      >
        <Minus className="h-4 w-4" strokeWidth={1.7} />
      </Btn>
      <Sep />
      <Btn
        label="Undo (⌘Z)"
        onClick={() => can.chain().focus().undo().run()}
        disabled={!can.can().undo()}
      >
        <Undo2 className="h-4 w-4" strokeWidth={1.7} />
      </Btn>
      <Btn
        label="Redo (⇧⌘Z)"
        onClick={() => can.chain().focus().redo().run()}
        disabled={!can.can().redo()}
      >
        <Redo2 className="h-4 w-4" strokeWidth={1.7} />
      </Btn>
    </div>
  );
}

function Footer({ editor }: { editor: Editor }) {
  const text = editor.getText();
  const words = text.trim() ? text.trim().split(/\s+/).length : 0;
  const minutes = Math.max(1, Math.round(words / 220));
  return (
    <div className="flex items-center justify-between gap-3 border-t border-ink/10 bg-paper-soft px-4 py-2 font-mono text-[0.6rem] uppercase tracking-[0.18em] text-stone">
      <span>{words.toLocaleString()} words</span>
      <span>~ {minutes} min read</span>
    </div>
  );
}

function Btn({
  children,
  onClick,
  label,
  active,
  disabled,
}: {
  children: React.ReactNode;
  onClick: () => void;
  label: string;
  active?: boolean;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      title={label}
      aria-label={label}
      aria-pressed={active}
      disabled={disabled}
      className={
        "inline-flex h-8 w-8 items-center justify-center rounded-lg transition-colors disabled:opacity-40 disabled:cursor-not-allowed " +
        (active
          ? "bg-brand-night text-paper"
          : "text-ink-mute hover:bg-paper hover:text-ink")
      }
    >
      {children}
    </button>
  );
}

function Sep() {
  return <span aria-hidden className="mx-1 h-5 w-px bg-ink/10" />;
}
