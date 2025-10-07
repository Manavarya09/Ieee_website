"use client";
import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";

interface Slide { src: string; alt: string }

export default function HeroSlider({ slides }: { slides: Slide[] }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const timer = useRef<number | null>(null);
  const safeSlides = useMemo(() => (slides.length ? slides : [{ src: "/vercel.svg", alt: "placeholder" }]), [slides]);

  useEffect(() => {
    if (paused) return;
    timer.current = window.setInterval(() => setIndex((i) => (i + 1) % safeSlides.length), 5000);
    return () => {
      if (timer.current) window.clearInterval(timer.current);
    };
  }, [paused, safeSlides.length]);

  const go = (i: number) => setIndex((prev) => (i + safeSlides.length) % safeSlides.length);

  return (
    <section className="relative h-[100svh] w-full overflow-hidden" aria-roledescription="carousel" aria-label="Hero slider">
      <div className="absolute inset-0">
        {safeSlides.map((s, i) => (
          <div key={i} className={`absolute inset-0 transition-opacity duration-700 ${i === index ? 'opacity-100' : 'opacity-0'}`} aria-hidden={i !== index}>
            <Image src={s.src} alt={s.alt} fill priority sizes="100vw" className="object-cover" />
          </div>
        ))}
      </div>
      <div className="absolute inset-0 bg-black/40" aria-hidden />
      <div className="relative z-10 h-full flex items-center">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-2xl text-white">
            <h1 className="text-4xl sm:text-6xl font-bold">IEEE BPDC</h1>
            <p className="mt-4 text-lg sm:text-xl text-white/90">Workshops, mentorship, networking, and more.</p>
            <div className="mt-6 flex gap-3">
              <a href="/events" className="inline-flex items-center justify-center px-5 py-2.5 rounded-md bg-ieee-500 text-white hover:bg-ieee-700 transition-colors">Join / Events</a>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute inset-x-0 bottom-6 flex items-center justify-center gap-3" aria-label="Slide controls">
        <button onClick={() => go(index - 1)} className="h-10 w-10 rounded-full bg-white/90 hover:bg-white text-[#071428]" aria-label="Previous slide">‹</button>
        <div className="flex items-center gap-2" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
          {safeSlides.map((_, i) => (
            <button key={i} aria-label={`Go to slide ${i + 1}`} onClick={() => go(i)} className={`h-2.5 w-2.5 rounded-full ${i === index ? 'bg-white' : 'bg-white/50'}`} />
          ))}
        </div>
        <button onClick={() => go(index + 1)} className="h-10 w-10 rounded-full bg-white/90 hover:bg-white text-[#071428]" aria-label="Next slide">›</button>
      </div>
      <div className="sr-only" aria-live="polite">Slide {index + 1} of {safeSlides.length}</div>
    </section>
  );
}
