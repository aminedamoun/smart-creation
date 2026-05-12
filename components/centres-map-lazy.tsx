"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import type { CentreMapPin } from "@/components/centres-map";

const CentresMap = dynamic(
  () =>
    import("@/components/centres-map").then((mod) => ({
      default: mod.CentresMap,
    })),
  {
    ssr: false,
    loading: () => (
      <div
        className="relative w-full overflow-hidden rounded-3xl border border-ink/10 bg-paper-soft"
        style={{ aspectRatio: "16 / 11" }}
        aria-hidden
      />
    ),
  },
);

type Props = {
  pins: CentreMapPin[];
};

export function CentresMapLazy({ pins }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [load, setLoad] = useState(false);

  useEffect(() => {
    if (!ref.current || load) return;
    const node = ref.current;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setLoad(true);
          io.disconnect();
        }
      },
      { rootMargin: "400px" },
    );
    io.observe(node);
    return () => io.disconnect();
  }, [load]);

  return (
    <div ref={ref}>
      {load ? (
        <CentresMap pins={pins} />
      ) : (
        <div
          className="relative w-full overflow-hidden rounded-3xl border border-ink/10 bg-paper-soft"
          style={{ aspectRatio: "16 / 11" }}
          aria-hidden
        />
      )}
    </div>
  );
}
