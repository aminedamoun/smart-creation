import { requireAdmin } from "@/lib/admin-auth";
import { supabaseAdmin } from "@/lib/supabase";
import { AdminShell } from "../_shell";
import { TeamList } from "./_list";

export const dynamic = "force-dynamic";

export default async function AdminTeamListPage() {
  await requireAdmin();
  const { data } = await supabaseAdmin
    .from("sc_team")
    .select("id, name, role, photo, linkedin, visible, display_order")
    .order("display_order", { ascending: true });

  const members = (data ?? []).map((m) => ({
    id: Number(m.id),
    name: String(m.name),
    role: String(m.role ?? ""),
    photo: m.photo ? String(m.photo) : null,
    linkedin: m.linkedin ? String(m.linkedin) : null,
    visible: Boolean(m.visible),
  }));

  return (
    <AdminShell active="team">
      <div className="flex items-end justify-between mb-8 gap-4">
        <div>
          <div className="font-mono text-[0.66rem] uppercase tracking-[0.22em] text-stone mb-2">
            Content
          </div>
          <h1 className="font-display text-[2rem] tracking-[-0.02em] text-ink">
            Team
          </h1>
          <p className="mt-2 text-[0.95rem] text-ink-mute max-w-xl">
            Members shown on the About page. Drag to reorder, click a row to
            edit, toggle visibility to hide without deleting. (Asad Hashmi is
            managed separately in the CEO spotlight section.)
          </p>
        </div>
      </div>

      <TeamList initial={members} />
    </AdminShell>
  );
}
