"use client";

import { motion } from "framer-motion";
import { profile } from "@/lib/data";
import { type HomePage } from "@/providers/sanityProvider";
import { useEffect, useState } from "react";
import PortableTextEditor from "./global/portable-text-editor";

const line1 = "Creative".split("");
const line2 = "developer.".split("");

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.035, delayChildren: 0.15 },
  },
};

const char = {
  hidden: { y: "110%" },
  show: {
    y: "0%",
    transition: { duration: 0.75, ease: [0.16, 1, 0.3, 1] as const },
  },
};

export default function Hero({ data }: { data: HomePage | null }) {
  const [heading, setHeading] = useState<{
    line1: string;
    line2: string;
  } | null>(null);

  useEffect(() => {
    const BreakeText = (text: string) => {
      const newText = text.split(" ");
      setHeading({ line1: newText[0], line2: newText[1] });
    };
    data?.heroText && BreakeText(data?.heroText);
  }, [data]);

  return (
    <section
      id="top"
      className="relative min-h-[100svh] flex flex-col justify-end px-6 md:px-10 pb-14 pt-32 md:pt-40 overflow-hidden"
    >
      <div className="absolute inset-0 -z-10 opacity-[0.4]">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[70vw] h-[70vw] max-w-[900px] max-h-[900px] rounded-full bg-accent/10 blur-[120px]" />
      </div>

      <div className="max-w-[1400px] mx-auto w-full">
        {data?.heroEyebrow && (
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="eyebrow mb-6"
          >
            {data?.heroEyebrow}
          </motion.p>
        )}
        <h1 className="font-display font-black leading-[0.92] text-[16vw] lg:text-[10vw] tracking-tight uppercase">
          {heading && heading.line1 && (
            <motion.span
              variants={container}
              initial="hidden"
              animate="show"
              className="flex overflow-hidden"
            >
              {heading.line1.split("").map((c, i) => (
                <motion.span key={i} variants={char} className="inline-block">
                  {c === " " ? "\u00A0" : c}
                </motion.span>
              ))}
            </motion.span>
          )}
          {heading && heading.line2 && (
            <motion.span
              variants={container}
              initial="hidden"
              animate="show"
              className="flex overflow-hidden text-accent"
            >
              {heading.line2.split("").map((c, i) => (
                <motion.span key={i} variants={char} className="inline-block">
                  {c === " " ? "\u00A0" : c}
                </motion.span>
              ))}
            </motion.span>
          )}
        </h1>

        <div className="mt-10 flex flex-col md:flex-row md:items-end md:justify-between gap-8">
          {data?.heroContent && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.7 }}
              className="max-w-md [&_p]:text-lg [&_p]:font-body [&_p]:leading-relaxed"
            >
              <PortableTextEditor value={data.heroContent as any} />
            </motion.div>
          )}
          <motion.a
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.85 }}
            href="#work"
            data-cursor-hover
            className="group inline-flex items-center gap-3 self-start md:self-auto"
          >
            <span className="eyebrow group-hover:text-accent transition-colors">
              Scroll to view work
            </span>
            <span className="h-px w-10 bg-ink-dim group-hover:bg-accent group-hover:w-14 transition-all" />
          </motion.a>
        </div>
      </div>
    </section>
  );
}
