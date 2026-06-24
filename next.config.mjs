/** @type {import('next').NextConfig} */

// On GitHub Project Pages the site is served from a subpath (e.g. /hals).
// The deploy workflow injects NEXT_PUBLIC_BASE_PATH from actions/configure-pages,
// so local dev/build stay path-free.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

const nextConfig = {
  output: "export",
  basePath,
  assetPrefix: basePath || undefined,
  trailingSlash: true,
  images: {
    // Static export has no optimization server; a custom loader serves the
    // original files and (unlike `unoptimized`) honors basePath on Pages.
    loader: "custom",
    loaderFile: "./image-loader.js",
  },
};

export default nextConfig;
