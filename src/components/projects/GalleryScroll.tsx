"use client";

import { useRef } from "react";
import { Asset } from "@/components/ui/Asset";
import { getAsset } from "@/data/assets";
import { gsap, useGSAP } from "@/lib/animations/useGsapScrollTrigger";
import { usePrefersReducedMotion } from "@/lib/animations/usePrefersReducedMotion";

interface GalleryScrollProps {
  assetIds: string[];
}

export function GalleryScroll({ assetIds }: GalleryScrollProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();

  useGSAP(
    () => {
      if (reduced || !containerRef.current || !trackRef.current) return;
      const track = trackRef.current;
      const distance = track.scrollWidth - window.innerWidth;
      if (distance <= 0) return;

      const tween = gsap.to(track, {
        x: -distance,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: `+=${distance}`,
          scrub: 0.5,
          pin: true,
          invalidateOnRefresh: true,
        },
      });

      return () => {
        tween.scrollTrigger?.kill();
        tween.kill();
      };
    },
    { scope: containerRef as React.RefObject<HTMLElement>, dependencies: [reduced, assetIds] },
  );

  if (reduced) {
    return (
      <div className="grid md:grid-cols-2 gap-6 px-6 md:px-12">
        {assetIds.map((id) => (
          <Asset
            key={id}
            asset={getAsset(id)}
            className="w-full h-auto rounded-2xl border border-border"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        ))}
      </div>
    );
  }

  return (
    <div ref={containerRef} className="relative h-screen overflow-hidden">
      <div
        ref={trackRef}
        className="flex gap-6 md:gap-12 h-full items-center pl-6 md:pl-12 will-change-transform"
      >
        {assetIds.map((id) => {
          const asset = getAsset(id);
          const isPortrait = asset.height > asset.width;
          return (
            <div
              key={id}
              className={`flex-shrink-0 ${isPortrait ? "w-[40vh] md:w-[50vh]" : "w-[80vw] md:w-[60vw]"} rounded-2xl overflow-hidden border border-border bg-bg-card`}
            >
              <Asset
                asset={asset}
                className="w-full h-auto object-cover"
                sizes={isPortrait ? "50vh" : "60vw"}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
