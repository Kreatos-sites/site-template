import { useTranslations } from "next-intl";
import { Reveal } from "@/components/shared/reveal";
import { SmartImage } from "@/components/shared/smart-image";
import { HugeiconsIcon, type IconSvgElement } from "@hugeicons/react";
import {
  Building03Icon,
  Home03Icon,
  Key01Icon,
  ChartIncreaseIcon,
} from "@hugeicons/core-free-icons";

type Stat = { value: string; label: string };
type Service = { icon: string; title: string; description: string };

const ICONS: Record<string, IconSvgElement> = {
  building: Building03Icon,
  home: Home03Icon,
  key: Key01Icon,
  chart: ChartIncreaseIcon,
};

export function RealEstateHomepageHeroStatsServicesTestimonial({ ns }: { ns: string }) {
  const t = useTranslations(ns);
  const stats = t.raw("stats") as Stat[];
  const services = t.raw("services") as Service[];

  return (
    <>
      <section className="border-t border-border bg-background py-(--section-gap)">
        <div className="mx-auto w-full max-w-6xl px-6 lg:px-8">
          <Reveal>
            <div className="mx-auto max-w-3xl text-center">
              <p className="text-xs font-medium tracking-[0.25em] text-primary uppercase">{t("eyebrow")}</p>
              <h1 className="mt-5 font-display text-[clamp(2.5rem,6vw,4.5rem)] leading-[1.02] tracking-tight text-balance text-foreground">
                {t("title")}
              </h1>
              <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-muted-foreground">
                {t("subtitle")}
              </p>
              <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <a
                  href={t("primaryCtaHref")}
                  className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
                >
                  {t("primaryCtaLabel")}
                </a>
                <a
                  href={t("secondaryCtaHref")}
                  className="inline-flex items-center justify-center rounded-md border border-border bg-card px-6 py-3 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
                >
                  {t("secondaryCtaLabel")}
                </a>
              </div>
            </div>
          </Reveal>

          <Reveal delay={80}>
            <div className="mt-14 overflow-hidden rounded-lg border border-border">
              <SmartImage src={t("heroImage")} alt={t("heroImageAlt")} className="aspect-[16/8] rounded-lg" />
            </div>
          </Reveal>

          <Reveal delay={120}>
            <div className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-4">
              {stats.map((s, i) => (
                <div key={i} className="flex flex-col gap-1 bg-card p-6 text-center">
                  <span className="font-display text-2xl text-foreground">{s.value}</span>
                  <span className="text-xs text-muted-foreground">{s.label}</span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="border-t border-border bg-background py-(--section-gap)">
        <div className="mx-auto w-full max-w-6xl px-6 lg:px-8">
          <Reveal>
            <p className="text-xs font-medium tracking-[0.25em] text-primary uppercase">{t("servicesEyebrow")}</p>
            <h2 className="mt-5 max-w-2xl font-display text-[clamp(2rem,4vw,3.25rem)] leading-[1.05] tracking-tight text-balance text-foreground">
              {t("servicesTitle")}
            </h2>
          </Reveal>

          <ul className="mt-14 grid grid-cols-1 gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
            {services.map((s, i) => {
              const Icon = ICONS[s.icon] ?? Building03Icon;
              return (
                <li key={i} className="contents">
                  <Reveal delay={i * 60}>
                    <article className="flex h-full flex-col gap-5 bg-card p-7">
                      <div className="flex size-11 items-center justify-center rounded-md bg-secondary">
                        <HugeiconsIcon icon={Icon} className="size-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-display text-lg text-foreground">{s.title}</h3>
                        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.description}</p>
                      </div>
                    </article>
                  </Reveal>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      <section className="border-t border-border bg-background py-(--section-gap)">
        <div className="mx-auto w-full max-w-6xl px-6 lg:px-8">
          <Reveal>
            <div className="mx-auto flex max-w-3xl flex-col items-center gap-8 text-center">
              <SmartImage
                src={t("testimonialAvatar")}
                alt={t("testimonialAvatarAlt")}
                className="aspect-square size-16 rounded-full"
              />
              <blockquote className="font-display text-[clamp(1.5rem,3vw,2rem)] leading-snug text-balance text-foreground">
                &ldquo;{t("testimonialQuote")}&rdquo;
              </blockquote>
              <div>
                <p className="text-sm font-medium text-foreground">{t("testimonialName")}</p>
                <p className="mt-1 text-xs text-muted-foreground">{t("testimonialRole")}</p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="border-t border-border bg-primary py-(--section-gap)">
        <div className="mx-auto w-full max-w-6xl px-6 lg:px-8">
          <Reveal>
            <div className="flex flex-col items-center gap-6 text-center">
              <h2 className="max-w-2xl font-display text-[clamp(1.75rem,3.5vw,2.75rem)] leading-[1.05] tracking-tight text-balance text-primary-foreground">
                {t("ctaTitle")}
              </h2>
              <p className="max-w-xl text-sm leading-relaxed text-primary-foreground/80">{t("ctaSubtitle")}</p>
              <a
                href={t("ctaHref")}
                className="inline-flex items-center justify-center rounded-md bg-background px-6 py-3 text-sm font-medium text-foreground transition-colors hover:bg-background/90"
              >
                {t("ctaLabel")}
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
