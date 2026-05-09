import { supabasePublic } from "./supabase";

export type TeamRow = {
  id: number;
  name: string;
  role: string;
  photo: string | null;
  linkedin: string | null;
  visible: boolean;
  display_order: number;
};

export async function getTeam(): Promise<TeamRow[]> {
  const { data, error } = await supabasePublic
    .from("sc_team")
    .select("id, name, role, photo, linkedin, visible, display_order")
    .eq("visible", true)
    .order("display_order", { ascending: true });
  if (error) {
    console.error("getTeam failed:", error.message);
    return [];
  }
  return (data ?? []) as TeamRow[];
}
