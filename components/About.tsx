"use client";

import { motion } from "framer-motion";
import { stats } from "@/lib/data";
import { useHomepage } from "@/providers/sanityProvider";
import PortableTextEditor from "./global/portable-text-editor";

export default function About() {
  const data = useHomepage();
  return (
    <section
      id="about"
      className="px-6 md:px-10 py-28 md:py-36 border-t hairline"
    >
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 md:gap-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="lg:col-span-4"
        >
          <span className="eyebrow">{data?.aboutEyebrow}</span>
          <h2 className="font-display text-4xl md:text-5xl tracking-tight mt-6 leading-[1.05]">
            {data?.aboutTitle}
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="lg:col-span-5 lg:col-start-6 text-base md:text-lg leading-relaxed font-body [&_p]:mb-5"
        >
          <PortableTextEditor value={data?.aboutContent as any} />
        </motion.div>
        {data && data.aboutStats && (
          <div className="lg:col-span-3 lg:col-start-11 flex lg:flex-col gap-8 md:gap-10 flex-wrap">
            {data?.aboutStats.map((s, i) => (
              <motion.div
                key={s.value}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: 0.2 + i * 0.08 }}
              >
                <div className="font-display text-4xl text-accent">
                  {s.value} {s.valuePlus && "+"}
                </div>
                <div className="text-ink-dim text-sm font-body mt-1 max-w-[14ch]">
                  {s.content}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
