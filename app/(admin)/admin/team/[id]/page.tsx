import { notFound } from "next/navigation";
import { requireAdmin } from "@/lib/admin-auth";
import { supabaseAdmin } from "@/lib/supabase";
import { AdminShell } from "../../_shell";
import { TeamMemberForm } from "../_form";

export const dynamic = "force-dynamic";

type PageProps = { params: Promise<{ id: string }> };

export default async function EditTeamMemberPage({ params }: PageProps) {
  await requireAdmin();
  const { id: idStr } = await params;
  const id = Number(idStr);
  if (!Number.isFinite(id)) notFound();

  const { data } = await supabaseAdmin
    .from("sc_team")
    .select("id, name, role, photo, linkedin, visible")
    .eq("id", id)
    .maybeSingle();
  if (!data) notFound();

  return (
    <AdminShell active="team">
      <TeamMemberForm
        initial={{
          id: Number(data.id),
          name: String(data.name ?? ""),
          role: String(data.role ?? ""),
          photo: data.photo ? String(data.photo) : null,
          linkedin: data.linkedin ? String(data.linkedin) : null,
          visible: Boolean(data.visible),
        }}
      />
    </AdminShell>
  );
}
