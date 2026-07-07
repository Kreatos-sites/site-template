import { useTranslations } from "next-intl";
import {
  ChartLineUpIcon,
  ClockCountdownIcon,
  GaugeIcon,
  ShieldCheckIcon,
  UsersThreeIcon,
} from "@phosphor-icons/react/dist/ssr";
import type { Icon as PhosphorIcon } from "@phosphor-icons/react";
import { Check, Plus } from "lucide-react";

import { Reveal } from "@/components/shared/reveal";
import { cn } from "@/lib/utils";

type Feature = { icon: string; title: string; description: string };
type Stat = { value: string; label: string };
type Testimonial = { quote: string; author: string; role: string };
type Tier = {
  name: string;
  price: string;
  description: string;
  features: string[];
  featured?: boolean;
};
type FaqItem = { question: string; answer: string };
type Logo = { name: string };

const FEATURE_ICONS: Record<string, PhosphorIcon> = {
  chart: ChartLineUpIcon,
  gauge: GaugeIcon,
  shield: ShieldCheckIcon,
  team: UsersThreeIcon,
  clock: ClockCountdownIcon,
};

/**
 * Bloque compuesto tipo "landing SaaS completa": hero + prueba social +
 * features + cifras + testimonios + precios + FAQ + CTA de cierre, en un
 * solo componente. Úsalo cuando el sitio necesita presentar una plataforma
 * o producto de software B2B de principio a fin en una sola página, sin
 * ensamblar 8 bloques sueltos por separado.
 *
 * Copy: ns con TODAS las claves de cada tramo (ver fixture/catalog.md).
 */
export function SaasMarketingFullPage({ ns }: { ns: string }) {
  const t = useTranslations(ns);

  const logos = t.raw("logos") as Logo[];
  const features = t.raw("features") as Feature[];
  const stats = t.raw("stats") as Stat[];
  const testimonials = t.raw("testimonials") as Testimonial[];
  const tiers = t.raw("tiers") as Tier[];
  const faq = t.raw("faq") as FaqItem[];

  return (
    <>
      {/* Hero */}
      <section className="border-t border-border bg-background py-(--section-gap)">
        <div className="mx-auto w-full max-w-6xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <Reveal>
              <p className="text-xs font-medium tracking-[0.25em] text-primary uppercase">
                {t("eyebrow")}
              </p>
            </Reveal>
            <Reveal delay={80}>
              <h2 className="mt-6 font-display text-[clamp(2.4rem,4vw+1rem,4.25rem)] leading-[1.03] tracking-tight text-balance text-foreground">
                {t("title")}
              </h2>
            </Reveal>
            <Reveal delay={160}>
              <p className="mt-8 text-lg leading-relaxed text-muted-foreground text-pretty">
                {t("subtitle")}
              </p>
            </Reveal>
            <Reveal delay={240}>
              <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <a
                  href={t("primaryCta.href")}
                  className="inline-flex items-center justify-center rounded-sm bg-primary px-8 py-4 text-sm font-medium tracking-wide text-primary-foreground uppercase transition-opacity hover:opacity-90 focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"
                >
                  {t("primaryCta.label")}
                </a>
                <a
                  href={t("secondaryCta.href")}
                  className="inline-flex items-center justify-center rounded-sm border border-border px-8 py-4 text-sm font-medium tracking-wide text-foreground uppercase transition-colors hover:bg-secondary focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"
                >
                  {t("secondaryCta.label")}
                </a>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Prueba social: logos */}
      <section className="border-t border-border py-(--section-gap)">
        <div className="mx-auto w-full max-w-6xl px-6 lg:px-8">
          <div className="grid gap-x-12 gap-y-10 lg:grid-cols-[minmax(0,14rem)_1fr] lg:items-center">
            <Reveal>
              <div className="flex items-center gap-4 lg:flex-col lg:items-start lg:gap-3">
                <span aria-hidden="true" className="h-px w-10 bg-border lg:w-16" />
                <h3 className="text-xs font-medium tracking-[0.25em] text-primary uppercase">
                  {t("logosEyebrow")}
                </h3>
              </div>
            </Reveal>
            <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6">
              {logos.map((logo, index) => (
                <li
                  key={logo.name}
                  className="border-border border-b border-l last:border-r sm:[&:nth-child(3n)]:border-r sm:[&:nth-child(-n+3)]:border-t lg:[&:nth-child(3n)]:border-r-0 lg:[&:nth-child(n)]:border-t lg:[&:nth-child(6n)]:border-r [&:nth-child(2n)]:border-r sm:[&:nth-child(2n)]:border-r-0 [&:nth-child(-n+2)]:border-t"
                >
                  <Reveal delay={index * 60}>
                    <div className="group flex min-h-24 items-center justify-center px-6 py-8">
                      <span className="font-display text-[clamp(1.2rem,1rem+1vw,1.6rem)] leading-none tracking-tight text-balance text-muted-foreground/70 transition-colors duration-300 group-hover:text-foreground">
                        {logo.name}
                      </span>
                    </div>
                  </Reveal>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="border-t border-border bg-background py-(--section-gap)">
        <div className="mx-auto w-full max-w-6xl px-6 lg:px-8">
          <Reveal>
            <p className="text-xs font-medium tracking-[0.25em] text-primary uppercase">
              {t("featuresEyebrow")}
            </p>
            <h2 className="mt-5 font-display text-[clamp(2rem,4vw,3.25rem)] leading-[1.05] tracking-tight text-balance text-foreground">
              {t("featuresTitle")}
            </h2>
          </Reveal>
          <ul className="mt-16 grid grid-cols-1 gap-px sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => {
              const Icon = FEATURE_ICONS[feature.icon] ?? ShieldCheckIcon;
              return (
                <li key={feature.title} className="contents">
                  <Reveal delay={index * 60}>
                    <article className="flex h-full flex-col gap-6 bg-card p-8">
                      <Icon className="size-5 text-primary" weight="light" />
                      <div>
                        <h3 className="font-display text-xl text-foreground">
                          {feature.title}
                        </h3>
                        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                          {feature.description}
                        </p>
                      </div>
                    </article>
                  </Reveal>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* Cifras */}
      <section className="border-t border-y border-border bg-card py-(--section-gap)">
        <div className="mx-auto w-full max-w-6xl px-6 lg:px-8">
          <Reveal className="relative flex flex-col gap-10 md:flex-row md:items-stretch md:gap-0">
            <span
              aria-hidden="true"
              className="absolute top-0 -left-6 h-8 w-px bg-primary md:-left-8 md:h-full md:w-0.5"
            />
            <h3 className="sr-only">{t("statsEyebrow")}</h3>
            <p className="shrink-0 self-start pr-0 text-xs font-medium tracking-[0.25em] text-primary uppercase md:max-w-32 md:self-center md:pr-10">
              {t("statsEyebrow")}
            </p>
            <dl className="grid grid-cols-2 gap-y-8 md:flex md:flex-1 md:grid-cols-none">
              {stats.map((stat, index) => (
                <div
                  key={stat.label}
                  className={cn(
                    "flex flex-col justify-center md:flex-1 md:px-8 lg:px-10",
                    index % 2 === 1 &&
                      "border-l border-border pl-8 md:pl-8 lg:pl-10",
                    index % 2 === 0 && "pr-4",
                    "md:border-l md:border-border md:pr-8 md:pl-8 lg:pr-10 lg:pl-10",
                    "md:first:border-l-0 md:first:pl-0",
                  )}
                >
                  <dd className="font-display text-[clamp(2.5rem,5vw,3.75rem)] leading-none font-semibold tracking-tight text-balance text-foreground tabular-nums">
                    {stat.value}
                  </dd>
                  <dt className="mt-3 text-sm leading-snug text-muted-foreground">
                    {stat.label}
                  </dt>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </section>

      {/* Testimonios */}
      <section className="border-t border-border py-(--section-gap)">
        <div className="mx-auto w-full max-w-6xl px-6 lg:px-8">
          <Reveal>
            <div className="flex max-w-2xl flex-col gap-4">
              <span className="text-xs font-medium tracking-[0.25em] text-primary uppercase">
                {t("testimonialsEyebrow")}
              </span>
              <h2 className="font-display text-[clamp(1.9rem,4vw,3rem)] leading-[1.05] tracking-tight text-balance text-foreground">
                {t("testimonialsTitle")}
              </h2>
            </div>
          </Reveal>
          <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-12">
            {testimonials.map((item, index) => (
              <Reveal
                key={item.author}
                delay={index * 60}
                className={index === 0 ? "md:row-span-2 lg:col-span-5" : "lg:col-span-7"}
              >
                <figure className="relative flex h-full flex-col justify-between overflow-hidden rounded-lg border border-border bg-card p-8 lg:p-10">
                  <blockquote className="flex-1 text-[clamp(1.05rem,1.6vw,1.35rem)] leading-relaxed text-secondary-foreground text-balance">
                    {item.quote}
                  </blockquote>
                  <figcaption className="mt-8 flex items-center gap-4 border-t border-border pt-6">
                    <span
                      className="flex size-11 shrink-0 items-center justify-center rounded-full bg-primary/10 font-display text-base font-semibold text-primary"
                      aria-hidden="true"
                    >
                      {item.author.charAt(0)}
                    </span>
                    <span className="flex flex-col">
                      <span className="font-medium text-foreground">{item.author}</span>
                      <span className="text-sm text-muted-foreground">{item.role}</span>
                    </span>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Precios */}
      <section className="border-t border-border bg-background py-(--section-gap)">
        <div className="mx-auto w-full max-w-6xl px-6 lg:px-8">
          <Reveal>
            <div className="max-w-2xl">
              <p className="text-xs font-medium tracking-[0.25em] text-primary uppercase">
                {t("pricingEyebrow")}
              </p>
              <h2 className="mt-4 font-display text-[clamp(2rem,4vw+1rem,3.25rem)] leading-[1.05] tracking-tight text-balance text-foreground">
                {t("pricingTitle")}
              </h2>
            </div>
          </Reveal>
          <div className="mt-16 grid items-stretch gap-px overflow-hidden rounded-lg border border-border bg-border lg:grid-cols-3">
            {tiers.map((tier, index) => (
              <Reveal key={tier.name} delay={index * 60} className="flex">
                <article
                  className={cn(
                    "relative flex w-full flex-col p-8 lg:p-10",
                    tier.featured
                      ? "bg-primary text-primary-foreground lg:-my-4 lg:py-14"
                      : "bg-card",
                  )}
                >
                  {tier.featured && (
                    <span className="mb-6 inline-flex w-fit items-center rounded-full bg-primary-foreground/15 px-3 py-1 text-[0.7rem] font-medium tracking-[0.18em] uppercase">
                      {tier.name}
                    </span>
                  )}
                  {!tier.featured && (
                    <h3 className="font-display text-xl tracking-tight text-foreground">
                      {tier.name}
                    </h3>
                  )}
                  <div className={cn("flex items-baseline gap-1", tier.featured ? "mt-0" : "mt-6")}>
                    <span
                      className={cn(
                        "font-display tracking-tight tabular-nums",
                        tier.featured ? "text-6xl" : "text-5xl",
                      )}
                    >
                      {tier.price}
                    </span>
                  </div>
                  <p
                    className={cn(
                      "mt-5 text-sm leading-relaxed",
                      tier.featured ? "text-primary-foreground/80" : "text-muted-foreground",
                    )}
                  >
                    {tier.description}
                  </p>
                  <div
                    aria-hidden="true"
                    className={cn(
                      "mt-8 h-px w-full",
                      tier.featured ? "bg-primary-foreground/20" : "bg-border",
                    )}
                  />
                  <ul className="mt-8 flex flex-1 flex-col gap-4">
                    {tier.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-3">
                        <Check
                          aria-hidden="true"
                          className={cn(
                            "mt-0.5 size-4 shrink-0",
                            tier.featured ? "text-primary-foreground" : "text-primary",
                          )}
                        />
                        <span
                          className={cn(
                            "text-sm leading-snug",
                            tier.featured
                              ? "text-primary-foreground/90"
                              : "text-secondary-foreground",
                          )}
                        >
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                  <a
                    href="#contacto"
                    className={cn(
                      "mt-10 inline-flex items-center justify-center rounded-md px-6 py-3 text-sm font-medium tracking-tight transition-colors",
                      tier.featured
                        ? "bg-primary-foreground text-primary hover:bg-primary-foreground/90"
                        : "border border-border text-foreground hover:bg-secondary",
                    )}
                  >
                    {t("pricingCta")}
                  </a>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="border-t border-border py-(--section-gap)">
        <div className="mx-auto w-full max-w-6xl px-6 lg:px-8">
          <div className="grid gap-x-16 gap-y-12 lg:grid-cols-[minmax(0,22rem)_1fr]">
            <Reveal>
              <div className="lg:sticky lg:top-28">
                <p className="text-xs font-medium tracking-[0.25em] text-primary uppercase">
                  {t("faqEyebrow")}
                </p>
                <h2 className="mt-6 font-display text-[clamp(2rem,4vw,3.25rem)] leading-[1.05] tracking-tight text-balance text-foreground">
                  {t("faqTitle")}
                </h2>
                <div aria-hidden="true" className="mt-8 hidden h-px w-24 bg-border lg:block" />
              </div>
            </Reveal>
            <div className="-mt-2">
              {faq.map((item, index) => (
                <Reveal key={item.question} delay={index * 60}>
                  <details className="group border-b border-border/70 [&_summary::-webkit-details-marker]:hidden">
                    <summary className="flex cursor-pointer list-none items-start justify-between gap-8 py-7 text-left">
                      <h3 className="font-display text-lg leading-snug tracking-tight text-balance text-foreground transition-colors group-open:text-primary sm:text-xl">
                        {item.question}
                      </h3>
                      <span
                        aria-hidden="true"
                        className="mt-1 grid size-8 shrink-0 place-items-center rounded-full border border-border text-muted-foreground transition-transform duration-300 group-open:rotate-45 group-open:border-primary group-open:text-primary"
                      >
                        <Plus className="size-4" strokeWidth={1.75} />
                      </span>
                    </summary>
                    <div className="max-w-2xl pr-16 pb-8 text-base leading-relaxed text-muted-foreground">
                      {item.answer}
                    </div>
                  </details>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA de cierre */}
      <section className="bg-secondary py-(--section-gap) text-secondary-foreground">
        <div className="mx-auto w-full max-w-6xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <Reveal>
              <span className="text-xs font-medium tracking-[0.25em] text-primary uppercase">
                {t("closingEyebrow")}
              </span>
              <h2 className="mt-6 font-display text-[clamp(2.2rem,1.4rem+3.6vw,4rem)] leading-[0.98] tracking-tight text-balance">
                {t("closingTitle")}
              </h2>
              <p className="mt-6 text-[1.05rem] leading-relaxed text-secondary-foreground/70">
                {t("closingDescription")}
              </p>
            </Reveal>
            <Reveal delay={120}>
              <div className="mt-10 flex justify-center">
                <a
                  href={t("closingCta.href")}
                  className="inline-flex items-center justify-center rounded-sm bg-primary px-8 py-4 text-sm font-medium tracking-wide text-primary-foreground uppercase transition-opacity hover:opacity-90 focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"
                >
                  {t("closingCta.label")}
                </a>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
