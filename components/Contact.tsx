"use client";

import { motion } from "framer-motion";
import { profile } from "@/lib/data";
import { useSettings } from "@/providers/sanityProvider";

export default function Contact() {
  const settingsData = useSettings();
  return (
    <section
      id="contact"
      className="px-6 md:px-10 pt-28 md:pt-36 pb-10 border-t hairline"
    >
      <div className="max-w-[1400px] mx-auto">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="eyebrow mb-6"
        >
          {settingsData?.contactTextEyebrow}
        </motion.p>

        <motion.a
          href={`mailto:${settingsData?.siteEmail}`}
          data-cursor-hover
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="group block font-display font-semibold text-[11vw] md:text-[6.5vw] leading-[0.95] tracking-tight hover:text-accent transition-colors"
        >
          {settingsData?.contactText}
          <span className="inline-block group-hover:rotate-45 transition-transform ml-3 md:ml-6">
            ↗
          </span>
        </motion.a>

        <div className="mt-14 flex flex-col md:flex-row md:items-center md:justify-between gap-6 pt-8 border-t hairline">
          <a
            href={`mailto:${settingsData?.siteEmail}`}
            data-cursor-hover
            className="font-body text-ink-dim hover:text-accent transition-colors"
          >
            {settingsData?.siteEmail}
          </a>
          {settingsData && settingsData?.socials && (
            <div className="flex flex-wrap gap-x-6 gap-y-2">
              {settingsData.socials.map((s) => (
                <a
                  key={s.title}
                  href={s.url}
                  target="_blank"
                  rel="noreferrer"
                  data-cursor-hover
                  className="eyebrow hover:text-accent transition-colors"
                >
                  {s.title}
                </a>
              ))}
            </div>
          )}
        </div>

        <div className="mt-10 flex flex-col md:flex-row md:items-center md:justify-between gap-2 text-ink-dim text-xs font-mono">
          <span>
            © {new Date().getFullYear()} {settingsData?.siteTitle}
          </span>
          <span>{settingsData?.footerText}</span>
        </div>
      </div>
    </section>
  );
}
