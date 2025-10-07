import Link from "next/link";
import Image from "next/image";
import { EventItem } from "@/types";

export default function MagicBentoEvents({ events }: { events: EventItem[] }) {
  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
      <h2 className="text-2xl font-semibold mb-6">Featured events</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4 auto-rows-[200px]">
        {events.slice(0, 6).map((ev, i) => (
          <Link
            href={`/events/${ev.slug}`}
            key={ev.id}
            className={`group relative col-span-1 rounded-xl overflow-hidden border border-black/5 dark:border-white/10 bg-white dark:bg-[#071428] ${i % 6 === 0 ? 'lg:col-span-3 lg:row-span-2' : i % 6 === 1 ? 'lg:col-span-3' : 'lg:col-span-2'}`}
          >
            <Image src={ev.coverImage} alt={ev.title} fill sizes="(max-width: 1024px) 100vw, 33vw" className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/0" />
            <div className="absolute bottom-0 p-4 text-white">
              <div className="text-sm opacity-80">{new Date(ev.date).toLocaleDateString()}</div>
              <div className="text-lg font-semibold">{ev.title}</div>
              <div className="text-sm opacity-90 line-clamp-2">{ev.short}</div>
              <span className="mt-2 inline-block text-xs px-2 py-1 rounded bg-ieee-500">Learn more</span>
            </div>
          </Link>
        ))}
      </div>
      <div className="mt-8 text-center">
        <a href="/events" className="inline-flex items-center justify-center px-5 py-2.5 rounded-md border border-black/10 dark:border-white/15 hover:bg-black/5 dark:hover:bg-white/10">Show all events</a>
      </div>
    </section>
  );
}
