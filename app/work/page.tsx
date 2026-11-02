"use client";
import Nav from "@/components/Nav";
import LoginFrom from "@/components/form";
import Contact from "@/components/Contact";
import { useUser } from "@/hooks/useUser";
import { Loader } from "lucide-react";
import { useWorkpage } from "@/providers/sanityProvider";
import { motion } from "framer-motion";
import PortableTextEditor from "@/components/global/portable-text-editor";
import { type WorkPageItems } from "@/providers/sanityProvider";

export default function Home() {
  const { user, loading } = useUser();
  const data = useWorkpage();
  return (
    <>
      <Nav />
      <main className="relative">
        {!user && !loading ? (
          <div className="relative py-[150px] md:py-[200px] md:py-[300px] flex items-center justify-center overflow-hidden px-6 md:px-0">
            <div className="absolute inset-0 -z-10 opacity-[0.4]">
              <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[70vw] h-[70vw] max-w-[900px] max-h-[100vh] rounded-full bg-accent/10 blur-[120px]" />
            </div>
            <LoginFrom />
          </div>
        ) : (
          <div className="relative py-[150px] md:py-[200px] md:py-[200px] px-6 md:px-0 max-w-[1400px] mx-auto">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="font-display font-black leading-[0.92] text-[16vw] lg:text-[10vw] tracking-tight uppercase text-balance mb-10"
            >
              {data?.heading ?? "Welcome!"}
            </motion.h1>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="w-full"
            >
              <PortableTextEditor value={data?.content as any} />
            </motion.div>
            {data && data.workItems && (
              <div className="mt-20">
                {data.workItems.map((p: WorkPageItems, i: number) => (
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

                    <div className="md:col-span-6">
                      <h3 className="font-display text-3xl md:text-5xl tracking-tight transition-colors group-hover:text-accent">
                        {p.title}
                      </h3>
                      <h4 className="font-display text-lg tracking-tight font-[700] uppercase text-white/50">
                        Client - {p.client}
                      </h4>
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
        )}
        <Contact />
      </main>
    </>
  );
}
