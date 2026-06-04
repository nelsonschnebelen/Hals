import { NextResponse } from "next/server";
import { generateImage } from "@/lib/fal";

export const runtime = "nodejs";

/**
 * POST /api/generate-image  { prompt, imageSize?, numImages? }
 *
 * Art-direction utility only (textures / backgrounds / abstract art).
 * Hal's food imagery comes exclusively from the client's real photography.
 */
export async function POST(req: Request) {
  if (!process.env.FAL_KEY) {
    return NextResponse.json({ error: "FAL_KEY not configured" }, { status: 503 });
  }

  try {
    const { prompt, imageSize, numImages } = await req.json();
    if (!prompt || typeof prompt !== "string") {
      return NextResponse.json({ error: "Missing 'prompt'" }, { status: 400 });
    }

    const images = await generateImage(prompt, { imageSize, numImages });
    return NextResponse.json({ images });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Generation failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
