"use client";
import Image from "next/image";
import { useState } from "react";

export default function FolderGallery({ items }: { items: { src: string; alt: string }[] }) {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
      <h2 className="text-2xl font-semibold mb-6">Gallery</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
        {items.map((g, idx) => (
          <button key={idx} className="group relative rounded-xl overflow-hidden border border-black/5 dark:border-white/10" onClick={() => setOpen(idx)}>
            <div className="relative aspect-[4/3]">
              <Image src={g.src} alt={g.alt} fill className="object-cover transition-transform group-hover:scale-105" />
            </div>
          </button>
        ))}
      </div>
      {open !== null && (
        <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4" onClick={() => setOpen(null)}>
          <div className="relative max-w-4xl w-full" onClick={(e) => e.stopPropagation()}>
            <div className="relative w-full" style={{ aspectRatio: '16/9' }}>
              <Image src={items[open].src} alt={items[open].alt} fill className="object-contain" />
            </div>
            <div className="mt-3 text-right">
              <button className="px-4 py-2 rounded bg-white text-[#071428]" onClick={() => setOpen(null)}>Close</button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
