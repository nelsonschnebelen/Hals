import type { ImageLoaderProps } from "next/image";

/** Non-secret — safe as an inline fallback. Override via env. */
const CLOUD_NAME =
  process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || "dpjkoevbm";

/**
 * next/image loader that delivers Cloudinary assets with automatic format
 * (AVIF/WebP) and quality, plus responsive width. Pass a Cloudinary
 * public id (e.g. "hals/hero") as `src`; full URLs pass through untouched.
 */
export function cloudinaryLoader({ src, width, quality }: ImageLoaderProps): string {
  if (/^https?:\/\//.test(src)) return src;

  const transforms = [
    "f_auto",
    quality ? `q_${quality}` : "q_auto",
    "c_limit",
    `w_${width}`,
  ].join(",");

  const id = src.replace(/^\/+/, "");
  return `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/${transforms}/${id}`;
}
