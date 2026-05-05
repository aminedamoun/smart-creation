"use client";

import { useEffect, useState } from "react";
import { Clock } from "lucide-react";

const DUBAI_TZ = "Asia/Dubai";

function dubaiNow(): { time: string; weekday: string; isOpen: boolean } {
  const now = new Date();
  const time = new Intl.DateTimeFormat("en-GB", {
    timeZone: DUBAI_TZ,
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(now);
  const weekday = new Intl.DateTimeFormat("en-GB", {
    timeZone: DUBAI_TZ,
    weekday: "short",
  }).format(now);
  // Dubai office hours: Mon–Fri 9:00–18:00, Sat 10:00–14:00, Sun closed
  const hour = Number(
    new Intl.DateTimeFormat("en-GB", {
      timeZone: DUBAI_TZ,
      hour: "2-digit",
      hour12: false,
    }).format(now),
  );
  const isOpen =
    (weekday !== "Sun" && weekday !== "Sat" && hour >= 9 && hour < 18) ||
    (weekday === "Sat" && hour >= 10 && hour < 14);
  return { time, weekday, isOpen };
}

export function ContactLiveStatus() {
  const [tick, setTick] = useState(() => dubaiNow());

  useEffect(() => {
    const id = setInterval(() => setTick(dubaiNow()), 30 * 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2.5 font-mono text-[0.6rem] uppercase tracking-[0.22em] text-stone">
        <span className="relative flex h-2 w-2">
          <span
            className={
              "absolute inset-0 inline-flex animate-ping rounded-full opacity-70 " +
              (tick.isOpen ? "bg-emerald-500" : "bg-stone")
            }
          />
          <span
            className={
              "relative inline-flex h-2 w-2 rounded-full " +
              (tick.isOpen ? "bg-emerald-500" : "bg-stone")
            }
          />
        </span>
        {tick.isOpen ? "Team online · usually replies in 12 min" : "After hours · we'll reply at 9 AM"}
      </div>
      <div className="flex items-center gap-2.5 font-mono text-[0.7rem] uppercase tracking-[0.18em] text-ink">
        <Clock className="h-3.5 w-3.5 text-brand-deep" strokeWidth={2} />
        <span>
          Dubai · {tick.weekday} · {tick.time}{" "}
          <span className="text-stone">GST</span>
        </span>
      </div>
    </div>
  );
}
