/**
 * Slow-drifting gilded light. Pure CSS animation (see globals.css), so it can
 * stay a server component. Auto-stills under prefers-reduced-motion.
 */
export function Aurora() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <div className="aurora-a absolute -left-1/4 top-1/4 h-[60vh] w-[60vh] rounded-full bg-[radial-gradient(circle,rgba(197,165,114,0.18),transparent_60%)] blur-2xl" />
      <div className="aurora-b absolute -right-[15%] -top-[10%] h-[55vh] w-[55vh] rounded-full bg-[radial-gradient(circle,rgba(156,127,79,0.16),transparent_60%)] blur-2xl" />
      <div
        className="aurora-a absolute -bottom-1/5 left-1/3 h-[50vh] w-[50vh] rounded-full bg-[radial-gradient(circle,rgba(197,165,114,0.10),transparent_65%)] blur-2xl"
        style={{ animationDelay: "-6s" }}
      />
    </div>
  );
}
