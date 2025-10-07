"use client";
import Image from "next/image";
import { useState } from "react";
import { TeamMember } from "@/types";

export default function ChromaGridTeam({ team }: { team: TeamMember[] }) {
  const [active, setActive] = useState<TeamMember | null>(null);
  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
      <h2 className="text-2xl font-semibold mb-6">Our team</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {team.map((m) => (
          <button key={m.id} className="group relative overflow-hidden rounded-xl border border-black/5 dark:border-white/10 bg-white dark:bg-[#071428]" onClick={() => setActive(m)}>
            <div className="relative h-48">
              <Image src={m.photo} alt={m.name} fill sizes="(max-width: 1024px) 50vw, 25vw" className="object-cover" />
            </div>
            <div className="p-3 text-left">
              <div className="font-semibold">{m.name}</div>
              <div className="text-sm text-black/60 dark:text-white/70">{m.role}</div>
            </div>
          </button>
        ))}
      </div>
      {active && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4" role="dialog" aria-modal="true" onClick={() => setActive(null)}>
          <div className="max-w-lg w-full rounded-xl bg-white dark:bg-[#071428] p-4" onClick={(e) => e.stopPropagation()}>
            <div className="flex gap-4">
              <div className="relative h-28 w-28 shrink-0 rounded overflow-hidden">
                <Image src={active.photo} alt={active.name} fill className="object-cover" />
              </div>
              <div>
                <h3 className="text-xl font-semibold">{active.name}</h3>
                <div className="text-sm text-black/60 dark:text-white/70">{active.role}</div>
                {active.bio && <p className="mt-2 text-sm">{active.bio}</p>}
                <div className="mt-3 flex gap-3 text-sm">
                  {active.socials?.linkedin && <a className="hover:text-ieee-500" href={active.socials.linkedin}>LinkedIn</a>}
                  {active.socials?.github && <a className="hover:text-ieee-500" href={active.socials.github}>GitHub</a>}
                  {active.socials?.x && <a className="hover:text-ieee-500" href={active.socials.x}>X</a>}
                  {active.socials?.website && <a className="hover:text-ieee-500" href={active.socials.website}>Website</a>}
                </div>
              </div>
            </div>
            <div className="mt-4 text-right">
              <button className="px-4 py-2 rounded border border-black/10 dark:border-white/15 hover:bg-black/5 dark:hover:bg-white/10" onClick={() => setActive(null)}>Close</button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
