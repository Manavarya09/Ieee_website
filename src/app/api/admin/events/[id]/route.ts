import { NextRequest } from "next/server";
import { readJson, writeJson, ensureUploadDir } from "@/lib/fsDb";
import { EventItem } from "@/types";
import { promises as fs } from "fs";

function assertAuth(req: NextRequest) {
  const auth = req.headers.get("authorization") || "";
  const token = auth.startsWith("Bearer ") ? auth.slice(7) : "";
  if (!process.env.ADMIN_TOKEN || token !== process.env.ADMIN_TOKEN) {
    return false;
  }
  return true;
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  if (!assertAuth(req)) return new Response("Unauthorized", { status: 401 });
  const all = await readJson<EventItem[]>("events.json", []);
  const idx = all.findIndex((e) => e.id === params.id);
  if (idx === -1) return new Response("Not found", { status: 404 });

  const contentType = req.headers.get("content-type") || "";
  if (contentType.includes("multipart/form-data")) {
    const form = await req.formData();
    const fields = Object.fromEntries(form.entries());
    const cur = all[idx];
    if (fields.title) cur.title = String(fields.title);
    if (fields.slug) cur.slug = String(fields.slug);
    if (fields.date) cur.date = new Date(String(fields.date)).toISOString();
    if (fields.category) cur.category = String(fields.category) as any;
    if (fields.short) cur.short = String(fields.short);
    if (fields.description) cur.description = String(fields.description);
    if (fields.featured) cur.featured = String(fields.featured) === "true";

    const cover = form.get("cover");
    if (cover && cover instanceof File) {
      const dir = await ensureUploadDir("covers");
      const fileName = `${Date.now()}-${cover.name.replace(/[^a-zA-Z0-9.\-]/g, "")}`;
      const buf = Buffer.from(await cover.arrayBuffer());
      await fs.writeFile(`${dir}/${fileName}`, buf);
      cur.coverImage = `/uploads/covers/${fileName}`;
    }

    const galleryFiles = form.getAll("gallery").filter((g): g is File => g instanceof File);
    if (galleryFiles.length) {
      const dir = await ensureUploadDir("events");
      for (const g of galleryFiles) {
        const fileName = `${Date.now()}-${g.name.replace(/[^a-zA-Z0-9.\-]/g, "")}`;
        const buf = Buffer.from(await g.arrayBuffer());
        await fs.writeFile(`${dir}/${fileName}`, buf);
        cur.gallery.push(`/uploads/events/${fileName}`);
      }
    }

    all[idx] = cur;
    await writeJson("events.json", all);
    return Response.json(cur);
  }

  const json = await req.json().catch(() => null);
  if (!json) return new Response("Bad request", { status: 400 });
  const updated = { ...all[idx], ...json } as EventItem;
  all[idx] = updated;
  await writeJson("events.json", all);
  return Response.json(updated);
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  if (!assertAuth(req)) return new Response("Unauthorized", { status: 401 });
  const all = await readJson<EventItem[]>("events.json", []);
  const next = all.filter((e) => e.id !== params.id);
  await writeJson("events.json", next);
  return new Response(null, { status: 204 });
}
