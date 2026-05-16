"use client";

import { useRef } from "react";
import SplitType from "split-type";
import { gsap, useGSAP } from "@/lib/animations/useGsapScrollTrigger";
import { usePrefersReducedMotion } from "@/lib/animations/usePrefersReducedMotion";

interface RevealTextProps {
  children: React.ReactNode;
  as?: keyof React.JSX.IntrinsicElements;
  className?: string;
  delay?: number;
  stagger?: number;
}

export function RevealText({
  children,
  as: Tag = "span",
  className,
  delay = 0,
  stagger = 0.04,
}: RevealTextProps) {
  const ref = useRef<HTMLElement | null>(null);
  const reduced = usePrefersReducedMotion();

  useGSAP(
    () => {
      if (!ref.current || reduced) return;
      const split = new SplitType(ref.current, { types: "lines,words" });
      const words = split.words;
      if (!words) return;

      gsap.set(words, { yPercent: 110, opacity: 0 });
      gsap.to(words, {
        yPercent: 0,
        opacity: 1,
        duration: 0.9,
        ease: "expo.out",
        stagger,
        delay,
      });

      return () => {
        split.revert();
      };
    },
    { scope: ref as React.RefObject<HTMLElement>, dependencies: [reduced, delay, stagger] },
  );

  const TagAny = Tag as React.ElementType;

  return (
    <TagAny ref={ref} className={className} style={{ overflow: "hidden", display: "block" }}>
      {children}
    </TagAny>
  );
}
