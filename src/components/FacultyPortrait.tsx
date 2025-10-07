import Image from "next/image";

export default function FacultyPortrait() {
  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 grid md:grid-cols-2 gap-8 items-center">
      <div>
        <h2 className="text-2xl font-semibold mb-3">Welcome from our Faculty-in-charge</h2>
        <p className="text-black/80 dark:text-white/80">We are excited to welcome you to IEEE BPDC. Our chapter focuses on hands-on learning through workshops, mentorship, and collaborations with industry and academia.</p>
      </div>
      <div className="relative h-72 md:h-96 rounded-xl overflow-hidden border border-black/5 dark:border-white/10">
        <Image src="/uploads/faculty.jpg" alt="Faculty in charge portrait" fill className="object-cover" />
      </div>
    </section>
  );
}
