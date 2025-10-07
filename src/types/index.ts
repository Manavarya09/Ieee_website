export type EventCategory = "Workshop" | "Talk" | "Hackathon" | "Other";

export interface EventItem {
  id: string;
  title: string;
  slug: string;
  date: string; // ISO
  category: EventCategory;
  short: string;
  description: string; // HTML or markdown
  coverImage: string; // public path
  gallery: string[];
  featured: boolean;
  createdAt: string; // ISO
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  photo: string;
  socials?: { x?: string; linkedin?: string; github?: string; website?: string };
  bio?: string;
}

export interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  file?: string | null; // stored path
  consent: boolean;
  createdAt: string; // ISO
}
