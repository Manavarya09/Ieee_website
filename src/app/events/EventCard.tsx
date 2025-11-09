// src/app/events/EventCard.tsx
"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { EventItem } from "@/types";

export default function EventCard({ events }: { events: EventItem[] }) {
  return (
    <>
      {events.map((event) => (
        <SingleEventCard key={event.id} event={event} />
      ))}
    </>
  );
}

function SingleEventCard({ event }: { event: EventItem }) {
  const images = [event.coverImage, ...(event.gallery || [])];
  const [current, setCurrent] = useState(0);

  const next = (e: React.MouseEvent) => {
    e.preventDefault();
    setCurrent((prev) => (prev + 1) % images.length);
  };

  const prev = (e: React.MouseEvent) => {
    e.preventDefault();
    setCurrent((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <Link
      href={`/events/${event.slug}`}
      className="group rounded-xl overflow-hidden border border-black/5 dark:border-white/10 bg-white dark:bg-[#071428] relative"
    >
      <div className="relative h-48">
        <Image src={images[current]} alt={event.title} fill className="object-cover" />
        {images.length > 1 && (
          <>
            <button
              onClick={prev}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/30 text-white p-1 rounded-full"
            >
              ‹
            </button>
            <button
              onClick={next}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/30 text-white p-1 rounded-full"
            >
              ›
            </button>
          </>
        )}
      </div>
      <div className="p-4">
        <div className="text-sm text-black/60 dark:text-white/70">
          {new Date(event.date).toLocaleDateString()} · {event.category}
        </div>
        <div className="font-semibold text-lg">{event.title}</div>
        <p className="text-sm text-black/70 dark:text-white/70 line-clamp-2">{event.short}</p>
      </div>
    </Link>
  );
}
