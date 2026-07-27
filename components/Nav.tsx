"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { profile } from "@/lib/data";
import { useSettings } from "@/providers/sanityProvider";

const links = [
  { label: "Work", href: "work" },
  { label: "About", href: "about" },
  { label: "Contact", href: "contact" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);
  const settingsData = useSettings();
  const [baseUrl, setBaseUrl] = useState("");

  useEffect(() => {
    setBaseUrl(window.location.origin);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b hairline bg-bg/80 backdrop-blur-sm">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10 h-16 md:h-20 flex items-center justify-between">
        <a
          href="#top"
          data-cursor-hover
          className="font-display text-sm md:text-base tracking-tight text-ink"
        >
          {settingsData?.siteTitle}
        </a>

        <nav className="hidden md:flex items-center gap-10">
          {links.map((l) => (
            <a
              key={l.href}
              href={`${baseUrl}#${l.href}`}
              data-cursor-hover
              className="eyebrow hover:text-accent transition-colors"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-2" data-cursor-hover>
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-60" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-accent" />
          </span>
          <span className="eyebrow">{settingsData?.availabilityText}</span>
        </div>

        <button
          onClick={() => setOpen((v) => !v)}
          data-cursor-hover
          aria-label="Toggle menu"
          className="md:hidden flex flex-col gap-1.5 w-7"
        >
          <span
            className={`h-px w-full bg-ink transition-transform ${open ? "translate-y-[3.5px] rotate-45" : ""}`}
          />
          <span
            className={`h-px w-full bg-ink transition-transform ${open ? "-translate-y-[3.5px] -rotate-45" : ""}`}
          />
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: "auto" }}
            exit={{ height: 0 }}
            className="md:hidden overflow-hidden border-t hairline"
          >
            <div className="flex flex-col px-6 py-6 gap-5">
              {links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="font-display text-2xl"
                >
                  {l.label}
                </a>
              ))}
              <span className="eyebrow pt-2">
                {settingsData?.availabilityText}
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
