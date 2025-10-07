import ChromaGridTeam from "@/components/ChromaGridTeam";
import { readJson } from "@/lib/fsDb";
import { TeamMember } from "@/types";

export const dynamic = "force-dynamic";

export default async function TeamPage() {
  const team = await readJson<TeamMember[]>("team.json", []);
  return <ChromaGridTeam team={team} />;
}
