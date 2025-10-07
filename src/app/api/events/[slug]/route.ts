import { readJson } from "@/lib/fsDb";
import { EventItem } from "@/types";

export const dynamic = "force-dynamic";

export async function GET(_: Request, { params }: { params: { slug: string } }) {
  const all = await readJson<EventItem[]>("events.json", []);
  const event = all.find((e) => e.slug === params.slug);
  if (!event) return new Response("Not found", { status: 404 });
  return Response.json(event);
}
