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

export async function POST(req: NextRequest) {
  if (!assertAuth(req)) return new Response("Unauthorized", { status: 401 });
  const contentType = req.headers.get("content-type") || "";
  const all = await readJson<EventItem[]>("events.json", []);

  if (contentType.includes("multipart/form-data")) {
    const form = await req.formData();
    const title = String(form.get("title") || "");
    const slug = String(form.get("slug") || "");
    const date = String(form.get("date") || "");
    const category = String(form.get("category") || "Other");
    const short = String(form.get("short") || "");
    const description = String(form.get("description") || "");
    const featured = String(form.get("featured") || "false") === "true";

    if (!title || !slug || !date || !short || !description) {
      return new Response("Missing fields", { status: 400 });
    }
    if (all.some((e) => e.slug === slug)) return new Response("Slug exists", { status: 400 });

    let coverImage = "/uploads/covers/placeholder.jpg";
    const cover = form.get("cover");
    if (cover && cover instanceof File) {
      const dir = await ensureUploadDir("covers");
      const fileName = `${Date.now()}-${cover.name.replace(/[^a-zA-Z0-9.\-]/g, "")}`;
      const buf = Buffer.from(await cover.arrayBuffer());
      await fs.writeFile(`${dir}/${fileName}`, buf);
      coverImage = `/uploads/covers/${fileName}`;
    }
    const galleryFiles = form.getAll("gallery").filter((g): g is File => g instanceof File);
    const gallery: string[] = [];
    if (galleryFiles.length) {
      const dir = await ensureUploadDir("events");
      for (const g of galleryFiles) {
        const fileName = `${Date.now()}-${g.name.replace(/[^a-zA-Z0-9.\-]/g, "")}`;
        const buf = Buffer.from(await g.arrayBuffer());
        await fs.writeFile(`${dir}/${fileName}`, buf);
        gallery.push(`/uploads/events/${fileName}`);
      }
    }

    const now = new Date().toISOString();
    const item: EventItem = {
      id: crypto.randomUUID(),
      title,
      slug,
      date: new Date(date).toISOString(),
      category: category as any,
      short,
      description,
      coverImage,
      gallery,
      featured,
      createdAt: now,
    };
    all.push(item);
    await writeJson("events.json", all);
    return Response.json(item, { status: 201 });
  }

  const json = await req.json().catch(() => null);
  if (!json) return new Response("Bad request", { status: 400 });
  if (all.some((e) => e.slug === json.slug)) return new Response("Slug exists", { status: 400 });
  const now = new Date().toISOString();
  const item: EventItem = { ...json, id: crypto.randomUUID(), createdAt: now };
  all.push(item);
  await writeJson("events.json", all);
  return Response.json(item, { status: 201 });
}
