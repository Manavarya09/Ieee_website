import { NextRequest } from "next/server";
import { readJson } from "@/lib/fsDb";
import { EventItem } from "@/types";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const all = await readJson<EventItem[]>("events.json", []);
  const { searchParams } = new URL(req.url);
  const q = (searchParams.get("q") || "").toLowerCase();
  const type = searchParams.get("type") || "";
  const page = parseInt(searchParams.get("page") || "1", 10);
  const pageSize = parseInt(searchParams.get("pageSize") || "24", 10);
  let data = all
    .filter((e) => (!q || e.title.toLowerCase().includes(q) || e.short.toLowerCase().includes(q)))
    .filter((e) => (!type || e.category === type))
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  const start = (page - 1) * pageSize;
  const items = data.slice(start, start + pageSize);
  return Response.json(items);
}
