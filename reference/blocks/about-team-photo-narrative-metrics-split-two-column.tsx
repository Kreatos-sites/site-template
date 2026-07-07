import { useTranslations } from "next-intl";
import { Reveal } from "@/components/shared/reveal";
import { SmartImage } from "@/components/shared/smart-image";
import { Users, CalendarDays, MapPin, type LucideIcon } from "lucide-react";

type Metric = { icon: string; value: string; label: string };

const ICONS: Record<string, LucideIcon> = {
  team: Users,
  founded: CalendarDays,
  location: MapPin,
};

export function AboutTeamPhotoNarrativeMetricsSplitTwoColumn({ ns }: { ns: string }) {
  const t = useTranslations(ns);
  const paragraphs = t.raw("paragraphs") as string[];
  const metrics = t.raw("metrics") as Metric[];

  return (
    <section className="border-t border-border bg-background py-(--section-gap)">
      <div className="mx-auto w-full max-w-6xl px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <figure>
              <SmartImage
                src={t("image")}
                alt={t("imageAlt")}
                className="aspect-[4/5] rounded-sm grayscale"
              />
            </figure>
          </Reveal>

          <div className="flex flex-col justify-center">
            <Reveal delay={60}>
              <p className="text-xs font-medium tracking-[0.25em] text-primary uppercase">
                {t("eyebrow")}
              </p>
              <h2 className="mt-5 font-display text-[clamp(2rem,4vw,3.25rem)] leading-[1.05] tracking-tight text-balance text-foreground">
                {t("title")}
              </h2>
              <div className="mt-6 space-y-4">
                {paragraphs.map((p, i) => (
                  <p key={i} className="text-base leading-relaxed text-muted-foreground">
                    {p}
                  </p>
                ))}
              </div>
            </Reveal>
          </div>
        </div>

        <Reveal delay={120}>
          <dl className="mt-16 grid grid-cols-1 divide-y divide-border border-t border-border sm:grid-cols-3 sm:divide-x sm:divide-y-0">
            {metrics.map((m, i) => {
              const Icon = ICONS[m.icon] ?? Users;
              return (
                <div key={i} className="flex flex-col gap-3 py-8 sm:px-8 sm:first:pl-0 sm:last:pr-0">
                  <Icon className="size-5 text-primary" strokeWidth={1.75} />
                  <dt className="sr-only">{m.label}</dt>
                  <dd className="font-display text-3xl tracking-tight text-foreground sm:text-4xl">
                    {m.value}
                  </dd>
                  <p className="text-xs leading-snug text-muted-foreground">{m.label}</p>
                </div>
              );
            })}
          </dl>
        </Reveal>
      </div>
    </section>
  );
}
