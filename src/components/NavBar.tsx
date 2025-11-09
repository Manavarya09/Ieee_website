"use client";
import Image from 'next/image';
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
// import ThemeToggle from "./ThemeToggle"; // Temporarily commented out

// Navigation links array
const NAV = [
  { href: "/", label: "Home" },
  { href: "/asme", label: "ASME" },
  { href: "/team", label: "Our team" },
  { href: "/events", label: "Events" },
  { href: "/contact", label: "Contact" },
];

// Navbar component
export default function NavBar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const highlightRef = useRef<HTMLDivElement>(null);

  // Active page highlight logic
  useEffect(() => {
    const activeIndex = NAV.findIndex(
      (n) => n.href === (pathname === "/" ? "/" : `/${pathname.split("/")[1]}`)
    );
    const container = containerRef.current;
    const highlight = highlightRef.current;
    if (!container || !highlight) return;

    const items = Array.from(container.querySelectorAll<HTMLAnchorElement>("a[data-nav]"));
    const el = items[activeIndex] ?? null;
    if (el) {
      highlight.style.opacity = "1";
      highlight.style.transform = `translateX(${el.offsetLeft}px)`;
      highlight.style.width = `${el.offsetWidth}px`;
    } else {
      highlight.style.opacity = "0";
    }
  }, [pathname]);

  return (
    <header className="sticky top-0 z-50 backdrop-blur bg-white/90 dark:bg-[#071428]/90 border-b border-black/10 dark:border-white/10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 select-none">
          <Image
            src="/IEEEBPDC.png"
            alt="IEEE BPDC Logo"
            width={36}
            height={36}
            className="rounded-full object-cover"
          />
          <span className="font-bold text-lg tracking-wide">
            IEEE <span className="text-ieee-500">BPDC</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6 relative" ref={containerRef}>
          <div
  ref={highlightRef}
  className="absolute top-1/2 -translate-y-1/2 h-9 rounded-full bg-ieee-100/70 dark:bg-ieee-300/20 transition-all duration-150 ease-in-out -z-10"
  style={{ opacity: 0 }}
  aria-hidden
/>

          {NAV.map((n) => (
            <Link
              key={n.href}
              data-nav
              href={n.href}
             className="px-3 py-1 text-sm font-semibold text-gray-200 dark:text-gray-200 hover:text-blue-400 transition-colors duration-200"

            >
              {n.label}
            </Link>
          ))}

          {/* <ThemeToggle /> */}
        </nav>

        {/* Mobile Hamburger */}
        <button
          aria-label="Menu"
          className="md:hidden inline-flex items-center justify-center h-10 w-10 rounded-md border border-black/10 dark:border-white/15"
          onClick={() => setOpen((v) => !v)}
        >
          <span className="sr-only">Open menu</span>
          <div className="h-4 w-4 grid gap-0.5">
            <span className="block h-0.5 bg-current" />
            <span className="block h-0.5 bg-current" />
            <span className="block h-0.5 bg-current" />
          </div>
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden border-t border-black/10 dark:border-white/10 bg-white dark:bg-[#071428]">
          <div className="px-4 py-3 flex flex-col gap-2">
            {NAV.map((n) => (
              <Link
                key={n.href}
                href={n.href}
                className="px-3 py-2 rounded-md hover:bg-black/5 dark:hover:bg-white/10 text-gray-700 dark:text-gray-200 transition"
                onClick={() => setOpen(false)}
              >
                {n.label}
              </Link>
            ))}
            {/* <div className="pt-2"><ThemeToggle /></div> */}
          </div>
        </div>
      )}
    </header>
  );
}
