"use client";

import { useEffect, useRef } from "react";
import { motion, useInView, useMotionValue, useTransform, animate } from "motion/react";
import { usePrefersReducedMotion } from "@/lib/animations/usePrefersReducedMotion";

interface AnimatedCounterProps {
  value: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  decimals?: number;
  className?: string;
}

export function AnimatedCounter({
  value,
  suffix = "",
  prefix = "",
  duration = 1.6,
  decimals = 0,
  className,
}: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const reduced = usePrefersReducedMotion();
  const count = useMotionValue(reduced ? value : 0);
  const rounded = useTransform(count, (latest) =>
    decimals > 0 ? latest.toFixed(decimals) : Math.round(latest).toString(),
  );

  useEffect(() => {
    if (!inView || reduced) return;
    const controls = animate(count, value, { duration, ease: [0.22, 1, 0.36, 1] });
    return () => controls.stop();
  }, [inView, reduced, value, duration, count]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      <motion.span style={{ display: "inline" }}>{rounded}</motion.span>
      {suffix}
    </span>
  );
}
