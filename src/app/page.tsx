import { FaChalkboardTeacher, FaUserGraduate, FaUsers, FaCertificate } from "react-icons/fa";
import HeroSlider from "@/components/HeroSlider";
import MagicBentoEvents from "@/components/MagicBentoEvents";
import FacultyPortrait from "@/components/FacultyPortrait";
import { readJson } from "@/lib/fsDb";
import { EventItem } from "@/types";

export const dynamic = "force-dynamic";

export default async function Home() {
  const slides = [
    { src: "/uploads/hero/1.jpg", alt: "Students collaborating at an IEEE workshop" },
    { src: "/uploads/hero/2.jpg", alt: "Speaker giving a talk" },
    { src: "/uploads/hero/3.jpg", alt: "Hackathon teams at work" },
  ];
  const events = await readJson<EventItem[]>("events.json", []);
  const featured = events.filter((e) => e.featured);

  const cards = [
    { t: "Workshops", d: "Hands-on sessions to learn by doing", icon: FaChalkboardTeacher },
    { t: "Mentorship", d: "Guidance from seniors and alumni", icon: FaUserGraduate },
    { t: "Networking", d: "Connect with peers and industry", icon: FaUsers },
    { t: "Certifications", d: "Boost your profile", icon: FaCertificate },
  ];

  return (
    <div>
      <HeroSlider slides={slides} />
      <MagicBentoEvents events={featured} />

      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-2xl font-semibold mb-6">Why join IEEE BPDC</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {cards.map((c) => {
            const Icon = c.icon;
            return (
              <div key={c.t} className="rounded-xl border border-black/5 dark:border-white/10 p-5 bg-white dark:bg-[#071428] flex flex-col items-center text-center">
                <div className="h-12 w-12 mb-3 flex items-center justify-center rounded-full bg-ieee-100 dark:bg-ieee-300/30 text-ieee-200">
                  <Icon className="h-6 w-6" />
                </div>
                <div className="font-semibold">{c.t}</div>
                <p className="text-sm text-black/70 dark:text-white/70">{c.d}</p>
              </div>
            );
          })}
        </div>
      </section>

      <FacultyPortrait />
    </div>
  );
}
