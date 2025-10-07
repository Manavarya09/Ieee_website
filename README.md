# IEEE BPDC Website (Next.js + TS + Tailwind v4)

Modern, responsive chapter website with hero slider, morphing navbar, events (bento), team, gallery, contact, theme switcher, and minimal admin to add events.

## Quick start

- Dev: npm run dev
- Build: npm run build && npm start

## Theme & design
- Colors defined via Tailwind v4 @theme tokens in src/app/globals.css with IEEE palette.
- Theme options: Light / Dark / System (stored in localStorage, system fallback). Toggle in navbar.

## Project structure
- src/components/* (NavBar, HeroSlider, MagicBentoEvents, ChromaGridTeam, FolderGallery, FacultyPortrait, Footer)
- src/app/* pages (/, /events, /events/[slug], /team, /gallery, /contact, /admin)
- src/app/api/* routes (events, admin events, contact)
- src/data/*.json seed data (events, team, gallery)
- public/uploads for images (created at runtime)

## Admin (MVP)
- Protected by bearer token: set env ADMIN_TOKEN.
- Create/Update/Delete events with cover + gallery uploads.
- Client sends Authorization: Bearer <token>.

Set the token at runtime:
- Click [Open Settings](#open-settings), then set environment variable ADMIN_TOKEN (or use the dev server env control).

## API endpoints
- GET /api/events?q=&type=&page=&pageSize=
- GET /api/events/[slug]
- POST /api/admin/events (Bearer)
- PUT /api/admin/events/:id (Bearer)
- DELETE /api/admin/events/:id (Bearer)
- POST /api/contact (multipart)

## Suggested shadcn/ui additions (optional)
If you prefer shadcn/ui components, run locally:
```
npx shadcn@latest add
npx shadcn@latest add https://ui.devsloka.in/r/morphing-nav.json
npx shadcn@latest add https://reactbits.dev/r/MagicBento-TS-TW
npx shadcn@latest add https://reactbits.dev/r/ChromaGrid-TS-TW
npx shadcn@latest add https://reactbits.dev/r/Folder-TS-TW
```
Then swap our minimal components with the generated ones.

## Deployment
- Works on Vercel, Netlify, etc. Ensure ADMIN_TOKEN is set in project env.
- For production uploads, use S3 or similar with signed uploads.

## Seed data
- Edit JSON in src/data to update demo events/team/gallery.

## Notes
- Images are expected under public/uploads; replace demo paths with real images.
- Accessibility: aria-live on hero, labels on forms, semantic headings.
