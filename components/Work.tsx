"use client";

import { motion } from "framer-motion";
import { projects } from "@/lib/data";
import { type WorkItems } from "@/providers/sanityProvider";
import Link from "next/link";
import { useHomepage } from "@/providers/sanityProvider";
import PortableTextEditor from "./global/portable-text-editor";

export default function Work() {
  const data = useHomepage();
  return (
    <section id="work" className="px-6 md:px-10 py-28 md:py-36">
      <div className="max-w-[1400px] mx-auto">
        <div className="flex items-end justify-between mb-16 md:mb-20">
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="font-display mb-5"
            >
              <span className="text-4xl md:text-6xl tracking-tight">
                {data?.workHeading}
              </span>{" "}
            </motion.h2>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="w-full md:max-w-2/3"
            >
              <PortableTextEditor value={data?.workContent as any} />
            </motion.div>
            {/* <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="mt-10"
            >
              <Link
                className="font-sm border hairline p-4 hover:bg-accent transition-all font-bold"
                href=""
              >
                View Full Work
              </Link>
            </motion.div> */}
          </div>
          <span className="eyebrow hidden md:block">
            {String(projects.length - 1).padStart(2, "0")} projects
          </span>
        </div>
        {data && data.workItems && (
          <div>
            {data.workItems.map((p: WorkItems, i: number) => (
              <motion.a
                key={p.title}
                href={p.url}
                target="_blank"
                data-cursor-hover
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{
                  duration: 0.7,
                  delay: i * 0.05,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="group relative grid grid-cols-1 md:grid-cols-12 items-center gap-4 md:gap-8 border-t hairline py-8 md:py-10 last:border-b"
              >
                <span className="eyebrow md:col-span-1">0{i + 1}</span>

                <div className="md:col-span-6 flex items-center gap-4">
                  <h3 className="font-display text-3xl md:text-5xl tracking-tight transition-colors group-hover:text-accent">
                    {p.title}
                  </h3>
                </div>
                {p.tech && p.tech.length > 0 && (
                  <div className="md:col-span-3 flex flex-wrap gap-x-2 gap-y-1 text-ink-dim text-sm font-body">
                    {p.tech.map((t) => (
                      <span
                        key={t.title}
                        className="after:content-['·'] last:after:content-none after:ml-2"
                      >
                        {t.title}
                      </span>
                    ))}
                  </div>
                )}
                <div className="md:col-span-2 flex items-center justify-between md:justify-end gap-4">
                  <span className="text-ink-dim text-sm font-mono">
                    {p.year}
                  </span>
                  <span
                    aria-hidden="true"
                    className="flex h-9 w-9 items-center justify-center rounded-full border hairline text-ink-dim transition-all group-hover:border-accent group-hover:text-accent group-hover:rotate-45"
                  >
                    ↗
                  </span>
                </div>

                <p className="md:col-span-12 md:col-start-2 md:-mt-2 max-w-xl text-ink-dim text-sm md:text-base font-body">
                  {p.content}
                </p>
              </motion.a>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
