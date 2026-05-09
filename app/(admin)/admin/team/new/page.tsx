import { requireAdmin } from "@/lib/admin-auth";
import { AdminShell } from "../../_shell";
import { TeamMemberForm } from "../_form";

export const dynamic = "force-dynamic";

export default async function NewTeamMemberPage() {
  await requireAdmin();
  return (
    <AdminShell active="team">
      <TeamMemberForm />
    </AdminShell>
  );
}
