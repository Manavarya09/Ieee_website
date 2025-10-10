import { NextResponse } from "next/server";
import { readJson } from "@/lib/fsDb";
import { TeamMember } from "@/types";

export async function GET() {
  const team = await readJson<TeamMember[]>("team.json", []);
  return NextResponse.json(team);
}