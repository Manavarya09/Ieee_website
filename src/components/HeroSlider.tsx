"use client";

import Image from "next/image";
import { useEffect, useState, useMemo, useRef } from "react";

interface Slide {
  src: string;
  alt: string;
}

export default function HeroSlider({ slides }: { slides: Slide[] }) {
  const [index, setIndex] = useState(0);
  const timer = useRef<number | null>(null);

  const safeSlides = useMemo(
    () => (slides && slides.length > 0 ? slides : [{ src: "/vercel.svg", alt: "placeholder" }]),
    [slides]
  );

  // Auto carousel every 5 seconds
  useEffect(() => {
    timer.current = window.setInterval(() => {
      setIndex((i) => (i + 1) % safeSlides.length);
    }, 5000);

    return () => {
      if (timer.current) window.clearInterval(timer.current);
    };
  }, [safeSlides.length]);

  return (
    <section className="relative h-[100svh] w-full overflow-hidden" aria-roledescription="carousel" aria-label="Hero slider">
      {/* Slides */}
      <div className="absolute inset-0">
        {safeSlides.map((slide, i) => (
          <div
            key={i}
            className={`absolute inset-0 transition-opacity duration-700 ${i === index ? "opacity-100" : "opacity-0"}`}
            aria-hidden={i !== index}
          >
            <Image
              src={slide.src}
              alt={slide.alt}
              fill
              className="object-cover"
              priority
              unoptimized
            />
          </div>
        ))}
      </div>

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/40" aria-hidden />

      {/* Hero Text */}
      <div className="relative z-10 h-full flex items-center justify-center text-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <h1 className="text-4xl sm:text-6xl font-extrabold text-white leading-tight drop-shadow-lg">
            Join IEEE BPDC
          </h1>
          <p className="mt-4 text-lg sm:text-2xl text-white/90 drop-shadow-md">
            Workshops, mentorship, networking, and certifications to elevate your skills.
          </p>
        </div>
      </div>

      {/* Slide Indicators */}
      <div className="absolute inset-x-0 bottom-6 flex items-center justify-center gap-3">
        {safeSlides.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={`h-2.5 w-2.5 rounded-full transition-colors ${
              i === index ? "bg-white" : "bg-white/50"
            }`}
          />
        ))}
      </div>

      <div className="sr-only" aria-live="polite">
        Slide {index + 1} of {safeSlides.length}
      </div>
    </section>
  );
}
