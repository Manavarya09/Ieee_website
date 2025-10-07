"use client";
import { useEffect, useMemo, useState } from "react";
import { EventItem } from "@/types";

export default function AdminPage() {
  const [token, setToken] = useState("");
  const [events, setEvents] = useState<EventItem[]>([]);
  const [form, setForm] = useState<any>({ title: "", slug: "", date: "", category: "Workshop", short: "", description: "", featured: false });
  const [cover, setCover] = useState<File | null>(null);
  const [gallery, setGallery] = useState<FileList | null>(null);

  async function load() {
    const res = await fetch("/api/events");
    setEvents(await res.json());
  }
  useEffect(() => { load(); }, []);

  function reset() {
    setForm({ title: "", slug: "", date: "", category: "Workshop", short: "", description: "", featured: false });
    setCover(null);
    setGallery(null);
  }

  async function createOrUpdate(e?: React.FormEvent) {
    if (e) e.preventDefault();
    const body = new FormData();
    for (const [k, v] of Object.entries(form)) body.append(k, String(v));
    if (cover) body.append("cover", cover);
    if (gallery) Array.from(gallery).forEach((f) => body.append("gallery", f));
    const method = form.id ? "PUT" : "POST";
    const url = form.id ? `/api/admin/events/${form.id}` : "/api/admin/events";
    const res = await fetch(url, { method, headers: { Authorization: `Bearer ${token}` }, body });
    if (res.ok) { reset(); await load(); alert("Saved"); } else { alert("Failed: check token and fields"); }
  }

  async function edit(ev: EventItem) {
    setForm({ ...ev });
  }

  async function del(id: string) {
    if (!confirm("Delete event?")) return;
    const res = await fetch(`/api/admin/events/${id}`, { method: "DELETE", headers: { Authorization: `Bearer ${token}` } });
    if (res.ok) { await load(); } else { alert("Delete failed"); }
  }

  const preview = useMemo(() => form as Partial<EventItem>, [form]);

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-semibold mb-4">Admin</h1>
      <p className="text-sm text-black/70 dark:text-white/70 mb-6">Enter admin token to manage events. Not linked in navigation.</p>
      <div className="mb-6">
        <input type="password" placeholder="Admin token" value={token} onChange={(e) => setToken(e.target.value)} className="w-full sm:w-80 px-3 py-2 rounded-md border border-black/10 dark:border-white/15 bg-white dark:bg-[#071428]" />
      </div>
      <div className="grid md:grid-cols-2 gap-8">
        <form onSubmit={createOrUpdate} className="space-y-3">
          <div className="grid sm:grid-cols-2 gap-3">
            <div><label className="block text-sm">Title</label><input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="mt-1 w-full px-3 py-2 rounded-md border border-black/10 dark:border-white/15 bg-white dark:bg-[#071428]" required /></div>
            <div><label className="block text-sm">Slug</label><input value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} className="mt-1 w-full px-3 py-2 rounded-md border border-black/10 dark:border-white/15 bg-white dark:bg-[#071428]" required /></div>
          </div>
          <div className="grid sm:grid-cols-2 gap-3">
            <div><label className="block text-sm">Date/time</label><input type="datetime-local" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} className="mt-1 w-full px-3 py-2 rounded-md border border-black/10 dark:border-white/15 bg-white dark:bg-[#071428]" required /></div>
            <div><label className="block text-sm">Category</label><select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="mt-1 w-full px-3 py-2 rounded-md border border-black/10 dark:border-white/15 bg-white dark:bg-[#071428]">
              <option>Workshop</option><option>Talk</option><option>Hackathon</option><option>Other</option>
            </select></div>
          </div>
          <div><label className="block text-sm">Short description</label><input value={form.short} onChange={(e) => setForm({ ...form, short: e.target.value })} className="mt-1 w-full px-3 py-2 rounded-md border border-black/10 dark:border-white/15 bg-white dark:bg-[#071428]" required /></div>
          <div><label className="block text-sm">Full description (HTML or markdown)</label><textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={6} className="mt-1 w-full px-3 py-2 rounded-md border border-black/10 dark:border-white/15 bg-white dark:bg-[#071428]" required /></div>
          <div className="grid sm:grid-cols-2 gap-3">
            <div><label className="block text-sm">Cover image</label><input type="file" onChange={(e) => setCover(e.target.files?.[0] ?? null)} /></div>
            <div><label className="block text-sm">Gallery images</label><input type="file" multiple onChange={(e) => setGallery(e.target.files)} /></div>
          </div>
          <label className="inline-flex items-center gap-2 text-sm"><input type="checkbox" checked={!!form.featured} onChange={(e) => setForm({ ...form, featured: e.target.checked })} /> Featured</label>
          <div className="flex gap-3">
            <button type="submit" className="px-4 py-2 rounded-md bg-ieee-500 text-white">{form.id ? "Update" : "Create"}</button>
            {form.id && <button type="button" className="px-4 py-2 rounded-md border border-black/10 dark:border-white/15" onClick={reset}>Clear</button>}
          </div>
        </form>
        <div>
          <div className="font-semibold mb-2">Preview</div>
          <div className="text-sm text-black/70 dark:text-white/70">{preview.title || "Title"} · {preview.category || "Category"} · {preview.date || "Date"}</div>
          <div className="mt-6">
            <div className="font-semibold mb-2">Existing events</div>
            <ul className="space-y-2">
              {events.map((e) => (
                <li key={e.id} className="flex items-center justify-between p-3 rounded-md border border-black/5 dark:border-white/10">
                  <div className="text-sm"><span className="font-medium">{e.title}</span> <span className="text-black/60 dark:text-white/70">({e.category})</span></div>
                  <div className="flex gap-2">
                    <button className="px-2 py-1 rounded border border-black/10 dark:border-white/15" onClick={() => edit(e)}>Edit</button>
                    <button className="px-2 py-1 rounded bg-red-600 text-white" onClick={() => del(e.id)}>Delete</button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
