"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { RefObject } from "react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export { gsap, ScrollTrigger, useGSAP };

export function refreshScrollTrigger(): void {
  if (typeof window === "undefined") return;
  ScrollTrigger.refresh();
}

export type GsapScope = RefObject<HTMLElement | null>;
