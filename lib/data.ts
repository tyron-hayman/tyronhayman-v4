export const profile = {
  name: "Alex Rivers",
  role: "Creative Developer",
  location: "Based in Lisbon, PT",
  status: "Available for freelance — Q1 2027",
  email: "hello@alexrivers.dev",
  bio: "I'm a creative developer who builds interfaces that feel like they were made by hand — motion, type, and code treated as one material. Over the last seven years I've worked with agencies and product teams to ship sites that hold up under scroll, scrutiny, and slow wifi.",
  social: [
    { label: "GitHub", href: "https://github.com" },
    { label: "LinkedIn", href: "https://linkedin.com" },
    { label: "Twitter / X", href: "https://twitter.com" },
    { label: "Dribbble", href: "https://dribbble.com" },
  ],
};

export const stats = [
  { value: "07", label: "Years building on the web" },
  { value: "32", label: "Shipped client projects" },
  { value: "05", label: "Awwwards & CSSDA nods" },
];

export const skills = [
  "React",
  "Next.js",
  "TypeScript",
  "WebGL",
  "GSAP",
  "Three.js",
  "Framer Motion",
  "Node.js",
  "Shaders",
  "Figma",
];

export type Project = {
  index: string;
  title: string;
  year: string;
  role: string;
  tags: string[];
  description: string;
  href: string;
};

export const projects: Project[] = [
  {
    index: "01",
    title: "Vantage Studio",
    year: "2026",
    role: "Design & Development",
    tags: ["Next.js", "WebGL", "GSAP"],
    description:
      "A parallax-driven site for a design studio, built around a custom WebGL image-distortion transition between case studies.",
    href: "#",
  },
  {
    index: "02",
    title: "Ferrous Type Foundry",
    year: "2025",
    role: "Front-end Development",
    tags: ["Three.js", "Shaders", "SCSS"],
    description:
      "An interactive specimen book for an independent type foundry, rendering live glyph previews inside a 3D scene.",
    href: "#",
  },
  {
    index: "03",
    title: "Northline Ventures",
    year: "2025",
    role: "Design & Development",
    tags: ["Next.js", "Framer Motion", "Sanity"],
    description:
      "Marketing site and CMS for a venture fund, with a scroll-choreographed portfolio wall and editorial blog.",
    href: "#",
  },
  {
    index: "04",
    title: "Alta — Booking Engine",
    year: "2024",
    role: "Full-stack Development",
    tags: ["TypeScript", "Node.js", "Postgres"],
    description:
      "A booking flow rebuilt from the ground up for a boutique hotel group, cutting checkout time by 40%.",
    href: "#",
  },
];
