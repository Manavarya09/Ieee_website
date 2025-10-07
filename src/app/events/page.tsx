import Link from "next/link";
import Image from "next/image";
import { readJson } from "@/lib/fsDb";
import { EventItem } from "@/types";

export const dynamic = "force-dynamic";

export default async function EventsPage({ searchParams }: { searchParams?: { q?: string; type?: string } }) {
  const all = await readJson<EventItem[]>("events.json", []);
  const q = (searchParams?.q ?? "").toLowerCase();
  const type = searchParams?.type ?? "";
  const events = all
    .filter((e) => (!q || e.title.toLowerCase().includes(q) || e.short.toLowerCase().includes(q)))
    .filter((e) => (!type || e.category === type));
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-semibold mb-6">Events</h1>
      <form className="flex flex-wrap gap-3 mb-6">
        <input name="q" defaultValue={q} placeholder="Search" className="px-3 py-2 rounded-md border border-black/10 dark:border-white/15 bg-white dark:bg-[#071428] w-64" />
        <select name="type" defaultValue={type} className="px-3 py-2 rounded-md border border-black/10 dark:border-white/15 bg-white dark:bg-[#071428]">
          <option value="">All types</option>
          <option>Workshop</option>
          <option>Talk</option>
          <option>Hackathon</option>
          <option>Other</option>
        </select>
        <button className="px-4 py-2 rounded-md bg-ieee-500 text-white">Filter</button>
      </form>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((e) => (
          <Link key={e.id} href={`/events/${e.slug}`} className="group rounded-xl overflow-hidden border border-black/5 dark:border-white/10 bg-white dark:bg-[#071428]">
            <div className="relative h-48">
              <Image src={e.coverImage} alt={e.title} fill className="object-cover" />
            </div>
            <div className="p-4">
              <div className="text-sm text-black/60 dark:text-white/70">{new Date(e.date).toLocaleDateString()} · {e.category}</div>
              <div className="font-semibold text-lg">{e.title}</div>
              <p className="text-sm text-black/70 dark:text-white/70 line-clamp-2">{e.short}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
