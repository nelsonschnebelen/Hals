"use client";

// MUST be a client component: next/image's `loader` is a function and cannot
// be serialized across the server→client boundary. Importing this from a
// server component is fine; the "use client" directive keeps the loader local.

import Image, { type ImageProps } from "next/image";
import { cloudinaryLoader } from "@/lib/cloudinary-loader";

type CloudImageProps = Omit<ImageProps, "loader" | "src"> & {
  /** Cloudinary public id, e.g. "hals/hero". Full URLs also accepted. */
  publicId: string;
};

export function CloudImage({ publicId, alt, ...props }: CloudImageProps) {
  return <Image loader={cloudinaryLoader} src={publicId} alt={alt} {...props} />;
}
