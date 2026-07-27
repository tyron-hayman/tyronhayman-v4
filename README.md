# Alex Rivers — Creative Developer Portfolio

A Next.js portfolio inspired by the dark, typography-led, motion-first style of
[arlindaliu.com](https://www.arlindaliu.com/) — built with the App Router,
TypeScript, Tailwind CSS v4, and Framer Motion.

## Design system

- **Palette** — near-black background (`#0b0b0a`), warm off-white text
  (`#f3f1e9`), and a single coral/terracotta accent (`#df6c4f`) used sparingly
  for links, hover states, and the status indicator.
- **Type** — Bricolage Grotesque (display headlines), Inter (body copy),
  JetBrains Mono (eyebrows / labels / index numbers), all self-hosted via
  `@fontsource` so there's no runtime dependency on Google Fonts.
- **Signature details** — a magnetic custom cursor (dot + trailing ring that
  expands over links), a subtle film-grain overlay, a staggered letter-reveal
  hero, and a horizontal skills marquee.

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000

## Project structure

```
app/
  layout.tsx      — fonts, metadata, global cursor & grain overlay
  page.tsx        — assembles the page sections
  globals.css     — design tokens (colors, fonts) + custom cursor/grain/marquee CSS
components/
  Nav.tsx         — fixed header, mobile menu, availability status
  Hero.tsx        — animated headline + intro
  Marquee.tsx     — scrolling skills strip
  Work.tsx        — selected work list
  About.tsx       — bio + stats
  Contact.tsx     — closing CTA + footer
  CustomCursor.tsx, Grain.tsx
lib/
  data.ts         — all editable content (name, bio, projects, skills, links)
```

## Making it yours

Everything you'll want to change lives in `lib/data.ts`:

- `profile` — your name, role, location, one-line bio, email, and social links.
- `stats` — the three numbers shown in the About section.
- `skills` — the tools/technologies in the marquee.
- `projects` — your case studies (title, year, role, tags, description, link).

To add real project imagery, drop images in `public/img/` and reference them
inside `components/Work.tsx`.

## Notes

- Motion respects `prefers-reduced-motion`.
- The custom cursor automatically disables itself on touch devices and small
  screens, falling back to the system cursor.
- Elements with `data-cursor-hover` trigger the cursor's "expand" state — add
  this attribute to any new interactive element you introduce.
