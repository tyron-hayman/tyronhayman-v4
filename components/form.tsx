"use client";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useSettings } from "@/providers/sanityProvider";
import { login, signup } from "@/app/work/actions";

export default function LoginFrom() {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const from = useSearchParams().get("from") || "/protected";
  const settings = useSettings();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const res = await fetch("/api/login", {
      method: "POST",
      body: JSON.stringify({ password }),
    });
    if (res.ok) {
      router.push(from);
    } else {
      setError("Incorrect password");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="text-center w-full max-w-[500px]">
      <h2 className="font-display font-black leading-[5rem] text-[3rem] md:text-[5rem] tracking-tight uppercase">
        Work
      </h2>
      <p className="mb-10 mt-5">
        Certain projects live behind a password due to display restrictions.{" "}
        <a
          href={`mailto:${settings?.siteEmail}`}
          className="text-accent underline font-black"
        >
          Contact me
        </a>{" "}
        to request access. Please include your name.
      </p>
      <div className="flex flex-col gap-4">
        <input
          type="text"
          value={user}
          onChange={(e) => setUser(e.target.value)}
          placeholder="Enter Username*"
          className="font-sm border hairline p-4 transition-all font-bold outline-none"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter password*"
          className="font-sm border hairline p-4 transition-all font-bold outline-none"
        />
        <button
          type="submit"
          className="font-sm border hairline p-4 transition-all font-bold outline-none border-l-none bg-accent cursor-pointer"
          formAction={login}
        >
          Enter
        </button>
        {error && <p>{error}</p>}
      </div>
    </form>
  );
}
