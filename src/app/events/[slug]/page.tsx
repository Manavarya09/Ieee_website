import { notFound } from "next/navigation";
import Image from "next/image";
import { readJson } from "@/lib/fsDb";
import { EventItem } from "@/types";

export const dynamic = "force-dynamic";

export default async function EventDetail({ params }: { params: { slug: string } }) {
  const all = await readJson<EventItem[]>("events.json", []);
  const event = all.find((e) => e.slug === params.slug);
  if (!event) return notFound();
  return (
    <article className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-12">
      <div className="relative h-64 rounded-xl overflow-hidden border border-black/5 dark:border-white/10">
        <Image src={event.coverImage} alt={event.title} fill className="object-cover" />
      </div>
      <h1 className="mt-6 text-3xl font-bold">{event.title}</h1>
      <div className="text-black/60 dark:text-white/70">{new Date(event.date).toLocaleString()} · {event.category}</div>
      <div className="mt-6 space-y-3 leading-relaxed" dangerouslySetInnerHTML={{ __html: event.description }} />
      {event.gallery?.length > 0 && (
        <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 gap-3">
          {event.gallery.map((g, i) => (
            <div key={i} className="relative aspect-[4/3] rounded overflow-hidden">
              <Image src={g} alt={`${event.title} photo ${i + 1}`} fill className="object-cover" />
            </div>
          ))}
        </div>
      )}
    </article>
  );
}
