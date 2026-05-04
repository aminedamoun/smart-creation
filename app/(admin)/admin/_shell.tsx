import Link from "next/link";
import { logoutAction } from "./actions";

export function AdminShell({
  children,
  active,
}: {
  children: React.ReactNode;
  active?: "dashboard" | "centres" | "properties";
}) {
  const links: { href: string; label: string; key: NonNullable<typeof active> }[] = [
    { href: "/admin", label: "Dashboard", key: "dashboard" },
    { href: "/admin/centres", label: "Business Centres", key: "centres" },
    { href: "/admin/properties", label: "Properties", key: "properties" },
  ];
  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-[240px_1fr]">
      <aside className="border-r border-ink/10 bg-paper md:min-h-screen p-5 md:p-6 flex md:flex-col items-center md:items-stretch gap-4 md:gap-1">
        <Link href="/admin" className="font-display text-[1.05rem] tracking-[-0.01em] text-ink shrink-0">
          Smart Creation
          <span className="block font-mono text-[0.6rem] uppercase tracking-[0.22em] text-stone mt-0.5">
            Admin
          </span>
        </Link>
        <nav className="flex md:flex-col gap-0.5 md:mt-6 ml-auto md:ml-0">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={
                "rounded-xl px-3 py-2 text-[0.92rem] transition-colors " +
                (active === l.key
                  ? "bg-ink text-paper"
                  : "text-ink-mute hover:bg-paper-soft hover:text-ink")
              }
            >
              {l.label}
            </Link>
          ))}
        </nav>
        <form action={logoutAction} className="md:mt-auto">
          <button
            type="submit"
            className="w-full text-left rounded-xl px-3 py-2 text-[0.88rem] text-ink-mute hover:bg-paper-soft hover:text-ink transition-colors"
          >
            Sign out
          </button>
        </form>
      </aside>
      <main className="p-6 md:p-10 max-w-[1400px]">{children}</main>
    </div>
  );
}
