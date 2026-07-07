import { useTranslations } from "next-intl";
import { Reveal } from "@/components/shared/reveal";
import { SmartImage } from "@/components/shared/smart-image";
import {
  RiTeamLine,
  RiMapPinLine,
  RiAwardLine,
  RiHandHeartLine,
  type RemixiconComponentType,
} from "@remixicon/react";

type Highlight = { icon: string; text: string };
type Metric = { value: string; label: string };

const ICONS: Record<string, RemixiconComponentType> = {
  team: RiTeamLine,
  location: RiMapPinLine,
  award: RiAwardLine,
  values: RiHandHeartLine,
};

export function AboutNarrativeTeamPhotoMetrics({ ns }: { ns: string }) {
  const t = useTranslations(ns);
  const paragraphs = t.raw("paragraphs") as string[];
  const highlights = t.raw("highlights") as Highlight[];
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
              <figcaption className="mt-4 border-l-2 border-primary pl-4 text-sm leading-relaxed text-muted-foreground">
                {t("imageCaption")}
              </figcaption>
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

            <Reveal delay={120}>
              <ul className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
                {highlights.map((h, i) => {
                  const Icon = ICONS[h.icon] ?? RiTeamLine;
                  return (
                    <li key={i} className="flex items-start gap-3">
                      <Icon className="mt-0.5 size-5 shrink-0 text-primary" />
                      <span className="text-sm leading-relaxed text-muted-foreground">
                        {h.text}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </Reveal>

            <Reveal delay={180}>
              <dl className="mt-10 grid grid-cols-3 gap-6 border-t border-border pt-8">
                {metrics.map((m, i) => (
                  <div key={i}>
                    <dt className="sr-only">{m.label}</dt>
                    <dd className="font-display text-3xl tracking-tight text-foreground sm:text-4xl">
                      {m.value}
                    </dd>
                    <p className="mt-2 text-xs leading-snug text-muted-foreground">{m.label}</p>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
