"use client";

import { useEffect, useState } from "react";

/**
 * Filmic grain rendered from a runtime canvas tile — no SVG filters, no
 * shipped asset. The tile is generated once on mount and jittered by the
 * CSS .grain-overlay animation. Hidden under prefers-reduced-motion via CSS.
 */
export function Grain({ size = 160 }: { size?: number }) {
  const [tile, setTile] = useState<string | null>(null);

  useEffect(() => {
    const canvas = document.createElement("canvas");
    canvas.width = canvas.height = size;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const image = ctx.createImageData(size, size);
    const px = image.data;
    for (let i = 0; i < px.length; i += 4) {
      const v = (Math.random() * 255) | 0;
      px[i] = px[i + 1] = px[i + 2] = v;
      px[i + 3] = 255;
    }
    ctx.putImageData(image, 0, 0);
    setTile(canvas.toDataURL());
  }, [size]);

  if (!tile) return null;

  return (
    <div
      aria-hidden
      className="grain-overlay"
      style={{ backgroundImage: `url(${tile})` }}
    />
  );
}
