import FolderGallery from "@/components/FolderGallery";
import { readJson } from "@/lib/fsDb";

export const dynamic = "force-dynamic";

export default async function GalleryPage() {
  const items = await readJson<{ src: string; alt: string }[]>("gallery.json", []);
  return <FolderGallery items={items} />;
}
