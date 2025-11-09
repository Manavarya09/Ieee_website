"use client";
import { useState } from "react";

export default function ContactPage() {
  const [status, setStatus] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const res = await fetch("/api/contact", { method: "POST", body: data });
    if (res.ok) {
      setStatus("Thanks for reaching out! We'll get back to you soon.");
      form.reset();
    } else {
      setStatus("Something went wrong. Please try again.");
    }
  }

  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-4xl font-extrabold mb-8 text-center text-ieee-500">Contact Us</h1>

      <form onSubmit={onSubmit} className="space-y-6 bg-white dark:bg-[#071428] p-8 rounded-xl shadow-lg" aria-describedby="form-status">
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Name</label>
            <input
              required
              name="name"
              placeholder="Your full name"
              className="mt-1 w-full px-4 py-2 rounded-lg border border-black/10 dark:border-white/20 bg-white dark:bg-[#0f1b36] focus:outline-none focus:ring-2 focus:ring-ieee-500 transition"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              required
              type="email"
              name="email"
              placeholder="you@example.com"
              className="mt-1 w-full px-4 py-2 rounded-lg border border-black/10 dark:border-white/20 bg-white dark:bg-[#0f1b36] focus:outline-none focus:ring-2 focus:ring-ieee-500 transition"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Subject</label>
          <select
            name="subject"
            className="mt-1 w-full px-4 py-2 rounded-lg border border-black/10 dark:border-white/20 bg-white dark:bg-[#0f1b36] focus:outline-none focus:ring-2 focus:ring-ieee-500 transition"
          >
            <option>General</option>
            <option>Collaboration</option>
            <option>Events</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Message</label>
          <textarea
            required
            name="message"
            rows={5}
            placeholder="Write your message here..."
            className="mt-1 w-full px-4 py-2 rounded-lg border border-black/10 dark:border-white/20 bg-white dark:bg-[#0f1b36] focus:outline-none focus:ring-2 focus:ring-ieee-500 transition"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Attachment (optional)</label>
          <input type="file" name="file" className="mt-1 w-full text-sm text-black/70 dark:text-white/70" />
        </div>

        <div className="flex items-center gap-2">
          <input required id="consent" type="checkbox" name="consent" className="h-4 w-4 rounded border-gray-300 focus:ring-ieee-500" />
          <label htmlFor="consent" className="text-sm text-black/80 dark:text-white/80">
            I consent to be contacted for this message.
          </label>
        </div>

        <button className="w-full px-6 py-3 rounded-lg bg-ieee-500 text-white font-medium hover:bg-ieee-600 transition">
          Send Message
        </button>

        {status && <p id="form-status" className="mt-2 text-center text-sm text-green-500">{status}</p>}
      </form>

      {/* Contact Info & Map */}
      <div className="mt-12 grid md:grid-cols-2 gap-8">
        <iframe
          title="BPDC map"
          className="w-full h-64 rounded-xl border border-black/10 dark:border-white/20 shadow-sm"
         src="https://www.openstreetmap.org/export/embed.html?bbox=55.41898%2C25.13133%2C55.41898%2C25.13133&amp;layer=mapnik"

        ></iframe>

        <div className="flex flex-col justify-center space-y-4">
          <div>
            <h3 className="text-lg font-semibold text-ieee-500">Office Hours</h3>
            <p className="text-sm text-black/70 dark:text-white/70">Mon–Fri, 10:00–16:00</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-ieee-500">Contact</h3>
            <p className="text-sm text-black/70 dark:text-white/70">Email: ieee@bpdc.edu</p>
            <p className="text-sm text-black/70 dark:text-white/70">Phone: +971-000-0000</p>
          </div>
        </div>
      </div>
    </div>
  );
}
