"use client";
import Nav from "@/components/Nav";
import LoginFrom from "@/components/form";
import Contact from "@/components/Contact";

export default function Home() {
  // const data = useHomepage();
  return (
    <>
      <Nav />
      <main className="">
        <div className="relative py-[150px] md:py-[200px] md:py-[300px] flex items-center justify-center overflow-hidden px-6 md:px-0">
          <div className="absolute inset-0 -z-10 opacity-[0.4]">
            <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[70vw] h-[70vw] max-w-[900px] max-h-[100vh] rounded-full bg-accent/10 blur-[120px]" />
          </div>
          <LoginFrom />
        </div>
        <Contact />
      </main>
    </>
  );
}
