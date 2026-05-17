"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";
import { usePrefersReducedMotion } from "@/lib/animations/usePrefersReducedMotion";

export function CustomCursor() {
  const reduced = usePrefersReducedMotion();
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const ringX = useSpring(x, { stiffness: 1500, damping: 60, mass: 0.2 });
  const ringY = useSpring(y, { stiffness: 1500, damping: 60, mass: 0.2 });

  useEffect(() => {
    if (reduced) return;
    const isFinePointer = window.matchMedia("(pointer: fine)").matches;
    if (!isFinePointer) return;
    setEnabled(true);
    document.documentElement.classList.add("custom-cursor-active");

    function onMove(event: MouseEvent) {
      x.set(event.clientX);
      y.set(event.clientY);
    }

    function onOver(event: MouseEvent) {
      const target = event.target as HTMLElement | null;
      if (!target) return;
      const interactive = target.closest("a, button, [role=button], input, textarea, [data-cursor=hover]");
      setHovering(!!interactive);
    }

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseover", onOver);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      document.documentElement.classList.remove("custom-cursor-active");
    };
  }, [reduced, x, y]);

  if (!enabled) return null;

  return (
    <>
      <motion.div
        aria-hidden="true"
        className="fixed top-0 left-0 z-[9999] pointer-events-none w-2 h-2 bg-accent rounded-full"
        style={{ x, y, translateX: "-50%", translateY: "-50%" }}
      />
      <motion.div
        aria-hidden="true"
        className="fixed top-0 left-0 z-[9998] pointer-events-none rounded-full border border-bg-dark/30 mix-blend-difference"
        animate={{ width: hovering ? 48 : 32, height: hovering ? 48 : 32 }}
        style={{ x: ringX, y: ringY, translateX: "-50%", translateY: "-50%" }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
      />
    </>
  );
}
