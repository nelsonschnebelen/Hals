// Custom next/image loader for static export on GitHub Pages.
// The built-in unoptimized loader does NOT prepend basePath to local images,
// so under a project subpath (/hals) every local image would 404. This loader
// prepends the subpath to root-relative srcs and leaves absolute URLs alone.
export default function imageLoader({ src }) {
  if (/^https?:\/\//.test(src)) return src;
  const base = process.env.NEXT_PUBLIC_BASE_PATH || "";
  return `${base}${src}`;
}
