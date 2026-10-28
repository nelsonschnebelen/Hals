import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { LOCATIONS, SITE } from "@/lib/content";

const atlanta = LOCATIONS[0];

const CARDS = [
  {
    title: "Reservations",
    body: "Book online through OpenTable or call the room directly — a team that has worked here for years picks up. Large parties welcome.",
    actions: [
      { label: "Reserve", href: "#locations", external: false },
      { label: SITE.phone, href: SITE.phoneHref, external: false },
    ],
  },
  {
    title: "The House",
    body: "One check per table, no separate checks. No outside wine, please — the list is long and the pours are generous.",
    actions: [],
  },
  {
    title: "Private Events",
    body: "Rehearsal dinners, milestones, the deal you finally closed. A dedicated coordinator and menus built around your night.",
    actions: [{ label: "Plan an Event", href: `mailto:${atlanta.email}`, external: false }],
  },
] as const;

/** Before You Visit — the practical block the reference sites all keep. */
export function GoodToKnow() {
  return (
    <section
      id="visit-info"
      className="border-t border-white/5 py-28 sm:py-36"
    >
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeading
          index="07"
          eyebrow="Good to Know"
          title={
            <>
              Before you <em className="text-gold">visit</em>.
            </>
          }
          className="max-w-2xl"
        />

        <div className="mt-16 grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/5 sm:grid-cols-3">
          {CARDS.map((card, i) => (
            <Reveal key={card.title} variant="up" delay={i * 0.08}>
              <div className="flex h-full flex-col bg-ink p-8">
                <h3 className="font-serif text-2xl text-cream">{card.title}</h3>
                <p className="mt-4 flex-1 text-sm leading-relaxed text-cream/65">
                  {card.body}
                </p>
                {card.actions.length > 0 && (
                  <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2">
                    {card.actions.map((a) => (
                      <a
                        key={a.label}
                        href={a.href}
                        className="link-underline text-xs uppercase tracking-eyebrow text-gold"
                      >
                        {a.label}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
