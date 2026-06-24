"use client";

import { useEffect, useRef } from "react";

/**
 * Embeds OpenTable's inline reservation widget (date / time / party size).
 * The loader script injects an iframe as a sibling inside the container, so we
 * mount it via a ref and clear on rid change / unmount.
 */
export function OpenTableWidget({
  rid,
  theme = "standard",
  dark = true,
}: {
  rid: number;
  theme?: string;
  dark?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.innerHTML = "";

    const script = document.createElement("script");
    script.type = "text/javascript";
    script.async = true;
    script.src =
      `https://www.opentable.com/widget/reservation/loader?rid=${rid}` +
      `&type=standard&theme=${theme}&dark=${dark}&iframe=true&domain=com` +
      `&lang=en-US&newtab=true&ot_source=Restaurant%20website`;
    el.appendChild(script);

    return () => {
      el.innerHTML = "";
    };
  }, [rid, theme, dark]);

  return <div ref={ref} className="flex min-h-[260px] items-center justify-center" />;
}
