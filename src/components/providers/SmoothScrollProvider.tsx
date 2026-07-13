"use client";

import { useLenis } from "@/lib/animations/useLenis";

export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  useLenis();
  return <>{children}</>;
}
