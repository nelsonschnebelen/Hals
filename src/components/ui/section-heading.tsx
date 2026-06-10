import { Reveal } from "@/components/ui/reveal";
import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  /** Chapter index, e.g. "01". */
  index: string;
  eyebrow: string;
  /** Pass ReactNode so titles can carry an italic accent. */
  title: React.ReactNode;
  className?: string;
  align?: "left" | "center";
};

/**
 * Indexed editorial header: chapter number, a hairline that stretches the
 * row, the eyebrow, then an oversized serif title.
 */
export function SectionHeading({
  index,
  eyebrow,
  title,
  className,
  align = "left",
}: SectionHeadingProps) {
  return (
    <div className={className}>
      <Reveal variant="fade">
        <div className="mb-8 flex items-center gap-5 text-[11px] uppercase tracking-eyebrow">
          <span className="text-gold/80">{index}</span>
          <span className="h-px flex-1 bg-white/10" />
          <span className="text-cream/50">{eyebrow}</span>
        </div>
      </Reveal>
      <Reveal variant="up" delay={0.08}>
        <h2
          className={cn(
            "font-serif text-[clamp(2.4rem,5vw,4.25rem)] leading-[1.04] text-balance tracking-[-0.01em]",
            align === "center" && "text-center",
          )}
        >
          {title}
        </h2>
      </Reveal>
    </div>
  );
}
