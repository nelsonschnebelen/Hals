import "server-only";
import { fal } from "@fal-ai/client";

fal.config({ credentials: process.env.FAL_KEY });

export type GeneratedImage = { url: string; width?: number; height?: number };

/**
 * Generate a raster image. NOTE: never use this for Hal's food — the client's
 * real photography is the source of truth. Reserved for textures, backgrounds,
 * and abstract art direction only.
 */
export async function generateImage(
  prompt: string,
  opts: { imageSize?: string; numImages?: number; model?: string } = {},
): Promise<GeneratedImage[]> {
  const { data } = await fal.subscribe(opts.model ?? "fal-ai/flux/dev", {
    input: {
      prompt,
      image_size: opts.imageSize ?? "landscape_16_9",
      num_images: opts.numImages ?? 1,
    },
  });
  return ((data as { images?: GeneratedImage[] }).images ?? []).map((i) => ({
    url: i.url,
    width: i.width,
    height: i.height,
  }));
}

/** Generate an SVG vector (logos, marks, decorative line art). */
export async function generateVector(
  prompt: string,
  opts: { model?: string } = {},
): Promise<string> {
  const { data } = await fal.subscribe(opts.model ?? "fal-ai/recraft/v3/text-to-image", {
    input: { prompt, style: "vector_illustration" },
  });
  const images = (data as { images?: { url: string }[] }).images ?? [];
  return images[0]?.url ?? "";
}

/** Generate a short video clip (ambient/cinematic loops). */
export async function generateVideo(
  prompt: string,
  opts: { model?: string } = {},
): Promise<string> {
  const { data } = await fal.subscribe(opts.model ?? "fal-ai/kling-video/v1/standard/text-to-video", {
    input: { prompt },
  });
  return (data as { video?: { url: string } }).video?.url ?? "";
}

export { fal };
