/**
 * Brand lockup for the header/footer.
 *
 * NOTE: interim typographic stand-in. When the real logo art arrives, drop it
 * in /public (e.g. /logo.svg) and replace the markup below with:
 *   <Image src="/logo.svg" alt="Hal's The Steakhouse" width={150} height={40} priority />
 */
export function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`flex flex-col leading-none ${className}`}>
      <span className="font-serif text-2xl tracking-wide text-cream">
        HAL&rsquo;S
      </span>
      <span className="mt-1 text-[9px] uppercase tracking-[0.35em] text-gold">
        The Steakhouse
      </span>
    </span>
  );
}
