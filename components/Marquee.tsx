"use client";
import { useEffect, useState } from "react";

export default function Marquee({
  data,
}: {
  data?: { title: string }[];
}) {
  const [list, setList] = useState<{ title: string }[]>();

  useEffect(() => {
    if (data) setList([...data, ...data]);
  }, [data]);

  return (
    <div className="border-y hairline py-5 overflow-hidden">
      {list && list.length > 0 && (
        <div className="marquee-track">
          {list.map((s, i) => (
            <div key={i} className="flex items-center gap-8 px-8 shrink-0">
              <span className="font-display text-xl md:text-2xl text-ink-dim whitespace-nowrap">
                {s.title}
              </span>
              <span className="text-accent text-lg">✦</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
