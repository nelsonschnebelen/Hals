import "server-only";
import { v2 as cloudinary, type UploadApiOptions, type UploadApiResponse } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || "dpjkoevbm",
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

/**
 * Upload an image to Cloudinary from a remote URL, data URI, or local path.
 * Server-only — relies on CLOUDINARY_API_SECRET.
 */
export async function uploadImage(
  source: string,
  options: UploadApiOptions = {},
): Promise<UploadApiResponse> {
  return cloudinary.uploader.upload(source, {
    folder: "hals",
    overwrite: true,
    resource_type: "image",
    ...options,
  });
}

export { cloudinary };
