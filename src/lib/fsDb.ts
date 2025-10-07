import { promises as fs } from "fs";
import path from "path";

const DATA_DIR = path.join(process.cwd(), "src", "data");

export async function ensureDataDir() {
  await fs.mkdir(DATA_DIR, { recursive: true });
}

export async function readJson<T>(file: string, fallback: T): Promise<T> {
  await ensureDataDir();
  const full = path.join(DATA_DIR, file);
  try {
    const raw = await fs.readFile(full, "utf-8");
    return JSON.parse(raw) as T;
  } catch (e: any) {
    if (e?.code === "ENOENT") {
      await writeJson(file, fallback);
      return fallback;
    }
    throw e;
  }
}

export async function writeJson(file: string, data: any): Promise<void> {
  await ensureDataDir();
  const full = path.join(DATA_DIR, file);
  await fs.writeFile(full, JSON.stringify(data, null, 2), "utf-8");
}

export function uploadPath(...segments: string[]) {
  return path.join(process.cwd(), "public", "uploads", ...segments);
}

export async function ensureUploadDir(...segments: string[]) {
  const dir = uploadPath(...segments);
  await fs.mkdir(dir, { recursive: true });
  return dir;
}
