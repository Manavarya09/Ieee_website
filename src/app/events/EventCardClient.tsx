"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { EventItem } from "@/types";

export default function EventCardClient({ event }: { event: EventItem }) {
  const images = event.gallery.length > 0 ? [event.coverImage, ...event.gallery] : [event.coverImage];
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 3000); // auto-slide every 3s

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <Link
      href={`/events/${event.slug}`}
      className="group rounded-xl overflow-hidden border border-black/5 dark:border-white/10 bg-white dark:bg-[#071428]"
    >
      <div className="relative h-48">
        <Image
          src={images[current]}
          alt={event.title}
          fill
          className="object-cover transition-opacity duration-500"
        />
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
