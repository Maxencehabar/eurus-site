"use client";

import Image from "next/image";
import clsx from "clsx";
import type { AssetDefinition } from "@/data/assets";

interface AssetProps {
  asset: AssetDefinition;
  className?: string;
  priority?: boolean;
  sizes?: string;
}

export function Asset({ asset, className, priority, sizes }: AssetProps) {
  if (asset.status === "ready" && asset.src) {
    return (
      <Image
        src={asset.src}
        alt={asset.alt}
        width={asset.width}
        height={asset.height}
        className={className}
        priority={priority}
        sizes={sizes}
      />
    );
  }

  return (
    <div
      role="img"
      aria-label={asset.alt}
      className={clsx(
        "relative overflow-hidden bg-gradient-to-br from-bg-secondary via-bg-card to-bg-secondary",
        "border border-dashed border-border-strong",
        "flex items-center justify-center",
        className,
      )}
      style={{ aspectRatio: `${asset.width} / ${asset.height}` }}
    >
      <div className="absolute inset-0 bg-[linear-gradient(110deg,transparent_30%,rgba(232,93,4,0.08)_50%,transparent_70%)] animate-[shimmer_3s_ease-in-out_infinite]" />
      <div className="relative z-10 text-center px-4">
        <p className="text-xs uppercase tracking-wider text-text-muted mb-1">Asset à fournir</p>
        <p className="text-sm font-medium text-text-secondary">{asset.id}</p>
      </div>
    </div>
  );
}
