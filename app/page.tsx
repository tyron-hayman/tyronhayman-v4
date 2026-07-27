"use client";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import Work from "@/components/Work";
import About from "@/components/About";
import Contact from "@/components/Contact";
import { type HomePage, useHomepage } from "@/providers/sanityProvider";

export default function Home() {
  const data = useHomepage();
  return (
    <>
      <Nav />
      <main>
        <Hero data={data} />
        <Marquee data={data?.techUsed} />
        <Work />
        <About />
        <Contact />
      </main>
    </>
  );
}
