"use client";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useSettings } from "@/providers/sanityProvider";
import { createClient } from "@/lib/utils/supabase/client";
import { motion, AnimatePresence } from "framer-motion";

interface FormNav {
  title: string;
}

export default function LoginFrom() {
  const [firstname, setFirstname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const from = useSearchParams().get("from") || "/protected";
  const settings = useSettings();
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const supabase = createClient();
  const [activeIndex, setActiveIndex] = useState<number>(0);

  const formNav: FormNav[] = [{ title: "Request" }, { title: "Login" }];

  async function handleSubmit(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) {
    e.preventDefault(); // stops the native form submit/page reload
    setLoading(true);
    setError(null);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (error) {
      setError(error.message);
      return;
    }

    router.push("/work");
    router.refresh(); // ensures server components pick up the new session
  }

  return (
    <div className="w-full max-w-[500px]">
      <div className="w-full text-center">
        <h2 className="font-display font-black leading-[5rem] text-[3rem] md:text-[5rem] tracking-tight uppercase">
          Work
        </h2>
        <p className="mb-10 mt-5">
          Certain projects live behind a password due to display restrictions.
        </p>
      </div>
      <div className="w-full flex items-center justify-start gap-1">
        {formNav.map((navItem, index) => (
          <button
            type="button"
            key={`formnav${index}`}
            onClick={() => setActiveIndex(index)}
            className={`border hairline py-2 px-6 ${
              index === activeIndex ? "bg-white/10" : ""
            }`}
          >
            {navItem.title}
          </button>
        ))}
      </div>
      <AnimatePresence mode="wait">
        {activeIndex === 0 ? (
          <motion.div
            key="request"
            className="border hairline p-6"
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          >
            <form className="text-center w-full">
              <div className="flex flex-col gap-4">
                <input
                  type="text"
                  value={firstname}
                  onChange={(e) => setFirstname(e.target.value)}
                  placeholder="Enter First Name*"
                  className="font-sm border hairline p-4 transition-all font-bold outline-none"
                />
                <input
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter Email*"
                  className="font-sm border hairline p-4 transition-all font-bold outline-none"
                />
                <button
                  type="submit"
                  className="font-sm border hairline p-4 transition-all font-bold outline-none border-l-none bg-accent cursor-pointer"
                  onClick={(e) => handleSubmit(e)}
                >
                  Send Request
                </button>
                {error && (
                  <p className="border-rose-600 border-2 border-dashed text-white block p-3 uppercase text-sm">
                    {error}
                  </p>
                )}
              </div>
            </form>
          </motion.div>
        ) : (
          <motion.div
            key="login"
            className="border hairline p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          >
            <form className="text-center w-full">
              <div className="flex flex-col gap-4">
                <input
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter Email*"
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
                  onClick={(e) => handleSubmit(e)}
                >
                  Enter
                </button>
                {error && (
                  <p className="border-rose-600 border-2 border-dashed text-white block p-3 uppercase text-sm">
                    {error}
                  </p>
                )}
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
