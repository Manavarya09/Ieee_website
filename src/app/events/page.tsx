import Link from "next/link";
import { readJson } from "@/lib/fsDb";
import { EventItem } from "@/types";
import EventCardClient from "./EventCardClient";


export const dynamic = "force-dynamic";

export default async function EventsPage({ searchParams }: { searchParams?: { q?: string; type?: string } }) {
  const all = await readJson<EventItem[]>("events.json", []);
  const q = (searchParams?.q ?? "").toLowerCase();
  const type = (searchParams?.type ?? "").toLowerCase();

  const events = all.filter((e) => {
    const matchesQuery =
      !q ||
      e.title.toLowerCase().includes(q) ||
      e.short.toLowerCase().includes(q) ||
      e.description.toLowerCase().includes(q);

    const matchesType = !type || e.category.toLowerCase() === type;

    return matchesQuery && matchesType;
  });

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-semibold mb-6">Events</h1>

      <form className="flex flex-wrap gap-3 mb-6">
        <input
          name="q"
          defaultValue={searchParams?.q ?? ""}
          placeholder="Search"
          className="px-3 py-2 rounded-md border border-black/10 dark:border-white/15 bg-white dark:bg-[#071428] w-64"
        />
        <select
          name="type"
          defaultValue={searchParams?.type ?? ""}
          className="px-3 py-2 rounded-md border border-black/10 dark:border-white/15 bg-white dark:bg-[#071428]"
        >
          <option value="">All types</option>
          <option value="Workshop">Workshop</option>
          <option value="Talk">Talk</option>
          <option value="Hackathon">Hackathon</option>
          <option value="Stall Event">Stall Event</option>
          <option value="Other">Other</option>
          <option value="Upcoming Event">Upcoming Event</option>
        </select>
        <button className="px-4 py-2 rounded-md bg-ieee-500 text-white">Filter</button>
      </form>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((e) => (
          <EventCardClient key={e.id} event={e} />
        ))}
      </div>
    </div>
  );
}
