import { NextRequest } from "next/server";
import { readJson, writeJson, ensureUploadDir } from "@/lib/fsDb";
import { ContactSubmission } from "@/types";
import { promises as fs } from "fs";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  const contentType = req.headers.get("content-type") || "";
  const all = await readJson<ContactSubmission[]>("contact.json", []);

  if (contentType.includes("multipart/form-data")) {
    const form = await req.formData();
    const name = String(form.get("name") || "");
    const email = String(form.get("email") || "");
    const subject = String(form.get("subject") || "");
    const message = String(form.get("message") || "");
    const consent = String(form.get("consent") || "") !== "";
    if (!name || !email || !message || !consent) return new Response("Missing fields", { status: 400 });

    let stored: string | null = null;
    const file = form.get("file");
    if (file && file instanceof File) {
      const dir = await ensureUploadDir("contact");
      const fileName = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.\-]/g, "")}`;
      const buf = Buffer.from(await file.arrayBuffer());
      await fs.writeFile(`${dir}/${fileName}`, buf);
      stored = `/uploads/contact/${fileName}`;
    }

    const item: ContactSubmission = {
      id: crypto.randomUUID(),
      name,
      email,
      subject,
      message,
      file: stored,
      consent,
      createdAt: new Date().toISOString(),
    };
    all.push(item);
    await writeJson("contact.json", all);
    return Response.json({ ok: true });
  }

  return new Response("Unsupported content type", { status: 415 });
}
