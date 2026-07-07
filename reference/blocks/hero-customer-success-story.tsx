import { useTranslations } from "next-intl";
import { Reveal } from "@/components/shared/reveal";
import { SmartImage } from "@/components/shared/smart-image";
import { ArrowUpRight } from "lucide-react";

type Metric = { value: string; label: string };

export function HeroCustomerSuccessStory({ ns }: { ns: string }) {
  const t = useTranslations(ns);
  const metrics = t.raw("metrics") as Metric[];

  return (
    <section className="border-t border-border bg-background py-(--section-gap)">
      <div className="mx-auto w-full max-w-6xl px-6 lg:px-8">
        <div className="grid gap-16 lg:grid-cols-12 lg:items-center">
          {/* Left: statement, author, metrics, cta */}
          <div className="lg:col-span-7">
            <Reveal>
              <p className="text-xs font-medium tracking-[0.25em] text-primary uppercase">
                {t("eyebrow")}
              </p>
            </Reveal>

            <Reveal delay={80}>
              <h2 className="mt-5 font-display text-[clamp(2rem,4vw,3.25rem)] leading-[1.05] tracking-tight text-balance text-foreground">
                {t("title")}
              </h2>
            </Reveal>

            <Reveal delay={140}>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground text-pretty">
                {t("quote")}
              </p>
            </Reveal>

            <Reveal delay={200}>
              <div className="mt-8 flex items-center gap-4">
                <div className="relative size-14 overflow-hidden rounded-full bg-muted">
                  <SmartImage
                    src={t("authorImage")}
                    alt={t("authorImageAlt")}
                    className="aspect-square rounded-full"
                  />
                </div>
                <div>
                  <p className="font-display text-base tracking-tight text-foreground">
                    {t("authorName")}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {t("authorRole")}
                  </p>
                </div>
              </div>
            </Reveal>

            <Reveal delay={260}>
              <ul className="mt-12 grid grid-cols-3 gap-6 border-t border-border pt-8">
                {metrics.map((metric, index) => (
                  <li key={index}>
                    <p className="font-display text-3xl tracking-tight text-primary tabular-nums">
                      {metric.value}
                    </p>
                    <p className="mt-2 text-xs leading-snug text-muted-foreground">
                      {metric.label}
                    </p>
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={320}>
              <a
                href={t("ctaHref")}
                className="group mt-10 inline-flex items-center gap-2 text-sm font-medium text-foreground transition-colors hover:text-primary"
              >
                {t("ctaLabel")}
                <ArrowUpRight
                  aria-hidden="true"
                  className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </a>
            </Reveal>
          </div>

          {/* Right: client image */}
          <div className="lg:col-span-5">
            <Reveal delay={120}>
              <SmartImage
                src={t("image")}
                alt={t("imageAlt")}
                className="aspect-[4/5] rounded-sm"
              />
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
