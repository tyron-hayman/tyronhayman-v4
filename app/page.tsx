"use client";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import Work from "@/components/Work";
import About from "@/components/About";
import Contact from "@/components/Contact";
import { type HomePage, useHomepage } from "@/providers/sanityProvider";
import HeadStatueBackground from "@/components/global/background-model";

export default function Home() {
  const data = useHomepage();
  return (
    <>
      <Nav />
      <HeadStatueBackground />
      <main className="relative z-[10]">
        <Hero data={data} />
        <Marquee data={data?.techUsed} />
        <Work />
        <About />
        <Contact />
      </main>
    </>
  );
}
