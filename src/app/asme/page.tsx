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
      setStatus("Thanks for reaching out! We'll get back soon.");
      form.reset();
    } else {
      setStatus("Something went wrong. Try again.");
    }
  }

  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-semibold mb-6">Contact us</h1>
      <form onSubmit={onSubmit} className="space-y-4" aria-describedby="form-status">
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium">Name</label>
            <input required name="name" className="mt-1 w-full px-3 py-2 rounded-md border border-black/10 dark:border-white/15 bg-white dark:bg-[#071428]" />
          </div>
          <div>
            <label className="block text-sm font-medium">Email</label>
            <input required type="email" name="email" className="mt-1 w-full px-3 py-2 rounded-md border border-black/10 dark:border-white/15 bg-white dark:bg-[#071428]" />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium">Subject</label>
          <select name="subject" className="mt-1 w-full px-3 py-2 rounded-md border border-black/10 dark:border-white/15 bg-white dark:bg-[#071428]">
            <option>General</option>
            <option>Collaboration</option>
            <option>Events</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium">Message</label>
          <textarea required name="message" rows={5} className="mt-1 w-full px-3 py-2 rounded-md border border-black/10 dark:border-white/15 bg-white dark:bg-[#071428]" />
        </div>
        <div>
          <label className="block text-sm font-medium">Attachment (optional)</label>
          <input type="file" name="file" className="mt-1 w-full" />
        </div>
        <div className="flex items-center gap-2">
          <input required id="consent" type="checkbox" name="consent" />
          <label htmlFor="consent" className="text-sm">I consent to be contacted for this message.</label>
        </div>
        <button className="px-5 py-2.5 rounded-md bg-ieee-500 text-white">Send</button>
        {status && <p id="form-status" className="text-sm">{status}</p>}
      </form>
      <div className="mt-10 grid gap-4">
        <iframe title="BPDC map" className="w-full h-64 rounded-md border border-black/10 dark:border-white/15" src="https://www.openstreetmap.org/export/embed.html?bbox=55.15%2C25.09%2C55.30%2C25.25&amp;layer=mapnik"></iframe>
        <div>
          <div className="font-medium">Office hours</div>
          <div className="text-sm text-black/70 dark:text-white/70">Mon–Fri, 10:00–16:00</div>
          <div className="text-sm">Email: ieee@bpdc.edu · Phone: +971-000-0000</div>
        </div>
      </div>
    </div>
  );
}
