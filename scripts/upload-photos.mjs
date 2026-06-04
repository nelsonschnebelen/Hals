// Upload the real Hal's food photos to Cloudinary under canonical public ids.
//
//   1. cp .env.example .env.local  and set CLOUDINARY_API_SECRET (rotated)
//   2. Drop the photos into ./photos using the filenames in FILE_MAP below
//   3. npm run upload:photos
//
// Cloudinary assets are account-level, so this only needs to run once.

import { v2 as cloudinary } from "cloudinary";
import { readdir } from "node:fs/promises";
import { join, extname, basename } from "node:path";

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || "dpjkoevbm",
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

// local filename (without extension) -> Cloudinary public id
const FILE_MAP = {
  ribeye: "hals/ribeye", // grilled bone-in ribeye, red flower
  "ribeye-steam": "hals/ribeye-steam", // steaming bone-in chop (hero)
  filet: "hals/filet", // pepper-crusted filet / steak au poivre
  "lobster-mac": "hals/lobster-mac", // lobster mac & cheese, closeup
  "lobster-mac-table": "hals/lobster-mac-table", // lobster mac, set table
};

const DIR = "photos";
const IMAGE_EXTS = new Set([".jpg", ".jpeg", ".png", ".webp", ".heic"]);

if (!process.env.CLOUDINARY_API_SECRET) {
  console.error("✗ CLOUDINARY_API_SECRET is missing. Add it to .env.local and re-run.");
  process.exit(1);
}

let files;
try {
  files = (await readdir(DIR)).filter((f) => IMAGE_EXTS.has(extname(f).toLowerCase()));
} catch {
  console.error(`✗ No ./${DIR} folder. Create it and add the photos first.`);
  process.exit(1);
}

if (files.length === 0) {
  console.error(`✗ No images found in ./${DIR}. Expected: ${Object.keys(FILE_MAP).join(", ")}`);
  process.exit(1);
}

let uploaded = 0;
for (const file of files) {
  const key = basename(file, extname(file));
  const publicId = FILE_MAP[key];
  if (!publicId) {
    console.warn(`• skip ${file} (no mapping for "${key}")`);
    continue;
  }
  const res = await cloudinary.uploader.upload(join(DIR, file), {
    public_id: publicId,
    overwrite: true,
    invalidate: true,
    resource_type: "image",
  });
  uploaded += 1;
  console.log(`✓ ${file} → ${res.public_id}  (${res.width}×${res.height})`);
}

console.log(`\nDone. Uploaded ${uploaded} image(s) to Cloudinary "${cloudinary.config().cloud_name}".`);
