"use client";

import { useEffect, useState } from "react";

type Props = {
  children: React.ReactNode;
  fallback?: React.ReactNode;
};

export default function PerformanceGate({ children, fallback = null }: Props) {
  const [allow, setAllow] = useState<boolean | null>(null);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) { setAllow(false); return; }

    // Check network quality if available
    const nav = navigator as Navigator & { connection?: { effectiveType?: string } };
    const ect = nav.connection?.effectiveType;
    if (ect === "2g" || ect === "slow-2g") { setAllow(false); return; }

    setAllow(true);
  }, []);

  if (allow === null) return null;
  return <>{allow ? children : fallback}</>;
}
